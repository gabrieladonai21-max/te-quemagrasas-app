/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { METABOLIC_TYPES, LEVEL_NAMES } from '../constants';
import { MetabolicType } from '../types';
import { Trophy, Star, ArrowRight, Award, CheckCircle2, X } from 'lucide-react';

interface CelebrationProps {
  isOpen: boolean;
  sem: number;
  tipo: MetabolicType;
  onClose: () => void;
}

export const Celebration: React.FC<CelebrationProps> = ({ isOpen, sem, tipo, onClose }) => {
  const info = METABOLIC_TYPES[tipo];
  const levelName = LEVEL_NAMES[tipo][sem - 1];

  useEffect(() => {
    if (isOpen) {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 200, colors: ['#4A8C35', '#E8A020', '#FFFFFF'] };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 80 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const achievements = {
    A: [
      'Activaste las enzimas de oxidación de grasa con EGCG',
      'Estabilizaste tu glucosa postprandial con canela Ceylon',
      'Reduciste el antojo de dulce a media tarde',
      'Iniciaste el proceso de sensibilidad insulínica'
    ],
  }[tipo] || [
    'Completaste el protocolo diario con éxito',
    'Mejoraste tu hidratación metabólica',
    'Regulaste tus ritmos circadianos',
    'Fortaleciste tu hábito de autocuidado'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed-element inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl" 
            onClick={onClose} 
          />
          
          {/* Content */}
          <motion.div 
            initial={{ scale: 0.8, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative w-full max-w-md bg-brand-bg rounded-[48px] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/10"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-[110] w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Phase 1: Emblem (Scale + Shine) */}
            <div 
              className="p-12 text-center text-white relative overflow-hidden"
              style={{ background: info.colors.gradient }}
            >
              {/* Shine effect */}
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-0"
              />

              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring', 
                  damping: 12, 
                  stiffness: 150,
                  delay: 0.2 
                }}
                className="w-32 h-32 relative z-10 mx-auto mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                dangerouslySetInnerHTML={{ __html: info.emblem }}
              />
              
              {/* Phase 2: Title (Fade Up) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-serif text-4xl font-bold mb-3 leading-tight">
                  ¡{levelName} completado!
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/20 backdrop-blur-md rounded-full">
                  <Star className="w-3 h-3 fill-white" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90">
                    Semana {sem} de 21 días
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Body */}
            <div className="p-10">
              <div className="mb-10">
                <h3 className="text-[10px] font-black text-brand-dark/40 uppercase tracking-[0.3em] mb-8 text-center">
                  Tus Logros de la Semana
                </h3>
                <div className="space-y-5">
                  {achievements.map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-brand-dark/5"
                    >
                      <div className="w-6 h-6 bg-brand-leaf rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-brand-leaf/20">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-[15px] text-brand-dark leading-snug font-medium">
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Phase 3: Button (Bounce) */}
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  delay: 1.4,
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}
                onClick={onClose}
                className="w-full py-6 rounded-[24px] font-black text-white shadow-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest text-sm"
                style={{ background: info.colors.gradient }}
              >
                Continuar al siguiente nivel
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
