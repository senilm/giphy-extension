import AvatarBox from "@/components/AvatarBox";

const FriendList = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 border rounded-lg p-4 space-y-4 max-h-[230px] overflow-auto ">
        <div className="text-lg font-bold">Friends</div>
        <div className="space-y-4">
         <AvatarBox/>
         <AvatarBox/>
        </div>
      </div>
  )
}

export default FriendList