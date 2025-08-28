"use client";
import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";
import {
  FiBell, FiSearch, FiSettings, FiUser, FiHome, FiBook, FiLink,
  FiCheckSquare, FiUsers, FiCpu, FiBookOpen, FiCreditCard, FiMenu, FiX
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('organizationId');
    // Navigate to login using Next.js router
    router.push('/login');
  };

  const handleNavigateToOrganization = () => {
    setShowProfile(false);
    router.push('/main/organization');
  };

  const handleNavigateToProfile = () => {
    setShowProfile(false);
    router.push('/profile');
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <ProfileDropdownContext.Provider value={{ showProfile, setShowProfile }}>
      <div className="h-screen flex bg-black text-white">
        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className={`fixed lg:relative lg:block ${showMobileMenu ? 'block' : 'hidden'} z-50 ${showMobileMenu ? 'animate-slide-in' : ''}`}>
          <NavigationWrapper onClose={closeMobileMenu} />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen relative w-full">
          {/* Top Bar */}
          <header className="flex items-center justify-between px-4 lg:px-8 py-4 border-b border-white/10 bg-black sticky top-0 z-10">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-white p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Search Bar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md">
              <button className="text-gray-400 hover:text-white">
                <FiSearch size={22} />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="bg-[#232323] text-white px-4 py-2 rounded-lg outline-none border-none w-64 placeholder-gray-400"
              />
            </div>

            {/* Mobile Logo - Only show on mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <Image src="/images/logo1.png" alt="Logo" width={32} height={32} priority />
              <span className="text-lg font-bold text-white">Symbiotes</span>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2 lg:gap-4 relative">
              <button
                className={`relative text-gray-400 hover:text-[#d0ed01] p-2 ${showNotifications ? 'text-[#d0ed01]' : ''}`}
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Show notifications"
              >
                <FiBell size={20} className="lg:w-6 lg:h-6" />
              </button>
              <div className="relative">
                <button
                  className={`text-gray-400 hover:text-white p-2 ${showProfile ? 'text-[#d0ed01]' : ''}`}
                  onClick={() => setShowProfile((prev) => !prev)}
                  aria-label="Show profile menu"
                >
                  <FiUser size={20} className="lg:w-6 lg:h-6" />
                </button>
                {showProfile && (
                  <div
                    ref={profileRef}
                    className="absolute right-0 top-full mt-2 z-30 rounded-2xl p-4 lg:p-6 flex flex-col items-start shadow-lg bg-[linear-gradient(90deg,#232a13_0%,#18181b_100%)] min-w-[200px] lg:min-w-[250px]"
                  >
                    <div className="font-bold text-lg mb-2 text-[#d0ed01]">Profile</div>
                    <div className="text-white text-sm break-all mb-3">{userEmail || 'No email found'}</div>
                    <button
                      className="w-full py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition text-left px-4 mb-2"
                      onClick={handleNavigateToOrganization}
                    >
                      Organization
                    </button>
                    <button
                      className="w-full py-2 rounded-lg bg-[#232323] text-white font-semibold hover:bg-[#d0ed01] hover:text-black transition text-left px-4 mb-2"
                      onClick={handleNavigateToProfile}
                    >
                      View Profile
                    </button>
                    <button
                      className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                      onClick={handleLogout}
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
                  className="absolute right-0 top-12 w-80 lg:w-96 bg-[#18181b] rounded-xl p-4 lg:p-6 flex flex-col gap-6 border border-white/10 shadow-2xl animate-fade-in z-20"
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
          <div className="flex-1 flex gap-4 lg:gap-6 p-4 lg:p-8 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </ProfileDropdownContext.Provider>
  );
}
