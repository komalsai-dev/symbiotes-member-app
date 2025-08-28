"use client";
import React from "react";
import SettingsHeader from "../SettingsHeader";

export default function GeneralSettings() {
  return (
    <div className="max-w-6xl mx-auto text-white ml-2 p-4 lg:p-0">
      <SettingsHeader />
      <div className="bg-[#18181b] rounded-2xl p-4 lg:p-6 xl:p-10 border border-white/10 shadow-lg text-white">
        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-4 lg:mb-6 text-[#d0ed01]">General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* System Language */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">System Language</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>English</option>
            </select>
          </div>
          {/* User Sign up */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">User Sign up</label>
            <div className="flex items-center gap-2 lg:gap-3 mt-2">
              <span className="text-gray-300 text-xs lg:text-sm">Allow new users to sign up</span>
              <input type="checkbox" className="accent-[#d0ed01] w-5 h-5 lg:w-6 lg:h-6" defaultChecked />
            </div>
          </div>
          {/* Default Agents' Language */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Default Agents' Language</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>English</option>
            </select>
          </div>
          {/* Admin Dashboard Theme */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Admin Dashboard Theme</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Light Theme</option>
              <option>Dark Theme</option>
            </select>
          </div>
          {/* Default Theme for Users */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Default Theme for Users</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Light Theme</option>
              <option>Dark Theme</option>
            </select>
          </div>
          {/* Default Theme for AI Agents */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Default Theme for AI Agents</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Light Theme</option>
              <option>Dark Theme</option>
            </select>
          </div>
          {/* Time Zone */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Time Zone</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>CET - Central European Time</option>
              <option>IST - India Standard Time</option>
            </select>
          </div>
          {/* Date and Time Format */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Date and Time Format</label>
            <input type="text" placeholder="DD/MM/YYYY" className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" />
          </div>
          {/* System Update Frequency */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">System Update Frequency</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </div>
          {/* Currency */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Currency</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>USD ($)</option>
              <option>EUR (€)</option>
            </select>
          </div>
          {/* Notifications */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Notifications</label>
            <div className="flex items-center gap-2 lg:gap-3 mt-2">
              <span className="text-gray-300 text-xs lg:text-sm">Allow system notifications</span>
              <input type="checkbox" className="accent-[#d0ed01] w-5 h-5 lg:w-6 lg:h-6" defaultChecked />
            </div>
          </div>
          {/* Security Checks Frequency */}
          <div>
            <label className="block text-xs lg:text-sm mb-1 font-semibold">Security Checks Frequency</label>
            <select className="w-full px-3 lg:px-4 py-2 lg:py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 