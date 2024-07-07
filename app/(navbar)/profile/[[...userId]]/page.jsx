"use client";
import {
  CalendarDaysIcon,
  HeartIcon,
  UsersIcon,
} from "@/lib/icons";
import AvatarBox from "@/components/AvatarBox";
import EditProfileModal from "@/components/EditProfileModal";
import FriendList from "@/components/FriendList";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getTimeAgo } from "@/lib/getDate";
import useStore from "@/store/store";
import AvatarBoxSkeleton from "@/components/AvatarBoxSkeleton";
import UserProfileSkeleton from "@/components/UserProfileSkeleton";

const Profile = ({ params }) => {
  const { user, totalLikes, friends, joinDate } = useStore();
  const { userId } = params;
  let currentUserId = Cookies.get("userId");
  let fetchId = userId ? userId[0] : currentUserId;
  const [userData, setUserData] = useState({});
  const [useFriends, setUserFriends] = useState([]);
  const [picChange, SetPicChange] = useState(false);
  const [frdLoading, setFrdLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const changePicFunction = () => {
    SetPicChange((prev) => !prev);
  };

  const fetchFriends = async () => {
    try {
      const res = await fetch(`/api/friend/${fetchId}`, {
        method: "GET",
      });
      const response = await res.json();
      if (res.ok) {
        setUserFriends(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFrdLoading(false);
    }
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
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [picChange]);

  useEffect(() => {
    fetchFriends();
  }, [friends]);

  return (
    <div className="p-6 border rounded-xl bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto  md:px-0 ">

        {/* user detail */}
        {userLoading ? (
          <UserProfileSkeleton />
        ) : (
          <div className="space-y-6 border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <AvatarBox
                userId={userData?._id?.$oid}
                username={userData?.username}
                name={userData?.name}
                profilePicture={userData?.profilePicture}
              />
              {fetchId == Cookies.get("userId") ? (
                <EditProfileModal
                  bio={userData?.bio}
                  pic={userData?.profilePicture}
                  changePicFunction={changePicFunction}
                />
              ) : (
                ""
              )}
            </div>

            {/* bio */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {userData?.bio ? userData?.bio : currentUserId == userData?.id ? user?.bio : ""}
              
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
        )}

        {/* friends */}
        {fetchId == Cookies.get("userId") ? (
          <>
            {frdLoading ? (
              <div className="bg-gray-100 dark:bg-gray-800 border rounded-lg p-4 space-y-4 max-h-[230px] overflow-auto">
                <div className="text-lg font-bold">Friends</div>
                <span className="text-xs">
                  (List includes all the users that have added you as friends
                  also)
                </span>
                <AvatarBoxSkeleton />
                <AvatarBoxSkeleton />
              </div>
            ) : (
              <FriendList friendData={useFriends} />
            )}
          </>
        ) : (
          ""
        )}

        {/* gifs */}
        <div className="col-span-full">
          <div className="text-lg font-bold">GIFs</div>
          <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 m-4">
            {
            userData?.Gifs?.length > 0 ? (
              userData?.Gifs?.map((gif, i) => (
                <img
                  src={gif.url}
                  alt={gif.title}
                  className="mb-4 rounded-sm w-full"
                  key={i}
                ></img>
              ))
            ) : (
              <div className=" text-gray-400 text-sm">No GIFS to show</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Profile;
