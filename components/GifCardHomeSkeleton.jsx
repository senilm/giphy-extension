import { Skeleton } from "./ui/skeleton"

const GifCardHomeSkeleton = () => {
  return (
    <div className="border rounded-lg">
      <Skeleton className="aspect-square w-full h-72 object-cover rounded-t-lg" />
      <div className="p-4">
        <div className="flex items-center mb-4 gap-4">
          <Skeleton className="h-10 w-16 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-[30%]" />
          </div>
          <Skeleton className="h-8 w-14 rounded-full ml-auto" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-1/2 mt-2" />
          <div className="flex items-center gap-2 text-gray-500">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GifCardHomeSkeleton