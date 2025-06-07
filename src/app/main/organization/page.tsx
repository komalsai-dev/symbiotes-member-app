"use client";
import React, { useState, useRef } from "react";
import { FiUsers, FiSettings, FiPlus, FiFolder, FiActivity, FiLink2, FiArrowLeft } from "react-icons/fi";
import { useProfileDropdown } from "../layout";

const mockOrganizations = [
  {
    id: 1,
    name: "Symbiotes Inc.",
    type: "Startup",
    logo: "/images/logo1.png",
    description: "AI-powered startup management platform.",
    members: [
      { name: "Sara Ali", role: "Owner", email: "sara@symbiotes.ai" },
      { name: "Jane Cooper", role: "Admin", email: "jane@symbiotes.ai" },
      { name: "Ronald Richards", role: "Collaborator", email: "ronald@symbiotes.ai" },
    ],
    projects: [
      { name: "Launchpad MVP", status: "Active", created: "2024-05-01" },
      { name: "Blueprints", status: "Archived", created: "2024-03-15" },
    ],
    activity: [
      { action: "Created project 'Launchpad MVP'", date: "2024-05-01" },
      { action: "Jane Cooper joined", date: "2024-04-20" },
    ],
    integrations: ["Slack", "Linear"],
  },
];

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("organizations");
  const [showCreate, setShowCreate] = useState(false);
  const [modal, setModal] = useState<{ type: null | "projects" | "manage" | "invite" | "settings", orgId?: number }>({ type: null });
  const dummyProjects = Array.from({ length: 8 }, (_, i) => ({
    name: `Project ${i + 1}`,
    status: i % 2 === 0 ? "Active" : "Archived",
    created: `2024-0${(i % 6) + 1}-0${(i % 9) + 1}`
  }));
  const dummyMembers = [
    { name: "Sara Ali", role: "Owner", email: "sara@symbiotes.ai" },
    { name: "Jane Cooper", role: "Admin", email: "jane@symbiotes.ai" },
    { name: "Ronald Richards", role: "Collaborator", email: "ronald@symbiotes.ai" },
    { name: "Robert Fox", role: "Collaborator", email: "robert@symbiotes.ai" },
  ];
  const modalOrg = mockOrganizations.find(org => org.id === modal.orgId) || mockOrganizations[0];
  const { setShowProfile } = useProfileDropdown();

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => { setShowProfile(true); window.location.href = '/main/dashboard'; }} className="text-gray-400 hover:text-[#d0ed01] text-2xl flex items-center gap-2 focus:outline-none"><FiArrowLeft /><span className="sr-only">Back</span></button>
          <h1 className="text-2xl font-bold text-white">Organization Management</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition" onClick={() => setShowCreate(true)}>
            <FiPlus /> Add Organization
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }} onClick={() => setShowCreate(true)}>
            <FiPlus /> Create New Organization
          </button>
        </div>
      </div>
      <div className="bg-[#18181b] rounded-2xl shadow-lg border border-white/10 p-0">
        <div className="flex border-b border-white/10">
          <button onClick={() => setActiveTab("organizations")} className={`flex-1 py-3 px-4 font-semibold text-sm rounded-tl-2xl ${activeTab === "organizations" ? "bg-[#232a13] text-[#d0ed01]" : "bg-transparent text-white hover:bg-[#232323]"}`}><FiUsers className="inline mr-2" />My Organizations</button>
          <button onClick={() => setActiveTab("members")} className={`flex-1 py-3 px-4 font-semibold text-sm ${activeTab === "members" ? "bg-[#232a13] text-[#d0ed01]" : "bg-transparent text-white hover:bg-[#232323]"}`}><FiSettings className="inline mr-2" />Members & Roles</button>
          <button onClick={() => setActiveTab("projects")} className={`flex-1 py-3 px-4 font-semibold text-sm ${activeTab === "projects" ? "bg-[#232a13] text-[#d0ed01]" : "bg-transparent text-white hover:bg-[#232323]"}`}><FiFolder className="inline mr-2" />Projects</button>
          <button onClick={() => setActiveTab("activity")} className={`flex-1 py-3 px-4 font-semibold text-sm ${activeTab === "activity" ? "bg-[#232a13] text-[#d0ed01]" : "bg-transparent text-white hover:bg-[#232323]"}`}><FiActivity className="inline mr-2" />Audit Logs</button>
          <button onClick={() => setActiveTab("integrations")} className={`flex-1 py-3 px-4 font-semibold text-sm rounded-tr-2xl ${activeTab === "integrations" ? "bg-[#232a13] text-[#d0ed01]" : "bg-transparent text-white hover:bg-[#232323]"}`}><FiLink2 className="inline mr-2" />Integrations</button>
        </div>
        <div className="p-8">
          {activeTab === "organizations" && (
            <div className="space-y-6">
              {mockOrganizations.map(org => (
                <div key={org.id} className="relative flex items-center gap-8 bg-[linear-gradient(120deg,rgba(35,42,19,0.85)_60%,rgba(24,24,27,0.95)_100%)] backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-[#232a13]/40 transition-transform hover:scale-[1.025] hover:shadow-[0_8px_32px_0_rgba(208,237,1,0.12)] group overflow-hidden">
                  {/* Futuristic Glow Accent */}
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#d0ed01]/20 blur-2xl rounded-full z-0 group-hover:opacity-80 opacity-60 transition-opacity" />
                  {/* Logo - no border, subtle shadow */}
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-black/60 shadow-[0_4px_24px_0_rgba(208,237,1,0.18)]">
                    <img src={org.logo} alt={org.name} className="w-12 h-12 object-contain" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 z-10 flex flex-col gap-2 justify-center">
                    <div className="flex items-center gap-4 mb-1">
                      <span className="text-2xl font-extrabold text-white drop-shadow-lg tracking-tight">{org.name}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#232323] text-[#d0ed01] border border-[#d0ed01]/30 ml-2 shadow-sm">{org.type}</span>
                    </div>
                    <div className="text-gray-300 text-base mb-1 max-w-2xl">{org.description}</div>
                    <div className="flex gap-3 mt-1">
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#232323] text-[#d0ed01] text-sm font-semibold shadow-sm"><svg width="8" height="8" className="inline-block mr-1"><circle cx="4" cy="4" r="4" fill="#d0ed01" /></svg>Members: <span className="ml-1">{org.members.length}</span></span>
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#232323] text-[#d0ed01] text-sm font-semibold shadow-sm"><svg width="8" height="8" className="inline-block mr-1"><circle cx="4" cy="4" r="4" fill="#d0ed01" /></svg>Projects: <span className="ml-1">{org.projects.length}</span></span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex flex-col gap-3 z-10 min-w-[160px]">
                    <button onClick={() => setModal({ type: "projects", orgId: org.id })} className="px-5 py-2 rounded-xl bg-[#d0ed01] text-black font-bold shadow-md hover:bg-[#eaff6a] hover:scale-105 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]/60">View Projects</button>
                    <button onClick={() => setModal({ type: "manage", orgId: org.id })} className="px-5 py-2 rounded-xl bg-[#232323]/80 text-white font-bold shadow-md hover:bg-[#d0ed01] hover:text-black hover:scale-105 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]/40">Manage</button>
                    <button onClick={() => setModal({ type: "invite", orgId: org.id })} className="px-5 py-2 rounded-xl bg-[#232323]/80 text-white font-bold shadow-md hover:bg-[#d0ed01] hover:text-black hover:scale-105 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]/40">Invite Members</button>
                    <button onClick={() => setModal({ type: "settings", orgId: org.id })} className="px-5 py-2 rounded-xl bg-[#232323]/80 text-white font-bold shadow-md hover:bg-[#d0ed01] hover:text-black hover:scale-105 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]/40">Settings</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "members" && (
            <div>
              <div className="text-lg font-bold text-white mb-4">Members & Roles</div>
              <div className="space-y-4">
                {mockOrganizations[0].members.map(member => (
                  <div key={member.email} className="flex items-center gap-4 bg-[#232323] rounded-lg p-4">
                    <div className="w-10 h-10 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">{member.name[0]}</div>
                    <div className="flex-1">
                      <div className="text-white font-semibold">{member.name}</div>
                      <div className="text-xs text-gray-400">{member.role}</div>
                    </div>
                    <div className="text-gray-400 text-xs">{member.email}</div>
                    <button className="ml-4 px-3 py-1 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Change Role</button>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Invite New Member</button>
            </div>
          )}
          {activeTab === "projects" && (
            <div>
              <div className="text-lg font-bold text-white mb-4">Projects</div>
              <div className="space-y-4">
                {mockOrganizations[0].projects.map(project => (
                  <div key={project.name} className="flex items-center justify-between bg-[#232323] rounded-lg p-4">
                    <div>
                      <div className="text-white font-semibold">{project.name}</div>
                      <div className="text-xs text-gray-400">Status: <span className="text-[#d0ed01]">{project.status}</span> | Created: {project.created}</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Open</button>
                      <button className="px-3 py-1 rounded bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition">Archive</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "activity" && (
            <div>
              <div className="text-lg font-bold text-white mb-4">Audit Logs / Activity Feed</div>
              <div className="space-y-4">
                {mockOrganizations[0].activity.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-[#232323] rounded-lg p-4">
                    <div className="text-[#d0ed01] font-bold">{log.date}</div>
                    <div className="text-white">{log.action}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "integrations" && (
            <div>
              <div className="text-lg font-bold text-white mb-4">Integrations</div>
              <div className="flex gap-4">
                {mockOrganizations[0].integrations.map((integration, idx) => (
                  <div key={idx} className="bg-[#232323] rounded-lg px-6 py-4 text-white font-semibold flex items-center gap-2">
                    <FiLink2 className="text-[#d0ed01]" /> {integration}
                  </div>
                ))}
              </div>
              <button className="mt-6 px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Connect New Integration</button>
            </div>
          )}
        </div>
      </div>
      {/* Create Organization Modal/Panel (placeholder) */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-lg border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Create New Organization</h2>
              <button onClick={() => setShowCreate(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Organization Name</label>
                <input type="text" className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" placeholder="Organization name" />
              </div>
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Type</label>
                <input type="text" className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" placeholder="Startup, Nonprofit, etc." />
              </div>
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Logo</label>
                <input type="file" className="w-full text-gray-400" />
              </div>
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Description</label>
                <textarea className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" placeholder="Describe your organization" />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 rounded border border-gray-500 text-gray-200 bg-transparent hover:bg-gray-800 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modals for Org Actions */}
      {modal.type === "projects" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-2xl border border-white/10 shadow-2xl relative">
            <button onClick={() => setModal({ type: null })} className="absolute top-4 left-4 text-gray-400 hover:text-[#d0ed01] text-2xl flex items-center gap-2"><FiArrowLeft /> <span className="sr-only">Back</span></button>
            <button onClick={() => setModal({ type: null })} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">Projects in {modalOrg.name}</h2>
            <div className="space-y-4">
              {dummyProjects.map((project, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#232323] rounded-lg p-4">
                  <div>
                    <div className="text-white font-semibold">{project.name}</div>
                    <div className="text-xs text-gray-400">Status: <span className="text-[#d0ed01]">{project.status}</span> | Created: {project.created}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Open</button>
                    <button className="px-3 py-1 rounded bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition">Archive</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {modal.type === "manage" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-lg border border-white/10 shadow-2xl relative">
            <button onClick={() => setModal({ type: null })} className="absolute top-4 left-4 text-gray-400 hover:text-[#d0ed01] text-2xl flex items-center gap-2"><FiArrowLeft /> <span className="sr-only">Back</span></button>
            <button onClick={() => setModal({ type: null })} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">Manage {modalOrg.name}</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src={modalOrg.logo} alt={modalOrg.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#d0ed01]" />
                <div>
                  <div className="text-lg font-bold text-white">{modalOrg.name}</div>
                  <div className="text-gray-400">{modalOrg.description}</div>
                </div>
              </div>
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Organization Type</label>
                <input type="text" className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" value={modalOrg.type} readOnly />
              </div>
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Description</label>
                <textarea className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" value={modalOrg.description} readOnly />
              </div>
              <div className="flex gap-2 mt-2">
                <button className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition">Edit Info</button>
                <button className="px-4 py-2 rounded border border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition">Delete Organization</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {modal.type === "invite" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-lg border border-white/10 shadow-2xl relative">
            <button onClick={() => setModal({ type: null })} className="absolute top-4 left-4 text-gray-400 hover:text-[#d0ed01] text-2xl flex items-center gap-2"><FiArrowLeft /> <span className="sr-only">Back</span></button>
            <button onClick={() => setModal({ type: null })} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">Invite Members to {modalOrg.name}</h2>
            <form className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" placeholder="Enter email address" />
              </div>
              <div>
                <label className="block text-gray-200 font-semibold mb-1">Role</label>
                <select className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01]">
                  <option>Collaborator</option>
                  <option>Admin</option>
                  <option>Owner</option>
                </select>
              </div>
              <button type="submit" className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition">Send Invite</button>
            </form>
            <div>
              <div className="text-lg font-bold text-white mb-2">Current Members</div>
              <div className="space-y-2">
                {dummyMembers.map(member => (
                  <div key={member.email} className="flex items-center gap-3 bg-[#232323] rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">{member.name[0]}</div>
                    <div className="flex-1">
                      <div className="text-white font-semibold">{member.name}</div>
                      <div className="text-xs text-gray-400">{member.role}</div>
                    </div>
                    <div className="text-gray-400 text-xs">{member.email}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {modal.type === "settings" && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-lg border border-white/10 shadow-2xl relative">
            <button onClick={() => setModal({ type: null })} className="absolute top-4 left-4 text-gray-400 hover:text-[#d0ed01] text-2xl flex items-center gap-2"><FiArrowLeft /> <span className="sr-only">Back</span></button>
            <button onClick={() => setModal({ type: null })} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">Organization Settings</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between bg-[#232323] rounded-lg p-4">
                <span className="text-white font-semibold">Notifications</span>
                <button className="px-4 py-1 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Manage</button>
              </div>
              <div className="flex items-center justify-between bg-[#232323] rounded-lg p-4">
                <span className="text-white font-semibold">Integrations</span>
                <button className="px-4 py-1 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Connect</button>
              </div>
              <div className="flex items-center justify-between bg-[#232323] rounded-lg p-4">
                <span className="text-white font-semibold">Permissions</span>
                <button className="px-4 py-1 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Edit</button>
              </div>
              <div className="flex items-center justify-between bg-[#232323] rounded-lg p-4">
                <span className="text-white font-semibold">Switch Organization</span>
                <button className="px-4 py-1 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Switch</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
