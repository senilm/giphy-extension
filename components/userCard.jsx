"use client"
import AvatarBox from "./AvatarBox"
import Numbers from "./Numbers"
import { useState, useEffect } from "react"

const UserCard = ({userId}) => {
  const [userData, setUserData] = useState({});
  
  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/user/${userId.value}`,{
        method:"GET"
      })  
      const res = await response.json();
      if(response.ok){
        setUserData(res);
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
          <AvatarBox name={userData?.name} username={userData?.username}/>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <Numbers label={"Posts"}  number={userData?.gifCount}/>
          <Numbers label={"Friends"} number={userData?.friendsCount}/>
          <Numbers label={"Likes"} number={userData?.likesCount}/>
          <Numbers label={"comments"} number={userData?.commentsCount}/>
        </div>
      </div>
  )
}

export default UserCard