"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const levelClass: Record<string, string> = {
  Básico: "level-basic",
  Intermedio: "level-intermediate",
  Avanzado: "level-advanced",
  Todos: "level-all",
  Basic: "level-basic",
  Intermediate: "level-intermediate",
  Advanced: "level-advanced",
  Everyone: "level-all",
};

export default function ModuleGrid() {
  const t = useTranslations("modules");
  const locale = useLocale();
  const items = t.raw("items") as {
    number: string; emoji: string; title: string;
    desc: string; time: string; level: string;
  }[];

  return (
    <section className="relative py-10 md:py-16" id="modules">
      <div className="section">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge mb-6 inline-flex">{t("badge")}</span>
          <h2 className="headline-l text-white mb-4">{t("headline")}</h2>
          <p className="text-white/50 max-w-xl mx-auto">{t("sub")}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <Link
              key={item.number}
              href={`/${locale}/modulo/${item.number}`}
              id={`module-${item.number}`}
              className={`glass-card p-6 flex flex-col gap-4 group no-underline cursor-pointer relative overflow-hidden animate-enter stagger-${(i % 7) + 1}`}
            >
              {/* Number watermark */}
              <span
                className="absolute -top-3 -right-2 text-7xl font-black font-display opacity-[0.04] leading-none select-none"
                aria-hidden="true"
              >
                {item.number}
              </span>

              {/* Emoji */}
              <div className="text-3xl">{item.emoji}</div>

              {/* Title */}
              <div>
                <h3 className="text-base font-semibold font-display text-white group-hover:text-coral transition-colors leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </div>

              {/* Footer meta */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-1.5 text-white/30">
                  <Clock size={11} />
                  <span className="text-xs">{item.time}</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${levelClass[item.level] ?? "level-all"}`}
                >
                  {item.level}
                </span>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity text-coral">
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
