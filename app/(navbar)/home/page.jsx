import GifFeed from "@/components/GifFeed"
import UserCard from "@/components/userCard"
import UploadBox from "@/components/UploadBox"
import RightWidget from "@/components/RightWidget"
import UploadGifModal from "@/components/UploadGifModal"
import ScrollToTop from "@/components/ScrollToTop"
import { cookies } from 'next/headers'

const Home = () => {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');

  return (
    <div key="1" className="flex flex-col unset md:flex-row gap-6 p-6 border rounded-xl bg-white relative min-h-[calc(100vh-4rem)]">
      <div className="md:sticky md:top-6 md:left-0 md:max-h-0">
      <UserCard userId={userId}/>
      </div>
      <div className="flex-1 space-y-6">
        <UploadGifModal userId={userId}/>
        <GifFeed/>
      </div>
      <div className="md:sticky md:top-6 md:left-0 md:max-h-0">
      <RightWidget/>
      </div>
      <ScrollToTop/>
    </div>
  )
}
export default Home