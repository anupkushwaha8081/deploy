import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../../redux/companySlice";
import { Company_API_END_POINT } from "../../../utills/constant";
// import { Content } from '@radix-ui/react-dialog'
// import { Type } from 'lucide-react'
import { toast } from "sonner";

export const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [companyName, setCompanyName] = useState("");
  const registeredNewCompany = async () => {
    try {
      const res = await axios.post(
        `${Company_API_END_POINT}/registerCompanny`,

        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log(res);
      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res?.data?.message);
        console.log( "company data here ",res?.data);
        const companyId = res?.data?.newCompany?._id;
        console.log("companyId",companyId);
        navigate(`/admin/companies/create/${companyId}`);
      }
    } catch (error) {

      console.log(" i am ",error);
    }
  };
  // return (
  //   <div className="max-w-5xl mx-auto">
  //     <div className="my-10">
  //       <h1 className="font-bold text-2xl"> Enter your Company</h1>
  //       <p className="text-gray-500">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
  //         ex?
  //       </p>
  //     </div>
  //     <Label> Company name</Label>
  //     <Input
  //       type="text"
  //       className="my-2"
  //       onChange={(e) => setCompanyName(e.target.value)}
  //       placeholder="Enter company name"
  //     ></Input>
  //     <div className="flex items-center gap-2 my-10">
  //       <Button variant="outline" onClick={() => navigate("/admin/companies")}>
  //         Cancel
  //       </Button>
  //       <Button onClick={registeredNewCompany}>Continue</Button>
  //     </div>
  //   </div>
  // );

 

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12"> {/* Increased padding */}
      <div className="my-10">
        <h1 className="font-bold text-2xl">Enter your Company</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, ex?
        </p>
      </div>
      <Label>Company name</Label>
      <Input
        type="text"
        className="my-2"
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter company name"
      />
      <div className="flex items-center gap-2 my-10">
        <Button variant="outline" onClick={() => navigate("/admin/companies")}>
          Cancel
        </Button>
        <Button onClick={registeredNewCompany}>Continue</Button>
      </div>
    </div>
  );
  
  

};
