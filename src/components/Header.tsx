import React from 'react';

const Header = () => {
  return (
    <div className="pt-6 flex justify-between items-center px-15 mb-6">
      <div className="info flex flex-col">
        <div className="flex items-center pb-9">
          <img className="w-8" src="/assets/Frame 3.svg" alt="point" />
          <p className="text-2xl">New York</p>
          <img className="w-5.25 h-7.5" src="/public/assets/Frame.svg" alt="" />
        </div>
        <h2 className="text-5xl pb-26">Cloudy</h2>
        <h1 className="text-[64px] p-0 m-0 leading-none">26°C</h1>
        <p className="text-lg m-0 p-0">Sunday | 19 Mar 2026</p>
      </div>
      <img src="/public/assets/cloud.svg" alt="" />
    </div>
  );
};

export default Header;
