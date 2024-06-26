"use client"
import Feed from "@/components/Feed";
import Pagination from "@/components/Pagination";
import ExploreSkeleton from "@/components/exploreSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

const Explore = ({params}) => {
    const {searchTag} = params; 
    const [searchTerm, setSearchTerm] = useState(searchTag ? searchTag[0] : "");
    const [loading, setLoading] = useState(true);
    const [gifData, setGifData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
    const limit = 25;
    const calculateOffset = (page) => (page - 1) * limit;
    
    // const observerRef = useRef(null);
  
    const trendUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${calculateOffset(
      currentPage
      )}`;
    
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${calculateOffset(
      currentPage
    )}`;

    let debounceTimeout;

    // const handleObserver = (entries) => {
    //   if (entries[0].isIntersecting) {
    //     setCurrentPage((prevPage) => prevPage + 1);
    //   }
    // };
    // useEffect(() => {
    //   const observerOptions = {
    //     root: null,
    //     rootMargin: "0px",
    //     threshold: 0.5,
    //   };
  
    //   const observer = new IntersectionObserver(handleObserver, observerOptions);
  
    //   if (observerRef.current) {
    //     observer.observe(observerRef.current);
    //   }
  
    //   return () => {
    //     if (observerRef.current) {
    //       observer.unobserve(observerRef.current);
    //     }
    //   };
    // }, [observerRef.current]);
  
    
  
    const fetchGif = async () => {
      let response
      if(searchTerm.trim().length === 0){
        response = await fetch(trendUrl)
      }else {
        response = await fetch(searchUrl)
      }
  
      if (searchTerm) { 
        try {
          await fetch(`/api/searchTerm/${searchTerm}/${currentPage}`)
        } catch (error) {
          console.log(error);
        }
        
      }
      if (response.ok) {
        const data = await response.json();
        setGifData(data)
        // setGifData((prevData) => {
        //   if (!prevData) return newData;
        //   return {
        //     ...newData,
        //     data: [...prevData.data, ...newData.data],
        //   };
        // });
      }else {
        throw new Error("Failed to fetch data");
      }
      setLoading(false);
    };
  
    useEffect(()=>{
      setCurrentPage(1)
    },[searchTerm])
  
    useEffect(() => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      debounceTimeout = setTimeout(() => {
        fetchGif();
      }, 500);
  
      return () => {
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }
      };
    }, [searchTerm,currentPage]);
  
  
    const handlePreviousClick = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleButtonClick = (num) => {
      setCurrentPage(num);
    };
  
    const handleNextClick = () => {
      setCurrentPage(currentPage + 1);
    };
  
    return (
      <>
        <div className="border  rounded-xl bg-white">
          <div className=" flex gap-5 justify-center">
            <Input
              type="text"
              defaultValue={searchTerm}
              className=" border pr-8 pl-3 rounded-lg bg-gray-100 w-[40%] py-3 mt-5"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search GIF here"
            />
          </div>
          {loading ? 
          <div className="flex justify-between mt-3 m-4 flex-wrap">
             <ExploreSkeleton/> 
             <ExploreSkeleton/> 
             <ExploreSkeleton/> 
             <ExploreSkeleton/> 
            </div> : 
          <>
          <Feed gifData={gifData} />
          {/* <div ref={observerRef}></div> */}
          <Pagination onPreviousClick={handlePreviousClick}
          onNextClick={handleNextClick}
          currentPage={currentPage}
          handleButtonClick={handleButtonClick}/>
          </>
        }
        </div>
      </>
    );
}

export default Explore