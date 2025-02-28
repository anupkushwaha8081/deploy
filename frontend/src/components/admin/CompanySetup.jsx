// 


import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { Company_API_END_POINT } from "../../../utills/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

export const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (singleCompany) {
      setInput((prev) => ({
        ...prev,
        companyName: singleCompany.companyName || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: prev.file, // Preserve file selection
      }));
    }
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, file }));
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("companyName", input.companyName);
  //   formData.append("description", input.description);
  //   formData.append("website", input.website);
  //   formData.append("location", input.location);
  //   if (input.file) {
  //     formData.append("file", input.file);
  //   }

  //   // Debugging: Print form data values
  //   console.log("FormData Entries:");
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}:`, value);
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await axios.put(
  //       `${Company_API_END_POINT}/updateCompany/${params.id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //       navigate("/admin/companies");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error(error?.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    
    if (input.file) {
      formData.append("file", input.file);
    }
  
    // ✅ Debug: Log the form data before sending
    console.log("🚀 Form Data (Before Sending):");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      setLoading(true);
      const res = await axios.put(
        `${Company_API_END_POINT}/updateCompany/${params.id}`,
        {
          companyName: input.companyName,
          description: input.description,
          website: input.website,
          location: input.location,
          logo: input.file|| "",
        },
        {
          // headers: {
          //   "Content-Type": "application/json", // ✅ Ensure correct content type
          // },
          headers: {
            "Content-Type": "multipart/form-data", // Do NOT use application/json
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
              toast.success(res.data.message);
              navigate("/admin/companies");
            }
      
    } 
    
    catch (error) {
      console.error("❌ Error Response:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  // return (
  //   <div className="max-w-xl mx-auto my-10">
  //     <form onSubmit={submitHandler}>
  //       <div className="flex items-center gap-5 p-8">
  //         <Button
  //           onClick={() => navigate("/admin/companies")}
  //           variant="outline"
  //           className="flex items-center gap-2 text-gray-500 font-semibold"
  //         >
  //           <ArrowLeft />
  //           <span>Back</span>
  //         </Button>
  //         <h1 className="font-bold text-xl">Company Setup</h1>
  //       </div>
  //       <div className="grid grid-cols-2 gap-4">
  //         <div>
  //           <Label>Company Name</Label>
  //           <Input
  //             type="text"
  //             name="companyName"
  //             value={input.companyName}
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div>
  //           <Label>Description</Label>
  //           <Input
  //             type="text"
  //             name="description"
  //             value={input.description}
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div>
  //           <Label>Website</Label>
  //           <Input
  //             type="text"
  //             name="website"
  //             value={input.website}
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div>
  //           <Label>Location</Label>
  //           <Input
  //             type="text"
  //             name="location"
  //             value={input.location}
  //             onChange={changeEventHandler}
  //           />
  //         </div>
  //         <div>
  //           <Label>Logo</Label>
  //           <Input type="file" accept="image/*" onChange={changeFileHandler} />
  //         </div>
  //       </div>

  //       {loading ? (
  //         <Button className="w-full my-4">
  //           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  //           Please wait
  //         </Button>
  //       ) : (
  //         <Button type="submit" className="w-full mt-8">
  //           Update
  //         </Button>
  //       )}
  //     </form>
  //   </div>
  // );


  return (
    <div className="max-w-xl mx-auto my-10 px-10 md:px-12">
      <form onSubmit={submitHandler} className="flex flex-col gap-6">
        <div className="flex   items-center gap-5 p-6 ">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl">Company Setup</h1>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <Label>Company Name</Label>
            <Input
              type="text"
              name="companyName"
              value={input.companyName}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Website</Label>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Logo</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler} />
          </div>
        </div>
  
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full mt-8">
            Update
          </Button>
        )}
      </form>
    </div>
  );
  
};





// {
//   "companyName":"saurabh bhai",
//   "description":"saurabh",
//   "website":"saurabh",
//   "location":"saurabh"


// }
