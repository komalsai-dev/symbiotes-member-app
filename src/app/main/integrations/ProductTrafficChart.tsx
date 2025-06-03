"use client";

import React from 'react';

const ProductTrafficChart = () => {
  // Placeholder data
  const data = [12, 18, 10, 22, 16, 25, 20, 18, 24, 19, 23, 17, 21, 15, 22, 18, 20, 24, 19, 23, 17, 21, 15, 22, 18, 20, 24, 19, 23, 17];
  
  return (
    <div className="bg-[#232323] rounded-2xl p-8 mt-10 w-full">
      <div className="text-[#d6ff00] font-semibold text-sm mb-4">Product Traffic</div>
      <div className="flex items-end h-32 w-full gap-1">
        {data.map((value, idx) => (
          <div key={idx} className="flex flex-col items-center justify-end h-full">
            <div
              className="w-3 rounded-t bg-[#d6ff00]"
              style={{ height: `${value * 3}px` }}
            ></div>
            <div
              className="w-3 rounded-t bg-[#444444]"
              style={{ height: `${100 - value * 3}px` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 text-xs text-gray-400 gap-4">
        <span className="text-white">All</span>
        <span>• SnowUI</span>
        <span>• Dashboard</span>
        <span className="ml-2">...</span>
      </div>
    </div>
  );
};

export default ProductTrafficChart; 