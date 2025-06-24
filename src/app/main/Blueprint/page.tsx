"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FiBook,
  FiPlus,
  FiMoreHorizontal,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit,
  FiCalendar,
  FiSearch,
  FiTarget,
  FiZap,
  FiBarChart2,
  FiFileText,
  FiUsers,
  FiTrendingUp,
  FiSettings,
  FiUpload,
  FiX,
  FiExternalLink,
  FiDownload,
  FiEye,
  FiFilter,
  FiPlay,
  FiTrash2,
  FiPause,
  FiRefreshCw,
  FiCopy,
  FiPaperclip,
  FiUser
} from "react-icons/fi";

interface Blueprint {
  id: number;
  title: string;
  description: string;
  category: string;
  status: "Draft" | "In Progress" | "Completed" | "Active" | "Soft Launch";
  startDate: string;
  endDate: string;
  metrics: {
    surveyCompletionRate: number;
    participantCount: number;
  };
  progress: number;
  icon: React.ReactNode;
  tags: string[];
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
  lastModifiedBy: string;
  version: string;
}

interface BlueprintCategory {
  [key: string]: Blueprint[];
}

interface UpdateBlueprintData {
  blueprint_id: string;
  name: string;
  description: string;
  vision: string;
  mission: string;
  value_ladder_snapshot: {
    entry: { name: string; price: number; description: string };
    mid: { name: string; price: number; description: string };
    premium: { name: string; price: number; description: string };
  };
  core_offer: string;
  platform_focus: string[];
  launch_phase: string;
  primary_funnel_goal: string;
  top_ad_channel: string;
  ops_stack: {
    host: string;
    email: string;
    database: string;
    payments: string;
    analytics: string;
  };
  owner_name: string;
  owner_email: string;
  status: string;
}

// Mock data for blueprints
const categories: BlueprintCategory = {
  "MVP Experiments": [
    {
      id: 1,
      title: "Blueprint Alpha",
      description: "Test market validation through landing page and user interviews",
      category: "MVP",
      status: "In Progress",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      metrics: {
        surveyCompletionRate: 75,
        participantCount: 150
      },
      progress: 60,
      icon: <FiTarget className="text-2xl text-[#d0ed01]" />,
      tags: ["MVP", "Market Validation", "User Research"],
      attachments: [
        { name: "User Interview Script.docx", type: "DOC", size: "1.2 MB" },
        { name: "Landing Page Design.pdf", type: "PDF", size: "3.4 MB" }
      ],
      lastModifiedBy: "John Doe",
      version: "1.2"
    },
    {
      id: 2,
      title: "Blueprint Beta",
      description: "Product positioning test with target audience segments",
      category: "Positioning",
      status: "Draft",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      metrics: {
        surveyCompletionRate: 0,
        participantCount: 0
      },
      progress: 0,
      icon: <FiTrendingUp className="text-2xl text-[#d0ed01]" />,
      tags: ["Positioning", "Market Research"],
      lastModifiedBy: "Jane Smith",
      version: "0.1"
    },
    {
      id: 5,
      title: "Blueprint Epsilon",
      description: "Test core feature set with early adopters",
      category: "MVP",
      status: "In Progress",
      startDate: "2024-03-20",
      endDate: "2024-04-20",
      metrics: {
        surveyCompletionRate: 35,
        participantCount: 50
      },
      progress: 35,
      icon: <FiZap className="text-2xl text-[#d0ed01]" />,
      tags: ["MVP", "Feature Testing", "Early Adopters"],
      attachments: [
        { name: "Feature Roadmap.pdf", type: "PDF", size: "2.1 MB" },
        { name: "User Feedback.xlsx", type: "XLS", size: "1.5 MB" }
      ],
      lastModifiedBy: "Alex Chen",
      version: "0.8"
    }
  ],
  "A/B Tests": [
    {
      id: 3,
      title: "Blueprint Gamma",
      description: "Test different pricing models and feature sets",
      category: "A/B Test",
      status: "Completed",
      startDate: "2024-02-15",
      endDate: "2024-03-15",
      metrics: {
        surveyCompletionRate: 92,
        participantCount: 300
      },
      progress: 100,
      icon: <FiZap className="text-2xl text-[#d0ed01]" />,
      tags: ["A/B Test", "Pricing", "Features"],
      lastModifiedBy: "Mike Johnson",
      version: "2.0"
    },
    {
      id: 6,
      title: "Blueprint Zeta",
      description: "Test different onboarding flows and user engagement",
      category: "A/B Test",
      status: "In Progress",
      startDate: "2024-03-25",
      endDate: "2024-04-25",
      metrics: {
        surveyCompletionRate: 45,
        participantCount: 200
      },
      progress: 45,
      icon: <FiUsers className="text-2xl text-[#d0ed01]" />,
      tags: ["A/B Test", "Onboarding", "User Experience"],
      attachments: [
        { name: "Onboarding Flows.pdf", type: "PDF", size: "4.2 MB" },
        { name: "Engagement Metrics.xlsx", type: "XLS", size: "2.8 MB" }
      ],
      lastModifiedBy: "Emma Davis",
      version: "1.0"
    }
  ],
  "Market Research": [
    {
      id: 4,
      title: "Blueprint Delta",
      description: "Competitive analysis and market opportunity assessment",
      category: "Research",
      status: "In Progress",
      startDate: "2024-03-10",
      endDate: "2024-04-10",
      metrics: {
        surveyCompletionRate: 45,
        participantCount: 80
      },
      progress: 45,
      icon: <FiBarChart2 className="text-2xl text-[#d0ed01]" />,
      tags: ["Research", "Competition", "Market Analysis"],
      lastModifiedBy: "Sarah Wilson",
      version: "1.5"
    },
    {
      id: 7,
      title: "Blueprint Eta",
      description: "Customer behavior and market trend analysis",
      category: "Research",
      status: "Draft",
      startDate: "2024-04-05",
      endDate: "2024-05-05",
      metrics: {
        surveyCompletionRate: 0,
        participantCount: 0
      },
      progress: 0,
      icon: <FiTrendingUp className="text-2xl text-[#d0ed01]" />,
      tags: ["Research", "Customer Behavior", "Market Trends"],
      attachments: [
        { name: "Market Trends Report.pdf", type: "PDF", size: "3.7 MB" },
        { name: "Customer Survey.docx", type: "DOC", size: "1.9 MB" }
      ],
      lastModifiedBy: "David Kim",
      version: "0.3"
    }
  ]
};

const MY_BLUEPRINTS = 'My Blueprints';

export default function BlueprintPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof BlueprintCategory | typeof MY_BLUEPRINTS>("MVP Experiments");
  const [showExecutionDrawer, setShowExecutionDrawer] = useState(false);
  const [selectedBlueprint, setSelectedBlueprint] = useState<Blueprint | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState('');
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
    vision: '',
    mission: '',
    value_ladder_snapshot: {
      entry: { name: '', price: 0, description: '' },
      mid: { name: '', price: 0, description: '' },
      premium: { name: '', price: 0, description: '' }
    },
    core_offer: '',
    platform_focus: [] as string[],
    launch_phase: 'pre-launch',
    primary_funnel_goal: '',
    top_ad_channel: '',
    ops_stack: {
      host: '',
      email: '',
      database: '',
      payments: '',
      analytics: ''
    },
    owner_name: '',
    owner_email: '',
    status: 'draft'
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState(false);
  const [myBlueprints, setMyBlueprints] = useState<Blueprint[]>([]);
  const [myBlueprintsLoading, setMyBlueprintsLoading] = useState(false);
  const [myBlueprintsError, setMyBlueprintsError] = useState('');
  const [blueprintDetails, setBlueprintDetails] = useState<any>(null);
  const [blueprintDetailsLoading, setBlueprintDetailsLoading] = useState(false);
  const [blueprintDetailsError, setBlueprintDetailsError] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState<Partial<UpdateBlueprintData>>({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Get all unique tags
  const allTags = Array.from(new Set(
    Object.values(categories).flatMap(blueprints =>
      blueprints.flatMap(bp => bp.tags)
    )
  ));

  // Fetch my blueprints from backend
  const fetchMyBlueprints = async () => {
    setMyBlueprintsLoading(true);
    setMyBlueprintsError('');
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const response = await fetch('http://localhost:8000/blueprint', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
      });
      let data;
      try {
        data = await response.json();
      } catch (e) {
        data = null;
      }
      // Debug log
      console.log('API /blueprint response:', data);
      // Use data.blueprints if present, otherwise []
      const blueprintsArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.blueprints)
          ? data.blueprints
          : [];
      if (response.ok && blueprintsArray.length > 0) {
        setMyBlueprints(blueprintsArray.map((bp: any) => ({
          id: bp.id,
          title: bp.name,
          description: bp.description,
          category: 'My Blueprints',
          status: bp.status === 'draft' ? 'Draft' : (bp.status === 'completed' ? 'Completed' : (bp.status === 'active' ? 'Active' : 'In Progress')),
          startDate: bp.start_date || '',
          endDate: bp.end_date || '',
          metrics: { surveyCompletionRate: 0, participantCount: 0 },
          progress: 0,
          icon: <FiBook className="text-2xl text-[#d0ed01]" />,
          tags: bp.tags || [],
          lastModifiedBy: bp.last_modified_by || '',
          version: bp.version || '1.0',
        })));
        setMyBlueprintsError('');
      } else if (response.ok && blueprintsArray.length === 0) {
        setMyBlueprints([]);
        setMyBlueprintsError('');
      } else {
        setMyBlueprints([]);
        setMyBlueprintsError('No Blueprints Created');
      }
    } catch (err) {
      setMyBlueprints([]);
      setMyBlueprintsError('No Blueprints Created');
    } finally {
      setMyBlueprintsLoading(false);
    }
  };

  // Fetch specific blueprint details
  const fetchBlueprintDetails = async (id: string) => {
    setBlueprintDetailsLoading(true);
    setBlueprintDetailsError('');
    setBlueprintDetails(null);
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const response = await fetch(`http://localhost:8000/blueprint/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({ blueprint_id: id })
      });
      const data = await response.json();
      if (response.ok && data) {
        setBlueprintDetails(data);
      } else {
        setBlueprintDetailsError(data.detail || data.message || 'Failed to fetch blueprint details');
      }
    } catch (err) {
      setBlueprintDetailsError('Failed to fetch blueprint details');
    } finally {
      setBlueprintDetailsLoading(false);
    }
  };

  // Fetch my blueprints when tab is selected
  useEffect(() => {
    if (selectedCategory === MY_BLUEPRINTS) {
      fetchMyBlueprints();
    } else {
      setShowExecutionDrawer(false);
      setBlueprintDetails(null);
      setBlueprintDetailsError('');
      setBlueprintDetailsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterContainerRef.current && !filterContainerRef.current.contains(event.target as Node)) {
        setShowFilterPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterContainerRef]);

  // Handle create blueprint
  const handleCreateBlueprint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    setCreateSuccess(false);
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
      const organizationId = typeof window !== 'undefined' ? localStorage.getItem('organizationId') : null;
      const response = await fetch('http://localhost:8000/blueprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({
          name: createForm.name,
          description: createForm.description,
          vision: createForm.vision,
          mission: createForm.mission,
          value_ladder_snapshot: createForm.value_ladder_snapshot,
          core_offer: createForm.core_offer,
          platform_focus: createForm.platform_focus,
          launch_phase: createForm.launch_phase,
          primary_funnel_goal: createForm.primary_funnel_goal,
          top_ad_channel: createForm.top_ad_channel,
          ops_stack: createForm.ops_stack,
          owner_name: createForm.owner_name,
          owner_email: createForm.owner_email,
          status: createForm.status,
          ...(organizationId ? { organization_id: organizationId } : {})
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || data.message || 'Failed to create blueprint');
      }
      
      // Show success message and reset form
      setCreateSuccess(true);
      setCreateForm({
        name: '',
        description: '',
        vision: '',
        mission: '',
        value_ladder_snapshot: {
          entry: { name: '', price: 0, description: '' },
          mid: { name: '', price: 0, description: '' },
          premium: { name: '', price: 0, description: '' }
        },
        core_offer: '',
        platform_focus: [],
        launch_phase: 'pre-launch',
        primary_funnel_goal: '',
        top_ad_channel: '',
        ops_stack: {
          host: '',
          email: '',
          database: '',
          payments: '',
          analytics: ''
        },
        owner_name: '',
        owner_email: '',
        status: 'draft'
      });

      // Switch to My Blueprints tab and refresh the list
      setSelectedCategory(MY_BLUEPRINTS);
      await fetchMyBlueprints();
      
      // Close the modal after a short delay to show success message
      setTimeout(() => {
        setShowCreateModal(false);
        setCreateSuccess(false);
      }, 1500);

    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create blueprint');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleEditClick = async (blueprint: Blueprint) => {
    setUpdateError('');
    try {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if(!accessToken) return;
        
        const response = await fetch(`http://localhost:8000/blueprint/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ blueprint_id: blueprint.id.toString() })
        });

        const data = await response.json();
        if(response.ok) {
            setUpdateForm({
                ...data,
                blueprint_id: data.id,
            });
            setShowUpdateModal(true);
        } else {
            setUpdateError(data.detail || 'Failed to fetch blueprint details for editing.');
        }
    } catch (error) {
        setUpdateError('Failed to fetch blueprint details for editing.');
    }
  };

  const handleUpdateBlueprint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError('');
    try {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        const response = await fetch('http://localhost:8000/blueprint', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
            },
            body: JSON.stringify(updateForm)
        });
        
        if(!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to update blueprint');
        }

        setShowUpdateModal(false);
        fetchMyBlueprints();

    } catch (err) {
        setUpdateError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
        setUpdateLoading(false);
    }
  }

  const handleDeleteBlueprint = async (blueprintId: number) => {
    if (window.confirm('Are you sure you want to delete this blueprint?')) {
        try {
            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
            const response = await fetch('http://localhost:8000/blueprint', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {})
                },
                body: JSON.stringify({ blueprint_id: blueprintId.toString() })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.detail || 'Failed to delete blueprint');
            }

            fetchMyBlueprints();
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to delete');
        }
    }
  }

  return (
    <div className="w-full p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <FiBook className="text-3xl text-[#d0ed01]" />
          <h1 className="text-3xl font-bold text-white">Blueprint Hub</h1>
        </div>
        <button 
          className="px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus className="text-lg" />
          Create Blueprint
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-4 mb-8">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
              selectedCategory === category
                ? "bg-[#d0ed01] text-black"
                : "bg-[#232323] text-white hover:bg-[#333]"
            }`}
            onClick={() => setSelectedCategory(category as keyof BlueprintCategory)}
          >
            {category === "MVP Experiments" && <FiTarget className="text-lg" />}
            {category === "A/B Tests" && <FiZap className="text-lg" />}
            {category === "Market Research" && <FiBarChart2 className="text-lg" />}
            {category}
          </button>
        ))}
        <button
          key={MY_BLUEPRINTS}
          className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
            selectedCategory === MY_BLUEPRINTS
              ? "bg-[#d0ed01] text-black"
              : "bg-[#232323] text-white hover:bg-[#333]"
          }`}
          onClick={() => setSelectedCategory(MY_BLUEPRINTS)}
        >
          <FiBook className="text-lg" />
          {MY_BLUEPRINTS}
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 flex items-center gap-2 bg-[#232323] px-4 py-2 rounded-lg">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search blueprints..."
              className="bg-transparent text-white outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative" ref={filterContainerRef}>
            <button
                className="px-4 py-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition"
                onClick={() => setShowFilterPopover(prev => !prev)}
            >
                <FiFilter className="text-lg" />
            </button>
            {showFilterPopover && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[#18181b] border border-white/10 rounded-lg shadow-lg z-20">
                    <div className="p-4">
                        <input
                            type="text"
                            placeholder="Search tags..."
                            className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]"
                            value={filterSearchQuery}
                            onChange={(e) => setFilterSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="px-4 pb-4">
                        <h4 className="text-gray-400 text-sm font-semibold mb-2">Status</h4>
                        <div className="flex flex-wrap gap-2">
                            {["Draft", "In Progress", "Completed", "Active", "Soft Launch"].map((status) => (
                                <button
                                    key={status}
                                    className={`px-3 py-1 rounded-full text-sm transition ${selectedStatus === status
                                        ? "bg-[#d0ed01] text-black"
                                        : "bg-[#232323] text-white hover:bg-[#333]"
                                        }`}
                                    onClick={() => setSelectedStatus(prev => prev === status ? null : status)}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-4 pb-4">
                        <h4 className="text-gray-400 text-sm font-semibold mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                            {allTags
                                .filter(tag => tag.toLowerCase().includes(filterSearchQuery.toLowerCase()))
                                .map((tag) => (
                                <button
                                    key={tag}
                                    className={`px-3 py-1 rounded-full text-sm transition ${selectedTags.includes(tag)
                                        ? "bg-[#d0ed01] text-black"
                                        : "bg-[#232323] text-white hover:bg-[#333]"
                                        }`}
                                    onClick={() => {
                                        setSelectedTags(prev =>
                                            prev.includes(tag)
                                                ? prev.filter(t => t !== tag)
                                                : [...prev, tag]
                                        );
                                    }}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
        
        {(selectedTags.length > 0 || selectedStatus) && (
          <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-400 text-sm">Active Filters:</span>
              {selectedStatus && (
                  <span className="px-3 py-1 rounded-full text-sm bg-[#d0ed01] text-black flex items-center gap-2">
                      {selectedStatus}
                      <FiX className="cursor-pointer" onClick={() => setSelectedStatus(null)} />
                  </span>
              )}
              {selectedTags.map(tag => (
                   <span key={tag} className="px-3 py-1 rounded-full text-sm bg-[#d0ed01] text-black flex items-center gap-2">
                      {tag}
                       <FiX className="cursor-pointer" onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))} />
                   </span>
              ))}
              <button 
                  className="text-gray-400 hover:text-white text-sm underline"
                  onClick={() => {
                      setSelectedStatus(null);
                      setSelectedTags([]);
                  }}
              >
                  Clear all
              </button>
          </div>
        )}
      </div>

      {/* Blueprint Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedCategory === MY_BLUEPRINTS ? (
          myBlueprintsLoading ? (
            <div className="text-white text-center py-8 col-span-3">Loading blueprints...</div>
          ) : myBlueprints.length === 0 ? (
            <div className="text-gray-400 text-center py-8 col-span-3">
              <p>No Blueprints Created</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 px-6 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2 mx-auto"
              >
                <FiPlus className="text-lg" />
                Create Your First Blueprint
              </button>
            </div>
          ) : myBlueprintsError ? (
            <div className="text-red-500 text-center py-8 col-span-3">{myBlueprintsError}</div>
          ) : myBlueprints.map((blueprint) => (
            <div
              key={blueprint.id}
              className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="-mt-1">
                    {blueprint.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{blueprint.title}</h3>
                    <p className="text-sm text-gray-400">{blueprint.description}</p>
                  </div>
                </div>
                <FiMoreHorizontal className="text-gray-400 cursor-pointer hover:text-white transition" />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#232323] rounded-lg p-3">
                  <div className="text-sm text-gray-400">Survey Completion</div>
                  <div className="text-lg font-semibold text-white">{blueprint.metrics.surveyCompletionRate}%</div>
                </div>
                <div className="bg-[#232323] rounded-lg p-3">
                  <div className="text-sm text-gray-400">Participants</div>
                  <div className="text-lg font-semibold text-white">{blueprint.metrics.participantCount}</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                <FiCalendar className="text-[#d0ed01]" />
                <span>{blueprint.startDate} - {blueprint.endDate}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blueprint.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs bg-[#232323] text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Status and Version */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  blueprint.status === "Completed" 
                    ? "bg-green-500/20 text-green-500"
                    : blueprint.status === "In Progress"
                    ? "bg-yellow-500/20 text-yellow-500"
                    : blueprint.status === "Active"
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-gray-500/20 text-gray-500"
                }`}>
                  {blueprint.status}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiUser className="text-[#d0ed01]" />
                  <span>{blueprint.lastModifiedBy}</span>
                  <span className="text-xs">v{blueprint.version}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center justify-center gap-2"
                  onClick={() => {
                    fetchBlueprintDetails(blueprint.id.toString());
                    setSelectedBlueprint(blueprint);
                    setShowExecutionDrawer(true);
                  }}
                >
                  <FiEye className="text-lg" />
                  View
                </button>
                <button
                  className="p-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition"
                  onClick={() => handleEditClick(blueprint)}
                >
                  <FiEdit className="text-lg" />
                </button>
                <button
                  className="p-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition"
                  onClick={() => handleDeleteBlueprint(blueprint.id)}
                >
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            </div>
          ))
        ) : (
          categories[selectedCategory as keyof BlueprintCategory].map((blueprint) => (
          <div
            key={blueprint.id}
            className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="-mt-1">
                  {blueprint.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{blueprint.title}</h3>
                  <p className="text-sm text-gray-400">{blueprint.description}</p>
                </div>
              </div>
              <FiMoreHorizontal className="text-gray-400 cursor-pointer hover:text-white transition" />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-[#232323] rounded-lg p-3">
                <div className="text-sm text-gray-400">Survey Completion</div>
                <div className="text-lg font-semibold text-white">{blueprint.metrics.surveyCompletionRate}%</div>
              </div>
              <div className="bg-[#232323] rounded-lg p-3">
                <div className="text-sm text-gray-400">Participants</div>
                <div className="text-lg font-semibold text-white">{blueprint.metrics.participantCount}</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
              <FiCalendar className="text-[#d0ed01]" />
              <span>{blueprint.startDate} - {blueprint.endDate}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blueprint.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full text-xs bg-[#232323] text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Status and Version */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded-full text-xs ${
                blueprint.status === "Completed" 
                  ? "bg-green-500/20 text-green-500"
                  : blueprint.status === "In Progress"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : blueprint.status === "Active"
                  ? "bg-blue-500/20 text-blue-500"
                  : "bg-gray-500/20 text-gray-500"
              }`}>
                {blueprint.status}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FiUser className="text-[#d0ed01]" />
                <span>{blueprint.lastModifiedBy}</span>
                <span className="text-xs">v{blueprint.version}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                className="flex-1 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center justify-center gap-2"
                onClick={() => {
                  setSelectedBlueprint(blueprint);
                  setShowExecutionDrawer(true);
                }}
              >
                <FiPlay className="text-lg" />
                Start Execution
              </button>
              <button className="p-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition">
                <FiEdit className="text-lg" />
              </button>
              <button className="p-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition">
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          </div>
          ))
        )}
      </div>

      {/* Execution Drawer */}
      {showExecutionDrawer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-8 w-full max-w-4xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {blueprintDetailsLoading ? (
                  <span className="text-white">Loading...</span>
                ) : blueprintDetailsError ? (
                  <span className="text-red-500">{blueprintDetailsError}</span>
                ) : blueprintDetails ? (
                  <>
                    <FiBook className="text-2xl text-[#d0ed01]" />
                    <h2 className="text-2xl font-bold text-white">{blueprintDetails.name}</h2>
                  </>
                ) : selectedBlueprint ? (
                  <>
                {selectedBlueprint.icon}
                <h2 className="text-2xl font-bold text-white">{selectedBlueprint.title}</h2>
                  </>
                ) : null}
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => {
                  setShowExecutionDrawer(false);
                  setBlueprintDetails(null);
                  setBlueprintDetailsError('');
                  setBlueprintDetailsLoading(false);
                }}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="space-y-6">
              {blueprintDetailsLoading ? (
                <div className="text-white">Loading blueprint details...</div>
              ) : blueprintDetailsError ? (
                <div className="text-red-500">{blueprintDetailsError}</div>
              ) : blueprintDetails ? (
                <>
              <div className="bg-[#232323] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Blueprint Overview</h3>
                    <p className="text-gray-400 mb-4">{blueprintDetails.description}</p>
                    <div className="text-gray-400 text-sm mb-2">Status: <span className="text-[#d0ed01]">{blueprintDetails.status}</span></div>
                    <div className="text-gray-400 text-sm mb-2">Slug: <span className="text-[#d0ed01]">{blueprintDetails.slug}</span></div>
                    <div className="text-gray-400 text-sm mb-2">Spec: <span className="text-[#d0ed01]">{JSON.stringify(blueprintDetails.spec)}</span></div>
                  </div>
                </>
              ) : selectedBlueprint ? (
                <>
                  <div className="bg-[#232323] rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Blueprint Overview</h3>
                    <p className="text-gray-400 mb-4">{selectedBlueprint.description}</p>
                  </div>
                </>
              ) : null}
            </div>
                  </div>
                </div>
      )}

      {/* Update Blueprint Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] rounded-2xl w-full max-w-2xl max-h-[90vh] border border-white/10 shadow-2xl relative flex flex-col">
            <div className="p-6 border-b border-white/10">
              <button onClick={() => setShowUpdateModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"><FiX /></button>
              <h2 className="text-2xl font-bold text-white">Update Blueprint</h2>
            </div>
            <form className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" onSubmit={handleUpdateBlueprint}>
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Basic Information</h3>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter blueprint name"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.name} 
                    onChange={e => setUpdateForm(f => ({ ...f, name: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Description *</label>
                  <textarea 
                    placeholder="Describe your blueprint"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-20" 
                    value={updateForm.description} 
                    onChange={e => setUpdateForm(f => ({ ...f, description: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Vision</label>
                  <textarea 
                    placeholder="What is your vision?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.vision} 
                    onChange={e => setUpdateForm(f => ({ ...f, vision: e.target.value }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Mission</label>
                  <textarea 
                    placeholder="What is your mission?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.mission} 
                    onChange={e => setUpdateForm(f => ({ ...f, mission: e.target.value }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Core Offer</label>
                  <input 
                    type="text" 
                    placeholder="What is your core offer?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.core_offer} 
                    onChange={e => setUpdateForm(f => ({ ...f, core_offer: e.target.value }))} 
                  />
                </div>
              </div>

              {/* Value Ladder */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Value Ladder</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {updateForm.value_ladder_snapshot && (['entry', 'mid', 'premium'] as const).map((level) => (
                    <div className="space-y-2" key={level}>
                      <label className="block text-gray-200 font-semibold text-sm capitalize">{level} Level</label>
                      <input 
                        type="text" 
                        placeholder="Name"
                        className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                        value={updateForm.value_ladder_snapshot?.[level]?.name || ''} 
                        onChange={e => {
                          const value = e.target.value;
                          setUpdateForm(f => ({ 
                            ...f, 
                            value_ladder_snapshot: { 
                              ...f.value_ladder_snapshot, 
                              [level]: { ...f.value_ladder_snapshot?.[level], name: value } 
                            } as UpdateBlueprintData['value_ladder_snapshot']
                          }));
                        }}
                      />
                      <input 
                        type="number" 
                        placeholder="Price"
                        className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                        value={updateForm.value_ladder_snapshot?.[level]?.price || 0} 
                        onChange={e => {
                          const value = Number(e.target.value);
                          setUpdateForm(f => ({ 
                            ...f, 
                            value_ladder_snapshot: { 
                              ...f.value_ladder_snapshot, 
                              [level]: { ...f.value_ladder_snapshot?.[level], price: value } 
                            } as UpdateBlueprintData['value_ladder_snapshot']
                          }));
                        }}
                      />
                      <textarea 
                        placeholder="Description"
                        className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm h-16" 
                        value={updateForm.value_ladder_snapshot?.[level]?.description || ''} 
                        onChange={e => {
                          const value = e.target.value;
                          setUpdateForm(f => ({ 
                            ...f, 
                            value_ladder_snapshot: { 
                              ...f.value_ladder_snapshot, 
                              [level]: { ...f.value_ladder_snapshot?.[level], description: value } 
                            } as UpdateBlueprintData['value_ladder_snapshot']
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch & Marketing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Launch & Marketing</h3>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Platform Focus</label>
                  <input 
                    type="text" 
                    placeholder="LinkedIn, Twitter, ProductHunt (comma separated)"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={Array.isArray(updateForm.platform_focus) ? updateForm.platform_focus.join(', ') : ''} 
                    onChange={e => setUpdateForm(f => ({ ...f, platform_focus: e.target.value.split(',').map(s => s.trim()).filter(s => s) }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Launch Phase *</label>
                  <select 
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.launch_phase} 
                    onChange={e => setUpdateForm(f => ({ ...f, launch_phase: e.target.value }))} 
                    required
                  >
                    <option value="pre-launch">Pre-Launch</option>
                    <option value="early-launch">Early Launch</option>
                    <option value="late-launch">Late Launch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Primary Funnel Goal</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Get 1000 beta signups"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.primary_funnel_goal} 
                    onChange={e => setUpdateForm(f => ({ ...f, primary_funnel_goal: e.target.value }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Top Ad Channel</label>
                  <input 
                    type="text" 
                    placeholder="e.g., LinkedIn Ads"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.top_ad_channel} 
                    onChange={e => setUpdateForm(f => ({ ...f, top_ad_channel: e.target.value }))} 
                  />
                </div>
              </div>

              {/* Operations Stack */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Operations Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {updateForm.ops_stack && (Object.keys(updateForm.ops_stack) as Array<keyof typeof updateForm.ops_stack>).map(key => (
                    <div key={key}>
                      <label className="block text-gray-200 font-semibold mb-1 capitalize">{key}</label>
                      <input 
                        type="text" 
                        placeholder={`e.g., ${updateForm.ops_stack?.[key] || '...'}`}
                        className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                        value={updateForm.ops_stack?.[key] || ''} 
                        onChange={e => {
                          const value = e.target.value;
                          setUpdateForm(f => ({ 
                            ...f, 
                            ops_stack: { 
                              ...f.ops_stack, 
                              [key]: value 
                            } as UpdateBlueprintData['ops_stack']
                          }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Owner Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Owner Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter owner name"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={updateForm.owner_name} 
                      onChange={e => setUpdateForm(f => ({ ...f, owner_name: e.target.value }))} 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Owner Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter owner email"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={updateForm.owner_email} 
                      onChange={e => setUpdateForm(f => ({ ...f, owner_email: e.target.value }))} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Status</label>
                  <select 
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.status} 
                    onChange={e => setUpdateForm(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="draft">Draft</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="active">Active</option>
                    <option value="soft-launch">Soft Launch</option>
                  </select>
                </div>
              </div>

              {updateError && <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded">{updateError}</div>}
              
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => setShowUpdateModal(false)} 
                  className="px-4 py-2 rounded border border-gray-500 text-gray-200 bg-transparent hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition" 
                  disabled={updateLoading}
                >
                  {updateLoading ? 'Updating...' : 'Update Blueprint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Blueprint Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#18181b] rounded-2xl w-full max-w-2xl max-h-[90vh] border border-white/10 shadow-2xl relative flex flex-col">
            <div className="p-6 border-b border-white/10">
              <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"><FiX /></button>
              <h2 className="text-2xl font-bold text-white">Create Blueprint</h2>
            </div>
            <form className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar" onSubmit={handleCreateBlueprint}>
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Basic Information</h3>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter blueprint name"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.name} 
                    onChange={e => setCreateForm(f => ({ ...f, name: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Description *</label>
                  <textarea 
                    placeholder="Describe your blueprint"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-20" 
                    value={createForm.description} 
                    onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Vision</label>
                  <textarea 
                    placeholder="What is your vision?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.vision} 
                    onChange={e => setCreateForm(f => ({ ...f, vision: e.target.value }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Mission</label>
                  <textarea 
                    placeholder="What is your mission?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.mission} 
                    onChange={e => setCreateForm(f => ({ ...f, mission: e.target.value }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Core Offer</label>
                  <input 
                    type="text" 
                    placeholder="What is your core offer?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.core_offer} 
                    onChange={e => setCreateForm(f => ({ ...f, core_offer: e.target.value }))} 
                  />
                </div>
              </div>

              {/* Value Ladder */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Value Ladder</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Entry Level */}
                  <div className="space-y-2">
                    <label className="block text-gray-200 font-semibold text-sm">Entry Level</label>
                    <input 
                      type="text" 
                      placeholder="Name"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                      value={createForm.value_ladder_snapshot.entry.name} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          entry: { ...f.value_ladder_snapshot.entry, name: e.target.value } 
                        } 
                      }))} 
                    />
                    <input 
                      type="number" 
                      placeholder="Price"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                      value={createForm.value_ladder_snapshot.entry.price} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          entry: { ...f.value_ladder_snapshot.entry, price: Number(e.target.value) } 
                        } 
                      }))} 
                    />
                    <textarea 
                      placeholder="Description"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm h-16" 
                      value={createForm.value_ladder_snapshot.entry.description} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          entry: { ...f.value_ladder_snapshot.entry, description: e.target.value } 
                        } 
                      }))} 
                    />
                  </div>

                  {/* Mid Level */}
                  <div className="space-y-2">
                    <label className="block text-gray-200 font-semibold text-sm">Mid Level</label>
                    <input 
                      type="text" 
                      placeholder="Name"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                      value={createForm.value_ladder_snapshot.mid.name} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          mid: { ...f.value_ladder_snapshot.mid, name: e.target.value } 
                        } 
                      }))} 
                    />
                    <input 
                      type="number" 
                      placeholder="Price"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                      value={createForm.value_ladder_snapshot.mid.price} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          mid: { ...f.value_ladder_snapshot.mid, price: Number(e.target.value) } 
                        } 
                      }))} 
                    />
                    <textarea 
                      placeholder="Description"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm h-16" 
                      value={createForm.value_ladder_snapshot.mid.description} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          mid: { ...f.value_ladder_snapshot.mid, description: e.target.value } 
                        } 
                      }))} 
                    />
                  </div>

                  {/* Premium Level */}
                  <div className="space-y-2">
                    <label className="block text-gray-200 font-semibold text-sm">Premium Level</label>
                    <input 
                      type="text" 
                      placeholder="Name"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                      value={createForm.value_ladder_snapshot.premium.name} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          premium: { ...f.value_ladder_snapshot.premium, name: e.target.value } 
                        } 
                      }))} 
                    />
                    <input 
                      type="number" 
                      placeholder="Price"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm" 
                      value={createForm.value_ladder_snapshot.premium.price} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          premium: { ...f.value_ladder_snapshot.premium, price: Number(e.target.value) } 
                        } 
                      }))} 
                    />
                    <textarea 
                      placeholder="Description"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] text-sm h-16" 
                      value={createForm.value_ladder_snapshot.premium.description} 
                      onChange={e => setCreateForm(f => ({ 
                        ...f, 
                        value_ladder_snapshot: { 
                          ...f.value_ladder_snapshot, 
                          premium: { ...f.value_ladder_snapshot.premium, description: e.target.value } 
                        } 
                      }))} 
                    />
                  </div>
                </div>
              </div>

              {/* Launch & Marketing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Launch & Marketing</h3>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Platform Focus</label>
                  <input 
                    type="text" 
                    placeholder="LinkedIn, Twitter, ProductHunt (comma separated)"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.platform_focus.join(', ')} 
                    onChange={e => setCreateForm(f => ({ ...f, platform_focus: e.target.value.split(',').map(s => s.trim()).filter(s => s) }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Launch Phase *</label>
                  <select 
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.launch_phase} 
                    onChange={e => setCreateForm(f => ({ ...f, launch_phase: e.target.value }))} 
                    required
                  >
                    <option value="pre-launch">Pre-Launch</option>
                    <option value="early-launch">Early Launch</option>
                    <option value="late-launch">Late Launch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Primary Funnel Goal</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Get 1000 beta signups"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.primary_funnel_goal} 
                    onChange={e => setCreateForm(f => ({ ...f, primary_funnel_goal: e.target.value }))} 
                  />
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Top Ad Channel</label>
                  <input 
                    type="text" 
                    placeholder="e.g., LinkedIn Ads"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.top_ad_channel} 
                    onChange={e => setCreateForm(f => ({ ...f, top_ad_channel: e.target.value }))} 
                  />
                </div>
              </div>

              {/* Operations Stack */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Operations Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Host</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Vercel"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={createForm.ops_stack.host} 
                      onChange={e => setCreateForm(f => ({ ...f, ops_stack: { ...f.ops_stack, host: e.target.value } }))} 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Email</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Resend"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={createForm.ops_stack.email} 
                      onChange={e => setCreateForm(f => ({ ...f, ops_stack: { ...f.ops_stack, email: e.target.value } }))} 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Database</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Supabase"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={createForm.ops_stack.database} 
                      onChange={e => setCreateForm(f => ({ ...f, ops_stack: { ...f.ops_stack, database: e.target.value } }))} 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Payments</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Stripe"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={createForm.ops_stack.payments} 
                      onChange={e => setCreateForm(f => ({ ...f, ops_stack: { ...f.ops_stack, payments: e.target.value } }))} 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-200 font-semibold mb-1">Analytics</label>
                    <input 
                      type="text" 
                      placeholder="e.g., PostHog"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={createForm.ops_stack.analytics} 
                      onChange={e => setCreateForm(f => ({ ...f, ops_stack: { ...f.ops_stack, analytics: e.target.value } }))} 
                    />
                  </div>
                </div>
              </div>

              {/* Owner Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Owner Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Owner Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter owner name"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={createForm.owner_name} 
                      onChange={e => setCreateForm(f => ({ ...f, owner_name: e.target.value }))} 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-200 font-semibold mb-1">Owner Email</label>
                    <input 
                      type="email" 
                      placeholder="Enter owner email"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                      value={createForm.owner_email} 
                      onChange={e => setCreateForm(f => ({ ...f, owner_email: e.target.value }))} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Status</label>
                  <select 
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.status} 
                    onChange={e => setCreateForm(f => ({ ...f, status: e.target.value }))}
                  >
                    <option value="draft">Draft</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="active">Active</option>
                    <option value="soft-launch">Soft Launch</option>
                  </select>
                </div>
              </div>

              {createError && (
                <div className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded">
                  {createError}
                </div>
              )}
              
              {createSuccess && (
                <div className="text-green-500 text-sm text-center bg-green-500/10 p-3 rounded">
                  Blueprint created successfully! Redirecting to My Blueprints...
                </div>
              )}
              
              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)} 
                  className="px-4 py-2 rounded border border-gray-500 text-gray-200 bg-transparent hover:bg-gray-800 transition"
                  disabled={createLoading || createSuccess}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d100] transition" 
                  disabled={createLoading || createSuccess}
                >
                  {createLoading ? 'Creating...' : createSuccess ? 'Created!' : 'Create Blueprint'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 