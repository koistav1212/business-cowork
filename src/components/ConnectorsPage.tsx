"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { mockConnectors } from "@/lib/mockData";
import { Link2, ShieldAlert, CheckCircle2, RefreshCw, XCircle } from "lucide-react";

interface ConnectorsPageProps {
  onToggleConnect: (connectorId: string) => void;
  connectorsList: typeof mockConnectors;
}

export default function ConnectorsPage({
  onToggleConnect,
  connectorsList,
}: ConnectorsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [configuringId, setConfiguringId] = useState<string | null>(null);

  const categories = ["All", "CRM", "Communication", "Storage", "Research", "Productivity"];

  const filteredConnectors = connectorsList.filter(
    (c) => activeCategory === "All" || c.category === activeCategory
  );

  return (
    <div className="p-6 space-y-6 select-none">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
            <Link2 size={16} className="text-violet-400" />
            <span>Third-Party Agent Connectors</span>
          </h2>
          <p className="text-3xs text-zinc-500 font-mono">
            Secure integrations enabling reading/writing operations across cloud providers.
          </p>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap gap-1 bg-zinc-950 p-1 border border-zinc-900 rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 text-3xs font-semibold rounded-md transition-colors ${
                activeCategory === cat
                  ? "bg-zinc-900 text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of integrations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredConnectors.map((conn) => {
          const isConnected = conn.status === "Connected";
          return (
            <SpotlightCard
              key={conn.id}
              className="flex flex-col justify-between h-[180px] p-5 border border-zinc-900 hover:border-zinc-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-850 flex items-center justify-center text-lg shadow-sm">
                    {conn.logo}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-200">{conn.name}</h3>
                    <span className="text-[10px] text-zinc-500 font-medium font-mono">{conn.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleConnect(conn.id)}
                  className={`px-2.5 py-1 text-3xs font-semibold rounded border transition-colors ${
                    isConnected
                      ? "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      : "bg-violet-950/20 border-violet-500/30 text-violet-300 hover:bg-violet-600 hover:text-white"
                  }`}
                >
                  {isConnected ? "Connected" : "Connect"}
                </button>
              </div>

              <p className="text-[10px] text-zinc-400 leading-normal line-clamp-2 mt-2.5">
                {conn.desc}
              </p>

              <div className="flex items-center justify-between border-t border-zinc-900/50 pt-3 text-3xs font-semibold text-zinc-500">
                <div className="flex items-center gap-1">
                  {isConnected ? (
                    <>
                      <CheckCircle2 size={11} className="text-emerald-400" />
                      <span>Sync: {conn.sync}</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={11} className="text-zinc-600" />
                      <span>Not Authenticated</span>
                    </>
                  )}
                </div>

                {isConnected && (
                  <button
                    onClick={() => setConfiguringId(conn.id)}
                    className="text-violet-400 hover:text-violet-300 font-semibold cursor-pointer"
                  >
                    Permissions
                  </button>
                )}
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Permissions Modal dialog */}
      {configuringId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85 backdrop-blur-md">
          {/* Find connector */}
          {(() => {
            const conn = connectorsList.find((c) => c.id === configuringId);
            if (!conn) return null;
            return (
              <div className="w-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-xl p-5 shadow-2xl space-y-4 relative">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 border-b border-zinc-900 pb-3">
                  <ShieldAlert size={14} className="text-violet-400" />
                  <span>Authorized Permissions</span>
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{conn.logo}</span>
                    <span className="text-xs font-bold text-zinc-200">{conn.name} Connector</span>
                  </div>
                  <p className="text-3xs text-zinc-400 leading-relaxed">
                    Business Copilot is authorized to perform the following actions:
                  </p>
                  <div className="space-y-1.5 bg-zinc-900/30 p-3 rounded-lg border border-zinc-900">
                    {conn.permissions.map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-3xs text-zinc-300">
                        <CheckCircle2 size={11} className="text-emerald-400 flex-shrink-0" />
                        <span className="font-mono">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setConfiguringId(null)}
                    className="h-8 px-4 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-3xs font-semibold text-zinc-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
