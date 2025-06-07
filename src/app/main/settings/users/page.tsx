"use client";
import React from "react";
import SettingsHeader from "../SettingsHeader";

export default function UsersSettings() {
  return (
    <div className="max-w-6xl mx-auto text-white ml-2">
      <SettingsHeader />
      <div className="bg-[#18181b] rounded-2xl p-10 border border-white/10 shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-6 text-[#d0ed01]">Users' Settings</h3>
        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {/* Users uploading Profile Picture */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Users uploading Profile Picture</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow profile pictures</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* User Sign up */}
          <div>
            <label className="block text-sm mb-1 font-semibold">User Sign up</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow new users to sign up</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Response format */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Response format</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Text only</option>
            </select>
          </div>
          {/* Limit of Responses for free users */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Limit of Responses for free users</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>50 Responses</option>
            </select>
          </div>
          {/* Notification about Newly added AI Agents */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Notification about Newly added AI Agents</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Notify users about new AI Agents</span>
              <input type="checkbox" className="accent-gray-400 w-6 h-6" />
            </div>
          </div>
          {/* Default Theme for Users */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Default Theme for Users</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Light Theme</option>
              <option>Dark Theme</option>
            </select>
          </div>
          {/* Size Limit for Profile Pictures (in Kb) */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Size Limit for Profile Pictures (in Kb)</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Default- 4096 Kb (4Mb)</option>
            </select>
          </div>
          {/* Notifications */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Notifications</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Send notifications to users</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Profile Edit */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Profile Edit</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow users to edit their profile</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
        </div>
        {/* Account Creation Section */}
        <div className="mt-10">
          <h4 className="text-xl font-bold mb-4 text-[#d0ed01]">Account Creation</h4>
          <div className="text-gray-400 mb-4">Select/Edit Required fields for users during Sign Up</div>
          <div className="flex justify-end mb-4">
            <button className="bg-[#d0ed01] text-black font-semibold px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-[#c0de01] transition">
              Add New Field <span className="text-lg">+</span>
            </button>
          </div>
          {/* Example fields (repeat for each field) */}
          {[1, 2].map((num) => (
            <div key={num} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 items-end bg-[#232323] rounded-xl p-6">
              {/* Field Title */}
              <div>
                <label className="block text-sm mb-1 font-semibold">{num}. Field Title</label>
                <input type="text" className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" placeholder={num === 1 ? "Email Address" : "First Name"} />
                <label className="block text-xs mt-2 text-gray-400">Field Description</label>
                <input type="text" className="w-full px-4 py-2 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" placeholder="Add a description" />
              </div>
              {/* Field Input Type */}
              <div>
                <label className="block text-sm mb-1 font-semibold">Field Input Type</label>
                <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
                  <option>Text</option>
                </select>
                <label className="block text-xs mt-2 text-gray-400">Caption</label>
                <input type="text" className="w-full px-4 py-2 rounded-md bg-black bg-opacity-60 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition" placeholder="Not set" />
              </div>
              {/* Input Characters Limit */}
              <div>
                <label className="block text-sm mb-1 font-semibold">Input Characters Limit</label>
                <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
                  <option>Default</option>
                </select>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" className="accent-[#d0ed01] w-5 h-5" defaultChecked />
                  <span className="text-[#d0ed01] font-semibold text-xs">Required Field</span>
                </div>
                <div className="flex gap-4 mt-2 text-xs">
                  <button className="text-[#d0ed01] font-semibold">Hide Field</button>
                  <button className="text-red-500 font-semibold">Delete Field</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 