"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import CommandBar from "@/components/CommandBar";
import CommandPalette from "@/components/CommandPalette";
import MainHero from "@/components/MainHero";
import BusinessWorkspace from "@/components/BusinessWorkspace";
import ConnectorsPage from "@/components/ConnectorsPage";
import SkillsPage from "@/components/SkillsPage";
import RightActivityPanel from "@/components/RightActivityPanel";
import { runResearch } from "@/lib/api";
import {
  mockCompanies,
  mockConnectors,
  agentLogSequence,
  CompanyIntelligence,
  createDefaultCompany,
} from "@/lib/mockData";
import {
  Sparkles,
  Lock,
  Sliders,
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

  // Active Sourcing Goal Parameters
  const [slidesCount, setSlidesCount] = useState(10);
  const [writingStyle, setWritingStyle] = useState("Executive");
  const [sourcingGoal, setSourcingGoal] = useState("Sell TalentIQ Interview Platform");

  // Agent Simulator States
  const [agentStatus, setAgentStatus] = useState<"idle" | "running" | "completed">("idle");
  const [agentLogs, setAgentLogs] = useState<LogLine[]>([]);
  const [agentState, setAgentState] = useState({
    stage: "",
    activeTool: "",
    memory: {} as Record<string, string>,
    verification: "",
  });

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

    const steps = agentLogSequence.research;
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
      setAgentState((prev) => {
        const updatedMemory = { ...prev.memory };
        if (stepIndex === 0) {
          updatedMemory["target"] = companyData?.name || "Zoho";
          updatedMemory["goal"] = sourcingGoal;
        } else if (stepIndex === 2) {
          updatedMemory["target_buyer"] = "Deepa Krishnan (CHRO)";
          updatedMemory["signals"] = "200+ active roles";
        }
        return {
          ...prev,
          stage: stepDetails.step,
          activeTool: stepDetails.tool,
          verification: stepIndex >= 4 ? "Verified" : "Verifying",
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
          if (lineText.includes("Success") || lineText.includes("ACTIVE") || lineText.includes("synced")) {
            type = "success";
          } else if (lineText.includes("Warning") || lineText.includes("Scanning") || lineText.includes("Connecting")) {
            type = "warning";
          }

          setAgentLogs((prev) => [
            ...prev,
            { text: lineText, type, time: timeStr },
          ]);
        }, lineIdx * 100);
      });

      // Schedule next step transition
      setTimeout(() => {
        stepIndex++;
        runNextStep();
      }, stepLogLines.length * 100 + 600);
    };

    runNextStep();
  };

  // Triggers
  const handleGeneratePackage = (form: {
    company: string;
    goal: string;
    audience: string;
    outputs: { ppt: boolean; pdf: boolean; email: boolean };
    depth: string;
    style: string;
    slides: number;
  }) => {
    setSlidesCount(form.slides);
    setWritingStyle(form.style);
    setSourcingGoal(form.goal);

    const compKey = form.company.toLowerCase();
    const resolvedCompany = mockCompanies[compKey] || createDefaultCompany(form.company);

    setCompanyData(resolvedCompany);
    setActiveTab("workspace");

    runAgentTask("research", async () => {
      try {
        const result = await runResearch(form.company, form.goal);
        setCompanyData(result);
      } catch (err) {
        console.error("Failed to run real research, falling back to mock:", err);
      }
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
      handleGeneratePackage({
        company: comp.toUpperCase(),
        goal: "Strategic sales modernization",
        audience: "CHRO",
        outputs: { ppt: true, pdf: true, email: true },
        depth: "Deep Intelligence",
        style: "McKinsey Style",
        slides: 10,
      });
    } else if (cmdId === "switch_proposals" || cmdId === "switch_presentations" || cmdId === "switch_email") {
      setActiveTab("workspace");
    } else if (cmdId === "sync_hubspot" || cmdId === "sync_salesforce") {
      setActiveTab("connectors");
    } else if (cmdId === "run_skill_research" || cmdId === "run_skill_brief") {
      setActiveTab("skills");
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
          onQuickAction={() => handleGeneratePackage({
            company: "Zoho",
            goal: "Sell TalentIQ Interview Platform",
            audience: "CHRO",
            outputs: { ppt: true, pdf: true, email: true },
            depth: "Deep Intelligence",
            style: "Executive",
            slides: 10,
          })}
        />

        {/* Tab Router Switch */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && (
            <MainHero
              onGeneratePackage={handleGeneratePackage}
              isRunning={agentStatus === "running"}
            />
          )}

          {activeTab === "workspace" && (
            <BusinessWorkspace
              companyData={companyData}
              isRunning={agentStatus === "running"}
              onRunAction={(type, callback) => runAgentTask(type, callback)}
              slidesCount={slidesCount}
              writingStyle={writingStyle}
              sourcingGoal={sourcingGoal}
              onUpdateCompanyData={setCompanyData}
            />
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
