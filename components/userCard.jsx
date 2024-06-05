"use client"
import AvatarBox from "./AvatarBox"
import Numbers from "./Numbers"
import { useState, useEffect } from "react"
import useStore from "@/store/store"
import Cookies from "js-cookie"

const UserCard = () => {
  const {user, totalLikes, totalComments, friends, posts, setUser,setPosts,setJoinDate,  setFriends, setTotalLikes,setTotalComments} = useStore();
  const userId = user?.id || Cookies.get("userId");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/user/${userId}`,{
        method:"GET"
      })  
      const res = await response.json();
      if(response.ok){
        setUser({
          id:res?._id?.$oid,
          bio:res?.bio,
          name:res?.name,
          username: res?.username,          
        });
        setJoinDate(res?.createdAt?.$date)
        setFriends(res?.Friends)
        setPosts(res?.Gifs)
        setTotalLikes(res?.likesCount);
        setTotalComments(res?.commentsCount)
      }else{
        console.error(res?.message)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(()=>{
    fetchUserData();
  },[])

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 w-full md:w-64">
        <div className="flex items-center gap-4 mb-4 ">
          <AvatarBox name={user?.name} username={user?.username} userId={userId}/>
        </div>
        {
          user?.bio && <div className=" font-mono text-gray-500 break-words">
          "{user?.bio}"
        </div>
        }
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Numbers label={"Posts"}  number={posts.length}/>
          <Numbers label={"Friends"} number={friends.length}/>
          <Numbers label={"Likes"} number={totalLikes}/>
          <Numbers label={"comments"} number={totalComments}/>
        </div>
      </div>
  )
}

export default UserCard