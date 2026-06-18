"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { Mail, Sparkles, AlertCircle, RefreshCw, Send, CheckCircle2 } from "lucide-react";

interface EmailCampaignProps {
  onSendEmail: (subject: string) => void;
  isRunning: boolean;
}

export default function EmailCampaign({
  onSendEmail,
  isRunning,
}: EmailCampaignProps) {
  const [form, setForm] = useState({
    recipients: "sarah.franklin@stripe.com, liam.oconnor@stripe.com",
    subject: "Accelerating Stripe Enterprise Billing Reconciliation",
    message: "Hi {{contact_name}},\n\nI noticed Stripe is actively expanding Enterprise billing support systems to Latin America. Integrating an event-driven adapter can compress billing reconciliation periods from 15 days to under 4 hours, mitigating manual discrepancies.\n\nLet me know if you would like to review the technical brief.\n\nBest,\nKoustav Sarkar",
  });

  const variables = [
    { tag: "{{contact_name}}", desc: "Recipient First Name" },
    { tag: "{{company_name}}", desc: "Company Name (Stripe)" },
    { tag: "{{target_pain}}", desc: "Billing Reconciliation" },
    { tag: "{{proposed_roi}}", desc: "310% expected ROI" },
  ];

  const handleInsertTag = (tag: string) => {
    setForm({ ...form, message: form.message + " " + tag });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    onSendEmail(form.subject);
  };

  // Simulated metrics
  const aiOptimizationScore = 94;
  const spamRisk = "Very Low";

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
      {/* Left pane: Composer */}
      <form onSubmit={handleSend} className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-zinc-200 flex items-center gap-2">
              <Mail size={16} className="text-violet-400" />
              <span>Email Outreach Campaign</span>
            </h2>
            <p className="text-3xs text-zinc-500 font-mono">
              Integrations connected: Gmail Client
            </p>
          </div>

          <button
            type="submit"
            disabled={isRunning}
            className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-zinc-850 disabled:to-zinc-900 disabled:text-zinc-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-md active:scale-97 disabled:scale-100 disabled:border-zinc-800"
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-white animate-spin" />
                <span>Sending via Gmail...</span>
              </>
            ) : (
              <>
                <Send size={13} />
                <span>Send Through Gmail</span>
              </>
            )}
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          {/* Recipients */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Recipients List</label>
            <input
              type="text"
              value={form.recipients}
              onChange={(e) => setForm({ ...form, recipients: e.target.value })}
              className="w-full h-9 rounded-lg px-3 text-xs bg-zinc-900/40 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all text-zinc-200"
              required
            />
          </div>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Subject Line</label>
            <input
              type="text"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full h-9 rounded-lg px-3 text-xs bg-zinc-900/40 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all text-zinc-200"
              required
            />
          </div>

          {/* Message editor */}
          <div className="space-y-1.5">
            <label className="text-3xs font-semibold text-zinc-500 uppercase tracking-wider">Outreach Message template</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full min-h-[200px] rounded-lg p-3 text-xs bg-zinc-900/40 border border-zinc-800 focus:border-violet-500 focus:outline-none transition-all text-zinc-300 font-sans leading-relaxed"
              required
            />
          </div>
        </div>
      </form>

      {/* Right pane: Personalization and Scores */}
      <div className="w-85 border-l border-zinc-900 bg-zinc-950/50 p-5 space-y-6 overflow-y-auto select-none flex-shrink-0">
        {/* Dynamic variable tags */}
        <div className="space-y-3">
          <h3 className="text-2xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-2.5">
            Personalization Tags
          </h3>
          <p className="text-3xs text-zinc-500 leading-normal">
            Click any variable below to append it to the end of the current message template:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {variables.map((v) => (
              <button
                key={v.tag}
                type="button"
                onClick={() => handleInsertTag(v.tag)}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-850 hover:border-zinc-700 text-left transition-colors flex flex-col gap-0.5"
              >
                <span className="text-3xs font-mono font-bold text-violet-400">{v.tag}</span>
                <span className="text-4xs text-zinc-500 truncate">{v.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Analytics */}
        <div className="space-y-3 pt-2">
          <h3 className="text-2xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-900 pb-2.5">
            Outreach AI Audit
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Optimization Score */}
            <div className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-lg text-center space-y-1">
              <p className="text-4xs font-semibold uppercase text-zinc-500">AI Score</p>
              <p className="text-lg font-extrabold text-violet-400">{aiOptimizationScore}/100</p>
              <p className="text-4xs text-emerald-400 font-semibold flex items-center justify-center gap-0.5">
                <CheckCircle2 size={9} />
                <span>Optimized</span>
              </p>
            </div>

            {/* Spam score */}
            <div className="bg-zinc-900/40 border border-zinc-900 p-3.5 rounded-lg text-center space-y-1">
              <p className="text-4xs font-semibold uppercase text-zinc-500 font-semibold">Spam Risk</p>
              <p className="text-lg font-extrabold text-emerald-400">{spamRisk}</p>
              <p className="text-4xs text-zinc-500 font-medium">Safe to Send</p>
            </div>
          </div>
        </div>

        {/* System Logs / Advice alerts */}
        <div className="p-3.5 rounded-lg bg-violet-950/10 border border-violet-900/30 flex items-start gap-2.5">
          <AlertCircle size={14} className="text-violet-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 leading-normal">
            <h4 className="text-3xs font-bold text-zinc-200 uppercase">AI Recommendation</h4>
            <p className="text-4xs text-zinc-400 leading-normal">
              Integrating Stripe's historical growth metrics makes this email 12% more likely to receive a response from Sarah Franklin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
