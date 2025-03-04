import React, { useEffect } from 'react';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJob from './LatestJob';
import { useGetAllJobs } from '../hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
useGetAllJobs();
const {user} = useSelector(store=>store.auth);
const navigate = useNavigate();
useEffect(()=>{
  if(user?.role == "Recruiter"){
     navigate("/admin/companies")
  }
},[])
  return (
    <div>
      <HeroSection></HeroSection>
      <CategoryCarousel/>
      <LatestJob/>

    </div>
  )
}
