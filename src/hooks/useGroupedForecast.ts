// hooks/useGroupedForecast.ts
import { useMemo } from 'react';

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

type GroupedForecast = Record<string, WeatherItem>;

export const useGroupedForecast = (
  weather: WeatherList | undefined
): GroupedForecast => {
  return useMemo(() => {
    if (!weather) return {};

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
      const avgFeelsLike =
        forecasts.reduce((sum, f) => sum + f.main.feels_like, 0) /
        forecasts.length;

      dailySummary[date] = {
        ...forecasts[middayIndex],
        main: {
          ...forecasts[middayIndex].main,
          temp: avgTemp,
          feels_like: avgFeelsLike,
        },
        wind: { ...forecasts[middayIndex].wind, speed: avgWindSpeed },
      };
    }
    return dailySummary;
  }, [weather]);
};
