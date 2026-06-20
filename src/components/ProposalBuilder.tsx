"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { defaultProposal, getProposalForCompany } from "@/lib/mockData";
import { FileText, Sparkles, AlertTriangle, Lightbulb, FileDown, CheckCircle2 } from "lucide-react";

interface ProposalBuilderProps {
  onGenerateProposal: (proposalTitle: string) => void;
  isRunning: boolean;
  companyData: any;
}

export default function ProposalBuilder({
  onGenerateProposal,
  isRunning,
  companyData,
}: ProposalBuilderProps) {
  const [proposal, setProposal] = useState(defaultProposal);

  React.useEffect(() => {
    if (companyData && companyData.name) {
      setProposal(getProposalForCompany(companyData.name, companyData.overview?.description));
    }
  }, [companyData]);

  const aiSuggestions: Record<string, { tips: string[]; risks: string[]; gains: string[] }> = {
    executiveSummary: {
      tips: ["Lead with the $180k cost reductions explicitly.", "Frame the problem as a timeline challenge."],
      risks: ["Client might push back on on-prem routing costs.", "Requires early alignment with security compliance."],
      gains: ["Strong differentiator against legacy competitors like Adyen."],
    },
    problemStatement: {
      tips: ["Mention the average 15-day reconciliation cycles.", "Address customer support escalation rates."],
      risks: ["Do not overstate database vulnerability, emphasize efficiency."],
      gains: ["Quantifiable metrics will validate organizational buy-in."],
    },
    roi: {
      tips: ["Show year 1 break-even chart link.", "Add calculations for developer resources saved."],
      risks: ["Ensure SLA guarantees do not exceed team capabilities."],
      gains: ["310% ROI is conservative, likely higher with usage volume."],
    },
    pricing: {
      tips: ["Present tiered options for maintenance licenses.", "Suggest quarterly billing options."],
      risks: ["Check if flat implementation fee covers standard migrations."],
      gains: ["Recurring SaaS licenses establish long-term account values."],
    },
  };

  const [activeSection, setActiveSection] = useState<keyof typeof defaultProposal>("executiveSummary");

  const handleTextChange = (field: keyof typeof defaultProposal, value: string) => {
    setProposal({ ...proposal, [field]: value });
  };

  const activeAI = aiSuggestions[activeSection] || {
    tips: ["Provide structured client metrics.", "Align with executive goals."],
    risks: ["Check compatibility with regional payment systems."],
    gains: ["Demonstrates clear operational speed upgrades."],
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
      {/* Left pane: Editable fields */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
              <FileText size={16} className="text-violet-400" />
              <span>Interactive Proposal Builder</span>
            </h2>
            <p className="text-3xs text-zinc-500 font-mono">
              Target Profile: {proposal.company} • File Format: docx / pdf
            </p>
          </div>

          <button
            onClick={() => onGenerateProposal(proposal.title)}
            disabled={isRunning}
            className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-zinc-800 disabled:to-zinc-850 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-md active:scale-97 disabled:scale-100 disabled:text-zinc-500"
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-white animate-spin" />
                <span>Compiling PDF...</span>
              </>
            ) : (
              <>
                <FileDown size={14} />
                <span>Compile Proposal PDF</span>
              </>
            )}
          </button>
        </div>

        {/* Input Blocks */}
        <div className="space-y-5">
          {/* Document Title */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Proposal Document Title</label>
            <input
              type="text"
              value={proposal.title}
              onChange={(e) => handleTextChange("title", e.target.value)}
              className="w-full h-9 rounded-lg px-3 text-xs bg-zinc-900/40 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all text-zinc-200"
            />
          </div>

          {/* Section Editors */}
          {[
            { id: "executiveSummary", label: "Executive Summary" },
            { id: "problemStatement", label: "Problem Statement" },
            { id: "opportunity", label: "Business Opportunity" },
            { id: "solutionOverview", label: "Solution Overview" },
            { id: "roi", label: "Expected ROI Calculations" },
            { id: "implementationPlan", label: "Implementation Schedule" },
            { id: "pricing", label: "Pricing Strategy" },
            { id: "caseStudies", label: "Case Studies" },
            { id: "nextSteps", label: "Next Steps & Action plan" },
          ].map((sec) => (
            <div
              key={sec.id}
              onClick={() => setActiveSection(sec.id as keyof typeof defaultProposal)}
              className={`space-y-1.5 p-3 rounded-lg border transition-all cursor-pointer ${
                activeSection === sec.id
                  ? "bg-zinc-900/20 border-violet-500/40"
                  : "bg-zinc-950/20 border-zinc-900 hover:border-zinc-800"
              }`}
            >
              <div className="flex justify-between items-center text-3xs font-semibold uppercase tracking-wider text-zinc-400">
                <span>{sec.label}</span>
                {activeSection === sec.id && (
                  <span className="text-violet-400 text-4xs font-mono font-medium">Active Editor Context</span>
                )}
              </div>
              <textarea
                value={proposal[sec.id as keyof typeof defaultProposal] || ""}
                onChange={(e) => handleTextChange(sec.id as keyof typeof defaultProposal, e.target.value)}
                className="w-full min-h-[80px] bg-transparent text-xs text-zinc-300 placeholder-zinc-700 focus:outline-none resize-none pt-1"
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right pane: AI Context Panel */}
      <div className="w-80 border-l border-zinc-900 bg-zinc-950/50 p-5 space-y-6 overflow-y-auto select-none">
        <h3 className="text-2xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 pb-2.5 border-b border-zinc-900">
          <Sparkles size={13} className="text-violet-400 animate-pulse" />
          <span>Real-time AI Auditor</span>
        </h3>

        {/* Live AI Suggestions */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-3xs font-semibold text-zinc-500 uppercase">
            <Lightbulb size={12} className="text-yellow-400" />
            <span>Copywriting Improvements</span>
          </div>
          <div className="space-y-1.5">
            {activeAI.tips.map((tip, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-yellow-500/5 border border-yellow-500/10 text-3xs text-zinc-300 leading-normal">
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-3xs font-semibold text-zinc-500 uppercase">
            <AlertTriangle size={12} className="text-rose-400" />
            <span>Risk Audits</span>
          </div>
          <div className="space-y-1.5">
            {activeAI.risks.map((risk, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/10 text-3xs text-zinc-300 leading-normal">
                {risk}
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Opportunities */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-3xs font-semibold text-zinc-500 uppercase">
            <CheckCircle2 size={12} className="text-emerald-400" />
            <span>Value Upsells</span>
          </div>
          <div className="space-y-1.5">
            {activeAI.gains.map((gain, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-3xs text-zinc-300 leading-normal">
                {gain}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
