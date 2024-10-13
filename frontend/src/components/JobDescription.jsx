import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './sharableComponents/Navbar';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?.id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true); //update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob, applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); //real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="  desc-bg">
      <Navbar />
      <h1 className="flex items-center justify-center text-3xl font-bold text-gray-700 py-6">
        Job Details
      </h1>
      <div className=" max-w-4xl mx-auto card-bg1 p-4 ">
        <div className="flex items-center justify-between">
          <div className="my-8 ">
            <h1 className="font-bold text-xl uppercase text-gray-700">
              {singleJob?.title}
            </h1>
            <div className="flex text-clip gap-2 mt-4">
              <Badge
                className="text-blue-900 font-bold badge-bg"
                variant="ghost"
              >
                {singleJob?.position} Positions
              </Badge>
              <Badge
                className="text-blue-700 font-bold badge-bg"
                variant="ghost"
              >
                {singleJob?.jobType}
              </Badge>
              <Badge
                className="text-blue-400 font-bold badge-bg"
                variant="ghost"
              >
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>

          <Button
            onClick={isApplied ? null : applyHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-slate-500'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        <h1
          className="border-b-2 
        text-gray-600 border-b-gray-300 text-2xl font-bold my-2"
        >
          Job Description
        </h1>

        <div className="text-md">
          <h1 className="font-bold my-1 text-gray-600">
            Role:{' '}
            <span className="pl-4 font-normal text-gray-500">
              {singleJob?.title}
            </span>{' '}
          </h1>

          <h1 className="font-bold my-1 text-gray-600">
            Location:{' '}
            <span className="pl-4 font-normal text-gray-500">
              {singleJob?.location}
            </span>{' '}
          </h1>

          <h1 className="font-bold my-1 text-gray-600">
            Description:{' '}
            <span className="pl-4 font-normal text-gray-500">
              {singleJob?.description}
            </span>{' '}
          </h1>

          <h1 className="font-bold my-1 text-gray-600">
            Experience:{' '}
            <span className="pl-4 font-normal text-gray-500">
              {singleJob?.experienceLevel}yrs
            </span>{' '}
          </h1>

          <h1 className="font-bold my-1 text-gray-600">
            Salary:{' '}
            <span className="pl-4 font-normal text-gray-500">
              {singleJob?.salary}
            </span>{' '}
          </h1>

          <h1 className="font-bold my-1 text-gray-600">
            Total Applicants:{' '}
            <span className="pl-4 font-normal text-gray-500">
              {singleJob?.applications?.length}
            </span>{' '}
          </h1>

          <h1 className="font-bold my-1 text-gray-600">
            Posted date:{' '}
            <span className="pl-4 font-normal text-gray-500">
              {singleJob?.createdAt.split('T')[0]}
            </span>{' '}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
