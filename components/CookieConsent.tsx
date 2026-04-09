"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function CookieConsent() {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Verificar si ya hay preferencia guardada de forma segura (sólo en el cliente)
    try {
      const saved = localStorage.getItem("cookieConsent");
      if (saved === "true") {
        setConsentGiven(true);
      } else if (saved === "false") {
        setConsentGiven(false);
      } else {
        setShowPopup(true);
      }
    } catch (e) {
      // Por si localStorage está bloqueado
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookieConsent", "true");
    } catch (e) {}
    setConsentGiven(true);
    setShowPopup(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("cookieConsent", "false");
    } catch (e) {}
    setConsentGiven(false);
    setShowPopup(false);
  };

  return (
    <>
      {/* Carga del GA4 Condicional */}
      {consentGiven && <GoogleAnalytics gaId="G-W2YBH4R95W" />}

      {/* Popup de Cookies con animación y estilo Emil Design */}
      {showPopup && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-safety flex justify-center pointer-events-none">
          <div 
            className="pointer-events-auto bg-void/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl max-w-4xl w-full shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 opacity-0 animate-[fade-in-up_0.5s_ease-out_forwards]"
            style={{
              animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <style jsx>{`
              @keyframes slideUpFade {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
                <span>🍪</span> Preferencias de Privacidad
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                Utilizamos cookies de Google Analytics exclusivamente para medir
                el uso del sitio y mejorar el contenido. No vendemos tus datos. Según la normativa legal, 
                necesitamos tu consentimiento explícito antes de activarlos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button 
                onClick={handleDecline}
                className="px-6 py-3 rounded-xl border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/5 transition-all duration-200 active:scale-95 w-full sm:w-auto"
              >
                Sólo necesarias
              </button>
              <button 
                onClick={handleAccept}
                className="px-6 py-3 rounded-xl bg-white text-void text-sm font-semibold hover:bg-gray-200 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 w-full sm:w-auto"
              >
                Aceptar Analíticas
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
