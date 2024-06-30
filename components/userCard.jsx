"use client";
import AvatarBox from "./AvatarBox";
import Numbers from "./Numbers";
import { useState, useEffect } from "react";
import useStore from "@/store/store";
import Cookies from "js-cookie";
import { Skeleton } from "@/components/ui/skeleton";

const UserCard = () => {
  const {
    user,
    totalLikes,
    totalComments,
    friends,
    posts,
    setUser,
    setPosts,
    setJoinDate,
    setFriends,
    setTotalLikes,
    setTotalComments,
  } = useStore();
  const userId = user?.id || Cookies.get("userId");
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      const res = await response.json();
      if (response.ok) {
        setUser({
          id: res?._id?.$oid,
          bio: res?.bio,
          name: res?.name,
          username: res?.username,
          profilePicture: res?.profilePicture,
        });
        setJoinDate(res?.createdAt?.$date);
        setFriends(res?.Friends.map((item) => item?.friendId?.$oid));
        setPosts(res?.Gifs);
        setTotalLikes(res?.likesCount);
        setTotalComments(res?.commentsCount);
      } else {
        console.error(res?.message);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 w-full md:w-64">
      {loading ? (
       <div className="space-y-4">
        <div className=" flex space-x-2 items-center">

       <Skeleton className="h-12 w-12 rounded-full" />
       <div className="space-y-2">
         <Skeleton className="h-4 w-24" />
         <Skeleton className="h-4 w-16" />
        </div>
       </div>
       <div className="mt-4 space-y-2">
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-3/4" />
       </div>
       <div className="grid grid-cols-2 gap-4 mt-3">
         <Skeleton className="h-8 w-full" />
         <Skeleton className="h-8 w-full" />
         <Skeleton className="h-8 w-full" />
         <Skeleton className="h-8 w-full" />
       </div>
     </div>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-4 ">
            <AvatarBox
              name={user?.name}
              username={user?.username}
              profilePicture={user?.profilePicture}
              userId={userId}
            />
          </div>
          {user?.bio && (
            <div className=" font-mono text-gray-500 break-words">
              &quot;{user?.bio}&quot;
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-3">
            <Numbers label={"Posts"} number={posts.length} />
            <Numbers label={"Friends"} number={friends.length} />
            <Numbers label={"Likes"} number={totalLikes} />
            <Numbers label={"comments"} number={totalComments} />
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
