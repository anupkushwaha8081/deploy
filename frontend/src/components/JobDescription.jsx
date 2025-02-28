
// // ye sahi kar kar rha tha 
// import React, { useEffect, useState } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "./ui/button";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setSingleJob } from "../../redux/jobSlice";
// import { toast } from "sonner";
// import {
//   JOB_API_END_POINT,
//   Application_API_END_POINT,
// } from "../../utills/constant";

// const JobDescription = () => {
//   const { singleJob } = useSelector((store) => store.job);
//   const { user } = useSelector((store) => store.auth);
//   const isIntiallyApplied =
//     singleJob?.applications.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isIntiallyApplied);
//   const params = useParams();
//   const jobId = params.id;
//   const dispatch = useDispatch();

//   // const applyJobHandler = async () => {
//   //   try {
//   //     console.log(`${Application_API_END_POINT}/applyJob/${jobId}`)
//   //     const res = await axios.post(
//   //       `${Application_API_END_POINT}/applyJob/${jobId}`,
//   //       { withCredentials: true }
//   //     );
//   //     // console.log(res.data);
//   //     if (res.data.success) {
//   //       setIsApplied(true);
//   //       const updateSinglejob = {
//   //         ...singleJob,
//   //         applications: [...singleJob.applications, { applicant: user?._id }],
//   //       };
//   //       dispatch(setSingleJob(updateSinglejob));
//   //       toast.success(res.data.message);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error.response.data.message);
//   //   }
//   // };
//   const applyJobHandler = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
//       // console.log("Token:", token); // Print token
  
//       const res = await axios.post(
//         `${Application_API_END_POINT}/applyJob/${jobId}`,
//         {},
//         {
//           withCredentials: true,
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass token in Authorization header
//           },
//         }
//       );
  
//       if (res.data.success) {
//         setIsApplied(true);
//         const updateSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updateSingleJob));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log("Error:", error);
//       toast.error(error.response?.data?.message || "An error occurred.");
//     }
//   };
  
//   useEffect(() => {
//     const fetchSingleJob = async () => {
//       try {
//         const res = await axios(`${JOB_API_END_POINT}/getJobsId/${jobId}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           );
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSingleJob();
//   }, [jobId, dispatch, user?._id]);
//   return (
//     <div className="max-w-5xl mx-auto my-10">
//       <div className="flex itmes-center justify-between">
//         <div>
//           <h1 className="font-bold text-xl">{singleJob?.title}</h1>
//           <div className="flex gap-2 mt-2">
//             <Badge className={"text-blue-700 font-bold"} variant="ghost">
//               {singleJob?.position}Positions
//             </Badge>
//             <Badge className={"text-red-600 font-bold"} variant="ghost">
//               {singleJob?.jobType}
//             </Badge>
//             <Badge className={"text-indigo-600 font-bold"} variant="ghost">
//               {singleJob?.salary}LPA
//             </Badge>
//           </div>
//         </div>
//         <Button
//           onClick={isApplied ? null : applyJobHandler}
//           disabled={isApplied}
//           className={`rounded-lg ${
//             isApplied
//               ? "bg-gray-600 cursor-not-allowed"
//               : "bg-indigo-600 hover:bg-indigo-700"
//           }`}
//         >
//           {isApplied ? "Already Applied" : "Apply Now"}
//         </Button>
//       </div>
//       <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
//         Job Description
//       </h1>
//       <div>
//         <h1 className="font-bold my-1">
//           Role:
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.title}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Location:
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.location}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Description:
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.description}
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Experience:
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.experienceLevel} yrs
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Salary:
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.salary}LPA
//           </span>
//         </h1>
//         <h1 className="font-bold my-1">
//           Total Applicants:
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.applications?.length}
//           </span>
//         </h1>
//         {/* <h1 className="font-bold my-1">Posted Date:<span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1> */}
//         <h1 className="font-bold my-1">
//           Posted Date:
//           <span className="pl-4 font-normal text-gray-800">
//             {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "N/A"}
//           </span>
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default JobDescription;



import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import { toast } from "sonner";
import {
  JOB_API_END_POINT,
  Application_API_END_POINT,
} from "../../utills/constant";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singleJob?.applications.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${Application_API_END_POINT}/applyJob/${jobId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios(`${JOB_API_END_POINT}/getJobsId/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl md:text-2xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-red-600 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-indigo-600 font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        
        {/* Apply Button - Positioned Below Title on Small Screens */}
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-gray-300 font-medium py-4 mt-4">
        Job Description
      </h1>

      <div className="space-y-3 text-gray-800">
        <h1 className="font-bold">
          Role:
          <span className="pl-2 font-normal">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold">
          Location:
          <span className="pl-2 font-normal">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold">
          Description:
          <span className="pl-2 font-normal">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold">
          Experience:
          <span className="pl-2 font-normal">{singleJob?.experienceLevel} yrs</span>
        </h1>
        <h1 className="font-bold">
          Salary:
          <span className="pl-2 font-normal">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold">
          Total Applicants:
          <span className="pl-2 font-normal">{singleJob?.applications?.length}</span>
        </h1>
        <h1 className="font-bold">
          Posted Date:
          <span className="pl-2 font-normal">
            {singleJob?.createdAt ? singleJob.createdAt.split("T")[0] : "N/A"}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;




