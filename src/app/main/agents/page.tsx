"use client";
import React, { useState } from "react";
import { 
  FiPlus, 
  FiMoreHorizontal, 
  FiClock, 
  FiCheckCircle, 
  FiAlertCircle,
  FiEdit,
  FiCalendar,
  FiSearch,
  FiTarget,
  FiPhone,
  FiZap,
  FiBarChart2,
  FiFileText,
  FiUsers,
  FiTrendingUp,
  FiSettings,
  FiUpload,
  FiX
} from "react-icons/fi";

interface Agent {
  id: number;
  name: string;
  function: string;
  status: "Idle" | "Running";
  icon: React.ReactNode;
}

interface Task {
  id: number;
  agent: string;
  task: string;
  status: "Completed" | "In Progress";
  date: string;
  score: number | null;
}

interface CategoryAgents {
  [key: string]: Agent[];
}

// Agent categories and their agents
const categories: CategoryAgents = {
  Marketing: [
    {
      id: 1,
      name: "Ad Copy Agent",
      function: "Creates compelling ad copy for various platforms",
      status: "Idle",
      icon: <FiEdit className="text-2xl text-[#d0ed01]" />
    },
    {
      id: 2,
      name: "Social Scheduler",
      function: "Manages and schedules social media content",
      status: "Running",
      icon: <FiCalendar className="text-2xl text-[#d0ed01]" />
    },
    {
      id: 3,
      name: "SEO Content Generator",
      function: "Creates SEO-optimized content",
      status: "Idle",
      icon: <FiSearch className="text-2xl text-[#d0ed01]" />
    }
  ],
  Sales: [
    {
      id: 4,
      name: "Lead Generator",
      function: "Identifies and qualifies potential leads",
      status: "Running",
      icon: <FiTarget className="text-2xl text-[#d0ed01]" />
    },
    {
      id: 5,
      name: "Follow-up Agent",
      function: "Manages customer follow-ups",
      status: "Idle",
      icon: <FiPhone className="text-2xl text-[#d0ed01]" />
    }
  ],
  Operations: [
    {
      id: 6,
      name: "Process Automator",
      function: "Automates routine operational tasks",
      status: "Idle",
      icon: <FiZap className="text-2xl text-[#d0ed01]" />
    },
    {
      id: 7,
      name: "Data Analyzer",
      function: "Analyzes operational data",
      status: "Running",
      icon: <FiBarChart2 className="text-2xl text-[#d0ed01]" />
    }
  ]
};

// Task history mock data
const taskHistory: Task[] = [
  {
    id: 1,
    agent: "Ad Copy Agent",
    task: "Create Facebook ad copy for summer sale",
    status: "Completed",
    date: "2024-03-15",
    score: 95
  },
  {
    id: 2,
    agent: "Lead Generator",
    task: "Generate leads for Q2 campaign",
    status: "In Progress",
    date: "2024-03-14",
    score: null
  }
];

export default function AgentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof CategoryAgents>("Marketing");
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showTaskHistory, setShowTaskHistory] = useState(false);

  return (
    <div className="w-full p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <FiUsers className="text-3xl text-[#d0ed01]" />
          <h1 className="text-3xl font-bold text-white">Growth Assistant Hub</h1>
        </div>
        <button 
          className="px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2"
          onClick={() => setShowTaskHistory(!showTaskHistory)}
        >
          <FiClock className="text-lg" />
          Task History
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-4 mb-8">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
              selectedCategory === category
                ? "bg-[#d0ed01] text-black"
                : "bg-[#232323] text-white hover:bg-[#333]"
            }`}
            onClick={() => setSelectedCategory(category as keyof CategoryAgents)}
          >
            {category === "Marketing" && <FiTrendingUp className="text-lg" />}
            {category === "Sales" && <FiTarget className="text-lg" />}
            {category === "Operations" && <FiSettings className="text-lg" />}
            {category}
          </button>
        ))}
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories[selectedCategory].map((agent: Agent) => (
          <div
            key={agent.id}
            className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="-mt-1">
                  {agent.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  <p className="text-sm text-gray-400">{agent.function}</p>
                </div>
              </div>
              <FiMoreHorizontal className="text-gray-400 cursor-pointer hover:text-white transition" />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full ${
                agent.status === "Running" ? "bg-[#d0ed01]" : "bg-gray-500"
              }`}></span>
              <span className="text-sm text-gray-400">{agent.status}</span>
            </div>
            <button
              className="w-full py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition flex items-center justify-center gap-2"
              onClick={() => {
                setSelectedAgent(agent);
                setShowTaskPanel(true);
              }}
            >
              <FiFileText className="text-lg" />
              Assign Task
            </button>
          </div>
        ))}
      </div>

      {/* Task Assignment Panel */}
      {showTaskPanel && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-8 w-full max-w-2xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {selectedAgent.icon}
                <h2 className="text-2xl font-bold text-white">Assign Task to {selectedAgent.name}</h2>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowTaskPanel(false)}
              >
                ✕
              </button>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Task Description</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-[#232323] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition"
                  rows={4}
                  placeholder="Describe the task..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Goal</label>
                <select className="w-full px-4 py-3 rounded-lg bg-[#232323] text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
                  <option>Increase Engagement</option>
                  <option>Generate Leads</option>
                  <option>Improve Conversion</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Priority</label>
                <div className="flex gap-4">
                  {["Low", "Medium", "High"].map((priority) => (
                    <label key={priority} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="priority"
                        className="accent-[#d0ed01]"
                      />
                      <span className="text-white">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Upload Files (Optional)</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#d0ed01]/30 transition cursor-pointer">
                  <FiUpload className="mx-auto text-2xl text-[#d0ed01] mb-2" />
                  <p className="text-gray-400">Drag and drop files here or click to browse</p>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition flex items-center gap-2"
                  onClick={() => setShowTaskPanel(false)}
                >
                  <FiX className="text-lg" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2"
                >
                  <FiCheckCircle className="text-lg" />
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task History Panel */}
      {showTaskHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-8 w-full max-w-4xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <FiClock className="text-2xl text-[#d0ed01]" />
                <h2 className="text-2xl font-bold text-white">Task History</h2>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowTaskHistory(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {taskHistory.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#232323] rounded-lg p-4 border border-white/10 hover:border-[#d0ed01]/30 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{task.agent}</h3>
                      <p className="text-gray-400">{task.task}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === "Completed" ? (
                        <FiCheckCircle className="text-[#d0ed01]" />
                      ) : (
                        <FiAlertCircle className="text-yellow-500" />
                      )}
                      <span className={`text-sm ${
                        task.status === "Completed" ? "text-[#d0ed01]" : "text-yellow-500"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400">
                    <span>{task.date}</span>
                    {task.score && (
                      <span className="text-[#d0ed01]">Score: {task.score}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 