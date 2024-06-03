"use client";
import { useEffect, useState } from "react";
import AvatarBox from "./AvatarBox";

const SuggestedFriends = () => {
  const [canBeFriend, SetCanBeFriend] = useState([]);

  const fetchCanBeFriends = async () => {
    const friendsData = await fetch(`api/friends`, {
      method: "GET",
    });
    const res = await friendsData.json();
    SetCanBeFriend(res);
  };


  useEffect(() => {
    fetchCanBeFriends();
  }, []);

  return <>
    {canBeFriend?.map((item)=>{
        return <AvatarBox username={item?.username} key={item?.id} frd={true} friendId={item.id}/>
    })}
  </>;
};

export default SuggestedFriends;
