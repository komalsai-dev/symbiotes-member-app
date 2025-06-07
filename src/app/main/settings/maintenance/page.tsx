"use client";
import React from "react";
import SettingsHeader from "../SettingsHeader";

function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const percent = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-xs text-[#d0ed01] font-semibold cursor-pointer">View Details</span>
      </div>
      <div className="w-full h-4 bg-black bg-opacity-60 rounded-lg overflow-hidden flex items-center border border-white/20">
        <div
          className="h-4 bg-[#d0ed01] rounded-l-lg"
          style={{ width: `${percent}%` }}
        ></div>
        <div className="absolute right-4 text-xs text-white font-semibold ml-2" style={{ left: `${percent}%` }}>{value}{label.includes('GB') ? 'GB' : '%'} Used</div>
      </div>
    </div>
  );
}

export default function MaintenanceSettings() {
  return (
    <div className="max-w-6xl mx-auto text-white ml-2">
      <SettingsHeader />
      <div className="bg-[#18181b] rounded-2xl p-10 border border-white/10 shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-6 text-[#d0ed01]">Maintenance</h3>
        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Check for Updates */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Check for Updates</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Weekly</option>
            </select>
          </div>
          {/* Agents Restart/Shutdown */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Agents Restart/Shutdown</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow admins to restart/shutdown</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* System Update Frequency */}
          <div>
            <label className="block text-sm mb-1 font-semibold">System Update Frequency</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Weekly</option>
            </select>
          </div>
          {/* Perform BackUp of Logs */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Perform BackUp of Logs</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Weekly</option>
            </select>
          </div>
          {/* Backup User Logs */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Backup User Logs</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Enable Backup of logs</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Scheduled System Update Time */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Scheduled System Update Time</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" placeholder="Every Saturday, 1:00 AM CET" />
          </div>
          {/* Scheduled Time to Backup Logs */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Scheduled Time to Backup Logs</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" placeholder="2:00 AM Everyday" />
          </div>
          {/* Show System Logs */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Show System Logs</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow Admins to view logs</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Scheduled Maintenance Frequency */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Scheduled Maintenance Frequency</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Daily</option>
            </select>
          </div>
          {/* Generate & Upload System Report */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Generate & Upload System Report</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Daily</option>
            </select>
          </div>
          {/* System Report Generation Time */}
          <div>
            <label className="block text-sm mb-1 font-semibold">System Report Generation Time</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" placeholder="11:45PM Daily" />
          </div>
          {/* Scheduled Maintenance Time */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Scheduled Maintenance Time</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" placeholder="Every Saturday, 12:00 AM CET" />
          </div>
        </div>
      </div>
    </div>
  );
} 