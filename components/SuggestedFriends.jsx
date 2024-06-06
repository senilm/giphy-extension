"use client";
import { useEffect, useState } from "react";
import AvatarBox from "./AvatarBox";
import useStore from "@/store/store";

const SuggestedFriends = () => {
  const [canBeFriend, SetCanBeFriend] = useState([]);
  const {friends} = useStore()
  const fetchCanBeFriends = async () => {
    const friendsData = await fetch(`api/friends`, {
      method: "GET",
    });
    const res = await friendsData.json();
    SetCanBeFriend(res);
  };


  useEffect(() => {
    fetchCanBeFriends();
  }, [friends]);

  return <>
    {canBeFriend.length > 0 ?  canBeFriend?.map((item)=>{
        return <AvatarBox username={item?.username} userId={item.id} key={item?.id} frd={true} friendId={item.id}/>
    }) : <div className=" text-gray-400 text-sm">No users left</div>}
  </>;
};

export default SuggestedFriends;
