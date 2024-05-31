import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const AvatarBox = () => {
  const name = "Senil Mendapara";
  const username = "senilMmmmmmmmmmmmmmmmmmmmmm"
  return (
    <div className="flex gap-4">
    <div>
      <Avatar className="border">
        <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
      <div>
        <div className="text-sm font-medium truncate md:max-w-[8.5rem] " >{name}</div>
        <Link href={`/profile/${username}`}>
        <div className="text-sm text-gray-500 truncate md:max-w-[8.5rem] hover:underline hover:text-blue-400 cursor-pointer">@{username}</div>
        </Link>

      </div>
    </div>
  );
};

export default AvatarBox;
