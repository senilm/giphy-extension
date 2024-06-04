import AvatarBox from "@/components/AvatarBox";

const FriendList = ({friendData}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border rounded-lg p-4 space-y-4 max-h-[230px] overflow-auto ">
        <div className="text-lg font-bold">Friends</div>
        <div className="space-y-4">
          {friendData?.length > 0 ? friendData.map((item) => (
            <AvatarBox username={item.username} userId={item?.id} frd={true} friendId={item.id}/>
          )) :<div>No data</div>}
        </div>
      </div>
  )
}

export default FriendList