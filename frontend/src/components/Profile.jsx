import React, { useState } from "react";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Pen, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import { useSelector } from "react-redux";
import UpdateProfileDialog from "./UpdateProfileDialog";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const isResume = true;
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="px-6 md:px-10 lg:px-15">
      {/* Profile Section */}
      <div className="max-w-5xl mt-10 mx-auto bg-white border border-gray-400 rounded-2xl p-6 sm:p-10">
        <div>
          {/* Avatar & User Info */}
          <div className="flex flex-wrap items-center gap-4">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
              <AvatarImage src={user?.profile?.profilePhoto} />
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-medium text-xl">{user?.fullName || "N/A"}</h1>
              <p>{user?.profile?.bio || "No bio available"}</p>
            </div>
            <Button onClick={() => setOpen(true)} className="ml-auto" variant="outline">
              <Pen />
            </Button>
          </div>
  
          {/* Contact Info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3">
              <Mail />
              <span>{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact />
              <span>{user?.phoneNumber || "N/A"}</span>
            </div>
          </div>
        </div>
  
        {/* Skills Section */}
        <div className="mt-6">
          <h1 className="font-semibold text-lg">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
  
        {/* Resume Section */}
        <div className="mt-6">
          <h1 className="text-md font-bold">Resume</h1>
          {isResume && user?.profile?.resume ? (
            <a
              target="_blank"
              href={user.profile.resume}
              className="text-blue-500 hover:underline cursor-pointer block mt-2"
            >
              {user?.profile?.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span>No resume available</span>
          )}
        </div>
      </div>
  
      {/* Applied Jobs Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl mt-6 p-4 sm:p-6">
        <h1 className="text-md font-bold my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
  
      {/* Update Profile Modal */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
  


};

export default Profile;


