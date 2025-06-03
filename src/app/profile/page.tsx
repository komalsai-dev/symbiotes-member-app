"use client";
import React, { useState } from "react";
import { FiBookOpen, FiArrowUpRight, FiCheckCircle, FiCalendar, FiClock, FiShare2, FiVideo, FiUser } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import MainLayout from '../main/layout';

const courseCards = [
  {
    title: "AI Starter Session 1",
    stats: { books: 12, lessons: 10, users: 99 },
    progress: 70,
  },
  {
    title: "Mini AI Agent Session 2",
    stats: { books: 12, lessons: 15, users: 85 },
    progress: 40,
  },
];

const barData = [40, 60, 80, 50, 20];
const barLabels = ["Jan", "Feb", "Mar", "Apr", "May"];

const todoList = [
  { label: "Mini MBA Session 2", time: "08:00 AM", checked: false, sub: ["Integrate API", "Slicing Home Screen"] },
  { label: "AI Starter Session 2", time: "08:00 AM", checked: false },
  { label: "AI Starter Session 1", time: "08:00 AM", checked: true },
];

export default function ProfilePage() {
  const [selectedDate, setSelectedDate] = useState(25);
  return (
    <MainLayout>
      <div className="w-full max-w-[1600px] mx-auto px-0 grid grid-cols-1 xl:grid-cols-3 gap-8 py-8">
        {/* Left: Course Status and Progress */}
        <div className="col-span-2 flex flex-col gap-8">
          {/* Course Status */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-[#232323] rounded-2xl p-6 flex flex-col gap-4 shadow-lg min-w-[320px]">
              <div className="flex items-center justify-between mb-2">
                <button className="flex items-center gap-2 text-white font-semibold bg-[#232323] px-4 py-2 rounded-lg border border-white/10">
                  <FiBookOpen /> Your Course Status
                </button>
                <button className="flex items-center gap-2 text-white font-semibold bg-[#232323] px-4 py-2 rounded-lg border border-white/10">
                  All Courses <FiArrowUpRight />
                </button>
              </div>
              <div className="flex gap-4">
                {courseCards.map((card, idx) => (
                  <div key={card.title} className="flex-1 bg-[#18181b] rounded-xl p-4 flex flex-col gap-3 min-w-[220px]">
                    <div className="flex items-center gap-2 text-[#d0ed01] font-bold text-lg">
                      <FiBookOpen />
                      {card.title}
                    </div>
                    <div className="w-full h-2 bg-[#232323] rounded-full overflow-hidden">
                      <div className="h-2 bg-[#d0ed01] rounded-full" style={{ width: `${card.progress}%` }}></div>
                    </div>
                    <div className="flex gap-6 text-gray-300 text-sm mt-2">
                      <span className="flex items-center gap-1"><FiBookOpen /> {card.stats.books}</span>
                      <span className="flex items-center gap-1"><FiCalendar /> {card.stats.lessons}</span>
                      <span className="flex items-center gap-1"><FiUser /> {card.stats.users}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Study/Exams Bar Chart and Points Gauge */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Bar Chart */}
            <div className="flex-1 bg-[#232323] rounded-2xl p-6 shadow-lg min-w-[320px]">
              <div className="flex gap-4 mb-4">
                <span className="text-white font-semibold">Study</span>
                <span className="text-gray-400">Exams</span>
                <span className="ml-auto flex items-center gap-2 text-[#d0ed01] text-xs font-semibold"><span className="w-2 h-2 rounded-full bg-[#d0ed01] inline-block"></span> Point Progress</span>
                <select className="bg-[#18181b] text-white px-2 py-1 rounded-lg text-xs border border-white/10">
                  <option>Monthly</option>
                </select>
              </div>
              <div className="flex items-end gap-4 h-40 w-full">
                {barData.map((val, idx) => (
                  <div key={idx} className="flex flex-col items-center w-10">
                    <div className="w-8 rounded-t bg-gradient-to-t from-[#d0ed01] to-[#232323]" style={{ height: `${val * 1.5}px` }}></div>
                    <span className="text-xs text-gray-400 mt-2">{barLabels[idx]}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-400">0 Hr &nbsp;&nbsp; 20 Hr &nbsp;&nbsp; 40 Hr &nbsp;&nbsp; 60 Hr &nbsp;&nbsp; 80 Hr</div>
            </div>
            {/* Points Gauge */}
            <div className="flex flex-col items-center justify-center bg-[#232323] rounded-2xl p-6 shadow-lg min-w-[220px] max-w-[260px]">
              <svg width="120" height="60" viewBox="0 0 120 60">
                <path d="M10,55 A50,50 0 0,1 110,55" fill="none" stroke="#d0ed01" strokeWidth="8" />
                <path d="M10,55 A50,50 0 0,1 110,55" fill="none" stroke="#232323" strokeWidth="8" strokeDasharray="60,100" />
              </svg>
              <div className="text-white text-lg mt-2">Your Point: <span className="text-[#d0ed01] font-bold">8.966</span></div>
            </div>
          </div>
          {/* Live Course Section */}
          <div className="bg-[#232323] rounded-2xl p-6 flex items-center gap-6 shadow-lg">
            <Image src="/images/ai-course.jpg" alt="AI Foundation Pack" width={64} height={64} className="rounded-xl object-cover" />
            <div className="flex-1">
              <div className="text-white font-semibold text-lg">AI Foundation Pack LMS Course</div>
              <div className="text-gray-400 text-sm">26 March 2025, 10:00 PM</div>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#232323] text-white p-2 rounded-full border border-white/10"><FiShare2 /></button>
              <button className="bg-[#232323] text-white p-2 rounded-full border border-white/10"><FiVideo /></button>
            </div>
            <button className="px-6 py-3 rounded-lg bg-[#d0ed01] text-black font-bold text-lg hover:bg-[#c0de01] transition">Join Live</button>
          </div>
        </div>
        {/* Right: Profile, Calendar, To-Do */}
        <div className="flex flex-col gap-8">
          {/* Profile Card */}
          <div className="bg-[#232323] rounded-2xl p-6 flex flex-col items-center shadow-lg">
            <div className="relative mb-2">
              <Image src="/images/profile.jpg" alt="Profile" width={90} height={90} className="rounded-full object-cover border-4 border-[#232323]" />
              <svg className="absolute top-0 left-0" width="90" height="90">
                <circle cx="45" cy="45" r="42" stroke="#d0ed01" strokeWidth="4" fill="none" />
              </svg>
            </div>
            <div className="text-white font-bold text-lg">Komal Sai Kumar <FaCheckCircle className="inline ml-1 text-[#d0ed01]" /></div>
          </div>
          {/* Calendar */}
          <div className="bg-[#232323] rounded-2xl p-6 shadow-lg">
            <div className="text-white font-semibold mb-2">December 2024</div>
            <div className="grid grid-cols-7 gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="text-gray-400 text-center">{d}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <div
                  key={day}
                  className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-white ${selectedDate === day ? 'bg-[#d0ed01] text-black font-bold' : 'hover:bg-[#232323]'} transition`}
                  onClick={() => setSelectedDate(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          {/* To Do List */}
          <div className="bg-[#232323] rounded-2xl p-6 shadow-lg">
            <div className="text-white font-semibold mb-4">To Do List</div>
            <div className="flex flex-col gap-4">
              {todoList.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={item.checked} readOnly className="accent-[#d0ed01] w-5 h-5" />
                    <span className={`font-semibold ${item.checked ? 'text-[#d0ed01]' : 'text-white'}`}>{item.label}</span>
                    <span className="text-xs text-[#d0ed01] ml-2">{item.time}</span>
                  </div>
                  {item.sub && (
                    <div className="ml-8 flex flex-col gap-1 mt-1">
                      {item.sub.map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input type="checkbox" className="accent-[#d0ed01] w-4 h-4" />
                          <span className="text-gray-300 text-sm">{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
