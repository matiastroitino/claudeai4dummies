"use client";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (y / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLocale = () => {
    const next = locale === "es" ? "en" : "es";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: locale === "es" ? "Fundamentos" : "Basics", id: "module-01" },
    { label: "Chat", id: "module-02" },
    { label: "Cowork", id: "module-03" },
    { label: "Claude Code", id: "module-04" },
    { label: "Skills & MCP", id: "module-05" },
  ];

  return (
    <>
      {/* Progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(8,8,14,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Brand */}
          <Link
            href={`/${locale}`}
            className="font-display text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity no-underline flex items-center gap-2"
            id="nav-brand"
          >
            <Logo className="w-8 h-8 rounded-full shadow-[0_0_15px_rgba(255,107,53,0.3)]" />
            labrújuladeclaude
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-semibold text-white hover:opacity-80 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              id="lang-toggle"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-coral transition-colors border border-[rgba(255,255,255,0.1)] hover:border-coral/40 rounded-lg px-3 py-1.5"
              aria-label="Switch language"
            >
              🌐 {t("lang")}
            </button>
            <button
              onClick={() => scrollTo("modules")}
              className="btn-glow text-sm px-4 py-2 hidden sm:block"
              id="nav-cta"
            >
              {t("cta")}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
              aria-label="Menu"
              id="mobile-menu-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-[rgba(255,255,255,0.06)] bg-[rgba(8,8,14,0.95)] backdrop-blur-xl px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-sm font-semibold text-white hover:opacity-80 py-2 px-3 rounded-lg hover:bg-white/5 transition-all"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-[rgba(255,255,255,0.06)] mt-2">
              <button onClick={toggleLocale} className="text-xs text-white/40 hover:text-coral transition-colors">
                🌐 {t("lang")}
              </button>
              <button onClick={() => scrollTo("modules")} className="btn-glow text-sm px-4 py-2">
                {t("cta")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
