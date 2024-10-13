import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Web Developer',
  'FullStack Developer',
  'Graphic Designer',
  'Data Science',
  'AI Engineer ',
  'UI/UX',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };
  return (
    <div className="catStyle">
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3 mx-5 ">
              <Button
                onClick={() => searchHandler(cat)}
                className="button-63 content1"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="previous" />
        <CarouselNext className="next" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
