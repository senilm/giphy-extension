"use client"
import GifCardHome from "./GifCardHome";
import { useState, useEffect } from "react";

const GifFeed = () => {
  const [GifData, setGifData] = useState([]);

  const fetchGifData = async () => {
    try {
      const response = await fetch(`/api/gif`, { method: "GET" });
      const res = await response.json();

      if (response.ok) {
        setGifData(res)
      }
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchGifData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        {GifData.map((gif)=>{
          return <GifCardHome {...gif} key={gif?.id}/>
        })}
      </div>
    </>
  );
};

export default GifFeed;
