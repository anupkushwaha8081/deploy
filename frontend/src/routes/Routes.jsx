// src/routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Browse from '@/components/Browse';
import Jobs from '@/components/Jobs';
import Profile from '@/components/Profile';
import JobDescription from '@/components/JobDescription'
import {Companies} from '../components/admin/Companies';
import { CompanyCreate } from '@/components/admin/CompanyCreate';
import {CompanySetup} from '@/components/admin/CompanySetup'
import AdminJobs from '@/components/admin/AdminJobs';
import PostJob from '@/components/admin/PostJob';
import Applicants from '@/components/admin/Applicants';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
const AppRoutes = () => {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse/>} />
        <Route path="/profile" element={<Profile/>} />
        {/* <Route path="/update" element={<UpdateProfileDialog/>} /> */}
        <Route path="/admin/companies/" element={<ProtectedRoute><Companies/></ProtectedRoute>} />
        <Route path="/description/:id" element={<JobDescription/>} />
        <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>} />
        <Route path="/admin/companies/create/:id" element={<ProtectedRoute><CompanySetup/></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>} /> 
        <Route path="//admin/jobs/create" element={<ProtectedRoute> <PostJob /></ProtectedRoute>} />
        <Route path="/admin/jobs/:id/applicants" element={<ProtectedRoute><Applicants/></ProtectedRoute>} /> 





      </Routes>
    // </Router>
  );
};

export default AppRoutes;
