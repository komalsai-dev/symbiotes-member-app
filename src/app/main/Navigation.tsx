"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  FiBell, FiSearch, FiSettings, FiUser, FiHome, FiBook, FiLink,
  FiCheckSquare, FiUsers, FiCpu, FiBookOpen, FiCreditCard, FiChevronDown, FiHeadphones, FiGlobe
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { useState, useEffect } from 'react';

const navItems = [
  { label: "Home", icon: FiHome, href: "/main/dashboard" },
  { label: "Launchpad", icon: FaRocket, href: "/main/launchpad" },
  { label: "Blueprint", icon: FiBook, href: "/main/Blueprint" },
  { label: "Integrations", icon: FiLink, href: "/main/integrations" },
  { label: "Tasks", icon: FiCheckSquare, href: "/main/tasks" },
  { label: "Crew", icon: FiUsers, href: "/main/crew" },
  { label: "Agents", icon: FiCpu, href: "/main/agents" },
  { label: "Learn", icon: FiBookOpen, href: "/main/learn" },
  { label: "Billing", icon: FiCreditCard, href: "/main/billing" },
  { label: "Community", icon: FiGlobe, href: "/main/community" },
  { label: "Settings", icon: FiSettings, href: "/main/settings/general" },
  { label: "Help Center", icon: FiHeadphones, href: "/main/help-center" },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    navItems.forEach(item => {
      router.prefetch(item.href);
    });
  }, [router]);

  const handleNavigation = (href: string) => {
    router.push(href, { scroll: false });
  };

  if (typeof window !== 'undefined' && navigator.clipboard) {
    // safe to use clipboard
  }

  return (
    <aside className="w-64 flex flex-col justify-between bg-[#18181b] border-r border-white/10 h-screen p-6">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <Image src="/images/logo1.png" alt="Logo" width={40} height={40} priority />
          <span className="text-2xl font-bold text-white">Symbiotes</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const bgClass = isActive ? "bg-[#d0ed01]" : "hover:bg-[#d0ed01] hover:text-black";
              const textClass = isActive ? "text-black" : "text-white";

              return (
                <li key={item.label} className="relative">
                  <Link
                    href={item.href}
                    prefetch={true}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 font-semibold ${bgClass} ${textClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon 
                        size={20} 
                        className={isActive ? "text-black" : "text-inherit"} 
                      />
                      <span className={isActive ? "text-black" : ""}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <Link 
        href="/profile"
        prefetch={true}
        onClick={(e) => {
          e.preventDefault();
          handleNavigation('/profile');
        }}
        className="flex items-center gap-3 cursor-pointer hover:bg-[#232323] rounded-lg px-4 py-2 transition-all duration-200"
      >
        <FaRegCircleUser className="text-3xl text-white" />
        <div>
          <div className="font-semibold">Profile</div>
          <div className="text-xs text-gray-400">Admin</div>
        </div>
      </Link>
    </aside>
  );
} 