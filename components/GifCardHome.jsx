import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HeartIcon, MaximizeIcon, MessageCircleIcon } from "@/lib/icons";
import AvatarBox from "./AvatarBox";

const GifCardHome = () => {
  return (
    <Card className="">
      <div className="relative group cursor-pointer">
        <img
          alt="GIF"
          className="aspect-square object-cover rounded-t-lg"
          height={300}
          src="https://res.cloudinary.com/dnfoei2al/image/upload/v1717401481/gywnvalquigj7t9k11ox.gif"
          width={300}
        />
        <div className="absolute rounded-lg inset-0 bg-gray-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <MaximizeIcon className="w-8 h-8 text-white" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
         <AvatarBox/>
          {/* <Button className="rounded-full" size="icon" variant="ghost">
          <MoveHorizontalIcon className="w-5 h-5" />
        </Button> */}
        </div>
        <div className="text-xs text-gray-500 mb-4 truncate">
          This is a funny GIF of a cat playing with a laser pointer. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Sint unde in obcaecati
          corrupti fuga est?
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-5 text-gray-500">
            <div className="flex items-center gap-1">
              <Button className="rounded-full" size="icon" variant="ghost">
                <HeartIcon className="w-5 h-5" />
              </Button>
              <div className=" text-xs">123</div>
            </div>
            <div className="flex items-center gap-1">
              <Button className="rounded-full" size="icon" variant="ghost">
                <MessageCircleIcon className="w-5 h-5" />
              </Button>
              <div className="text-xs">45</div>
            </div>
          </div>
          <div className="text-xs text-gray-300 text-right mt-2 mb-[-5px]">
            2 hours ago
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GifCardHome;
