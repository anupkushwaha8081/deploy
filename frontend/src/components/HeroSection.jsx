

import React from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HeroSection = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const naviagte = useNavigate();
   const searchJobHandler = ()=>{
dispatch(setSearchedQuery(query))
naviagte("/browse");
   }
  return (
    <div className='text-center px-4'>
      <div className="flex flex-col gap-5 my-10">
        <span className='font-medium bg-gray-200 rounded-lg text-red-500 px-4 py-2 mx-auto text-sm sm:text-base'>
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Search, Apply & <br /> Get Your 
          <span className='text-purple-600'> Dream Jobs</span>
        </h1>
        <p className="text-sm sm:text-base max-w-md mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, earum.
        </p>
      </div>
      <div className="flex items-center shadow-lg w-full sm:w-[80%] md:w-[60%] lg:w-[40%] rounded-full gap-4 border border-gray-100 mx-auto p-2">
        <input 
          type="text" 
          placeholder='Find your dream job' onChange={(e)=>setQuery(e.target.value)}
          className='outline-none border-none w-full px-4 text-sm sm:text-base' 
        />
        <Button onClick={searchJobHandler} className="rounded-r-full bg-purple-600">
            <Search className="h-5 w-5"/>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
