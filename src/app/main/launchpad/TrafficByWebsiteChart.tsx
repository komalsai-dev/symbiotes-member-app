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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
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

export default function TrafficByWebsiteChart() {
  return <Bar data={data} options={options} />;
} 