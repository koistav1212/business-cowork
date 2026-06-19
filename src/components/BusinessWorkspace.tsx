"use client";

import React, { useState, useEffect } from "react";
import { SpotlightCard } from "./SpotlightCard";
import ResearchTab from "./ResearchTab";
import ProposalBuilder from "./ProposalBuilder";
import PresentationBuilder from "./PresentationBuilder";
import EmailCampaign from "./EmailCampaign";
import { CompanyIntelligence, getSlidesForCount, getEmailForGoalAndStyle } from "@/lib/mockData";
import {
  FileDown,
  Building2,
  Presentation,
  FileText,
  Mail,
  CheckCircle2,
  Sparkles,
  Download,
  Terminal,
  Plus,
  Send,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

interface BusinessWorkspaceProps {
  companyData: CompanyIntelligence | null;
  isRunning: boolean;
  onRunAction: (type: "research" | "proposal" | "presentation" | "email", callback: () => void) => void;
  slidesCount: number;
  writingStyle: string;
  sourcingGoal: string;
}

export default function BusinessWorkspace({
  companyData,
  isRunning,
  onRunAction,
  slidesCount,
  writingStyle,
  sourcingGoal,
}: BusinessWorkspaceProps) {
  const [activeSubTab, setActiveSubTab] = useState<"dossier" | "slides" | "proposal" | "emails">("dossier");

  // Dynamic Workspace States
  const [slides, setSlides] = useState<any[]>([]);
  const [proposalTitle, setProposalTitle] = useState("Enterprise Sourcing Modernization Proposal");

  // Email States
  const [emailGoal, setEmailGoal] = useState("Cold Outreach");
  const [emailStyle, setEmailStyle] = useState(writingStyle || "Executive");
  const [emailPrompt, setEmailPrompt] = useState(`Need a proposal email introducing TalentIQ to ${companyData?.name || "Zoho"} HR leaders.`);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailFollowup, setEmailFollowup] = useState("");
  const [emailCTA, setEmailCTA] = useState("");

  // Slide Deck Selection States
  const [pptGoal, setPptGoal] = useState("Sales Proposal");
  const [pptCount, setPptCount] = useState(slidesCount || 10);
  const [pptTone, setPptTone] = useState("Consulting");
  const [pptPrompt, setPptPrompt] = useState(`Pitch TalentIQ to ${companyData?.name || "Zoho"}'s CHRO.`);

  // Initialize slides and emails based on props
  useEffect(() => {
    if (companyData) {
      setSlides(getSlidesForCount(slidesCount || 10, companyData.name, sourcingGoal));
      
      const emailAssets = getEmailForGoalAndStyle(
        "Cold Outreach",
        writingStyle || "Executive",
        companyData.name,
        sourcingGoal
      );
      setEmailSubject(emailAssets.subject);
      setEmailBody(emailAssets.body);
      setEmailFollowup(emailAssets.followup);
      setEmailCTA(emailAssets.cta);

      setProposalTitle(`${companyData.name} Vetting Modernization Proposal`);
    }
  }, [companyData, slidesCount, writingStyle, sourcingGoal]);

  // Handle Dynamic PPT Generation
  const handleRegeneratePPT = () => {
    onRunAction("presentation", () => {
      if (companyData) {
        setSlides(getSlidesForCount(pptCount, companyData.name, pptPrompt));
        alert(`Presentation deck successfully updated with ${pptCount} slides in "${pptTone}" tone!`);
      }
    });
  };

  // Handle Dynamic Email Generation
  const handleRegenerateEmail = () => {
    onRunAction("email", () => {
      if (companyData) {
        const emailAssets = getEmailForGoalAndStyle(
          emailGoal,
          emailStyle,
          companyData.name,
          emailPrompt
        );
        setEmailSubject(emailAssets.subject);
        setEmailBody(emailAssets.body);
        setEmailFollowup(emailAssets.followup);
        setEmailCTA(emailAssets.cta);
        alert(`Email sequence updated for goal: "${emailGoal}" in "${emailStyle}" writing style!`);
      }
    });
  };

  if (!companyData) {
    return (
      <div className="h-full flex items-center justify-center p-12 text-zinc-500 font-semibold select-none bg-zinc-950/10">
        No active business package loaded. Define parameters on the Dashboard and click Generate.
      </div>
    );
  }

  // Deliverables List
  const deliverables = [
    { name: "Executive_Summary.pdf", size: "820 KB", type: "PDF" },
    { name: "Sales_Proposal.pptx", size: "3.4 MB", type: "PPTX" },
    { name: "Outreach_Email.html", size: "12 KB", type: "HTML" },
    { name: "Followup_Email.html", size: "8 KB", type: "HTML" },
    { name: "Meeting_Brief.docx", size: "1.1 MB", type: "DOCX" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Deliverables Bar */}
      <SpotlightCard className="p-4 border border-zinc-900 bg-zinc-950/20 rounded-xl space-y-3 select-none">
        <div className="flex items-center justify-between border-b border-zinc-900/60 pb-2">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span className="text-3xs font-semibold uppercase tracking-wider text-zinc-400">
              Active Deliverables Package
            </span>
          </div>
          <span className="text-4xs font-mono text-zinc-650">Ready to download</span>
        </div>

        <div className="flex flex-wrap gap-3">
          {deliverables.map((file) => (
            <button
              key={file.name}
              onClick={() => alert(`Downloading: ${file.name}`)}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-850 hover:border-zinc-700 transition-all rounded-lg text-left group"
            >
              <div className="space-y-0.5">
                <p className="text-3xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {file.name}
                </p>
                <p className="text-[9px] text-zinc-500 font-mono">
                  {file.type} • {file.size}
                </p>
              </div>
              <Download size={12} className="text-zinc-500 group-hover:text-violet-400 transition-colors" />
            </button>
          ))}
        </div>
      </SpotlightCard>

      {/* Sub-Tab Navigation Switcher */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-1 bg-zinc-950 p-1 border border-zinc-900 rounded-lg select-none">
          {[
            { id: "dossier" as const, label: "Company Dossier", icon: Building2 },
            { id: "slides" as const, label: "PowerPoint Deck", icon: Presentation },
            { id: "proposal" as const, label: "Executive Proposal", icon: FileText },
            { id: "emails" as const, label: "Email Campaign", icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-3xs font-semibold rounded-md transition-colors ${
                  active
                    ? "bg-zinc-900 text-zinc-200 border-b border-violet-500"
                    : "text-zinc-500 hover:text-zinc-350"
                }`}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <span className="text-3xs font-semibold text-zinc-500 font-mono select-none">
          Project Workspace Context: {companyData.name}
        </span>
      </div>

      {/* Sub-Tab content viewport */}
      <div className="bg-[#040406]/20 border border-zinc-900/60 rounded-xl overflow-hidden min-h-[500px]">
        {activeSubTab === "dossier" && (
          <ResearchTab companyData={companyData} onGenerate={() => {}} isRunning={isRunning} hideForm={true} />
        )}

        {activeSubTab === "slides" && (
          <div className="flex flex-col h-full">
            {/* Custom presentation goals & selectors */}
            <div className="p-6 bg-zinc-950/20 border-b border-zinc-900 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-violet-400 animate-pulse" />
                <span className="text-2xs font-semibold uppercase tracking-wider text-zinc-300">
                  Slide Deck Sourcing Parameters
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Goal selector */}
                <div className="space-y-1.5">
                  <label className="text-3xs font-semibold text-zinc-500 uppercase">Presentation Goal</label>
                  <select
                    value={pptGoal}
                    onChange={(e) => setPptGoal(e.target.value)}
                    className="w-full h-8 rounded-lg px-2.5 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none text-zinc-300"
                  >
                    <option value="Sales Proposal">Sales Sourcing Proposal</option>
                    <option value="Investor Deck">Investor Pitch Deck</option>
                    <option value="Research Brief">Research Dossier Brief</option>
                    <option value="Executive Summary">Executive Brief Summary</option>
                    <option value="Interview Preparation">Interview Prep talking points</option>
                    <option value="Competitive Analysis">Competitive Matrix comparison</option>
                  </select>
                </div>

                {/* Tone selector */}
                <div className="space-y-1.5">
                  <label className="text-3xs font-semibold text-zinc-500 uppercase">Presentation Tone</label>
                  <select
                    value={pptTone}
                    onChange={(e) => setPptTone(e.target.value)}
                    className="w-full h-8 rounded-lg px-2.5 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none text-zinc-300"
                  >
                    <option value="Corporate">Corporate / Minimal</option>
                    <option value="Consulting">Consulting / High-trust</option>
                    <option value="Startup">Startup / Bold</option>
                    <option value="Enterprise">Enterprise / Sleek</option>
                    <option value="Modern">Modern / Glassmorphic</option>
                  </select>
                </div>

                {/* Slide Count */}
                <div className="space-y-1.5">
                  <label className="text-3xs font-semibold text-zinc-500 uppercase">Slide Count</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[3, 5, 7, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPptCount(num)}
                        className={`h-8 rounded text-2xs font-semibold border transition-all ${
                          pptCount === num
                            ? "bg-violet-950/20 border-violet-500/50 text-violet-300"
                            : "bg-zinc-900/30 border-zinc-850 text-zinc-500 hover:bg-zinc-900/50"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt instructions */}
                <div className="space-y-1.5">
                  <label className="text-3xs font-semibold text-zinc-500 uppercase">Prompt Sourcing Focus</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={pptPrompt}
                      onChange={(e) => setPptPrompt(e.target.value)}
                      className="flex-1 h-8 rounded-lg px-2.5 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none text-zinc-300"
                    />
                    <button
                      onClick={handleRegeneratePPT}
                      disabled={isRunning}
                      className="h-8 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-3xs font-bold text-white transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slide previews workspace */}
            <PresentationBuilder onGeneratePPT={handleRegeneratePPT} isRunning={isRunning} />
          </div>
        )}

        {activeSubTab === "proposal" && (
          <ProposalBuilder onGenerateProposal={() => {}} isRunning={isRunning} />
        )}

        {activeSubTab === "emails" && (
          <div className="flex flex-col h-full">
            {/* Custom Sourcing Email Goal parameters selector */}
            <div className="p-6 bg-zinc-950/20 border-b border-zinc-900 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-violet-400 animate-pulse" />
                <span className="text-2xs font-semibold uppercase tracking-wider text-zinc-300">
                  AI Campaign Sequence Director
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {/* Email Goal Box */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-3xs font-semibold text-zinc-500 uppercase">Campaign Sourcing Goal</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Cold Outreach", "Follow-up", "Proposal Delivery", "Meeting Request", "Partnership", "Investor Outreach"].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setEmailGoal(goal)}
                        className={`h-8 rounded text-3xs font-semibold border transition-all ${
                          emailGoal === goal
                            ? "bg-violet-950/20 border-violet-500/50 text-violet-300"
                            : "bg-zinc-900/30 border-zinc-850 text-zinc-550 hover:bg-zinc-900/50"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Select */}
                <div className="space-y-1.5">
                  <label className="text-3xs font-semibold text-zinc-500 uppercase">Writing Style Tone</label>
                  <select
                    value={emailStyle}
                    onChange={(e) => setEmailStyle(e.target.value)}
                    className="w-full h-8 rounded-lg px-2.5 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none text-zinc-300"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Executive">Executive</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Consultative">Consultative / McKinsey</option>
                    <option value="Persuasive">Persuasive</option>
                    <option value="Startup Founder">Startup Founder</option>
                    <option value="McKinsey Style">McKinsey Style</option>
                    <option value="VC Style">VC Style</option>
                  </select>
                </div>

                {/* Sourcing Prompt instructions */}
                <div className="space-y-1.5">
                  <label className="text-3xs font-semibold text-zinc-500 uppercase">Instruction Prompt</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={emailPrompt}
                      onChange={(e) => setEmailPrompt(e.target.value)}
                      className="flex-1 h-8 rounded-lg px-2.5 text-xs bg-zinc-900/60 border border-zinc-800 focus:border-violet-500 focus:outline-none text-zinc-300"
                    />
                    <button
                      onClick={handleRegenerateEmail}
                      disabled={isRunning}
                      className="h-8 px-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-3xs font-bold text-white transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Workspace View */}
            <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-900 bg-zinc-950/20">
              {/* Cold Email Outline */}
              <div className="flex-1 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-violet-400" />
                    <span className="text-xs font-bold text-zinc-200">Outreach Email Template</span>
                  </div>
                  <span className="text-4xs text-emerald-400 font-semibold bg-emerald-950/20 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                    Primary Sourcing
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-3xs font-semibold text-zinc-500 uppercase">Subject</span>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full h-8 rounded px-2.5 text-xs bg-zinc-900/40 border border-zinc-850 focus:outline-none text-zinc-300 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-3xs font-semibold text-zinc-500 uppercase">Body Context</span>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      rows={9}
                      className="w-full rounded p-3 text-xs bg-zinc-900/40 border border-zinc-850 focus:outline-none text-zinc-300 font-sans leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Follow-up Sequence */}
              <div className="flex-1 p-6 space-y-4 bg-zinc-950/40">
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-indigo-400" />
                    <span className="text-xs font-bold text-zinc-200">Outreach Follow-up Sequence</span>
                  </div>
                  <span className="text-4xs text-violet-400 font-semibold bg-violet-950/20 border border-violet-900/20 px-1.5 py-0.5 rounded">
                    Day 3 Follow-up
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-3xs font-semibold text-zinc-500 uppercase">CTA Target</span>
                    <input
                      type="text"
                      value={emailCTA}
                      onChange={(e) => setEmailCTA(e.target.value)}
                      className="w-full h-8 rounded px-2.5 text-xs bg-zinc-900/40 border border-zinc-850 focus:outline-none text-zinc-300 font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-3xs font-semibold text-zinc-500 uppercase">Follow-up Template</span>
                    <textarea
                      value={emailFollowup}
                      onChange={(e) => setEmailFollowup(e.target.value)}
                      rows={9}
                      className="w-full rounded p-3 text-xs bg-zinc-900/40 border border-zinc-850 focus:outline-none text-zinc-300 font-sans leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions Footer */}
            <div className="p-4 border-t border-zinc-900 flex items-center justify-between bg-zinc-950/40">
              <span className="text-3xs text-zinc-500 font-semibold">
                Recipient Target Sourcing Address: deepa.krishnan@{companyData.name.toLowerCase()}.com
              </span>
              <button
                onClick={() => alert(`Outreach templates stashed as drafts inside Gmail client!`)}
                className="h-8 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-650 hover:from-violet-500 hover:to-indigo-500 text-3xs font-bold text-white flex items-center gap-1 transition-all shadow-md active:scale-97"
              >
                <Send size={10} />
                <span>Inject Gmail Drafts</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
