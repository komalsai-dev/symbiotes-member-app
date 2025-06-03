"use client";
import React, { useState } from "react";
import { FiChevronDown, FiCreditCard, FiBarChart2, FiPlus, FiDownload } from "react-icons/fi";

const pricingTiers = [
  { label: "Stellar", price: "$14,000", popular: true, btn: "Start a 7-day free Trial" },
  { label: "Evaluation", price: "$50,000", btn: "Book a demo" },
  { label: "Express", price: "$100,000", btn: "Book a demo" },
];

const sliderMarks = [6000, 15000, 25000, 50000, 100000, 200000];

export default function BillingPage() {
  const [sliderValue, setSliderValue] = useState(15000);
  const [selectedTab, setSelectedTab] = useState("All payments");

  return (
    <div className="w-full max-w-[1800px] mx-auto px-0">
      <h1 className="text-4xl font-bold text-white mb-2 mt-6">Billing</h1>
      <div className="text-gray-300 mb-8 text-lg">Our pricing is flexible and is based on the type of you are</div>
      {/* Pricing Slider */}
      <div className="flex flex-col items-center mb-10">
        <div className="w-full flex justify-center mb-2">
          <input
            type="range"
            min={sliderMarks[0]}
            max={sliderMarks[sliderMarks.length - 1]}
            step={1000}
            value={sliderValue}
            onChange={e => setSliderValue(Number(e.target.value))}
            className="w-2/3 accent-[#d0ed01] h-2 rounded-lg appearance-none bg-[#232323]"
            style={{ accentColor: '#d0ed01' }}
          />
        </div>
        <div className="flex justify-between w-2/3 text-[#d0ed01] font-semibold text-sm">
          {sliderMarks.map((mark, i) => (
            <span key={mark} className="text-center w-20">$ {mark.toLocaleString()}</span>
          ))}
        </div>
      </div>
      {/* Pricing Cards */}
      <div className="flex gap-8 justify-center mb-12">
        {pricingTiers.map((tier, idx) => (
          <div
            key={tier.label}
            className={`flex flex-col gap-4 bg-[#18181b] border border-[#d0ed01] rounded-2xl p-8 min-w-[300px] max-w-[340px] relative ${tier.popular ? 'shadow-[0_0_0_3px_#d0ed01]' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-white">{tier.label}</span>
              {tier.popular && <span className="bg-[#d0ed01] text-black text-xs font-bold px-3 py-1 rounded-full">Popular</span>}
            </div>
            <div className="text-lg text-[#d0ed01] font-bold mb-4">{tier.price}</div>
            <select className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none w-full mb-2">
              <option>Swap Account</option>
            </select>
            {tier.label !== "Evaluation" && (
              <select className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none w-full mb-4">
                <option>1 - Step</option>
              </select>
            )}
            <button className="w-full py-3 rounded-lg bg-[#d0ed01] text-black font-bold text-lg hover:bg-[#c0de01] transition">
              {tier.btn}
            </button>
          </div>
        ))}
      </div>
      {/* Payments Overview */}
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Payments overview</h2>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-[#232323] text-white border border-white/10 hover:bg-[#232323]/80 transition">
          <FiDownload /> Export
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-bold hover:bg-[#c0de01] transition">
          <FiPlus /> Payment link
        </button>
      </div>
      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        {["All payments", "Succeeded", "Refunded"].map(tab => (
          <button
            key={tab}
            className={`text-lg font-semibold pb-2 border-b-2 transition ${selectedTab === tab ? 'text-[#d0ed01] border-[#d0ed01]' : 'text-gray-400 border-transparent'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Filters and Search */}
      <div className="flex gap-4 mb-4 items-center">
        <select className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none">
          <option>Date range</option>
        </select>
        <select className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none">
          <option>Status</option>
        </select>
        <select className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none">
          <option>P. Method</option>
        </select>
        <input
          type="text"
          placeholder="Search by amount, payment method..."
          className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none flex-1 placeholder-gray-400"
        />
      </div>
      {/* Payments Table Placeholder */}
      <div className="bg-[#18181b] rounded-2xl p-10 flex flex-col items-center justify-center min-h-[180px] border border-white/10">
        <span className="text-gray-400 text-lg">No payments yet</span>
      </div>
    </div>
  );
}
