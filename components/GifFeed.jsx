import GifCardHome from "./GifCardHome";

const GifFeed = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
        <GifCardHome/>
        
      </div>
    </>
  );
};

export default GifFeed;
