import React, { useEffect, useState } from 'react';
import Navbar from '../sharableComponents/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="companies-bg">
      <Navbar />
      <h1 className="text-center text-3xl my-10 font-bold text-gray-500">
        Post Your Jobs Here
      </h1>
      <div className="max-w-6xl mx-auto my-12 card-bg3 p-3">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit bg-blue-50"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-gray-500"
            onClick={() => navigate('/admin/jobs/create')}
          >
            Post New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
