import React from 'react';

const ForecastSkeleton = () => {
  return (
    <div className="w-221 h-65.5 bg-[#DEAB4D] rounded-[35px] px-8 pt-3">
      <div className="flex items-center gap-2 mb-2">
        <img src="/assets/Group.svg" alt="Forecast" />
        <p className="text-white text-sm">24-hour forecast</p>
      </div>
      <div className="h-35 bg-white/30 rounded"></div>
      <div className="h-4 bg-white/30 rounded mt-1"></div>
    </div>
  );
};

export default ForecastSkeleton;
