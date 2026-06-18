"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import CommandBar from "@/components/CommandBar";
import CommandPalette from "@/components/CommandPalette";
import MainHero from "@/components/MainHero";
import ResearchTab from "@/components/ResearchTab";
import ProposalBuilder from "@/components/ProposalBuilder";
import PresentationBuilder from "@/components/PresentationBuilder";
import EmailCampaign from "@/components/EmailCampaign";
import ExecutionMonitor, { TimelineStep } from "@/components/ExecutionMonitor";
import ConnectorsPage from "@/components/ConnectorsPage";
import SkillsPage from "@/components/SkillsPage";
import ArtifactsPage, { ArtifactItem } from "@/components/ArtifactsPage";
import RightActivityPanel from "@/components/RightActivityPanel";
import {
  mockCompanies,
  mockConnectors,
  agentLogSequence,
  CompanyIntelligence,
} from "@/lib/mockData";
import {
  Sparkles,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  Database,
  Brain,
  Sliders,
  Play,
  Terminal,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

interface LogLine {
  text: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
}

export default function Home() {
  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Connectors State
  const [connectors, setConnectors] = useState(mockConnectors);
  const connectedCount = connectors.filter((c) => c.status === "Connected").length;

  // Active Company Research Data
  const [companyData, setCompanyData] = useState<CompanyIntelligence | null>(null);

  // Artifacts Page Database
  const [artifacts, setArtifacts] = useState<ArtifactItem[]>([
    {
      id: "art-1",
      name: "Stripe_Diligence_Overview.pdf",
      type: "PDF",
      size: "1.4 MB",
      version: "v1.1",
      createdBy: "Copilot Agent",
      execId: "exec_19f3a",
      summary: "Baseline overview mapping funding tiers, leadership listings, and hiring metrics for Stripe. Compiled during system initialization.",
    },
  ]);

  // Agent Simulator States
  const [agentStatus, setAgentStatus] = useState<"idle" | "running" | "completed">("idle");
  const [agentLogs, setAgentLogs] = useState<LogLine[]>([]);
  const [agentState, setAgentState] = useState({
    stage: "",
    activeTool: "",
    memory: {} as Record<string, string>,
    verification: "",
  });

  // Timeline Progress State
  const [timeline, setTimeline] = useState<TimelineStep[]>(
    agentLogSequence.research.map((item) => ({
      ...item,
      status: "pending" as const,
    }))
  );
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Command Palette listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Simulator Core Loop
  const runAgentTask = (
    type: "research" | "proposal" | "presentation" | "email",
    onCompletePayload: () => void
  ) => {
    if (agentStatus === "running") return;

    setAgentStatus("running");
    setAgentLogs([]);
    setActiveStepIndex(0);

    const steps = agentLogSequence[type];
    setTimeline(
      steps.map((item) => ({
        ...item,
        status: "pending" as const,
      }))
    );

    let stepIndex = 0;
    const runNextStep = () => {
      if (stepIndex >= steps.length) {
        setAgentStatus("completed");
        setAgentState((prev) => ({
          ...prev,
          stage: "Success",
          activeTool: "System Idle",
          verification: "Verified",
        }));
        onCompletePayload();
        return;
      }

      const stepDetails = steps[stepIndex];
      setActiveStepIndex(stepIndex);
      setAgentState((prev) => {
        const updatedMemory = { ...prev.memory };
        if (type === "research" && stepIndex === 0) {
          updatedMemory["target"] = "Stripe";
          updatedMemory["depth"] = "Deep Intelligence";
        } else if (type === "research" && stepIndex === 2) {
          updatedMemory["valuation"] = "$70 Billion";
          updatedMemory["hq"] = "San Francisco, CA";
        }
        return {
          ...prev,
          stage: stepDetails.step,
          activeTool: stepDetails.tool,
          verification: stepIndex >= 3 ? "Verified" : "Verifying",
          memory: updatedMemory,
        };
      });

      // Stream the sublogs of this step
      const stepLogLines = stepDetails.logs.split("\n");
      stepLogLines.forEach((lineText, lineIdx) => {
        setTimeout(() => {
          const now = new Date();
          const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

          let type: "info" | "success" | "warning" = "info";
          if (lineText.includes("Success") || lineText.includes("ACTIVE") || lineText.includes("verified")) {
            type = "success";
          } else if (lineText.includes("Warning") || lineText.includes("Acquiring")) {
            type = "warning";
          }

          setAgentLogs((prev) => [
            ...prev,
            { text: lineText, type, time: timeStr },
          ]);
        }, lineIdx * 120);
      });

      // Schedule next step transition
      setTimeout(() => {
        stepIndex++;
        runNextStep();
      }, stepLogLines.length * 120 + 750);
    };

    runNextStep();
  };

  // Triggers
  const handleExecuteResearch = (inputs: { name: string; website: string; industry: string }) => {
    const presetKey = inputs.name.toLowerCase();
    const resolvedCompany = mockCompanies[presetKey] || {
      ...mockCompanies.generic,
      name: inputs.name,
      website: inputs.website || `${presetKey}.com`,
      industry: inputs.industry,
    };

    setActiveTab("research");

    runAgentTask("research", () => {
      setCompanyData(resolvedCompany);
      // Append a new PDF summary report to artifacts page
      const newReport: ArtifactItem = {
        id: `art-${Date.now()}`,
        name: `${resolvedCompany.name}_Intelligence_Dossier.pdf`,
        type: "PDF",
        size: "2.1 MB",
        version: "v1.0",
        createdBy: "Copilot Agent",
        execId: `exec_${Math.random().toString(36).substring(2, 7)}`,
        summary: `Comprehensive digital footprint mapping for ${resolvedCompany.name}. Features tech stack dependencies, structural hiring indicators, and strategic pitch models.`,
      };
      setArtifacts((prev) => [newReport, ...prev]);
    });
  };

  const handleGenerateProposal = (proposalTitle: string) => {
    runAgentTask("proposal", () => {
      const newProposal: ArtifactItem = {
        id: `art-${Date.now()}`,
        name: `${proposalTitle.replace(/\s+/g, "_")}.pdf`,
        type: "PDF",
        size: "820 KB",
        version: "v1.0",
        createdBy: "Copilot Agent",
        execId: `exec_${Math.random().toString(36).substring(2, 7)}`,
        summary: `Completed enterprise proposal outline compiling Executive Summary, Expected ROI breakdown, and pricing models for client signature.`,
      };
      setArtifacts((prev) => [newProposal, ...prev]);
    });
  };

  const handleGeneratePPT = () => {
    runAgentTask("presentation", () => {
      const newPPT: ArtifactItem = {
        id: `art-${Date.now()}`,
        name: `Stripe_Strategy_Briefing.pptx`,
        type: "PPTX",
        size: "3.4 MB",
        version: "v1.0",
        createdBy: "Copilot Agent",
        execId: `exec_${Math.random().toString(36).substring(2, 7)}`,
        summary: `Consulting-grade slides layout mapping financial reconciliation ROI metrics, ledger synchronizations, and execution schedules.`,
      };
      setArtifacts((prev) => [newPPT, ...prev]);
    });
  };

  const handleSendEmail = (subject: string) => {
    runAgentTask("email", () => {
      alert(`Email sent successfully: "${subject}"`);
    });
  };

  const handleToggleConnect = (connectorId: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (c.id === connectorId) {
          const isConnecting = c.status === "Disconnected";
          return {
            ...c,
            status: isConnecting ? ("Connected" as const) : ("Disconnected" as const),
            sync: isConnecting ? "Just now" : "Never",
          };
        }
        return c;
      })
    );
  };

  const handleSelectCommand = (cmdId: string) => {
    if (cmdId.startsWith("run_research_")) {
      const comp = cmdId.replace("run_research_", "");
      handleExecuteResearch({ name: comp.toUpperCase(), website: `${comp}.com`, industry: "Technology" });
    } else if (cmdId === "switch_proposals") {
      setActiveTab("proposals");
    } else if (cmdId === "switch_presentations") {
      setActiveTab("presentations");
    } else if (cmdId === "switch_email") {
      setActiveTab("email");
    } else if (cmdId === "sync_hubspot") {
      handleToggleConnect("hubspot");
      setActiveTab("connectors");
    } else if (cmdId === "sync_salesforce") {
      handleToggleConnect("salesforce");
      setActiveTab("connectors");
    } else if (cmdId === "run_skill_research") {
      setActiveTab("skills");
      runAgentTask("research", () => {});
    } else if (cmdId === "run_skill_brief") {
      setActiveTab("skills");
      runAgentTask("proposal", () => {});
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#030303]">
      {/* 1. Sidebar Nav */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        connectedCount={connectedCount}
      />

      {/* 2. Main Workspace Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10 bg-[#040406]/60 backdrop-blur-md">
        {/* Top Header Bar */}
        <CommandBar
          onSearchClick={() => setCommandPaletteOpen(true)}
          agentStatus={agentStatus}
          connectedCount={connectedCount}
          totalCount={connectors.length}
          onQuickAction={() => handleExecuteResearch({ name: "Stripe", website: "stripe.com", industry: "Fintech" })}
        />

        {/* Tab Router Switch */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && (
            <MainHero
              onStartReport={() => setActiveTab("research")}
              onViewExecutions={() => setActiveTab("executions")}
              onQuickSelect={(company) =>
                handleExecuteResearch({ name: company, website: `${company}.com`, industry: "Technology" })
              }
            />
          )}

          {activeTab === "research" && (
            <ResearchTab
              companyData={companyData}
              onGenerate={handleExecuteResearch}
              isRunning={agentStatus === "running"}
            />
          )}

          {activeTab === "proposals" && (
            <ProposalBuilder
              onGenerateProposal={handleGenerateProposal}
              isRunning={agentStatus === "running"}
            />
          )}

          {activeTab === "presentations" && (
            <PresentationBuilder
              onGeneratePPT={handleGeneratePPT}
              isRunning={agentStatus === "running"}
            />
          )}

          {activeTab === "email" && (
            <EmailCampaign onSendEmail={handleSendEmail} isRunning={agentStatus === "running"} />
          )}

          {activeTab === "connectors" && (
            <ConnectorsPage
              onToggleConnect={handleToggleConnect}
              connectorsList={connectors}
            />
          )}

          {activeTab === "skills" && (
            <SkillsPage
              onRunSkill={(name) =>
                runAgentTask("research", () => alert(`Completed testing skill: ${name}`))
              }
              isRunning={agentStatus === "running"}
            />
          )}

          {activeTab === "documents" && <ArtifactsPage artifactsList={artifacts} />}

          {activeTab === "executions" && (
            <ExecutionMonitor
              timeline={timeline}
              activeStepIndex={activeStepIndex}
              isRunning={agentStatus === "running"}
            />
          )}

          {activeTab === "memory" && (
            <div className="p-6 space-y-6 select-none max-w-3xl mx-auto">
              <div className="border-b border-zinc-900 pb-4">
                <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
                  <Brain size={16} className="text-violet-400" />
                  <span>Agent Memory Database</span>
                </h2>
                <p className="text-3xs text-zinc-500 font-mono mt-0.5">
                  Long-term metadata stored by the agent across executions.
                </p>
              </div>

              <SpotlightCard className="p-6 border border-zinc-900 bg-zinc-950/40">
                <div className="flex items-center gap-3 border-b border-zinc-900/60 pb-4 mb-4">
                  <Sliders size={15} className="text-violet-400" />
                  <h3 className="text-xs font-bold text-zinc-200">Configure Memory Rules</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-3xs font-semibold text-zinc-400 mb-6">
                  <div className="bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
                    <span className="block text-zinc-500 uppercase">Memory Retention</span>
                    <span className="block text-zinc-300 font-medium mt-1">Unlimited (Persistent)</span>
                  </div>
                  <div className="bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
                    <span className="block text-zinc-500 uppercase">Context Isolation</span>
                    <span className="block text-zinc-300 font-medium mt-1">Isolate by Workspace Profile</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-3xs text-zinc-500 font-bold uppercase block">Memory Entries Cached</span>
                  {Object.keys(agentState.memory).length === 0 ? (
                    <p className="text-xs text-zinc-500 italic py-2">
                      No active memory keys cached. Run an intelligence report first.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {Object.entries(agentState.memory).map(([key, val]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-850"
                        >
                          <span className="font-mono text-violet-400 text-3xs">{key}</span>
                          <span className="text-zinc-300 text-xs font-medium">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-6 space-y-6 max-w-3xl mx-auto select-none">
              <div className="border-b border-zinc-900 pb-4">
                <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
                  <Lock size={16} className="text-violet-400" />
                  <span>Workspace Settings</span>
                </h2>
                <p className="text-3xs text-zinc-500 font-mono mt-0.5">
                  Manage API credentials, usage safety nets, and workspace details.
                </p>
              </div>

              <SpotlightCard className="p-6 border border-zinc-900 bg-zinc-950/40 space-y-5">
                <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-2 border-b border-zinc-900 pb-3">
                  <Sliders size={13} className="text-violet-400" />
                  <span>Security & Safety Net Toggles</span>
                </h3>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-zinc-200">Require approval before sending outbound emails</p>
                      <p className="text-4xs text-zinc-500 mt-0.5">Always prompt before executing Gmail/Slack outreach tasks.</p>
                    </div>
                    <div className="w-9 h-5 rounded-full bg-violet-600 p-0.5 flex items-center justify-end cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3.5">
                    <div>
                      <p className="text-xs font-semibold text-zinc-200">Scrape profiles without direct auth</p>
                      <p className="text-4xs text-zinc-500 mt-0.5">Fall back to public web spiders if direct OAuth is disconnected.</p>
                    </div>
                    <div className="w-9 h-5 rounded-full bg-zinc-800 p-0.5 flex items-center justify-start cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-zinc-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3.5">
                    <div>
                      <p className="text-xs font-semibold text-zinc-200">Cache compiled artifacts securely</p>
                      <p className="text-4xs text-zinc-500 mt-0.5">Encrypt generated report outputs stored in Google Drive and PostgreSQL.</p>
                    </div>
                    <div className="w-9 h-5 rounded-full bg-violet-600 p-0.5 flex items-center justify-end cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-white" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          )}
        </main>
      </div>

      {/* 3. Right Activity Panel */}
      <RightActivityPanel
        logs={agentLogs}
        agentState={agentState}
        isRunning={agentStatus === "running"}
        onStopAgent={() => {
          setAgentStatus("idle");
          setAgentState((prev) => ({ ...prev, stage: "Cancelled", activeTool: "None" }));
        }}
      />

      {/* 4. Global Command Palette Modal Overlay */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectCommand={handleSelectCommand}
      />
    </div>
  );
}
