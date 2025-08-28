"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  FiSettings, FiHome, FiBook, FiLink,
  FiCheckSquare, FiUsers, FiCpu, FiBookOpen, FiCreditCard, FiHeadphones, FiGlobe
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";

const navItems = [
  { label: "Home", icon: FiHome, href: "/main/dashboard", priority: "high" },
  { label: "Launchpad", icon: FaRocket, href: "/main/launchpad", priority: "high" },
  { label: "Blueprint", icon: FiBook, href: "/main/Blueprint", priority: "high" },
  { label: "Integrations", icon: FiLink, href: "/main/integrations", priority: "medium" },
  { label: "Tasks", icon: FiCheckSquare, href: "/main/tasks", priority: "medium" },
  { label: "Crew", icon: FiUsers, href: "/main/crew", priority: "medium" },
  { label: "Agents", icon: FiCpu, href: "/main/agents", priority: "medium" },
  { label: "Learn", icon: FiBookOpen, href: "/main/learn", priority: "medium" },
  { label: "Billing", icon: FiCreditCard, href: "/main/billing", priority: "low" },
  { label: "Community", icon: FiGlobe, href: "/main/community", priority: "low" },
  { label: "Settings", icon: FiSettings, href: "/main/settings/general", priority: "low" },
  { label: "Help Center", icon: FiHeadphones, href: "/main/help-center", priority: "low" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isProfileActive = pathname && pathname.startsWith('/profile');

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
                    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-150 font-semibold ${bgClass} ${textClass}`}
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
        className={`flex items-center gap-3 cursor-pointer rounded-lg px-4 py-2 transition-all duration-150 font-semibold ${isProfileActive ? 'bg-[#d0ed01] text-black' : 'hover:bg-[#232323] text-white'}`}
      >
        <FaRegCircleUser className={`text-3xl ${isProfileActive ? 'text-black' : 'text-white'}`} />
        <div>
          <div className={isProfileActive ? 'font-semibold text-black' : 'font-semibold'}>Profile</div>
          <div className={isProfileActive ? 'text-xs text-black' : 'text-xs text-gray-400'}>Admin</div>
        </div>
      </Link>
    </aside>
  );
} 