/**
 * © 2026 Mohammad Fazil Firojkhan Malek. All rights reserved.
 * Watermark-ID: MF-FIROJKHAN-MALEK-2026
 * This codebase is protected under intellectual property laws.
 * Author: Mohammad Fazil Firojkhan Malek
 */

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Project = {
  icon: string;
  name: string;
  type: string;
  tech: string;
  note: string;
  status: string;
  station: string;
  problem: string;
  build: string;
  impact: string[];
  stack: string[];
  repo: string;
};

const projects: Project[] = [
  {
    icon: "🍲", name: "Recipe Recommendation System", type: "Machine Learning", tech: "Cosine Similarity · Web Scraping",
    note: "Ingredient-based recipe recommendations with 98% prediction accuracy.", status: "Completed", station: "Recipe Hub",
    problem: "People often have random ingredients at home and don't know what to cook, leading to food waste and frustration.",
    build: "Built a comprehensive and diverse custom recipe dataset by scraping structured data from multiple online sources. Applied the cosine similarity algorithm to find the best recipe matches based on available ingredients.",
    impact: ["Achieved 98% prediction accuracy", "Custom dataset from multiple online sources", "Efficient and personalized recommendations"],
    stack: ["Python", "Scikit-learn", "Pandas", "Web Scraping"],
    repo: "https://github.com/k-arthi-k-02",
  },
  {
    icon: "📄", name: "AI Lease Contract Review Assistant", type: "LLM Automation", tech: "Llama 3.3 · Gemini API",
    note: "AI-powered contract review assistant to identify risky clauses and generate negotiation suggestions.", status: "Active", station: "Contract AI",
    problem: "Reviewing lease agreements is tedious, and people often miss high-risk terms or unfair clauses hidden in complex legal jargon.",
    build: "Built an AI-powered contract review assistant using LLMs. Integrated Gemini API for context-aware responses and addressed hallucination issues in Ollama Llama 3.3 by refining prompts.",
    impact: ["Identifies high-risk terms automatically", "Generates useful negotiation suggestions", "Reduced hallucinations via refined prompts"],
    stack: ["Python", "Llama 3.3", "Gemini API", "Prompt Engineering"],
    repo: "https://github.com/k-arthi-k-02",
  },
  {
    icon: "🔬", name: "Diatom Image Classification System", type: "Deep Learning", tech: "Computer Vision · Neural Networks",
    note: "Image classification model for diatom species recognition using deep learning.", status: "Completed", station: "Vision Node",
    problem: "Identifying diatom species manually under a microscope is time-consuming and requires specialized taxonomic expertise.",
    build: "Managed data collection and preprocessing, then developed and trained a deep learning image classification model. Built a full backend-frontend application structure for model inference and user interaction.",
    impact: ["Automated species recognition", "End-to-end inference application", "Improved classification performance"],
    stack: ["Python", "Deep Learning", "NumPy", "Streamlit"],
    repo: "https://github.com/k-arthi-k-02",
  },
  {
    icon: "🩸", name: "Blood Bank Management System", type: "Database System", tech: "SQL · CRUD Operations",
    note: "Comprehensive management system for tracking blood inventory and donor records.", status: "Completed", station: "Life Line",
    problem: "Managing blood inventory, donor records, and patient requests manually leads to critical delays and data inconsistencies.",
    build: "Designed and implemented a robust database management system to track blood stock, register donors, and streamline requests securely and efficiently.",
    impact: ["Real-time inventory tracking", "Streamlined donor registration", "Reliable data management"],
    stack: ["MySQL", "Database Design", "Backend Integration"],
    repo: "https://github.com/k-arthi-k-02/Blood-Bank-Management-System",
  },
  {
    icon: "🧠", name: "RAG-GPT", type: "Generative AI", tech: "LLM · RAG Pipeline",
    note: "Retrieval-Augmented Generation system allowing AI to reason over custom documents.", status: "Active", station: "AI Core",
    problem: "Standard LLMs often hallucinate or lack access to private, up-to-date knowledge bases when answering domain-specific queries.",
    build: "Built a Retrieval-Augmented Generation (RAG) pipeline that embeds custom documents into a vector space and retrieves exact context to ground the LLM's generation.",
    impact: ["Eliminates knowledge cut-off limits", "Grounds responses in custom data", "Highly accurate Q&A capabilities"],
    stack: ["Python", "LangChain", "Vector DB", "LLMs"],
    repo: "https://github.com/k-arthi-k-02/RAG-GPT",
  },
  {
    icon: "🎙️", name: "PrepTalk-AI", type: "Conversational AI", tech: "LLM · Speech-to-Text",
    note: "An AI-driven platform for mock interviews and personalized, real-time feedback.", status: "Active", station: "Prep Arena",
    problem: "Practicing for interviews is difficult without realistic, interactive feedback and access to industry-specific domain knowledge.",
    build: "Built a conversational AI agent that simulates real interview scenarios. It processes spoken or typed answers through an LLM to provide instant, constructive feedback and coaching.",
    impact: ["Realistic interview simulations", "Instant conversational feedback", "Improves communication skills"],
    stack: ["Python", "LLMs", "Audio Processing", "React"],
    repo: "https://github.com/k-arthi-k-02/PrepTalk-AI",
  }
];

export default function TrainWork() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  // lock body scroll while modal is open + close on Escape
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const root = rootRef.current;

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        runCinematic: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const conditions = context.conditions || {};
        const reduceMotion = !!conditions.reduceMotion;

        if (reduceMotion) {
          root?.classList.add("tr-fallback");
        } else {
          root?.classList.remove("tr-fallback");

          const track = trackRef.current!;
          const train = trainRef.current!;
          const wheels = gsap.utils.toArray<HTMLElement>(".tr-wheel");
          const cards = gsap.utils.toArray<HTMLElement>(".tr-card");
          const signs = gsap.utils.toArray<HTMLElement>(".tr-sign");
          const smoke = smokeRef.current!;

          const totalShift = () => track.scrollWidth - window.innerWidth;

          // spin the wheels forever; speed follows scroll velocity
          const wheelSpin = gsap.to(wheels, { rotation: 360, repeat: -1, ease: "none", duration: 1.2, transformOrigin: "50% 50%" });

          gsap.set(cards, { autoAlpha: 0, y: 46, scale: 0.9 });
          gsap.set(signs, { autoAlpha: 0, y: -18 });
          gsap.set(smoke, { autoAlpha: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => "+=" + (totalShift() * 1.15 + window.innerHeight),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // move the whole world left
          tl.to(track, { x: () => -totalShift(), ease: "none", duration: projects.length }, 0);

          const segment = projects.length;
          projects.forEach((_, i) => {
            const arrive = (i / (projects.length - 1)) * (segment - 0.001);
            tl.to(signs[i], { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, Math.max(0, arrive - 0.28));
            tl.to(cards[i], { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "back.out(1.6)" }, arrive);
            tl.to(train, { y: -6, duration: 0.12, ease: "power1.out" }, arrive)
              .to(train, { y: 0, duration: 0.18, ease: "power1.in" }, arrive + 0.12);
            tl.fromTo(smoke, { autoAlpha: 0.75, y: 0, scale: 0.6 }, { autoAlpha: 0, y: -70, scale: 1.5, duration: 0.7, ease: "power1.out" }, arrive);
          });

          const velTrigger = ScrollTrigger.create({
            trigger: root,
            start: "top top",
            end: () => "+=" + (totalShift() * 1.15 + window.innerHeight),
            onUpdate: (self) => {
              const v = Math.min(Math.abs(self.getVelocity()) / 800, 4) + 0.35;
              gsap.to(wheelSpin, { timeScale: v, duration: 0.3, overwrite: true });
            },
          });

          ScrollTrigger.refresh();

          return () => {
            wheelSpin.kill();
            velTrigger.kill();
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      }
    );

    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t);
      mm.revert();
    };
  }, []);

  return (
    <section id="work" ref={rootRef} className="dark-section relative overflow-hidden">
      {/* pinned viewport */}
      <div className="tr-viewport relative h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Section title */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center px-4">
          <p className="font-[Gochi_Hand] text-[#e63946] text-lg">// all aboard</p>
          <h2 className="font-[Caveat] font-bold text-5xl md:text-6xl leading-none">shipped work</h2>
          <p className="font-[Architects_Daughter] text-neutral-400 text-sm mt-1">scroll to ride through every station →</p>
        </div>

        {/* backdrop */}
        <div className="tr-sky" />
        <div className="tr-hills" />

        {/* MOVING WORLD */}
        <div ref={trackRef} className="tr-track">
          {projects.map((p, i) => (
            <div key={p.name} className="tr-station" style={{ ["--i" as string]: i }}>
              {/* station sign */}
              <div className="tr-sign">
                <div className="tr-sign-board"><span className="font-[Permanent_Marker] text-sm">{p.station}</span></div>
                <div className="tr-sign-pole" />
              </div>

              {/* project card */}
              <div className="tr-card">
                <button type="button" className="tr-ticket tr-ticket-btn" onClick={() => setActive(p)} aria-label={`Read more about ${p.name}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-4xl">{p.icon}</div>
                    <span className="font-[Patrick_Hand] text-[10px] px-2 py-0.5 border border-black/40 rounded-full bg-[#ffd93d] text-[#1a1a1a]">{p.status}</span>
                  </div>
                  <h3 className="font-[Permanent_Marker] text-xl leading-tight text-[#1a1a1a] text-left">{p.name}</h3>
                  <p className="font-[Architects_Daughter] text-sm text-neutral-600 italic text-left">{p.type}</p>
                  <p className="font-[Kalam] text-sm mt-3 leading-snug text-[#2a2118] text-left">{p.note}</p>
                  <div className="mt-3 pt-2 border-t-2 border-dashed border-neutral-400 flex items-center justify-between">
                    <p className="font-[Patrick_Hand] text-xs text-neutral-600 text-left">{p.tech}</p>
                  </div>
                  <span className="tr-tap font-[Patrick_Hand]">tap to read →</span>
                  <span className="tr-punch tr-punch-l" />
                  <span className="tr-punch tr-punch-r" />
                </button>
                <div className="tr-card-stem" />
              </div>

              {/* platform */}
              <div className="tr-platform"><div className="tr-station-num font-[Gochi_Hand]">{i + 1}</div></div>
            </div>
          ))}

          {/* RAILS */}
          <div className="tr-rails">
            <div className="tr-rail-line" />
            <div className="tr-rail-line tr-rail-line-2" />
            <div className="tr-sleepers" />
          </div>
        </div>

        {/* ===== THE MODERN TRAIN (fixed, world moves under it) ===== */}
        <div ref={trainRef} className="tr-train">
          <div ref={smokeRef} className="tr-smoke" />

          {/* consist: engine + 2 carriages, coupled */}
          <div className="tr-consist">
            {/* sleek locomotive */}
            <div className="tr-car tr-loco">
              <div className="tr-loco-nose" />
              <div className="tr-loco-body">
                <div className="tr-stripe" />
                <div className="tr-loco-window" />
                <div className="tr-headlight" />
                <span className="tr-loco-badge font-[Permanent_Marker]">Karthik_02_</span>
              </div>
              <div className="tr-bogie">
                <div className="tr-wheel" /><div className="tr-wheel" />
              </div>
            </div>

            <div className="tr-coupler" />

            {/* carriage 1 */}
            <div className="tr-car tr-coach">
              <div className="tr-coach-body">
                <div className="tr-stripe" />
                <div className="tr-win-row">
                  <span /><span /><span /><span />
                </div>
              </div>
              <div className="tr-bogie">
                <div className="tr-wheel" /><div className="tr-wheel" />
              </div>
            </div>

            <div className="tr-coupler" />

            {/* carriage 2 */}
            <div className="tr-car tr-coach">
              <div className="tr-coach-body">
                <div className="tr-stripe" />
                <div className="tr-win-row">
                  <span /><span /><span /><span />
                </div>
              </div>
              <div className="tr-bogie">
                <div className="tr-wheel" /><div className="tr-wheel" />
              </div>
            </div>
          </div>

          <p className="tr-train-label font-[Permanent_Marker]">K-Express · Building since 2021</p>
        </div>
      </div>

      {/* FALLBACK grid (mobile / reduced motion) */}
      <div className="tr-fallback-grid mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-10">
          <p className="font-[Gochi_Hand] text-[#e63946] text-base">// shipped work 🚄</p>
          <h2 className="font-[Caveat] font-bold text-5xl">every station, a project</h2>
          <p className="font-[Architects_Daughter] text-neutral-400 mt-1">the stuff that actually left my laptop.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <button type="button" key={p.name} className="tr-ticket tr-ticket-btn !static text-left" onClick={() => setActive(p)}>
              <div className="flex items-start justify-between mb-2">
                <div className="text-3xl">{p.icon}</div>
                <span className="font-[Patrick_Hand] text-[10px] px-2 py-0.5 border border-black/40 rounded-full bg-[#ffd93d] text-[#1a1a1a]">{p.status}</span>
              </div>
              <h3 className="font-[Permanent_Marker] text-lg text-[#1a1a1a]">{p.name}</h3>
              <p className="font-[Architects_Daughter] text-sm text-neutral-600 italic">{p.type}</p>
              <p className="font-[Kalam] text-sm mt-2 text-[#2a2118]">{p.note}</p>
              <div className="mt-2 pt-2 border-t-2 border-dashed border-neutral-400 flex items-center justify-between">
                <p className="font-[Patrick_Hand] text-xs text-neutral-600">{p.tech}</p>
                <span className="tr-tap-static font-[Patrick_Hand] text-xs text-[#e63946]">tap →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ===== PROJECT MODAL ===== */}
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* =============== PROJECT MODAL =============== */
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;
  const p = project;
  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* tape + close */}
        <span className="pm-tape" />
        <button className="pm-close" onClick={onClose} aria-label="close">✕</button>

        {/* header */}
        <div className="flex items-start gap-4 pr-8">
          <div className="pm-icon">{p.icon}</div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-[Patrick_Hand] text-[11px] px-2 py-0.5 border border-black/40 rounded-full bg-[#ffd93d] text-[#1a1a1a]">{p.status}</span>
              <span className="font-[Architects_Daughter] text-sm text-neutral-500 italic">{p.type}</span>
            </div>
            <h3 className="font-[Permanent_Marker] text-2xl md:text-3xl text-[#1a1a1a] leading-tight mt-1">{p.name}</h3>
          </div>
        </div>

        <div className="pm-divider" />

        {/* body */}
        <div className="pm-body">
          <div className="pm-block">
            <h4 className="pm-h">🎯 the problem</h4>
            <p className="pm-text">{p.problem}</p>
          </div>
          <div className="pm-block">
            <h4 className="pm-h">🔧 what i built</h4>
            <p className="pm-text">{p.build}</p>
          </div>
          <div className="pm-block">
            <h4 className="pm-h">🚀 impact</h4>
            <ul className="pm-list">
              {p.impact.map((it) => (
                <li key={it}><span className="pm-check">✓</span>{it}</li>
              ))}
            </ul>
          </div>
          <div className="pm-block">
            <h4 className="pm-h">🧰 built with</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {p.stack.map((s) => (<span key={s} className="pm-chip">{s}</span>))}
            </div>
          </div>
        </div>

        {/* footer */}
        <a href={p.repo} target="_blank" rel="noreferrer" className="pm-repo-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />
          </svg>
          view on github
          <span className="pm-arrow">↗</span>
        </a>
        <p className="pm-hint font-[Architects_Daughter]">press <kbd>esc</kbd> or click outside to close</p>
      </div>
    </div>
  );
}
