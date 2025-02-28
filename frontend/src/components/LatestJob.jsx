// import React from 'react';
// import LatestJobCards from './LatestJobCards';

// let randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const LatestJob = () => {
//   return (
//     <div className='max-w-5xl mx-auto my-20'>
//       <h1 className="text-4xl font-bold my-2">
//         <span className='text-purple-600'>Latest & Top </span>
//         JO Openings
//       </h1>
//       <div className="grid grid-cols-3 gap-4 my-5">
//         {
//           randomJobs.slice(0, 6).map((item, index) => (
//             <LatestJobCards key={index} />
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default LatestJob;


// ye sahi kam kr rha tha pehle

// import LatestJobCards from "./LatestJobCards";

// import React from "react";
// import { useSelector } from "react-redux";
// import Job from "./Job";
// import { Button } from "./ui/button";
// import { ArrowRight } from "lucide-react";

// // let allJobs = [1,2,3,4,5,6,7,8];
// const LatestJob = () => {
//   const { allJobs } = useSelector((store) => store.job);
//   return (
//     <div className="max-w-6xl mx-auto my-20">
//       <div className="flex">
//       <h1 className="text-4xl font-bold ">
//         <span className="text-purple-600 ">Latest & Top </span>Job Openings
//       </h1>
      
//       <Button variant="outline" className="flex items-center text-right ml-auto">
//         See All
//         <ArrowRight className="w-5 h-5" />
//       </Button>
//       </div>

//       <div className="grid grid-cols-3 gap-4 my-5">
//         {allJobs.length <= 0 ? (
//           <span>No Job Available</span>
//         ) : (
//           allJobs?.slice(0, 6).map((job) => (
//             //  <LatestJobCards key={job._id} job={job}/>
//             <Job className="h-40" job={job}></Job>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default LatestJob;







import React from "react";
import { useSelector } from "react-redux";
import Job from "./Job";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.job);

  // Define number of jobs to show based on screen size using CSS utility classes
  const getVisibleJobs = () => {
    if (window.innerWidth >= 1024) {
      return allJobs.slice(0, 3);
    } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      return allJobs.slice(0, 4);
    } else {
      return allJobs.slice(0, 2);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto my-20 px-4 sm:px-6 md:px-12 lg:px-16">
      {/* Heading and button container */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="text-purple-600">Latest & Top </span>Job Openings
        </h1>

        <Button variant="outline" className="flex items-center">
          See All
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </div>

      {/* Responsive grid layout */}
      <div className="px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 my-5">
          {allJobs.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            getVisibleJobs().map((job) => <Job key={job._id} className="h-40" job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJob;
