"use client";
import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";


export default function Home() {
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


  let debounceTimeout;

  const fetchGif = async () => {
    
    console.log('serching here outside')

    let response
    if(searchTerm.trim().length === 0){
      response = await fetch(trendUrl)
    }else {
      response = await fetch(searchUrl)
    }

    if (searchTerm) { 
      try {
        await fetch(`/api/searchTerm/${searchTerm}/${currentPage}`)
        console.log('after');
      } catch (error) {
        console.log(error);
      }
      
    }
    if (response.ok) {
      const data = await response.json();
      setGifData(data);
    } else {
      throw new Error("Failed to fetch data");
    }
  };

useEffect(()=>{
  setCurrentPage(1)
},[searchTerm])
  useEffect(() => {
    // Clear previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    // Set a new debounce timeout
    debounceTimeout = setTimeout(() => {
      fetchGif();
    }, 500);

    // Clean up the timeout when the component unmounts
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
        <Navbar setSearchTerm={setSearchTerm} />
        <Feed gifData={gifData} />
        <Pagination onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
            currentPage={currentPage}
            handleButtonClick={handleButtonClick}/>
      </div>
    </>
  );
}


