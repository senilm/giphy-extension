import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { HeartFilledIcon, HeartIcon } from "@/lib/icons";
import useStore from "@/store/store";

const GifCard = ({ gif, fetchData = null }) => {
  const pathname = usePathname();
  const {likedPosts,  addLikedPosts,removeLikedPosts} = useStore();
  const [liked, setLiked] = useState(
    likedPosts && likedPosts.some(item => item === gif.id || item === gif.gifyId)
    );
  
  let url;
  if (gif?.images?.fixed_height?.url) {
    url = gif?.images?.fixed_height?.url;
  } else if (gif?.url) {
    url = gif?.url;
  }

  const handleLike = async (gifId, gifUrl) => {
    if (pathname !== "/favorites") {
      setLiked(!liked);
    }
    try {
      const data = await fetch(`api/like/${gifId}`, {
        method: "PATCH",
        body: JSON.stringify({ gifUrl }),
      });
      const res = await data.json();
      if (data.ok) {
        setLiked(!liked);
        console.log(res + gifId);
        if(res == "remove"){
          removeLikedPosts(gifId)
        }else if(res == "add"){
          addLikedPosts(gifId)
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative group cursor-pointer break-inside-avoid mb-4">
      <img src={url} alt={gif.title} className="mb-4 rounded-sm w-full"></img>
      <div className="absolute inset-0 rounded-sm bg-gray-900/50 flex items-end justify-start  opacity-0 group-hover:opacity-100 transition-opacity">
        {pathname == "/favorites" ? (
          <div>
          <div
            onClick={() => handleLike(gif.gifyId,gif.url)}
            className="rounded-full mb-3 ml-3"
          >
           { liked ? <HeartFilledIcon className="w-8 h-8 text-white" /> : <HeartIcon className="w-8 h-8 text-white " />}
          </div>
        </div>
        ) : (
          <div
            onClick={() => handleLike(gif.id, gif.images.fixed_height.url)}
            className="rounded-full mb-3 ml-3"
          >
            {liked ? <HeartFilledIcon className="w-8 h-8 text-white" /> : <HeartIcon className="w-8 h-8 text-white " />}
          </div>
          
        )}
      </div>
    </div>
  );
};

export default GifCard;

