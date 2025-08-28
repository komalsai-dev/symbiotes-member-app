"use client";
import React, { useState } from "react";
import {
  FiBook,
  FiPlay,
  FiFileText,
  FiTarget,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
  FiDownload,
  FiClock,
  FiBarChart2,
  FiUsers,
  FiTrendingUp,
  FiAward,
  FiLayers,
  FiBookOpen,
  FiX,
  FiCalendar,
  FiMessageSquare,
  FiZap,
  FiEye,
  FiExternalLink,
  FiShare2,
  FiImage,
  FiList,
  FiDollarSign
} from "react-icons/fi";

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  format: "video" | "article";
  progress: number;
  category: string;
  icon: React.ReactNode;
}

interface Playbook {
  id: number;
  title: string;
  description: string;
  steps: number;
  completed: boolean;
  icon: React.ReactNode;
}

interface Resource {
  id: number;
  title: string;
  type: "template" | "case-study" | "tool";
  description: string;
  icon: React.ReactNode;
}

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
  previewUrl: string;
  icon: React.ReactNode;
}

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  challenge: string;
  solution: string;
  results: string[];
  icon: React.ReactNode;
}

interface Tool {
  id: number;
  title: string;
  description: string;
  features: string[];
  useCases: string[];
  url: string;
  icon: React.ReactNode;
}

interface ResourceCardProps {
  resource: Template | CaseStudy | Tool | Resource;
  onClick: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  // For tools and templates, make the entire card clickable and redirect to the URL
  if ('url' in resource || 'downloadUrl' in resource) {
    const url = 'url' in resource ? resource.url : (resource as Template).downloadUrl;
    return (
      <div className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="-mt-6">
              {resource.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
              <p className="text-sm text-gray-400">{resource.description}</p>
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#232323] text-white hover:bg-[#d0ed01] hover:text-black transition mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <FiExternalLink className="text-lg" />
          </a>
        </div>
      </div>
    );
  }

  // For case studies, keep the existing card design
  return (
    <div
      className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="-mt-6">
            {resource.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
            <p className="text-sm text-gray-400">{'description' in resource ? resource.description : ''}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#d0ed01]">
          {('category' in resource ? resource.category : 'type' in resource ? resource.type : '') as string}
        </span>
        <button className="px-4 py-2 rounded-lg bg-[#232323] text-white hover:bg-[#d0ed01] hover:text-black transition flex items-center gap-2">
          <FiDownload className="text-lg" />
          Download
        </button>
      </div>
    </div>
  );
};

// Mock data for modules
const modules: Module[] = [
  {
    id: 1,
    title: "Brand Strategy Fundamentals",
    description: "Learn the core principles of building a strong brand",
    duration: "45 min",
    format: "video",
    progress: 75,
    category: "Branding",
    icon: <FiBook className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 2,
    title: "Facebook Ads Mastery",
    description: "Complete guide to running successful Facebook ad campaigns",
    duration: "60 min",
    format: "article",
    progress: 30,
    category: "Ads",
    icon: <FiTrendingUp className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 3,
    title: "Analytics for Growth",
    description: "Understanding and using data to drive growth",
    duration: "30 min",
    format: "video",
    progress: 0,
    category: "Analytics",
    icon: <FiBarChart2 className="text-2xl text-[#d0ed01]" />
  }
];

// Mock data for playbooks
const playbooks: Playbook[] = [
  {
    id: 1,
    title: "Validate Your Idea",
    description: "Step-by-step guide to validating your business idea",
    steps: 5,
    completed: false,
    icon: <FiTarget className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 2,
    title: "Build an MVP",
    description: "Create your Minimum Viable Product efficiently",
    steps: 7,
    completed: true,
    icon: <FiLayers className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 3,
    title: "Get Your First 10 Users",
    description: "Strategies to acquire your initial user base",
    steps: 4,
    completed: false,
    icon: <FiUsers className="text-2xl text-[#d0ed01]" />
  }
];

// Mock data for resources
const resources: Resource[] = [
  {
    id: 1,
    title: "Pitch Deck Template",
    type: "template",
    description: "Professional pitch deck template for startups",
    icon: <FiFileText className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 2,
    title: "Growth Case Study: Dropbox",
    type: "case-study",
    description: "How Dropbox achieved viral growth",
    icon: <FiBookOpen className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    type: "tool",
    description: "Custom analytics dashboard template",
    icon: <FiBarChart2 className="text-2xl text-[#d0ed01]" />
  }
];

// Templates data
const templates: Template[] = [
  {
    id: 1,
    title: "Startup Pitch Deck",
    description: "Professional pitch deck template for startups seeking funding",
    category: "Pitch Deck",
    downloadUrl: "https://www.slidescarnival.com/startup-pitch-deck-template/",
    previewUrl: "https://www.slidescarnival.com/startup-pitch-deck-template/",
    icon: <FiFileText className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 2,
    title: "Social Media Calendar",
    description: "Comprehensive social media planning and scheduling template",
    category: "Marketing",
    downloadUrl: "https://www.notion.so/templates/social-media-calendar",
    previewUrl: "https://www.notion.so/templates/social-media-calendar",
    icon: <FiCalendar className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 3,
    title: "Content Strategy Framework",
    description: "Strategic content planning and execution template",
    category: "Content",
    downloadUrl: "https://www.hubspot.com/resources/template/content-strategy-template",
    previewUrl: "https://www.hubspot.com/resources/template/content-strategy-template",
    icon: <FiBook className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 4,
    title: "Landing Page Wireframe",
    description: "High-converting landing page design template",
    category: "Design",
    downloadUrl: "https://www.figma.com/community/file/landing-page-wireframe-kit",
    previewUrl: "https://www.figma.com/community/file/landing-page-wireframe-kit",
    icon: <FiLayers className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 5,
    title: "Marketing Plan Template",
    description: "Comprehensive marketing strategy and execution plan",
    category: "Strategy",
    downloadUrl: "https://www.template.net/business/marketing/marketing-plan-template/",
    previewUrl: "https://www.template.net/business/marketing/marketing-plan-template/",
    icon: <FiTarget className="text-2xl text-[#d0ed01]" />
  }
];

// Case Studies data
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Dropbox's Viral Growth",
    company: "Dropbox",
    challenge: "Acquiring users in a competitive cloud storage market",
    solution: "Implemented a referral program offering free storage space",
    results: [
      "3900% growth in 15 months",
      "2.8 million direct referral signups",
      "Reduced customer acquisition cost by 60%"
    ],
    icon: <FiTrendingUp className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 2,
    title: "Airbnb's Rebrand Success",
    company: "Airbnb",
    challenge: "Creating a global brand that resonates across cultures",
    solution: "Developed the 'Belong Anywhere' brand strategy",
    results: [
      "43% increase in brand recognition",
      "2.5x growth in social media engagement",
      "Improved brand sentiment by 35%"
    ],
    icon: <FiUsers className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 3,
    title: "Spotify's Content Strategy",
    company: "Spotify",
    challenge: "Differentiating in a crowded music streaming market",
    solution: "Created personalized content and playlist features",
    results: [
      "40% increase in user engagement",
      "2x growth in premium subscriptions",
      "75% of users use personalized features"
    ],
    icon: <FiPlay className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 4,
    title: "Slack's Product Launch",
    company: "Slack",
    challenge: "Breaking into the enterprise communication market",
    solution: "Bottom-up adoption strategy targeting teams",
    results: [
      "8 million daily active users in 3 years",
      "43% of Fortune 100 companies as customers",
      "$7.1 billion valuation at IPO"
    ],
    icon: <FiMessageSquare className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 5,
    title: "Tesla's Marketing Revolution",
    company: "Tesla",
    challenge: "Selling electric cars in a traditional market",
    solution: "Direct-to-consumer model with zero advertising",
    results: [
      "$0 spent on traditional advertising",
      "2.3 million pre-orders for Model 3",
      "Market cap exceeding traditional automakers"
    ],
    icon: <FiZap className="text-2xl text-[#d0ed01]" />
  }
];

// Tools data
const tools: Tool[] = [
  {
    id: 1,
    title: "Google Analytics",
    description: "Comprehensive web analytics platform",
    features: [
      "Real-time user tracking",
      "Conversion tracking",
      "Custom reporting",
      "E-commerce analytics"
    ],
    useCases: [
      "Website traffic analysis",
      "User behavior tracking",
      "Conversion optimization",
      "Marketing campaign tracking"
    ],
    url: "https://analytics.google.com",
    icon: <FiBarChart2 className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 2,
    title: "Canva",
    description: "Free graphic design platform",
    features: [
      "Drag-and-drop editor",
      "Thousands of templates",
      "Stock photos and icons",
      "Collaboration tools"
    ],
    useCases: [
      "Social media graphics",
      "Marketing materials",
      "Presentations",
      "Infographics"
    ],
    url: "https://canva.com",
    icon: <FiImage className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 3,
    title: "Buffer",
    description: "Social media management platform",
    features: [
      "Post scheduling",
      "Analytics dashboard",
      "Team collaboration",
      "Content calendar"
    ],
    useCases: [
      "Social media scheduling",
      "Content planning",
      "Performance tracking",
      "Team management"
    ],
    url: "https://buffer.com",
    icon: <FiShare2 className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 4,
    title: "Ahrefs",
    description: "SEO and backlink analysis tool",
    features: [
      "Keyword research",
      "Backlink analysis",
      "Site audit",
      "Rank tracking"
    ],
    useCases: [
      "SEO optimization",
      "Content research",
      "Competitor analysis",
      "Link building"
    ],
    url: "https://ahrefs.com",
    icon: <FiSearch className="text-2xl text-[#d0ed01]" />
  },
  {
    id: 5,
    title: "Trello",
    description: "Project management and collaboration tool",
    features: [
      "Kanban boards",
      "Task management",
      "Team collaboration",
      "Automation"
    ],
    useCases: [
      "Project management",
      "Content calendar",
      "Task tracking",
      "Team coordination"
    ],
    url: "https://trello.com",
    icon: <FiList className="text-2xl text-[#d0ed01]" />
  }
];

interface CategoryDetail {
  id: string;
  title: string;
  description: string;
  sections: {
    title: string;
    content: {
      type: 'text' | 'list' | 'link' | 'video';
      data: string | string[] | { text: string; url: string } | { title: string; description: string; url: string; thumbnail: string };
    }[];
  }[];
  icon: React.ReactElement;
}

type CategoryDetails = {
  [key: string]: CategoryDetail;
};

// Category details data
const categoryDetails: CategoryDetails = {
  branding: {
    id: 'branding',
    title: 'Branding Fundamentals',
    description: 'Master the art of brand building and visual identity',
    icon: <FiBook className="text-2xl text-[#d0ed01]" />,
    sections: [
      {
        title: 'Color Theory & Psychology',
        content: [
          {
            type: 'text',
            data: 'Understanding how colors influence perception and emotions is crucial for effective branding.'
          },
          {
            type: 'video',
            data: {
              title: 'Color Theory for Designers',
              description: 'Learn color theory in 12 minutes',
              url: 'https://www.youtube.com/watch?v=_2LLXnUdUIc',
              thumbnail: 'https://img.youtube.com/vi/_2LLXnUdUIc/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        title: 'Typography Fundamentals',
        content: [
          {
            type: 'text',
            data: 'Typography is the art of arranging type to make written language legible, readable, and appealing.'
          },
          {
            type: 'video',
            data: {
              title: 'Typography Basics',
              description: 'Typography fundamentals in 10 minutes',
              url: 'https://www.youtube.com/watch?v=sByzHoiYFX0',
              thumbnail: 'https://img.youtube.com/vi/sByzHoiYFX0/maxresdefault.jpg'
            }
          }
        ]
      }
    ]
  },
  ads: {
    id: 'ads',
    title: 'Advertising Mastery',
    description: 'Learn effective advertising strategies and best practices',
    icon: <FiTrendingUp className="text-2xl text-[#d0ed01]" />,
    sections: [
      {
        title: 'Facebook Ads Tutorial',
        content: [
          {
            type: 'text',
            data: 'Learn how to create and optimize Facebook ad campaigns for maximum ROI.'
          },
          {
            type: 'video',
            data: {
              title: 'Facebook Ads Tutorial 2024',
              description: 'Complete Facebook Ads course for beginners',
              url: 'https://www.youtube.com/watch?v=UvxLnNQonU0',
              thumbnail: 'https://img.youtube.com/vi/UvxLnNQonU0/maxresdefault.jpg'
            }
          }
        ]
      },
      {
        title: 'Google Ads Tutorial',
        content: [
          {
            type: 'text',
            data: 'Master Google Ads to reach your target audience effectively.'
          },
          {
            type: 'video',
            data: {
              title: 'Google Ads Tutorial 2024',
              description: 'Step-by-step Google Ads guide',
              url: 'https://www.youtube.com/watch?v=2tqHrF8jQoQ',
              thumbnail: 'https://img.youtube.com/vi/2tqHrF8jQoQ/maxresdefault.jpg'
            }
          }
        ]
      }
    ]
  },
  analytics: {
    id: 'analytics',
    title: 'Analytics & Data',
    description: 'Master data analysis and make data-driven decisions',
    icon: <FiBarChart2 className="text-2xl text-[#d0ed01]" />,
    sections: [
      {
        title: 'Google Analytics 4',
        content: [
          {
            type: 'text',
            data: 'Learn to track and analyze your website traffic effectively.'
          },
          {
            type: 'video',
            data: {
              title: 'Google Analytics 4 Tutorial',
              description: 'Complete GA4 course for beginners',
              url: 'https://www.youtube.com/watch?v=8C5UvxX1LdY',
              thumbnail: 'https://img.youtube.com/vi/8C5UvxX1LdY/maxresdefault.jpg'
            }
          }
        ]
      }
    ]
  },
  monetization: {
    id: 'monetization',
    title: 'Monetization Strategies',
    description: 'Learn effective ways to generate revenue',
    icon: <FiDollarSign className="text-2xl text-[#d0ed01]" />,
    sections: [
      {
        title: 'Business Models',
        content: [
          {
            type: 'text',
            data: 'Explore different revenue models and pricing strategies.'
          },
          {
            type: 'video',
            data: {
              title: 'Business Model Canvas',
              description: 'How to create a business model',
              url: 'https://www.youtube.com/watch?v=IP0cUBWTgpY',
              thumbnail: 'https://img.youtube.com/vi/IP0cUBWTgpY/maxresdefault.jpg'
            }
          }
        ]
      }
    ]
  }
};

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<string>("playbooks");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [showPlaybookModal, setShowPlaybookModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Template | CaseStudy | Tool | Resource | null>(null);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <div className="w-full p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <FiBook className="text-3xl text-[#d0ed01]" />
          <h1 className="text-3xl font-bold text-white">Learning Hub</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white">
            <FiAward className="text-lg text-[#d0ed01]" />
            <span>Level 3 Explorer</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <FiClock className="text-lg text-[#d0ed01]" />
            <span>12h 30m Learned</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8">
        {[
          { id: "playbooks", label: "Playbooks", icon: <FiBook /> },
          { id: "modules", label: "Micro-Learning", icon: <FiPlay /> },
          { id: "path", label: "Learning Path", icon: <FiTarget /> },
          { id: "resources", label: "Resources", icon: <FiFileText /> }
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-[#d0ed01] text-black"
                : "bg-[#232323] text-white hover:bg-[#333]"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-8">
        {/* Playbooks Section */}
        {activeTab === "playbooks" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playbooks.map((playbook) => (
              <div
                key={playbook.id}
                className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="-mt-1">
                      {playbook.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{playbook.title}</h3>
                      <p className="text-sm text-gray-400">{playbook.description}</p>
                    </div>
                  </div>
                  {playbook.completed ? (
                    <FiCheckCircle className="text-[#d0ed01]" />
                  ) : (
                    <FiAlertCircle className="text-yellow-500" />
                  )}
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span>{playbook.steps} steps</span>
                  <span>{playbook.completed ? "Completed" : "In Progress"}</span>
                </div>
                <button
                  className="w-full py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition flex items-center justify-center gap-2"
                  onClick={() => {
                    setSelectedPlaybook(playbook);
                    setShowPlaybookModal(true);
                  }}
                >
                  <FiBookOpen className="text-lg" />
                  Start Playbook
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Micro-Learning Section */}
        {activeTab === "modules" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                {["All", "Branding", "Ads", "Analytics", "Monetization"].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-lg bg-[#232323] text-white hover:bg-[#333] transition"
                    onClick={() => {
                      if (category !== "All") {
                        setSelectedCategory(category.toLowerCase());
                        setShowCategoryModal(true);
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  className="bg-[#232323] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0ed01]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-[#18181b] rounded-xl p-6 border border-white/10 backdrop-blur-lg hover:border-[#d0ed01]/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="-mt-1">
                        {module.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                        <p className="text-sm text-gray-400">{module.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-[#d0ed01]">{module.duration}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">{module.format}</span>
                      <span className="text-[#d0ed01]">{module.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-[#232323] rounded-full h-2">
                      <div
                        className="bg-[#d0ed01] h-2 rounded-full"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    <button
                      className="w-full py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition flex items-center justify-center gap-2"
                      onClick={() => {
                        setSelectedModule(module);
                        setShowModuleModal(true);
                      }}
                    >
                      {module.format === "video" ? (
                        <FiPlay className="text-lg" />
                      ) : (
                        <FiFileText className="text-lg" />
                      )}
                      Continue Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Learning Path Section */}
        {activeTab === "path" && (
          <div className="bg-[#18181b] rounded-xl p-8 border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Personalized Learning Path</h2>
              <p className="text-gray-400">Let AI guide your learning journey based on your goals</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <button className="w-full py-4 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center justify-center gap-2">
                <FiTarget className="text-lg" />
                Start Your Learning Path
              </button>
            </div>
          </div>
        )}

        {/* Resources Section */}
        {activeTab === "resources" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                {["All", "Templates", "Case Studies", "Tools"].map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 rounded-lg ${
                      selectedResourceType === type
                        ? "bg-[#d0ed01] text-black"
                        : "bg-[#232323] text-white hover:bg-[#333]"
                    } transition`}
                    onClick={() => setSelectedResourceType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <FiSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="bg-[#232323] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0ed01]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedResourceType === "All" && resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onClick={() => {
                    setSelectedResource(resource);
                    setShowResourceModal(true);
                  }}
                />
              ))}
              {selectedResourceType === "Templates" && templates.map((template) => (
                <ResourceCard
                  key={template.id}
                  resource={template}
                  onClick={() => {
                    setSelectedResource(template);
                    setShowResourceModal(true);
                  }}
                />
              ))}
              {selectedResourceType === "Case Studies" && caseStudies.map((caseStudy) => (
                <ResourceCard
                  key={caseStudy.id}
                  resource={caseStudy}
                  onClick={() => {
                    setSelectedResource(caseStudy);
                    setShowResourceModal(true);
                  }}
                />
              ))}
              {selectedResourceType === "Tools" && tools.map((tool) => (
                <ResourceCard
                  key={tool.id}
                  resource={tool}
                  onClick={() => {
                    setSelectedResource(tool);
                    setShowResourceModal(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Module Modal */}
      {showModuleModal && selectedModule && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-8 w-full max-w-4xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {selectedModule.icon}
                <h2 className="text-2xl font-bold text-white">{selectedModule.title}</h2>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowModuleModal(false)}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{selectedModule.duration}</span>
                <span>{selectedModule.format}</span>
              </div>
              <p className="text-white">{selectedModule.description}</p>
              {selectedModule.format === "video" ? (
                <div className="aspect-video bg-[#232323] rounded-lg flex items-center justify-center">
                  <FiPlay className="text-4xl text-[#d0ed01]" />
                </div>
              ) : (
                <div className="bg-[#232323] rounded-lg p-6">
                  <p className="text-white">Article content will be displayed here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Playbook Modal */}
      {showPlaybookModal && selectedPlaybook && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-8 w-full max-w-4xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {selectedPlaybook.icon}
                <h2 className="text-2xl font-bold text-white">{selectedPlaybook.title}</h2>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowPlaybookModal(false)}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="space-y-6">
              <p className="text-white">{selectedPlaybook.description}</p>
              <div className="space-y-4">
                {Array.from({ length: selectedPlaybook.steps }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-[#232323] rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#d0ed01] flex items-center justify-center text-black font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">Step {index + 1}</h3>
                      <p className="text-gray-400">Step description will be displayed here...</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-[#232323] text-white hover:bg-[#d0ed01] hover:text-black transition">
                      Start
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resource Modal */}
      {showResourceModal && selectedResource && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-8 w-full max-w-4xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                {selectedResource.icon}
                <h2 className="text-2xl font-bold text-white">{selectedResource.title}</h2>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowResourceModal(false)}
              >
                <FiX className="text-xl" />
              </button>
            </div>
            <div className="space-y-6">
              {'description' in selectedResource && (
                <p className="text-white">{selectedResource.description}</p>
              )}
              {'company' in selectedResource && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Challenge</h3>
                    <p className="text-gray-400">{selectedResource.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Solution</h3>
                    <p className="text-gray-400">{selectedResource.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Results</h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {selectedResource.results.map((result, index) => (
                        <li key={index}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {'features' in selectedResource && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {selectedResource.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Use Cases</h3>
                    <ul className="list-disc list-inside text-gray-400">
                      {selectedResource.useCases.map((useCase, index) => (
                        <li key={index}>{useCase}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {'downloadUrl' in selectedResource && (
                <div className="flex gap-4">
                  <a
                    href={selectedResource.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2"
                  >
                    <FiDownload className="text-lg" />
                    Download Template
                  </a>
                  <a
                    href={selectedResource.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition flex items-center gap-2"
                  >
                    <FiEye className="text-lg" />
                    Preview
                  </a>
                </div>
              )}
              {'url' in selectedResource && (
                <a
                  href={selectedResource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#b6d000] transition flex items-center gap-2"
                >
                  <FiExternalLink className="text-lg" />
                  Visit Tool
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Category Detail Modal */}
      {showCategoryModal && selectedCategory && categoryDetails[selectedCategory] && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-xl p-4 w-full max-w-3xl border border-white/10">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {categoryDetails[selectedCategory].icon}
                <h2 className="text-xl font-bold text-white">{categoryDetails[selectedCategory].title}</h2>
              </div>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setShowCategoryModal(false)}
              >
                <FiX className="text-lg" />
              </button>
            </div>
            <p className="text-gray-400 mb-4 text-sm">{categoryDetails[selectedCategory].description}</p>
            <div className="space-y-4">
              {categoryDetails[selectedCategory].sections.map((section, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-base font-semibold text-white mb-1">{section.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-[#232323] rounded-lg px-3 py-2 flex items-center min-h-[72px] max-h-[90px] overflow-hidden hover:border hover:border-[#d0ed01]/30 transition-all duration-300">
                        {item.type === 'text' && (
                          <p className="text-gray-400 text-xs leading-snug line-clamp-2 w-full">{item.data as string}</p>
                        )}
                        {item.type === 'video' && (
                          <>
                            <div className="flex-shrink-0 w-24 h-14 rounded-md overflow-hidden mr-3">
                              <img
                                src={(item.data as { thumbnail: string }).thumbnail}
                                alt={(item.data as { title: string }).title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex flex-col justify-center flex-1 min-w-0">
                              <h4 className="text-white font-medium text-xs truncate">
                                {(item.data as { title: string }).title}
                              </h4>
                              <p className="text-gray-400 text-xs truncate">
                                {(item.data as { description: string }).description}
                              </p>
                              <a
                                href={(item.data as { url: string }).url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#d0ed01] hover:underline text-xs mt-1"
                              >
                                <FiPlay className="text-xs" />
                                Watch Tutorial
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 