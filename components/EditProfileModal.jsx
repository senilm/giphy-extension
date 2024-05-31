"use client"
import { UploadIcon } from "@/lib/icons"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Edit2Icon } from "lucide-react"

const EditProfileModal = () => {
    const [name, setName] = useState("Jared Palmer")
    const [username, setUsername] = useState("@jaredpalmer")
    const [bio, setBio] = useState("I'm a software engineer.")
    const [profilePicture, setProfilePicture] = useState("/placeholder-avatar.jpg")
    
    const handleProfilePictureUpload = (event) => {
      const file = event.target.files[0]
      setProfilePicture(URL.createObjectURL(file))
    }
    const handleSaveChanges = () => {
      console.log("Saving changes:", { name, username, bio, profilePicture })
    }
    
  return (
    <Dialog >
      <DialogTrigger asChild>
      <Edit2Icon className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="flex  justify-center items-center gap-4">
            <Avatar className="h-20 w-20">
              <img src="" alt="" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Label htmlFor="file">
                <UploadIcon className="h-5 w-5" />
                </Label>
                <Input id="file" type="file" className="pr-16 cursor-pointer hidden" />
                <span className="sr-only">Upload profile picture</span>
              </Button>
              <Input type="file" className="sr-only" onChange={handleProfilePictureUpload} />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" defaultValue={bio} onChange={(e) => setBio(e.target.value)} className="resize-none"/>
          </div>
        </div>
        <DialogFooter>
          <Button  type="submit" onClick={handleSaveChanges}>
            Save changes
          </Button>
          <DialogClose asChild>
            <div>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileModal