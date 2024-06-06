import AvatarBox from "@/components/AvatarBox";

const FriendList = ({friendData}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border rounded-lg p-4 space-y-4 max-h-[230px] overflow-auto ">
        <div className="text-lg font-bold">Friends</div>
        <span className="text-xs">(List includes all the users that have added you as friends also)</span>
        <div className="space-y-4">
          {friendData?.length > 0 ? friendData.map((item,i) => (
            <AvatarBox username={item.username} name={item?.name} userId={item?.id} profilePicture={item?.profilePicture} frd={true} friendId={item.id} key={i}/>
          )) :<div className="text-gray-400 text-sm">Get some life, Create new friends</div>}
        </div>
      </div>
  )
}

export default FriendList