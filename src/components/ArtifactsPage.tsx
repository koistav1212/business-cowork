"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { Database, FileText, Presentation, FileDown, Eye, CheckCircle2 } from "lucide-react";

export interface ArtifactItem {
  id: string;
  name: string;
  type: "PDF" | "PPTX" | "DOCX" | "Report";
  size: string;
  version: string;
  createdBy: string;
  execId: string;
  summary: string;
}

interface ArtifactsPageProps {
  artifactsList: ArtifactItem[];
}

export default function ArtifactsPage({
  artifactsList,
}: ArtifactsPageProps) {
  const [selectedItem, setSelectedItem] = useState<ArtifactItem | null>(null);

  return (
    <div className="p-6 space-y-6 select-none">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
            <Database size={16} className="text-violet-400" />
            <span>Generated Workspace Artifacts</span>
          </h2>
          <p className="text-3xs text-zinc-500 font-mono">
            Directly download consulting-grade PPTX decks, proposals, or spreadsheets compiled by agents.
          </p>
        </div>
      </div>

      {/* Grid listing */}
      {artifactsList.length === 0 ? (
        <div className="border border-dashed border-zinc-900 rounded-xl p-12 text-center text-zinc-500 text-xs font-semibold bg-zinc-950/10">
          No artifacts generated yet. Run a report, proposal, or presentation build task to compile files.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {artifactsList.map((item) => {
            const isSlide = item.type === "PPTX";
            return (
              <SpotlightCard
                key={item.id}
                className="flex flex-col justify-between h-[180px] p-5 border border-zinc-900 hover:border-zinc-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400">
                      {isSlide ? <Presentation size={18} className="text-purple-400" /> : <FileText size={18} className="text-sky-400" />}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-zinc-200 truncate max-w-[150px]">{item.name}</h3>
                      <span className="text-4xs text-zinc-500 font-mono font-semibold">{item.type} • {item.size}</span>
                    </div>
                  </div>

                  <span className="text-4xs px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                    {item.version}
                  </span>
                </div>

                <p className="text-[10px] text-zinc-400 leading-normal line-clamp-2 mt-3">
                  {item.summary}
                </p>

                <div className="flex items-center justify-between border-t border-zinc-900/50 pt-3 text-3xs font-semibold text-zinc-500 mt-4">
                  <span className="truncate max-w-[100px]">ID: {item.execId}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="Inspect summary"
                    >
                      <Eye size={12} />
                    </button>
                    {/* Simulated download anchor */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Simulating file download of: ${item.name}`);
                      }}
                      className="flex items-center gap-1 text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      <FileDown size={12} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      )}

      {/* Inspect Summary Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-900 rounded-xl p-5 shadow-2xl space-y-4 relative">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Artifact Details Overview</span>
            </h3>

            <div className="space-y-3 py-1">
              <div>
                <p className="text-4xs font-semibold uppercase text-zinc-500">File Name</p>
                <p className="text-xs font-bold text-zinc-200 mt-0.5">{selectedItem.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xs font-semibold uppercase text-zinc-500">File Type</p>
                  <p className="text-2xs font-semibold text-zinc-300 mt-0.5">{selectedItem.type}</p>
                </div>
                <div>
                  <p className="text-4xs font-semibold uppercase text-zinc-500">Size</p>
                  <p className="text-2xs font-semibold text-zinc-300 mt-0.5">{selectedItem.size}</p>
                </div>
              </div>
              <div>
                <p className="text-4xs font-semibold uppercase text-zinc-500">Compilation Scope Summary</p>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1 bg-zinc-900/20 border border-zinc-900 p-3 rounded-lg">
                  {selectedItem.summary}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xs font-semibold uppercase text-zinc-500">Author</p>
                  <p className="text-2xs font-semibold text-zinc-400 mt-0.5">{selectedItem.createdBy}</p>
                </div>
                <div>
                  <p className="text-4xs font-semibold uppercase text-zinc-500">Execution Trigger Hash</p>
                  <p className="text-2xs font-mono text-zinc-500 mt-0.5 truncate">{selectedItem.execId}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedItem(null)}
                className="h-8 px-4 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-3xs font-semibold text-zinc-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
