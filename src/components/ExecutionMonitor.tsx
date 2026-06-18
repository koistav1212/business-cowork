"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { Activity, Clock, Terminal, ChevronDown, ChevronUp, CheckCircle2, Circle, AlertCircle } from "lucide-react";

export interface TimelineStep {
  step: string;
  desc: string;
  duration: string;
  tool: string;
  logs: string;
  status?: "pending" | "running" | "completed" | "failed";
}

interface ExecutionMonitorProps {
  timeline: TimelineStep[];
  activeStepIndex: number;
  isRunning: boolean;
}

export default function ExecutionMonitor({
  timeline,
  activeStepIndex,
  isRunning,
}: ExecutionMonitorProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleExpand = (stepName: string) => {
    setExpandedStep(expandedStep === stepName ? null : stepName);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto select-none">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
            <Activity size={16} className="text-violet-400" />
            <span>Agent Execution Monitor</span>
          </h2>
          <p className="text-3xs text-zinc-500 font-mono">
            Timeline View • Step-by-Step Validation Logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isRunning ? (
            <span className="flex items-center gap-1 text-3xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/20 border border-amber-500/20 px-2.5 py-1.5 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Agent Processing...</span>
            </span>
          ) : (
            <span className="text-3xs font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-lg">
              System Idle
            </span>
          )}
        </div>
      </div>

      {/* Timeline steps list */}
      <div className="relative border-l border-zinc-900 ml-4 pl-6 space-y-6">
        {timeline.map((item, index) => {
          const isCompleted = index < activeStepIndex || (!isRunning && activeStepIndex > 0);
          const isRunningStep = isRunning && index === activeStepIndex;
          const isPending = !isCompleted && !isRunningStep;
          const isExpanded = expandedStep === item.step;

          return (
            <div key={item.step} className="relative group">
              {/* Timeline bubble icon */}
              <div
                className={`absolute -left-[35px] top-1 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  isCompleted
                    ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-400 shadow-lg shadow-emerald-500/10"
                    : isRunningStep
                    ? "bg-amber-950/50 border-amber-500/50 text-amber-400 animate-pulse"
                    : "bg-zinc-950 border-zinc-900 text-zinc-600"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={12} />
                ) : isRunningStep ? (
                  <Activity size={11} className="animate-spin" />
                ) : (
                  <Circle size={8} />
                )}
              </div>

              {/* Step Info Panel */}
              <SpotlightCard
                className={`p-4 border transition-all ${
                  isRunningStep
                    ? "border-amber-500/35 bg-amber-950/5"
                    : isCompleted
                    ? "border-zinc-900 hover:border-zinc-800"
                    : "border-zinc-900/50 opacity-50 bg-zinc-950/5 pointer-events-none"
                }`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => isCompleted && toggleExpand(item.step)}
                >
                  <div className="space-y-1 pr-4">
                    <h3 className="text-xs font-semibold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                      {item.step}
                    </h3>
                    <p className="text-3xs text-zinc-400 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 text-3xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {item.duration}
                    </span>
                    <span className="flex items-center gap-1 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                      <Terminal size={10} />
                      {item.tool}
                    </span>
                    {isCompleted && (
                      <div className="text-zinc-400 hover:text-white transition-colors pl-1">
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Collapsible stdout console logs */}
                {isExpanded && isCompleted && (
                  <div className="mt-4 pt-3.5 border-t border-zinc-900/60 font-mono text-[10px] text-zinc-400 bg-black/40 p-3 rounded-lg leading-relaxed whitespace-pre-wrap select-text border border-zinc-950 shadow-inner">
                    {item.logs}
                  </div>
                )}
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
