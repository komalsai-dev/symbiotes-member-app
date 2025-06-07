"use client";
import React, { useState, ReactNode } from "react";
import { FiSearch, FiBookOpen, FiUsers, FiCreditCard, FiSettings, FiPlayCircle, FiDownload, FiChevronDown, FiChevronUp, FiHeadphones, FiMessageCircle, FiZap, FiCheckSquare, FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRobot } from "react-icons/fa6";

const knowledgeBaseCategories = [
  { icon: <FiBookOpen className="text-2xl text-[#d0ed01]" />, label: "Getting Started" },
  { icon: <FiZap className="text-2xl text-[#d0ed01]" />, label: "Using Blueprints" },
  { icon: <FiUsers className="text-2xl text-[#d0ed01]" />, label: "Organizations & Teams" },
  { icon: <FiCreditCard className="text-2xl text-[#d0ed01]" />, label: "Billing & Plans" },
  { icon: <FiSettings className="text-2xl text-[#d0ed01]" />, label: "Settings & Permissions" },
];

const faqList = [
  {
    q: "How do I create an organization?",
    a: "Click on the 'Create Organization' button in the Organization section. Give it a name, select your workspace color, and invite team members immediately.",
  },
  {
    q: "What are the blueprint stages?",
    a: "Idea → Draft → Review → Execution → Completed. Each stage allows you to add collaborators, define tasks, and track metrics.",
  },
  {
    q: "How do I invite collaborators?",
    a: "Inside your project or blueprint, open the 'Members' tab. Use the Invite button to add by email. They'll get instant access.",
  },
];

const tutorials = [
  { title: "Create Your First Organization", length: "1:20", thumbnail: "/images/tutorial1.jpg" },
  { title: "Launch Your First Blueprint", length: "1:10", thumbnail: "/images/tutorial2.jpg" },
  { title: "Invite Collaborators", length: "1:05", thumbnail: "/images/tutorial3.jpg" },
  { title: "Understand Blueprint Lifecycle", length: "1:30", thumbnail: "/images/tutorial4.jpg" },
];

const resources = [
  { title: "Startup Blueprint Checklist (PDF)", icon: <FiCheckSquare className="text-xl text-[#d0ed01]" />, abstract: "A step-by-step checklist for launching your startup.", file: "blueprint-checklist.pdf" },
  { title: "Team Onboarding Guide (PDF)", icon: <FiUsers className="text-xl text-[#d0ed01]" />, abstract: "Best practices for onboarding new team members.", file: "onboarding-guide.pdf" },
  { title: "Execution Timeline Template (Excel)", icon: <FiBookOpen className="text-xl text-[#d0ed01]" />, abstract: "Plan and track your execution phases.", file: "timeline-template.xlsx" },
];

const aiSamples = [
  {
    q: "How do I start a blueprint?",
    a: (
      <>
        To start a new blueprint, click on the <b>➕ Create Blueprint</b> button in the top Quick Actions panel.<br />
        You'll be asked to name your blueprint, set goals, and define execution phases.<br />
        Would you like me to open the Create Blueprint modal now?<br />
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Yes</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">No, thanks</button>
        </div>
      </>
    ),
  },
  {
    q: "Can I invite my team to my organization?",
    a: (
      <>
        Yes! Head over to the Organization section → <b>Members</b>.<br />
        Click on <b>➕ Invite</b>, then enter their email addresses and assign roles (Viewer, Editor, Owner).<br />
        Would you like to invite someone now?<br />
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Invite Now</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Show me how</button>
        </div>
      </>
    ),
  },
  {
    q: "Where can I find my billing info?",
    a: (
      <>
        Go to the <b>⚙️ Settings</b> section → <b>Billing</b> tab.<br />
        There you'll see your current plan, past invoices, and payment method.<br />
        Would you like to view your billing dashboard?<br />
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Open Billing</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Set Reminder</button>
        </div>
      </>
    ),
  },
];

// Featured Q&A with intent matching
const featuredQA = [
  {
    matches: [
      'how do i start from zero',
      'how do i start from scratch',
      'where should i begin',
      'just joined, what now',
      'i just got started',
      'idk what to do first',
      "i'm starting my project, what should i do first",
      'i am starting my project, what should i do first',
      'i just signed up',
      'what should i do first',
      'first thing to do',
      'new user',
    ],
    answer: (
      <>
        Start by identifying the core problem your product will solve.<br />
        Inside our dashboard, go to Blueprints → Create New, where you can define your problem, audience, and first feature idea.<br />
        We'll guide you through the stages: Idea → Draft → Execution → Validation.<br /><br />
        👉 Would you like help creating your first blueprint?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Start Blueprint</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">See Example</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Launch Starter Guide</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Create Org</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Help Me Choose</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'what are the basic principles of marketing',
      'what are the core principles of marketing',
      'any tips for early-stage marketing',
      'how do i promote my startup',
      'marketing rules for saas',
      'startup marketing rules',
    ],
    answer: (
      <>
        Here are 4 key startup marketing rules:<br />
        Know your audience deeply<br />
        Focus on one channel at a time (e.g., email, content, or cold outreach)<br />
        Test → Measure → Iterate fast<br />
        Speak like a human, not a brand robot.<br /><br />
        👉 Want a startup marketing checklist?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Download PDF</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">See Examples</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Use Marketing Template</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Watch Tips</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'how to get first clients or users',
      'how can i get my first users or clients',
      'getting users fast',
      'finding initial clients',
      'grow users without money',
      'how to grow users fast free methods',
    ],
    answer: (
      <>
        Here's what usually works well for early-stage founders:<br />
        Start with your network — Ask friends, ex-colleagues, startup groups<br />
        Use your Blueprint's 'Outreach Task' to define your client funnel<br />
        Offer early users a free tier or direct value (not a pitch).<br /><br />
        👉 Want to activate your client discovery module?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Start Outreach Blueprint</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Try Client Outreach Flow</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'where can i get templates for growth and branding',
      'where do i get templates and resources',
      'free pitch deck templates',
      'do you have docs i can use',
      'help with branding kit or checklist',
    ],
    answer: (
      <>
        You can find free templates under:<br />
        → Learn &gt; Resources<br />
        We've included:<br />
        Branding kits<br />
        Social media post templates<br />
        Growth OKR sheets<br />
        Pitch deck slides<br /><br />
        👉 Would you like me to open the Template Library for you?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Open Templates</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Explore Resources</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Download All</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'how do i keep my team or project efficient',
      'how can i track my team or project performance',
      'productivity tips',
      'how to keep project on track',
      'managing efficiency for my startup',
    ],
    answer: (
      <>
        Focus on clarity, not just tasks. Here's how to boost efficiency:<br />
        Use our Blueprint tracker to set clear stages<br />
        Assign tasks with owners + deadlines<br />
        Use weekly 'Pulse Check' surveys inside the project dashboard<br />
        Use Quick Actions to automate repeat work<br /><br />
        👉 Want to enable the productivity tracker now?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Enable Tracker</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Add Pulse Survey</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      "what's the fastest way to get feedback",
      "what if i want to ask for feedback from users",
      "how do i get reviews",
      "collecting user input",
      "feedback tool built in",
    ],
    answer: (
      <>
        Use our instant feedback tools:<br />
        Add a 'Feedback Request' task inside any blueprint<br />
        Share your public project link with stakeholders<br />
        Use AI Copilot to summarize and tag insights<br /><br />
        👉 Start collecting feedback now?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Generate Link</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Create Feedback Form</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'can i create a blueprint from scratch',
      'create blueprint from scratch',
      'start blueprint from blank',
    ],
    answer: (
      <>
        Yes. Go to the Blueprint section and click ➕ 'Create New'.<br />
        Start from blank, or choose from a template like:<br />
        Launch Plan<br />
        Growth Strategy<br />
        User Research Flow<br /><br />
        👉 Would you like a suggestion based on your startup type?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Show Templates</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'how do i collaborate with others',
      'can i collaborate with people',
      'add teammates',
      'work with someone else',
      'invite cofounder or client',
    ],
    answer: (
      <>
        Invite team members to your organization, assign them roles, and mention them inside tasks or feedback threads.<br />
        Collaboration works across Projects, Tasks, and Blueprints.<br /><br />
        👉 Invite teammates now?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Invite</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Show How</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Invite Now</button>
          <button className="px-4 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Set Roles</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'can i see examples or successful projects',
      'where can i learn from others',
      'any real startup examples',
      'what are other founders doing',
      'i want inspiration',
    ],
    answer: (
      <>
        Yes! Go to the Community section to explore public blueprints and case studies from other founders.<br />
        Use filters like 'Early Stage', 'AI Tools', or 'B2B SaaS'.<br /><br />
        👉 Open Community Highlights?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Explore Now</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'where can i find free insights for my industry',
      'open latest insights',
      'industry insights',
    ],
    answer: (
      <>
        Check the Learn section for curated growth insights, market research, and trend breakdowns.<br />
        We've tagged them by industry: AI, eCommerce, FinTech, etc.<br /><br />
        👉 Open latest insights?<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Go to Insights</button>
        </div>
      </>
    ),
  },
  // Fallback-friendly common questions
  {
    matches: [
      'i need help',
      'idk what to do',
      'can you help me',
      "i'm lost",
      'im lost',
      'what now',
      'help',
      'no idea how to start',
      'idk',
      'can you assist me',
      'how this thing works',
    ],
    answer: (
      <>
        Absolutely — let's get you going. What are you trying to do right now?<br /><br />
        👷 Start a new project or blueprint?<br />
        👥 Invite someone to your team or org?<br />
        📊 See progress or tasks you're working on?<br />
        📚 Learn how things work here?<br /><br />
        👉 Choose one to continue or explore Help Center below:<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-3 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Start Something New</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Invite Team</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">View Progress</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Open Help Center</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'i just signed up',
      'what should i do first',
      'just signed up',
      'first thing to do',
      'new user',
    ],
    answer: (
      <>
        Welcome! To kick off, here's a quick startup checklist:<br /><br />
        ✅ Create your Organization<br />
        🔧 Start your first Blueprint<br />
        🧑‍🤝‍🧑 Invite collaborators or teammates<br />
        🤖 Use Copilot to break your idea into actionable steps<br /><br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-3 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Create Org</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Start Blueprint</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Invite Member</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Launch Copilot</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'i feel lost',
      'what am i supposed to do here',
      'lost',
      'confused',
    ],
    answer: (
      <>
        No problem! Think of this like your founder's OS — we help you go from 0 to 1.<br />
        Try starting with one of these:<br /><br />
        Set up your first startup idea with a Blueprint<br />
        Create a task list and share it with your team<br />
        Ask Copilot for help generating growth plans<br /><br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-3 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Start Now</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">View Examples</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Try Copilot</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      "what's this platform for again",
      "what does this app do",
      "what is this",
      "what is this app",
      "what is this platform",
    ],
    answer: (
      <>
        This platform is your SaaS founder's workspace — we help you build, launch, grow, and manage your project or business:<br /><br />
        🚀 Turn ideas into projects<br />
        🤖 Use AI to generate insights and structure<br />
        📈 Track progress with real-time dashboards<br />
        👥 Collaborate with your team or clients<br /><br />
        👉 Start exploring with a guided setup:<br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-3 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Take a Tour</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Launch First Project</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Invite Team</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'how can you help me',
      'what do you do',
      'how can you assist',
      'how can you support me',
    ],
    answer: (
      <>
        Here's how we can help:<br /><br />
        Guide you from idea to launch<br />
        Structure your tasks with Blueprints<br />
        Use AI to write, plan, and track<br />
        Connect with other builders through community<br /><br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-3 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Show Tools</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Start with Copilot</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'is there a tutorial',
      'can i see how it works',
      'show me a demo',
      'how does it work',
      'product tour',
    ],
    answer: (
      <>
        Yes! You can:<br /><br />
        🧭 Take the interactive onboarding<br />
        📹 Watch a short demo video<br />
        🔍 Browse Help Center guides<br /><br />
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className="px-3 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Take Product Tour</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Watch Demo</button>
          <button className="px-3 py-1 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#333] transition">Browse Help Center</button>
        </div>
      </>
    ),
  },
  {
    matches: [
      'can i ask anything',
      'you understand startup stuff',
      'can i ask about startups',
      'do you know about startups',
    ],
    answer: (
      <>
        Yes! Ask about:<br /><br />
        Starting from zero<br />
        Getting your first users<br />
        Launching a product<br />
        Growing with no-code tools<br />
        Marketing, branding, hiring<br /><br />
        Our AI assistant is trained on startup founder workflows.
      </>
    ),
  },
];

export default function HelpCenterPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [tutorialIndex, setTutorialIndex] = useState(0);
  // Chatbot state
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: React.ReactElement }[]>([
    { sender: 'ai', text: <span>Hi! I&apos;m Symbiote AI. How can I help you today?</span> }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Simulate AI response
  const getAiResponse = (question: string): React.ReactElement => {
    if (question.toLowerCase().includes('blueprint')) {
      return <span>To start a new blueprint, click on the ➕ 'Create Blueprint' button in the top Quick Actions panel. You'll be asked to name your blueprint, set goals, and define execution phases.</span>;
    }
    if (question.toLowerCase().includes('invite')) {
      return <span>Yes! Go to Organization → Members, click ➕ Invite, enter their email, and assign a role.</span>;
    }
    if (question.toLowerCase().includes('billing')) {
      return <span>Go to Settings → Billing tab to view your plan, invoices, and payment method.</span>;
    }
    return <span>I'm here to help! Please provide more details or try asking about blueprints, inviting team, or billing.</span>;
  };

  // Enhanced AI response with intent matching
  function normalize(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  }

  function findBestAnswer(question: string): React.ReactElement | null {
    const normQ = normalize(question);
    for (const qa of featuredQA) {
      for (const match of qa.matches) {
        if (normQ.includes(normalize(match))) {
          return qa.answer;
        }
      }
    }
    return null;
  }

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { sender: 'user', text: <span>{chatInput}</span> };
    setChatMessages((msgs) => [...msgs, userMsg]);
    setChatInput('');
    setIsAiTyping(true);
    setTimeout(() => {
      // userMsg.text is a ReactElement, so get the string for matching
      const userText = typeof userMsg.text === 'string' ? userMsg.text : (userMsg.text.props?.children ?? '');
      let aiAnswer = findBestAnswer(userText);
      if (!aiAnswer) {
        aiAnswer = getAiResponse(userText);
      }
      const aiMsg = { sender: 'ai', text: aiAnswer };
      setChatMessages((msgs) => [...msgs, aiMsg]);
      setIsAiTyping(false);
    }, 900);
  };

  return (
    <div className="relative w-full min-h-screen p-8 bg-[linear-gradient(120deg,rgba(208,237,1,0.08)_0%,rgba(24,24,27,0.98)_100%)]">
      {/* Floating AI Chatbot Widget with backdrop for close */}
      <>
        {!showAiChat && (
          <div
            className="fixed bottom-8 right-8 z-50 cursor-pointer"
            onClick={() => setShowAiChat(true)}
          >
            <div className="bg-[#18181b] border border-[#d0ed01]/40 rounded-full shadow-2xl p-4 flex items-center gap-2 hover:scale-105 transition-all backdrop-blur-md">
              <FaRobot className="text-2xl text-[#d0ed01] animate-pulse" />
              <span className="text-white font-semibold">Ask Symbiote AI</span>
            </div>
          </div>
        )}
        {showAiChat && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/10"
              onClick={() => setShowAiChat(false)}
            />
            {/* Chatbot Panel */}
            <div className="fixed bottom-8 right-8 z-50">
              <div className="bg-[#18181b] border border-[#d0ed01]/40 rounded-2xl shadow-2xl p-10 w-[520px] flex flex-col gap-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaRobot className="text-2xl text-[#d0ed01] animate-pulse" />
                    <span className="text-white font-bold text-lg">Symbiote AI</span>
                  </div>
                  <button className="text-gray-400 hover:text-white" onClick={() => setShowAiChat(false)}><FiX /></button>
                </div>
                <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto bg-[#232323] rounded-xl p-6 mb-2">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}> 
                      <div className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm shadow ${msg.sender === 'user' ? 'bg-[#d0ed01] text-black' : 'bg-[#232323] text-[#d0ed01] border border-[#d0ed01]/20'}`}>
                        {typeof msg.text === 'string' ? msg.text : msg.text}
                      </div>
                    </div>
                  ))}
                  {isAiTyping && <div className="text-xs text-gray-400">Symbiote AI is typing...</div>}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg bg-[#232323] text-white placeholder-gray-400 outline-none border border-[#d0ed01]/20"
                    placeholder="Type your question..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
                  />
                  <button
                    className="px-3 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition"
                    onClick={handleSendChat}
                    disabled={!chatInput.trim()}
                  >Send</button>
                </div>
              </div>
            </div>
          </>
        )}
      </>

      {/* Main Help Center Content */}
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <FiHeadphones className="text-3xl text-[#d0ed01]" />
          <h1 className="text-3xl font-bold text-white">Help Center</h1>
          <span className="ml-auto text-sm text-gray-400">Light/Dark Toggle</span>
        </div>
        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-6">
          <FiSearch className="text-xl text-gray-400" />
          <input className="flex-1 bg-[#232323] text-white px-6 py-3 rounded-xl outline-none border-none placeholder-gray-400" placeholder="Search help articles, topics, or ask Symbiote AI..." />
        </div>
        {/* Knowledge Base Categories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          {knowledgeBaseCategories.map((cat, i) => (
            <div key={i} className="bg-[rgba(24,24,27,0.95)] border border-white/10 rounded-2xl p-5 flex flex-col items-center gap-2 shadow-lg hover:border-[#d0ed01]/40 hover:scale-105 transition-all cursor-pointer">
              {cat.icon}
              <span className="text-white font-semibold text-sm text-center">{cat.label}</span>
            </div>
          ))}
        </div>
        {/* FAQ Preview */}
        <div className="bg-[rgba(24,24,27,0.95)] border border-white/10 rounded-2xl p-6 shadow-lg mb-8">
          <div className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiMessageCircle className="text-[#d0ed01]" /> FAQ</div>
          <div className="flex flex-col gap-3">
            {faqList.map((item, idx) => (
              <div key={idx} className="bg-[#232323] rounded-xl p-4 flex flex-col gap-2 shadow-md">
                <button className="flex items-center justify-between w-full text-left text-white font-semibold text-base" onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}>
                  {item.q}
                  {faqOpen === idx ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {faqOpen === idx && <div className="text-gray-400 text-sm mt-2">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
        {/* Quick Start Tutorials Carousel */}
        <div className="bg-[rgba(24,24,27,0.95)] border border-white/10 rounded-2xl p-6 shadow-lg mb-8">
          <div className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiPlayCircle className="text-[#d0ed01]" /> Quick Start Tutorials</div>
          <div className="flex items-center gap-6">
            <button onClick={() => setTutorialIndex((tutorialIndex - 1 + tutorials.length) % tutorials.length)} className="p-2 rounded-full bg-[#232323] text-[#d0ed01] hover:bg-[#d0ed01] hover:text-black transition"><FiChevronLeft /></button>
            <div className="flex flex-col items-center gap-2 w-60">
              <div className="w-full h-32 bg-[#18181b] rounded-xl flex items-center justify-center overflow-hidden mb-2">
                <img src={tutorials[tutorialIndex].thumbnail} alt={tutorials[tutorialIndex].title} className="object-cover w-full h-full" />
              </div>
              <span className="text-white font-semibold text-base text-center">{tutorials[tutorialIndex].title}</span>
              <span className="text-xs text-gray-400">{tutorials[tutorialIndex].length} min</span>
              <button className="mt-2 px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition flex items-center gap-1">Watch <FiPlayCircle /></button>
            </div>
            <button onClick={() => setTutorialIndex((tutorialIndex + 1) % tutorials.length)} className="p-2 rounded-full bg-[#232323] text-[#d0ed01] hover:bg-[#d0ed01] hover:text-black transition"><FiChevronRight /></button>
          </div>
        </div>
        {/* Downloadable Resources */}
        <div className="bg-[rgba(24,24,27,0.95)] border border-white/10 rounded-2xl p-6 shadow-lg mb-8">
          <div className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiDownload className="text-[#d0ed01]" /> Downloadable Resources</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((res, idx) => (
              <div key={idx} className="bg-[#232323] rounded-xl p-5 flex flex-col gap-2 shadow-md border border-[#d0ed01]/10 hover:border-[#d0ed01]/40 transition-all">
                <div className="flex items-center gap-2 mb-2">{res.icon}<span className="text-white font-semibold text-base">{res.title}</span></div>
                <div className="text-gray-400 text-xs mb-2">{res.abstract}</div>
                <button className="mt-auto px-4 py-1 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition flex items-center gap-1">Download <FiDownload /></button>
              </div>
            ))}
          </div>
        </div>
        {/* Human Support Option */}
        <div className="flex justify-end">
          <button onClick={() => setShowSupportModal(true)} className="px-6 py-3 rounded-lg bg-[#d0ed01] text-black font-bold hover:bg-[#bada55] transition flex items-center gap-2 shadow-lg">
            <FiHeadphones className="text-xl" /> Contact Our Support Crew
          </button>
        </div>
      </div>
      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18181b] rounded-2xl p-8 w-full max-w-lg border border-white/10 shadow-2xl relative">
            <button onClick={() => setShowSupportModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">✕</button>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">Contact Support</h2>
            <form className="flex flex-col gap-4">
              <input className="px-4 py-2 rounded-lg bg-[#232323] text-white placeholder-gray-400 outline-none border border-[#d0ed01]/20" placeholder="Subject" />
              <select className="px-4 py-2 rounded-lg bg-[#232323] text-white outline-none border border-[#d0ed01]/20">
                <option>Priority: Normal</option>
                <option>Priority: High</option>
                <option>Priority: Urgent</option>
              </select>
              <textarea className="px-4 py-2 rounded-lg bg-[#232323] text-white placeholder-gray-400 outline-none border border-[#d0ed01]/20" placeholder="Describe your issue..." rows={4} />
              <input type="file" className="text-white" />
              <button className="mt-2 px-4 py-2 rounded-lg bg-[#d0ed01] text-black font-semibold hover:bg-[#bada55] transition">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 