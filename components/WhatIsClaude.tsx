"use client";
import { useTranslations } from "next-intl";
import { Brain, Link2, Shield } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { Brain, Link2, Shield };

export default function WhatIsClaude() {
  const t = useTranslations("what");
  const pillars = t.raw("pillars") as { icon: string; title: string; desc: string }[];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden" id="what-is-claude">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="section relative z-10">
        {/* Badge + headline */}
        <div className="text-center mb-20">
          <span className="badge mb-6 inline-flex">{t("badge")}</span>
          <h2 className="headline-l text-white mb-6">
            {t("headline")}
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("sub")}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] ?? Brain;
            const colors = [
              { border: "rgba(255,107,53,0.25)", glow: "rgba(255,107,53,0.1)", accent: "#ff6b35" },
              { border: "rgba(0,212,170,0.25)", glow: "rgba(0,212,170,0.1)", accent: "#00d4aa" },
              { border: "rgba(124,92,191,0.25)", glow: "rgba(124,92,191,0.1)", accent: "#7c5cbf" },
            ];
            const c = colors[i % colors.length];

            return (
              <div
                key={pillar.title}
                className="glass-card p-8 flex flex-col gap-5 group"
                style={{ borderColor: c.border }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: c.glow, color: c.accent }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold font-display text-white mb-2"
                    style={{ color: c.accent }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
