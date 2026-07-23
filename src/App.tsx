/**
 * © 2026 Yarramraju Karthik. All rights reserved.
 * Watermark-ID: YARRAMRAJU-KARTHIK-2026
 * This codebase is protected under intellectual property laws.
 * Author: Yarramraju Karthik
 */

import { useEffect, useState, useCallback, useRef } from "react";
import {
  useReveal,
  useScrollProgress,
  useTypewriter,
  useCountUp,
  useMouse,
  useMagnetic,
} from "./hooks";
import portrait from "./assets/image1.png";
import portrait1 from "./assets/image2.png"
import Notebook from "./Notebook";
import TrainWork from "./TrainWork";
import { techLogos } from "./TechLogos";

/* =============== SVG DOODLES =============== */
const Wavy = ({ color = "#e63946", w = "100%", h = "8px", className = "" }: { color?: string; w?: string; h?: string; className?: string }) => (
  <svg viewBox="0 0 300 12" style={{ width: w, height: h }} className={className} fill="none" preserveAspectRatio="none">
    <path d="M2 7 Q 40 2, 80 7 T 160 6 T 240 8 T 298 5" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
  </svg>
);

const Star = ({ className = "", color = "#f4a261" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 50 50" className={className} fill={color} stroke="#1a1a1a" strokeWidth={1.5}>
    <path d="M25 2 L 31 18 L 48 19 L 35 30 L 39 47 L 25 38 L 11 47 L 15 30 L 2 19 L 19 18 Z" />
  </svg>
);

const Sparkle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 30 30" className={className} fill="currentColor">
    <path d="M15 2 L 17 13 L 28 15 L 17 17 L 15 28 L 13 17 L 2 15 L 13 13 Z" />
  </svg>
);

const Scribble = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 20" className={className} fill="none" stroke="#1a1a1a" strokeWidth={2} strokeLinecap="round">
    <path d="M2 10 Q 15 2, 25 10 T 50 10 T 75 10 T 98 10" />
  </svg>
);

const DoodleArrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10 C 15 35, 25 50, 50 50" />
    <path d="M40 44 L 50 50 L 42 55" />
  </svg>
);

const CheckMark = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12 L 10 18 L 20 6" />
  </svg>
);

/* =============== LOADER =============== */
function Loader({ onDone }: { onDone: () => void }) {
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setExit(true), 1800);
    const t2 = setTimeout(onDone, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`loader-screen ${exit ? "loader-exit" : ""}`}>
      <div className="loader-card">
        <div className="loader-doodles" aria-hidden="true">
          <span className="loader-scribble loader-scribble-one" />
          <span className="loader-scribble loader-scribble-two" />
          <span className="loader-scribble loader-scribble-three" />
        </div>

        <p className="loader-name loader-fade">
          Karthik<span className="text-[#e63946]">.</span>
        </p>
        <div className="loader-line" />
        <p className="loader-fade loader-subtitle" style={{ animationDelay: "0.4s" }}>
          unfolding the story...
        </p>
        <div className="loader-fade loader-tags" style={{ animationDelay: "0.55s" }}>
          <span>AI/ML</span>
          <span>code</span>
          <span>curiosity</span>
        </div>
      </div>
    </div>
  );
}

/* =============== CUSTOM CURSOR =============== */
function CustomCursor() {
  const mouse = useMouse();
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, .btn-hand, .sketch-card, .tag-pill, .nav-link, .photo-frame"));
    };
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => window.removeEventListener("mouseover", onOver);
  }, []);
  return (
    <>
      <div className="cursor-dot" style={{ left: mouse.x - 4, top: mouse.y - 4, transform: hover ? "scale(2.4)" : "scale(1)", background: hover ? "#e63946" : "#1a1a1a" }} />
      <div className="cursor-ring" style={{ left: mouse.x - 17, top: mouse.y - 17, transform: hover ? "scale(1.5)" : "scale(1)", borderColor: hover ? "#e63946" : "rgba(26,26,26,0.35)" }} />
    </>
  );
}

/* =============== NAV =============== */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "about", href: "#about" },
    { label: "notebook", href: "#notebook" },
    { label: "projects", href: "#projects" },
    { label: "work", href: "#work" },
    { label: "skills", href: "#skills" },
    { label: "journey", href: "#journey" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 px-4 py-3 md:px-8 transition-all duration-500 ${scrolled ? "bg-[#faf6ee]/90 backdrop-blur-md shadow-sm border-b border-black/10" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-[2.5px] border-black bg-[#fffef7] font-[Permanent_Marker] text-lg group-hover:bg-[#e63946] group-hover:text-white group-hover:border-[#e63946] transition-all duration-300" style={{ transform: "rotate(-4deg)" }}>K</span>
          <span className="hidden md:block font-[Caveat] font-bold text-2xl group-hover:text-[#e63946] transition-colors">Karthik.</span>
        </a>
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (<a key={l.href} href={l.href} className="nav-link">{l.label}</a>))}
          <a href="https://github.com/k-arthi-k-02" target="_blank" rel="noreferrer" className="ml-3 btn-hand btn-filled !py-1.5 !px-5 !text-sm">github ↗</a>
        </div>
        <button className="lg:hidden w-10 h-10 border-2 border-black rounded-lg bg-[#fffef7] flex flex-col items-center justify-center gap-1.5" onClick={() => setOpen(!open)} aria-label="menu">
          <span className={`w-5 h-[2.5px] bg-black rounded transition-all ${open ? "rotate-45 translate-y-[5px]" : ""}`} />
          <span className={`w-5 h-[2.5px] bg-black rounded transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`w-5 h-[2.5px] bg-black rounded transition-all ${open ? "-rotate-45 -translate-y-[5px]" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden mt-3 mx-auto max-w-7xl wiggle-box bg-[#fffef7] p-5 space-y-1">
          {links.map((l) => (<a key={l.href} href={l.href} className="block font-[Patrick_Hand] text-xl px-3 py-2 hover:text-[#e63946] transition-colors" onClick={() => setOpen(false)}>→ {l.label}</a>))}
          <a href="https://github.com/k-arthi-k-02" target="_blank" rel="noreferrer" className="block font-[Patrick_Hand] text-xl px-3 py-2 text-[#e63946] font-bold">github ↗</a>
        </div>
      )}
    </nav>
  );
}

/* =============== HERO =============== */
function Hero() {
  const typed = useTypewriter(["CS undergrad.", "AI/ML developer.", "builder.", "prompt tinkerer.", "problem solver."], 90, 1700);
  const mag = useMagnetic(0.22);

  return (
    <section id="top" className="relative min-h-screen pt-28 pb-16 px-6 md:px-10 flex items-center overflow-hidden">
      <Star className="absolute top-24 right-[14%] w-9 h-9 float-slow opacity-40 hidden md:block" color="#ffd93d" />
      <Sparkle className="absolute top-40 left-[9%] w-6 h-6 text-[#f4a261] float-fast opacity-40 hidden md:block" />
      <Sparkle className="absolute bottom-36 right-[24%] w-5 h-5 text-[#2a9d8f] float-slow opacity-35 hidden md:block" />

      <div className="mx-auto max-w-7xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="reveal inline-flex items-center gap-2 mb-6 bg-green-100 text-green-800 px-3 py-1 rounded-full border border-green-300 font-[Patrick_Hand] text-base">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              open to AI/ML internships & collabs
            </div>

            <h1 className="reveal font-[Caveat] font-bold leading-[0.92] tracking-tight" style={{ fontSize: "clamp(3.2rem, 10vw, 8rem)" }}>
              hey, i'm<br />
              <span className="relative inline-block">
                <span className="relative z-10">Karthik</span>
                <Wavy className="absolute left-0 right-0 -bottom-1 z-0" h="10px" />
              </span>
              <span className="text-[#e63946]">.</span>
            </h1>

            <div className="reveal mt-4 font-[Permanent_Marker] text-xl md:text-3xl text-neutral-700">
              i'm a <span className="text-[#e63946]">{typed}</span><span className="tw-cursor" />
            </div>

            <p className="reveal font-[Kalam] text-lg md:text-xl max-w-xl mt-5 leading-relaxed">
              <span className="hl-yellow font-bold">CSE (AI & ML) student @ MRCET</span> — building{" "}
              <span className="underline-hand" style={{ textDecorationColor: "#2a9d8f" }}>LLM-powered tools</span>, recommendation systems & computer vision projects that{" "}
              <span className="hl-pink">actually work, not just demo well</span>.
            </p>

            <div className="reveal mt-8 flex flex-wrap gap-4 items-center">
              <a href="#projects" className="btn-hand btn-filled" ref={mag.ref as React.RefObject<HTMLAnchorElement>} onMouseMove={mag.onMove as React.MouseEventHandler<HTMLAnchorElement>} onMouseLeave={mag.onLeave}>see my projects →</a>
              <a href="#contact" className="btn-hand btn-red">let's talk</a>
              <a href="https://www.linkedin.com/in/karthik-yarramraju-b70090331/" target="_blank" rel="noreferrer" className="font-[Patrick_Hand] text-lg underline-hand" style={{ textDecorationColor: "#e63946" }}>linkedin ↗</a>
            </div>

            <div className="reveal mt-10 flex flex-wrap gap-8 md:gap-10">
              <MetricCounter end={98} suffix="%" label="top-project accuracy" />
              <MetricCounter end={6} suffix="+" label="projects shipped" />
              <MetricCounter end={3} suffix="+" label="certifications" />
              <MetricCounter end={2027} suffix="" label="graduating" />
            </div>
          </div>

          {/* RIGHT — improved photo placement */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="reveal-scale photo-wrap float-slow" style={{ ["--rot" as string]: "-2deg" }}>
              {/* Doodle circle behind */}
              <svg viewBox="0 0 400 480" className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] -z-10 opacity-60 hidden md:block" fill="none">
                <ellipse cx="200" cy="240" rx="185" ry="225" stroke="#e63946" strokeWidth={2.5} strokeDasharray="8 10" opacity="0.4" />
              </svg>

              <div className="photo-frame w-[280px] sm:w-[320px] lg:w-[360px]" style={{ transform: "rotate(-3deg)" }}>
                <div className="tape absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-7 rotate-[-2deg]" />
                <img src={portrait} alt="Yarramraju Karthik" className="w-full aspect-[4/5] object-cover" />
                <div className="photo-inner-border" />
                <p className="photo-caption">that's me 👋 — debugging at 2am</p>
              </div>

              {/* Sticky note bottom-left */}
              <div className="sticky-note sticky-pink absolute -bottom-6 -left-8 md:-left-14 w-[160px] float" style={{ transform: "rotate(-6deg)", ["--rot" as string]: "-6deg" }}>
                <p className="font-[Gochi_Hand] text-base leading-tight">currently:<br /><b>AI Lease Assistant</b> 📄</p>
                <p className="font-[Kalam] text-xs mt-1">usability &gt; polish</p>
              </div>

              {/* Sticky note top-right */}
              <div className="sticky-note sticky-blue absolute -top-6 -right-6 md:-right-12 w-[135px] float-slow" style={{ transform: "rotate(6deg)", ["--rot" as string]: "6deg" }}>
                <p className="font-[Gochi_Hand] text-sm leading-tight">build mode: <span className="text-[#e63946]">ON</span> 🔥</p>
              </div>

              <Star className="absolute -bottom-10 right-6 w-9 h-9 float-fast" color="#ffd93d" />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="reveal mt-14 text-center">
          <p className="font-[Architects_Daughter] text-neutral-400 text-sm mb-2">scroll to explore</p>
          <div className="bounce-arrow mx-auto w-6 text-neutral-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 4 L12 20 M5 13 L12 20 L19 13" /></svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div ref={ref}>
      <div className="font-[Permanent_Marker] text-3xl md:text-4xl text-[#e63946]">{count.toLocaleString()}{suffix}</div>
      <div className="font-[Patrick_Hand] text-sm text-neutral-600 -mt-1">{label}</div>
    </div>
  );
}

/* =============== MARQUEE =============== */
function Marquee() {
  const items = ["LLMs", "★", "NLP", "★", "computer vision", "★", "prompt engineering", "★", "FastAPI", "★", "Flask", "★", "Streamlit", "★", "scikit-learn", "★", "Gemini API", "★", "DSA", "★"];
  return (
    <div className="overflow-hidden border-y-[2.5px] border-black py-3 bg-[#fffdf5]">
      <div className="flex marquee-track whitespace-nowrap gap-6 font-[Permanent_Marker] text-xl md:text-2xl uppercase">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-6 items-center shrink-0">
            {items.map((item, j) => (<span key={j} className={item === "★" ? "text-[#e63946]" : ""}>{item}</span>))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =============== SECTION HEADER =============== */
function SectionHeader({ num, label, note, dark = false }: { num: string; label: string; note?: string; dark?: boolean }) {
  return (
    <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
      <div className="flex items-end gap-4">
        <span className="section-num">{num}</span>
        <h2 className="font-[Caveat] font-bold text-5xl md:text-7xl leading-none relative inline-block">
          {label}
          <Wavy className="absolute left-0 right-0 -bottom-2" color={dark ? "#e63946" : "#1a1a1a"} h="8px" />
        </h2>
      </div>
      {note && (<p className={`font-[Architects_Daughter] md:text-right max-w-sm ${dark ? "text-neutral-400" : "text-neutral-500"}`}><span className="text-[#e63946]">//</span> {note}</p>)}
    </div>
  );
}

/* =============== ABOUT (with second image) =============== */
function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-10">
      <div className="absolute top-6 left-6 ghost-num text-[16rem] hidden lg:block">02</div>
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader num="01" label="about me" note="the unfiltered version." />

        <div className="grid md:grid-cols-12 gap-12 mt-10 items-start">
          {/* Left — polaroid + quote */}
          <div className="md:col-span-5 space-y-8">
            <div className="reveal-left photo-wrap mx-auto md:mx-0 block w-fit">
              <div className="photo-frame w-[260px] sm:w-[300px]" style={{ transform: "rotate(2deg)" }}>
                <div className="tape absolute -top-4 right-6 w-20 h-6 rotate-[4deg]" />
                <img src={portrait1} alt="Yarramraju Karthik" className="w-full aspect-square object-cover object-top" />
                <div className="photo-inner-border" />
                <p className="photo-caption">the builder behind the commits</p>
              </div>
              <DoodleArrow className="absolute -bottom-8 -right-10 w-16 h-16 text-neutral-400 hidden md:block" />
            </div>

            <div className="reveal-left wiggle-box bg-[#fffef7] p-5 relative" style={{ transform: "rotate(-1deg)" }}>
              <div className="tape absolute -top-3 left-8 w-16 h-5 rotate-[-3deg]" />
              <p className="font-[Shadows_Into_Light] text-2xl md:text-3xl text-center leading-snug">
                "build things that actually work,<br />then make them <span className="text-[#e63946]">smarter</span>."
              </p>
            </div>
          </div>

          {/* Right — text + cards */}
          <div className="md:col-span-7 space-y-5 font-[Kalam] text-lg md:text-xl leading-relaxed">
            <p className="reveal">i'm a <span className="font-bold">builder first</span>, student second (okay, both, but you get it). i'm a CSE (AI & ML) undergrad at <b>MRCET</b> who'd rather ship a rough working project than polish a tutorial-clone.</p>
            <p className="reveal">right now my time goes into sharpening real AI engineering skills — building <span className="hl-blue">LLM-powered tools</span>, wrestling with hallucinations in <span className="hl-blue">Llama</span> and <span className="hl-blue">Gemini</span>, and shipping projects across recommendation systems, computer vision & agentic AI.</p>
            <p className="reveal">i don't optimize for demos. i optimize for <span className="hl-yellow font-bold">things that hold up</span> — accuracy over vibes, working code over slideware, learning by breaking things at 2am.</p>

            <div className="reveal sketch-card !mt-8" style={{ transform: "rotate(-1deg)" }}>
              <h3 className="font-[Permanent_Marker] text-lg mb-3 flex items-center gap-2"><Sparkle className="w-5 h-5 text-[#f4a261]" /> optimizing for</h3>
              <ul className="grid sm:grid-cols-2 gap-2 stagger font-[Patrick_Hand] text-base">
                {[["outcome", "output"], ["real projects", "tutorials"], ["accuracy", "demo polish"], ["shipped code", "vanity metrics"]].map(([g, b]) => (
                  <li key={g} className="flex items-start gap-2"><CheckMark className="w-4 h-4 text-green-700 shrink-0 mt-1" /><span><b className="text-green-800">{g}</b> <span className="text-neutral-400 line-through">{b}</span></span></li>
                ))}
              </ul>
            </div>

            <div className="reveal sticky-note sticky-orange !p-4 !mt-4" style={{ transform: "rotate(1.5deg)" }}>
              <p className="font-[Gochi_Hand] text-lg">💡 3 questions i ask daily:</p>
              <p className="font-[Kalam] text-sm mt-1">why did this prompt hallucinate? · how do i make this scale? · what's the simplest version that actually works?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== PROJECTS =============== */
function Ventures() {
  const ventures = [
    { name: "AI Lease Contract Review", emoji: "📄", tagline: "LLM-Powered Legal Assistant", status: "Shipped", color: "sticky-pink", rot: -1.5, desc: "Reviews lease & loan contracts, flags risky clauses, and generates negotiation suggestions. Cut hallucinations by refining prompts on Llama 3.3.", stack: ["FastAPI", "Ollama", "Llama 3.3", "LLMs"], link: null },
    { name: "Recipe Recommendation System", emoji: "🍳", tagline: "Ingredient-Based Recs", status: "Shipped", color: "sticky-blue", rot: 1, desc: "Cosine-similarity engine hitting 98% recommendation accuracy, built on a custom-scraped recipe dataset.", stack: ["Python", "Scikit-learn", "Pandas"], link: "https://github.com/k-arthi-k-02/recipe_recommendation_system-Based-on-ingrediants-" },
    { name: "Diatom Image Classification", emoji: "🔬", tagline: "Deep Learning + Computer Vision", status: "Building", color: "sticky-green", rot: -1, desc: "Image classifier for diatom species recognition, with a full backend-frontend pipeline for inference.", stack: ["Python", "Deep Learning", "CV"], link: "https://github.com/k-arthi-k-02/diatom-backend" },
    { name: "RAG-GPT", emoji: "📚", tagline: "Retrieval-Augmented Chatbot", status: "Shipped", color: "sticky-purple", rot: 1.5, desc: "A document-aware chatbot combining RAG with the Gemini API, so answers stay grounded in your own files.", stack: ["RAG", "Gemini API", "Streamlit"], link: "https://github.com/k-arthi-k-02/RAG-GPT" },
    { name: "Custom GPT Chatbot", emoji: "🤖", tagline: "No-Code Configurable Assistant", status: "Shipped", color: "sticky-orange", rot: -1, desc: "A configurable GPT-style chatbot with real-time streaming responses and ~99% uptime across test cycles.", stack: ["Gemini API", "Python", "Streaming"], link: "https://github.com/k-arthi-k-02/Custom-GPT" },
    { name: "Blood Bank Management", emoji: "🩸", tagline: "Flask + MySQL Web App", status: "Shipped", color: "sticky-pink", rot: 1, desc: "Streamlines donations with secure logins, real-time SSE alerts, and 86% accurate donor eligibility prediction.", stack: ["Flask", "MySQL", "SSE"], link: "https://github.com/k-arthi-k-02/Blood-Bank-Management-System" },
  ];
  return (
    <section id="projects" className="relative py-28 px-6 md:px-10 crosshatch-bg">
      <div className="absolute top-6 right-6 ghost-num text-[16rem] hidden lg:block">03</div>
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader num="02" label="projects i've built" note="from ideas to shipped code." />
        <div className="grid sm:grid-cols-2 gap-8 mt-12">
          {ventures.map((v, i) => (
            <div key={v.name} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className={`sticky-note ${v.color} !p-6 relative min-h-[260px] card-3d glow-hover`} style={{ transform: `rotate(${v.rot}deg)` }}>
                <div className="tape absolute -top-3 left-6 w-16 h-5" style={{ transform: `rotate(${-v.rot * 2}deg)` }} />
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{v.emoji}</div>
                  <span className={`font-[Patrick_Hand] text-xs px-3 py-1 border-2 border-black rounded-full ${v.status === "Shipped" ? "bg-black text-[#fff9b0]" : "bg-white/70"}`}>{v.status}</span>
                </div>
                <h3 className="font-[Permanent_Marker] text-2xl leading-none">{v.name}</h3>
                <p className="font-[Patrick_Hand] text-base text-neutral-600 mt-1">{v.tagline}</p>
                <p className="font-[Kalam] text-base mt-4 leading-snug">{v.desc}</p>
                <div className="mt-4 flex flex-wrap">{v.stack.map((t) => (<span key={t} className="tag-pill !text-xs !py-0.5 !px-2 !m-0.5 !bg-white/60">{t}</span>))}</div>
                {v.link && (<a href={v.link} target="_blank" rel="noreferrer" className="mt-3 inline-block font-[Patrick_Hand] text-sm underline-hand" style={{ textDecorationColor: "#1a1a1a" }}>view repo ↗</a>)}
                <div className="absolute bottom-3 right-4 font-[Caveat] text-3xl font-bold text-black/10">0{i + 1}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============== WORK =============== */
/* =============== SKILLS =============== */
function Skills() {
  const groups = [
    { title: "Languages", items: ["Python", "HTML", "CSS", "SQL", "Java (basic)"], color: "#e63946", icon: "⌨️" },
    { title: "AI / ML / Data", items: ["NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Gemini API", "Llama 3.3"], color: "#6a4c93", icon: "🧠" },
    { title: "Frameworks", items: ["FastAPI", "Flask", "Streamlit"], color: "#264653", icon: "⚙️" },
    { title: "Dev Tools", items: ["VS Code", "Jupyter Notebook", "Google Colab", "Postman", "Render", "GitHub"], color: "#f4a261", icon: "🔧" },
    { title: "Core CS", items: ["Data Structures", "DBMS", "Operating Systems", "Computer Networks"], color: "#2a9d8f", icon: "📘" },
  ];
  return (
    <section id="skills" className="relative py-28 px-6 md:px-10">
      <div className="absolute bottom-6 right-6 ghost-num text-[16rem] hidden lg:block">05</div>
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader num="04" label="tech i wield" note="weapons of mass creation." />

        {/* hand-drawn logo marquee */}
        <div className="reveal mt-10 relative overflow-hidden border-y-2 border-dashed border-black/25 py-5">
          <div className="flex logo-marquee whitespace-nowrap gap-10 items-center">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex gap-10 items-center shrink-0">
                {techLogos.map(({ name, C }) => (
                  <div key={name + dup} className="flex flex-col items-center gap-1 group shrink-0">
                    <C className="w-11 h-11 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
                    <span className="font-[Patrick_Hand] text-xs text-neutral-500 group-hover:text-[#e63946] transition-colors">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {groups.map((g, i) => (
            <div key={g.title} className="reveal wiggle-box bg-[#fffef7] p-5 relative card-3d" style={{ transitionDelay: `${i * 70}ms`, transform: `rotate(${i % 2 ? -0.8 : 0.8}deg)` }}>
              <div className="text-2xl mb-2">{g.icon}</div>
              <div className="flex items-center gap-2 mb-3"><span className="w-3 h-3 rounded-full" style={{ background: g.color }} /><h3 className="font-[Permanent_Marker] text-base leading-none">{g.title}</h3></div>
              <ul className="space-y-1.5 font-[Patrick_Hand] text-base">
                {g.items.map((it) => (<li key={it} className="flex items-center gap-2 group"><span className="text-[#e63946] text-xs group-hover:translate-x-1 transition-transform">▸</span><span className="group-hover:text-[#e63946] transition-colors">{it}</span></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 reveal">
          <p className="font-[Gochi_Hand] text-2xl mb-3 flex items-center gap-2"><Sparkle className="w-5 h-5 text-[#f4a261]" /> also pretty good at:</p>
          <div className="flex flex-wrap stagger">
            {["prompt engineering", "DSA & problem solving", "data preprocessing", "rapid prototyping", "debugging at 2am", "reading ML papers", "LeetCode grinding", "technical writing", "API testing", "asking dumb questions"].map((t) => (<span key={t} className="tag-pill">{t}</span>))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== JOURNEY =============== */
function Journey() {
  const timeline = [
    { year: "2026", role: "AI Developer Intern", company: "Infosys Springboard", desc: "Built an LLM-powered assistant to review lease & loan contracts, flag risky clauses, and generate negotiation recommendations. Reduced hallucinations in Llama 3.3 through prompt refinement, and layered in the Gemini API for more reliable, context-aware responses.", tags: ["LLMs", "Prompt Engineering", "Gemini API"], note: "shipped a real contract-review AI 📄", highlight: true },
    { year: "2023 – 2027", role: "B.Tech, CSE (AI & ML)", company: "Malla Reddy College of Engineering & Technology", desc: "8.37 CGPA. Coursework in Data Structures, DBMS, AI, Machine Learning, Computer Networks & Operating Systems — while shipping side projects on the weekends.", tags: ["DSA", "AI/ML", "DBMS"] },
    { year: "2021 – 2023", role: "Senior Secondary (Intermediate)", company: "Narayana Junior College", desc: "8.26 CGPA. Built the analytical foundation before jumping headfirst into code.", tags: ["Foundation"] },
    { year: "2012 – 2021", role: "Secondary School", company: "Raju High School", desc: "10.0 CGPA — and the first spark of curiosity that eventually led here.", tags: ["Beginnings"], note: "where it all began ✨" },
  ];
  return (
    <section id="journey" className="relative py-28 px-6 md:px-10 crosshatch-bg">
      <div className="absolute top-6 left-6 ghost-num text-[16rem] hidden lg:block">06</div>
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader num="05" label="the journey" note="an open book. unfiltered." />
        <div className="mt-12 relative">
          <div className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-[3px] bg-black/20 rounded-full" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <div key={t.company} className="reveal relative pl-14 md:pl-16" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="timeline-dot absolute left-[9px] md:left-[13px] top-3" />
                <div className={`sketch-card !p-6 ${t.highlight ? "!border-[#e63946] !border-[2.5px]" : ""}`} style={{ transform: `rotate(${i % 2 ? -1 : 0.5}deg)` }}>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-[Gochi_Hand] text-2xl text-[#e63946]">{t.year}</span>
                    <h3 className="font-[Permanent_Marker] text-xl md:text-2xl">{t.role}</h3>
                    <span className="font-[Patrick_Hand] text-lg text-neutral-500">@ {t.company}</span>
                  </div>
                  <p className="font-[Kalam] text-base md:text-lg leading-snug">{t.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-1">{t.tags.map((tag) => (<span key={tag} className="tag-pill !text-xs !py-0 !px-2">{tag}</span>))}</div>
                  {t.note && (<div className="mt-3 inline-block font-[Architects_Daughter] text-sm italic bg-[#fff9b0] px-2 py-0.5 rotate-[-1deg]">{t.note}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== CURRENTLY (live dashboard) =============== */
function Currently() {
  const focuses = [
    { emoji: "📄", label: "AI Lease Assistant", desc: "refining prompts, killing hallucinations", progress: 88, tag: "shipping", color: "#e63946" },
    { emoji: "🔬", label: "Diatom Classifier", desc: "deep learning for species recognition", progress: 60, tag: "building", color: "#2a9d8f" },
    { emoji: "📚", label: "RAG-GPT", desc: "grounding answers in real documents", progress: 75, tag: "refining", color: "#6a4c93" },
    { emoji: "🧩", label: "DSA grind", desc: "sharpening the fundamentals daily", progress: 65, tag: "practicing", color: "#f4a261" },
    { emoji: "🏗️", label: "System design", desc: "distributed architecture & failure modes", progress: 45, tag: "learning", color: "#3178c6" },
  ];
  const ticker = [
    "☕ 3rd chai of the day", "🎧 lo-fi on repeat", "🧩 debugging Llama prompts", "📈 reading ML papers",
    "💻 LeetCode streak alive", "🌙 it's late, still building", "🚀 shipping > perfecting",
  ];
  return (
    <section className="relative py-28 px-6 md:px-10 dark-section overflow-hidden">
      {/* floating glows */}
      <div className="absolute top-20 left-[8%] w-40 h-40 rounded-full bg-[#e63946]/10 blur-3xl" />
      <div className="absolute bottom-24 right-[10%] w-52 h-52 rounded-full bg-[#2a9d8f]/10 blur-3xl" />
      <Sparkle className="absolute top-24 right-[15%] w-6 h-6 text-[#f4a261]/50 float-slow hidden md:block" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="reveal text-center mb-4">
          <span className="inline-flex items-center gap-2 font-[Patrick_Hand] text-sm bg-white/10 border border-white/15 px-4 py-1.5 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            live · working right now
          </span>
        </div>
        <div className="reveal text-center mb-3">
          <h2 className="font-[Caveat] font-bold text-5xl md:text-7xl">right <span className="text-[#e63946]">now</span></h2>
          <p className="font-[Architects_Daughter] text-neutral-400 mt-1">the current build queue, live from my desk.</p>
        </div>

        {/* status ticker */}
        <div className="reveal mt-6 overflow-hidden border-y border-white/10 py-2.5">
          <div className="flex marquee-track whitespace-nowrap gap-8 font-[Patrick_Hand] text-sm text-neutral-400">
            {[0, 1].map((d) => (
              <div key={d} className="flex gap-8 shrink-0">
                {ticker.map((t, j) => (<span key={j} className="flex items-center gap-8">{t}<span className="text-[#e63946]">•</span></span>))}
              </div>
            ))}
          </div>
        </div>

        {/* build queue cards with progress bars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-12">
          {focuses.map((f, i) => (
            <div key={f.label} className="reveal now-card group" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between">
                <div className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">{f.emoji}</div>
                <span className="now-tag" style={{ borderColor: f.color, color: f.color }}>{f.tag}</span>
              </div>
              <h3 className="font-[Permanent_Marker] text-base mt-3">{f.label}</h3>
              <p className="font-[Patrick_Hand] text-sm text-neutral-400 mt-1 leading-snug">{f.desc}</p>
              {/* hand-drawn progress bar */}
              <div className="mt-4">
                <div className="flex justify-between font-[Patrick_Hand] text-[11px] text-neutral-500 mb-1">
                  <span>progress</span><span style={{ color: f.color }}>{f.progress}%</span>
                </div>
                <div className="now-bar">
                  <div className="now-bar-fill" style={{ ["--w" as string]: `${f.progress}%`, background: f.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* bottom row: terminal + now-playing note */}
        <div className="grid lg:grid-cols-5 gap-6 mt-12 items-stretch">
          {/* terminal (kept, spans 3) */}
          <div className="reveal lg:col-span-3">
            <div className="bg-black/60 border border-white/10 rounded-lg p-6 font-mono text-sm h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-[#e63946]" /><span className="w-3 h-3 rounded-full bg-[#ffd93d]" /><span className="w-3 h-3 rounded-full bg-[#2a9d8f]" />
                <span className="ml-2 text-neutral-500 font-[Patrick_Hand] text-xs">karthik@portfolio:~</span>
              </div>
              <div className="space-y-1 text-neutral-300">
                <p><span className="text-[#2a9d8f]">$</span> cat status.txt</p>
                <p><span className="text-[#ffd93d]">role</span>       = <span className="text-[#e63946]">"AI/ML Dev @ MRCET"</span></p>
                <p><span className="text-[#ffd93d]">building</span>   = <span className="text-[#e63946]">["AI Lease Assistant", "Diatom Classifier", "RAG-GPT"]</span></p>
                <p><span className="text-[#ffd93d]">philosophy</span> = <span className="text-[#e63946]">"ship real projects &gt; tutorials"</span></p>
                <p><span className="text-[#ffd93d]">open_to</span>    = <span className="text-[#e63946]">"AI/ML internships & collabs"</span></p>
                <p className="mt-2"><span className="text-[#2a9d8f]">$</span> <span className="tw-cursor !bg-white" /></p>
              </div>
            </div>
          </div>

          {/* now playing / vibe card (spans 2) */}
          <div className="reveal lg:col-span-2 space-y-6" style={{ transitionDelay: "120ms" }}>
            <div className="now-vibe">
              <div className="flex items-center gap-3">
                <div className="now-eq">
                  <span /><span /><span /><span />
                </div>
                <div>
                  <p className="font-[Patrick_Hand] text-xs text-neutral-400">now playing</p>
                  <p className="font-[Permanent_Marker] text-base">deep focus — lo-fi beats 🎧</p>
                </div>
              </div>
              <div className="mt-4 now-bar"><div className="now-bar-fill" style={{ ["--w" as string]: "45%", background: "#2a9d8f" }} /></div>
              <div className="flex justify-between font-[Patrick_Hand] text-[11px] text-neutral-500 mt-1"><span>2:14</span><span>4:52</span></div>
            </div>

            <div className="now-mood">
              <p className="font-[Gochi_Hand] text-lg text-[#ffd93d]">today's mood</p>
              <p className="font-[Shadows_Into_Light] text-xl mt-1 leading-snug">
                "locked in. shipping mode. don't disturb (unless it's a bug 🐛)."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== FUN FACTS =============== */
function FunFacts() {
  const facts = [
    { emoji: "☕", title: "fuel", desc: "chai → code → ship → repeat. that's the loop." },
    { emoji: "🌙", title: "schedule", desc: "most productive 10pm–3am. best ideas come in the dark." },
    { emoji: "📚", title: "learning", desc: "deep-diving agentic AI, LLMs & recommendation systems." },
    { emoji: "🎯", title: "mission", desc: "turn AI hype into things that actually, reliably work." },
    { emoji: "🛠️", title: "process", desc: "whiteboard → notebook → prototype → ship. no 50-page PRDs." },
    { emoji: "💬", title: "motto", desc: "\"if it doesn't ship, it doesn't count.\"" },
  ];
  const colors = ["sticky-pink", "sticky-blue", "sticky-green", "sticky-orange", "sticky-purple", ""];
  const rots = [-2, 1.5, -1, 2, -1.5, 1];
  return (
    <section id="fun" className="relative py-28 px-6 md:px-10">
      <div className="absolute bottom-6 left-6 ghost-num text-[16rem] hidden lg:block">07</div>
      <div className="mx-auto max-w-7xl relative z-10">
        <SectionHeader num="06" label="beyond the code" note="the human behind the commits." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {facts.map((f, i) => (
            <div key={f.title} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className={`sticky-note ${colors[i]} !p-5 card-3d min-h-[160px]`} style={{ transform: `rotate(${rots[i]}deg)` }}>
                <div className="tape absolute -top-3 left-6 w-14 h-5" style={{ transform: `rotate(${-rots[i]}deg)` }} />
                <div className="text-3xl mb-2">{f.emoji}</div>
                <h3 className="font-[Permanent_Marker] text-xl">{f.title}</h3>
                <p className="font-[Kalam] text-base mt-2 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-16 max-w-xl mx-auto">
          <div className="wiggle-box bg-[#fffef7] p-8 relative" style={{ transform: "rotate(-1deg)" }}>
            <div className="tape absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5" />
            <p className="font-[Shadows_Into_Light] text-3xl text-center mb-4">to-do list (life edition)</p>
            <ul className="space-y-3 font-[Kalam] text-lg">
              {[{ t: "learn to code", d: true }, { t: "build something real", d: true }, { t: "land an AI internship", d: true }, { t: "ship the lease-review AI", d: true }, { t: "crack FAANG-level DSA", d: false }, { t: "sleep properly", d: false }].map((item) => (
                <li key={item.t} className="flex items-center gap-3">
                  <span className={`w-5 h-5 border-2 border-black rounded flex items-center justify-center ${item.d ? "bg-green-200" : ""}`}>{item.d && <CheckMark className="w-4 h-4 text-green-800" />}</span>
                  <span className={item.d ? "line-through text-neutral-400" : ""}>{item.t}</span>
                </li>
              ))}
            </ul>
            <Star className="absolute -bottom-4 -right-4 w-8 h-8" color="#ffd93d" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== GITHUB STATS =============== */
function GitHubStats() {
  return (
    <section className="relative py-28 px-6 md:px-10 crosshatch-bg">
      <div className="absolute top-10 right-10 ghost-num text-[12rem] hidden lg:block opacity-40">
        GH
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="reveal text-center mb-12 relative inline-block mx-auto w-full">
          <h2 className="font-[Caveat] font-bold text-5xl md:text-7xl flex items-center justify-center gap-3">
            <Sparkle className="w-8 h-8 text-[#e63946]" />
            github <span className="text-[#e63946] hl-yellow px-2">analytics</span>
          </h2>

          <p className="font-[Patrick_Hand] text-neutral-500 mt-3 text-xl">
            contributions, streaks & late-night commits.
          </p>

          <DoodleArrow className="absolute -bottom-8 right-1/4 w-12 h-12 text-neutral-400 hidden md:block rotate-[70deg]" />
        </div>

        {/* Top Row */}
        <div className="reveal grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto mt-10">
          {/* GitHub Streak */}
          <div
            className="sketch-card !p-5 relative card-3d glow-hover bg-[#fffef7]"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            <div className="tape absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[-2deg]" />

            <img
              src="https://streak-stats.demolab.com?user=k-arthi-k-02&theme=transparent&hide_border=true"
              alt="GitHub Streak"
              className="w-full"
              loading="lazy"
            />
          </div>

          {/* Top Languages */}
          <div
            className="sketch-card !p-5 relative card-3d glow-hover bg-[#fffef7]"
            style={{ transform: "rotate(2deg)" }}
          >
            <div className="tape absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[4deg]" />

            <img
              src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=k-arthi-k-02&theme=github"
              alt="Top Languages"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Activity Graph */}
        <div className="reveal max-w-6xl mx-auto mt-10">
          <div className="sketch-card !p-5 relative card-3d glow-hover bg-[#fffef7]">
            <div className="tape absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[1deg]" />

            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=k-arthi-k-02&theme=github-compact&hide_border=true"
              alt="GitHub Activity Graph"
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== CONTACT =============== */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "yarramrajuk@gmail.com";
  const copy = () => { navigator.clipboard?.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <section id="contact" className="relative py-28 px-6 md:px-10">
      <div className="absolute top-6 right-6 ghost-num text-[16rem] hidden lg:block">08</div>
      <div className="mx-auto max-w-5xl relative z-10 text-center">
        <SectionHeader num="07" label="let's build" note="" />
        <div className="reveal mt-8 relative inline-block">
          <h2 className="font-[Caveat] font-bold leading-tight" style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}>
            got a <span className="hl-yellow">problem</span><br />worth <span className="text-[#e63946]">solving</span>?
          </h2>
          <Star className="absolute -top-6 -right-10 w-10 h-10 float hidden md:block" color="#ffd93d" />
          <Sparkle className="absolute bottom-2 -left-8 w-6 h-6 text-[#f4a261] float-slow hidden md:block" />
        </div>
        <p className="reveal font-[Kalam] text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">recruiters, mentors, or fellow builders working on AI, ML, or anything worth shipping. <span className="hl-pink">not chasing hype. looking to learn & build.</span></p>
        <div className="reveal mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href={`mailto:yarramrajuk@gmail.com?subject=let's build something`} className="btn-hand btn-filled text-xl">✉️ drop me an email →</a>
          <button onClick={() => navigator.clipboard?.writeText("yarramrajuk@gmail.com")} className="btn-hand text-xl">{copied ? "✓ copied!" : "📋 copy email"}</button>
        </div>
        <div className="reveal mt-6 font-[Patrick_Hand] text-neutral-500">or find me here ↓</div>
        <div className="reveal mt-3 flex justify-center gap-4 flex-wrap">
          {[{ label: "github", url: "https://github.com/k-arthi-k-02", icon: "🐙" }, { label: "linkedin", url: "https://www.linkedin.com/in/karthik-yarramraju-b70090331/", icon: "💼" }].map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="tag-pill !text-lg !px-6 !py-2">{s.icon} {s.label} ↗</a>
          ))}
        </div>
        <div className="reveal mt-16 relative inline-block">
          <p className="font-[Caveat] font-bold text-4xl md:text-5xl" style={{ transform: "rotate(-3deg)" }}>— Yarramraju Karthik</p>
          <Scribble className="w-40 h-5 absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-60" />
        </div>
        <div className="reveal mt-12 inline-block">
          <div className="sticky-note sticky-pink !p-4 !inline-block" style={{ transform: "rotate(3deg)" }}>
            <p className="font-[Gochi_Hand] text-lg">p.s. — if you've scrolled this far,<br />we should definitely talk. 😄</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== FOOTER =============== */
function Footer() {
  return (
    <footer className="relative px-6 md:px-10 py-8 border-t-[2.5px] border-black/80">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-6"><p className="font-[Shadows_Into_Light] text-xl text-neutral-600">"the best time to build was yesterday. the second best is <span className="text-[#e63946]">right now</span>."</p></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-[Patrick_Hand] text-base">
          <p className="flex items-center gap-2"><span className="font-[Permanent_Marker]">⚡</span> hand-crafted with care & caffeine</p>
          <p>build mode: <span className="inline-flex items-center gap-1 bg-[#e63946] text-white px-2 py-0.5 rounded text-sm font-bold">ON <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /></span></p>
          <p className="text-neutral-500">© {new Date().getFullYear()} Yarramraju Karthik</p>
        </div>
        <div className="text-center mt-6"><a href="#top" className="inline-flex items-center gap-2 font-[Patrick_Hand] text-sm text-neutral-500 hover:text-[#e63946] transition-colors">↑ back to top</a></div>
      </div>
    </footer>
  );
}

/* =============== APP =============== */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const progress = useScrollProgress();
  useReveal();
  const handleLoaded = useCallback(() => setLoaded(true), []);
  const observed = useRef(false);

  useEffect(() => {
    if (!loaded || observed.current) return;
    observed.current = true;
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .stagger, .draw-line");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
      }, { threshold: 0.1 });
      els.forEach((el) => io.observe(el));
    }, 80);
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    <>
      {!loaded && <Loader onDone={handleLoaded} />}
      <CustomCursor />
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <div className="paper-bg paper-noise margin-line relative min-h-screen">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Notebook />
          <Ventures />
          <TrainWork />
          <Skills />
          <Journey />
          <Currently />
          <FunFacts />
          <GitHubStats />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}