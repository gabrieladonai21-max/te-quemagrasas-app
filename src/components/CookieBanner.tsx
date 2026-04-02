import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CookieBannerProps {
  onAccept: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookiesAccepted');
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    const acceptData = {
      cookiesAccepted: true,
      date: new Date().toISOString()
    };
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesAcceptedData', JSON.stringify(acceptData));
    setIsVisible(false);
    onAccept();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[10000] backdrop-blur-sm"
          />
          
          {/* Banner */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white z-[10001] rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] border-t-2 border-[#E8A020] overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#1D4A1A]">
                  Privacidad y Cookies 🍪
                </h3>
                <p className="text-sm text-[#1D4A1A]/70 leading-relaxed text-justify">
                  Usamos cookies para mejorar tu experiencia y recordar tus preferencias. Tus datos son tratados con confidencialidad y nunca compartidos sin tu consentimiento, conforme a las leyes de protección de datos de tu país.
                </p>
              </div>

              <button
                onClick={() => window.open('/?screen=faq', '_blank')}
                className="text-[#1D4A1A] text-xs font-bold underline hover:opacity-70 transition-opacity block"
              >
                Ver política completa →
              </button>

              <button
                onClick={handleAccept}
                className="w-full py-4 bg-[#1D4A1A] text-white font-bold rounded-2xl shadow-xl shadow-[#1D4A1A]/10 hover:bg-[#244d21] active:scale-[0.98] transition-all"
              >
                Aceitar y continuar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
