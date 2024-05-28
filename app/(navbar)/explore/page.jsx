"use client"
import Feed from "@/components/Feed";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [gifData, setGifData] = useState(null);
    const [type, setType] = useState("trending");
    const [currentPage, setCurrentPage] = useState(1);
    const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
    const limit = 12;
    const calculateOffset = (page) => (page - 1) * limit;
  
    const trendUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${calculateOffset(
      currentPage
      )}`;
    
    const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${calculateOffset(
      currentPage
    )}`;

    const handleChange = (e) =>{
      setSearchTerm(e.target.value)
    }

    let debounceTimeout;
  
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
        // console.log(data);
        setGifData(data);
      } else {
        throw new Error("Failed to fetch data");
      }
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
              className=" border pr-8 pl-3 rounded-lg bg-gray-100 w-[40%] py-3 mt-5"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search GIF here"
            />
          </div>

          <Feed gifData={gifData} />

          <Pagination onPreviousClick={handlePreviousClick}
              onNextClick={handleNextClick}
              currentPage={currentPage}
              handleButtonClick={handleButtonClick}/>
        </div>
      </>
    );
}

export default Explore