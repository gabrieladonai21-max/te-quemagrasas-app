/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  ChevronRight, 
  Star, 
  ArrowRight,
  ShoppingBag,
  Info,
  Award,
  Zap,
  Gift,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types';
import { METABOLIC_TYPES, LEVEL_NAMES, FRASES, DNAMES, SPANISH_STRINGS, NIVELES } from '../constants';
import { getMetabolicIcon, getLevelMedal } from '../imageAssets';
import { ModuleCard } from './ModuleCard';

interface DashboardProps {
  user: UserProfile;
  onOpenDay: (sem: number, dia: number) => void;
  onOpenProfile: () => void;
  onOpenShoppingList: () => void;
  onOpenModule: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onOpenDay, 
  onOpenProfile, 
  onOpenShoppingList,
  onOpenModule
}) => {
  const tipo = user.metabolicType || 'A';
  const info = METABOLIC_TYPES[tipo];
  const completedDays = user.completedDays || [];
  const totalCompleted = completedDays.length;
  
  const [showLevelInfo, setShowLevelInfo] = useState(false);

  // Calculate current week and day
  const getDayInfo = () => {
    for (let s = 1; s <= 3; s++) {
      for (let d = 1; d <= 7; d++) {
        const key = `S${s}D${d}`;
        if (!completedDays.includes(key)) {
          return { s, d };
        }
      }
    }
    return { s: 3, d: 7 };
  };

  const { s, d } = getDayInfo();
  const globalDay = (s - 1) * 7 + d;
  const progress = Math.round((totalCompleted / 21) * 100);
  const levelName = LEVEL_NAMES[tipo]?.[s - 1] || `Nivel ${s}`;
  const frase = FRASES[new Date().getDay() % FRASES.length];

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="pb-24 bg-[#F5EDD8]/30">
      <div className="max-w-md mx-auto px-6 pt-6 space-y-6">
        {/* Dynamic Metabolic Dashboard (Split Cards) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Card 1: Identity */}
          <motion.div
            onClick={onOpenProfile}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-2xl p-4 cursor-pointer shadow-lg"
            style={{ background: info.colors.gradient }}
          >
            <div className="relative z-10 flex items-center gap-3">
              {/* ÍCONE À ESQUERDA */}
              <div className="w-12 h-12 flex-shrink-0 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <img 
                  src={getMetabolicIcon(tipo)}
                  alt={`Tipo ${tipo}`}
                  className="w-8 h-8 object-contain"
                />
              </div>
              
              {/* TEXTOS À DIREITA */}
              <div className="flex-1">
                <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest block mb-1">
                  TIPO {tipo}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  {info.name.split('·')[1]?.trim() || info.name}
                </h3>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Card 2: Progress */}
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-2xl p-4 shadow-lg bg-gradient-to-br from-[#2E7D32] to-[#4A8C35]"
          >
            <div className="relative z-10 flex items-center gap-3">
              {/* EMBLEMA À ESQUERDA */}
              <div className="w-12 h-12 flex-shrink-0">
                <img 
                  src={getLevelMedal(s)}
                  alt={`Nível ${s}`}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              
              {/* TEXTOS À DIREITA */}
              <div className="flex-1">
                <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest block mb-1">
                  NIVEL {s}
                </span>
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  {NIVELES[s - 1]?.name || 'Despertar'}
                </h3>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* Welcome Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-[32px] overflow-hidden aspect-[16/9] shadow-xl group"
        >
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
            alt="Lifestyle"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D4A1A] via-[#1D4A1A]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#E8A020] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Día {globalDay}
              </span>
              <span className="text-white/60 text-xs font-medium">de 21 días</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white leading-tight">
              Tu cuerpo está listo para el cambio
            </h2>
          </div>
        </motion.div>

        {/* Progress Section (Gamified) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif text-xl font-bold text-[#1D4A1A]">Tu Jornada</h3>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-xs cursor-not-allowed">
              <Lock className="w-3 h-3" />
              <span>Lista de Compras</span>
              <span className="text-[8px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Próximamente</span>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#1D4A1A]/5 text-center">
            <div className="mb-6">
              <h4 className="font-serif text-[20px] font-bold text-[#1D4A1A] mb-1">{levelName}</h4>
              <p className="text-xs text-[#1D4A1A]/50 font-medium">Semana {s} de 3 · Día {d} de 7</p>
            </div>

            <div className="relative h-3 bg-[#F5EDD8] rounded-full overflow-hidden mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(d / 7) * 100}%` }}
                className="absolute inset-0 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50]"
              />
            </div>

            <div className="flex justify-between px-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                const isCompleted = completedDays.includes(`S${s}D${day}`);
                const isCurrent = day === d;
                return (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div 
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-[#2E7D32] scale-110' : isCurrent ? 'bg-[#E8A020] animate-pulse' : 'bg-[#1D4A1A]/10'
                      }`}
                    />
                    <span className={`text-[9px] font-black ${isCurrent ? 'text-[#E8A020]' : 'text-[#1D4A1A]/30'}`}>D{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Main Action Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenDay(s, d)}
          className="w-full relative bg-gradient-to-br from-[#1D4A1A] to-[#2E7D32] rounded-[32px] p-8 text-white text-left shadow-2xl shadow-[#1D4A1A]/30 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="text-8xl">🍵</span>
          </div>
          
          <div className="relative z-10">
            <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest mb-2 block">
              Nivel {s} — {levelName}
            </span>
            <h3 className="font-serif text-2xl font-bold leading-tight mb-1">
              {totalCompleted === 21 ? '¡Protocolo completado! 🏆' : `Día ${globalDay} — ${DNAMES[globalDay - 1] || 'Protocolo Activo'}`}
            </h3>
            <p className="text-sm opacity-85 mb-6">
              {totalCompleted === 21 ? 'Has completado todos los 21 días' : 'Toca para ver tus recetas personalizadas'}
            </p>
            
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm">
              Ver mi receta de hoy <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.button>

        {/* Potencia Tu Protocolo Carousel (Correction 6D) */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#1D4A1A]">Potencia tu Protocolo</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar">
            {/* 1. Acceso Vitalicio */}
            <div 
              className="flex-shrink-0 w-[88%] h-[160px] bg-[#2E7D32] rounded-2xl p-6 text-white relative overflow-hidden snap-center shadow-lg"
            >
              <div className="absolute inset-0 opacity-40 bg-[url('https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-verde-iniciador.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg leading-tight">Acceso Vitalicio</h4>
                  <p className="text-[10px] opacity-80">Semanas 4-6 y actualizaciones permanentes.</p>
                </div>
                <a 
                  href="https://pay.hotmart.com/K104977165V"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#E8A020] to-[#C9953A] text-white px-4 py-2 rounded-xl text-xs font-bold w-fit shadow-md"
                >
                  Desbloquear
                </a>
              </div>
            </div>

            {/* 2. Sopas Termogénicas */}
            <div 
              onClick={() => {
                if (user.modulos.includes('sopas')) {
                  onOpenModule('sopas');
                } else {
                  window.open('https://pay.hotmart.com/E104977226Q', '_blank');
                }
              }}
              className="flex-shrink-0 w-[88%] h-[160px] bg-[#2E7D32] rounded-2xl p-6 text-white relative overflow-hidden snap-center shadow-lg cursor-pointer"
            >
              <div className="absolute inset-0 opacity-40 bg-[url('https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/blend-metabolico-premium.jpg')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg leading-tight">Sopas Termogénicas</h4>
                  <p className="text-[10px] opacity-80">7 recetas exclusivas para acelerar tu metabolismo.</p>
                </div>
                <div className="bg-gradient-to-r from-[#E8A020] to-[#C9953A] text-white px-4 py-2 rounded-xl text-xs font-bold w-fit shadow-md">
                  {user.modulos.includes('sopas') ? 'Ver Recetas' : 'Desbloquear'}
                </div>
              </div>
            </div>

            {/* 3. Ayuno Inteligente */}
            <div 
              onClick={() => showToast('Muy pronto 🌿')}
              className="flex-shrink-0 w-[88%] h-[160px] bg-[#2E7D32] rounded-2xl p-6 text-white relative overflow-hidden snap-center shadow-lg opacity-70 cursor-pointer"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400')] bg-cover" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg leading-tight">Ayuno Inteligente</h4>
                  <p className="text-[10px] opacity-80">Potencia tu quema de grasa con ayuno estratégico.</p>
                </div>
                <div className="bg-gray-400/50 text-white px-4 py-2 rounded-xl text-xs font-bold w-fit">
                  Próximamente
                </div>
              </div>
            </div>

            {/* 4. Protocolo Firmeza Total */}
            <div 
              onClick={() => showToast('Muy pronto 🌿')}
              className="flex-shrink-0 w-[88%] h-[160px] bg-[#2E7D32] rounded-2xl p-6 text-white relative overflow-hidden snap-center shadow-lg opacity-70 cursor-pointer"
            >
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=400')] bg-cover" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg leading-tight">Protocolo Firmeza Total</h4>
                  <p className="text-[10px] opacity-80">Blends concentrados y shots para celulitis y flacidez.</p>
                </div>
                <div className="bg-gray-400/50 text-white px-4 py-2 rounded-xl text-xs font-bold w-fit">
                  Próximamente
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conquistas (Medalhas) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-serif text-xl font-bold text-[#1D4A1A]">Conquistas</h3>
            <span className="text-[10px] font-bold text-[#E8A020] bg-[#E8A020]/10 px-2 py-1 rounded-full uppercase tracking-widest">
              {totalCompleted}/21 Días
            </span>
          </div>
          
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-[#1D4A1A]/5">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((level) => {
                const isUnlocked = s >= level;
                const isUpsell = level > 3;
                
                return (
                  <div key={level} className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <img 
                        src={getLevelMedal(level)}
                        alt={`Nivel ${level}`}
                        className={`w-16 h-16 object-contain transition-all duration-500 ${
                          isUnlocked ? 'grayscale-0 opacity-100' : 'grayscale opacity-30'
                        } ${isUpsell && !isUnlocked ? 'blur-[2px]' : ''}`}
                      />
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/20 backdrop-blur-[1px] rounded-full p-1">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${isUnlocked ? 'text-[#1D4A1A]' : 'text-[#1D4A1A]/30'}`}>
                      Nivel {level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lista de Compras Button (Condicional - BLOQUEADA) */}
        {(d === 1 || totalCompleted === 0 || totalCompleted === 7 || totalCompleted === 14) && (
          <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-4 flex items-center justify-between opacity-70 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-gray-400">Lista de Compras</h4>
                  <span className="text-[8px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">Próximamente</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium">Disponible en futuras actualizaciones</p>
              </div>
            </div>
          </div>
        )}

        {/* Daily Quote */}
        <div className="bg-gradient-to-br from-[#1D4A1A]/5 to-[#E8A020]/5 border border-[#E8A020]/15 rounded-[32px] p-8 relative overflow-hidden">
          <blockquote className="font-serif italic text-lg text-[#1D4A1A] leading-relaxed relative z-10">
            {frase}
          </blockquote>
          <p className="text-[10px] text-[#1D4A1A]/40 mt-4 font-bold uppercase tracking-widest relative z-10">Reflexión del día 🌿</p>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed-element bottom-24 left-1/2 -translate-x-1/2 bg-[#1D4A1A] text-white px-6 py-3 rounded-full shadow-2xl z-[200] font-bold text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Info Modal */}
      <AnimatePresence>
        {showLevelInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1D4A1A]/80 backdrop-blur-sm"
              onClick={() => setShowLevelInfo(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#F5EDD8] rounded-[40px] p-8 shadow-2xl"
            >
              <div className="w-16 h-16 bg-[#2E6B20]/10 rounded-2xl flex items-center justify-center text-3xl mb-6">
                {s === 1 ? '🌱' : s === 2 ? '🔥' : '💎'}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1D4A1A] mb-4">
                {levelName}
              </h3>
              <div className="space-y-4 text-[#1D4A1A]/70 text-sm leading-relaxed mb-8">
                {s === 1 ? (
                  <p>En esta primera etapa, nos enfocamos en <strong>limpiar y preparar</strong> tu terreno biológico. Eliminamos la inflamación y despertamos tus sensores de quema de grasa.</p>
                ) : s === 2 ? (
                  <p>Ahora entramos en la fase de <strong>máxima oxidación</strong>. Tu cuerpo ya sabe usar la grasa como combustible y vamos a acelerar ese proceso con el protocolo específico.</p>
                ) : (
                  <p>La etapa final es de <strong>consolidación y brillo</strong>. Maximizamos tu energía, mejoramos la calidad de tu piel y sellamos los nuevos hábitos metabólicos.</p>
                )}
              </div>
              <button 
                onClick={() => setShowLevelInfo(false)}
                className="w-full bg-[#1D4A1A] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#1D4A1A]/20"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
