"use client";

import React, { useState } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { defaultSlides } from "@/lib/mockData";
import { Presentation, ArrowUp, ArrowDown, Edit3, Save, Play, FileDown, LayoutGrid } from "lucide-react";

interface PresentationBuilderProps {
  onGeneratePPT: () => void;
  isRunning: boolean;
}

export default function PresentationBuilder({
  onGeneratePPT,
  isRunning,
}: PresentationBuilderProps) {
  const [slides, setSlides] = useState(defaultSlides);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState("");
  const [tempContent, setTempContent] = useState("");

  const handleSwap = (index1: number, index2: number) => {
    if (index2 < 0 || index2 >= slides.length) return;
    const newSlides = [...slides];
    const temp = newSlides[index1];
    newSlides[index1] = newSlides[index2];
    newSlides[index2] = temp;
    setSlides(newSlides);
    setActiveSlideIndex(index2);
  };

  const startEditing = (slide: typeof defaultSlides[0]) => {
    setEditingSlideId(slide.id);
    setTempTitle(slide.title);
    setTempContent(slide.content);
  };

  const saveSlide = () => {
    if (!editingSlideId) return;
    const newSlides = slides.map((s) =>
      s.id === editingSlideId ? { ...s, title: tempTitle, content: tempContent } : s
    );
    setSlides(newSlides);
    setEditingSlideId(null);
  };

  const activeSlide = slides[activeSlideIndex] || slides[0];

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
      {/* Left pane: Slide list ordering */}
      <div className="w-[320px] border-r border-zinc-900 bg-zinc-950 flex flex-col h-full select-none flex-shrink-0">
        <div className="p-4 border-b border-zinc-900 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Presentation size={15} className="text-violet-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Presentation Deck
            </span>
          </div>
          <span className="text-4xs font-semibold text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
            {slides.length} Slides
          </span>
        </div>

        {/* Vertical deck list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {slides.map((slide, index) => {
            const isSelected = activeSlideIndex === index;
            return (
              <div
                key={slide.id}
                onClick={() => setActiveSlideIndex(index)}
                className={`group relative p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between h-[96px] ${
                  isSelected
                    ? "bg-zinc-900/40 border-violet-500/40 shadow-sm"
                    : "bg-zinc-950/20 border-zinc-900 hover:border-zinc-800"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-4xs font-semibold text-zinc-500">
                    Slide {index + 1}
                  </span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwap(index, index - 1);
                      }}
                      disabled={index === 0}
                      className="w-4 h-4 rounded hover:bg-zinc-800 flex items-center justify-center text-zinc-400 disabled:text-zinc-700"
                    >
                      <ArrowUp size={10} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwap(index, index + 1);
                      }}
                      disabled={index === slides.length - 1}
                      className="w-4 h-4 rounded hover:bg-zinc-800 flex items-center justify-center text-zinc-400 disabled:text-zinc-700"
                    >
                      <ArrowDown size={10} />
                    </button>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <p className="text-2xs font-semibold text-zinc-200 truncate">{slide.title}</p>
                  <p className="text-4xs text-zinc-500 truncate">{slide.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right pane: Active Slide Preview and editor */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-4 flex-shrink-0">
          <div className="space-y-0.5">
            <h2 className="text-base font-semibold text-zinc-200">
              Interactive Slide Editor
            </h2>
            <p className="text-3xs text-zinc-500 font-mono">
              Aspect Ratio: 16:9 (Widescreen)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Export actions */}
            <button
              onClick={onGeneratePPT}
              disabled={isRunning}
              className="h-9 px-4 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-zinc-850 disabled:to-zinc-900 disabled:text-zinc-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-md active:scale-97 disabled:scale-100 disabled:border-zinc-800"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-500 border-t-white animate-spin" />
                  <span>Generating Deck...</span>
                </>
              ) : (
                <>
                  <Presentation size={13} />
                  <span>Generate PowerPoint</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Slide Preview Container */}
        {activeSlide && (
          <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
            {/* 16:9 Presentation Frame */}
            <div className="aspect-video w-full rounded-xl border border-zinc-900 bg-zinc-950/70 shadow-2xl relative overflow-hidden flex flex-col justify-between p-12 select-none">
              {/* background glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-[96px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[96px] pointer-events-none" />

              <div className="flex justify-between items-center text-3xs font-semibold uppercase text-zinc-500 tracking-wider">
                <span>Business Copilot Intelligence</span>
                <span className="font-mono text-zinc-600">Slide {activeSlideIndex + 1} of {slides.length}</span>
              </div>

              {editingSlideId === activeSlide.id ? (
                <div className="my-auto space-y-4 max-w-2xl relative z-10">
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="w-full text-3xl font-extrabold bg-transparent border-b border-zinc-800 focus:border-violet-500 focus:outline-none text-zinc-100 pb-1"
                  />
                  <textarea
                    value={tempContent}
                    onChange={(e) => setTempContent(e.target.value)}
                    rows={4}
                    className="w-full text-base bg-transparent border border-zinc-800 p-2.5 rounded-lg focus:border-violet-500 focus:outline-none text-zinc-300 resize-none"
                  />
                </div>
              ) : (
                <div className="my-auto space-y-6 max-w-2xl relative z-10">
                  <h3 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400 leading-tight">
                    {activeSlide.title}
                  </h3>
                  <p className="text-base text-zinc-400 leading-relaxed font-normal">
                    {activeSlide.content}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center text-3xs text-zinc-600 font-semibold border-t border-zinc-900/60 pt-4">
                <span>Stripe Strategy Briefing</span>
                {editingSlideId === activeSlide.id ? (
                  <button
                    onClick={saveSlide}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    <Save size={10} />
                    <span>Save Changes</span>
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(activeSlide)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-semibold transition-colors cursor-pointer"
                  >
                    <Edit3 size={10} />
                    <span>Edit Slide Content</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
