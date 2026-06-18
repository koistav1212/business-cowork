"use client";

import React, { useEffect, useRef } from "react";
import { Cpu, Terminal, Database, ShieldCheck, Play, Square } from "lucide-react";

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
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <aside className="w-80 border-l border-zinc-900 bg-zinc-950 flex flex-col h-full overflow-hidden">
      {/* Panel Header */}
      <div className="h-16 px-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Agent Monitor
          </span>
        </div>
        {isRunning && (
          <button
            onClick={onStopAgent}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-red-950/20 border border-red-500/20 text-3xs font-semibold text-red-400 hover:bg-red-900/30 hover:border-red-500/40 active:scale-95 transition-all"
          >
            <Square size={10} fill="currentColor" />
            <span>Stop Agent</span>
          </button>
        )}
      </div>

      {/* Plan & Stage Metrics */}
      <div className="p-4 border-b border-zinc-900 space-y-4 bg-zinc-950/20 flex-shrink-0">
        {/* Active Stage */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-3xs text-zinc-500 font-semibold uppercase">
            <span>Execution Stage</span>
            <Cpu size={12} className="text-violet-400 animate-spin" />
          </div>
          <div className="px-3 py-2 rounded-lg bg-zinc-900/40 border border-zinc-900/60 text-xs font-semibold text-zinc-200 truncate">
            {agentState.stage || "No Active Process"}
          </div>
        </div>

        {/* Active Tool */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-3xs text-zinc-500 font-semibold uppercase">
            <span>Active Tool</span>
            <Terminal size={12} className="text-indigo-400" />
          </div>
          <div className="px-3 py-2 rounded-lg bg-zinc-900/40 border border-zinc-900/60 text-xs font-mono text-zinc-300 truncate">
            {agentState.activeTool || "Idle"}
          </div>
        </div>
      </div>

      {/* Console Streaming Logs */}
      <div className="flex-1 flex flex-col min-h-0 bg-black/60">
        <div className="h-8 px-4 border-b border-zinc-900/60 flex items-center gap-1.5 flex-shrink-0 bg-zinc-950/20">
          <Terminal size={11} className="text-zinc-500" />
          <span className="text-3xs font-semibold uppercase tracking-wider text-zinc-500">
            Terminal Stream
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] leading-relaxed space-y-2 select-text scrollbar-thin">
          {logs.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-600 font-medium text-center px-4">
              Awaiting execution signals. Start a Research or Document build task to run the agent.
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
                      : "text-zinc-300"
                  }
                >
                  {log.text}
                </span>
              </div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* Memory Database updates panel */}
      <div className="h-44 border-t border-zinc-900 flex flex-col flex-shrink-0 bg-zinc-950">
        <div className="h-8 px-4 border-b border-zinc-900/60 flex items-center justify-between bg-zinc-950/20">
          <div className="flex items-center gap-1.5">
            <Database size={11} className="text-zinc-500" />
            <span className="text-3xs font-semibold uppercase tracking-wider text-zinc-500">
              Agent Memory Vault
            </span>
          </div>
          <span className="text-4xs font-mono text-violet-400 bg-violet-950/30 border border-violet-900 px-1 rounded">
            Key-Value
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-3.5 space-y-2 text-2xs scrollbar-thin">
          {Object.keys(agentState.memory).length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-600 font-medium text-center">
              No parameters cached in memory.
            </div>
          ) : (
            Object.entries(agentState.memory).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between py-1 border-b border-zinc-900/50"
              >
                <span className="text-zinc-500 font-mono text-[10px]">{key}</span>
                <span className="text-zinc-300 font-semibold truncate max-w-[150px]" title={val}>
                  {val}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Verification Status Banner */}
        <div className="h-8 px-4 border-t border-zinc-900 bg-zinc-900/20 flex items-center justify-between text-3xs font-medium text-zinc-500">
          <div className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>Verify Layer Status:</span>
          </div>
          <span
            className={
              agentState.verification === "Verified"
                ? "text-emerald-400 font-semibold"
                : agentState.verification === "Verifying"
                ? "text-amber-400 font-semibold animate-pulse"
                : "text-zinc-500"
            }
          >
            {agentState.verification || "Standing By"}
          </span>
        </div>
      </div>
    </aside>
  );
}
