"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Home, Clock, ChevronRight, Check,
  Info, Lightbulb, AlertTriangle, Key, Copy, CheckCheck
} from "lucide-react";
import { useState } from "react";
import type { Block, ModuleData } from "@/lib/modules-data";

const moduleEmojis: Record<string, string> = {
  "01": "🧠", "02": "💬", "03": "🏢",
  "04": "⚡", "05": "🦾", "06": "💰", "07": "🏆",
};
const moduleTitles = (locale: string) => locale === "en"
  ? ["Fundamentals", "Claude Chat", "Cowork", "Claude Code", "Skills & MCP", "Pricing", "Use Cases"]
  : ["Los Fundamentos", "Claude Chat", "Cowork", "Claude Code", "Skills & MCP", "Precios", "Casos de Uso"];

function CalloutBlock({ block }: { block: Extract<Block, { type: "callout" }> }) {
  const styles = {
    info:    { bg: "rgba(0,212,170,0.07)", border: "#00d4aa", icon: Info,          iconColor: "#00d4aa" },
    tip:     { bg: "rgba(255,190,11,0.07)", border: "#ffbe0b", icon: Lightbulb,     iconColor: "#ffbe0b" },
    warning: { bg: "rgba(255,107,53,0.07)", border: "#ff6b35", icon: AlertTriangle, iconColor: "#ff6b35" },
    key:     { bg: "rgba(124,92,191,0.08)", border: "#7c5cbf", icon: Key,           iconColor: "#7c5cbf" },
  };
  const s = styles[block.variant];
  const Icon = s.icon;
  return (
    <div
      className="rounded-xl p-5 my-6 border-l-4"
      style={{ background: s.bg, borderLeftColor: s.border }}
    >
      <div className="flex items-start gap-3">
        <Icon size={18} style={{ color: s.iconColor }} className="flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-white text-sm mb-1" style={{ color: s.iconColor }}>{block.title}</p>
          <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{block.text}</p>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ block }: { block: Extract<Block, { type: "code" }> }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(block.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between px-4 py-2 bg-[rgba(0,0,0,0.4)] border-b border-[rgba(255,255,255,0.06)]">
        <span className="text-xs text-white/30 font-mono">{block.lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors"
        >
          {copied ? <CheckCheck size={13} className="text-teal" /> : <Copy size={13} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="code-block rounded-none border-0 text-white/80 overflow-x-auto">
        <code>{block.text}</code>
      </pre>
    </div>
  );
}

function TableBlock({ block }: { block: Extract<Block, { type: "table" }> }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.07)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]">
            {block.headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 ${ci === 0 ? "text-white font-medium" : "text-white/60"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalogyBlock({ block }: { block: Extract<Block, { type: "analogy" }> }) {
  return (
    <div className="glass-card p-6 my-6 flex gap-5 items-start">
      <div className="text-4xl flex-shrink-0">{block.emoji}</div>
      <div>
        <h4 className="font-semibold text-white font-display mb-2">{block.title}</h4>
        <p className="text-white/65 text-sm leading-relaxed">{block.text}</p>
      </div>
    </div>
  );
}

function ComparisonBlock({ block }: { block: Extract<Block, { type: "comparison" }> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      {[block.left, block.right].map((side, i) => (
        <div
          key={side.label}
          className="rounded-xl p-5 border"
          style={{
            background: i === 0 ? "rgba(0,212,170,0.06)" : "rgba(255,190,11,0.06)",
            borderColor: i === 0 ? "rgba(0,212,170,0.3)" : "rgba(255,190,11,0.3)",
          }}
        >
          <p className="text-xs font-semibold mb-3" style={{ color: i === 0 ? "#00d4aa" : "#ffbe0b" }}>
            {side.label}
          </p>
          <ul className="space-y-2">
            {side.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <Check size={13} className="flex-shrink-0 mt-0.5 text-white/30" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function QuizBlock({ block }: { block: Extract<Block, { type: "quiz" }> }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="my-8 rounded-2xl border border-[rgba(255,107,53,0.2)] bg-[rgba(255,107,53,0.04)] p-6">
      <p className="text-xs font-bold text-coral label-upper mb-4">✦ Quiz</p>
      <p className="text-white font-semibold mb-5 leading-snug">{block.question}</p>
      <div className="space-y-3">
        {block.options.map((opt, i) => {
          const isCorrect = i === block.correct;
          const isSelected = selected === i;
          let style = "border-[rgba(255,255,255,0.08)] text-white/60 hover:border-white/20 hover:text-white/80";
          if (revealed && isCorrect) style = "border-teal bg-[rgba(0,212,170,0.08)] text-teal";
          else if (revealed && isSelected && !isCorrect) style = "border-coral/50 bg-[rgba(255,107,53,0.06)] text-coral/70";

          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                isSelected && !revealed ? "border-white/30 text-white bg-white/5" : style
              }`}
            >
              <span className="font-mono text-xs mr-2 opacity-40">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && !revealed && (
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 btn-glow text-sm px-6 py-2"
        >
          Ver respuesta
        </button>
      )}
      {revealed && (
        <div className="mt-4 p-4 rounded-xl bg-[rgba(0,212,170,0.08)] border border-teal/20">
          <p className="text-xs text-teal font-semibold mb-1">💡 Explicación</p>
          <p className="text-white/70 text-sm leading-relaxed">{block.explanation}</p>
        </div>
      )}
    </div>
  );
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2": return <h2 key={i} className="headline-m text-white mt-12 mb-4 first:mt-0">{block.text}</h2>;
    case "h3": return <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3 font-display">{block.text}</h3>;
    case "p":  return <p key={i} className="text-white/65 leading-relaxed mb-4">{block.text}</p>;
    case "callout": return <CalloutBlock key={i} block={block} />;
    case "code": return <CodeBlock key={i} block={block} />;
    case "table": return <TableBlock key={i} block={block} />;
    case "analogy": return <AnalogyBlock key={i} block={block} />;
    case "comparison": return <ComparisonBlock key={i} block={block} />;
    case "quiz": return <QuizBlock key={i} block={block} />;
    case "list": return (
      <ul key={i} className="space-y-3 my-5">
        {block.items.map((item, j) => (
          <li key={j} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
            <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-coral" />
            {item}
          </li>
        ))}
      </ul>
    );
    default: return null;
  }
}

export default function ModuleReader({ module }: { module: ModuleData }) {
  const locale = useLocale();
  const router = useRouter();
  const titles = moduleTitles(locale);
  const ids = ["01", "02", "03", "04", "05", "06", "07"];

  return (
    <div className="min-h-screen bg-void flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 xl:w-72 fixed top-0 left-0 h-full border-r border-[rgba(255,255,255,0.06)] bg-surface overflow-y-auto z-40">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-[rgba(255,255,255,0.06)]">
          <Link
            href={`/${locale}`}
            className="brand font-display font-bold text-lg text-white no-underline hover:opacity-80 transition-opacity"
            dangerouslySetInnerHTML={{ __html: `Claude<span style="color:var(--coral)">4</span>Dummies` }}
          />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1" aria-label="Módulos">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/35 hover:text-white/70 hover:bg-white/5 transition-all text-sm no-underline mb-4"
          >
            <Home size={14} />
            <span>Inicio</span>
          </Link>
          {ids.map((id, idx) => {
            const isActive = id === module.id;
            return (
              <Link
                key={id}
                href={`/${locale}/modulo/${id}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all no-underline group ${
                  isActive
                    ? "bg-[rgba(255,107,53,0.1)] text-white border border-[rgba(255,107,53,0.25)]"
                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                }`}
                id={`sidebar-module-${id}`}
              >
                <span>{moduleEmojis[id]}</span>
                <span className="flex-1 leading-tight">{titles[idx]}</span>
                {isActive && <ChevronRight size={13} className="text-coral flex-shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-xs text-white/20">Claude4Dummies · 2026</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 xl:ml-72">
        {/* Top bar (mobile only) */}
        <div className="lg:hidden sticky top-0 z-30 bg-[rgba(8,8,14,0.9)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-white/50 hover:text-white">
            <Home size={18} />
          </Link>
          <span className="text-sm font-semibold text-white">{module.emoji} {module.title}</span>
          <Link href={`/${locale}`} className="text-xs text-coral">Módulos</Link>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-6 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/30 mb-10" aria-label="breadcrumb">
            <Link href={`/${locale}`} className="hover:text-white/60 transition-colors no-underline">Inicio</Link>
            <ChevronRight size={12} />
            <span>Módulo {module.number}</span>
          </nav>

          {/* Module header */}
          <header className="mb-14">
            <div className="text-6xl mb-6">{module.emoji}</div>
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="badge text-xs">Módulo {module.number}</span>
              <span className="flex items-center gap-1.5 text-xs text-white/30 border border-[rgba(255,255,255,0.08)] px-3 py-1 rounded-full">
                <Clock size={11} />
                {module.time}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                module.level === "Básico" || module.level === "Basic" ? "level-basic"
                : module.level === "Intermedio" || module.level === "Intermediate" ? "level-intermediate"
                : module.level === "Avanzado" || module.level === "Advanced" ? "level-advanced"
                : "level-all"
              }`}>
                {module.level}
              </span>
            </div>
            <h1 className="display text-white mb-4">{module.title}</h1>
            <p className="text-white/50 text-lg leading-relaxed">{module.subtitle}</p>
          </header>

          {/* Content blocks */}
          <div>
            {module.content.map((block, i) => renderBlock(block, i))}
          </div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between mt-20 pt-8 border-t border-[rgba(255,255,255,0.07)]">
            {module.prev ? (
              <Link
                href={`/${locale}/modulo/${module.prev}`}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors no-underline group"
                id="module-prev"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>
                  <span className="block text-xs text-white/25 mb-0.5">Anterior</span>
                  {moduleEmojis[module.prev]} {titles[parseInt(module.prev, 10) - 1]}
                </span>
              </Link>
            ) : <div />}

            {module.next ? (
              <Link
                href={`/${locale}/modulo/${module.next}`}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors no-underline group text-right"
                id="module-next"
              >
                <span>
                  <span className="block text-xs text-white/25 mb-0.5">Siguiente</span>
                  {moduleEmojis[module.next]} {titles[parseInt(module.next, 10) - 1]}
                </span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 text-sm text-coral hover:opacity-80 transition-opacity no-underline"
                id="module-finish"
              >
                <span>🎉 Guía completada</span>
                <Home size={16} />
              </Link>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
