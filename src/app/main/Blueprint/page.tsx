"use client";
import React, { useState } from "react";
import {
  FiBook,
  FiPlus,
  FiMoreHorizontal,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit,
  FiCalendar,
  FiSearch,
  FiTarget,
  FiZap,
  FiBarChart2,
  FiFileText,
  FiUsers,
  FiTrendingUp,
  FiSettings,
  FiUpload,
  FiX,
  FiExternalLink,
  FiDownload,
  FiEye,
  FiFilter,
  FiPlay,
  FiTrash2,
  FiPause,
  FiRefreshCw,
  FiCopy,
  FiPaperclip,
  FiUser
} from "react-icons/fi";

interface Blueprint {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "Draft" | "In Progress" | "Completed";
  startDate: string;
  endDate: string;
  metrics: {
    surveyCompletionRate: number;
    participantCount: number;
  };
  progress: number;
  icon: React.ReactNode;
  tags: string[];
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
  lastModifiedBy: string;
  version: string;
}

interface BlueprintCategory {
  [key: string]: Blueprint[];
}

// Mock data for blueprints
const categories: BlueprintCategory = {
  "MVP Experiments": [
    {
      id: 1,
      title: "Blueprint Alpha",
      description: "Test market validation through landing page and user interviews",
      category: "MVP",
      status: "In Progress",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      metrics: {
        surveyCompletionRate: 75,
        participantCount: 150
      },
      progress: 60,
      icon: <FiTarget className="text-2xl text-[#d0ed01]" />,
      tags: ["MVP", "Market Validation", "User Research"],
      attachments: [
        { name: "User Interview Script.docx", type: "DOC", size: "1.2 MB" },
        { name: "Landing Page Design.pdf", type: "PDF", size: "3.4 MB" }
      ],
      lastModifiedBy: "John Doe",
      version: "1.2"
    },
    {
      id: 2,
      title: "Blueprint Beta",
      description: "Product positioning test with target audience segments",
      category: "Positioning",
      status: "Draft",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      metrics: {
        surveyCompletionRate: 0,
        participantCount: 0
      },
      progress: 0,
      icon: <FiTrendingUp className="text-2xl text-[#d0ed01]" />,
      tags: ["Positioning", "Market Research"],
      lastModifiedBy: "Jane Smith",
      version: "0.1"
    },
    {
      id: 5,
      title: "Blueprint Epsilon",
      description: "Test core feature set with early adopters",
      category: "MVP",
      status: "In Progress",
      startDate: "2024-03-20",
      endDate: "2024-04-20",
      metrics: {
        surveyCompletionRate: 35,
        participantCount: 50
      },
      progress: 35,
      icon: <FiZap className="text-2xl text-[#d0ed01]" />,
      tags: ["MVP", "Feature Testing", "Early Adopters"],
      attachments: [
        { name: "Feature Roadmap.pdf", type: "PDF", size: "2.1 MB" },
        { name: "User Feedback.xlsx", type: "XLS", size: "1.5 MB" }
      ],
      lastModifiedBy: "Alex Chen",
      version: "0.8"
    }
  ],
  "A/B Tests": [
    {
      id: 3,
      title: "Blueprint Gamma",
      description: "Test different pricing models and feature sets",
      category: "A/B Test",
      status: "Completed",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      metrics: {
        surveyCompletionRate: 92,
        participantCount: 300
      },
      progress: 100,
      icon: <FiZap className="text-2xl text-[#d0ed01]" />,
      tags: ["A/B Test", "Pricing", "Features"],
      lastModifiedBy: "Mike Johnson",
      version: "2.0"
    },
    {
      id: 6,
      title: "Blueprint Zeta",
      description: "Test different onboarding flows and user engagement",
      category: "A/B Test",
      status: "In Progress",
      startDate: "2024-03-25",
      endDate: "2024-04-25",
      metrics: {
        surveyCompletionRate: 45,
        participantCount: 200
      },
      progress: 45,
      icon: <FiUsers className="text-2xl text-[#d0ed01]" />,
      tags: ["A/B Test", "Onboarding", "User Experience"],
      attachments: [
        { name: "Onboarding Flows.pdf", type: "PDF", size: "4.2 MB" },
        { name: "Engagement Metrics.xlsx", type: "XLS", size: "2.8 MB" }
      ],
      lastModifiedBy: "Emma Davis",
      version: "1.0"
    }
  ],
  "Market Research": [
    {
      id: 4,
      title: "Blueprint Delta",
      description: "Competitive analysis and market opportunity assessment",
      category: "Research",
      status: "In Progress",
      startDate: "2024-03-10",
      endDate: "2024-04-10",
      metrics: {
        surveyCompletionRate: 45,
        participantCount: 80
      },
      progress: 45,
      icon: <FiBarChart2 className="text-2xl text-[#d0ed01]" />,
      tags: ["Research", "Competition", "Market Analysis"],
      lastModifiedBy: "Sarah Wilson",
      version: "1.5"
    },
    {
      id: 7,
      title: "Blueprint Eta",
      description: "Customer behavior and market trend analysis",
      category: "Research",
      status: "Draft",
      startDate: "2024-04-05",
      endDate: "2024-05-05",
      metrics: {
        surveyCompletionRate: 0,
        participantCount: 0
      },
      progress: 0,
      icon: <FiTrendingUp className="text-2xl text-[#d0ed01]" />,
      tags: ["Research", "Customer Behavior", "Market Trends"],
      attachments: [
        { name: "Market Trends Report.pdf", type: "PDF", size: "3.7 MB" },
        { name: "Customer Survey.docx", type: "DOC", size: "1.9 MB" }
      ],
      lastModifiedBy: "David Kim",
      version: "0.3"
    }
  ]
};

export default function BlueprintPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof BlueprintCategory>("MVP Experiments");
  const [showExecutionDrawer, setShowExecutionDrawer] = useState(false);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(
    Object.values(categories).flatMap(blueprints =>
      blueprints.flatMap(bp => bp.tags)
    )
  ));

  return (
    <div className="w-full p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <FiBook className="text-3xl text-[#d0ed01]" />
          <h1 className="text-3xl font-bold text-white">Blueprint Hub</h1>
        </div>
        <button 
          className="px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2"
        >
          <FiPlus className="text-lg" />
          Create Blueprint
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
            onClick={() => setSelectedCategory(category as keyof BlueprintCategory)}
          >
            {category === "MVP Experiments" && <FiTarget className="text-lg" />}
            {category === "A/B Tests" && <FiZap className="text-lg" />}
            {category === "Market Research" && <FiBarChart2 className="text-lg" />}
            {category}
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 bg-[#232323] px-4 py-2 rounded-lg">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search blueprints..."
              className="bg-transparent text-white outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition">
            <FiFilter className="text-lg" />
          </button>
        </div>
        
        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedTags.includes(tag)
                  ? "bg-[#d0ed01] text-black"
                  : "bg-[#232323] text-white hover:bg-[#333]"
              }`}
              onClick={() => {
                setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {["Draft", "In Progress", "Completed"].map((status) => (
            <button
              key={status}
              className={`px-3 py-1 rounded-full text-sm transition ${
                selectedStatus === status
                  ? "bg-[#d0ed01] text-black"
                  : "bg-[#232323] text-white hover:bg-[#333]"
              }`}
              onClick={() => setSelectedStatus(prev => prev === status ? null : status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Blueprint Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories[selectedCategory].map((blueprint) => (
          <div
            key={blueprint.id}
            className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="-mt-1">
                  {blueprint.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{blueprint.title}</h3>
                  <p className="text-sm text-gray-400">{blueprint.description}</p>
                </div>
              </div>
              <FiMoreHorizontal className="text-gray-400 cursor-pointer hover:text-white transition" />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#232323] rounded-lg p-3">
                <div className="text-sm text-gray-400">Survey Completion</div>
                <div className="text-lg font-semibold text-white">{blueprint.metrics.surveyCompletionRate}%</div>
              </div>
              <div className="bg-[#232323] rounded-lg p-3">
                <div className="text-sm text-gray-400">Participants</div>
                <div className="text-lg font-semibold text-white">{blueprint.metrics.participantCount}</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
              <FiCalendar className="text-[#d0ed01]" />
              <span>{blueprint.startDate} - {blueprint.endDate}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blueprint.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-[#232323] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Status and Version */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                blueprint.status === "Completed" 
                  ? "bg-green-500/20 text-green-500"
                  : blueprint.status === "In Progress"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-gray-500/20 text-gray-500"
              }`}>
                {blueprint.status}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiUser className="text-[#d0ed01]" />
                <span>{blueprint.lastModifiedBy}</span>
                <span className="text-xs">v{blueprint.version}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center justify-center gap-2"
                onClick={() => {
                  setSelectedBlueprint(blueprint);
                  setShowExecutionDrawer(true);
                }}
              >
                <FiPlay className="text-lg" />
                Start Execution
              </button>
              <button className="p-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition">
                <FiEdit className="text-lg" />
              </button>
              <button className="p-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition">
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Execution Drawer */}
      {showExecutionDrawer && selectedBlueprint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-8 w-full max-w-4xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {selectedBlueprint.icon}
                <h2 className="text-2xl font-bold text-white">{selectedBlueprint.title}</h2>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowExecutionDrawer(false)}
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Overview */}
              <div className="bg-[#232323] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Blueprint Overview</h3>
                <p className="text-gray-400 mb-4">{selectedBlueprint.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Survey Completion Rate</div>
                    <div className="text-lg font-semibold text-white">{selectedBlueprint.metrics.surveyCompletionRate}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Participant Count</div>
                    <div className="text-lg font-semibold text-white">{selectedBlueprint.metrics.participantCount}</div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-[#232323] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Timeline</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <FiCalendar className="text-[#d0ed01]" />
                  <span>{selectedBlueprint.startDate} - {selectedBlueprint.endDate}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-[#232323] rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">Progress</h3>
                  <span className="text-[#d0ed01]">{selectedBlueprint.progress}%</span>
                </div>
                <div className="w-full bg-[#18181b] rounded-full h-2">
                  <div
                    className="bg-[#d0ed01] h-2 rounded-full"
                    style={{ width: `${selectedBlueprint.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Attachments */}
              {selectedBlueprint.attachments && (
                <div className="bg-[#232323] rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Attachments</h3>
                  <div className="space-y-2">
                    {selectedBlueprint.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-[#18181b] rounded-lg">
                        <div className="flex items-center gap-2">
                          <FiPaperclip className="text-[#d0ed01]" />
                          <span className="text-white">{file.name}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{file.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button className="px-6 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition flex items-center gap-2">
                  <FiPause className="text-lg" />
                  Pause
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition flex items-center gap-2">
                  <FiRefreshCw className="text-lg" />
                  Restart
                </button>
                <button className="px-6 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition flex items-center gap-2">
                  <FiCopy className="text-lg" />
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 