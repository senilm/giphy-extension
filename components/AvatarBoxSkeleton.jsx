import { Skeleton } from "./ui/skeleton";

const AvatarBoxSkeleton = () => {
  return (
    <div className="flex items-center mb-2 gap-2">
          <Skeleton className="h-10 w-14 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-[86%]" />
            <Skeleton className="h-4 w-[40%]" />
          </div>
        </div>
  )
}

export default AvatarBoxSkeleton