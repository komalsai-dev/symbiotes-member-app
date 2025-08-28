"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "General Settings", href: "/main/settings/general" },
  { label: "Agents' Settings", href: "/main/settings/agents" },
  { label: "Users' Settings", href: "/main/settings/users" },
  { label: "Maintenance", href: "/main/settings/maintenance" },
  { label: "Security", href: "/main/settings/security" },
];

export default function SettingsHeader() {
  const pathname = usePathname();
  return (
    <>
      <h2 className="text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 text-white">System Settings</h2>
      <div className="text-sm lg:text-base text-gray-400 mb-6 lg:mb-8">Setup and edit system settings and preferences</div>
      <div className="flex flex-wrap gap-4 lg:gap-8 border-b border-white/10 mb-6 lg:mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`pb-2 font-semibold transition-colors duration-200 whitespace-nowrap text-sm lg:text-base ${isActive ? 'text-[#d0ed01] border-b-2 border-[#d0ed01]' : 'text-gray-300 hover:text-[#d0ed01]'}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </>
  );
} 