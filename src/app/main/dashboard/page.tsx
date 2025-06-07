"use client";
import { useState } from "react";
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import dynamic from 'next/dynamic';
import { FiArrowUpRight, FiArrowDownRight, FiPlus, FiUsers, FiZap, FiCheckSquare, FiBarChart2, FiTrendingUp, FiActivity, FiUser, FiMessageCircle, FiLayers, FiBookOpen, FiMic, FiX, FiBell } from 'react-icons/fi';
import { FaRocket, FaRobot } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const notifications = [
  { text: "You fixed a bug.", time: "Just now", color: "#d0ed01" },
  { text: "New user registered.", time: "59 minutes ago", color: "#d0ed01" },
  { text: "You fixed a bug.", time: "12 hours ago", color: "#d0ed01" },
  { text: "Andi Lane subscribed to you.", time: "Today, 11:59 AM", color: "#d0ed01" },
];

const activities = [
  { text: "Changed the style.", time: "Just now", color: "#eab308" },
  { text: "Released a new version.", time: "59 minutes ago", color: "#38bdf8" },
  { text: "Submitted a bug.", time: "Today, 11:59 AM", color: "#f472b6" },
  { text: "Modified A data in Page X.", time: "Today, 11:59 AM", color: "#f472b6" },
  { text: "Deleted a page in Project X.", time: "Feb 2, 2025", color: "#f472b6" },
];

const contacts = [
  { name: "Natali Craig" },
  { name: "Drew Cano" },
  { name: "Andi Lane" },
  { name: "Koray Okumus" },
  { name: "Kate Morrison" },
  { name: "Melody Macy" },
];

// Mock data for the chart
const userData = [
  { month: "Jan", users: 60 },
  { month: "Feb", users: 80 },
  { month: "Mar", users: 200 },
  { month: "Apr", users: 180 },
  { month: "May", users: 400 },
  { month: "Jun", users: 520 },
  { month: "Jul", users: 300 },
  { month: "Aug", users: 350 },
  { month: "Sep", users: 370 },
  { month: "Oct", users: 390 },
  { month: "Nov", users: 160 },
  { month: "Dec", users: 280 },
];

const chartData = {
  labels: userData.map(d => d.month),
  datasets: [
    {
      label: 'New Visitors',
      data: userData.map(d => d.users),
      fill: true,
      backgroundColor: 'rgba(208,237,1,0.15)',
      borderColor: '#d0ed01',
      pointBackgroundColor: '#d0ed01',
      pointBorderColor: '#18181b',
      pointRadius: 5,
      pointHoverRadius: 7,
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: { 
        color: '#fff', 
        font: { 
          size: 14,
          family: "'Inter', sans-serif",
          weight: 'bold' as const
        },
        padding: 20
      },
      position: 'top' as const,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(35, 35, 43, 0.95)',
      titleColor: '#d0ed01',
      bodyColor: '#d0ed01',
      borderColor: '#d0ed01',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 6,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13
      }
    },
  },
  scales: {
    x: {
      grid: { 
        color: 'rgba(35, 35, 43, 0.5)',
        drawBorder: false
      },
      ticks: { 
        color: '#bdbdbd', 
        font: { 
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 10
      },
    },
    y: {
      grid: { 
        color: 'rgba(35, 35, 43, 0.5)',
        drawBorder: false
      },
      ticks: { 
        color: '#bdbdbd', 
        font: { 
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 10
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2
    },
    point: {
      radius: 4,
      hoverRadius: 6,
      borderWidth: 2
    }
  }
};

const websiteTrafficData = {
  labels: ['Google', 'YouTube', 'Instagram', 'Pinterest', 'Facebook', 'Twitter'],
  datasets: [
    {
      label: 'Visits',
      data: [1200, 950, 800, 600, 700, 400],
      backgroundColor: '#d0ed01',
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 40,
    },
  ],
};

const websiteTrafficOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(35, 35, 43, 0.95)',
      titleColor: '#d0ed01',
      bodyColor: '#d0ed01',
      borderColor: '#d0ed01',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 6,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13
      }
    },
  },
  scales: {
    x: {
      grid: { 
        color: 'rgba(35, 35, 43, 0.5)',
        drawBorder: false
      },
      ticks: { 
        color: '#bdbdbd', 
        font: { 
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 10
      },
    },
    y: {
      grid: { 
        color: 'rgba(35, 35, 43, 0.5)',
        drawBorder: false
      },
      ticks: { 
        color: '#bdbdbd', 
        font: { 
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 10
      },
      beginAtZero: true,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
};

const deviceTrafficData = {
  labels: ['Mobile', 'Desktop', 'Tablet'],
  datasets: [
    {
      label: 'Users',
      data: [1800, 1200, 400],
      backgroundColor: ['#d0ed01', '#bada55', '#a3c701'],
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 40,
    },
  ],
};

const deviceTrafficOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(35, 35, 43, 0.95)',
      titleColor: '#d0ed01',
      bodyColor: '#d0ed01',
      borderColor: '#d0ed01',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 6,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13
      }
    },
  },
  scales: {
    x: {
      grid: { 
        color: 'rgba(35, 35, 43, 0.5)',
        drawBorder: false
      },
      ticks: { 
        color: '#bdbdbd', 
        font: { 
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 10
      },
    },
    y: {
      grid: { 
        color: 'rgba(35, 35, 43, 0.5)',
        drawBorder: false
      },
      ticks: { 
        color: '#bdbdbd', 
        font: { 
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 10
      },
      beginAtZero: true,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
};

const locationTrafficData = {
  labels: ['USA', 'India', 'UK', 'Germany', 'Canada', 'Australia'],
  datasets: [
    {
      label: 'Users',
      data: [900, 700, 400, 300, 200, 150],
      backgroundColor: [
        '#d0ed01',
        '#bada55',
        '#a3c701',
        '#eab308',
        '#38bdf8',
        '#f472b6',
      ],
      borderWidth: 2,
      borderColor: '#18181b',
    },
  ],
};

const locationTrafficOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: { 
        color: '#fff', 
        font: { 
          size: 14,
          family: "'Inter', sans-serif",
          weight: 'bold' as const
        },
        padding: 20,
        boxWidth: 12,
        boxHeight: 12
      },
      position: 'right' as const,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(35, 35, 43, 0.95)',
      titleColor: '#d0ed01',
      bodyColor: '#d0ed01',
      borderColor: '#d0ed01',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 6,
      titleFont: {
        size: 14,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 13
      }
    },
  },
  cutout: '65%',
  radius: '90%',
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
};

const TrafficByWebsiteChart = dynamic(() => import('./TrafficByWebsiteChart'), { ssr: false });

// Mock data for overview cards
const overviewCards = [
  {
    title: 'Active Projects',
    value: 12,
    trend: '+2',
    trendDir: 'up',
    chart: [4, 6, 8, 7, 10, 12],
    action: 'View All',
    icon: <FaRocket className="text-xl text-[#d0ed01]" />,
  },
  {
    title: 'Organizations Created',
    value: 5,
    trend: '+1',
    trendDir: 'up',
    chart: [1, 2, 2, 3, 4, 5],
    action: 'Create',
    icon: <FiUsers className="text-xl text-[#d0ed01]" />,
  },
  {
    title: 'Tasks in Progress',
    value: 34,
    trend: '-3',
    trendDir: 'down',
    chart: [30, 32, 36, 38, 37, 34],
    action: 'View All',
    icon: <FiCheckSquare className="text-xl text-[#d0ed01]" />,
  },
];

// Blueprint progress mock
const blueprintSteps = [
  { label: 'Idea', status: 'done' },
  { label: 'In Review', status: 'done' },
  { label: 'Execution', status: 'active' },
  { label: 'Completed', status: 'pending' },
];

// Quick actions
const quickActions = [
  { label: 'Create Organization', icon: <FiPlus />, color: 'bg-[#232323]' },
  { label: 'Launch Blueprint', icon: <FiBookOpen />, color: 'bg-[#232323]' },
  { label: 'Invite Team', icon: <FiUsers />, color: 'bg-[#232323]' },
  { label: 'Add Task', icon: <FiCheckSquare />, color: 'bg-[#232323]' },
];

// Activity feed mock
const activityFeed = [
  { user: 'Sara Ali', action: 'created a new project', time: '2m ago', avatar: 'SA', color: 'bg-[#d0ed01]' },
  { user: 'Jane Cooper', action: 'moved Blueprint to Execution', time: '10m ago', avatar: 'JC', color: 'bg-[#38bdf8]' },
  { user: 'Ronald Richards', action: 'invited a new member', time: '1h ago', avatar: 'RR', color: 'bg-[#f472b6]' },
  { user: 'Guy Hawkins', action: 'completed a task', time: '2h ago', avatar: 'GH', color: 'bg-[#a3c701]' },
];

// Performance insights mock
const insights = [
  { label: 'Weekly Org Growth', value: '+12%', chart: [2, 3, 4, 6, 8, 12], icon: <FiTrendingUp className="text-lg text-[#d0ed01]" /> },
  { label: 'Task Completion %', value: '78%', chart: [60, 65, 70, 75, 78], icon: <FiCheckSquare className="text-lg text-[#d0ed01]" /> },
  { label: 'Engagement Pulse', value: '1.2k', chart: [800, 900, 1000, 1100, 1200], icon: <FiActivity className="text-lg text-[#d0ed01]" /> },
  { label: 'Participation per Org', value: '6.3', chart: [4, 5, 6, 7, 6.3], icon: <FiUsers className="text-lg text-[#d0ed01]" /> },
];

// Community highlights mock
const community = [
  { name: 'Tech Innovators', type: 'Org', avatar: 'TI', color: 'bg-[#d0ed01]' },
  { name: 'Jane Cooper', type: 'Contributor', avatar: 'JC', color: 'bg-[#38bdf8]' },
];

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-black pt-4 px-8 pb-8">
      {/* Hero Headline */}
      <h1 className="text-5xl md:text-6xl font-light text-white mb-10 tracking-tight">
        MAKE <span className="italic text-[#d0ed01]">MARKETING</span> GREAT AGAIN. MAKI
      </h1>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          {/* AI Impact Card */}
          <div className="bg-[#d0ed01] rounded-2xl p-5 shadow-lg flex flex-col gap-3">
            <div className="font-bold text-lg text-black">AI Impact: What Happens to Advertising Now?</div>
            <div className="text-black text-sm">Last week news reports emerged quoting Sam Altman that AI would</div>
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&q=80" alt="AI Impact" className="rounded-xl w-full h-28 object-cover" />
          </div>
          {/* Download App Card */}
          <div className="bg-[#d0ed01] rounded-2xl p-5 shadow-lg flex flex-col gap-3 relative overflow-hidden">
            <div className="font-bold text-lg text-black">Download the App now!</div>
            <div className="text-black text-sm">Set your goals and get your own personnel training program.<br/>Sign in to avail student discounts and many more crazy updates</div>
            <div className="flex items-center mt-2">
              <button className="bg-black text-[#d0ed01] rounded-full p-2 text-2xl flex items-center justify-center mr-2">
                <span className="material-icons">arrow_forward</span>
              </button>
              <div className="w-12 h-12 bg-[#a3c701] rounded-full flex items-center justify-center absolute bottom-3 right-3">
                <span className="text-black font-bold text-2xl">*</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-6">
          {/* Amazon Invest Card */}
          <div className="bg-[#18181b] rounded-2xl p-5 shadow-lg text-white flex flex-col gap-2 border border-[#d0ed01]/20">
            <div className="font-bold text-lg">Amazon to Invest $10 Billion in North Carolina to Expand AI Infrastructure <span className="ml-2">→</span></div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 bg-[#a3c701] rounded-lg flex items-center justify-center">
                <span className="material-icons text-black">apartment</span>
              </div>
              <span className="text-xs text-[#d0ed01]">News</span>
            </div>
          </div>
          {/* AI Model Boundaries Card */}
          <div className="bg-gradient-to-br from-[#232a13] to-[#18181b] rounded-2xl p-5 shadow-lg text-white flex flex-col gap-2 border border-[#d0ed01]/10 relative overflow-hidden">
            <div className="font-bold text-base mb-2">What's particularly fascinating about the new model is how inconsistently it applies its moral boundaries.</div>
            <div className="absolute right-4 top-4">
              <svg width="48" height="48"><circle cx="24" cy="24" r="20" fill="#232323" /><text x="24" y="30" textAnchor="middle" fill="#d0ed01" fontSize="32" fontWeight="bold">?</text></svg>
            </div>
          </div>
          {/* AI Agents Card */}
          <div className="bg-[#18181b] rounded-2xl p-5 shadow-lg flex flex-col items-center justify-center border border-[#d0ed01]/10">
            <div className="text-3xl font-bold text-[#d0ed01] mb-2">AI - AGENTS</div>
            <div className="w-16 h-16 bg-[#232323] rounded-full flex items-center justify-center">
              <span className="material-icons text-[#d0ed01] text-4xl">android</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* DeepSeek Card */}
          <div className="bg-[#18181b] rounded-2xl p-5 shadow-lg flex flex-col gap-3 border border-[#d0ed01]/10">
            <div className="font-bold text-lg text-white">DeepSeek's latest AI model a 'big step backwards' for free speech</div>
            <div className="text-gray-300 text-sm">DeepSeek's latest AI model, R1 0528, has raised eyebrows for a further regression on free speech and what users can discuss. "A big step backwards for free speech," is how one prominent AI researcher summed it up</div>
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&q=80" alt="DeepSeek AI" className="rounded-xl w-full h-28 object-cover" />
          </div>
          {/* Neon Arrow Card */}
          <div className="bg-[#d0ed01] rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div className="text-black font-bold text-lg">&nbsp;</div>
            <span className="text-4xl">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

