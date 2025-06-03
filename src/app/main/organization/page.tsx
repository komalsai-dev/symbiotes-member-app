"use client";
import React, { useState } from "react";

export default function OrganizationPage() {
  const [showForm, setShowForm] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [orgType, setOrgType] = useState("personal");

  // Placeholder for organizations list (empty for now)
  const organizations: any[] = [];

  // Form submit handler (no real backend, just prevent default)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle org creation
    setShowForm(false);
  };

  return (
    <div className="w-full px-8">
      {!showForm ? (
        <div className="w-full mt-8">
          <div className="flex items-center justify-between mb-6 w-full">
            <h1 className="text-2xl font-semibold text-white">Organizations</h1>
            <button
              className="px-4 py-2 rounded border border-gray-500 text-gray-200 bg-transparent hover:bg-gray-800 transition"
              onClick={() => setShowForm(true)}
            >
              New organization
            </button>
          </div>
          <div className="bg-[#18191b] rounded-lg border border-gray-700 p-6 w-full">
            {organizations.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No Organizations.</div>
            ) : (
              // List organizations here
              <div>orgs...</div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto mt-8 bg-[#18191b] rounded-lg border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Set up your organization</h2>
          <p className="text-gray-400 mb-6">Tell us about your organization</p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-200 font-semibold mb-1">Organization name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]"
                placeholder="Organization name"
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                required
              />
              <div className="text-xs text-gray-400 mt-1">This will be the name of your organization.</div>
            </div>
            <div>
              <label className="block text-gray-200 font-semibold mb-1">Contact email <span className="text-red-500">*</span></label>
              <input
                type="email"
                className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]"
                placeholder="Contact email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-200 font-semibold mb-1 mb-2">This organization belongs to:</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orgType"
                    value="personal"
                    checked={orgType === "personal"}
                    onChange={() => setOrgType("personal")}
                    className="accent-[#d0ed01]"
                  />
                  <span className="text-gray-200">My personal account</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="orgType"
                    value="business"
                    checked={orgType === "business"}
                    onChange={() => setOrgType("business")}
                    className="accent-[#d0ed01]"
                  />
                  <span className="text-gray-200">A business or institution</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-200 font-semibold mb-1">Verify your account</label>
              <div className="bg-black bg-opacity-40 border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
                <div className="text-gray-400 mb-2 text-center">Please solve this puzzle so we know you are a real person</div>
                <button type="button" className="px-4 py-2 rounded border border-gray-500 text-gray-200 bg-transparent hover:bg-gray-800 transition mb-2">Verify</button>
                <div className="text-xs text-gray-500">Audio</div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded border border-gray-500 text-gray-200 bg-transparent hover:bg-gray-800 transition"
                onClick={() => setShowForm(false)}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition"
              >
                Create Organization
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
