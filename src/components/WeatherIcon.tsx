import React from 'react';

interface WeatherIconProps {
  icon: string;
}

const WeatherIcon = ({ icon }: WeatherIconProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      <img src={iconUrl} alt="Weather Icon" width="50" height="50" />
    </div>
  );
};

export default WeatherIcon;
