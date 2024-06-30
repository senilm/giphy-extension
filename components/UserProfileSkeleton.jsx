import { Skeleton } from "./ui/skeleton"

const UserProfileSkeleton = () => {
  return (
    <div className="space-y-6 border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-14 rounded-full" />
        <div className="flex flex-col w-full gap-2">
          <Skeleton className="h-4 w-[70%]" />
          <Skeleton className="h-4 w-[30%]" />
        </div>
        <Skeleton className="h-8 w-10 rounded-full ml-auto" />
      </div>
      <Skeleton className="h-4 w-full text-sm text-gray-500 dark:text-gray-400" />
      <Skeleton className="h-4 w-full text-sm text-gray-500 dark:text-gray-400" />
      <Skeleton className="h-4 w-full text-sm text-gray-500 dark:text-gray-400" />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      </div>
    </div>
  )
}

export default UserProfileSkeleton