"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function FooterSection() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const links = t.raw("links") as { label: string; href: string }[];

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] py-16">
      <div className="section text-center">
        {/* Brand */}
        <div
          className="brand font-display text-2xl font-bold mb-4"
          dangerouslySetInnerHTML={{
            __html: `Claude<span style="color:var(--coral)">4</span>Dummies`,
          }}
        />
        <p className="text-white/30 text-sm mb-2">{t("tagline")}</p>
        <p className="text-white/20 text-xs mb-3">{t("sub")}</p>
        <p className="text-white/40 text-sm mb-10">
          Creado por <a href="https://www.linkedin.com/in/matias-troitino/" target="_blank" rel="noopener noreferrer" className="text-coral hover:underline">Matías Troitiño</a>
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/35 hover:text-coral transition-colors"
            >
              {link.label}
              <ExternalLink size={10} />
            </a>
          ))}
        </div>

        {/* All modules */}
        <div className="flex flex-wrap justify-center gap-4">
          {["01", "02", "03", "04", "05", "06", "07"].map((n) => (
            <Link
              key={n}
              href={`/${locale}/modulo/${n}`}
              className="text-xs text-white/25 hover:text-white/60 transition-colors no-underline"
            >
              Módulo {n}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
