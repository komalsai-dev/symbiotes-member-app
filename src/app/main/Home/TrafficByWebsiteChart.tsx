"use client";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const websiteTrafficData = {
  labels: ['Google', 'YouTube', 'Instagram', 'Pinterest', 'Facebook', 'Twitter'],
  datasets: [
    {
      label: 'Visits',
      data: [1200, 950, 800, 600, 700, 400],
      backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 600, 0);
        gradient.addColorStop(0, '#d0ed01');
        gradient.addColorStop(1, '#38bdf8');
        return gradient;
      },
      borderRadius: 16,
      borderSkipped: false,
      maxBarThickness: 36,
      hoverBackgroundColor: '#fff',
      barPercentage: 0.6,
      categoryPercentage: 0.6,
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 8,
      shadowColor: 'rgba(208,237,1,0.3)',
    },
  ],
};

const websiteTrafficOptions: ChartOptions<'bar'> = {
  responsive: true,
  indexAxis: 'y',
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
        size: 16,
        weight: 'bold' as const
      },
      bodyFont: {
        size: 14
      }
    },
  },
  scales: {
    x: {
      grid: { color: 'rgba(35, 35, 43, 0.5)' },
      ticks: { color: '#bdbdbd', font: { size: 14, family: "'Inter', sans-serif" }, padding: 10 },
      beginAtZero: true,
    },
    y: {
      grid: { color: 'rgba(35, 35, 43, 0.5)' },
      ticks: { color: '#bdbdbd', font: { size: 16, family: "'Inter', sans-serif", weight: 'bold' as const }, padding: 12 },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  },
  maintainAspectRatio: false,
};

export default function TrafficByWebsiteChart() {
  return (
    <div style={{ width: '100%', height: '320px', position: 'relative' }}>
      <Bar data={websiteTrafficData} options={websiteTrafficOptions} style={{ width: '100%', height: '100%' }} />
    </div>
  );
} 