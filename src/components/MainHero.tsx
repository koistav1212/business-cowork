"use client";

import React from "react";
import { Sparkles, ArrowRight, Activity, Zap, Server, Shield } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

interface MainHeroProps {
  onStartReport: () => void;
  onViewExecutions: () => void;
  onQuickSelect: (company: string) => void;
}

export default function MainHero({
  onStartReport,
  onViewExecutions,
  onQuickSelect,
}: MainHeroProps) {
  const quickPresets = [
    { key: "stripe", name: "Stripe", desc: "Fintech infrastructure", color: "rgba(99, 102, 241, 0.15)", icon: Zap },
    { key: "vercel", name: "Vercel", desc: "DevTools & hosting", color: "rgba(59, 130, 246, 0.15)", icon: Server },
    { key: "openai", name: "OpenAI", desc: "AI models & endpoints", color: "rgba(168, 85, 247, 0.15)", icon: Sparkles },
  ];

  return (
    <div className="relative min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center text-center px-6 py-12 overflow-hidden select-none">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="max-w-3xl space-y-6 relative z-10">
        {/* Subtle top badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-950/20 text-3xs font-semibold text-violet-300 tracking-wider uppercase shadow-md shadow-violet-950/20 animate-float">
          <Sparkles size={11} className="text-violet-400" />
          <span>Next-Generation Intelligence Workstation</span>
        </div>

        {/* Large Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] sm:leading-none">
          <span className="gradient-title">Business Intelligence </span>
          <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 glow-text">
            Copilot
          </span>
        </h1>

        {/* Subtitle description */}
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Research companies, discover hidden opportunities, generate consulting-grade reports and presentations, and execute sales outreach automatically.
        </p>

        {/* Action button rows */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onStartReport}
            className="w-full sm:w-auto h-11 px-6 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 border border-indigo-500/20 group active:scale-98"
          >
            <span>Generate Business Report</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onViewExecutions}
            className="w-full sm:w-auto h-11 px-6 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-xs font-semibold text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <Activity size={14} className="text-zinc-400" />
            <span>View Past Executions</span>
          </button>
        </div>

        {/* Divider text */}
        <div className="flex items-center justify-center gap-3 pt-12 text-3xs font-medium text-zinc-600 uppercase tracking-widest">
          <div className="w-12 h-px bg-zinc-900" />
          <span>Or Quick Run Pre-loaded intelligence</span>
          <div className="w-12 h-px bg-zinc-900" />
        </div>

        {/* Quick select presets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4">
          {quickPresets.map((preset) => {
            const Icon = preset.icon;
            return (
              <SpotlightCard
                key={preset.key}
                glowColor={preset.color}
                onClick={() => onQuickSelect(preset.key)}
                className="cursor-pointer group flex flex-col items-center justify-center text-center p-5 border border-zinc-900 bg-zinc-950/20 rounded-xl hover:border-zinc-800/80 transition-all hover:-translate-y-0.5 active:translate-y-0 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 group-hover:border-violet-500/20 transition-all mb-3.5">
                  <Icon size={14} />
                </div>
                <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors mb-1">
                  {preset.name}
                </h3>
                <p className="text-3xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  {preset.desc}
                </p>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
