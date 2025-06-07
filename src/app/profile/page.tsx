"use client";
import React from "react";
import Image from "next/image";
import { FiPhone, FiMessageSquare, FiMail, FiSend, FiArrowLeft } from "react-icons/fi";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row gap-8 p-8">
      {/* Left: Main Dashboard */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Back Icon at the top of main section */}
        <button onClick={() => window.history.back()} className="mb-4 self-start text-[#d0ed01] hover:text-white text-2xl flex items-center gap-2 focus:outline-none"><FiArrowLeft /><span className="sr-only">Back</span></button>
        {/* Top: Search and Actions */}
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Type here to search"
            className="flex-1 bg-[#232323] text-white px-6 py-3 rounded-xl outline-none border-none placeholder-gray-400"
          />
          <button className="bg-[#232323] p-3 rounded-xl text-white text-xl hover:bg-[#18181b] transition">
            <span role="img" aria-label="calendar">📅</span>
          </button>
          <button className="bg-[#232323] p-3 rounded-xl text-white text-xl hover:bg-[#18181b] transition">
            <span role="img" aria-label="settings">⚙️</span>
          </button>
        </div>
        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 flex flex-col items-start shadow-lg bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10">
            <div className="text-white text-lg font-semibold mb-2">Total Earning 30 Days</div>
            <div className="text-3xl font-bold text-white mb-2">2.56 BTC</div>
            <div className="text-[#d0ed01] font-bold">+70%</div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col items-start shadow-lg bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10">
            <div className="text-white text-lg font-semibold mb-2">Total Expenses</div>
            <div className="text-3xl font-bold text-white mb-2">8,240K</div>
            <div className="text-[#d0ed01] font-bold">+80%</div>
          </div>
        </div>
        {/* Graphs Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 shadow-lg flex flex-col bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10">
            <div className="text-white font-semibold mb-2">Monday, December 2021</div>
            {/* Placeholder for chart */}
            <div className="flex-1 flex items-center justify-center">
              <svg width="220" height="100">
                <path d="M20,80 Q60,20 120,60 T220,40" stroke="#d0ed01" strokeWidth="4" fill="none" />
                <circle cx="120" cy="60" r="8" fill="#d0ed01" />
                <text x="130" y="55" fill="#d0ed01" fontSize="16">324$</text>
              </svg>
            </div>
          </div>
          <div className="rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10">
            <div className="text-white font-semibold mb-2">Your Finance Target</div>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="40" stroke="#18181b" strokeWidth="12" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="#d0ed01" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset="55" />
              <text x="50" y="58" textAnchor="middle" fill="#d0ed01" fontSize="24" fontWeight="bold">78%</text>
            </svg>
            <div className="flex justify-between w-full mt-4 text-xs text-gray-400">
              <div>
                <span className="text-[#d0ed01]">●</span> Result Achieved<br />Achieved well and smoothly
              </div>
              <div>
                <span className="text-white">●</span> Result Achieved<br />Waging in target Process
              </div>
            </div>
          </div>
        </div>
        {/* Ongoing Projects */}
        <div className="bg-[#18181b] rounded-2xl p-6 shadow-lg mt-4">
          <div className="text-white font-semibold mb-4">On Going Projects</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">JC</div>
                <div>
                  <div className="text-white font-semibold">Jane Cooper</div>
                  <div className="text-xs text-gray-400">Meet the target</div>
                </div>
              </div>
              <div className="text-white font-semibold">$145,000</div>
              <div className="text-[#d0ed01] font-semibold">Financial Officer</div>
              <button className="text-white text-2xl">...</button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">RR</div>
                <div>
                  <div className="text-white font-semibold">Ronald Richards</div>
                  <div className="text-xs text-gray-400">Meet the target</div>
                </div>
              </div>
              <div className="text-white font-semibold">$406.27</div>
              <div className="text-[#d0ed01] font-semibold">Project Manager</div>
              <button className="text-white text-2xl">...</button>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Profile Card */}
      <div className="w-full md:w-96 flex flex-col gap-6">
        <div className="bg-[#18181b] rounded-2xl p-6 shadow-lg flex flex-col items-center relative">
          <div className="relative mb-2 mt-2">
            <Image src="/images/profile.jpg" alt="Profile" width={90} height={90} className="rounded-full object-cover border-4 border-[#18181b]" />
            <span className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#d0ed01] border-2 border-black flex items-center justify-center">
              <svg width="16" height="16"><circle cx="8" cy="8" r="8" fill="#d0ed01" /></svg>
            </span>
          </div>
          <div className="text-white font-bold text-lg">Sara Ali</div>
          <div className="text-gray-400 text-sm mb-4">CEO</div>
          <div className="flex gap-4 mb-4">
            <button className="bg-[#d0ed01] p-3 rounded-full text-black text-xl"><FiPhone /></button>
            <button className="bg-[#d0ed01] p-3 rounded-full text-black text-xl"><FiMessageSquare /></button>
            <button className="bg-[#d0ed01] p-3 rounded-full text-black text-xl"><FiMail /></button>
            <button className="bg-[#d0ed01] p-3 rounded-full text-black text-xl"><FiSend /></button>
          </div>
          <div className="text-gray-400 text-center mb-4">Organized activities to make money and sell goods and services for a profit.</div>
          <div className="w-full">
            <div className="text-white font-semibold mb-2">About</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">RF</span>
                <div>
                  <div className="text-white font-semibold">Robert Fox</div>
                  <div className="text-xs text-gray-400">Graphic Designer</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">GH</span>
                <div>
                  <div className="text-white font-semibold">Guy Hawkins</div>
                  <div className="text-xs text-gray-400">Marketing Coordinator</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">LA</span>
                <div>
                  <div className="text-white font-semibold">Leslie Alexander</div>
                  <div className="text-xs text-gray-400">Web Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Send Money Card */}
        <div className="bg-[#18181b] rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <div className="text-white font-semibold mb-2">Send Money</div>
          <div className="text-[#d0ed01] text-2xl font-bold mb-2">$145,000</div>
          <div className="text-gray-400 text-sm">Your Card</div>
        </div>
      </div>
    </div>
  );
}
