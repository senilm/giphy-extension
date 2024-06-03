import GifCard from "./GifCard";
import Cookies from "js-cookie";

const Feed = ({ gifData }) => {
  const likedGifs = Cookies.get('likedGifs')
  return (
    <>
      <div className="flex  min-h-screen flex-wrap justify-center gap-8 py-4 rounded">
        {gifData?.data.map((gif,i) => (
          <div key={gif.id + i}>
          <GifCard gif={gif} likedGifs={likedGifs} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
