"use client";
import React, { useState } from "react";
import {
  FiUsers,
  FiPlus,
  FiSearch,
  FiFilter,
  FiX,
  FiStar,
  FiBriefcase,
  FiAward,
  FiCheckCircle,
  FiClock,
  FiUserPlus,
  FiUserCheck,
  FiSettings
} from "react-icons/fi";

interface CrewMember {
  id: number;
  name: string;
  role: string;
  image: string;
  tags: string[];
  assignedBlueprints: {
    name: string;
    status: "pending" | "completed";
  }[];
  taskStatus: {
    pending: number;
    completed: number;
  };
  roleDescription: string;
  responsibilities: string[];
  permissions: string[];
  adminLogs: {
    date: string;
    action: string;
    details: string;
  }[];
}

// Mock data
const crewMembers: CrewMember[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Designer",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["Design", "UI/UX", "Product"],
    assignedBlueprints: [
      { name: "MVP Design System", status: "pending" },
      { name: "User Research", status: "completed" }
    ],
    taskStatus: {
      pending: 3,
      completed: 1
    },
    roleDescription: "Lead product designer responsible for user experience and interface design",
    responsibilities: [
      "Create and maintain design systems",
      "Conduct user research",
      "Design user interfaces",
      "Collaborate with development team"
    ],
    permissions: [
      "Access to design tools",
      "View project analytics",
      "Edit design assets"
    ],
    adminLogs: [
      {
        date: "2024-03-15",
        action: "Role Updated",
        details: "Added new design responsibilities"
      }
    ]
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "AI Content Agent",
    image: "https://i.pravatar.cc/150?img=2",
    tags: ["AI", "Content", "Marketing"],
    assignedBlueprints: [
      { name: "Content Strategy", status: "pending" },
      { name: "SEO Optimization", status: "pending" }
    ],
    taskStatus: {
      pending: 2,
      completed: 0
    },
    roleDescription: "AI-powered content creation and optimization specialist",
    responsibilities: [
      "Generate content using AI",
      "Optimize content for SEO",
      "Maintain content calendar",
      "Analyze content performance"
    ],
    permissions: [
      "Access to AI tools",
      "Edit content",
      "View analytics"
    ],
    adminLogs: [
      {
        date: "2024-03-14",
        action: "Role Created",
        details: "Initial role setup"
      }
    ]
  },
  {
    id: 3,
    name: "Michael Zhang",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/150?img=3",
    tags: ["Operations", "Strategy", "Management"],
    assignedBlueprints: [
      { name: "Process Optimization", status: "pending" },
      { name: "Team Coordination", status: "completed" }
    ],
    taskStatus: {
      pending: 1,
      completed: 1
    },
    roleDescription: "Oversees operational efficiency and team coordination",
    responsibilities: [
      "Optimize workflows",
      "Coordinate team activities",
      "Track project progress",
      "Manage resources"
    ],
    permissions: [
      "Access to project management tools",
      "View team analytics",
      "Edit project timelines"
    ],
    adminLogs: [
      {
        date: "2024-03-13",
        action: "Permissions Updated",
        details: "Added project management access"
      }
    ]
  }
];

export default function CrewPage() {
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);
  const [showRoleDrawer, setShowRoleDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [editMode, setEditMode] = useState<null | "reassign" | "change">(null);
  const [editRole, setEditRole] = useState("");
  const [editAssignee, setEditAssignee] = useState("");

  const handleRoleClick = (member: CrewMember) => {
    setSelectedMember(member);
    setShowRoleDrawer(true);
    setEditMode(null);
    setEditRole(member.role);
    setEditAssignee(member.name);
  };

  const handleCloseDrawer = () => {
    setShowRoleDrawer(false);
    setSelectedMember(null);
    setEditMode(null);
  };

  const handleSave = () => {
    if (!selectedMember) return;
    if (editMode === "change") {
      selectedMember.role = editRole;
    }
    if (editMode === "reassign") {
      selectedMember.name = editAssignee;
    }
    setEditMode(null);
  };

  const handleCancel = () => {
    if (!selectedMember) return;
    setEditRole(selectedMember.role);
    setEditAssignee(selectedMember.name);
    setEditMode(null);
  };

  return (
    <div className="w-full p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <FiUsers className="text-3xl text-[#d0ed01]" />
          <h1 className="text-3xl font-bold text-white">Crew</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#bada55] transition-colors">
            <FiUserPlus />
            Add Crew Member
          </button>
          <button className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#bada55] transition-colors">
            <FiSettings />
            Define New Role
          </button>
          <button className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#bada55] transition-colors">
            <FiMail />
            Invite Collaborator
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search crew members by name, role, or tag..."
            className="w-full bg-[#232323] text-white pl-12 pr-4 py-3 rounded-lg outline-none border border-white/10 focus:border-[#d0ed01] transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-[#232323] text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-[#333] transition-colors">
          <FiFilter />
          Filter
        </button>
      </div>

      {/* Crew Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crewMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#18181b] rounded-xl p-6 border border-white/10 hover:border-[#d0ed01]/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-[#d0ed01]">{member.role}</p>
              </div>
            </div>

            {/* Task Status */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FiClock className="text-gray-400" />
                <span className="text-gray-400">{member.taskStatus.pending} Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-[#d0ed01]" />
                <span className="text-gray-400">{member.taskStatus.completed} Completed</span>
              </div>
            </div>

            {/* Assigned Blueprints */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white mb-2">Assigned Blueprints</h4>
              <div className="space-y-2">
                {member.assignedBlueprints.map((blueprint) => (
                  <div
                    key={blueprint.name}
                    className="flex items-center justify-between bg-[#232323] rounded-lg p-2"
                  >
                    <span className="text-gray-400 text-sm">{blueprint.name}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        blueprint.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {blueprint.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-[#232323] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleRoleClick(member)}
              className="w-full bg-[#232323] text-white py-2 rounded-lg hover:bg-[#333] transition-colors"
            >
              Manage Role
            </button>
          </div>
        ))}
      </div>

      {/* Role Management Drawer */}
      {showRoleDrawer && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="absolute right-0 top-0 h-full w-[600px] bg-[#18181b] shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedMember.name}</h2>
                    <p className="text-[#d0ed01]">{selectedMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseDrawer}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-6">
                {editMode === "reassign" ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      className="flex-1 bg-[#232323] text-white px-3 py-2 rounded-lg border border-[#d0ed01] focus:outline-none"
                      value={editAssignee}
                      onChange={e => setEditAssignee(e.target.value)}
                      placeholder="Assignee name"
                    />
                    <button
                      className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#bada55] transition-colors"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-[#232323] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#333] transition-colors"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="flex-1 bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#bada55] transition-colors"
                    onClick={() => setEditMode("reassign")}
                  >
                    <FiUserCheck />
                    Reassign Role
                  </button>
                )}
                {editMode === "change" ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      className="flex-1 bg-[#232323] text-white px-3 py-2 rounded-lg border border-[#d0ed01] focus:outline-none"
                      value={editRole}
                      onChange={e => setEditRole(e.target.value)}
                      placeholder="Role"
                    />
                    <button
                      className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#bada55] transition-colors"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-[#232323] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#333] transition-colors"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="flex-1 bg-[#232323] text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#333] transition-colors"
                    onClick={() => setEditMode("change")}
                  >
                    <FiSettings />
                    Change Role
                  </button>
                )}
              </div>

              {/* Role Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Role Description</h3>
                <p className="text-gray-400">{selectedMember.roleDescription}</p>
              </div>

              {/* Responsibilities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Responsibilities</h3>
                <ul className="space-y-2">
                  {selectedMember.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-400">
                      <FiCheckCircle className="text-[#d0ed01] mt-1" />
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Permissions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Permissions</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-[#232323] text-gray-400"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              {/* Admin Logs */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Admin Logs</h3>
                <div className="space-y-2">
                  {selectedMember.adminLogs.map((log, index) => (
                    <div
                      key={index}
                      className="bg-[#232323] rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{log.action}</span>
                        <span className="text-sm text-gray-400">{log.date}</span>
                      </div>
                      <p className="text-sm text-gray-400">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 