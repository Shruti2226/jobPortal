import React, { useState } from 'react';
import Navbar from '../sharableComponents/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div className="companies-bg">
      <Navbar />
      <h1 className="text-center text-4xl font-bold text-gray-600">
        Registered Companies
      </h1>
      <div className=" max-w-6xl mx-auto my-10 p-1 card-bg2 ">
        <div className="flex items-center justify-between my-6 p-2">
          <Input
            className="w-fit bg-blue-50 px-3"
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-slate-400 text-md"
            onClick={() => navigate('/admin/companies/create')}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
