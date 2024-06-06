"use client";
import { MessageCircleIcon } from "@/lib/icons";
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
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ShowComment from "./ShowComment";
import useStore from "@/store/store";

const AddComment = ({ gifId, increaseComment }) => {
  const {reduceTotalComments, increaseTotalComments} = useStore()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState("");
  const [oldComments, setOldComments] = useState([])
  const userId = Cookies.get("userId");

  const resetForm = () => {
    setComment("");
    setErrors({});
  };
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const fetchOldComments = async () => {
    try {
        const data = await fetch(`api/comment/${gifId}`, {
            method: "GET",
          });
          const res = await data.json()
          if (data.ok) {
            console.log(res)
            setOldComments(res);
          }
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(()=>{
    if(open){
      fetchOldComments()
    }
  },[open])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!comment || comment.trim().length == 0) {
      newErrors.comment = "Please write a comment.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const data = await fetch(`api/comment/${gifId}`, {
          method: "POST",
          body: JSON.stringify({ userId, comment }),
        });
        if(data.ok){
            increaseTotalComments();
            increaseComment();
            setOpen(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <MessageCircleIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-full p-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Comment Box</DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col gap-3 max-h-56 overflow-auto">
            {oldComments.length > 0 ? (
                oldComments.map((comment, i) => {
                    return <ShowComment key={i} {...comment} /> 
                })
            ): (<div className=" text-gray-400 text-center">Be the first one to comment... </div>)}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="caption">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Add a comment..."
                className="resize-none"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            {errors?.comment && (
              <div className="text-sm text-red-400 mt-[-10px] ml-2">
                {errors.comment}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary"
              disabled={loading}
            >
              {loading ? "Please wait" : "Comment"}
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

export default AddComment;
