"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FiBook,
  FiPlus,
  FiMoreHorizontal,
  FiEdit,
  FiCalendar,
  FiSearch,
  FiTarget,
  FiZap,
  FiBarChart2,
  FiUsers,
  FiTrendingUp,
  FiX,
  FiEye,
  FiFilter,
  FiPlay,
  FiTrash2,
  FiRefreshCw,
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

// Mock data interfaces for frontend functionality
interface MockBlueprintData {
  brand_name: string;
  current_business_stage: string;
  business_model: string;
  freebies_downloads: string;
  tagline: string;
  mission_statement: string;
  brand_vision: string;
  problem_solved: string;
  brand_backstory: string;
  brand_emotions: string;
  company_culture: string;
  products_services_description: string;
  product_categories: string;
  upcoming_products: string;
}

interface BlueprintDetails {
  id: string;
  name: string;
  description: string;
  status: string;
  slug: string;
  spec: {
    brand_name: string;
    current_business_stage: string;
    business_model: string;
  };
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
  const [createForm, setCreateForm] = useState<MockBlueprintData>({
    brand_name: '',
    current_business_stage: '',
    business_model: '',
    freebies_downloads: '',
    tagline: '',
    mission_statement: '',
    brand_vision: '',
    problem_solved: '',
    brand_backstory: '',
    brand_emotions: '',
    company_culture: '',
    products_services_description: '',
    product_categories: '',
    upcoming_products: ''
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState(false);
  
  // Mock data for user's blueprints
  const [myBlueprints, setMyBlueprints] = useState<Blueprint[]>([
    {
      id: 101,
      title: "My First Blueprint",
      description: "A test blueprint for my business",
      category: "My Blueprints",
      status: "Draft",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      metrics: {
        surveyCompletionRate: 0,
        participantCount: 0
      },
      progress: 0,
      icon: <FiBook className="text-2xl text-[#d0ed01]" />,
      tags: ["Personal", "Test"],
      lastModifiedBy: "You",
      version: "1.0"
    }
  ]);
  const [myBlueprintsLoading, setMyBlueprintsLoading] = useState(false);
  const [myBlueprintsError, setMyBlueprintsError] = useState('');
  
  const [blueprintDetails, setBlueprintDetails] = useState<BlueprintDetails | null>(null);
  const [blueprintDetailsLoading, setBlueprintDetailsLoading] = useState(false);
  const [blueprintDetailsError, setBlueprintDetailsError] = useState('');
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState<Partial<MockBlueprintData>>({});
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Get all unique tags
  const allTags = Array.from(new Set(
    Object.values(categories).flatMap(blueprints =>
      blueprints.flatMap(bp => bp.tags)
    )
  ));

  // Mock function to fetch blueprints (frontend only)
  const fetchMyBlueprints = async () => {
    setMyBlueprintsLoading(true);
    setMyBlueprintsError('');
    
    // Simulate API delay
    setTimeout(() => {
      setMyBlueprints([
        {
          id: 101,
          title: "My First Blueprint",
          description: "A test blueprint for my business",
          category: "My Blueprints",
          status: "Draft",
          startDate: "2024-03-15",
          endDate: "2024-04-15",
          metrics: {
            surveyCompletionRate: 0,
            participantCount: 0
          },
          progress: 0,
          icon: <FiBook className="text-2xl text-[#d0ed01]" />,
          tags: ["Personal", "Test"],
          lastModifiedBy: "You",
          version: "1.0"
        }
      ]);
      setMyBlueprintsLoading(false);
    }, 500);
  };

  // Mock function to fetch blueprint details (frontend only)
  const fetchBlueprintDetails = async (id: string) => {
    setBlueprintDetailsLoading(true);
    setBlueprintDetailsError('');
    setBlueprintDetails(null);
    
    // Simulate API delay
    setTimeout(() => {
      setBlueprintDetails({
        id: id,
        name: "My First Blueprint",
        description: "A test blueprint for my business",
        status: "draft",
        slug: "my-first-blueprint",
        spec: {
          brand_name: "Test Brand",
          current_business_stage: "idea_stage",
          business_model: "product_based"
        }
      });
      setBlueprintDetailsLoading(false);
    }, 500);
  };

  // No authentication check needed for frontend-only version

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

  // Mock function to create blueprint (frontend only)
  const handleCreateBlueprint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    setCreateSuccess(false);
    
    // Simulate API delay
    setTimeout(() => {
      // Create new blueprint with mock data
      const newBlueprint: Blueprint = {
        id: Date.now(), // Use timestamp as ID
        title: createForm.brand_name || "New Blueprint",
        description: createForm.mission_statement || "A new blueprint",
        category: "My Blueprints",
        status: "Draft",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        metrics: {
          surveyCompletionRate: 0,
          participantCount: 0
        },
        progress: 0,
        icon: <FiBook className="text-2xl text-[#d0ed01]" />,
        tags: ["New", "Draft"],
        lastModifiedBy: "You",
        version: "1.0"
      };
      
      // Add to my blueprints
      setMyBlueprints(prev => [...prev, newBlueprint]);
      
      // Show success message and reset form
      setCreateSuccess(true);
      setCreateForm({
        brand_name: '',
        current_business_stage: '',
        business_model: '',
        freebies_downloads: '',
        tagline: '',
        mission_statement: '',
        brand_vision: '',
        problem_solved: '',
        brand_backstory: '',
        brand_emotions: '',
        company_culture: '',
        products_services_description: '',
        product_categories: '',
        upcoming_products: ''
      });

      // Switch to My Blueprints tab
      setSelectedCategory(MY_BLUEPRINTS);
      
      // Close the modal after a short delay to show success message
      setTimeout(() => {
        setShowCreateModal(false);
        setCreateSuccess(false);
      }, 1500);
      
      setCreateLoading(false);
    }, 1000);
  };

  const handleEditClick = async (blueprint: Blueprint) => {
    setUpdateError('');
    
    // Mock data for editing
    setUpdateForm({
      brand_name: blueprint.title,
      current_business_stage: 'idea_stage',
      business_model: 'product_based',
      freebies_downloads: '',
      tagline: '',
      mission_statement: blueprint.description,
      brand_vision: '',
      problem_solved: '',
      brand_backstory: '',
      brand_emotions: '',
      company_culture: '',
      products_services_description: '',
      product_categories: '',
      upcoming_products: ''
    });
    setShowUpdateModal(true);
  };

  const handleUpdateBlueprint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError('');
    
    // Simulate API delay
    setTimeout(() => {
      // Update the blueprint in the list
      setMyBlueprints(prev => prev.map(bp => 
        bp.id === 101 ? { // Update the first blueprint as an example
          ...bp,
          title: updateForm.brand_name || bp.title,
          description: updateForm.mission_statement || bp.description,
          lastModifiedBy: "You",
          version: (parseFloat(bp.version) + 0.1).toFixed(1)
        } : bp
      ));
      
      setShowUpdateModal(false);
      setUpdateLoading(false);
    }, 1000);
  }

  const handleDeleteBlueprint = async (blueprintId: number) => {
    if (window.confirm('Are you sure you want to delete this blueprint?')) {
      // Remove from the list
      setMyBlueprints(prev => prev.filter(bp => bp.id !== blueprintId));
    }
  }

  return (
    <div className="w-full p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8 gap-4">
        <div className="flex items-center gap-3">
          <FiBook className="text-2xl lg:text-3xl text-[#d0ed01]" />
          <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">Blueprint Hub</h1>
        </div>
        <button 
          className="px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2 w-full lg:w-auto justify-center"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus className="text-base lg:text-lg" />
          Create Blueprint
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 lg:gap-4 mb-6 lg:mb-8">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`px-3 lg:px-6 py-2 rounded-lg lg:rounded-full font-semibold transition flex items-center gap-2 text-sm lg:text-base whitespace-nowrap ${
              selectedCategory === category
                ? "bg-[#d0ed01] text-black"
                : "bg-[#232323] text-white hover:bg-[#333]"
            }`}
            onClick={() => setSelectedCategory(category as keyof BlueprintCategory)}
          >
            {category === "MVP Experiments" && <FiTarget className="text-base lg:text-lg" />}
            {category === "A/B Tests" && <FiZap className="text-base lg:text-lg" />}
            {category === "Market Research" && <FiBarChart2 className="text-base lg:text-lg" />}
            <span className="hidden sm:inline">{category}</span>
            <span className="sm:hidden">
              {category === "MVP Experiments" ? "MVP" : 
               category === "A/B Tests" ? "A/B" : 
               category === "Market Research" ? "Research" : category}
            </span>
          </button>
        ))}
        <button
          key={MY_BLUEPRINTS}
          className={`px-3 lg:px-6 py-2 rounded-lg lg:rounded-full font-semibold transition flex items-center gap-2 text-sm lg:text-base whitespace-nowrap ${
            selectedCategory === MY_BLUEPRINTS
              ? "bg-[#d0ed01] text-black"
              : "bg-[#232323] text-white hover:bg-[#333]"
          }`}
          onClick={() => setSelectedCategory(MY_BLUEPRINTS)}
        >
          <FiBook className="text-base lg:text-lg" />
          <span className="hidden sm:inline">{MY_BLUEPRINTS}</span>
          <span className="sm:hidden">My BP</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4">
          <div className="flex-1 flex items-center gap-2 bg-[#232323] px-4 py-2 rounded-lg">
            <FiSearch className="text-gray-400 text-base lg:text-lg" />
            <input
              type="text"
              placeholder="Search blueprints..."
              className="bg-transparent text-white outline-none w-full text-sm lg:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative" ref={filterContainerRef}>
            <button
                className="px-4 py-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition w-full lg:w-auto flex items-center justify-center gap-2"
                onClick={() => setShowFilterPopover(prev => !prev)}
            >
                <FiFilter className="text-base lg:text-lg" />
                <span className="text-sm lg:text-base">Filter</span>
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
            <div className="text-center py-8 col-span-3">
              <div className="text-red-500 mb-4">{myBlueprintsError}</div>
              {myBlueprintsError.includes('Authentication') && (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="px-6 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition"
                >
                  Go to Login
                </button>
              )}
              {!myBlueprintsError.includes('Authentication') && (
                <button
                  onClick={() => fetchMyBlueprints()}
                  className="px-6 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition flex items-center gap-2 mx-auto"
                >
                  <FiRefreshCw className="text-lg" />
                  Retry
                </button>
              )}
            </div>
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
              {/* Form fields in exact API parameter sequence */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter your brand name"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.brand_name} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, brand_name: e.target.value }))} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Current Business Stage *</label>
                  <div className="relative">
                    <select 
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] appearance-none cursor-pointer pr-10" 
                      value={updateForm.current_business_stage} 
                      onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, current_business_stage: e.target.value }))} 
                      required 
                    >
                      <option value="" className="bg-black text-gray-400">Select business stage</option>
                      <option value="idea_stage" className="bg-black text-white">Idea Stage (No product/service yet)</option>
                      <option value="pre_launch" className="bg-black text-white">Pre-Launch (Product/service ready but not launched)</option>
                      <option value="launched" className="bg-black text-white">Launched (Actively selling but growing)</option>
                      <option value="scaling" className="bg-black text-white">Scaling (Expanding into new markets, hiring, etc.)</option>
                      <option value="other" className="bg-black text-white">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Business Model *</label>
                  <div className="relative">
                    <select 
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] appearance-none cursor-pointer pr-10" 
                      value={updateForm.business_model} 
                      onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, business_model: e.target.value }))} 
                      required
                    >
                      <option value="" className="bg-black text-gray-400">Select business model</option>
                      <option value="product_based" className="bg-black text-white">Product-Based</option>
                      <option value="service_based" className="bg-black text-white">Service-Based</option>
                      <option value="subscription_based" className="bg-black text-white">Subscription-Based</option>
                      <option value="saas_digital_product" className="bg-black text-white">SaaS / Digital Product</option>
                      <option value="other" className="bg-black text-white">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Freebies/Downloads</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Free templates, guides, tools"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.freebies_downloads} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, freebies_downloads: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Tagline</label>
                  <input 
                    type="text" 
                    placeholder="Your brand tagline or slogan"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.tagline} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, tagline: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Mission Statement</label>
                  <textarea 
                    placeholder="What is your mission?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.mission_statement} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, mission_statement: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Vision</label>
                  <textarea 
                    placeholder="What is your vision for the future?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.brand_vision} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, brand_vision: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Problem Solved</label>
                  <textarea 
                    placeholder="What problem does your business solve?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.problem_solved} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, problem_solved: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Backstory</label>
                  <textarea 
                    placeholder="Tell the story behind your brand"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.brand_backstory} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, brand_backstory: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Emotions</label>
                  <textarea 
                    placeholder="What emotions do you want your brand to evoke?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.brand_emotions} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, brand_emotions: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Company Culture</label>
                  <textarea 
                    placeholder="Describe your company culture and values"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.company_culture} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, company_culture: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Products/Services Description</label>
                  <textarea 
                    placeholder="Describe your products or services"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.products_services_description} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, products_services_description: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Product Categories</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Software, Consulting, E-commerce"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={updateForm.product_categories} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, product_categories: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Upcoming Products</label>
                  <textarea 
                    placeholder="What products or services are you planning to launch?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={updateForm.upcoming_products} 
                    onChange={e => setUpdateForm((f: Partial<MockBlueprintData>) => ({ ...f, upcoming_products: e.target.value }))} 
                  />
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
              {/* Form fields in exact API parameter sequence */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter your brand name"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.brand_name} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, brand_name: e.target.value }))} 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Current Business Stage *</label>
                  <div className="relative">
                    <select 
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] appearance-none cursor-pointer pr-10" 
                      value={createForm.current_business_stage} 
                      onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, current_business_stage: e.target.value }))} 
                    required 
                    >
                      <option value="" className="bg-black text-gray-400">Select business stage</option>
                      <option value="idea_stage" className="bg-black text-white">Idea Stage (No product/service yet)</option>
                      <option value="pre_launch" className="bg-black text-white">Pre-Launch (Product/service ready but not launched)</option>
                      <option value="launched" className="bg-black text-white">Launched (Actively selling but growing)</option>
                      <option value="scaling" className="bg-black text-white">Scaling (Expanding into new markets, hiring, etc.)</option>
                      <option value="other" className="bg-black text-white">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                </div>
                </div>
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Business Model *</label>
                  <div className="relative">
                    <select 
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#d0ed01] appearance-none cursor-pointer pr-10" 
                      value={createForm.business_model} 
                      onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, business_model: e.target.value }))} 
                      required
                    >
                      <option value="" className="bg-black text-gray-400">Select business model</option>
                      <option value="product_based" className="bg-black text-white">Product-Based</option>
                      <option value="service_based" className="bg-black text-white">Service-Based</option>
                      <option value="subscription_based" className="bg-black text-white">Subscription-Based</option>
                      <option value="saas_digital_product" className="bg-black text-white">SaaS / Digital Product</option>
                      <option value="other" className="bg-black text-white">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Freebies/Downloads</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Free templates, guides, tools"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.freebies_downloads} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, freebies_downloads: e.target.value }))} 
                  />
              </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Tagline</label>
                    <input 
                      type="text" 
                    placeholder="Your brand tagline or slogan"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.tagline} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, tagline: e.target.value }))} 
                    />
                  </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Mission Statement</label>
                    <textarea 
                    placeholder="What is your mission?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.mission_statement} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, mission_statement: e.target.value }))} 
                    />
                  </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Vision</label>
                    <textarea 
                    placeholder="What is your vision for the future?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.brand_vision} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, brand_vision: e.target.value }))} 
                    />
              </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Problem Solved</label>
                  <textarea 
                    placeholder="What problem does your business solve?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.problem_solved} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, problem_solved: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Backstory</label>
                  <textarea 
                    placeholder="Tell the story behind your brand"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.brand_backstory} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, brand_backstory: e.target.value }))} 
                  />
                </div>

                <div>
                  <label className="block text-gray-200 font-semibold mb-1">Brand Emotions</label>
                  <textarea 
                    placeholder="What emotions do you want your brand to evoke?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.brand_emotions} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, brand_emotions: e.target.value }))} 
                  />
              </div>

                  <div>
                  <label className="block text-gray-200 font-semibold mb-1">Company Culture</label>
                  <textarea 
                    placeholder="Describe your company culture and values"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.company_culture} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, company_culture: e.target.value }))} 
                    />
                  </div>

                  <div>
                  <label className="block text-gray-200 font-semibold mb-1">Products/Services Description</label>
                  <textarea 
                    placeholder="Describe your products or services"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.products_services_description} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, products_services_description: e.target.value }))} 
                    />
                  </div>

                  <div>
                  <label className="block text-gray-200 font-semibold mb-1">Product Categories</label>
                    <input 
                      type="text" 
                    placeholder="e.g., Software, Consulting, E-commerce"
                      className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01]" 
                    value={createForm.product_categories} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, product_categories: e.target.value }))} 
                    />
              </div>

                  <div>
                  <label className="block text-gray-200 font-semibold mb-1">Upcoming Products</label>
                  <textarea 
                    placeholder="What products or services are you planning to launch?"
                    className="w-full px-3 py-2 rounded bg-black bg-opacity-60 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d0ed01] h-16" 
                    value={createForm.upcoming_products} 
                    onChange={e => setCreateForm((f: MockBlueprintData) => ({ ...f, upcoming_products: e.target.value }))} 
                  />
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