

import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../../utills/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector(store => store.company);

  // Handle text input change
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle company selection and store companyId
  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.companyName === value);
    if (selectedCompany) {
      console.log("Selected Company ID:", selectedCompany._id);
      setInput({ ...input, companyId: selectedCompany._id });
    }
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
   
    if (!input.companyId) {
      toast.error("Please select a company.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/postJobs`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <div>
  //     <div className='max-w-xl mx-auto my-10 px-10 md:px-12'>
  //       <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
  //         <div className='grid grid-cols-2 gap-2'>

  //           <div>
  //             <Label>Title</Label>
  //             <Input
  //               type="text"
  //               name="title"
  //               value={input.title}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           <div>
  //             <Label>Description</Label>
  //             <Input
  //               type="text"
  //               name="description"
  //               value={input.description}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           <div>
  //             <Label>Requirements</Label>
  //             <Input
  //               type="text"
  //               name="requirements"
  //               value={input.requirements}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           <div>
  //             <Label>Salary</Label>
  //             <Input
  //               type="text"
  //               name="salary"
  //               value={input.salary}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           <div>
  //             <Label>Location</Label>
  //             <Input
  //               type="text"
  //               name="location"
  //               value={input.location}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           <div>
  //             <Label>Job Type</Label>
  //             <Input
  //               type="text"
  //               name="jobType"
  //               value={input.jobType}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           <div>
  //             <Label>Experience Level</Label>
  //             <Input
  //               type="text"
  //               name="experience"
  //               value={input.experience}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           <div>
  //             <Label>No of Positions</Label>
  //             <Input
  //               type="number"
  //               name="position"
  //               value={input.position}
  //               onChange={changeEventHandler}
  //               className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
  //             />
  //           </div>

  //           {companies.length > 0 && (
  //             <div>
  //               <Label>Select Company</Label>
  //               <Select onValueChange={selectChangeHandler}>
  //                 <SelectTrigger className="w-[180px]">
  //                   <SelectValue placeholder="Select a Company" />
  //                 </SelectTrigger>
  //                 <SelectContent>
  //                   <SelectGroup>
  //                     {companies.map((company) => (
  //                       <SelectItem key={company._id} value={company.companyName}>
  //                         {company.companyName}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectGroup>
  //                 </SelectContent>
  //               </Select>
  //             </div>
  //           )}

  //           {/* Display Selected Company ID */}
  //           {/* {input.companyId && (
  //             <div className="col-span-2 text-sm text-blue-600 font-semibold">
  //               Selected Company ID: {input.companyId}
  //             </div>
  //           )} */}

  //         </div>

  //         {loading ? (
  //           <Button className="w-full my-4">
  //             <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
  //           </Button>
  //         ) : (
  //           <Button type="submit" className="w-full mt-4">
  //             Post New Job
  //           </Button>
  //         )}

  //         {companies.length === 0 && (
  //           <p className='text-xs text-red-600 font-bold text-center my-3'>
  //             Please register a company before posting a job.
  //           </p>
  //         )}
  //       </form>
  //     </div>
  //   </div>
  // );


  return (
    <div className="px-6 md:px-12">
      <div className="max-w-xl mx-auto my-10">
        <form
          onSubmit={submitHandler}
          className="p-6 sm:p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
  
            {companies.length > 0 && (
              <div>
                <Label>Select Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company.companyName}>
                          {company.companyName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
  
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-4">
              Post New Job
            </Button>
          )}
  
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              Please register a company before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
  

};


export default PostJob;

