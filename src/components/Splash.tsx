import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { LOGOS } from '../imageAssets';

interface SplashProps {
  onComplete: () => void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 segundos
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#1D4A1A] to-[#2E7D32] overflow-hidden">
      {/* Círculos de Brilho de Fundo */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Pulsando com Glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            opacity: 1
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Efeito de Glow atrás do logo */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 rounded-full blur-2xl"
          />
          
          <img 
            src={LOGOS.vertical} 
            alt="Logo" 
            className="w-32 h-32 object-contain relative z-10 drop-shadow-2xl"
          />
        </motion.div>

        {/* Tagline Animada */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-serif text-3xl font-bold text-white mb-2 tracking-tight">
            Té Quemagrasas
          </h1>
          <p className="text-[#A8D5B5] text-sm font-medium tracking-[0.2em] uppercase">
            Cargando tu protocolo...
          </p>
        </motion.div>

        {/* Barra de Carregamento */}
        <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#E8A020] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
