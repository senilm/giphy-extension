import { Button } from "@/components/ui/button"
import { CalendarDaysIcon, DeleteIcon, HeartIcon, MaximizeIcon, UsersIcon } from "@/lib/icons"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarBox from "@/components/AvatarBox";
import EditProfileModal from "@/components/EditProfileModal";
import FriendList from "@/components/FriendList";

const Profile = ({params}) => {
  const {username} = params;
  return (
    <div className="p-6 border rounded-xl bg-white">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto  md:px-0 ">
       <div className="space-y-6 border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <AvatarBox/>
          <Button className="ml-auto" size="icon" variant="outline">
            <EditProfileModal/>
            <span className="sr-only">Edit profile</span>
          </Button>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Hey there! I am a GIF enthusiast and love sharing my favorite moments. Check out my collection!
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>Joined May 2023</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <HeartIcon className="w-4 h-4" />
            <span>120 Likes</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <UsersIcon className="w-4 h-4" />
            <span>50 Friends</span>
          </div>
        </div>
      </div>
      
      {/* friends */}
      <FriendList/>

      {/* gifs */}
      <div className="col-span-full">
        <div className="text-lg font-bold">My GIFs</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          <div className="relative group cursor-pointer">
            <img
              alt="GIF"
              className="aspect-square object-cover rounded-lg"
              height={300}
              src="/dance.gif"
              width={300}
            />
            <div className="absolute rounded-lg inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MaximizeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <img
              alt="GIF"
              className="aspect-square object-cover rounded-lg"
              height={300}
              src="/200w.gif"
              width={300}
            />
            <div className="absolute rounded-lg  inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MaximizeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <img
              alt="GIF"
              className="aspect-square object-cover rounded-lg"
              height={300}
              src="/duck.gif"
              width={300}
            />
            <div className="absolute rounded-lg  inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MaximizeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <img
              alt="GIF"
              className="aspect-square object-cover rounded-lg"
              height={300}
              src="/dance.gif"
              width={300}
            />
            <div className="absolute rounded-lg  inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MaximizeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="relative group cursor-pointer">
            <img
              alt="GIF"
              className="aspect-square object-cover rounded-lg"
              height={300}
              src="/200w.gif"
              width={300}
            />
            <div className="absolute inset-0 bg-gray-900/50 flex rounded-lg  items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MaximizeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Profile