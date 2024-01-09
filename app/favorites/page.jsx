'use client'
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import GifCard from "@/components/GifCard"
import Navbar from "@/components/Navbar"

const Favorite = () => {
  const userData = Cookies.get('userId')
  const [favoriteData, setFavoriteData] = useState([])
  const [fetchAgain, setFetchAgain] = useState(false)
  const likedGifs = Cookies.get('likedGifs')
  const fetchData = async () => {
    try {
      const data = await fetch(`/api/like/fetchData/${userData}`)
      if (data.ok) {
        const res = await data.json()
        setFavoriteData(res)
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="border rounded-xl bg-white">
      <Navbar />
      <div className="flex min-h-screen flex-wrap justify-center gap-8 py-4 rounded">
        {favoriteData.length === 0 ? (
          <p className=" text-lg">No liked gifs...</p>
        ) : (
          favoriteData.map((gif) => (
            <GifCard key={gif.id} gif={gif.gif} likedGifs={likedGifs} fetchData={fetchData} />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorite;
