"use client";

import React from "react";
import { Search, Bell, Activity, Link2, Sparkles, Command } from "lucide-react";

interface CommandBarProps {
  onSearchClick: () => void;
  agentStatus: "idle" | "running" | "completed";
  connectedCount: number;
  totalCount: number;
  onQuickAction: () => void;
}

export default function CommandBar({
  onSearchClick,
  agentStatus,
  connectedCount,
  totalCount,
  onQuickAction,
}: CommandBarProps) {
  return (
    <header className="h-16 border-b border-zinc-900 bg-zinc-950/30 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input Trigger */}
      <div className="flex-1 max-w-xl mr-6">
        <button
          onClick={onSearchClick}
          className="w-full flex items-center justify-between h-9 px-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all text-sm group"
        >
          <div className="flex items-center gap-2">
            <Search size={15} className="text-zinc-500 group-hover:text-zinc-400" />
            <span className="text-zinc-500 font-normal">
              Research a company, generate a proposal, create a presentation...
            </span>
          </div>
          <div className="flex items-center gap-1 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700/60 text-3xs font-mono font-medium text-zinc-400">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Action / Stats Area */}
      <div className="flex items-center gap-4">
        {/* Connected Tools Stats */}
        <div className="flex items-center gap-1.5 bg-zinc-900/30 border border-zinc-900 px-2.5 py-1.5 rounded-lg text-2xs font-medium text-zinc-400">
          <Link2 size={13} className="text-violet-400" />
          <span>Tools:</span>
          <span className="text-zinc-200 font-semibold">
            {connectedCount}/{totalCount}
          </span>
        </div>

        {/* Agent Activity status */}
        <div className="flex items-center gap-2 bg-zinc-900/30 border border-zinc-900 px-2.5 py-1.5 rounded-lg text-2xs font-medium text-zinc-400">
          <Activity size={13} className="text-emerald-400 animate-pulse" />
          <span>Agent:</span>
          {agentStatus === "running" ? (
            <span className="text-amber-400 flex items-center gap-1 font-semibold animate-pulse">
              Running
            </span>
          ) : agentStatus === "completed" ? (
            <span className="text-emerald-400 font-semibold">Idle (Success)</span>
          ) : (
            <span className="text-zinc-400 font-semibold">Idle</span>
          )}
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/40 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500" />
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onQuickAction}
          className="h-9 px-3.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/10 border border-indigo-500/20 active:scale-95"
        >
          <Sparkles size={13} />
          <span>Quick Run</span>
        </button>
      </div>
    </header>
  );
}
