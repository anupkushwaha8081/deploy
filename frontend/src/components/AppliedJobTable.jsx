import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  // console.log("applied jobs",allAppliedJobs)
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>

            <TableHead>Job Role</TableHead>
            <TableHead>Date</TableHead>

            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        {/* <TableBody>
          {[1, 2, 3, 4].map((item, index) => (
            <TableRow key={index}>
              <TableCell>27-12-2024</TableCell>
              <TableCell>Frontend Developer</TableCell>
              <TableCell>Microsoft</TableCell>
              <TableCell className ='text-right'><Badge>Selected</Badge></TableCell>

            </TableRow>
          ))}
        </TableBody> */}
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You haven't applied any job yet</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar>
                    <Avatar className="">
                      <AvatarImage className="w-8 h-8" src={appliedJob?.job?.company?.[0].logo}></AvatarImage>
                    </Avatar>
                  </Avatar>

                  {appliedJob.job?.company?.[0].companyName}
                </TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>

                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
// import { useSelector } from "react-redux";
// import { Badge } from "./ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "./ui/table";

// const AppliedJobTable = () => {
//   const { allAppliedJobs } = useSelector((store) => store.job);
//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your applied jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Date</TableHead>
//             <TableHead>Job Role</TableHead>
//             <TableHead>Company</TableHead>
//             <TableHead classname="text-right">Status</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {allAppliedJobs.length <= 0 ? (
//             <span>You haven't applied any job yet</span>
//           ) : (
//             allAppliedJobs.map((appliedJob) => (
//               <TableRow key={appliedJob?._id}>
//                 <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
//                 <TableCell>{appliedJob.job?.title}</TableCell>
//                 <TableCell>{appliedJob.job?.company?.name}</TableCell>
//                 <TableCell>
//                   <Badge
//                     className={`${
//                       appliedJob?.status === "rejected"
//                         ? "bg-red-400"
//                         : appliedJob.status === "pending"
//                         ? "bg-gray-400"
//                         : "bg-green-400"
//                     }`}
//                   >
//                     {appliedJob.status}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AppliedJobTable;
