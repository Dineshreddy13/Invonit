import React from "react";
import { Bell, HelpCircle, Search, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  
  // Basic path to title converter
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "dashboard") return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle (hidden on desktop) */}
        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
          <Menu size={20} />
        </button>
        
        <div>
          <h1 className="text-lg font-semibold text-slate-900">{getPageTitle()}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">Welcome back to Invonit</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="Search anything..."
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
