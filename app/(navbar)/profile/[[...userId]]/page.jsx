"use client";
import { Button } from "@/components/ui/button";
import {
  CalendarDaysIcon,
  HeartIcon,
  MaximizeIcon,
  UsersIcon,
} from "@/lib/icons";
import AvatarBox from "@/components/AvatarBox";
import EditProfileModal from "@/components/EditProfileModal";
import FriendList from "@/components/FriendList";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getTimeAgo } from "@/lib/getDate";
import Feed from "@/components/Feed";
import GifCard from "@/components/GifCard";

const Profile = ({ params }) => {
  const { userId } = params;
  let fetchId = userId ? userId[0] : Cookies.get("userId");
  const [userData, setUserData] = useState({});
  const [useFriends, setUserFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const res = await fetch(`/api/friend/${fetchId}`, {
        method: "GET",
      });
      const response = await res.json();
      if (res.ok) {
        setUserFriends(response);
      }
    } catch (error) {}
  };
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/user/${fetchId}`, {
        method: "GET",
      });
      const res = await response.json();
      if (response.ok) {
        setUserData(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFriends();
  }, []);

  return (
    <div className="p-6 border rounded-xl bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto  md:px-0 ">
        <div className="space-y-6 border rounded-lg p-4">
          <div className="flex items-center gap-4">
            <AvatarBox
              userId={userData?._id?.$oid}
              username={userData?.username}
              name={userData?.name}
            />
            <Button className="ml-auto" size="icon" variant="outline">
              <EditProfileModal />
              <span className="sr-only">Edit profile</span>
            </Button>
          </div>

          {/* bio */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {userData?.bio}
          </div>

          {/* details */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>Joined {getTimeAgo(userData?.createdAt?.$date)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <HeartIcon className="w-4 h-4" />
              <span>{userData?.likesCount} Likes</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <UsersIcon className="w-4 h-4" />
              <span>{userData?.friendsCount} Friends</span>
            </div>
          </div>
        </div>

        {/* friends */}
        <FriendList friendData={useFriends} />

        {/* gifs */}
        <div className="col-span-full">
          <div className="text-lg font-bold">My GIFs</div>
          <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 m-4">
            {userData?.Gifs?.map((gif, i) => (
                <img src={gif.url} alt={gif.title} className="mb-4 rounded-sm w-full" key={i}></img>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
