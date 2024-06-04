import AvatarBox from "./AvatarBox";

const ShowComment = ({ user, comment }) => {
  return (
    <div className="border p-3 space-y-3">
      <AvatarBox
        username={user?.username}
        name={user?.name}
        userId={user?.id}
      />
      <div>{comment}</div>
    </div>
  );
};

export default ShowComment;
