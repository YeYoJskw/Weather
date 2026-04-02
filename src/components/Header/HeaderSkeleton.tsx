import React from 'react';

const HeaderSkeleton = () => {
  return (
    <div className="pt-7 flex justify-between items-center px-15 mb-6 animate-pulse">
      <div className="info flex flex-col">
        <div className="flex items-center pb-13.5 gap-2">
          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
          <div className="h-7 bg-white/30 rounded w-24"></div>
          <div className="w-5.25 h-7.5 bg-white/30 rounded"></div>
        </div>

        <div className="h-9 bg-white/30 rounded w-44 mb-25"></div>

        <div className="h-16 bg-white/30 rounded w-32 mb-2"></div>

        <div className="h-6 bg-white/30 rounded w-48"></div>
      </div>

      <div className="w-64 h-64 bg-white/30 rounded-3xl"></div>
    </div>
  );
};

export default HeaderSkeleton;
