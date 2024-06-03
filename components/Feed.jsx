import GifCard from "./GifCard";
import Cookies from "js-cookie";

const Feed = ({ gifData }) => {
  const likedGifs = Cookies.get('likedGifs') || []
  return (
    <>
      <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 m-4">
        {gifData?.data.map((gif,i) => (
          <GifCard key={gif.id + i} gif={gif} likedGifs={likedGifs} />
        ))}
      </div>
    </>
  );
};

export default Feed;
