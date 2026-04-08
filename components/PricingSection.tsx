"use client";
import { useTranslations } from "next-intl";
import { Check, Zap } from "lucide-react";

export default function PricingSection() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as {
    name: string; price: string; period: string;
    desc: string; features: string[]; cta: string; highlighted: boolean;
  }[];

  return (
    <section className="relative py-10 md:py-16 overflow-hidden" id="module-06">
      {/* bg glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,190,11,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="section relative z-10">
        <div className="text-center mb-16">
          <span className="badge mb-6 inline-flex">{t("badge")}</span>
          <h2 className="headline-l text-white mb-4">{t("headline")}</h2>
          <p className="text-white/50 max-w-xl mx-auto">{t("sub")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative glass-card p-8 flex flex-col gap-6 animate-enter stagger-${(i % 3) + 1} ${
                plan.highlighted
                  ? "border-coral/40 shadow-[0_0_40px_rgba(255,107,53,0.15)]"
                  : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-coral text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Zap size={10} /> Popular
                  </span>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-white/40 mb-1">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black font-display text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-white/50 text-sm mt-2">{plan.desc}</p>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        plan.highlighted
                          ? "bg-coral/20 text-coral"
                          : "bg-white/8 text-white/40"
                      }`}
                    >
                      <Check size={9} strokeWidth={3} />
                    </span>
                    <span className="text-white/65 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://claude.ai/pricing"
                target="_blank"
                rel="noopener noreferrer"
                id={`pricing-cta-${plan.name.toLowerCase()}`}
                className={`text-center py-3 px-6 rounded-xl text-sm font-semibold font-display transition-all block no-underline ${
                  plan.highlighted
                    ? "btn-glow"
                    : "border border-[rgba(255,255,255,0.12)] text-white/60 hover:text-white hover:border-white/25"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
