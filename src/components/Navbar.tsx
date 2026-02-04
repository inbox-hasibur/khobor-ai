"use client";

import React from "react";
import Link from "next/link";
import { Headphones, Globe, Archive, LayoutGrid, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[900px] px-6">
      <div className="flex items-center justify-between gap-4">
        
        {/* Main Navigation Dock */}
        <nav className="flex-1 bg-[#111113]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-1.5 flex items-center justify-between shadow-2xl">
          {/* Logo Section */}
          <div className="flex items-center gap-2 pl-4 pr-6 border-r border-white/5">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-[10px] font-black text-white">K</span>
            </div>
            <span className="text-sm font-black tracking-tighter text-white">Khobor<span className="text-blue-500">AI</span></span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" icon={<Headphones className="w-4 h-4" />} label="Home" active />
            <NavLink href="/discover" icon={<Globe className="w-4 h-4" />} label="Discover" />
            <NavLink href="/archive" icon={<Archive className="w-4 h-4" />} label="Archive" />
            <NavLink href="/categories" icon={<LayoutGrid className="w-4 h-4" />} label="Categories" />
          </div>

          {/* Small placeholder to balance the logo pl-4 */}
          <div className="w-4 md:hidden" />
        </nav>

        {/* Auth / Action Buttons */}
        <div className="bg-[#111113]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-1.5 flex items-center gap-1 shadow-2xl">
          <button className="px-5 py-2 text-xs font-black text-zinc-400 hover:text-white transition-colors">
            Login
          </button>
          <button className="px-5 py-2 bg-white text-black rounded-xl text-xs font-black hover:bg-zinc-200 transition-all shadow-lg active:scale-95">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component for individual links
const NavLink = ({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) => (
  <Link
    href={href}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
      active 
        ? "bg-white/10 text-white shadow-inner" 
        : "text-zinc-500 hover:text-white hover:bg-white/5"
    }`}
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;