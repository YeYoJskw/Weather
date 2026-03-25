import React from 'react';
import WeatherService from './API/WeatherService';
import { useEffect, useState } from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';

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
}

interface WeatherList {
  list: WeatherItem[];
  city: { id: number; name: string };
  cnt: number;
  cod: string;
}

const AirConditions = () => {
  const [weather, setWeather] = useState<WeatherList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dailyForecast, setDailyForecast] = useState<{
    [key: string]: WeatherItem[];
  }>({});

  async function fetchWeather() {
    try {
      setLoading(true);
      const response = await WeatherService.getWeather('New York');
      setWeather(response.data);
      console.log('Weather data:', response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (weather) {
      const grouped: { [key: string]: WeatherItem[] } = {};
      for (let i = 0; i < weather.list.length; i += 1) {
        const forecast = weather.list[i];
        const date = forecast.dt_txt.split(' ')[0];
        grouped[date] = grouped[date] || [];
        grouped[date].push(forecast);
      }
      console.log('Группировка:', grouped);
      setDailyForecast(grouped);
    }
  }, [weather]);

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather) {
    return <div>No weather data available</div>;
  }

  return (
    <div className="w-81 h-134.25 bg-[#DEAB4D] rounded-[35px] p-6">
      {/* <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {weekDays.map((day, idx) => (
            <CarouselItem key={idx} className="basis-1/5">
              <div className="text-center text-white">
                <p className="font-medium text-lg">{day.day}</p>
                <div className="text-4xl my-3">{day.icon}</div>
                <p className="text-2xl font-bold">{day.temp}</p>
                <p className="text-sm opacity-80 mt-1">{day.condition}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 text-white border-white/30 bg-white/20 hover:bg-white/40 hover:text-white" />
        <CarouselNext className="right-0 text-white border-white/30 bg-white/20 hover:bg-white/40 hover:text-white" />
      </Carousel> */}
      <div>Air Conditions</div>
      {/* <div className="flex flex-col gap-8.5 mt-6">
        <div className="flex  items-center gap-2">
          <img src="/public/assets/temperature.svg" alt="" />
          <div className="flex flex-col">
            <p>Real Feel</p>
            <p>{weather?.main.feels_like.toFixed(0)}°C</p>
          </div>
        </div>
        <div className="flex  items-center gap-2">
          <img src="/public/assets/wind.svg" alt="" />
          <div className="flex flex-col">
            <p>Wind</p>
            <p>{weather?.wind.speed} km/h</p>
          </div>
        </div>
        <div className="flex  items-center gap-2">
          <img src="/public/assets/water.svg" alt="" />
          <div className="flex flex-col">
            <p>Chance of rain</p>
            <p>{weather?.pop * 100}%</p>
          </div>
        </div>
        <div className="flex  items-center gap-2">
          <img src="/public/assets/sun.svg" alt="" />
          <div className="flex flex-col">
            <p>UV Index</p>
            <p>4</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AirConditions;
