"use client";
import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import {
  FiBell, FiSearch, FiSettings, FiUser, FiHome, FiBook, FiLink,
  FiCheckSquare, FiUsers, FiCpu, FiBookOpen, FiCreditCard,
} from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRocket } from "react-icons/fa";
import NavigationWrapper from './NavigationWrapper';
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const navItems = [
  { label: "Dashboard", icon: FiHome, href: "/main/dashboard" },
  { label: "Launchpad", icon: FaRocket, href: "/main/launchpad" },
  { label: "Blueprint", icon: FiBook, href: "/main/blueprint" },
  { label: "Integrations", icon: FiLink, href: "/main/integrations" },
  { label: "Tasks", icon: FiCheckSquare, href: "/main/tasks" },
  { label: "Crew", icon: FiUsers, href: "/main/crew" },
  { label: "Agents", icon: FiCpu, href: "/main/agents" },
  { label: "Learn", icon: FiBookOpen, href: "/main/learn" },
  { label: "Billing", icon: FiCreditCard, href: "/main/billing" },
  { label: "Settings", icon: FiSettings, href: "/main/settings/general" },
  { label: "Profile", icon: FaRegCircleUser, href: "/profile" },
];

// ProfileDropdownContext for global control
const ProfileDropdownContext = createContext({ showProfile: false, setShowProfile: (v: boolean) => {} });
export function useProfileDropdown() { return useContext(ProfileDropdownContext); }

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserEmail(localStorage.getItem('userEmail'));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false);
      }
    }
    if (showNotifications || showProfile || showSettings) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, showProfile, showSettings]);

  useEffect(() => {
    // Listen for route changes to show/hide loader
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    // Next.js router events (for app dir, use window events as fallback)
    window.addEventListener('routeChangeStart', handleStart);
    window.addEventListener('routeChangeComplete', handleComplete);
    window.addEventListener('routeChangeError', handleComplete);
    return () => {
      window.removeEventListener('routeChangeStart', handleStart);
      window.removeEventListener('routeChangeComplete', handleComplete);
      window.removeEventListener('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <ProfileDropdownContext.Provider value={{ showProfile, setShowProfile }}>
      <div className="h-screen flex bg-black text-white">
        {/* Sidebar */}
        <NavigationWrapper />

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen relative">
          {/* Top Loader */}
          {loading && (
            <div className="fixed left-64 top-0 w-[calc(100%-16rem)] h-1 z-50">
              <div className="h-full w-full bg-[#d0ed01] animate-pulse transition-all duration-200" />
            </div>
          )}
          {/* Top Bar */}
          <header className="flex items-center justify-between px-8 py-4 border-b border-white/10 bg-black sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white">
                <FiSearch size={22} />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none w-64 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-4 relative">
              <button
                className={`relative text-gray-400 hover:text-[#d0ed01] ${showNotifications ? 'text-[#d0ed01]' : ''}`}
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Show notifications"
              >
                <FiBell size={24} />
              </button>
              <div className="relative">
                <button
                  className={`text-gray-400 hover:text-white ${showProfile ? 'text-[#d0ed01]' : ''}`}
                  onClick={() => setShowProfile((prev) => !prev)}
                  aria-label="Show profile menu"
                >
                  <FiUser size={22} />
                </button>
                {showProfile && (
                  <div
                    ref={profileRef}
                    className="absolute right-0 top-full mt-2 z-30 rounded-2xl p-6 flex flex-col items-start shadow-lg bg-[linear-gradient(90deg,#232a13_0%,#18181b_100%)]"
                  >
                    <div className="font-bold text-lg mb-2 text-[#d0ed01]">Profile</div>
                    <div className="text-white text-sm break-all">{userEmail || 'No email found'}</div>
                    <button
                      className="w-full mt-2 py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition text-left px-4"
                      onClick={() => window.location.href = '/main/organization'}
                    >
                      Organization
                    </button>
                    <button
                      className="w-full py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition text-left px-4"
                      onClick={() => window.location.href = '/main/settings/preferences'}
                    >
                      Preference
                    </button>
                    <button
                      className="w-full py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition text-left px-4"
                      onClick={() => window.location.href = '/main/settings/security'}
                    >
                      Security
                    </button>
                    <button
                      className="w-full mt-2 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          localStorage.removeItem('userEmail');
                        }
                        window.location.href = '/login';
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              {/* Notification Panel */}
              {showNotifications && (
                <div
                  ref={notificationRef}
                  className="absolute right-0 top-12 w-96 bg-[#18181b] rounded-xl p-6 flex flex-col gap-6 border border-white/10 shadow-2xl animate-fade-in z-20"
                >
                  <div className="font-bold text-lg mb-2 text-[#d0ed01]">Notifications</div>
                  <div className="flex flex-col gap-4 items-center justify-center min-h-[80px]">
                    <span className="text-gray-400">No Notifications</span>
                  </div>
                </div>
              )}
            </div>
          </header>
          {/* Page Content */}
          <div className="flex-1 flex gap-6 p-8">
            {children}
          </div>
        </main>
      </div>
    </ProfileDropdownContext.Provider>
  );
}
