import React, { useMemo } from 'react';
import WeatherService from './API/WeatherService';
import WeatherIcon from './WeatherIcon';
import { useEffect, useState } from 'react';
import { useFetching } from '@/hooks/useFetching';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
  const [weather, setWeather] = useState<WeatherList | null>(null);
  const [groupedForecast, setGroupedForecast] = useState<
    Record<string, WeatherItem>
  >({});
  const todayDate = new Date().toLocaleDateString('en-CA');
  const todayForecast = groupedForecast[todayDate];

  const [fetchWeather, isLoading, error] = useFetching(async () => {
    const response = await WeatherService.getWeather('Bishkek');
    setWeather(response.data);
  });

  useMemo(() => {
    if (!weather) return;

    const grouped: Record<string, WeatherItem[]> = {};
    const dailySummary: Record<string, WeatherItem> = {};

    for (const forecast of weather.list) {
      const date = forecast.dt_txt.split(' ')[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(forecast);
    }

    for (const [date, forecasts] of Object.entries(grouped)) {
      const middayIndex = Math.floor(forecasts.length / 2);
      const avgTemp =
        forecasts.reduce((sum, f) => sum + f.main.temp, 0) / forecasts.length;
      const avgWindSpeed =
        forecasts.reduce((sum, f) => sum + f.wind.speed, 0) / forecasts.length;

      dailySummary[date] = {
        ...forecasts[middayIndex],
        main: { ...forecasts[middayIndex].main, temp: avgTemp },
        wind: { ...forecasts[middayIndex].wind, speed: avgWindSpeed },
      };
    }
    console.log('Daily Summary:', dailySummary);
    setGroupedForecast(dailySummary);
  }, [weather]);

  useEffect(() => {
    fetchWeather();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-81 h-134.25 bg-[#DEAB4D] rounded-[35px] p-6">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
      )}
      <div className="pt-16">
        <div className="font-bold">Air Conditions</div>
        <div className="flex flex-col gap-8.5 mt-6">
          <div className="flex  items-center gap-2">
            <img src="/public/assets/temperature.svg" alt="" />
            <div className="flex flex-col">
              <p>Real Feel</p>
              <p>{todayForecast?.main.temp.toFixed(0)}°C</p>
            </div>
          </div>
          <div className="flex  items-center gap-2">
            <img src="/public/assets/wind.svg" alt="" />
            <div className="flex flex-col">
              <p>Wind</p>
              <p>{todayForecast?.wind.speed.toFixed(1)} km/h</p>
            </div>
          </div>
          <div className="flex  items-center gap-2">
            <img src="/public/assets/water.svg" alt="" />
            <div className="flex flex-col">
              <p>Chance of rain</p>
              <p>{todayForecast?.pop * 100}%</p>
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
