import LinkButton from "./LinkButton";
import { searchTermOptions } from "@/lib/consts";
const Topics = () => {
  return (
    <>
      <h3 className="text-lg font-bold mb-4">Trending Topics</h3>
      <div className="grid grid-cols-2 gap-4">
        {searchTermOptions.map((option)=>(
        <LinkButton href={`/explore/${option}`} label={option} key={option} />
        ))}
       
      </div>
    </>
  );
};

export default Topics;
