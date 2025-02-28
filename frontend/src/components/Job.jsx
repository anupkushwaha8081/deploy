// import { Bookmark } from "lucide-react";
// import React from "react";
// import { Button } from "./ui/button";
// import { Avatar } from "@radix-ui/react-avatar";
// import { Badge } from "./ui/badge";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import { useNavigate } from "react-router-dom";

// const Job = ({job}) => {
//   const navigate = useNavigate();
//   // const jobId = "5454785adsvfsh"
//   const daysAgoFunction = (mongodbTime) =>{
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDiffernce = currentTime - createdAt;
//     return Math.floor(timeDiffernce/(1000*24*60*60));
//   }

//   return (
//     <div className="p-5 rounded-md gap-2 flex flex-col shadow-xl bg-white border-gray-100">
//       <div className="flex items-center justify-between ">
//         {/* <p className="text-sm text-gray-500">2 days ago</p> */}
//      <p className='text-sm text-gray-600' >{daysAgoFunction(job?.createdAt) === 0 ? "Today": `${daysAgoFunction(job?.createdAt)}`} days ago</p>

//         <button
//           className="rounded-full mr-5 ml-auto"
//           variant="outline"
//           size="icon"
//         >
//           <Bookmark />
//         </button>
//       </div>
//       <div className="flex items-center gap-2 my-2">
//         <Button className=" p-6" variant="outline" size="icon">
//           {/*size ="icon"*/}
//           <Avatar className="w-5 h-5">
//             {/* <AvatarImage src="https://png.pngtree.com/png-vector/20211023/ourmid/pngtree-salon-logo-png-image_4004444.png"></AvatarImage>
//             //  */}<AvatarImage src={job?.company?.logo}/>
//           </Avatar>
//         </Button>
//         <div>
//           <h1>{job?.company?.companyName}</h1>
//           <p>India</p>
//         </div>
//       </div>
//       <div className="">
//         <h1 className="font-bold text-lg my-2">{job?.title}</h1>
//         <p className="text-sm text-gray-500">
//         {job?.description}
//         </p>
//       </div>
//       <div className="flex items-center gap-2 mt-4">
//         <Badge
//           className="text-blue-700 font-bold "
//           variant="ghost"
//         >
//          {job?.position} Positions
//         </Badge>
//         <Badge
//           className="text-red-400 font-bold "
//           variant="ghost"
//         >
//           {job?.jobType}
//         </Badge>
//         <Badge
//           className="text-yellow-700 font-bold "
//           variant="ghost"
//         >
//           {job?.salary}LPA
//         </Badge>
//       </div>
//       <div className="flex gap-2 rounded-full">
//         <Button variant="outline" className="" onClick ={()=>navigate(`/description/${job?._id}`)}>
//           Details
//         </Button>
//         <Button variant="outline" className="bg-purple-200">
//           save for later
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Job;



// ye sahi tha 
// import { Bookmark } from "lucide-react";
// import React, { useEffect } from "react";
// import { Button } from "./ui/button";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "./ui/badge";
// import { useNavigate } from "react-router-dom";

// const Job = ({ job }) => {
//   const navigate = useNavigate();

//   // Log job data when component renders
//   useEffect(() => {
//     console.log("Job data:", job);
//   }, [job]);

//   // Function to calculate days ago
//   const daysAgoFunction = (mongodbTime) => {
//     if (!mongodbTime) return "N/A";
//     const createdAt = new Date(mongodbTime);
//     const currentTime = new Date();
//     const timeDifference = currentTime - createdAt;
//     return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//   };

//   return (
//     <div className="p-5 rounded-md gap-2 flex flex-col shadow-xl bg-white border-gray-100">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-600">
//           {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
//         </p>

//         <button className="rounded-full mr-5 ml-auto" variant="outline" size="icon">
//           <Bookmark />
//         </button>
//       </div>

//       {/* Company Section */}
//       <div className="flex items-center gap-2 my-2">
//         <Button className="p-6" variant="outline" size="icon">
//           <Avatar className="w-10 h-10">
//             <AvatarImage src={job?.company?.logo || "/fallback-logo.png"} alt="Company Logo" />
//             <AvatarFallback>?</AvatarFallback>
//           </Avatar>
//         </Button>
//         <div>
//           <h1 className="font-semibold">{job?.company?.companyName || "Unknown Company"}</h1>
//           <p className="text-gray-500">India</p>
//         </div>
//       </div>

//       {/* Job Description */}
//       <div>
//         <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
//         <p className="text-sm text-gray-500">{job?.description || "No description available."}</p>
//       </div>

//       {/* Job Details */}
//       <div className="flex items-center gap-2 mt-4">
//         <Badge className="text-blue-700 font-bold" variant="ghost">
//           {job?.position || 0} Positions
//         </Badge>
//         <Badge className="text-red-400 font-bold" variant="ghost">
//           {job?.jobType}
//         </Badge>
//         <Badge className="text-yellow-700 font-bold" variant="ghost">
//           {job?.salary ? `${job.salary} ` : "Salary Not Disclosed"}
//         </Badge>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-2 rounded-full">
//         <Button variant="outline" onClick={() => navigate(`/description/${job?._id}`)}>
//           Details
//         </Button>
//         <Button variant="outline" className="bg-purple-200">
//           Save for later
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Job;




import { Bookmark } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    console.log("Job data:", job);
  }, [job]);

  // Function to calculate days ago
  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return "N/A";
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  // Truncate description
  const truncatedDescription =
    // job?.description?.length > 100 ? job.description.slice(0, 100) + "..." : job.description;/
    job?.description?.length > 100 ? job?.description?.slice(0, 100) + "..." : job?.description || ""


  return (
    <div className="p-5 rounded-md gap-2 flex flex-col shadow-xl bg-white border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        <button className="rounded-full mr-5 ml-auto" variant="outline" size="icon">
          <Bookmark />
        </button>
      </div>

      {/* Company Section */}
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar className="w-10 h-10">
            <AvatarImage src={job?.company?.[0].logo } alt="Company Logo" />
            {/* <AvatarFallback>?</AvatarFallback> */}
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold">{job?.company?.[0].companyName || "Unknown Company"}</h1>
          <p className="text-gray-500">India</p>
        </div>
      </div>

      {/* Job Description with Read More / Read Less */}
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
        <p className="text-sm text-gray-500">
          {expanded ? job?.description : truncatedDescription}
          {job?.description?.length > 100 && (
            <span
              className="text-blue-500 cursor-pointer ml-1"
              onClick={(e) => {
                e.stopPropagation(); // Prevents navigation when toggling text
                setExpanded(!expanded);
              }}
            >
              {expanded ? " Read Less" : " Read More"}
            </span>
          )}
        </p>
      </div>

      {/* Job Details */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position || 0} Positions
        </Badge>
        <Badge className="text-red-400 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-yellow-700 font-bold" variant="ghost">
          {job?.salary ? `${job.salary} ` : "Salary Not Disclosed"}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 rounded-full">
        <Button variant="outline" onClick={() => navigate(`/description/${job?._id}`)}>
          Details
        </Button>
        <Button variant="outline" className="bg-purple-200">
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default Job;
