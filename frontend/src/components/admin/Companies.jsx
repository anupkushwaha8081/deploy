import React from 'react'
import { Input } from '../ui/input'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import {CompaniesTable }from "./CompaniesTable"
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useState } from 'react'
import { useEffect } from 'react'
import { setSearchCompanyByText } from '../../../redux/companySlice'
import { useDispatch } from 'react-redux'

// export const Companies = () => {
//   useGetAllCompanies();//yha add hua
//   console.log("i worked for companies",useGetAllCompanies())
//         const navigate = useNavigate(); 
    
//   return (
//     <div className='max-w-[80%] mx-auto'>
//         <div className='flex items-center mx-auto justify-between '>
//             <Input className ="w-fit" placeholder="Filter by name">
//             </Input>
//             <Button onClick ={()=> navigate("/admin/companies/create")}>New Company</Button>
//         </div>
//         <CompaniesTable></CompaniesTable>
        
//     </div>
//   )
// }


// export const Companies = () => {
//   useGetAllCompanies(); // Fetch companies
//   const [input,setInput] = useState("")
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(()=>{
// dispatch(setSearchCompanyByText(input));
//   },[input])
//   return (
//     <div className="max-w-6xl mx-auto my-10">
//       <div className="flex items-center mx-auto justify-between">
//         <Input className="w-fit" placeholder="Filter by name" onChange={(e)=>setInput(e.target.value)}/>
//         <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
//       </div>
//       <CompaniesTable />
//     </div>
//   );
// };


export const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-6 md:px-12">
      <div className="flex  items-center justify-between gap-4">
        <Input
          className="w-full sm:w-auto"
          placeholder="Filter by name"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={() => navigate("/admin/companies/create")}>
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};


