"use client";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { Edit2Icon } from "lucide-react";
import useStore from "@/store/store";

const EditProfileModal = ({ bio: OldBio ,pic, changePicFunction}) => {
  const { user, setUserBio } = useStore();
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setBio(OldBio);
  }, [OldBio]);

  const [profilePicture, setProfilePicture] = useState(pic);
  const [errors, setErrors] = useState({});
  const MAX_BIO_LENGTH = 150;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
  const [open, setOpen] = useState(false);

  const resetForm = () => {
    setProfilePicture(pic);
    setBio(OldBio);
    setErrors({});
  };

  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  useEffect(()=>{
    console.log(pic);
  },[pic])

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setErrors({ ...errors, profilePicture: "File size exceeds 5MB limit" });
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setErrors({
          ...errors,
          profilePicture: "Invalid file type. Only JPEG and PNG are allowed.",
        });
        return;
      }
      setErrors({ ...errors, profilePicture: "" });
      setProfilePicture(file);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (bio.length > MAX_BIO_LENGTH) {
      setErrors({ ...errors, bio: `Bio cannot exceed ${MAX_BIO_LENGTH} characters` });
      return;
    }

    const formData = new FormData();
    formData.append("bio", bio);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    if (!errors?.bio && !errors.profilePicture) {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${user?.id}`, {
        method: "PATCH",
        body: formData,
      });
      const res = await response.json();
      if (!response.ok) {
        setErrors({ ...errors, status: "Failed to update profile" });
      }
      setUserBio(bio);
      changePicFunction();
      setOpen(false);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setLoading(false);
    }
  }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="icon" variant="outline">
          <Edit2Icon className="w-4 h-4" />
          <span className="sr-only">Edit profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information.
          </DialogDescription>
        </DialogHeader>

        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status}</p>
        )}

        <form onSubmit={handleSaveChanges} className="grid gap-6 py-6">
          <div className="flex flex-col  justify-center items-center gap-4">
            <div className="flex items-center gap-3">

            <Avatar className="h-20 w-20">
              <img src={pic} alt="User image" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
           
            <div className="flex gap-2 ">
              <div className="hover:bg-slate-100 rounded-lg p-2 cursor-pointer">
                <Label htmlFor="file">
                  <div className=" hover:bg-slate-100 rounded-lg p-2">
                    <Edit2Icon className="h-4 w-4 " />
                  </div>
                </Label>
                <input
                  id="file"
                  type="file"
                  className="sr-only"
                  onChange={handleProfilePictureUpload}
                  />
                <span className="sr-only">Upload profile picture</span>
              </div>
            </div>
                  </div>

            {profilePicture && (
                <p className="text-gray-500 text-sm">{profilePicture.name}</p>
              )}
              {errors.profilePicture && (
                <p className="text-red-500 text-sm">{errors.profilePicture}</p>
              )}
            
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                if (e.target.value.length <= MAX_BIO_LENGTH) {
                  setErrors({ bio: "" });
                } else {
                  setErrors({
                    bio: `Bio cannot exceed ${MAX_BIO_LENGTH} characters`,
                  });
                }
              }}
              className="resize-none"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            <p className="text-gray-500 text-sm">
              {bio?.length}/{MAX_BIO_LENGTH}
            </p>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Please wait" : "Save changes"}
            </Button>
            {/* <DialogClose asChild>
              <div>
                <Button variant="outline">Cancel</Button>
              </div>
            </DialogClose> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;

{
  /* <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
          </div> */
}

//  const [name, setName] = useState("Jared Palmer")
// const [username, setUsername] = useState("@jaredpalmer")
// console.log(OldBio)
