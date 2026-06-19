"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Plus,
  Send,
  Building,
  Target,
  Users,
  Sliders,
  Layers,
  Check,
  ChevronDown,
  Globe,
  PlusCircle,
  Cpu,
  ArrowRight,
} from "lucide-react";

interface MainHeroProps {
  onGeneratePackage: (form: {
    company: string;
    goal: string;
    audience: string;
    outputs: { ppt: boolean; pdf: boolean; email: boolean };
    depth: string;
    style: string;
    slides: number;
  }) => void;
  isRunning: boolean;
}

export default function MainHero({
  onGeneratePackage,
  isRunning,
}: MainHeroProps) {
  // Main form states
  const [company, setCompany] = useState("Zoho");
  const [goal, setGoal] = useState("Sell TalentIQ Interview Platform");
  const [audience, setAudience] = useState("CHRO");
  const [outputs, setOutputs] = useState({ ppt: true, pdf: true, email: true });
  const [depth, setDepth] = useState("Deep Intelligence");
  const [style, setStyle] = useState("Executive");
  const [slides, setSlides] = useState(10);

  // UI state
  const [activePopover, setActivePopover] = useState<
    "company" | "goal" | "audience" | "slides" | "style" | "outputs" | "plus" | null
  >(null);
  const [tempCompanyInput, setTempCompanyInput] = useState(company);
  const [tempGoalInput, setTempGoalInput] = useState(goal);

  // Greeting based on time
  const [greeting, setGreeting] = useState("Afternoon");
  useEffect(() => {
    const hr = new Date().getHours();
    if (hr < 12) setGreeting("Morning");
    else if (hr < 17) setGreeting("Afternoon");
    else setGreeting("Evening");
  }, []);

  const popoverRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !goal.trim() || !audience.trim()) return;
    onGeneratePackage({
      company,
      goal,
      audience,
      outputs,
      depth,
      style,
      slides,
    });
  };

  const handleToggleOutput = (key: "ppt" | "pdf" | "email") => {
    setOutputs({ ...outputs, [key]: !outputs[key] });
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-6 py-12 overflow-hidden select-none bg-[#030303]">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="w-full max-w-xl space-y-7 relative z-25 text-center flex flex-col items-center">
        {/* Sun Greeting logo */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-xl text-[#e87a5d] animate-pulse">✴</span>
          <h2 className="text-2xl font-normal text-zinc-300 font-serif leading-none">
            {greeting}, Koustav S
          </h2>
        </div>

        {/* Prompt Input Container */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-[#121214]/65 border border-zinc-900 focus-within:border-zinc-800 focus-within:bg-[#121214]/85 transition-all rounded-2xl shadow-xl flex flex-col p-4 relative"
        >
          {/* Main textarea */}
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="How can I help you today?"
            className="w-full min-h-[85px] bg-transparent text-sm text-zinc-100 placeholder-zinc-550 focus:outline-none resize-none pr-12 font-sans font-normal leading-relaxed"
            required
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          {/* Footer Controls Row inside the prompt box */}
          <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 relative">
            {/* Left: Plus Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover(activePopover === "plus" ? null : "plus")}
                className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-850 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer border border-zinc-950"
              >
                <Plus size={14} />
              </button>

              {activePopover === "plus" && (
                <div
                  ref={popoverRef}
                  className="absolute bottom-9 left-0 w-52 bg-[#09090b] border border-zinc-850 rounded-xl p-1.5 shadow-2xl space-y-0.5 z-40 text-left"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setDepth(depth === "Deep Intelligence" ? "Standard" : "Deep Intelligence");
                      setActivePopover(null);
                    }}
                    className="w-full px-2.5 py-2 flex items-center justify-between rounded-lg hover:bg-zinc-900/60 text-3xs font-semibold text-zinc-300 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Globe size={11} className="text-violet-400" />
                      <span>Web Sourcing Search</span>
                    </div>
                    {depth === "Deep Intelligence" && <Check size={11} className="text-emerald-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Select custom pdf files to upload...")}
                    className="w-full px-2.5 py-2 flex items-center gap-2 rounded-lg hover:bg-zinc-900/60 text-3xs font-semibold text-zinc-300 transition-colors"
                  >
                    <PlusCircle size={11} className="text-zinc-500" />
                    <span>Add files or photos</span>
                  </button>

                  <div className="h-px bg-zinc-900 my-1" />

                  <button
                    type="button"
                    onClick={() => alert("Redirecting to Skills Library...")}
                    className="w-full px-2.5 py-2 flex items-center justify-between rounded-lg hover:bg-zinc-900/60 text-3xs font-semibold text-zinc-300 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Cpu size={11} className="text-amber-500" />
                      <span>Skills Directory</span>
                    </div>
                    <ArrowRight size={9} className="text-zinc-650" />
                  </button>
                </div>
              )}
            </div>

            {/* Model select badge */}
            <span className="text-[10px] text-zinc-550 font-mono font-medium flex items-center gap-1">
              <span>Business Copilot 1.5</span>
              <ChevronDown size={8} />
            </span>

            {/* Right: Submit paperplane */}
            <button
              type="submit"
              disabled={isRunning}
              className="w-7 h-7 rounded-full bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 text-white disabled:text-zinc-550 flex items-center justify-center transition-colors active:scale-95 cursor-pointer shadow-md shadow-violet-950"
            >
              <Send size={11} />
            </button>
          </div>
        </form>

        {/* Dynamic Parameter Pills Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 relative">
          {/* 1. Company Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === "company" ? null : "company")}
              className={`px-3 py-1.5 rounded-full border text-3xs font-semibold flex items-center gap-1.5 transition-all hover:bg-zinc-900/40 cursor-pointer ${
                activePopover === "company"
                  ? "bg-zinc-900 border-violet-500/50 text-violet-300"
                  : "bg-zinc-950/20 border-zinc-900 text-zinc-400"
              }`}
            >
              <Building size={11} />
              <span>Company: {company}</span>
              <ChevronDown size={8} className="text-zinc-500" />
            </button>

            {activePopover === "company" && (
              <div
                ref={popoverRef}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-[#09090b] border border-zinc-850 rounded-xl p-2.5 shadow-2xl space-y-2 z-40 text-left"
              >
                <span className="text-4xs font-bold text-zinc-550 uppercase tracking-wider block">Set Company</span>
                <input
                  type="text"
                  value={tempCompanyInput}
                  onChange={(e) => setTempCompanyInput(e.target.value)}
                  className="w-full h-7 rounded px-2 text-3xs bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCompany(tempCompanyInput);
                      setActivePopover(null);
                    }
                  }}
                />
                <div className="grid grid-cols-3 gap-1">
                  {["Zoho", "Stripe", "Vercel"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCompany(c);
                        setTempCompanyInput(c);
                        setActivePopover(null);
                      }}
                      className="h-6 rounded bg-zinc-900 text-4xs font-semibold text-zinc-300 hover:bg-zinc-800"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Audience Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === "audience" ? null : "audience")}
              className={`px-3 py-1.5 rounded-full border text-3xs font-semibold flex items-center gap-1.5 transition-all hover:bg-zinc-900/40 cursor-pointer ${
                activePopover === "audience"
                  ? "bg-zinc-900 border-violet-500/50 text-violet-300"
                  : "bg-zinc-950/20 border-zinc-900 text-zinc-400"
              }`}
            >
              <Users size={11} />
              <span>Audience: {audience}</span>
              <ChevronDown size={8} className="text-zinc-500" />
            </button>

            {activePopover === "audience" && (
              <div
                ref={popoverRef}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-40 bg-[#09090b] border border-zinc-850 rounded-xl p-1.5 shadow-2xl space-y-0.5 z-40 text-left"
              >
                {["CHRO", "CEO", "CTO", "Investor"].map((aud) => (
                  <button
                    key={aud}
                    type="button"
                    onClick={() => {
                      setAudience(aud);
                      setActivePopover(null);
                    }}
                    className="w-full px-2 py-1.5 rounded hover:bg-zinc-900/60 text-3xs font-semibold text-zinc-300 text-left flex items-center justify-between"
                  >
                    <span>{aud}</span>
                    {audience === aud && <Check size={10} className="text-violet-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Slides Count Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === "slides" ? null : "slides")}
              className={`px-3 py-1.5 rounded-full border text-3xs font-semibold flex items-center gap-1.5 transition-all hover:bg-zinc-900/40 cursor-pointer ${
                activePopover === "slides"
                  ? "bg-zinc-900 border-violet-500/50 text-violet-300"
                  : "bg-zinc-950/20 border-zinc-900 text-zinc-400"
              }`}
            >
              <Sliders size={11} />
              <span>Slides: {slides}</span>
              <ChevronDown size={8} className="text-zinc-500" />
            </button>

            {activePopover === "slides" && (
              <div
                ref={popoverRef}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-32 bg-[#09090b] border border-zinc-850 rounded-xl p-1.5 shadow-2xl space-y-0.5 z-40 text-left"
              >
                {[3, 5, 7, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setSlides(num);
                      setActivePopover(null);
                    }}
                    className="w-full px-2.5 py-1.5 rounded hover:bg-zinc-900/60 text-3xs font-semibold text-zinc-300 text-left flex items-center justify-between"
                  >
                    <span>{num} Slides</span>
                    {slides === num && <Check size={10} className="text-violet-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Tone Style Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === "style" ? null : "style")}
              className={`px-3 py-1.5 rounded-full border text-3xs font-semibold flex items-center gap-1.5 transition-all hover:bg-zinc-900/40 cursor-pointer ${
                activePopover === "style"
                  ? "bg-zinc-900 border-violet-500/50 text-violet-300"
                  : "bg-zinc-950/20 border-zinc-900 text-zinc-400"
              }`}
            >
              <Target size={11} />
              <span>Tone: {style}</span>
              <ChevronDown size={8} className="text-zinc-500" />
            </button>

            {activePopover === "style" && (
              <div
                ref={popoverRef}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-44 bg-[#09090b] border border-zinc-850 rounded-xl p-1.5 shadow-2xl space-y-0.5 z-40 text-left"
              >
                {["Professional", "Executive", "Friendly", "Persuasive", "McKinsey Style", "VC Style"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setStyle(st);
                      setActivePopover(null);
                    }}
                    className="w-full px-2 py-1.5 rounded hover:bg-zinc-900/60 text-3xs font-semibold text-zinc-300 text-left flex items-center justify-between"
                  >
                    <span>{st}</span>
                    {style === st && <Check size={10} className="text-violet-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Outputs Checklist Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === "outputs" ? null : "outputs")}
              className={`px-3 py-1.5 rounded-full border text-3xs font-semibold flex items-center gap-1.5 transition-all hover:bg-zinc-900/40 cursor-pointer ${
                activePopover === "outputs"
                  ? "bg-zinc-900 border-violet-500/50 text-violet-300"
                  : "bg-zinc-950/20 border-zinc-900 text-zinc-400"
              }`}
            >
              <Layers size={11} />
              <span>Deliverables</span>
              <ChevronDown size={8} className="text-zinc-500" />
            </button>

            {activePopover === "outputs" && (
              <div
                ref={popoverRef}
                className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-[#09090b] border border-zinc-850 rounded-xl p-2 shadow-2xl space-y-1.5 z-40 text-left select-none"
              >
                {[
                  { key: "ppt" as const, label: "Presentation Deck" },
                  { key: "pdf" as const, label: "Proposal Brief PDF" },
                  { key: "email" as const, label: "Email Campaign" },
                ].map((item) => {
                  const active = outputs[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleToggleOutput(item.key)}
                      className="w-full px-2.5 py-1.5 rounded hover:bg-zinc-900/60 text-3xs font-semibold text-zinc-350 text-left flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        readOnly
                        className="rounded border-zinc-700 bg-transparent text-violet-500 focus:ring-0 w-3 h-3 cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
