"use client";
import { useEffect, useState } from "react";
import AvatarBox from "./AvatarBox";
import useStore from "@/store/store";
import AvatarBoxSkeleton from "./AvatarBoxSkeleton";

const SuggestedFriends = () => {
  const [canBeFriend, SetCanBeFriend] = useState([]);
  const [loading, setLoading] = useState(true);

  const { friends } = useStore();
  const fetchCanBeFriends = async () => {
    try {
      setLoading(true);
      const friendsData = await fetch(`api/friends`, {
        method: "GET",
      });
      const res = await friendsData.json();
      SetCanBeFriend(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCanBeFriends();
  }, [friends]);

  return (
    <>
      {loading ? (
        <>
        <AvatarBoxSkeleton/>
        <AvatarBoxSkeleton/>
        </>
      ) : canBeFriend.length > 0 ? (
        canBeFriend?.map((item) => {
          return (
            <AvatarBox
              username={item?.username}
              name={item?.name}
              userId={item.id}
              profilePicture={item?.profilePicture}
              key={item?.id}
              frd={true}
              friendId={item.id}
            />
          );
        })
      ) : (
        <div className=" text-gray-400 text-sm">No users left</div>
      )}
    </>
  );
};

export default SuggestedFriends;
