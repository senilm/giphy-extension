"use client";
import { CloudUploadIcon, FileIcon, UploadIcon } from "@/lib/icons";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import useStore from "@/store/store";
import Cookies from "js-cookie";

const UploadGifModal = ({handleNewPost}) => {
  const {user} = useStore()
  const userId = user?.id || Cookies.get("userId")
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  const resetForm = () => {
    setSelectedFile(null);
    setCaption("");
    setErrors({});
  }

  useEffect(() => {
    if (open) {
      resetForm()
    }
  }, [open]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const newErrors = {};

    if (!file.type.match("image/gif|video/*")) {
      newErrors.file = "Please select a GIF or video file.";

    }else if(file.size > 10 * 1024 * 1024){
      newErrors.file = "File size exceeds 10 MB limit.";
    }
    setErrors(newErrors); 

    if (Object.keys(newErrors).length === 0) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!selectedFile) {
      newErrors.file = "Please select a video or GIF to upload.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("caption", caption);

      const data = await fetch(`api/gif/${userId}`,{
        method:"POST",
        body:formData
      })
      handleNewPost()
      setOpen(false); 
    }
    setLoading(false); 
    
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition-colors duration-300">
          <UploadIcon className="w-5 h-5 mr-2" />
          Post GIF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-full p-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Upload GIF or Video</DialogTitle>
          <DialogDescription>
            Make sure to add a catchy caption to describe your media
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label
                htmlFor="file"
                className="flex items-center justify-between"
              >
                <span>File</span>
                <div className="flex items-center gap-2 text-primary">
                  <CloudUploadIcon className="w-5 h-5" />
                  <span>Browse</span>
                </div>
              </Label>
              <div className="relative cursor-pointer">
                <Input id="file" type="file" className="pr-16 cursor-pointer" onChange={handleFileChange}/>
              </div>
            </div>
            {errors?.file && (
              <div className="text-sm text-red-400 mt-[-10px] ml-2">
                {errors.file}
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                placeholder="Add a caption..."
                className="resize-none"
                value={caption}
                onChange={handleCaptionChange}

              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary"
              disabled={loading}
            >
              {loading ? "Please wait" :"Upload"}
            </Button>
            <DialogClose asChild>
              <div>
                <Button variant="outline">Cancel</Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadGifModal;
