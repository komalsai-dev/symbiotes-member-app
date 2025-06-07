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
import { FaRocket, FaRobot } from "react-icons/fa";
import { FiUsers, FiCheckSquare, FiUserPlus, FiAward, FiActivity, FiPlus, FiBookOpen, FiTrendingUp, FiMessageSquare, FiMic, FiX } from 'react-icons/fi';

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

export default function LaunchpadPage() {
  // AI Chatbot state
  const [showAiChat, setShowAiChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: <span>Hi! I&apos;m Symbiote AI. How can I help you today?</span> }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Simulate AI response
  const getAiResponse = (question: string) => {
    if (question.toLowerCase().includes('blueprint')) {
      return <span>To start a new blueprint, click on the ➕ 'Create Blueprint' button in the top Quick Actions panel. You'll be asked to name your blueprint, set goals, and define execution phases.</span>;
    }
    if (question.toLowerCase().includes('invite')) {
      return <span>Yes! Go to Organization → Members, click ➕ Invite, enter their email, and assign a role.</span>;
    }
    if (question.toLowerCase().includes('billing')) {
      return <span>Go to Settings → Billing tab to view your plan, invoices, and payment method.</span>;
    }
    return <span>I'm here to help! Please provide more details or try asking about blueprints, inviting team, or billing.</span>;
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: <span>{chatInput}</span> };
    setChatMessages((msgs) => [...msgs, userMsg]);
    setChatInput('');
    setIsAiTyping(true);
    setTimeout(() => {
      const userText = typeof userMsg.text === 'string' ? userMsg.text : (userMsg.text.props?.children ?? '');
      const aiMsg = { sender: 'ai', text: getAiResponse(userText) };
      setChatMessages((msgs) => [...msgs, aiMsg]);
      setIsAiTyping(false);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen bg-black p-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#232a13] to-[#18181b] rounded-2xl p-6 shadow-lg flex flex-col justify-between relative border border-[#d0ed01]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold text-lg">Active Projects</span>
            <span className="bg-[#232323] p-2 rounded-full"><FaRocket className="text-[#d0ed01] text-xl" /></span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-[#d0ed01]">12</span>
            <span className="text-green-400 font-bold">↗ +2</span>
          </div>
          <div className="flex gap-1 mb-4">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-block w-3 h-6 rounded-full bg-[#d0ed01] opacity-80" style={{ opacity: 0.5 + i * 0.1 }}></span>
            ))}
          </div>
          <button className="mt-auto bg-transparent border border-[#d0ed01] text-[#d0ed01] px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#d0ed01] hover:text-black transition-colors">View All <span className="ml-1">↗</span></button>
        </div>
        <div className="bg-gradient-to-br from-[#232a13] to-[#18181b] rounded-2xl p-6 shadow-lg flex flex-col justify-between relative border border-[#d0ed01]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold text-lg">Organizations Created</span>
            <span className="bg-[#232323] p-2 rounded-full"><FiUsers className="text-[#d0ed01] text-xl" /></span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-[#d0ed01]">5</span>
            <span className="text-green-400 font-bold">↗ +1</span>
      </div>
          <div className="flex gap-1 mb-4">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-block w-3 h-6 rounded-full bg-[#d0ed01] opacity-80" style={{ opacity: 0.5 + i * 0.1 }}></span>
            ))}
          </div>
          <button className="mt-auto bg-transparent border border-[#d0ed01] text-[#d0ed01] px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#d0ed01] hover:text-black transition-colors">Create <span className="ml-1">↗</span></button>
        </div>
        <div className="bg-gradient-to-br from-[#232a13] to-[#18181b] rounded-2xl p-6 shadow-lg flex flex-col justify-between relative border border-[#d0ed01]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold text-lg">Tasks in Progress</span>
            <span className="bg-[#232323] p-2 rounded-full"><FiCheckSquare className="text-[#d0ed01] text-xl" /></span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-extrabold text-[#d0ed01]">34</span>
          </div>
          <div className="flex gap-1 mb-4">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="inline-block w-3 h-6 rounded-full bg-[#d0ed01] opacity-80" style={{ opacity: 0.5 + i * 0.1 }}></span>
            ))}
          </div>
          <button className="mt-auto bg-transparent border border-[#d0ed01] text-[#d0ed01] px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#d0ed01] hover:text-black transition-colors">View All <span className="ml-1">↗</span></button>
          </div>
        </div>

      {/* Blueprint Progress */}
      <div className="bg-[#18181b] rounded-2xl p-6 mb-8 shadow-lg border border-black/30">
        <div className="flex items-center gap-2 mb-6">
          <FiBookOpen className="text-[#d0ed01] text-2xl" />
          <span className="text-white font-bold text-lg">Blueprint Progress</span>
        </div>
        <div className="flex items-center gap-6 justify-between">
          <div className="flex items-center gap-6">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold text-lg border-2 border-[#d0ed01]">1</span>
              <span className="text-[#d0ed01] font-semibold text-lg">Idea</span>
            </div>
            <span className="w-10 h-1 rounded-full bg-[#d0ed01] opacity-60"></span>
            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold text-lg border-2 border-[#d0ed01]">2</span>
              <span className="text-[#d0ed01] font-semibold text-lg">In Review</span>
            </div>
            <span className="w-10 h-1 rounded-full bg-[#d0ed01] opacity-60"></span>
            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#a3c701] flex items-center justify-center text-black font-bold text-lg border-2 border-[#a3c701]">3</span>
              <span className="text-[#a3c701] font-semibold text-lg">Execution</span>
            </div>
            <span className="w-10 h-1 rounded-full bg-[#d0ed01] opacity-30"></span>
            {/* Step 4 */}
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#232323] flex items-center justify-center text-white font-bold text-lg border-2 border-[#232323]">4</span>
              <span className="text-gray-300 font-semibold text-lg">Completed</span>
            </div>
          </div>
          <button className="bg-[#d0ed01] text-black px-6 py-2 rounded-lg font-bold hover:bg-[#bada55] transition">Start New Blueprint</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="bg-[#232323] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#333] transition"><FiPlus /> Create Organization</button>
        <button className="bg-[#232323] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#333] transition"><FiBookOpen /> Launch Blueprint</button>
        <button className="bg-[#232323] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#333] transition"><FiUserPlus /> Invite Team</button>
        <button className="bg-[#232323] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#333] transition"><FiCheckSquare /> Add Task</button>
      </div>

      {/* Activity Feed & Community Highlights */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Activity Feed (reduced width) */}
        <div className="bg-[#18181b] rounded-2xl p-6 flex-1 max-w-2xl shadow-lg">
          <div className="text-white font-bold text-lg mb-4 flex items-center gap-2"><FiActivity className="text-[#d0ed01]" /> Activity Feed</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">SA</span>
              <div>
                <div className="text-white font-semibold">Sara Ali <span className="text-gray-400 font-normal">created a new project</span></div>
                <div className="text-xs text-gray-400">2m ago</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-black font-bold">JC</span>
              <div>
                <div className="text-white font-semibold">Jane Cooper <span className="text-gray-400 font-normal">moved Blueprint to Execution</span></div>
                <div className="text-xs text-gray-400">10m ago</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-[#f472b6] flex items-center justify-center text-black font-bold">RR</span>
              <div>
                <div className="text-white font-semibold">Ronald Richards <span className="text-gray-400 font-normal">invited a new member</span></div>
                <div className="text-xs text-gray-400">1h ago</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-[#a3c701] flex items-center justify-center text-black font-bold">GH</span>
              <div>
                <div className="text-white font-semibold">Guy Hawkins <span className="text-gray-400 font-normal">completed a task</span></div>
                <div className="text-xs text-gray-400">2h ago</div>
              </div>
            </div>
          </div>
        </div>
        {/* Community Highlights */}
        <div className="bg-[#18181b] rounded-2xl p-6 w-full max-w-xs shadow-lg flex flex-col justify-between">
          <div>
            <div className="text-white font-bold text-lg mb-4 flex items-center gap-2"><FiUsers className="text-[#d0ed01]" /> Community Highlights</div>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">TI</span>
                <div>
                  <div className="text-white font-semibold leading-tight">Tech Innovators</div>
                  <div className="text-gray-400 text-xs">Org</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-[#38bdf8] flex items-center justify-center text-black font-bold">JC</span>
                <div>
                  <div className="text-white font-semibold leading-tight">Jane Cooper</div>
                  <div className="text-gray-400 text-xs">Contributor</div>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-2 py-3 rounded-lg bg-[#d0ed01] text-black font-bold hover:bg-[#bada55] transition">&nbsp;</button>
        </div>
            </div>

      {/* AI Copilot Floating Panel */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-[#18181b] rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-3 border border-[#d0ed01]/30 backdrop-blur-md min-w-[260px]">
          <div className="flex items-center gap-2 mb-2">
            <FiTrendingUp className="text-[#d0ed01] text-xl animate-pulse" />
            <span className="text-white font-bold text-lg">AI Copilot</span>
            <button className="ml-auto text-[#d0ed01] hover:text-white"><FiMic /></button>
          </div>
          <button className="w-full px-4 py-2 rounded-lg bg-[#232323] text-[#d0ed01] font-semibold hover:bg-[#d0ed01] hover:text-black transition-all duration-200 shadow-md mb-1">Summarize current progress</button>
          <button
            className="w-full px-4 py-2 rounded-lg bg-[#232323] text-[#d0ed01] font-semibold hover:bg-[#d0ed01] hover:text-black transition-all duration-200 shadow-md mb-1"
            onClick={() => setShowAiChat(true)}
          >Ask Symbiote AI</button>
          <button className="w-full px-4 py-2 rounded-lg bg-[#232323] text-[#d0ed01] font-semibold hover:bg-[#d0ed01] hover:text-black transition-all duration-200 shadow-md">Detect project risks</button>
        </div>
        {/* AI Chatbot Panel */}
        {showAiChat && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/10"
              onClick={() => setShowAiChat(false)}
            />
            <div className="fixed bottom-28 right-8 z-50">
              <div className="bg-[#18181b] border border-[#d0ed01]/40 rounded-2xl shadow-2xl p-10 w-[520px] flex flex-col gap-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaRobot className="text-2xl text-[#d0ed01] animate-pulse" />
                    <span className="text-white font-bold text-lg">Symbiote AI</span>
                  </div>
                  <button className="text-gray-400 hover:text-white" onClick={() => setShowAiChat(false)}><FiX /></button>
                </div>
                <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto bg-[#232323] rounded-xl p-6 mb-2 scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-[#232323] hover:scrollbar-thumb-[#888] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-hide">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
                      <div className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm shadow ${msg.sender === 'user' ? 'bg-[#d0ed01] text-black' : 'bg-[#232323] text-[#d0ed01] border border-[#d0ed01]/20'}`}>
                        {typeof msg.text === 'string' ? msg.text : msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiTyping && <div className="text-xs text-gray-400">Symbiote AI is typing...</div>}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-[#232323] text-white placeholder-gray-400 outline-none border border-[#d0ed01]/20"
                    placeholder="Type your question..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
                  />
                  <button
                    className="px-3 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition"
                    onClick={handleSendChat}
                    disabled={!chatInput.trim()}
                  >Send</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
