"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { CompanyIntelligence } from "@/lib/mockData";
import {
  Building2,
  DollarSign,
  Newspaper,
  Users,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
  Cpu,
  Target,
  Maximize2,
  Minimize2,
  CheckCircle,
  FileDown,
} from "lucide-react";

interface ResearchTabProps {
  companyData: CompanyIntelligence | null;
  onGenerate: (inputs: { name: string; website: string; industry: string; depth: string; audience: string; format: string }) => void;
  isRunning: boolean;
  hideForm?: boolean;
}

export default function ResearchTab({
  companyData,
  onGenerate,
  isRunning,
  hideForm = false,
}: ResearchTabProps) {
  const [form, setForm] = useState({
    name: "",
    website: "",
    industry: "Fintech",
    depth: "Deep Intelligence",
    audience: "CEO",
    format: "PDF",
  });

  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onGenerate(form);
  };

  const fillSample = (name: string, web: string, ind: string) => {
    setForm({ ...form, name, website: web, industry: ind });
  };

  return (
    <div className="space-y-8 p-6">
      {/* Parameters Input Form Card */}
      {!hideForm && (
        <SpotlightCard className="p-6 border border-zinc-900 bg-zinc-950/40 rounded-xl relative overflow-hidden select-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-[48px] pointer-events-none" />
        <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 mb-4">
          <Search size={15} className="text-violet-400" />
          <span>Configure Intelligence Research Parameters</span>
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Company Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Stripe, Vercel"
              className="w-full h-9 rounded-lg px-3 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all placeholder-zinc-600 text-zinc-200"
              required
            />
          </div>

          {/* Website */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Website URL</label>
            <input
              type="text"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="e.g. stripe.com"
              className="w-full h-9 rounded-lg px-3 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all placeholder-zinc-600 text-zinc-200"
            />
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Industry</label>
            <select
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
              className="w-full h-9 rounded-lg px-3 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all text-zinc-300"
            >
              <option value="Fintech">Fintech / Payments</option>
              <option value="Cloud Infrastructure">Cloud / DevTools</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="SaaS">Enterprise Software</option>
              <option value="Healthcare">Healthcare Tech</option>
            </select>
          </div>

          {/* Research Depth */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Research Depth</label>
            <div className="grid grid-cols-3 gap-2">
              {["Basic", "Advanced", "Deep Intelligence"].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setForm({ ...form, depth: d })}
                  className={`h-9 rounded-lg text-2xs font-semibold border transition-all ${
                    form.depth === d
                      ? "bg-violet-950/30 border-violet-500/50 text-violet-300 shadow-md shadow-violet-950/20"
                      : "bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/50"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Target Audience</label>
            <select
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              className="w-full h-9 rounded-lg px-3 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all text-zinc-300"
            >
              <option value="CEO">Chief Executive Officer (CEO)</option>
              <option value="CTO">Chief Technology Officer (CTO)</option>
              <option value="CHRO">Chief Human Resources Officer (CHRO)</option>
              <option value="Hiring Manager">Hiring Manager</option>
              <option value="Investor">Investor / VC Associate</option>
              <option value="Consultant">Management Consultant</option>
            </select>
          </div>

          {/* Output Format */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Output Format</label>
            <div className="grid grid-cols-4 gap-2">
              {["PDF", "PPT", "DOCX", "Email"].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setForm({ ...form, format: fmt })}
                  className={`h-9 rounded-lg text-2xs font-semibold border transition-all ${
                    form.format === fmt
                      ? "bg-indigo-950/30 border-indigo-500/50 text-indigo-300"
                      : "bg-zinc-900/30 border-zinc-800/80 text-zinc-400 hover:bg-zinc-900/50"
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Submit & Preset buttons row */}
          <div className="md:col-span-3 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-zinc-900/50">
            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-3xs font-medium text-zinc-500 uppercase">Load Preset:</span>
              <button
                type="button"
                onClick={() => fillSample("Stripe", "stripe.com", "Fintech")}
                className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-3xs font-semibold text-zinc-400 hover:text-white rounded border border-zinc-800 transition-colors"
              >
                Stripe
              </button>
              <button
                type="button"
                onClick={() => fillSample("Vercel", "vercel.com", "Cloud Infrastructure")}
                className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-3xs font-semibold text-zinc-400 hover:text-white rounded border border-zinc-800 transition-colors"
              >
                Vercel
              </button>
              <button
                type="button"
                onClick={() => fillSample("OpenAI", "openai.com", "Artificial Intelligence")}
                className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 text-3xs font-semibold text-zinc-400 hover:text-white rounded border border-zinc-800 transition-colors"
              >
                OpenAI
              </button>
            </div>

            <button
              type="submit"
              disabled={isRunning}
              className="w-full sm:w-auto h-9 px-6 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-zinc-800 disabled:to-zinc-850 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-600/10 border border-indigo-500/20 disabled:border-zinc-800/40 disabled:text-zinc-500 active:scale-97"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-white animate-spin" />
                  <span>Agent Crawling...</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>Execute Intelligence Scan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </SpotlightCard>
      )}

      {/* Results Bento Grid */}
      {companyData ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
                <CheckCircle size={16} className="text-emerald-400" />
                <span>Intelligence Report: {companyData.name}</span>
              </h3>
              <p className="text-3xs text-zinc-500 font-mono">
                Last Compiled: 2026-06-19 • Target: {form.audience} Briefing
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-3xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-850 hover:border-zinc-700 transition-all">
              <FileDown size={12} />
              <span>Download Full {form.format}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
            {/* 1. Company Overview (Col-span 2) */}
            <SpotlightCard
              onClick={() => setExpandedCard("overview")}
              className="md:col-span-2 md:row-span-1 cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Building2 size={13} className="text-violet-400" />
                  <span>Company Overview</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-zinc-300 line-clamp-3 my-2 pr-6">
                {companyData.overview.description}
              </p>
              <div className="flex items-center gap-4 text-3xs font-semibold text-zinc-500">
                <div>HQ: <span className="text-zinc-300">{companyData.overview.hq}</span></div>
                <div>Size: <span className="text-zinc-300">{companyData.overview.size}</span></div>
                <div>Revenue: <span className="text-zinc-300">{companyData.overview.revenue}</span></div>
              </div>
            </SpotlightCard>

            {/* 2. Funding History */}
            <SpotlightCard
              onClick={() => setExpandedCard("funding")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <DollarSign size={13} className="text-amber-400" />
                  <span>Funding History</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="my-2 space-y-1">
                <div className="text-sm font-extrabold text-zinc-100">{companyData.funding.total}</div>
                <div className="text-3xs text-zinc-400 truncate">{companyData.funding.lastRound}</div>
              </div>
              <div className="text-4xs text-zinc-500 font-mono truncate">
                Backed by: {companyData.funding.investors.slice(0, 2).join(", ")}
              </div>
            </SpotlightCard>

            {/* 3. Recent News */}
            <SpotlightCard
              onClick={() => setExpandedCard("news")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Newspaper size={13} className="text-indigo-400" />
                  <span>Recent News</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="my-2 space-y-1.5">
                {companyData.news.slice(0, 1).map((n, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="text-2xs font-semibold text-zinc-200 line-clamp-2 leading-snug">
                      {n.title}
                    </p>
                    <p className="text-4xs text-zinc-500">{n.source} • {n.date}</p>
                  </div>
                ))}
              </div>
              <div className="text-4xs text-zinc-500">
                Total {companyData.news.length} scanned publications
              </div>
            </SpotlightCard>

            {/* 4. Leadership Team */}
            <SpotlightCard
              onClick={() => setExpandedCard("leadership")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-emerald-400" />
                  <span>Leadership Team</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="my-2 space-y-1">
                {companyData.leadership.slice(0, 2).map((l, i) => (
                  <div key={i} className="flex justify-between items-center text-3xs">
                    <span className="font-semibold text-zinc-200">{l.name}</span>
                    <span className="text-zinc-500 truncate max-w-[100px]">{l.role}</span>
                  </div>
                ))}
              </div>
              <p className="text-4xs text-zinc-500 italic truncate">
                Founding structure: {companyData.leadership[0]?.name}
              </p>
            </SpotlightCard>

            {/* 5. Technology Stack */}
            <SpotlightCard
              onClick={() => setExpandedCard("techStack")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Layers size={13} className="text-sky-400" />
                  <span>Technology Stack</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="my-2 flex flex-wrap gap-1">
                {companyData.techStack.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="text-4xs px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="text-4xs text-zinc-500">
                Total {companyData.techStack.length} frameworks detected
              </div>
            </SpotlightCard>

            {/* 6. Hiring Signals */}
            <SpotlightCard
              onClick={() => setExpandedCard("hiringSignals")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Cpu size={13} className="text-rose-400" />
                  <span>Hiring Signals</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-3xs text-zinc-300 line-clamp-3 leading-snug my-2 pr-2">
                {companyData.hiringSignals[0]}
              </p>
              <div className="text-4xs text-zinc-500">
                Growth trend: Active Expansion
              </div>
            </SpotlightCard>

            {/* 7. Competitor Analysis */}
            <SpotlightCard
              onClick={() => setExpandedCard("competitors")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-teal-400" />
                  <span>Competitor Analysis</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="my-2 space-y-1">
                {companyData.competitors.slice(0, 1).map((c, i) => (
                  <div key={i} className="space-y-0.5">
                    <p className="text-3xs font-bold text-zinc-200">{c.name}</p>
                    <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                      {c.advantage}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-4xs text-zinc-500">
                Matrix vs {companyData.competitors.length} firms
              </div>
            </SpotlightCard>

            {/* 8. Buying Signals */}
            <SpotlightCard
              onClick={() => setExpandedCard("buyingSignals")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Target size={13} className="text-purple-400" />
                  <span>Buying Signals</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-3xs text-zinc-300 line-clamp-3 leading-snug my-2 pr-2">
                {companyData.buyingSignals[0]}
              </p>
              <div className="text-4xs text-zinc-500">
                Buy propensity: High Trigger
              </div>
            </SpotlightCard>

            {/* 9. Recommended Pitch (Col-span 2) */}
            <SpotlightCard
              onClick={() => setExpandedCard("pitch")}
              className="md:col-span-2 cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-yellow-400" />
                  <span>Recommended Pitch Strategy</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="my-2.5">
                <p className="text-xs font-bold text-zinc-200 truncate">
                  {companyData.recommendedPitch.angle}
                </p>
                <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed mt-1 pr-6">
                  Pain: {companyData.recommendedPitch.painPoint}
                </p>
              </div>
              <div className="text-4xs text-zinc-500 font-mono truncate">
                Ideal Approach: {companyData.recommendedPitch.solution}
              </div>
            </SpotlightCard>

            {/* 10. Key Decision Makers */}
            <SpotlightCard
              onClick={() => setExpandedCard("decisionMakers")}
              className="cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-3xs font-semibold uppercase text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Users size={13} className="text-cyan-400" />
                  <span>Key Decision Makers</span>
                </div>
                <Maximize2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="my-2 space-y-1">
                {companyData.decisionMakers.slice(0, 2).map((dm, i) => (
                  <div key={i} className="text-3xs">
                    <p className="font-semibold text-zinc-200 leading-none">{dm.name}</p>
                    <p className="text-zinc-500 text-[10px] truncate max-w-[150px]">{dm.role}</p>
                  </div>
                ))}
              </div>
              <div className="text-4xs text-zinc-500">
                Active connections found
              </div>
            </SpotlightCard>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-zinc-900 rounded-xl p-12 text-center text-zinc-500 text-xs font-semibold select-none bg-zinc-950/10">
          Enter a company name above or click one of the presets to execute an AI intelligence crawl.
        </div>
      )}

      {/* Expanded Card Modal Panel */}
      {expandedCard && companyData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setExpandedCard(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <Minimize2 size={16} />
            </button>

            {/* Render Details based on active selection */}
            {expandedCard === "overview" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Building2 size={15} className="text-violet-400" />
                  <span>Company Overview Details</span>
                </h3>
                <div className="space-y-4 py-2">
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {companyData.overview.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg">
                      <p className="text-4xs font-semibold uppercase text-zinc-500">Headquarters</p>
                      <p className="text-xs font-semibold text-zinc-200 mt-1">{companyData.overview.hq}</p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg">
                      <p className="text-4xs font-semibold uppercase text-zinc-500">Staff Count</p>
                      <p className="text-xs font-semibold text-zinc-200 mt-1">{companyData.overview.size}</p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg col-span-2">
                      <p className="text-4xs font-semibold uppercase text-zinc-500">Estimated Annual Revenue</p>
                      <p className="text-xs font-semibold text-zinc-200 mt-1">{companyData.overview.revenue}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {expandedCard === "funding" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <DollarSign size={15} className="text-amber-400" />
                  <span>Funding & Diligence Data</span>
                </h3>
                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg">
                      <p className="text-4xs font-semibold uppercase text-zinc-500">Total Funds Secured</p>
                      <p className="text-sm font-extrabold text-zinc-100 mt-1">{companyData.funding.total}</p>
                    </div>
                    <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg">
                      <p className="text-4xs font-semibold uppercase text-zinc-500 font-semibold">Latest Round Valuation</p>
                      <p className="text-xs font-semibold text-zinc-200 mt-1.5">{companyData.funding.lastRound}</p>
                    </div>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg">
                    <p className="text-4xs font-semibold uppercase text-zinc-500 mb-2">Primary Investors</p>
                    <ul className="list-disc pl-4 text-xs text-zinc-300 space-y-1 font-semibold">
                      {companyData.funding.investors.map((inv) => (
                        <li key={inv}>{inv}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {expandedCard === "news" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Newspaper size={15} className="text-indigo-400" />
                  <span>Recent Corporate Press Releases & News</span>
                </h3>
                <div className="space-y-3 py-2">
                  {companyData.news.map((item, index) => (
                    <div key={index} className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-lg space-y-1.5">
                      <p className="text-xs font-semibold text-zinc-200 leading-snug">{item.title}</p>
                      <div className="flex justify-between text-4xs text-zinc-500">
                        <span>Source: {item.source}</span>
                        <span>Date: {item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {expandedCard === "leadership" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Users size={15} className="text-emerald-400" />
                  <span>Corporate Leadership Team Directory</span>
                </h3>
                <div className="space-y-3 py-2">
                  {companyData.leadership.map((l, index) => (
                    <div key={index} className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-zinc-200">{l.name}</p>
                        <p className="text-3xs text-zinc-500 mt-0.5">Role: {l.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-4xs font-semibold uppercase text-zinc-500">Prior Affiliation</p>
                        <p className="text-3xs text-zinc-300 mt-0.5">{l.previous}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {expandedCard === "techStack" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Layers size={15} className="text-sky-400" />
                  <span>Detected Frameworks & Technology Stack</span>
                </h3>
                <div className="py-2 space-y-3">
                  <p className="text-xs text-zinc-400">
                    Our scanner analyzed global HTTP headers, domain DNS, and public dependency structures:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {companyData.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-300 font-mono shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {expandedCard === "hiringSignals" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Cpu size={15} className="text-rose-400" />
                  <span>Strategic Hiring Signals</span>
                </h3>
                <div className="space-y-3 py-2">
                  {companyData.hiringSignals.map((item, index) => (
                    <div key={index} className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg text-xs text-zinc-300 leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}

            {expandedCard === "competitors" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <TrendingUp size={15} className="text-teal-400" />
                  <span>Competitive Matrix Comparisons</span>
                </h3>
                <div className="space-y-4 py-2">
                  {companyData.competitors.map((c, index) => (
                    <div key={index} className="bg-zinc-900/40 border border-zinc-900 p-4 rounded-lg space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-xs font-bold text-zinc-100">{c.name}</span>
                        <span className="text-[10px] text-zinc-500">{c.share}</span>
                      </div>
                      <p className="text-xs text-zinc-300">
                        <strong className="text-violet-400 text-3xs font-semibold uppercase block mb-1">Our Advantage:</strong>
                        {c.advantage}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {expandedCard === "buyingSignals" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Target size={15} className="text-purple-400" />
                  <span>Commercial Buying Signals Detected</span>
                </h3>
                <div className="space-y-3 py-2">
                  {companyData.buyingSignals.map((item, index) => (
                    <div key={index} className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg text-xs text-zinc-300 leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </>
            )}

            {expandedCard === "pitch" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Sparkles size={15} className="text-yellow-400" />
                  <span>Consulting Outreach Pitch Strategy</span>
                </h3>
                <div className="space-y-4 py-2 text-xs">
                  <div className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg">
                    <p className="text-4xs font-semibold uppercase text-zinc-500">Strategic Theme</p>
                    <p className="text-sm font-bold text-zinc-200 mt-1">{companyData.recommendedPitch.angle}</p>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-lg space-y-1">
                    <p className="text-4xs font-semibold uppercase text-zinc-500">Core Client Pain Point</p>
                    <p className="text-zinc-300 leading-relaxed">{companyData.recommendedPitch.painPoint}</p>
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-lg space-y-1">
                    <p className="text-4xs font-semibold uppercase text-zinc-500">Proposed Solution Mechanics</p>
                    <p className="text-zinc-300 leading-relaxed">{companyData.recommendedPitch.solution}</p>
                  </div>
                </div>
              </>
            )}

            {expandedCard === "decisionMakers" && (
              <>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <Users size={15} className="text-cyan-400" />
                  <span>Target Accounts Decision Makers</span>
                </h3>
                <div className="space-y-3 py-2">
                  {companyData.decisionMakers.map((dm, index) => (
                    <div key={index} className="bg-zinc-900/40 border border-zinc-900 p-3 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-zinc-200">{dm.name}</p>
                        <p className="text-3xs text-zinc-500 mt-0.5">{dm.role}</p>
                      </div>
                      <a
                        href={`https://${dm.linkedin}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-4xs px-2.5 py-1.5 rounded-md bg-zinc-850 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
