"use client";

import React, { useState, useEffect, useRef } from "react";
import { Cpu, Terminal, CheckCircle2, Circle, Activity, Square, ChevronDown, ChevronUp } from "lucide-react";

interface LogLine {
  text: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
}

interface RightActivityPanelProps {
  logs: LogLine[];
  agentState: {
    stage: string;
    activeTool: string;
    memory: Record<string, string>;
    verification: string;
  };
  isRunning: boolean;
  onStopAgent: () => void;
}

export default function RightActivityPanel({
  logs,
  agentState,
  isRunning,
  onStopAgent,
}: RightActivityPanelProps) {
  const [showDevLogs, setShowDevLogs] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showDevLogs) {
      logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, showDevLogs]);

  // High-level business milestones mapping
  const milestones = [
    { key: "Researching Company", label: "Researching Target Company" },
    { key: "Analyzing Hiring Trends", label: "Analyzing Hiring Sourcing Trends" },
    { key: "Finding Decision Makers", label: "Finding Sourcing Decision Makers" },
    { key: "Generating Proposal", label: "Generating Strategic Proposal" },
    { key: "Creating Presentation", label: "Creating Widescreen Slides" },
    { key: "Preparing Email Sequence", label: "Preparing Email Campaign Draft" },
    { key: "Syncing Gmail Drafts", label: "Synching Outlook & Gmail Drafts" },
  ];

  // Helper to determine status of a milestone
  const getMilestoneStatus = (milestoneKey: string) => {
    const currentIndex = milestones.findIndex((m) => m.key === agentState.stage);
    const targetIndex = milestones.findIndex((m) => m.key === milestoneKey);

    if (!isRunning) {
      if (agentState.stage === "Success") return "completed";
      if (agentState.stage === "Cancelled") return "cancelled";
      return "pending";
    }

    if (currentIndex > targetIndex) return "completed";
    if (currentIndex === targetIndex) return "running";
    return "pending";
  };

  return (
    <aside className="w-80 border-l border-zinc-900 bg-zinc-950 flex flex-col h-full overflow-hidden select-none flex-shrink-0">
      {/* Header Panel */}
      <div className="h-16 px-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-2">
          {isRunning ? (
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-zinc-600" />
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Agent Actions
          </span>
        </div>
        {isRunning && (
          <button
            onClick={onStopAgent}
            className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/30 border border-red-500/20 text-4xs font-bold text-red-400 hover:bg-red-900/30 hover:border-red-500/40 transition-colors"
          >
            <Square size={8} fill="currentColor" />
            <span>Cancel Run</span>
          </button>
        )}
      </div>

      {/* Business-friendly milestones list */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div className="space-y-1 pb-1">
          <h3 className="text-3xs font-semibold uppercase tracking-wider text-zinc-500">
            Workspace Build Pipeline
          </h3>
          <p className="text-4xs text-zinc-650">
            Current Stage: {isRunning ? agentState.stage : agentState.stage === "Success" ? "Success" : "Idle"}
          </p>
        </div>

        <div className="space-y-3.5 pl-1.5 border-l border-zinc-900 relative">
          {milestones.map((m) => {
            const status = getMilestoneStatus(m.key);
            return (
              <div key={m.key} className="flex items-start gap-3 relative -left-[11px]">
                {/* Checkpoint icon */}
                <div
                  className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center transition-all bg-zinc-950 flex-shrink-0 ${
                    status === "completed"
                      ? "border-emerald-500/50 text-emerald-400"
                      : status === "running"
                      ? "border-violet-500 text-violet-400 animate-pulse shadow-sm shadow-violet-500/10"
                      : status === "cancelled"
                      ? "border-zinc-800 text-zinc-600"
                      : "border-zinc-900 text-zinc-700"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  ) : status === "running" ? (
                    <Activity size={10} className="animate-spin text-violet-400" />
                  ) : (
                    <Circle size={6} className="text-current" />
                  )}
                </div>

                <div className="space-y-0.5 pt-0.5">
                  <p
                    className={`text-2xs font-semibold leading-none transition-colors ${
                      status === "completed"
                        ? "text-zinc-300"
                        : status === "running"
                        ? "text-violet-400"
                        : "text-zinc-600 font-normal"
                    }`}
                  >
                    {m.label}
                  </p>
                  {status === "running" && (
                    <span className="text-[9px] text-zinc-550 font-mono">
                      Running: {agentState.activeTool}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Collapsible Developer Console logs at bottom */}
      <div className="border-t border-zinc-900 bg-zinc-950 flex flex-col max-h-[250px] transition-all duration-300">
        <button
          onClick={() => setShowDevLogs(!showDevLogs)}
          className="h-9 px-4 flex items-center justify-between hover:bg-zinc-900/40 text-3xs font-semibold text-zinc-500 uppercase cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Terminal size={11} className="text-zinc-500" />
            <span>Developer Diagnostic Console</span>
          </div>
          {showDevLogs ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
        </button>

        {showDevLogs && (
          <div className="flex-1 overflow-y-auto p-4 bg-black/60 font-mono text-[9px] leading-relaxed space-y-2 border-t border-zinc-900 select-text h-[200px]">
            {logs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-700 italic">
                Logs empty. Run package scanner.
              </div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex items-start gap-1">
                  <span className="text-zinc-600 select-none">[{log.time}]</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-emerald-400"
                        : log.type === "warning"
                        ? "text-amber-400"
                        : log.type === "error"
                        ? "text-red-400"
                        : "text-zinc-400"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        )}
      </div>
    </aside>
  );
}
