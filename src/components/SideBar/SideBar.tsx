import React from 'react';

const SideBar = () => {
  return (
    <div className="w-25 h-134.25 bg-[#DEAB4D] rounded-[35px] flex flex-col items-center justify-between py-5">
      <img src="/public/assets/Ellipse 33.svg" alt="" />
      <div className="flex flex-col items-center gap-4.75">
        <div className="flex flex-col items-center cursor-pointer">
          <img src="/public/assets/176 179 293 299 353.svg" alt="" />
          <p className="text-sm">weather</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <img src="/public/assets/Explore.svg" alt="" />
          <p className="text-sm">explore</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <img src="/public/assets/Location.svg" alt="" />
          <p className="text-sm">cities</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <img src="/public/assets/Settings-alt.svg" alt="" />
          <p className=" text-sm">settings</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
