"use client";
import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiMoon, FiSun } from "react-icons/fi";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Optionally load user info from localStorage or API
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-[#18181b] rounded-2xl p-10 border border-white/10 shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-8 text-[#d0ed01]">Settings</h2>
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-sm mb-1 font-semibold flex items-center gap-2">
            <FiUser /> Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition"
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1 font-semibold flex items-center gap-2">
            <FiMail /> Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition"
            placeholder="user@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold flex items-center gap-2">
            {darkMode ? <FiMoon /> : <FiSun />} Theme
          </span>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${darkMode ? 'bg-[#232323] text-[#d0ed01]' : 'bg-[#d0ed01] text-black'}`}
            onClick={() => setDarkMode(dm => !dm)}
          >
            {darkMode ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
      <button
        className="w-full mt-10 py-3 rounded-lg bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition shadow-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
