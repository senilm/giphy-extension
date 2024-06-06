"use client";
import GifFeed from "@/components/GifFeed";
import UserCard from "@/components/userCard";
import RightWidget from "@/components/RightWidget";
import UploadGifModal from "@/components/UploadGifModal";
import ScrollToTop from "@/components/ScrollToTop";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  const userId = Cookies.get("userId");
  const [friends, setFriends] = useState(false);
  const [selected, setSelected] = useState(1);
  const [newPost, setNewPost] = useState(0);

  const handleNewPost = () => {
    setNewPost(prev => prev + 1);
  }
  const handleData = (bool, val) => {
    setFriends(bool);
    setSelected(val)
  };

  return (
    <div
      key="1"
      className="flex flex-col unset md:flex-row gap-6 p-6 border rounded-xl bg-white relative min-h-[calc(100vh-4rem)]"
    >
      <div className="md:sticky md:top-6 md:left-0 md:max-h-0">
        <UserCard />
        <UploadGifModal handleNewPost={handleNewPost}/>
      </div>

      <div className="flex-1 space-y-6 justify-center items-center">
        <div className="flex gap-4 justify-center">
          <div className="md:w-[50%]">
            {" "}
            <div className="grid w-full grid-cols-2  border px-3 py-1 bg-slate-100 rounded-xl">
              <button className={` py-2 rounded-xl px-4   ${selected == 1 ? `bg-white`:``}`} onClick={()=>handleData(false, 1)}>
                All users
              </button>
              <button className={` py-2 px-4 rounded-xl  ${selected == 2 ? `bg-white`:``}`} onClick={()=>handleData(true, 2)}>
                Friends only
              </button>
            </div>
          </div>
        </div>
        <GifFeed friends={friends} newPost={newPost}/>
      </div>

      <div className="md:sticky md:top-6 md:left-0 md:max-h-0">
        <RightWidget />
      </div>
      <ScrollToTop />
    </div>
  );
};
export default Home;
