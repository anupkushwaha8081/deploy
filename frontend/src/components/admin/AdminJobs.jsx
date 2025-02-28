import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {CompaniesTable} from './CompaniesTable';
import { setSearchCompanyByText } from '../../../redux/companySlice';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../../redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  // console.log("job",useGetAllAdminJobs())
  const [input,setInput] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
dispatch(setSearchJobByText(input));
    },[input])
  return (
    
      <div className='max-w-6xl mx-auto my-10 px-6 md:px-12'>
        <div className='flex items-center justify-between'>
            <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e)=>setInput(e.target.value)}
            />
            <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
        </div>
       <AdminJobsTable/>
      </div>
    
  )
  
}

export default AdminJobs
