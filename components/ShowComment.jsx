import { getTimeAgo } from "@/lib/getDate";
import AvatarBox from "./AvatarBox";

const ShowComment = ({ user, comment, createdAt }) => {
  return (

    <div className="border rounded-md p-3 space-y-3 w-full">
      <div className=" flex justify-between">

      <AvatarBox
        username={user?.username}
        name={user?.name}
        userId={user?.id}
        />
        <div className=" text-sm text-gray-400 text-end ">{getTimeAgo(createdAt)}</div>

        </div>
      <div className="break-words max-w-[100%]">{comment}</div>
    </div>
  );
};

export default ShowComment;
