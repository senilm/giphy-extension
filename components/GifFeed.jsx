"use client";
import GifCardHome from "./GifCardHome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import useStore from "@/store/store";
import GifCardHomeSkeleton from "./GifCardHomeSkeleton";

const GifFeed = ({friends, newPost}) => {
  const {user, setLikedPosts, friends : TotalFriends} = useStore()
  const [GifData, setGifData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([])
  const userId = user?.id;

  const likedGifs = async () => {
    try {
      const response = await fetch(`api/like/getLikes/${userId}`,{method:"GET"});
      const likedGifs = await response.json();
      if(response.ok){
        setLikedPosts(likedGifs)
        setLikes(likedGifs)
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const fetchGifData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/gif`, { method: "POST",body:JSON.stringify({friends, userId}) });
      const res = await response.json();

      if (response.ok) {
        setGifData(res);
      }
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if(userId){
      fetchGifData();
    }
  }, [friends, userId, TotalFriends, newPost]);

  useEffect(() => {
    if(userId){
      likedGifs();
    }
  }, [userId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {loading? (
        // <div className="col-span-3 text-center  text-lg mb-4 text-gray-700">loading</div>
        <>
        <GifCardHomeSkeleton/>
        <GifCardHomeSkeleton/>
        <GifCardHomeSkeleton/>
        <GifCardHomeSkeleton/>
        </>
      ) : 
        GifData.length > 0
          ? GifData.map((gif) => {
            return <GifCardHome {...gif} key={gif?.id}/>;
          })
          : (<div className="col-span-3 text-center  text-lg mb-4 text-gray-700">{!friends ? "No gifs uploaded by any user" : "No gifs uploaded by your friends"}</div>)
        }
        </div>
    </>
  );
};

export default GifFeed;
