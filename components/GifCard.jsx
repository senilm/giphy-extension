import { useState } from "react";
import { usePathname } from "next/navigation";
import { HeartFilledIcon, HeartIcon } from "@/lib/icons";

const GifCard = ({ gif, likedGifs = null, fetchData = null }) => {
  const pathname = usePathname();
  const [liked, setLiked] = useState(
    likedGifs ? likedGifs.includes(gif.id || gif.gifyId) : false
  );

  let url;
  if (gif?.images?.fixed_height?.url) {
    url = gif?.images?.fixed_height?.url;
  } else if (gif?.url) {
    url = gif?.url;
  }

  const handleLike = async (gifId, gifUrl) => {
    if (pathname !== "/favorite") {
      setLiked(!liked);
    }
    try {
      const data = await fetch(`api/like/${gifId}`, {
        method: "PATCH",
        body: JSON.stringify({ gifUrl }),
      });
      if (data.ok) {
        setLiked(!liked);
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
        {pathname === "/explore" ? (
          <div
            onClick={() => handleLike(gif.id, gif.images.fixed_height.url)}
            className="rounded-full mb-3 ml-3"
          >
            {liked ? <HeartFilledIcon className="w-8 h-8 text-white" /> : <HeartIcon className="w-8 h-8 text-white " />}
          </div>
        ) : (
          <div>
            <div
              onClick={() => handleLike(gif.gifyId,gif.url)}
              className="rounded-full mb-3 ml-3"
            >
             { !liked ? <HeartFilledIcon className="w-8 h-8 text-white" /> : <HeartIcon className="w-8 h-8 text-white " />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GifCard;

// <div className=" border-4">
//   <div className=" flex flex-col">
//     <iframe
//       src={gif.embed_url || gif.url}
//       frameBorder="0"
//       width={260}
//       height={260}
//       key={gif.id}
//       className="rounded-lg relative"
//     ></iframe>

//   {
//     // for home page
//     pathname === '/' ? (
//     <button className="flex mt-1 transition-all" onClick={()=>handleLike(gif.id,gif.embed_url)}>
//     {liked? (
//       <>
//       <StarIcon fill="yellow" strokeWidth={1} />
//       <span className="ml-1 mt-[0.1rem]">Liked</span>
//       </>
//     ) : (
//       <>
//       <StarIcon strokeWidth={1} />
//       <span className="ml-1 mt-[0.1rem]">Like</span>
//       </>
//     )}
//   </button>):
//   (
//     //for favorites page
//     <button className="flex mt-1 transition-all" onClick={()=>{handleLike(gif.gifyId,gif.url)}}>
//     {!liked ? (
//       <>
//       <StarIcon fill="yellow" strokeWidth={1} />
//       <span className="ml-1 mt-[0.1rem]">Liked</span>
//       </>
//     ) : (
//       <>
//       <StarIcon strokeWidth={1} />
//       <span className="ml-1 mt-[0.1rem]">Like</span>
//       </>
//     )}
//   </button>
//   )
//   }

//   </div>
// </div>
