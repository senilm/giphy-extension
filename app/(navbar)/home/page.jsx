"use client";
import GifFeed from "@/components/GifFeed";
import UserCard from "@/components/userCard";
import RightWidget from "@/components/RightWidget";
import UploadGifModal from "@/components/UploadGifModal";
import ScrollToTop from "@/components/ScrollToTop";
import Cookies from "js-cookie";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Home = () => {
  const userId = Cookies.get("userId");
  const [friends, setFriends] = useState(false);
  return (
    <div
      key="1"
      className="flex flex-col unset md:flex-row gap-6 p-6 border rounded-xl bg-white relative min-h-[calc(100vh-4rem)]"
    >
      <div className="md:sticky md:top-6 md:left-0 md:max-h-0">
        <UserCard userId={userId} />
        <UploadGifModal userId={userId} />
      </div>

      <div className="flex-1 space-y-6 justify-center items-center">
        <div className="flex gap-4 justify-center">
          <Tabs defaultValue="all" className="md:w-[50%]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All users</TabsTrigger>
              <TabsTrigger value="frds">Friends only</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <GifFeed />
      </div>

      <div className="md:sticky md:top-6 md:left-0 md:max-h-0">
        <RightWidget />
      </div>
      <ScrollToTop />
    </div>
  );
};
export default Home;
