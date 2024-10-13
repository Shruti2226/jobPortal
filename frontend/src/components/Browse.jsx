import React, { useEffect } from 'react';
import Navbar from './sharableComponents/Navbar';
import Job from './Job.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, []);

  return (
    <div className=" browse-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-7">
        <h1 className="text-blue-900 text-4xl font-bold mx-3 ">
          Search Results ({allJobs.length})
        </h1>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 gap-4 mt-5"
        >
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
