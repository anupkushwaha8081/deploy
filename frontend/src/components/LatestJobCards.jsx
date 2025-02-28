// import React from 'react'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'



// const LatestJobCards = ({job}) => {
//   // return (
//   //   <div className='p-5 rounded-md cursor-pointer shadow-xl bg-white border-gray-100'>
//   //       <div className="">
//   //           <h1 className='font-medium text-lg'>Company name</h1>
//   //           <p className='text-sm text-gray-500'>India</p>
//   //       </div>
//   //       <div className="">
//   //           <h1 className='font-bold text-lg'>job title</h1>
//   //           <p className='text-sm text-gray-500'>Lelit. Lorem ipsum dolo</p> 
//   //       </div>
//   //       <div className="flex items-center gap-2 mt-4">
//   //           <Badge className='text-blue-700 font-bold bg-gray-100 border-gray-100' varient="ghost">21 positions</Badge>
//   //           <Badge className='text-purple-400 font-bold bg-gray-100 border-gray-100'varient="ghost">Part Time </Badge>   
//   //           <Badge className='text-yellow-700 font-bold bg-gray-100 border-gray-100'varient="ghost">3LPA</Badge>
//   //       </div>
//   //   </div>
//   // )
//  const navigate = useNavigate();
//   return (
//     <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
//       <div>
//         <h1 className='font-medium text-lg'>{job?.company?.companyName || "Unknown Company"}</h1>
//         <p className='text-sm text-gray-500'>India</p>
//       </div>
//       <div>
//         <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//         <p className='text-sm text-gray-600'>{job?.description}</p>
//       </div>
//       <div className='flex items-center gap-2 mt-4'>
//         <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Positions</Badge>
//         <Badge className={"text-red-700 font-bold"} variant="ghost">{job?.jobType}</Badge>
//         <Badge className={"text-purple-600 font-bold"} variant="ghost">{job?.salary}LPA</Badge>
//       </div>
//     </div>
//   )
// }

// export default LatestJobCards



// ye sahi kam kar rha tha pehle
// import React, { useState } from "react";
// import { Badge } from "./ui/badge";
// import { useNavigate } from "react-router-dom";

// const LatestJobCards = ({ job }) => {
//   const navigate = useNavigate();
//   const [expanded, setExpanded] = useState(false);

//   // Truncate the description to 100 characters initially
//   const truncatedDescription =
//     job?.description?.length > 100 ? job.description.slice(0, 100) + "..." : job.description;

//   return (
//     <div
//       onClick={() => navigate(`/description/${job._id}`)}
//       className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer flex flex-col justify-between min-h-[300px]"
//     >
//       {/* Company Info */}
//       <div>
//         <h1 className="font-medium text-lg">{job?.company?.companyName || "Unknown Company"}</h1>
//         <p className="text-sm text-gray-500">India</p>
//       </div>

//       {/* Job Title and Description */}
//       <div>
//         <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//         <p className="text-sm text-gray-600">
//           {expanded ? job?.description : truncatedDescription}
//           {job?.description?.length > 100 && (
//             <span
//               className="text-blue-500 cursor-pointer ml-1"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click navigation
//                 setExpanded(!expanded);
//               }}
//             >
//               {expanded ? " See Less" : " See More"}
//             </span>
//           )}
//         </p>
//       </div>

//       {/* Job Details */}
//       <div className="flex items-center gap-2 mt-4">
//         <Badge className={"text-blue-700 font-bold"} variant="ghost">
//           {job?.position} Positions
//         </Badge>
//         <Badge className={"text-red-700 font-bold"} variant="ghost">
//           {job?.jobType}
//         </Badge>
//         <Badge className={"text-purple-600 font-bold"} variant="ghost">
//           {job?.salary} LPA
//         </Badge>
//       </div>
//     </div>
//   );
// };

// export default LatestJobCards;


import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  // Truncate the description to 100 characters initially
  const truncatedDescription =
    job?.description?.length > 100 ? job.description.slice(0, 100) + "..." : job.description;

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer flex flex-col justify-between min-h-[280px] sm:min-h-[300px] transition-all hover:shadow-2xl"
    >
      {/* Company Info */}
      <div>
        <h1 className="font-medium text-lg">{job?.company?.companyName || "Unknown Company"}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {expanded ? job?.description : truncatedDescription}
          {job?.description?.length > 100 && (
            <span
              className="text-blue-500 cursor-pointer ml-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click navigation
                setExpanded(!expanded);
              }}
            >
              {expanded ? " See Less" : " See More"}
            </span>
          )}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-700 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-purple-600 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;

