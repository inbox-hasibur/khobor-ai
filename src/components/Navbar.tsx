"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Headphones, Globe, Archive, LayoutGrid, Menu, X, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-[940px] px-4 md:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Main Navigation Dock */}
          <nav className="flex-1 bg-background/60 backdrop-blur-2xl border border-border rounded-2xl p-1.5 flex items-center justify-between shadow-2xl relative">
            {/* Logo Section */}
            <div className="flex items-center gap-2 pl-3 md:pl-4 pr-4 md:pr-6 border-r border-border">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                <span className="text-[12px] font-black text-white italic">K</span>
              </div>
              <span className="text-sm font-black tracking-tighter text-foreground">
                Khobor<span className="text-blue-500">AI</span>
              </span>
            </div>

            {/* Links - Desktop */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink href="/" icon={<Headphones className="w-4 h-4" />} label="Home" active />
              <NavLink href="/discover" icon={<Globe className="w-4 h-4" />} label="Discover" />
              <NavLink href="/archive" icon={<Archive className="w-4 h-4" />} label="Archive" />
              <NavLink href="/categories" icon={<LayoutGrid className="w-4 h-4" />} label="Categories" />
            </div>

            <div className="flex items-center gap-1 pr-2">
              {/* Theme Toggle */}
              {mounted && (
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>

              {/* Mobile Menu Button - Moved to after search */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden sm:flex bg-background/60 backdrop-blur-2xl border border-border rounded-2xl p-1.5 items-center gap-1 shadow-2xl">
            <button className="px-5 py-2 text-[11px] font-black text-muted-foreground hover:text-foreground transition-colors">
              Login
            </button>
            <button className="px-5 py-2 bg-foreground text-background rounded-xl text-[11px] font-black hover:opacity-90 transition-all shadow-lg active:scale-95">
              Sign up
            </button>
          </div>
        </div>

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="bg-background/90 backdrop-blur-3xl border border-border rounded-2xl p-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search news, categories, or updates..."
                className="w-full bg-muted border border-border rounded-xl py-3 pl-11 pr-4 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/90 backdrop-blur-3xl border border-border rounded-2xl p-4 flex flex-col gap-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <NavLink href="/" icon={<Headphones className="w-4 h-4" />} label="Home" active onClick={() => setIsMenuOpen(false)} />
            <NavLink href="/discover" icon={<Globe className="w-4 h-4" />} label="Discover" onClick={() => setIsMenuOpen(false)} />
            <NavLink href="/archive" icon={<Archive className="w-4 h-4" />} label="Archive" onClick={() => setIsMenuOpen(false)} />
            <NavLink href="/categories" icon={<LayoutGrid className="w-4 h-4" />} label="Categories" onClick={() => setIsMenuOpen(false)} />
            <div className="h-px bg-border my-2" />
            <div className="flex gap-2">
              <button className="flex-1 py-3 text-[11px] font-black text-muted-foreground hover:text-foreground transition-colors">
                Login
              </button>
              <button className="flex-1 py-3 bg-foreground text-background rounded-xl text-[11px] font-black hover:opacity-90 transition-all shadow-lg">
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-component for individual links
const NavLink = ({ 
  href, 
  icon, 
  label, 
  active = false,
  onClick
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black transition-all duration-300 ${
      active 
        ? "bg-foreground/10 text-foreground shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" 
        : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
    } w-full md:w-auto`}
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;