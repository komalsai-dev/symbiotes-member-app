"use client";
import React from "react";
import SettingsHeader from "../SettingsHeader";

export default function SecuritySettings() {
  return (
    <div className="max-w-6xl mx-auto text-white ml-2">
      <SettingsHeader />
      <div className="bg-[#18181b] rounded-2xl p-10 border border-white/10 shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-6 text-[#d0ed01]">Security</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Two Factor Authentication (2FA) */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Two Factor Authentication (2FA)</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Require Two Factor Authentication</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Login Attempts before Account Lockout */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Login Attempts before Account Lockout</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" defaultValue="5" />
          </div>
          {/* Password Policy */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Password Policy</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Uppercase Letter  Lowercase Letter  3 more items</option>
            </select>
          </div>
          {/* Encryption of Stored Data */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Encryption of Stored Data</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Encrypt Stored Data</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Data Encryption Method */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Data Encryption Method</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" defaultValue="AES- Advanced Encryption Standard" />
          </div>
          {/* Store Data for how long */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Store Data for how long</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>3 Months</option>
            </select>
          </div>
          {/* FireWall Protection */}
          <div>
            <label className="block text-sm mb-1 font-semibold">FireWall Protection</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Enable Firewall</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Incoming Traffic */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Incoming Traffic</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow Incoming Traffic</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Outgoing Traffic */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Outgoing Traffic</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow Outgoing Traffic</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Firewall Port Range */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Firewall Port Range</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" defaultValue="80- 102" />
          </div>
          {/* Firewall Protocols */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Firewall Protocols</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>3 Selected (TCP, UDP, ICMP)</option>
            </select>
          </div>
          {/* Blocked IP Addresses */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Blocked IP Addresses</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>104 Blocked</option>
            </select>
          </div>
          {/* Perform System BackUp */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Perform System BackUp</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Weekly</option>
            </select>
          </div>
          {/* Scheduled Time for System Backup */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Scheduled Time for System Backup</label>
            <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" defaultValue="2:00 AM Everyday" />
          </div>
          {/* Number of Backups to keep */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Number of Backups to keep</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Last 3</option>
            </select>
          </div>
          {/* Check for System Anomaly */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Check for System Anomaly</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Hourly</option>
            </select>
          </div>
          {/* Generate Anomaly Report */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Generate Anomaly Report</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Weekly</option>
            </select>
          </div>
          {/* Action for Suspicious User Activity */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Action for Suspicious User Activity</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Temporarily Block and Alert Admin</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 