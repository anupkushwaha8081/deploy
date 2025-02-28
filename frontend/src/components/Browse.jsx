// import React from 'react'
// import Job from './Job';
// import { useEffect } from 'react';
// import { useDispatch, useSelector,  } from 'react-redux';
// import {useGetAllJobs} from '../../src/hooks/useGetAllJobs';
// import { setSearchedQuery } from '../../redux/jobSlice';
// // const randomJobs =[1,2,3,4,5,6,7,8,9,10];

// const Browse = () => {
//   useGetAllJobs();
//   const {allJobs} = useSelector(store=>store.job);
//   const dispatch = useDispatch();
//   useEffect(()=>{
//     return()=>{
//       dispatch(setSearchedQuery(""))
//     }
//   },[])
//   return (
//     <div>
//       <div className='max-w-6xl mx-auto my-10'>
//       <h1 className='font-bold text-xl my-10'>searchb result({allJobs.length})</h1>
//       {/* <div className="grid grid-cols-3 gap-4">
//         {
//           randomJobs.map((item,index)=>{
//             return <Job/>
//           })
//         }
//       </div> */}

// <div className='grid grid-cols-3 gap-4'>
            
//             {
//      allJobs.map((job)=>{
//        return(
//          <Job key={job._id} job={job}/>
//        )
//      })
//      }
            
//        </div>
//       </div>

//     </div>
//   )
// }

// export default Browse


import React, { useEffect } from "react";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllJobs } from "../../src/hooks/useGetAllJobs";
import { setSearchedQuery } from "../../redux/jobSlice";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="font-bold text-xl my-10">
        Search Results ({allJobs.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allJobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
