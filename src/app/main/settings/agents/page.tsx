"use client";
import React from "react";
import SettingsHeader from "../SettingsHeader";

const agentTabs = [
  "All Agents",
  "Better's Chatbot",
  "Better.Stocks",
  "Better.Health",
  "Better's Foodbot",
  "Better's CRM",
  "Better.Marketing",
  "Better.Automation",
  "Better.Security",
];

export default function AgentsSettings() {
  return (
    <div className="max-w-6xl mx-auto text-white ml-2">
      <SettingsHeader />
      <div className="bg-[#18181b] rounded-2xl p-10 border border-white/10 shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-6 text-[#d0ed01]">Agents Settings</h3>
        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Active AI Agents */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Active AI Agents</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>All AI Agents</option>
            </select>
          </div>
          {/* Default Agents' Language */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Default Agents' Language</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>English</option>
            </select>
          </div>
          {/* Agents' Response Style */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Agents' Response Style</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Gradual</option>
            </select>
          </div>
          {/* Agents' Avatar */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Agents' Avatar</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Show Agents' Avatar</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Addition of New Agents */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Addition of New Agents</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow New Agents to be added</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Deactivated AI Agents */}
          <div>
            <label className="block text-sm mb-1 font-semibold flex justify-between items-center">
              Deactivated AI Agents
              <span className="text-xs text-gray-400 font-normal">None Deactivated</span>
            </label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Show Deactivated Agents</span>
              <input type="checkbox" className="accent-gray-400 w-6 h-6" />
            </div>
          </div>
          {/* Notification when New Agent is added */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Notification when New Agent is added</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Notify about New Agent</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Notifications */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Notifications</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow system notifications</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Feedback from Users */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Feedback from Users</label>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-300">Allow users to give feedback</span>
              <input type="checkbox" className="accent-[#d0ed01] w-6 h-6" defaultChecked />
            </div>
          </div>
          {/* Default Theme for AI Agents */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Default Theme for AI Agents</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Light Theme</option>
              <option>Dark Theme</option>
            </select>
          </div>
          {/* Agents Routine Maintenance */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Agents Routine Maintenance</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          {/* Knowledge Base Update */}
          <div>
            <label className="block text-sm mb-1 font-semibold">Knowledge Base Update</label>
            <select className="w-full px-4 py-3 rounded-md bg-black bg-opacity-60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] focus:border-[#d0ed01] transition">
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 