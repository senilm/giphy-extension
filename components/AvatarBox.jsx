"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { UserCheckIcon, UserPlusIcon } from "@/lib/icons";
import Cookies from "js-cookie";
import { useState } from "react";

const AvatarBox = ({ username, name = "User", frd = false, friendId=null }) => {

  const [friend, setFriend] = useState(false)
  const userId = Cookies.get('userId');

  const handleFriend = async () =>{
    try {
      const response = await fetch(`api/friend/${userId}`,{
        method:"POST",
        body:JSON.stringify({
          friendId:friendId
        })
      })
      const res = await response.json();    
      setFriend(prev => !prev)
    } catch (error) {
      console.error(error);
    }
    
  }
  return (
    <div className="flex gap-4 justify-between">
      <div className=" flex gap-2">
      <div>
        <Avatar className="border">
          <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="text-sm font-medium truncate md:max-w-[8.5rem] ">
          {name}
        </div>
        <Link href={`/profile/${username}`}>
          <div className="text-sm text-gray-500 truncate md:max-w-[8.5rem] hover:underline hover:text-blue-400 cursor-pointer">
            @{username}
          </div>
        </Link>
      </div>
      </div>
      {frd && 
      <div>
        <Button className="rounded-full bg-white p-2" size="icon" variant="ghost" onClick={handleFriend}>
          {friend ?<UserCheckIcon/> :<UserPlusIcon/>}
        </Button>
      </div>
      }
    </div>
  );
};

export default AvatarBox;
