"use client";
import React, { useEffect, useState } from "react";
import { FiMoreHorizontal, FiPlus, FiCheckCircle, FiEdit, FiUsers, FiSend, FiFileText, FiFlag, FiLayers, FiClipboard, FiArrowUpCircle, FiCalendar, FiClock, FiEdit2, FiUpload, FiTrendingUp, FiTarget, FiStar } from "react-icons/fi";

const mockTasks = [
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

type TabName = 'Recently' | 'Today' | 'Upcoming' | 'Later';
type BlueprintTask = {
  title: string;
  icon: React.JSX.Element;
  tags: string[];
  labels: { text: string; color: string }[];
  assignees: string[];
  subtasks: string;
  done: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabName>('Recently');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localTasks = JSON.parse(localStorage.getItem('autoTasks') || '[]');
      // Find the last dummy blueprint name from localStorage
      const dummyBlueprints = JSON.parse(localStorage.getItem('dummyBlueprints') || '[]');
      const lastDummy = dummyBlueprints.length > 0 ? dummyBlueprints[dummyBlueprints.length - 1] : null;
      if (lastDummy) {
        // Only show the 5 dummy tasks for the last dummy blueprint
        const filtered = localTasks.filter((t: any) => t.blueprint === lastDummy.name || t.blueprint === `Untitled Blueprint`);
        // If there are exactly 5, show them; else fallback
        if (filtered.length === 5) {
          setTasks(filtered);
          return;
        }
      }
      // fallback to mock if not found
      setTasks(mockTasks);
    }
  }, []);

  // Blueprint-related tasks for each tab
  const tasksByTab: Record<TabName, BlueprintTask[]> = {
    Recently: [
      {
        title: "Define Blueprint Objectives",
        icon: <FiFlag className="text-blue-400 text-xl" />,
        tags: ["Planning", "Blueprint"],
        labels: [
          { text: "Research", color: "bg-blue-900/80 text-blue-200" },
          { text: "Strategy", color: "bg-indigo-800/80 text-indigo-100" },
        ],
        assignees: ["Founder"],
        subtasks: "2",
        done: false,
      },
      {
        title: "Draft Initial Blueprint Structure",
        icon: <FiLayers className="text-purple-400 text-xl" />,
        tags: ["Blueprint", "Draft"],
        labels: [
          { text: "Design", color: "bg-purple-900/80 text-purple-100" },
          { text: "Outline", color: "bg-fuchsia-800/80 text-fuchsia-100" },
        ],
        assignees: ["Product Manager"],
        subtasks: "3",
        done: false,
      },
      {
        title: "Social Task: Upload Blueprint Content Post",
        icon: <FiArrowUpCircle className="text-cyan-400 text-xl" />,
        tags: ["Social", "Content"],
        labels: [
          { text: "Social Media", color: "bg-cyan-900/80 text-cyan-100" },
          { text: "Engagement", color: "bg-blue-800/80 text-blue-100" },
        ],
        assignees: ["Marketing"],
        subtasks: "1",
        done: false,
      },
    ],
    Today: [
      {
        title: "Collect Requirements from Stakeholders",
        icon: <FiUsers className="text-green-400 text-xl" />,
        tags: ["Research", "Stakeholders"],
        labels: [
          { text: "Communication", color: "bg-green-900/80 text-green-100" },
          { text: "Input", color: "bg-emerald-800/80 text-emerald-100" },
        ],
        assignees: ["Analyst"],
        subtasks: "4",
        done: false,
      },
      {
        title: "Review and Approve Blueprint Draft",
        icon: <FiEdit className="text-yellow-400 text-xl" />,
        tags: ["Review", "Approval"],
        labels: [
          { text: "QA", color: "bg-yellow-900/80 text-yellow-100" },
          { text: "Feedback", color: "bg-orange-800/80 text-orange-100" },
        ],
        assignees: ["Team Lead"],
        subtasks: "2",
        done: false,
      },
      {
        title: "Social Task: Upload Blueprint Content Post",
        icon: <FiArrowUpCircle className="text-cyan-400 text-xl" />,
        tags: ["Social", "Content"],
        labels: [
          { text: "Social Media", color: "bg-cyan-900/80 text-cyan-100" },
          { text: "Engagement", color: "bg-blue-800/80 text-blue-100" },
        ],
        assignees: ["Marketing"],
        subtasks: "1",
        done: false,
      },
    ],
    Upcoming: [
      {
        title: "Publish Finalized Blueprint",
        icon: <FiSend className="text-pink-400 text-xl" />,
        tags: ["Publish", "Launch"],
        labels: [
          { text: "Milestone", color: "bg-pink-900/80 text-pink-100" },
          { text: "Release", color: "bg-rose-800/80 text-rose-100" },
        ],
        assignees: ["Admin"],
        subtasks: "1",
        done: true,
      },
      {
        title: "Blueprint Post-Launch Review",
        icon: <FiClipboard className="text-cyan-400 text-xl" />,
        tags: ["Review", "Post-Launch"],
        labels: [
          { text: "Retrospective", color: "bg-cyan-900/80 text-cyan-100" },
          { text: "Feedback", color: "bg-blue-800/80 text-blue-100" },
        ],
        assignees: ["QA Lead"],
        subtasks: "2",
        done: false,
      },
    ],
    Later: [],
  };

  return (
    <div className="flex w-full gap-8">
      {/* Left: Task List */}
      <div className="flex-1 min-w-[350px] max-w-[480px]">
        <h2 className="text-3xl font-bold mb-2">Tasks</h2>
        <div className="flex gap-6 mb-6 text-lg font-semibold">
          {['Recently', 'Today', 'Upcoming', 'Later'].map(tab => (
            <span
              key={tab}
              className={
                (activeTab === tab
                  ? 'text-[#d0ed01] border-b-2 border-[#d0ed01] pb-1'
                  : 'text-gray-400') +
                ' cursor-pointer transition-colors duration-150'
              }
              onClick={() => setActiveTab(tab as TabName)}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="mb-4">
          <button
            className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold text-sm hover:bg-[#b6d000] transition"
          >
            + Add Task
          </button>
        </div>
        <div className="flex flex-col gap-6 pr-2 max-h-[600px] overflow-y-auto custom-scrollbar">
          {(tasksByTab[activeTab] || []).length > 0 ? (
            tasksByTab[activeTab].map((task: BlueprintTask, idx: number) => (
              <div
                key={task.title}
                className="rounded-2xl p-6 text-white text-lg font-semibold border border-gray-200/30 flex flex-col gap-2 relative cursor-pointer transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] bg-white/10 backdrop-blur-md"
                style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
                onClick={() => { setSelectedTask(task); setIsModalOpen(true); }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-black/30 border border-white/10 shadow-inner">
                      {task.icon}
                    </span>
                    <span className="truncate max-w-[60vw] text-xl font-bold tracking-tight">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {task.done && <FiCheckCircle className="text-[#d0ed01] text-2xl" />}
                    <span className="bg-black/40 border border-[#d0ed01] text-[#d0ed01] rounded-full px-3 py-0.5 text-base font-bold ml-2 flex items-center justify-center">{task.subtasks}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {task.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-800/80 text-gray-200 text-xs px-2 py-0.5 rounded shadow-sm border border-gray-700/40">{tag}</span>
                  ))}
                  {task.labels.map((label: { text: string; color: string }) => (
                    <span key={label.text} className={`text-xs px-2 py-0.5 rounded shadow-sm border border-white/10 ${label.color}`}>{label.text}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {task.assignees.map((a: string) => (
                    <span key={a} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#23243a] to-[#181926] text-[#d0ed01] text-base font-bold border border-white/20 shadow-lg">{a.split(' ').map((w: string) => w[0]).join('')}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-8">No tasks found.</div>
          )}
        </div>
        {/* Modal for task details */}
        {isModalOpen && selectedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-[#23243a] rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] text-white relative border border-white/10">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 border border-white/10 shadow-inner">{selectedTask.icon}</span>
                <h3 className="text-2xl font-bold tracking-tight mb-0">{selectedTask.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTask.tags.map((tag: string) => (
                  <span key={tag} className="bg-gray-800/80 text-gray-200 text-xs px-2 py-0.5 rounded shadow-sm border border-gray-700/40">{tag}</span>
                ))}
                {selectedTask.labels.map((label: any) => (
                  <span key={label.text} className={`text-xs px-2 py-0.5 rounded shadow-sm border border-white/10 ${label.color}`}>{label.text}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-2">
                {selectedTask.assignees.map((a: string) => (
                  <span key={a} className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#23243a] to-[#181926] text-[#d0ed01] text-base font-bold border border-white/20 shadow-lg">{a.split(' ').map((w:string)=>w[0]).join('')}</span>
                ))}
              </div>
              <div className="text-sm text-gray-300 mb-2">Subtasks: <span className="text-[#d0ed01] font-bold">{selectedTask.subtasks}</span></div>
              {selectedTask.done && <div className="text-green-400 font-bold flex items-center gap-1"><FiCheckCircle className="inline text-green-400" /> Done</div>}
            </div>
          </div>
        )}
      </div>
      {/* Right: Two Smart Cards - Premium Wide Style */}
      <div className="flex-1 flex flex-col min-w-[350px] gap-10 max-w-[900px] mx-auto mt-8">
        {/* Smart Calendar Module */}
        <div className="rounded-2xl bg-[#18191c]/80 border border-[#d0ed01]/30 shadow-[0_8px_40px_0_rgba(208,237,1,0.10)] p-6 flex flex-col gap-3 w-full relative overflow-hidden max-w-[600px] mx-auto" style={{minWidth: 0, backdropFilter: 'blur(8px)'}}>
          <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent" style={{boxShadow: '0 0 24px 4px #d0ed01, 0 0 60px 0 #a78bfa22'}}></div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-base font-bold text-white tracking-tight">
              <FiCalendar className="text-[#d0ed01] text-lg drop-shadow-lg" /> Today - April 10, 2021
            </div>
            <button className="flex items-center justify-center bg-[#d0ed01] text-black rounded-full w-7 h-7 shadow-lg hover:scale-105 transition-all text-sm border border-[#d0ed01]">
              <FiPlus />
            </button>
          </div>
          {/* Boxed Month Calendar */}
          <div className="flex flex-col items-center mb-2">
            <div className="grid grid-cols-7 gap-0.5 w-full mb-1">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                <div key={d} className="text-xs text-gray-400 font-semibold text-center py-0.5 tracking-wide uppercase">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-0.5 w-full">
              {Array.from({length: 35}, (_, i) => {
                const day = i - 3;
                const isPrevOrNext = day < 1 || day > 30;
                const isToday = day === 11;
                return (
                  <div
                    key={i}
                    className={`w-5 h-5 flex items-center justify-center rounded-md font-bold text-xs text-center transition-all duration-200 cursor-pointer border
                      ${isToday ? 'bg-[#d0ed01]/90 text-black border-[#d0ed01] shadow-[0_0_6px_2px_#d0ed01] animate-pulse' :
                        isPrevOrNext ? 'bg-transparent text-gray-600 border-transparent' :
                        'bg-[#23242a]/80 text-white border-[#23242a] hover:bg-[#d0ed01]/10 hover:text-[#d0ed01]'}
                    `}
                    style={isToday ? { boxShadow: '0 0 8px 2px #d0ed01' } : {}}
                  >
                    {day > 0 && day <= 30 ? day : ''}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Quick Stats */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#33343a]/50">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-[#d0ed01] font-bold text-lg">12</span>
                <span className="text-gray-400 text-xs">Events</span>
              </div>
              <div className="w-px h-8 bg-[#33343a]"></div>
              <div className="flex flex-col items-center">
                <span className="text-purple-400 font-bold text-lg">8</span>
                <span className="text-gray-400 text-xs">Tasks</span>
              </div>
              <div className="w-px h-8 bg-[#33343a]"></div>
              <div className="flex flex-col items-center">
                <span className="text-cyan-400 font-bold text-lg">3</span>
                <span className="text-gray-400 text-xs">Reminders</span>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-[#d0ed01]/10 hover:bg-[#d0ed01]/20 text-[#d0ed01] px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border border-[#d0ed01]/30">
              <FiPlus className="text-xs" />
              Quick Add
            </button>
          </div>
        </div>
        {/* Productivity & Progress Snapshot */}
        <div className="rounded-2xl bg-[#18191c]/80 border border-[#d0ed01]/30 shadow-[0_8px_40px_0_rgba(208,237,1,0.10)] p-8 flex flex-col gap-6 w-full relative overflow-hidden max-w-[600px] mx-auto" style={{minWidth: 0, backdropFilter: 'blur(8px)'}}>
          <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent" style={{boxShadow: '0 0 24px 4px #d0ed01, 0 0 60px 0 #a78bfa22'}}></div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-xl font-bold text-white tracking-tight">
              <FiTrendingUp className="text-[#b388ff] text-2xl" /> Productivity Snapshot
            </div>
            <FiTarget className="text-2xl text-[#d0ed01] cursor-pointer" title="Productivity Graph" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <FiClock className="text-xl text-gray-300" />
            <span className="text-white font-semibold text-base">Focus Time:</span>
            <span className="text-[#d0ed01] font-bold text-base">47 min today</span>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-4 mb-4">
            <FiTrendingUp className="text-xl text-purple-300" />
            <span className="text-white font-semibold text-base">Task Progress:</span>
            <div className="flex-1 h-4 bg-[#23242a]/80 rounded-full overflow-hidden relative max-w-[200px]">
              <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#d0ed01] via-purple-400 to-cyan-400 animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <span className="text-[#d0ed01] font-bold text-base ml-2">60%</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <FiTarget className="text-xl text-pink-300" />
            <span className="text-white font-semibold text-base">Daily Goal:</span>
            <span className="text-purple-300 font-bold text-base">Finalize "Draft Initial Blueprint"</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <FiStar className="text-xl text-yellow-300" />
            <span className="text-white/90 text-sm">Tip: You're <span className="text-[#d0ed01] font-bold">1 task</span> away from streak!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
