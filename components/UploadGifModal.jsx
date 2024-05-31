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

const UploadGifModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-medium py-3 px-6 rounded-md flex items-center justify-center transition-colors duration-300">
          <UploadIcon className="w-5 h-5 mr-2" />
          Upload GIF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-full p-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Upload GIF or Video</DialogTitle>
          <DialogDescription>
            Make sure to add a catchy caption to describe your media
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="file" className="flex items-center justify-between">
              <span>File</span>
              <div className="flex items-center gap-2 text-primary">
                <CloudUploadIcon className="w-5 h-5" />
                <span>Browse</span>
              </div>
            </Label>
            <div className="relative cursor-pointer">
              <Input id="file" type="file" className="pr-16 cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Add a caption..."
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary"
          >
            Upload
          </Button>
          <DialogClose asChild>
            <div>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadGifModal;
