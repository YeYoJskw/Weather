import React from 'react';
import WeatherService from '../API/WeatherService';
import WeatherIcon from '../WeatherIcon';
import { useQuery } from '@tanstack/react-query';
import AirConditionsSkeleton from './AirConditionsSkeleton';
import { useGroupedForecast } from '@/hooks/useGroupedForecast';

import 'react-loading-skeleton/dist/skeleton.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCityStore } from '@/store';

interface WeatherItem {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  wind: { speed: number; deg: number; gust: number };
  pop: number;
  dt_txt: string;
  weather: { description: string; icon: string }[];
}

interface WeatherList {
  list: WeatherItem[];
  city: { id: number; name: string };
  cnt: number;
  cod: string;
}

const AirConditions = () => {
  const city = useCityStore((state) => state.city);

  const {
    data: weather,
    isLoading,
    error,
  } = useQuery<WeatherList>({
    queryKey: ['weather', city],
    queryFn: () => WeatherService.getWeather(city),
  });

  const groupedForecast = useGroupedForecast(weather);

  const currentForecast = weather?.list?.[0];

  if (error) {
    return <div>Error loading weather data</div>;
  }

  if (isLoading) {
    return <AirConditionsSkeleton />;
  }

  return (
    <div className="w-81 h-134.25 bg-[#DEAB4D] rounded-[35px] p-6">
      <div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full carousel-mask"
        >
          <CarouselContent>
            {Object.values(groupedForecast).map((day, idx) => (
              <CarouselItem key={idx} className="basis-1/5">
                <div className="text-center text-white">
                  <WeatherIcon icon={day.weather[0].icon} />
                  {new Date(day.dt_txt).toLocaleDateString('en-US', {
                    weekday: 'short',
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 z-30 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 z-30 -translate-y-1/2" />
        </Carousel>
      </div>
      <div className="pt-16">
        <div className="font-bold">Air Conditions</div>
        <div className="flex flex-col gap-8.5 mt-6">
          <div className="flex  items-center gap-2">
            <img src="/public/assets/temperature.svg" alt="" />
            <div className="flex flex-col">
              <p>Real Feel</p>
              <p>{currentForecast?.main.feels_like.toFixed(1)}°C</p>
            </div>
          </div>
          <div className="flex  items-center gap-2">
            <img src="/public/assets/wind.svg" alt="" />
            <div className="flex flex-col">
              <p>Wind</p>
              <p>{currentForecast?.wind.speed.toFixed(1)} km/h</p>
            </div>
          </div>
          <div className="flex  items-center gap-2">
            <img src="/public/assets/water.svg" alt="" />
            <div className="flex flex-col">
              <p>Chance of rain</p>
              <p className="text-white text-lg font-semibold">
                {currentForecast?.pop !== undefined
                  ? `${Math.round(currentForecast.pop * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
          <div className="flex  items-center gap-2">
            <img src="/public/assets/sun.svg" alt="" />
            <div className="flex flex-col">
              <p>UV Index</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirConditions;
