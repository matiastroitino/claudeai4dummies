"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,107,53,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center overflow-hidden grid-bg"
      id="hero"
      aria-label="Hero section"
    >
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Orbs */}
      <div
        className="orb w-[600px] h-[600px] -top-40 -left-40"
        style={{ background: "radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="orb w-[400px] h-[400px] top-1/3 -right-20"
        style={{ background: "radial-gradient(circle, rgba(255,190,11,0.1) 0%, transparent 70%)", animationDelay: "3s" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="badge" id="hero-badge">
            <Sparkles size={12} />
            {t("badge")}
          </span>
        </div>

        {/* Headline */}
        <h1 className="display text-white mb-6" id="hero-headline">
          <span className="block">{t("headline1")}</span>
          <span className="block gradient-text">{t("headline2")}</span>
        </h1>

        {/* Sub */}
        <p
          className="text-white/55 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          id="hero-sub"
        >
          {t("sub")}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link
            href={`/${locale}/modulo/01`}
            className="btn-glow text-base px-8 py-4 inline-block no-underline"
            id="hero-cta-primary"
          >
            {t("cta_primary")} →
          </Link>
          <button
            onClick={() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline text-base px-8 py-4"
            id="hero-cta-secondary"
          >
            {t("cta_secondary")}
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 opacity-30">
          <span className="label-upper text-white/40">{t("scroll")}</span>
          <ArrowDown size={16} className="text-white/40 animate-bounce" />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--void), transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
