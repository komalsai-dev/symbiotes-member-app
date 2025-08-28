"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiPhone, FiMessageSquare, FiMail, FiSend, FiAward, FiTrendingUp, FiUsers, FiGlobe, FiEdit2, FiX, FiAlertCircle } from "react-icons/fi";

type Profile = {
  id?: string;
  full_name?: string;
  phone?: string;
  avatar_url?: string;
  bio?: string;
  org_id?: string;
  email?: string;
};

export default function ProfilePage() {
  // Mock profile data
  const [profile, setProfile] = useState<Profile | null>({
    id: "1",
    full_name: "John Doe",
    phone: "+1 (555) 123-4567",
    avatar_url: "/images/profile.jpg",
    bio: "AI enthusiast and startup founder. Building the future of business automation.",
    org_id: "symbiotes-ai",
    email: "john.doe@example.com"
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState<Profile>({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showOrgWarning, setShowOrgWarning] = useState(false);

  // Check for organization ID in localStorage and update profile
  useEffect(() => {
    const organizationId = typeof window !== 'undefined' ? localStorage.getItem('organizationId') : null;
    if (organizationId && profile && !profile.org_id) {
      handleAutoUpdateOrg(organizationId);
    }
  }, [profile]);

  // Mock function to auto update organization ID (frontend only)
  const handleAutoUpdateOrg = async (organizationId: string) => {
    // Simulate API delay
    setTimeout(() => {
      setProfile(prev => prev ? {
        ...prev,
        org_id: organizationId
      } : null);
      setShowOrgWarning(false);
    }, 500);
  };

  // Mock function to fetch profile (frontend only)
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      
      // Simulate API delay
      setTimeout(() => {
        const organizationId = typeof window !== 'undefined' ? localStorage.getItem('organizationId') : null;
        
        // Use mock profile data
        const mockProfile: Profile = {
          id: "1",
          full_name: "John Doe",
          phone: "+1 (555) 123-4567",
          avatar_url: "/images/profile.jpg",
          bio: "AI enthusiast and startup founder. Building the future of business automation.",
          org_id: organizationId || "symbiotes-ai",
          email: "john.doe@example.com"
        };
        
        setProfile(mockProfile);
        // Show warning if no organization is assigned and no organizationId in localStorage
        setShowOrgWarning(!mockProfile.org_id && !organizationId);
        setLoading(false);
      }, 500);
    };
    fetchProfile();
  }, []);

  // Open edit modal and prefill form
  const openEdit = () => {
    const organizationId = typeof window !== 'undefined' ? localStorage.getItem('organizationId') : null;
    setEditForm({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      avatar_url: profile?.avatar_url || '',
      bio: profile?.bio || '',
      org_id: profile?.org_id || organizationId || '', // Prefer profile org_id, fallback to localStorage
    });
    setEditError("");
    setShowEdit(true);
  };

  // Mock function to update profile (frontend only)
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate organization ID
    if (!editForm.org_id?.trim()) {
      setEditError("Organization ID is required");
      return;
    }

    setEditLoading(true);
    setEditError("");
    
    // Simulate API delay
    setTimeout(() => {
      // Update profile with form data
      const updatedProfile: Profile = {
        ...profile,
        full_name: editForm.full_name || profile?.full_name,
        phone: editForm.phone || profile?.phone,
        avatar_url: editForm.avatar_url || profile?.avatar_url,
        bio: editForm.bio || profile?.bio,
        org_id: editForm.org_id || profile?.org_id,
      };
      
      setProfile(updatedProfile);
      setShowEdit(false);
      setShowOrgWarning(!updatedProfile.org_id);
      
      // Update localStorage if org_id was updated
      if (editForm.org_id && (!profile?.org_id || profile.org_id !== editForm.org_id)) {
        localStorage.setItem('organizationId', editForm.org_id);
      }
      
      setEditLoading(false);
    }, 1000);
  };

  // Mock function to delete profile (frontend only)
  const handleDeleteProfile = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;
    setDeleteLoading(true);
    setDeleteError("");
    setDeleteSuccess(false);
    
    // Simulate API delay
    setTimeout(() => {
      setProfile(null);
      setDeleteSuccess(true);
      setDeleteLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row items-start gap-12 pt-8 pb-10 px-4 md:px-16 w-full">
      {/* Organization Warning Banner */}
      {showOrgWarning && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500/90 text-black p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiAlertCircle className="text-xl" />
              <span className="font-semibold">Organization ID Required:</span>
              <span>Please update your profile to assign an organization ID. This is required for creating blueprints.</span>
            </div>
            <button
              onClick={openEdit}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
      {/* Left: Main Dashboard */}
      <div className="flex-1 flex flex-col gap-10">
        {/* Top: Search and Actions */}
        <div className="flex items-center gap-3 mb-4 mt-0">
          <input
            type="text"
            placeholder="Search metrics, projects, or team members"
            className="flex-1 bg-[#232323]/50 text-white px-6 py-3 rounded-xl outline-none border border-white/10 placeholder-gray-400 backdrop-blur-md focus:border-[#d0ed01]/50 transition-all duration-300"
          />
          <button className="bg-[#232323]/50 p-3 rounded-xl text-white text-xl hover:bg-[#d0ed01] hover:text-black transition-all duration-300 border border-white/10 backdrop-blur-md">
            <span role="img" aria-label="calendar">📅</span>
          </button>
          <button className="bg-[#232323]/50 p-3 rounded-xl text-white text-xl hover:bg-[#d0ed01] hover:text-black transition-all duration-300 border border-white/10 backdrop-blur-md">
            <span role="img" aria-label="settings">⚙️</span>
          </button>
        </div>
        {/* Profile loading/error */}
        {loading ? (
          <div className="text-white text-center py-8">Loading profile...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : null}
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-2xl p-6 flex flex-col items-start shadow-lg bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <FiTrendingUp className="text-[#d0ed01] text-xl" />
              <div className="text-white text-lg font-semibold">Monthly Revenue</div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">$2.56M</div>
            <div className="text-[#d0ed01] font-bold">+70% vs Last Month</div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col items-start shadow-lg bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <FiUsers className="text-[#d0ed01] text-xl" />
              <div className="text-white text-lg font-semibold">Active Users</div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">124.5K</div>
            <div className="text-[#d0ed01] font-bold">+25% Growth</div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col items-start shadow-lg bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <FiGlobe className="text-[#d0ed01] text-xl" />
              <div className="text-white text-lg font-semibold">Market Reach</div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">15 Countries</div>
            <div className="text-[#d0ed01] font-bold">+3 New Markets</div>
          </div>
        </div>
        {/* Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 shadow-lg flex flex-col bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
            <div className="text-white font-semibold mb-4">Growth Trajectory</div>
            <div className="flex-1 flex items-center justify-center">
              <svg width="220" height="100">
                <path d="M20,80 Q60,20 120,60 T220,40" stroke="#d0ed01" strokeWidth="4" fill="none" className="animate-pulse" />
                <circle cx="120" cy="60" r="8" fill="#d0ed01" className="animate-pulse" />
                <text x="130" y="55" fill="#d0ed01" fontSize="16">$2.4M</text>
              </svg>
            </div>
          </div>
          <div className="rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
            <div className="text-white font-semibold mb-2">Investor Confidence</div>
            <svg width="100" height="100">
              <circle cx="50" cy="50" r="40" stroke="#18181b" strokeWidth="12" fill="none" />
              <circle cx="50" cy="50" r="40" stroke="#d0ed01" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset="55" className="animate-pulse" />
              <text x="50" y="58" textAnchor="middle" fill="#d0ed01" fontSize="24" fontWeight="bold">92%</text>
            </svg>
            <div className="flex justify-between w-full mt-4 text-xs text-gray-400">
              <div>
                <span className="text-[#d0ed01]">●</span> Series A Ready<br />Strong metrics
              </div>
              <div>
                <span className="text-white">●</span> Market Fit<br />Validated
              </div>
            </div>
          </div>
        </div>
        {/* Key Achievements */}
        <div className="rounded-2xl p-6 shadow-lg mt-4 bg-[linear-gradient(90deg,rgba(208,237,1,0.18)_0%,rgba(208,237,1,0.18)_30%,rgba(24,24,27,0.85)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
          <div className="text-white font-semibold mb-4 flex items-center gap-2">
            <FiAward className="text-[#d0ed01]" />
            Key Achievements
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#232323]/50 backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">YC</div>
                <div>
                  <div className="text-white font-semibold">Y Combinator W24</div>
                  <div className="text-xs text-gray-400">Selected for Winter 2024 Batch</div>
                </div>
              </div>
              <div className="text-[#d0ed01] font-semibold">$500K</div>
              <div className="text-white font-semibold">Seed Round</div>
              <button className="text-white text-2xl hover:text-[#d0ed01] transition-colors duration-300">...</button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#232323]/50 backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-bold">TC</div>
                <div>
                  <div className="text-white font-semibold">TechCrunch Feature</div>
                  <div className="text-xs text-gray-400">Top 10 AI Startups 2024</div>
                </div>
              </div>
              <div className="text-[#d0ed01] font-semibold">10K+</div>
              <div className="text-white font-semibold">New Users</div>
              <button className="text-white text-2xl hover:text-[#d0ed01] transition-colors duration-300">...</button>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Profile Card */}
      <div className="w-full md:max-w-xs flex flex-col gap-10 sticky top-8 self-start">
        {/* Profile Card */}
        <div className="rounded-2xl p-6 shadow-lg flex flex-col items-center relative bg-[linear-gradient(135deg,rgba(208,237,1,0.18)_0%,rgba(24,24,27,0.95)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300 w-full">
          <div className="relative mb-2 mt-2 flex flex-col items-center">
            <Image src={profile?.avatar_url || "/images/profile.jpg"} alt="Profile" width={90} height={90} className="rounded-full object-cover border-4 border-[#d0ed01]/50" />
            <span className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#d0ed01] border-2 border-black flex items-center justify-center">
              <svg width="16" height="16"><circle cx="8" cy="8" r="8" fill="#d0ed01" /></svg>
            </span>
          </div>
          <div className="text-white font-bold text-lg text-center">{profile?.full_name || 'No Name'}</div>
          <div className="text-gray-400 text-sm mb-1 text-center">{profile?.email}</div>
          <div className="text-[#d0ed01] text-sm mb-3 text-center">{profile?.org_id ? `Org: ${profile.org_id}` : ''}</div>
          <div className="flex gap-3 mb-4 justify-center">
            <button className="bg-[#232323]/50 p-3 rounded-full text-white text-xl hover:bg-[#d0ed01] hover:text-black transition-all duration-300 border border-white/10 backdrop-blur-md">
              <FiPhone />
            </button>
            <button className="bg-[#232323]/50 p-3 rounded-full text-white text-xl hover:bg-[#d0ed01] hover:text-black transition-all duration-300 border border-white/10 backdrop-blur-md">
              <FiMail />
            </button>
          </div>
          <div className="text-gray-400 text-center mb-4">{profile?.bio || 'No bio provided.'}</div>
          <div className="flex flex-col gap-2 w-full mt-2">
            <button
              className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition flex items-center gap-2 w-full justify-center"
              onClick={openEdit}
            >
              <FiEdit2 /> Update
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition flex items-center gap-2 w-full justify-center"
              onClick={handleDeleteProfile}
              disabled={deleteLoading}
            >
              {deleteLoading ? 'Deleting...' : 'Delete Profile'}
            </button>
            {deleteError && <div className="text-red-500 text-sm text-center">{deleteError}</div>}
            {deleteSuccess && <div className="text-green-500 text-sm text-center">Profile deleted successfully.</div>}
          </div>
        </div>
        {/* Edit Profile Modal */}
        {showEdit && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-lg border border-white/10 shadow-2xl relative">
              <button onClick={() => setShowEdit(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"><FiX /></button>
              <h2 className="text-2xl font-bold text-white mb-6">Update Profile</h2>
              <form className="space-y-4" onSubmit={handleUpdateProfile}>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" value={editForm.full_name || ''} onChange={e => setEditForm(f => ({ ...f, full_name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Phone</label>
                  <input type="text" className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" value={editForm.phone || ''} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Avatar URL</label>
                  <input type="text" className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" value={editForm.avatar_url || ''} onChange={e => setEditForm(f => ({ ...f, avatar_url: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Bio</label>
                  <textarea className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" value={editForm.bio || ''} onChange={e => setEditForm(f => ({ ...f, bio: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">
                    Organization ID <span className="text-red-500">*</span>
                    <span className="text-sm text-gray-400 ml-2">(Required for creating blueprints)</span>
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={editForm.org_id || ''} 
                    onChange={e => setEditForm(f => ({ ...f, org_id: e.target.value }))}
                    required
                    placeholder="Enter your organization ID"
                  />
                </div>
                {editError && <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded">{editError}</div>}
                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 rounded border border-gray-500 text-gray-200 bg-transparent hover:bg-gray-800 transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Funding Status */}
        <div className="rounded-2xl p-6 shadow-lg flex flex-col items-center bg-[linear-gradient(135deg,rgba(208,237,1,0.18)_0%,rgba(24,24,27,0.95)_100%)] backdrop-blur-md border border-white/10 hover:border-[#d0ed01]/50 transition-all duration-300 w-full">
          <div className="text-white font-semibold mb-2">Current Round</div>
          <div className="text-[#d0ed01] text-2xl font-bold mb-2">Series A</div>
          <div className="text-gray-400 text-sm">Target: $10M</div>
          <div className="w-full mt-4">
            <div className="h-2 bg-[#232323] rounded-full overflow-hidden">
              <div className="h-full bg-[#d0ed01] rounded-full" style={{ width: '65%' }}></div>
            </div>
            <div className="text-white text-sm mt-2">65% Funded</div>
          </div>
        </div>
      </div>
    </div>
  );
}

