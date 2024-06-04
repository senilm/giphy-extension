"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon, HeartIcon, MaximizeIcon, MessageCircleIcon } from "@/lib/icons";
import AvatarBox from "./AvatarBox";
import { getTimeAgo } from "@/lib/getDate";
import { useState } from "react";

const GifCardHome = ({id, url, caption, userId, Comment, GifLike, user, createdAt, gifyId,likes}) => {

  const [liked, setLiked] = useState(likes.includes(id) ? true : false)
  const [gifLikeCount, setGifLikeCount] = useState(GifLike.length)

  const handleLike = async () => {
    try {
      const response = await fetch(`api/like/${gifyId}`,{
        method:"PATCH",
        body:JSON.stringify({
          gifUrl:url
        })
      })

      const res = await response.json();
      if(response.ok){
        setLiked(prev => !prev);
        if(res == "remove"){
          setGifLikeCount(prev => prev - 1);
        }else if(res == "add"){
          setGifLikeCount(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  if(url?.endsWith(".mp4")){
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
        <div className="absolute rounded-lg inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <MaximizeIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
         <AvatarBox username={user?.username} userId={userId}/>
          {/* <Button className="rounded-full" size="icon" variant="ghost">
          <MoveHorizontalIcon className="w-5 h-5" />
        </Button> */}
        </div>
        <div className="text-xs text-gray-500 mb-4 truncate">
          {caption}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-5 text-gray-500">
            <div className="flex items-center gap-1">
              <Button className="rounded-full" size="icon" variant="ghost" onClick={handleLike}>
                {liked ? <HeartFilledIcon className="w-5 h-5"/> : <HeartIcon className="w-5 h-5" />}
              </Button>
              <div className=" text-xs">{gifLikeCount}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button className="rounded-full" size="icon" variant="ghost">
                <MessageCircleIcon className="w-5 h-5" />
              </Button>
              <div className="text-xs">{Comment.length}</div>
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
