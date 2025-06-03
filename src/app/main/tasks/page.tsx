import React from "react";
import { FiMoreHorizontal, FiPlus } from "react-icons/fi";

const tasks = [
  {
    title: "Medical LP",
    desc: "Make a landing page and mobile app.",
    avatars: ["AL", "JS", "MK", "TR"],
    progress: 35,
    color: "#d0ed01",
  },
  {
    title: "Finacial App",
    desc: "Branding and mobile app development.",
    avatars: ["AM", "BK", "CL", "DS", "EP"],
    progress: 60,
    color: "#fff",
  },
];

const meetingAvatars = ["AL", "JS", "MK", "TR"];

function AvatarGroup({ avatars, bg = "#232323", text = "#fff" }: { avatars: string[]; bg?: string; text?: string }) {
  return (
    <div className="flex -space-x-2">
      {avatars.map((a: string, i: number) => (
        <div
          key={a + i}
          className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-black text-xs font-bold"
          style={{ background: bg, color: text, zIndex: 10 - i }}
        >
          {a}
        </div>
      ))}
    </div>
  );
}

export default function TasksPage() {
  return (
    <div className="flex w-full gap-8">
      {/* Left: My tasks */}
      <div className="flex-1 min-w-[350px] max-w-[480px]">
        <h2 className="text-3xl font-bold mb-2">My tasks</h2>
        <div className="flex gap-6 mb-6 text-lg font-semibold">
          <span className="text-[#d0ed01] border-b-2 border-[#d0ed01] pb-1 cursor-pointer">Recently</span>
          <span className="text-gray-400 cursor-pointer">Today</span>
          <span className="text-gray-400 cursor-pointer">Upcoming</span>
          <span className="text-gray-400 cursor-pointer">Later</span>
        </div>
        <div className="flex flex-col gap-6 pr-2 max-h-[600px] overflow-y-auto custom-scrollbar">
          {tasks.map((task, idx) => (
            <div
              key={task.title}
              className="rounded-2xl p-6 relative"
              style={{ background: idx === 0 ? "#232323" : "#232323" }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-bold text-white">{task.title}</div>
                <FiMoreHorizontal className="text-gray-400 text-xl cursor-pointer" />
              </div>
              <div className="text-gray-300 text-sm mb-4">{task.desc}</div>
              <AvatarGroup avatars={task.avatars} bg="#232323" text="#d0ed01" />
              <div className="mt-6 text-xs text-gray-300 mb-1 flex justify-between">
                <span>Progress</span>
                <span className={idx === 0 ? "text-[#d0ed01]" : "text-white"}>{task.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#18181b]">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${task.progress}%`,
                    background: idx === 0 ? "#d0ed01" : "#fff",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Today, calendar, meeting */}
      <div className="flex-1 flex flex-col min-w-[350px]">
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg text-gray-300">April 10, 2021</div>
          <button className="flex items-center gap-2 text-black bg-[#d0ed01] px-4 py-2 rounded-lg font-semibold hover:bg-lime-300 transition">
            <FiPlus /> Add tasks
          </button>
        </div>
        <h2 className="text-3xl font-bold mb-4">Today</h2>
        <div className="flex gap-8">
          {/* Calendar */}
          <div className="flex flex-col items-center justify-start pt-2">
            <div className="grid grid-cols-7 gap-1 text-center text-gray-400 text-xs mb-2">
              {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
                <div key={d} className="w-8">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-gray-500 text-xs">
              {[30,31,1,2,3,4,5,6,7,8,9,10,11,12].map((d, i) => (
                <div
                  key={d}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${d===11 ? 'bg-[#d0ed01] text-black font-bold' : ''}`}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
          {/* Meeting card */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="bg-[#d0ed01] rounded-2xl p-6 flex flex-col gap-2 min-w-[260px] max-w-[320px]">
              <div className="text-lg font-bold text-black mb-1">Meeting</div>
              <div className="text-gray-700 text-sm mb-2">Discuss team tasks for the day.</div>
              <AvatarGroup avatars={meetingAvatars} bg="#fff" text="#232323" />
              <div className="flex justify-between items-center mt-4">
                <span className="text-black font-bold text-lg">9:00 AM</span>
                <span className="bg-black rounded-full p-2">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M7 10.5l2 2 4-4" stroke="#d0ed01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Project time tracker */}
        <div className="mt-8 flex items-center gap-4 bg-[#232323] rounded-2xl p-6">
          <div>
            <div className="text-white font-bold text-lg mb-1">Project time tracker</div>
            <div className="text-gray-400 text-sm">You can start tracking.</div>
          </div>
          <button className="ml-auto bg-[#d0ed01] rounded-full w-12 h-12 flex items-center justify-center">
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
              <path d="M11 9l7 5-7 5V9z" fill="#232323"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
