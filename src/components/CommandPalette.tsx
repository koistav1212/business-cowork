"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Command, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCommand: (cmd: string, arg?: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectCommand,
}: CommandPaletteProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const commands = [
    { category: "Intelligence Core", id: "run_research_stripe", title: "Research Stripe Inc.", desc: "Scrape buying signals & tech stack for Stripe", icon: Zap },
    { category: "Intelligence Core", id: "run_research_vercel", title: "Research Vercel Inc.", desc: "Analyze hiring signals and Next.js metrics", icon: Zap },
    { category: "Intelligence Core", id: "run_research_openai", title: "Research OpenAI", desc: "Retrieve funding data and product metrics", icon: Zap },
    { category: "Document Workspace", id: "switch_proposals", title: "Open Proposal Builder", desc: "Go to executive proposals tab", icon: ArrowRight },
    { category: "Document Workspace", id: "switch_presentations", title: "Open Presentation Builder", desc: "View drag-and-drop slide decks", icon: ArrowRight },
    { category: "Document Workspace", id: "switch_email", title: "Draft Email Campaign", desc: "Go to outreach templates tab", icon: ArrowRight },
    { category: "System Connectors", id: "sync_hubspot", title: "Connect HubSpot Integration", desc: "Authenticate and pull active CRM logs", icon: Shield },
    { category: "System Connectors", id: "sync_salesforce", title: "Connect Salesforce Integration", desc: "Map active opportunity metrics", icon: Shield },
    { category: "AI Skills Library", id: "run_skill_research", title: "Run Sales Account Research Skill", desc: "Launch customized account crawler", icon: Sparkles },
    { category: "AI Skills Library", id: "run_skill_brief", title: "Run Executive Brief Generator", desc: "Generate 1-page condensed PDF brief", icon: Sparkles },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-28 px-4 bg-black/75 backdrop-blur-md">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main command modal panel */}
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden shadow-2xl shadow-black">
        {/* Search header box */}
        <div className="flex items-center px-4 border-b border-zinc-900 h-12">
          <Search size={16} className="text-zinc-500 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none h-full"
            placeholder="Type a command or query..."
          />
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-3xs text-zinc-500 px-2 py-0.5 rounded font-mono">
            <span>ESC</span>
          </div>
        </div>

        {/* Commands list */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-zinc-500 font-medium">
              No matching commands found.
            </div>
          ) : (
            Object.entries(
              filteredCommands.reduce((acc, current) => {
                if (!acc[current.category]) acc[current.category] = [];
                acc[current.category].push(current);
                return acc;
              }, {} as Record<string, typeof commands>)
            ).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <div className="px-4 py-1.5 text-3xs font-semibold text-zinc-500 uppercase tracking-wider bg-zinc-950/20">
                  {category}
                </div>
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectCommand(item.id);
                        onClose();
                      }}
                      className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-zinc-900/40 text-xs transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md bg-zinc-900/60 border border-zinc-900 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 transition-colors">
                          <Icon size={12} />
                        </div>
                        <div>
                          <p className="font-medium text-zinc-200 group-hover:text-zinc-100">
                            {item.title}
                          </p>
                          <p className="text-3xs text-zinc-500 group-hover:text-zinc-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <div className="text-3xs text-zinc-500 group-hover:text-zinc-400 flex items-center gap-1 font-mono">
                        <span>Enter</span>
                        <ArrowRight size={10} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
