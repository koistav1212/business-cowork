"use client";

import React from "react";
import { SpotlightCard } from "./SpotlightCard";
import { mockSkills } from "@/lib/mockData";
import { Cpu, Terminal, ShieldCheck, PlayCircle, Zap } from "lucide-react";

interface SkillsPageProps {
  onRunSkill: (skillName: string) => void;
  isRunning: boolean;
}

export default function SkillsPage({
  onRunSkill,
  isRunning,
}: SkillsPageProps) {
  return (
    <div className="p-6 space-y-6 select-none">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
            <Cpu size={16} className="text-violet-400" />
            <span>AI Agent Skills Registry</span>
          </h2>
          <p className="text-3xs text-zinc-500 font-mono">
            Modular procedures that can be triggered programmatically by the workspace orchestrator.
          </p>
        </div>
      </div>

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockSkills.map((skill) => (
          <SpotlightCard
            key={skill.name}
            className="flex flex-col justify-between p-5 border border-zinc-900 hover:border-zinc-800"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-zinc-200">{skill.name}</h3>
                  <span className="text-4xs text-violet-400 font-mono font-semibold">SUCCESS RATE: {skill.successRate}</span>
                </div>

                <button
                  onClick={() => onRunSkill(skill.name)}
                  disabled={isRunning}
                  className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white flex items-center gap-1 text-[10px] font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none"
                >
                  <PlayCircle size={12} className="text-emerald-400" />
                  <span>Test Skill</span>
                </button>
              </div>

              <p className="text-[10px] text-zinc-400 leading-relaxed">
                {skill.desc}
              </p>

              {/* Data mappings */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-3xs border-t border-zinc-900/50">
                <div>
                  <span className="text-zinc-500 font-semibold block uppercase">Expects Inputs</span>
                  <span className="text-zinc-300 font-medium truncate block max-w-[150px] mt-0.5" title={skill.inputs}>
                    {skill.inputs}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold block uppercase">Generates Outputs</span>
                  <span className="text-zinc-300 font-medium truncate block max-w-[150px] mt-0.5" title={skill.outputs}>
                    {skill.outputs}
                  </span>
                </div>
              </div>
            </div>

            {/* Tools list footer */}
            <div className="flex items-center justify-between border-t border-zinc-900/50 pt-3 text-[10px] text-zinc-500 font-semibold mt-4">
              <div className="flex items-center gap-1">
                <Terminal size={11} className="text-zinc-600" />
                <span className="font-mono text-[9px] text-zinc-400 truncate max-w-[180px]">
                  {skill.tools.join(" • ")}
                </span>
              </div>
              <div className="flex items-center gap-1 text-3xs">
                <Zap size={11} className="text-amber-500" />
                <span>Runs: {skill.executions}</span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
