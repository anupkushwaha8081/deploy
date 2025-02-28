
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Eye } from "lucide-react";
import { AvatarImage, Avatar } from "../ui/avatar";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job); // ✅ Now matches Redux state
  const [filteredJobs, setFilteredJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!allAdminJobs || allAdminJobs.length === 0) {
      setFilteredJobs([]);
      return;
    }

    // ✅ Now filtering by job title (role) as well
    const filteredData = allAdminJobs.filter((job) =>
      searchJobByText
        ? job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.[0]?.companyName
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        : true
    );

    setFilteredJobs(filteredData);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              console.log("Job Data:", job); 
              return (
                <TableRow key={job._id}>
                  {/* <TableCell></TableCell> */}

                  <TableCell className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={job?.company?.[0].logo}></AvatarImage>
                    </Avatar>

                    {job?.company?.[0]?.companyName || "N/A"}
                  </TableCell>
                  <TableCell>{job?.title || "N/A"}</TableCell>
                  <TableCell>
                    {job?.createdAt ? job.createdAt.split("T")[0] : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className="flex items-center gap-2 w-fit cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
