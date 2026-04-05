import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import WeatherService from '../API/WeatherService';
import { useQuery } from '@tanstack/react-query';
import { useCityStore } from '@/store';
import ForecastSkeleton from './ForecastSkeleton';

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

const Forecast = () => {
  const city = useCityStore((state) => state.city);

  const {
    data: weather,
    isLoading,
    error,
  } = useQuery<WeatherList>({
    queryKey: ['weather', city],
    queryFn: () => WeatherService.getWeather(city),
  });

  const hourlyData = useMemo(() => {
    if (!weather?.list) return [];

    return weather.list.slice(0, 7).map((item) => ({
      time: new Date(item.dt_txt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      temp: Math.round(item.main.temp),
      wind: item.wind.speed,
    }));
  }, [weather]);

  if (isLoading) {
    return <ForecastSkeleton />;
  }

  if (error) {
    return (
      <div className="w-221 h-65.5 bg-[#DEAB4D] rounded-[35px] px-7.5 pt-2 text-white/70">
        Failed to load forecast
      </div>
    );
  }

  if (hourlyData.length === 0) {
    return (
      <div className="w-221 h-65.5 bg-[#DEAB4D] rounded-[35px] px-7.5 pt-2 text-white/70">
        No forecast data
      </div>
    );
  }

  console.log(hourlyData);

  return (
    <div className="w-221 h-65.5 bg-[#DEAB4D] rounded-[35px] pt-3">
      <div className="flex items-center gap-2 mb-2 px-8">
        <img src="/assets/Group.svg" alt="Forecast" />
        <p className="text-white text-sm">24-hour forecast</p>
      </div>
      <div style={{ pointerEvents: 'none' }} className="no-focus pt-10 ">
        <ResponsiveContainer width="100%" height={140}>
          <LineChart
            data={hourlyData}
            margin={{ top: 20, right: 25, left: 25, bottom: 5 }}
          >
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white', fontSize: 12, opacity: 0.6 }}
              dy={5}
              interval={0}
              height={60}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#FFC355"
              strokeWidth={2}
              dot={{ fill: 'white', r: 3, strokeWidth: 0 }}
              activeDot={false}
              isAnimationActive={false}
              className="line-chart"
              label={{
                position: 'top',
                fill: 'white',
                fontSize: 14,
                fontWeight: 400,
                formatter: (value) => {
                  if (typeof value === 'number') {
                    return `${Math.round(value)}°`;
                  }
                  return '—°';
                },
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Forecast;
