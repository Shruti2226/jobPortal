import React, { useState } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import Navbar from '../sharableComponents/Navbar';

const CreateCompanies = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="create-bg ">
      <Navbar />
      <h1 className="text-center text-4xl font-bold text-gray-600">
        Register Company
      </h1>
      <div className="max-w-4xl mx-auto p-4 card-bg3 my-10">
        <div className="my-10">
          <h1 className="font-bold text-gray-500 text-2xl">Company Name</h1>
          <p className="text-gray-500 pt-1">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>

        <Label className="text-md font-bold text-gray-500">
          Enter Your Company Name
        </Label>
        <Input
          type="text"
          className="my-2 bg-blue-50"
          placeholder="Google, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            className="bg-gray-400"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button className="bg-gray-600" onClick={registerNewCompany}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanies;
