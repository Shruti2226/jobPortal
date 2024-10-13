import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi', 'Gurugram', 'Noida', 'Bangluru', 'Mumbai', 'Pune'],
  },
  {
    filterType: 'Industry',
    array: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'AI/ML',
      'Python Developer',
      'Power BI',
      'C/C++ Developer',
    ],
  },
  {
    filterType: 'Salary',
    array: ['15-20k', '20-30k', '30-45k', '45-60k', '60-80k', '80k-1Lakhs'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-600">Filter Jobs</h1>
      <hr className="mt-3" />

      <RadioGroup
        value={selectedValue}
        onValueChange={changeHandler}
        className="text-gray-500"
      >
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-gray-600">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="text-gray-500"
                  />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
