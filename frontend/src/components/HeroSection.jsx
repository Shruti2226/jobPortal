import { Search } from 'lucide-react';
import '../components/component css/Component.css';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="hero-section">
      <div className="text-center pt-20">
        <div className="flex flex-col gap-6 my-20">
          <span className="mx-auto hero-span">Welcome To FirstStep</span>

          <h1 className="text-5xl font-bold hero-text1">
            Browse Jobs, Apply, <br />
            and <span className="hero-text2">Get Hired</span>
          </h1>

          <p className="hero-para">
            Find the perfect match for your skills and goals - All in one place.
          </p>

          <div className="flex w-[40%] shadow-lg shadow-blue-200 pl-3 rounded-full items-center gap-4 mx-auto bg-blue-100">
            <input
              type="text"
              placeholder="Find Your Dream Jobs"
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none border-none w-full bg-blue-100"
            />

            <Button
              onClick={searchHandler}
              className="rounded-r-full bg-blue-300"
            >
              <Search className="searchbox" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
