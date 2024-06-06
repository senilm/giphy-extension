import GifCard from "./GifCard";

const Feed = ({ gifData }) => {
  return (
    <>
      <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1 m-4">
        {gifData?.data.map((gif,i) => (
          <GifCard key={gif.id + i} gif={gif}  />
        ))}
      </div>
    </>
  );
};

export default Feed;
