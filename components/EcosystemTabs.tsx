"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Check } from "lucide-react";

export default function EcosystemTabs() {
  const t = useTranslations("ecosystem");
  const locale = useLocale();
  const tabs = t.raw("tabs") as {
    id: string; label: string; emoji: string; tagline: string;
    analogy: string; description: string; ideal: string[];
    features: string[]; ctaLabel: string;
  }[];
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  const accentColors = ["#ff6b35", "#00d4aa", "#ffbe0b"];
  const accentDims = ["rgba(255,107,53,0.12)", "rgba(0,212,170,0.12)", "rgba(255,190,11,0.12)"];
  const accentBorders = ["rgba(255,107,53,0.3)", "rgba(0,212,170,0.3)", "rgba(255,190,11,0.3)"];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="ecosystem">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.03) 50%, transparent 100%)" }}
        aria-hidden="true"
      />
      <div className="section relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge mb-6 inline-flex">{t("badge")}</span>
          <h2 className="headline-l text-white mb-4">{t("headline")}</h2>
          <p className="text-white/50 max-w-xl mx-auto">{t("sub")}</p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl mx-auto" role="tablist">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              id={`tab-${tab.id}`}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl border text-sm font-semibold font-display transition-all duration-300 ${
                active === i
                  ? "text-white"
                  : "text-white/40 border-[rgba(255,255,255,0.08)] hover:text-white/70 hover:border-[rgba(255,255,255,0.15)]"
              }`}
              style={
                active === i
                  ? { background: accentDims[i], borderColor: accentBorders[i], color: accentColors[i] }
                  : {}
              }
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          key={tab.id}
          className="glass-card p-8 md:p-12 grid md:grid-cols-2 gap-12 items-start"
          style={{ borderColor: accentBorders[active] }}
        >
          {/* Left: description */}
          <div>
            <div
              className="text-5xl mb-6 w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: accentDims[active] }}
            >
              {tab.emoji}
            </div>
            <p
              className="label-upper mb-3"
              style={{ color: accentColors[active] }}
            >
              {tab.tagline}
            </p>
            <h3 className="headline-m text-white mb-4">
              {tab.analogy}
            </h3>
            <p className="text-white/55 leading-relaxed mb-8">{tab.description}</p>

            {/* Ideal for */}
            <div>
              <p className="text-xs text-white/30 mb-3 label-upper">Ideal para</p>
              <div className="flex flex-wrap gap-2">
                {tab.ideal.map((label) => (
                  <span
                    key={label}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium"
                    style={{
                      background: accentDims[active],
                      borderColor: accentBorders[active],
                      color: accentColors[active],
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: features + CTA */}
          <div>
            <p className="text-xs text-white/30 mb-5 label-upper">Lo que incluye</p>
            <ul className="space-y-4 mb-10">
              {tab.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: accentDims[active], color: accentColors[active] }}
                  >
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/${locale}/modulo/${String(active + 2).padStart(2, "0")}`}
              className="btn-glow inline-block text-sm no-underline"
              id={`tab-cta-${tab.id}`}
              style={{ background: `linear-gradient(135deg, ${accentColors[active]}, ${accentColors[active]}cc)` }}
            >
              {tab.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
