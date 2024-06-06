"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HeartFilledIcon,
  HeartIcon,
  MaximizeIcon,
  MessageCircleIcon,
  MoveHorizontalIcon,
  UserCheckIcon,
  UserPlusIcon,
} from "@/lib/icons";
import AvatarBox from "./AvatarBox";
import { getTimeAgo } from "@/lib/getDate";
import { useState } from "react";
import AddComment from "./AddComment";
import useStore from "@/store/store";

const GifCardHome = ({
  id,
  url,
  caption,
  userId,
  Comment,
  GifLike,
  user,
  createdAt,
  gifyId,
}) => {
  const {
    likedPosts,
    removeLikedPosts,
    addLikedPosts,
    addLikeToPost,
    friends,
    removeFriend,
    addFriend,
    user : CurrentUser
  } = useStore();
  const [liked, setLiked] = useState(likedPosts?.includes(id) ? true : false);
  const [gifLikeCount, setGifLikeCount] = useState(GifLike.length);
  const [commentCount, setCommentCount] = useState(Comment.length);
  const [isFriend, setIsFriend] = useState(
    friends?.includes(user.id) ? true : false
  );
  const cUserId = CurrentUser?.id
  const increaseComment = () => {
    setCommentCount((prev) => prev + 1);
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`api/like/${gifyId}`, {
        method: "PATCH",
        body: JSON.stringify({
          gifUrl: url,
        }),
      });
      const res = await response.json();
      if (response.ok) {
        setLiked((prev) => !prev);
        if (res == "remove") {
          removeLikedPosts(id);
          setGifLikeCount((prev) => prev - 1);
        } else if (res == "add") {
          addLikedPosts(id);
          setGifLikeCount((prev) => prev + 1);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFriend = async () =>{
    try {
      const response = await fetch(`api/friend/${cUserId}`,{
        method:"POST",
        body:JSON.stringify({
          friendId:user?.id
        })
      })
      const res = await response.json();   
      if(response.ok){
        if(res?.message == "Add"){
          addFriend(user?.id)
        }else if(res?.message == 'Remove'){
          removeFriend(user?.id)
        }
        setIsFriend(prev => !prev)
      } 
    } catch (error) {
      console.error(error);
    }
    
  }
  if (url?.endsWith(".mp4")) {
    url = url.slice(0, -4) + ".gif";
  }
  return (
    <Card className="">
      <div className="relative group cursor-pointer">
        <img
          alt="GIF"
          className="aspect-square object-cover rounded-t-lg"
          height={300}
          src={url}
          width={300}
        />
        {/* <div className="absolute rounded-lg inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <MaximizeIcon className="w-8 h-8 text-white" />
        </div> */}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <AvatarBox username={user?.username} profilePicture={user?.profilePicture} name={user?.name} userId={userId} />
          {cUserId != user?.id ? (
            <Button className="rounded-full" size="icon" variant="ghost" onClick={handleFriend}>
              {isFriend ? (
                <UserCheckIcon className="w-4 h-4" />
              ) : (
                <UserPlusIcon className="w-4 h-4" />
              )}
            </Button>
          ) : (
            ""
          )}
        </div>
        <div className="text-xs text-gray-500 mb-4 truncate">{caption}</div>

        <div className="flex flex-col">
          <div className="flex items-center gap-5 text-gray-500">
            <div className="flex items-center gap-1">
              <Button
                className="rounded-full"
                size="icon"
                variant="ghost"
                onClick={handleLike}
              >
                {liked ? (
                  <HeartFilledIcon className="w-5 h-5" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </Button>
              <div className=" text-xs">{gifLikeCount}</div>
            </div>
            <div className="flex items-center gap-1">
              <AddComment gifId={id} increaseComment={increaseComment} />
              <div className="text-xs">{commentCount}</div>
            </div>
          </div>
          <div className="text-xs text-gray-300 text-right mt-2 mb-[-5px]">
            {getTimeAgo(createdAt)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GifCardHome;
