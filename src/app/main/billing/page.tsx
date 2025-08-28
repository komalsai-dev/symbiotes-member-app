"use client";
import React, { useState } from "react";
import {
  FiCheckCircle,
  FiChevronDown,
  FiDownload,
  FiLink2,
  FiSearch
} from "react-icons/fi";

const plans = [
  {
    name: "Stellar",
    price: 14000,
    description: "For fast-moving startups and small teams ready to launch.",
    features: [
      "Up to 10 team members",
      "Priority support",
      "All integrations",
      "Basic analytics",
      "Step-level access"
    ],
    button: "Start Trial"
  },
  {
    name: "Evaluation",
    price: 50000,
    description: "For growing companies evaluating advanced features.",
    features: [
      "Up to 50 team members",
      "Advanced analytics",
      "Custom integrations",
      "Account swap",
      "Premium support"
    ],
    button: "Book a Demo"
  },
  {
    name: "Express",
    price: 100000,
    description: "For enterprises needing scale, security, and compliance.",
    features: [
      "Unlimited team members",
      "Enterprise SLAs",
      "Dedicated CSM",
      "Custom onboarding",
      "All features included"
    ],
    button: "Book a Demo"
  }
];

const paymentTabs = ["All", "Succeeded", "Refunded"];

const mockPayments = [
  {
    id: "pay_001",
    date: "2024-05-01",
    amount: "$14,000",
    status: "Succeeded",
    method: "Credit Card",
    customer: "Acme Inc."
  },
  {
    id: "pay_002",
    date: "2024-05-10",
    amount: "$50,000",
    status: "Refunded",
    method: "Wire Transfer",
    customer: "Beta Corp."
  },
  {
    id: "pay_003",
    date: "2024-05-15",
    amount: "$100,000",
    status: "Succeeded",
    method: "Credit Card",
    customer: "Express LLC"
  },
  {
    id: "pay_004",
    date: "2024-05-18",
    amount: "$6,000",
    status: "Succeeded",
    method: "Credit Card",
    customer: "Startup Hub"
  },
  {
    id: "pay_005",
    date: "2024-05-20",
    amount: "$25,000",
    status: "Refunded",
    method: "Wire Transfer",
    customer: "Growth Labs"
  },
  {
    id: "pay_006",
    date: "2024-05-22",
    amount: "$75,000",
    status: "Succeeded",
    method: "Credit Card",
    customer: "NextGen AI"
  },
  {
    id: "pay_007",
    date: "2024-05-25",
    amount: "$12,000",
    status: "Succeeded",
    method: "Wire Transfer",
    customer: "Visionary Ventures"
  },
  {
    id: "pay_008",
    date: "2024-05-28",
    amount: "$18,000",
    status: "Refunded",
    method: "Credit Card",
    customer: "Cloud Nine"
  },
  {
    id: "pay_009",
    date: "2024-06-01",
    amount: "$200,000",
    status: "Succeeded",
    method: "Wire Transfer",
    customer: "Enterprise Pro"
  },
  {
    id: "pay_010",
    date: "2024-06-03",
    amount: "$9,000",
    status: "Succeeded",
    method: "Credit Card",
    customer: "Bright Future"
  }
];

export default function BillingPage() {
  const [sliderValue, setSliderValue] = useState(14000);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [filters] = useState({ date: "", status: "", method: "" });
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);

  const filteredPayments = mockPayments.filter((p) => {
    if (activeTab !== "All" && p.status !== activeTab) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.method && p.method !== filters.method) return false;
    if (search && !(
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.customer.toLowerCase().includes(search.toLowerCase())
    )) return false;
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-black pt-0 px-4 lg:px-8 pb-8">
      {/* Pricing Slider + Header Row */}
      <div className="mb-8 lg:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-2 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Billing & Plans</h1>
          </div>
          <button
            className="bg-[#d0ed01] text-black px-4 lg:px-5 py-2 rounded-lg font-semibold hover:bg-[#bada55] transition-colors shadow text-sm lg:text-base"
            onClick={() => setShowPaymentHistory(true)}
          >
            Payment History
          </button>
        </div>
        <p className="text-gray-400 mb-4 text-sm lg:text-base">Explore scalable pricing for your team.</p>
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-6 mb-4">
          <span className="text-gray-400 text-sm lg:text-base">$6k</span>
          <input
            type="range"
            min={6000}
            max={200000}
            step={1000}
            value={sliderValue}
            onChange={e => setSliderValue(Number(e.target.value))}
            className="w-full lg:w-1/2 accent-[#d0ed01]"
          />
          <span className="text-gray-400 text-sm lg:text-base">$200k</span>
          <span className="text-[#d0ed01] font-bold text-base lg:text-lg">${sliderValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mb-10 lg:mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
              <button className="bg-[#18181b] text-[#d0ed01] px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold border border-[#d0ed01]/30">
                <FiChevronDown />
                Options
              </button>
            </div>
            <div className="text-3xl font-bold text-[#d0ed01] mb-2">${plan.price.toLocaleString()}</div>
            <div className="text-gray-400 mb-4">{plan.description}</div>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-white">
                  <FiCheckCircle className="text-[#d0ed01]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Account</label>
              <select className="w-full bg-[#18181b] text-white px-3 py-2 rounded-lg border border-white/10">
                <option>Default Account</option>
                <option>Team Alpha</option>
                <option>Team Beta</option>
              </select>
            </div>
            <button className={`w-full py-3 rounded-lg font-bold text-lg transition-colors ${plan.button === "Start Trial" ? "bg-[#d0ed01] text-black hover:bg-[#bada55]" : "bg-[#232323] text-white border border-[#d0ed01] hover:bg-[#18181b]"}`}>
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      {/* Payment History Modal */}
      {showPaymentHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#232323] border border-white/10 shadow-2xl p-8">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowPaymentHistory(false)}
              aria-label="Close"
            >
              ×
        </button>
            {/* Tabs and Actions */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                {paymentTabs.map(tab => (
          <button
            key={tab}
                    className={`px-6 py-2 rounded-lg font-bold text-lg transition-colors ${activeTab === tab ? "bg-[#d0ed01] text-black" : "bg-black text-white hover:bg-[#333]"}`}
                    onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
              </div>
              <div className="flex gap-2">
                <button className="bg-[#d0ed01] text-black px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#bada55]">
                  <FiLink2 />
                  Generate Payment Link
                </button>
                <button className="bg-black text-[#d0ed01] px-6 py-2 rounded-lg font-bold flex items-center gap-2 border border-[#d0ed01] hover:bg-[#232323]">
                  <FiDownload />
                  Export
                </button>
              </div>
      </div>
      {/* Filters and Search */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Date Range</label>
                <input type="date" className="bg-black text-white px-4 py-2 rounded-lg border border-white/10" placeholder="dd-mm-yyyy" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Status</label>
                <select className="bg-black text-white px-4 py-2 rounded-lg border border-white/10">
                  <option value="">All</option>
                  <option value="Succeeded">Succeeded</option>
                  <option value="Refunded">Refunded</option>
        </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Payment Method</label>
                <select className="bg-black text-white px-4 py-2 rounded-lg border border-white/10">
                  <option value="">All</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Wire Transfer">Wire Transfer</option>
        </select>
              </div>
              <div className="flex-1 flex items-end">
                <div className="relative w-full">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
                    placeholder="Search payments..."
                    className="w-full bg-black text-white pl-10 pr-4 py-2 rounded-lg border border-white/10"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
        />
      </div>
              </div>
            </div>
            {/* Payments Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase border-b border-white/10">
                    <th className="py-2 px-4">PAYMENT ID</th>
                    <th className="py-2 px-4">DATE</th>
                    <th className="py-2 px-4">CUSTOMER</th>
                    <th className="py-2 px-4">AMOUNT</th>
                    <th className="py-2 px-4">STATUS</th>
                    <th className="py-2 px-4">METHOD</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-8">No payments found.</td>
                    </tr>
                  ) : (
                    filteredPayments.map((p) => (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-[#18181b] transition-colors">
                        <td className="py-2 px-4 font-mono text-white">{p.id}</td>
                        <td className="py-2 px-4 text-white">{p.date}</td>
                        <td className="py-2 px-4 text-white">{p.customer}</td>
                        <td className="py-2 px-4 text-[#d0ed01] font-bold">{p.amount}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === "Succeeded" ? "bg-green-700/80 text-green-200" : "bg-yellow-700/80 text-yellow-200"}`}>{p.status}</span>
                        </td>
                        <td className="py-2 px-4 text-white">{p.method}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>
      )}
    </div>
  );
}
