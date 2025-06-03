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

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      {/* Dashboard Content */}
      <section className="flex-1 flex flex-col gap-6 p-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-[#d0ed01] text-black rounded-xl p-6 font-bold text-2xl flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-sm font-medium text-black/70">New Users</span>
            156
            <span className="text-xs font-normal text-green-700">+150.03%</span>
          </div>
          <div className="bg-[#d0ed01] text-black rounded-xl p-6 font-bold text-2xl flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-sm font-medium text-black/70">Active Users</span>
            2,318
            <span className="text-xs font-normal text-green-700">+6.08%</span>
          </div>
          <div className="bg-[#d0ed01] text-black rounded-xl p-6 font-bold text-2xl flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-sm font-medium text-black/70">Total Views</span>
            7,265
            <span className="text-xs font-normal text-green-700">+11.01%</span>
          </div>
          <div className="bg-[#d0ed01] text-black rounded-xl p-6 font-bold text-2xl flex flex-col gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="text-sm font-medium text-black/70">Customer Sentiments</span>
            4.8/5
            <span className="text-xs font-normal text-green-700">+2.5%</span>
          </div>
        </div>
        {/* Charts and Tables */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#18181b] rounded-xl p-6 col-span-2 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300" style={{ minHeight: 400 }}>
            <div className="font-semibold mb-4 text-lg text-[#d0ed01]">Total Users</div>
            <div className="flex-1" style={{ height: 320 }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300" style={{ minHeight: 400 }}>
            <div className="font-semibold mb-4 text-lg text-[#d0ed01]">Traffic by Website</div>
            <div className="flex-1" style={{ height: 320 }}>
              <TrafficByWebsiteChart />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#18181b] rounded-xl p-6 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300" style={{ minHeight: 400 }}>
            <div className="font-semibold mb-4 text-lg text-[#d0ed01]">Traffic by Device</div>
            <div className="flex-1" style={{ height: 320 }}>
              <Bar data={deviceTrafficData} options={deviceTrafficOptions} />
            </div>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300" style={{ minHeight: 400 }}>
            <div className="font-semibold mb-4 text-lg text-[#d0ed01]">Traffic by Location</div>
            <div className="flex-1" style={{ height: 320 }}>
              <Doughnut data={locationTrafficData} options={locationTrafficOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* Notification Panel */}
      {showNotifications && (
        <aside className="w-96 bg-[#18181b] rounded-xl p-6 flex flex-col gap-6 border border-white/10 shadow-2xl animate-fade-in z-20">
          <div className="font-bold text-lg mb-2 text-[#d0ed01]">Notifications</div>
          <div className="flex flex-col gap-4">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
                <span className="w-2 h-2 rounded-full" style={{ background: n.color }}></span>
                <span className="text-white flex-1">{n.text}</span>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
            ))}
          </div>
          <div className="font-bold text-lg mb-2 text-[#d0ed01]">Activities</div>
          <div className="flex flex-col gap-4">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
                <span className="w-2 h-2 rounded-full" style={{ background: a.color }}></span>
                <span className="text-white flex-1">{a.text}</span>
                <span className="text-xs text-gray-400">{a.time}</span>
              </div>
            ))}
          </div>
          <div className="font-bold text-lg mb-2 text-[#d0ed01]">Contacts</div>
          <div className="flex flex-col gap-2">
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors duration-200">
                <span className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg">
                  {c.name[0]}
                </span>
                <span className="text-white flex-1">{c.name}</span>
              </div>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}

