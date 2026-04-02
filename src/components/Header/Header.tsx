import { useQuery } from '@tanstack/react-query';
import React from 'react';
import WeatherService from '../API/WeatherService';
import HeaderSkeleton from './HeaderSkeleton';
import Select from '../ui/Select';
import { useCityStore } from '@/store';
import { cities } from '@/constants/cities';

const Header = () => {
  const currentDate = new Date();
  const { city, setCity } = useCityStore();

  const {
    data: currentWeather,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['currentWeather', city],
    queryFn: () => WeatherService.getCurrentWeather(city),
  });

  console.log(currentWeather);

  if (isLoading) {
    return <HeaderSkeleton />;
  }

  if (error) {
    return <div>Error loading weather data</div>;
  }

  const onChangeCity = (city: string) => {
    setCity(city);
  };

  return (
    <div className="pt-6 flex justify-between items-center px-15 mb-6">
      <div className="info flex flex-col">
        <div className="flex items-center pb-9 gap-2">
          <img className="w-8" src="/assets/marker.svg" alt="point" />
          <Select options={cities} onChange={onChangeCity} value={city} />
          <img
            className="w-5.25 h-7.5 p-0 m-0"
            src="/public/assets/Frame.svg"
            alt=""
          />
        </div>
        <h2 className="text-5xl pb-26">
          {currentWeather?.weather[0].description}
        </h2>
        <h1 className="text-[64px] p-0 m-0 leading-none">
          {currentWeather?.main.temp.toFixed(0)}°C
        </h1>
        <p className="text-lg m-0 p-0">
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
      <img src="/public/assets/cloud.svg" alt="" />
    </div>
  );
};

export default Header;
