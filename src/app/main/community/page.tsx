"use client";
import React, { useState } from "react";
import {
  FiGlobe,
  FiPlus,
  FiSearch,
  FiFilter,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiMapPin,
  FiUsers,
  FiMessageSquare,
  FiLink,
  FiStar,
  FiBriefcase,
  FiAward,
  FiUserPlus,
  FiVideo,
  FiUserCheck
} from "react-icons/fi";

interface Profile {
  id: number;
  name: string;
  role: string;
  image: string;
  tags: string[];
  location: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    discord?: string;
    facebook?: string;
  };
  skills: string[];
  projects: {
    name: string;
    role: string;
  }[];
  organizations: {
    name: string;
    role: string;
  }[];
}

interface Organization {
  id: number;
  name: string;
  logo: string;
  description: string;
  memberCount: number;
  tags: string[];
}

// Mock data
const profiles: Profile[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Growth Marketer",
    image: "https://i.pravatar.cc/150?img=1",
    tags: ["Startup Founder", "Web3", "AI"],
    location: "San Francisco, CA",
    bio: "Passionate about building the future of decentralized applications.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["Growth Hacking", "Web3", "Product Strategy"],
    projects: [
      { name: "Project Alpha", role: "Lead" },
      { name: "Project Beta", role: "Contributor" }
    ],
    organizations: [
      { name: "Tech Innovators", role: "Member" },
      { name: "Web3 Alliance", role: "Advisor" }
    ]
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "Product Designer",
    image: "https://i.pravatar.cc/150?img=2",
    tags: ["Product", "Design", "UX"],
    location: "New York, NY",
    bio: "Creating beautiful and functional user experiences.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["UI/UX Design", "Product Strategy", "User Research"],
    projects: [
      { name: "Design System", role: "Lead" }
    ],
    organizations: [
      { name: "Design Guild", role: "Member" }
    ]
  },
  {
    id: 3,
    name: "Michael Zhang",
    role: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=3",
    tags: ["Developer", "Blockchain", "React"],
    location: "Seattle, WA",
    bio: "Building scalable web applications and blockchain solutions.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["React", "Node.js", "Solidity", "AWS"],
    projects: [
      { name: "DeFi Platform", role: "Lead Developer" },
      { name: "NFT Marketplace", role: "Contributor" }
    ],
    organizations: [
      { name: "Web3 Alliance", role: "Developer" },
      { name: "Open Source Collective", role: "Member" }
    ]
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?img=4",
    tags: ["Product", "Agile", "Strategy"],
    location: "London, UK",
    bio: "Driving product innovation and user-centric solutions.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["Product Strategy", "Agile", "User Research", "Data Analytics"],
    projects: [
      { name: "Enterprise SaaS", role: "Product Lead" }
    ],
    organizations: [
      { name: "Tech Innovators", role: "Advisor" }
    ]
  },
  {
    id: 5,
    name: "David Kim",
    role: "AI Researcher",
    image: "https://i.pravatar.cc/150?img=5",
    tags: ["AI", "ML", "Research"],
    location: "Boston, MA",
    bio: "Advancing AI technology through research and practical applications.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow"],
    projects: [
      { name: "AI Research Lab", role: "Lead Researcher" },
      { name: "ML Framework", role: "Contributor" }
    ],
    organizations: [
      { name: "AI Collective", role: "Founder" },
      { name: "Tech Innovators", role: "Researcher" }
    ]
  },
  {
    id: 6,
    name: "Sophia Lee",
    role: "UX Researcher",
    image: "https://i.pravatar.cc/150?img=6",
    tags: ["UX", "Research", "User Testing"],
    location: "Austin, TX",
    bio: "Uncovering user insights to drive product decisions.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["User Research", "Usability Testing", "Data Analysis"],
    projects: [
      { name: "User Research Platform", role: "Lead" }
    ],
    organizations: [
      { name: "Design Guild", role: "Researcher" }
    ]
  },
  {
    id: 7,
    name: "James Wilson",
    role: "DevOps Engineer",
    image: "https://i.pravatar.cc/150?img=7",
    tags: ["DevOps", "Cloud", "Automation"],
    location: "Denver, CO",
    bio: "Streamlining development workflows and infrastructure.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    projects: [
      { name: "Cloud Migration", role: "Lead" }
    ],
    organizations: [
      { name: "Tech Innovators", role: "Engineer" }
    ]
  },
  {
    id: 8,
    name: "Olivia Brown",
    role: "Marketing Specialist",
    image: "https://i.pravatar.cc/150?img=8",
    tags: ["Marketing", "Growth", "Content"],
    location: "Chicago, IL",
    bio: "Crafting compelling narratives to drive growth.",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["Content Strategy", "SEO", "Social Media"],
    projects: [
      { name: "Brand Campaign", role: "Lead" }
    ],
    organizations: [
      { name: "Product Leaders", role: "Marketer" }
    ]
  },
  {
    id: 9,
    name: "Daniel Martinez",
    role: "Data Scientist",
    image: "https://i.pravatar.cc/150?img=9",
    tags: ["Data", "ML", "Analytics"],
    location: "Miami, FL",
    bio: "Transforming data into actionable insights.",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      discord: "https://discord.com",
      facebook: "https://facebook.com"
    },
    skills: ["Python", "R", "SQL", "Data Visualization"],
    projects: [
      { name: "Predictive Analytics", role: "Lead" }
    ],
    organizations: [
      { name: "AI Collective", role: "Data Scientist" }
    ]
  }
];

const organizations: Organization[] = [
  {
    id: 1,
    name: "Tech Innovators",
    logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    description: "Building the future of technology",
    memberCount: 150,
    tags: ["Fintech", "SaaS", "AI"]
  },
  {
    id: 2,
    name: "Web3 Alliance",
    logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    description: "Advancing decentralized technologies",
    memberCount: 200,
    tags: ["Web3", "Blockchain", "DeFi"]
  },
  {
    id: 3,
    name: "AI Collective",
    logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    description: "Pioneering artificial intelligence research and applications",
    memberCount: 120,
    tags: ["AI", "ML", "Research"]
  },
  {
    id: 4,
    name: "Design Guild",
    logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    description: "Community of designers shaping the future of digital experiences",
    memberCount: 180,
    tags: ["Design", "UX", "Product"]
  },
  {
    id: 5,
    name: "Product Leaders",
    logo: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    description: "Network of product leaders driving innovation",
    memberCount: 90,
    tags: ["Product", "Strategy", "Innovation"]
  }
];

// Mock data for core community members
const coreMembers = [
  {
    id: 1,
    name: "Ava Patel",
    org: "Tech Innovators",
    since: "Feb 2024",
    status: { label: "🚀 Launching", color: "bg-[#d0ed01]/20 text-[#d0ed01]" },
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 2,
    name: "Liam Chen",
    org: "AI Collective",
    since: "Jan 2023",
    status: { label: "📊 Scaling", color: "bg-[#38bdf8]/20 text-[#38bdf8]" },
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    id: 3,
    name: "Sophia Kim",
    org: "Web3 Alliance",
    since: "May 2023",
    status: { label: "🧪 In Testing", color: "bg-[#f472b6]/20 text-[#f472b6]" },
    socials: { linkedin: "#", github: "#" },
  },
  {
    id: 4,
    name: "Ethan Johnson",
    org: "Product Leaders",
    since: "Mar 2023",
    status: { label: "🚀 Launching", color: "bg-[#d0ed01]/20 text-[#d0ed01]" },
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 5,
    name: "Olivia Martinez",
    org: "Design Guild",
    since: "Apr 2023",
    status: { label: "📊 Scaling", color: "bg-[#38bdf8]/20 text-[#38bdf8]" },
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    id: 6,
    name: "Noah Wilson",
    org: "Tech Innovators",
    since: "Jun 2023",
    status: { label: "🧪 In Testing", color: "bg-[#f472b6]/20 text-[#f472b6]" },
    socials: { linkedin: "#", github: "#" },
  },
  {
    id: 7,
    name: "Emma Davis",
    org: "AI Collective",
    since: "Jul 2023",
    status: { label: "🚀 Launching", color: "bg-[#d0ed01]/20 text-[#d0ed01]" },
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 8,
    name: "James Brown",
    org: "Web3 Alliance",
    since: "Aug 2023",
    status: { label: "📊 Scaling", color: "bg-[#38bdf8]/20 text-[#38bdf8]" },
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    id: 9,
    name: "Isabella Taylor",
    org: "Product Leaders",
    since: "Sep 2023",
    status: { label: "🧪 In Testing", color: "bg-[#f472b6]/20 text-[#f472b6]" },
    socials: { linkedin: "#", github: "#" },
  },
  {
    id: 10,
    name: "William Anderson",
    org: "Design Guild",
    since: "Oct 2023",
    status: { label: "🚀 Launching", color: "bg-[#d0ed01]/20 text-[#d0ed01]" },
    socials: { linkedin: "#", twitter: "#", github: "#" },
  },
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"newbuilders" | "corecommunity" | "organizations">("newbuilders");
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);
  const [showCommunityCall, setShowCommunityCall] = useState(false);
  const [showFindCollaborator, setShowFindCollaborator] = useState(false);

  const handleProfileClick = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowProfileDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowProfileDrawer(false);
    setSelectedProfile(null);
  };

  return (
    <div className="w-full p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
        <div className="flex items-center gap-3">
          <FiGlobe className="text-2xl lg:text-3xl text-[#d0ed01]" />
          <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">Community</h1>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 w-full lg:w-auto">
          <button className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#bada55] transition-colors text-sm lg:text-base">
            <FiPlus className="text-base lg:text-lg" />
            Create Organization
          </button>
          <button className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#bada55] transition-colors text-sm lg:text-base">
            <FiStar className="text-base lg:text-lg" />
            Start New Project
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search people by name, role, or tag..."
            className="w-full bg-[#232323] text-white pl-12 pr-4 py-3 rounded-lg outline-none border border-white/10 focus:border-[#d0ed01] transition-colors text-sm lg:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-[#232323] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#333] transition-colors text-sm lg:text-base">
          <FiFilter className="text-base lg:text-lg" />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 lg:gap-4 mb-6 lg:mb-8">
        <button
          className={`px-4 lg:px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 text-sm lg:text-base ${
            activeTab === "newbuilders"
              ? "bg-[#d0ed01] text-black"
              : "bg-[#232323] text-white hover:bg-[#333]"
          }`}
          onClick={() => setActiveTab("newbuilders")}
        >
          <FiUsers className="text-base lg:text-lg" />
          New Builders
        </button>
        <button
          className={`px-4 lg:px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 text-sm lg:text-base ${
            activeTab === "corecommunity"
              ? "bg-[#d0ed01] text-black"
              : "bg-[#232323] text-white hover:bg-[#333]"
          }`}
          onClick={() => setActiveTab("corecommunity")}
        >
          <FiAward className="text-base lg:text-lg" />
          Core Community
        </button>
        <button
          className={`px-4 lg:px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 text-sm lg:text-base ${
            activeTab === "organizations"
              ? "bg-[#d0ed01] text-black"
              : "bg-[#232323] text-white hover:bg-[#333]"
          }`}
          onClick={() => setActiveTab("organizations")}
        >
          <FiBriefcase className="text-base lg:text-lg" />
          Organizations
        </button>
      </div>

      {/* Content */}
      {activeTab === "newbuilders" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-gradient-to-br from-[#18181b] to-[#232323] rounded-xl p-4 lg:p-6 border border-[#d0ed01]/20 hover:border-[#d0ed01]/40 transition-all duration-300 shadow-lg hover:shadow-[#d0ed01]/10 min-h-[200px] lg:min-h-0"
            >
              <div className="flex items-start gap-3 lg:gap-4 mb-4">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-[#d0ed01]/30 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-semibold text-white leading-tight mb-1">{profile.name}</h3>
                  <p className="text-[#d0ed01] text-sm lg:text-base">{profile.role}</p>
                  <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-400 mt-1">
                    <FiMapPin className="text-xs lg:text-sm" />
                    <span className="truncate">{profile.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs bg-[#232323] text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mb-4">
                {profile.social.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d0ed01] hover:text-[#bada55] transition-colors"
                  >
                    <FiLinkedin size={20} />
                  </a>
                )}
                {profile.social.twitter && (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d0ed01] hover:text-[#bada55] transition-colors"
                  >
                    <FiTwitter size={20} />
                  </a>
                )}
                {profile.social.github && (
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d0ed01] hover:text-[#bada55] transition-colors"
                  >
                    <FiGithub size={20} />
                  </a>
                )}
                {profile.social.discord && (
                  <a
                    href={profile.social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d0ed01] hover:text-[#bada55] transition-colors"
                  >
                    <FiMessageSquare size={20} />
                  </a>
                )}
                {profile.social.facebook && (
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#d0ed01] hover:text-[#bada55] transition-colors"
                  >
                    <FiGlobe size={20} />
                  </a>
                )}
              </div>
              <button
                onClick={() => handleProfileClick(profile)}
                className="w-full bg-[#232323] text-white py-2 rounded-lg hover:bg-[#333] transition-colors"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : activeTab === "corecommunity" ? (
        <div>
          {/* Header & Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-1"><FiAward className="text-[#d0ed01]" /> Core Community</h2>
              <div className="text-gray-400 text-base">Meet our most active builders and collaborators.</div>
            </div>
            <div className="flex gap-3 flex-wrap mt-2 md:mt-0">
              <button onClick={() => setShowAddMember(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-[rgba(208,237,1,0.12)] border border-[#d0ed01]/40 text-[#d0ed01] hover:bg-[#d0ed01] hover:text-black shadow-md backdrop-blur-md transition"><FiUserPlus /> Add New Member</button>
              <button onClick={() => setShowCommunityCall(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-[rgba(250,204,21,0.12)] border border-[#eab308]/40 text-[#eab308] hover:bg-[#eab308] hover:text-black shadow-md backdrop-blur-md transition"><FiVideo /> Join Community Call</button>
              <button onClick={() => setShowFindCollaborator(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-[rgba(244,114,182,0.12)] border border-[#f472b6]/40 text-[#f472b6] hover:bg-[#f472b6] hover:text-black shadow-md backdrop-blur-md transition"><FiUserCheck /> Find a Collaborator</button>
            </div>
          </div>
          {/* Core Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreMembers.map((member) => (
              <div key={member.id} className="bg-[rgba(24,24,27,0.95)] border border-white/10 rounded-2xl p-7 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d0ed01]/30 to-[#232323] flex items-center justify-center text-2xl font-bold text-white shadow-lg">{member.name[0]}</div>
                  <div>
                    <div className="text-lg font-bold text-white flex items-center gap-2">{member.name} <span className="text-xs font-normal text-gray-400">@{member.org}</span></div>
                    <div className="text-xs text-gray-400">Member since {member.since}</div>
                  </div>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${member.status.color} shadow-sm`}>{member.status.label}</div>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 rounded-lg bg-[#232323] text-[#d0ed01] font-semibold hover:bg-[#d0ed01] hover:text-black transition text-xs shadow">View Projects</button>
                  <button className="px-3 py-1 rounded-lg bg-[#232323] text-[#38bdf8] font-semibold hover:bg-[#38bdf8] hover:text-black transition text-xs shadow flex items-center gap-1"><FiMessageSquare /> Message</button>
                  {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0e76a8] hover:text-[#d0ed01] text-xl"><FiLinkedin /></a>}
                  {member.socials.twitter && <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-[#1da1f2] hover:text-[#d0ed01] text-xl"><FiTwitter /></a>}
                  {member.socials.github && <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#d0ed01] text-xl"><FiGithub /></a>}
                </div>
              </div>
            ))}
          </div>
          {/* Modals/Placeholders for actions */}
          {showAddMember && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl relative">
                <button onClick={() => setShowAddMember(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FiUserPlus /> Add New Member</h2>
                <input className="w-full mb-3 px-4 py-2 rounded-lg bg-[#232323] text-white placeholder-gray-400 outline-none border border-[#d0ed01]/20" placeholder="Email or Username" />
                <div className="flex items-center gap-2 mb-3">
                  <input className="flex-1 px-4 py-2 rounded-lg bg-[#232323] text-white placeholder-gray-400 outline-none border border-[#d0ed01]/20" placeholder="Assign Role (Viewer, Contributor, Builder)" />
                  <button className="px-3 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Invite</button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FiLink />
                  <span>Shareable Invite Link:</span>
                  <span className="bg-[#232323] px-2 py-1 rounded">https://symbiotes.app/invite/xyz</span>
                  <button className="text-[#d0ed01] hover:text-white ml-2">Copy</button>
                </div>
              </div>
            </div>
          )}
          {showCommunityCall && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl relative">
                <button onClick={() => setShowCommunityCall(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FiVideo /> Join Community Call</h2>
                <div className="mb-3 text-gray-400 text-sm">Join our next onboarding or AMA session:</div>
                <a href="https://zoom.us" target="_blank" rel="noopener noreferrer" className="w-full block px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition text-center mb-2">Join Live Zoom</a>
                <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" className="w-full block px-4 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition text-center">View Calendar</a>
              </div>
            </div>
          )}
          {showFindCollaborator && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl relative">
                <button onClick={() => setShowFindCollaborator(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FiUserCheck /> Find a Collaborator</h2>
                <div className="mb-3 text-gray-400 text-sm">Smart match: &quot;Match me with someone building in AI/EdTech in early stage.&quot;</div>
                <div className="bg-[#232323] rounded-lg p-4 text-gray-400 text-xs mb-2">(Future: Show recommended users to connect with based on tags, industry, phase)</div>
                <button className="w-full px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Try Smart Match</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <button className="bg-[#d0ed01] text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#bada55] transition-colors">
              <FiPlus />
              Add Organization
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <div
                key={org.id}
                className="bg-[#18181b] rounded-xl p-6 border border-white/10 hover:border-[#d0ed01]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{org.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                      <FiUsers />
                      {org.memberCount} members
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{org.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {org.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs bg-[#232323] text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-[#232323] text-white py-2 rounded-lg hover:bg-[#333] transition-colors">
                  View Organization
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Profile Drawer */}
      {showProfileDrawer && selectedProfile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-2xl relative">
            <button onClick={handleCloseDrawer} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
            <div className="flex items-center gap-4 mb-4">
              <img src={selectedProfile.image} alt={selectedProfile.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h2 className="text-xl font-bold text-white">{selectedProfile.name}</h2>
                <p className="text-[#d0ed01]">{selectedProfile.role}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{selectedProfile.bio}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProfile.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full text-xs bg-[#232323] text-gray-400">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-4">
              {selectedProfile.social.linkedin && (
                <a href={selectedProfile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d0ed01] transition-colors">
                  <FiLinkedin size={20} />
                </a>
              )}
              {selectedProfile.social.twitter && (
                <a href={selectedProfile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d0ed01] transition-colors">
                  <FiTwitter size={20} />
                </a>
              )}
              {selectedProfile.social.github && (
                <a href={selectedProfile.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d0ed01] transition-colors">
                  <FiGithub size={20} />
                </a>
              )}
              {selectedProfile.social.discord && (
                <a href={selectedProfile.social.discord} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d0ed01] transition-colors">
                  <FiMessageSquare size={20} />
                </a>
              )}
              {selectedProfile.social.facebook && (
                <a href={selectedProfile.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#d0ed01] transition-colors">
                  <FiGlobe size={20} />
                </a>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full bg-[#232323] text-white py-2 rounded-lg hover:bg-[#333] transition-colors">Add to Organization</button>
              <button className="w-full bg-[#232323] text-white py-2 rounded-lg hover:bg-[#333] transition-colors">Add to Crew</button>
              <button className="w-full bg-[#232323] text-white py-2 rounded-lg hover:bg-[#333] transition-colors">Assign Project</button>
              <button className="w-full bg-[#232323] text-white py-2 rounded-lg hover:bg-[#333] transition-colors">Assign Tasks</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 