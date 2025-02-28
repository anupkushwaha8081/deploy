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


