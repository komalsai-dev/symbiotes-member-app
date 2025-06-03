"use client";

import React, { useState, lazy, Suspense } from 'react';
import { FaGithub, FaDiscord, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { MdStackedLineChart } from 'react-icons/md';

// Lazy load the chart component with a loading fallback
const ProductTrafficChart = lazy(() => import('./ProductTrafficChart'));

// Preload icons
const icons = {
  Stack: MdStackedLineChart,
  Github: FaGithub,
  Discord: FaDiscord,
  LinkedIn: FaLinkedin,
  Facebook: FaFacebook,
  Twitter: FaTwitter,
};

const integrations = [
  {
    name: 'Stack',
    icon: icons.Stack,
    status: 'Active',
    connected: true,
    color: 'text-[#d6ff00]',
    bg: 'bg-[#232323]',
  },
  {
    name: 'Github',
    icon: icons.Github,
    status: 'Active',
    connected: true,
    color: 'text-[#d6ff00]',
    bg: 'bg-[#232323]',
  },
  {
    name: 'Discord',
    icon: icons.Discord,
    status: 'Active',
    connected: true,
    color: 'text-[#d6ff00]',
    bg: 'bg-[#232323]',
  },
  {
    name: 'LinkedIn',
    icon: icons.LinkedIn,
    status: 'Active',
    connected: true,
    color: 'text-[#d6ff00]',
    bg: 'bg-[#232323]',
  },
  {
    name: 'Facebook',
    icon: icons.Facebook,
    status: 'Inactive',
    connected: false,
    color: 'text-[#d6ff00]',
    bg: 'bg-[#232323]',
  },
  {
    name: 'Twitter',
    icon: icons.Twitter,
    status: 'Inactive',
    connected: false,
    color: 'text-[#d6ff00]',
    bg: 'bg-[#232323]',
  },
];

// Loading skeleton for integration cards
const IntegrationCardSkeleton = () => (
  <div className="rounded-2xl bg-[#232323] w-full p-8 flex flex-col gap-4 relative shadow-lg min-h-[160px] animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      <div className="h-6 bg-gray-700 rounded w-24"></div>
      <div className="ml-auto w-12 h-6 bg-gray-700 rounded-full"></div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
      <div className="h-4 bg-gray-700 rounded w-20"></div>
    </div>
    <div className="flex items-center mt-2">
      <div className="h-4 bg-gray-700 rounded w-16"></div>
    </div>
  </div>
);

const IntegrationsPage = () => {
  const [toggles, setToggles] = useState([
    true, true, true, true, false, false
  ]);

  const handleToggle = (idx: number) => {
    setToggles(toggles => toggles.map((t, i) => (i === idx ? !t : t)));
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto px-0">
      <h2 className="text-white text-2xl font-semibold mb-10 mt-6">Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
        {integrations.map((integration, idx) => (
          <div
            key={integration.name}
            className={`rounded-2xl ${integration.bg} w-full p-8 flex flex-col gap-4 relative shadow-lg min-h-[160px] transition-all duration-200 hover:shadow-xl`}
          >
            <div className="flex items-center gap-3">
              <integration.icon size={32} className="text-[#d6ff00]" />
              <span className="text-white text-xl font-semibold">{integration.name}</span>
              <button
                className={`ml-auto relative w-12 h-7 flex items-center ${toggles[idx] ? 'bg-[#d6ff00]' : 'bg-[#444444]'} rounded-full transition-all duration-200 hover:scale-105`}
                onClick={() => handleToggle(idx)}
                aria-label="Toggle integration"
              >
                <span
                  className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${toggles[idx] ? 'translate-x-5' : ''}`}
                ></span>
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`h-2 w-2 rounded-full ${toggles[idx] ? 'bg-[#d6ff00]' : 'bg-gray-500'}`}></span>
              <span className="text-gray-400 text-sm">{toggles[idx] ? 'connected' : 'not connected'}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className={`text-base font-semibold ${integration.color}`}>{toggles[idx] ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
        ))}
      </div>
      <Suspense fallback={<div className="h-32 bg-[#232323] rounded-2xl animate-pulse mt-10" />}>
        <ProductTrafficChart />
      </Suspense>
    </div>
  );
};

export default IntegrationsPage;
