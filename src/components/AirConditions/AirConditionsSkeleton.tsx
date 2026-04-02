import React from 'react';

const AirConditionsSkeleton = () => {
  return (
    <div className="w-81 h-134.25 bg-[#DEAB4D] rounded-[35px] p-6 animate-pulse">
      <div className="flex gap-3 mb-18">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 text-center">
            <div className="w-10 h-10 bg-white/30 rounded-full mx-auto mb-1"></div>
            <div className="h-3.5 bg-white/30 rounded w-8 mx-auto"></div>
          </div>
        ))}
      </div>

      <div className="h-5 bg-white/30 rounded w-32 mb-6"></div>

      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-white/30 rounded w-16"></div>
            <div className="h-5 bg-white/30 rounded w-12"></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-white/30 rounded w-12"></div>
            <div className="h-5 bg-white/30 rounded w-14"></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-white/30 rounded w-20"></div>
            <div className="h-5 bg-white/30 rounded w-10"></div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-white/30 rounded w-14"></div>
            <div className="h-5 bg-white/30 rounded w-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirConditionsSkeleton;
