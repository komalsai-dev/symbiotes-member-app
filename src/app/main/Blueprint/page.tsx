"use client";
import React, { useState } from "react";

const blueprints = [
  {
    id: 1,
    title: "Blueprint Alpha",
    description: "Behavioral test derived from effect autonomies - v1",
    overview: "Behavioral text derived effect autonominal v1",
    metrics: { completion: "87%", count: 150 },
    timeline: { start: "May 28-5-25", end: "June 05-6-25" },
  },
  {
    id: 2,
    title: "Blueprint Beta",
    description: "Behavioral test derived from effect autonomies - v1",
    overview: "Behavioral text derived effect autonominal v1",
    metrics: { completion: "87%", count: 150 },
    timeline: { start: "May 28-5-25", end: "June 05-6-25" },
  },
  {
    id: 3,
    title: "Blueprint Gamma",
    description: "Behavioral test derived from effect autonomies - v1",
    overview: "Behavioral text derived effect autonominal v1",
    metrics: { completion: "87%", count: 150 },
    timeline: { start: "May 28-5-25", end: "June 05-6-25" },
  },
];

export default function BlueprintPage() {
  const [selected, setSelected] = useState(blueprints[0]);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl w-full">
        {/* Tabs */}
        <div className="flex gap-6 mb-6">
          <button className="px-4 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#333]">Idea Gateway</button>
          <button className="px-4 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#333]">Business Model Canvas</button>
          <button className="px-4 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#333]">Blueprint Timeline</button>
          <div className="flex-1"></div>
          <button className="px-4 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#333]">Help</button>
        </div>

        {/* Create Blueprint Button */}
        <button className="mb-8 px-6 py-2 rounded-full bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000]">
          + Create Blueprint
        </button>

        {/* Blueprint Cards */}
        <div className="flex gap-6 mb-8">
          {blueprints.map((bp) => (
            <div
              key={bp.id}
              className="bg-[#232323] rounded-xl p-6 flex flex-col gap-4 w-72"
              onClick={() => setSelected(bp)}
              style={{ cursor: "pointer" }}
            >
              <div className="font-bold text-lg">{bp.title}</div>
              <div className="text-sm text-gray-300">{bp.description}</div>
              <button className="mt-2 px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] text-left">
                → Start Execution
              </button>
              <button className="mt-2 px-4 py-2 rounded bg-[#444] text-white font-semibold hover:bg-[#555] text-left">
                ⎌ Modify
              </button>
              <button className="mt-2 px-4 py-2 rounded bg-[#444] text-white font-semibold hover:bg-[#555] text-left">
                ✗ Remove
              </button>
            </div>
          ))}
        </div>

        {/* Project Details Section */}
        <div className="bg-[#232323] rounded-xl p-6 flex gap-8 items-start border border-white/10 max-w-4xl">
          <div className="flex-1">
            <div className="font-bold text-xl mb-2">{selected.title}</div>
            <div className="text-gray-300 mb-4">{selected.overview}</div>
          </div>
          <div className="flex-1">
            <div className="font-bold mb-2">Key Metrics</div>
            <div className="flex flex-col gap-1">
              <span>Survey completion <span className="text-[#d0ed01]">{selected.metrics.completion}</span></span>
              <span>Participation count <span className="text-[#d0ed01]">{selected.metrics.count}</span></span>
            </div>
          </div>
          <div className="flex-1">
            <div className="font-bold mb-2">Timeline</div>
            <div>
              <div>Start <span className="text-[#d0ed01]">{selected.timeline.start}</span></div>
              <div>End <span className="text-[#d0ed01]">{selected.timeline.end}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
