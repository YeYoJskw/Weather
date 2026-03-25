import React from 'react';

const Forecast = () => {
  return (
    <div className="w-221 h-65.5 bg-[#DEAB4D] rounded-[35px] px-7.5 pt-2">
      <div className="flex items-center gap-2">
        <img src="/public/assets/Group.svg" alt="Forecast" />
        <p>24-hour forecast</p>
      </div>
    </div>
  );
};

export default Forecast;
