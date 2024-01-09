import { StarIcon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";


const GifCard = ({ gif,likedGifs=null,fetchData=null}) => {
  
  const pathname = usePathname()
  const [liked, setLiked] = useState(likedGifs ? likedGifs.includes(gif.id || gif.gifyId) : false);

  const handleLike = async (gifId,gifUrl) => {
    if (pathname !== '/favorite') { 
      setLiked(!liked);
    }
    try {
      const data= await fetch(`api/like/${gifId}`,{
        method:"PATCH",
        body:JSON.stringify({gifUrl})
      })
      if(data.ok){
        setLiked(!liked)
        if (fetchData) {
          fetchData()

        }  
      }
    } catch (error) {
      console.log(error);
    }
    

  };
  return (
    <div>
      <div className=" flex flex-col">
        <iframe
          src={gif.embed_url || gif.url}
          frameBorder="0"
          width={260}
          height={260}
          key={gif.id}
          className="rounded-lg relative"
        ></iframe>

      {
        // for home page
        pathname === '/' ? (
        <button className="flex mt-1 transition-all" onClick={()=>handleLike(gif.id,gif.embed_url)}>
        {liked? (
          <>
          <StarIcon fill="yellow" strokeWidth={1} />
          <span className="ml-1 mt-[0.1rem]">Liked</span>
          </>
        ) : (
          <>
          <StarIcon strokeWidth={1} />
          <span className="ml-1 mt-[0.1rem]">Like</span>
          </>
        )}
      </button>):
      (
        //for favorites page
        <button className="flex mt-1 transition-all" onClick={()=>{handleLike(gif.gifyId,gif.url)}}>
        {!liked ? (
          <>
          <StarIcon fill="yellow" strokeWidth={1} />
          <span className="ml-1 mt-[0.1rem]">Liked</span>
          </>
        ) : (
          <>
          <StarIcon strokeWidth={1} />
          <span className="ml-1 mt-[0.1rem]">Like</span>
          </>
        )}
      </button>
      )
      }
        


      </div>
    </div>
  );
};

export default GifCard;


