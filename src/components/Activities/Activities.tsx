import React from 'react';

const Activities = () => {
  return (
    <div className="w-221 h-61 bg-[#DEAB4D] rounded-[35px] px-8.5 pt-1">
      <div className="flex items-center gap-2.5 py-4 pb-9">
        <img src="/public/assets/Heart.svg" alt="" />
        <p className="text-2xl">Activities in your area</p>
      </div>
      <div className="flex justify-between px-3.5">
        <div>
          <img src="/public/assets/Rectangle 15.svg" alt="" />
          <p className="text-black text-xs">2km away</p>
        </div>
        <div>
          <img src="/public/assets/Rectangle 16.svg" alt="" />
          <p className="text-black text-xs">2km away</p>
        </div>
        <div>
          <img src="/public/assets/Rectangle 17.svg" alt="" />
          <p className="text-black text-xs">2km away</p>
        </div>
        <div>
          <img src="/public/assets/Rectangle 18.svg" alt="" />
          <p className="text-black text-xs">2km away</p>
        </div>
      </div>
    </div>
  );
};

export default Activities;
