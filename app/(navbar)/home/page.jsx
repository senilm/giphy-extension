import GifFeed from "@/components/GifFeed"
import UserCard from "@/components/userCard"
import UploadBox from "@/components/UploadBox"
import RightWidget from "@/components/RightWidget"
import UploadGifModal from "@/components/UploadGifModal"
import ScrollToTop from "@/components/ScrollToTop"

const Home = () => {
  return (
    <div key="1" className="flex flex-col unset md:flex-row gap-6 p-6 border rounded-xl bg-white relative">
      <div className="md:sticky md:top-6 md:left-0 md:max-h-0">
      <UserCard/>
      </div>
      <div className="flex-1 space-y-6">
        {/* <UploadBox/> */}
        <UploadGifModal/>
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