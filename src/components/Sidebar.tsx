"use client";

import React from "react";
import {
  LayoutDashboard,
  Search,
  FileText,
  Presentation,
  Mail,
  Link2,
  Cpu,
  Brain,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Database,
  Coins,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  connectedCount: number;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  connectedCount,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "research", label: "Research", icon: Search },
    { id: "proposals", label: "Proposals", icon: FileText },
    { id: "presentations", label: "Presentations", icon: Presentation },
    { id: "documents", label: "Documents", icon: Database },
    { id: "email", label: "Email Campaigns", icon: Mail },
    { id: "connectors", label: "Connectors", icon: Link2, badge: connectedCount },
    { id: "skills", label: "Skills", icon: Cpu },
    { id: "memory", label: "Memory", icon: Brain },
    { id: "executions", label: "Executions", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`relative flex flex-col h-full bg-zinc-950 border-r border-zinc-900 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Logo Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md">
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              B
            </div>
            <span className="font-semibold text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
              Business Copilot
            </span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            B
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:bg-zinc-800 shadow-md shadow-black"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                isActive
                  ? "bg-zinc-900 text-zinc-100 border-l-2 border-violet-500"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50"
              }`}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-colors ${
                  isActive ? "text-violet-400" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              {!collapsed && (
                <span className="ml-3 truncate">{item.label}</span>
              )}
              {!collapsed && item.badge !== undefined && (
                <span className="ml-auto px-1.5 py-0.5 text-2xs rounded bg-zinc-800 text-zinc-400 font-normal">
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed mode */}
              {collapsed && (
                <div className="absolute left-14 scale-0 group-hover:scale-100 bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs px-2.5 py-1.5 rounded-md shadow-xl transition-all duration-150 origin-left z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Profile / Info */}
      <div className="p-3 border-t border-zinc-900 space-y-3 bg-zinc-950/50">
        {/* Credits block */}
        <div className="px-3 py-2.5 rounded-lg bg-zinc-900/40 border border-zinc-900/60 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium">
            <Coins size={14} className="text-amber-500" />
            {!collapsed ? (
              <span>Workspace Credits</span>
            ) : (
              <span className="text-amber-500 font-bold">82%</span>
            )}
          </div>
          {!collapsed && (
            <div className="space-y-1">
              <div className="flex justify-between text-2xs text-zinc-500">
                <span>820 / 1,000 used</span>
                <span>82%</span>
              </div>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-violet-600 h-full rounded-full"
                  style={{ width: "82%" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* User profile section */}
        <div className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-zinc-900/40 cursor-pointer transition-colors group relative">
          <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm ring-1 ring-zinc-800">
            KS
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-zinc-950" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-semibold text-zinc-200 truncate">Koustav Sarkar</p>
              <p className="text-2xs text-zinc-500 truncate">Enterprise AI Admin</p>
            </div>
          )}

          {collapsed && (
            <div className="absolute left-14 scale-0 group-hover:scale-100 bg-zinc-900 border border-zinc-800 text-zinc-100 text-xs p-2 rounded-md shadow-xl transition-all duration-150 origin-left z-50 whitespace-nowrap">
              <p className="font-semibold">Koustav Sarkar</p>
              <p className="text-2xs text-zinc-400">Enterprise AI Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
