"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import GifCard from "@/components/GifCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ExploreSkeleton from "@/components/exploreSkeleton";

const Favorite = () => {
  const userData = Cookies.get("userId");
  const [favoriteData, setFavoriteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchAgain, setFetchAgain] = useState(false);
  const likedGifs = Cookies.get("likedGifs");

  const fetchData = async () => {
    try {
      const data = await fetch(`/api/like/fetchData/${userData}`);
      if (data.ok) {
        const res = await data.json();
        setFavoriteData(res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="border rounded-xl bg-white">
      {loading ? (
        <div className="flex justify-between mt-3 m-4 flex-wrap">
          <ExploreSkeleton />
          <ExploreSkeleton />
          <ExploreSkeleton />
          <ExploreSkeleton />
        </div>
      ) : (
        <>
          {favoriteData.length === 0 ? (
            <div className=" flex flex-col justify-center items-center min-h-[calc(100vh-7rem)]">
              <p className=" text-lg mb-4 text-gray-700">
                No liked GIFs yet. Start exploring and find your favorites!
              </p>
              <Button>
                <Link className="px-4 py-2 rounded-lg" href={"/explore"}>
                  Explore GIFs
                </Link>
              </Button>
            </div>
          ) : (
            <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 m-4">
              {favoriteData.map((gif) => (
                <GifCard
                  key={gif.id}
                  gif={gif.gif}
                  likedGifs={likedGifs}
                  fetchData={fetchData}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorite;
