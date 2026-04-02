import React from 'react';

interface WeatherIconProps {
  icon: string;
  width?: number;
  height?: number;
}

const WeatherIcon = ({ icon, width = 40, height = 40 }: WeatherIconProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return <img src={iconUrl} alt="Weather Icon" width={width} height={height} />;
};

export default WeatherIcon;
