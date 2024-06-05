"use client";
import GifCardHome from "./GifCardHome";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import useStore from "@/store/store";

const GifFeed = ({friends}) => {
  const {user, setLikedPosts} = useStore()
  const [GifData, setGifData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, [friends, userId]);

  useEffect(() => {
    if(userId){
      likedGifs();
    }
  }, [userId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {loading? (<div className="col-span-3 text-center  text-lg mb-4 text-gray-700">loading</div>) : 
        GifData.length > 0
          ? GifData.map((gif) => {
            return <GifCardHome {...gif} key={gif?.id}/>;
          })
          : (<div className=" ">No gifs uploaded by any user</div>)
        }
        </div>
    </>
  );
};

export default GifFeed;
