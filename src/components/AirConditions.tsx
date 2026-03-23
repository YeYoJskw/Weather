import React from 'react';

const AirConditions = () => {
  const weekDays = [
    { day: 'SUN', temp: '+22°', icon: '☀️', condition: 'Sunny' },
    { day: 'MON', temp: '+20°', icon: '⛅', condition: 'Cloudy' },
    { day: 'TUE', temp: '+18°', icon: '🌧️', condition: 'Rain' },
    { day: 'WED', temp: '+19°', icon: '⛅', condition: 'Cloudy' },
    { day: 'THU', temp: '+23°', icon: '☀️', condition: 'Sunny' },
    { day: 'FRI', temp: '+21°', icon: '☀️', condition: 'Sunny' },
    { day: 'SAT', temp: '+17°', icon: '🌧️', condition: 'Rain' },
  ];

  return (
    <div className="w-81 h-134.25 bg-[#DEAB4D] rounded-[35px] p-6">
      <h2 className="text-white text-xl font-semibold mb-4 text-center">
        Weekly Forecast
      </h2>
      {weekDays.map((day) => (
        <div className="text-center text-white">
          <p className="font-medium text-lg">{day.day}</p>
          <div className="text-4xl my-3">{day.icon}</div>
          <p className="text-2xl font-bold">{day.temp}</p>
          <p className="text-sm opacity-80 mt-1">{day.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default AirConditions;
