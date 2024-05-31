import AvatarBox from "./AvatarBox"
import Numbers from "./Numbers"

const UserCard = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 w-full md:w-64">
        <div className="flex items-center gap-4 mb-4 ">
          <AvatarBox/>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Numbers label={"Posts"}  number={24}/>
          <Numbers label={"Friends"} number={100}/>
          <Numbers label={"Likes"} number={257}/>
          <Numbers label={"comments"} number={154}/>
        </div>
      </div>
  )
}

export default UserCard