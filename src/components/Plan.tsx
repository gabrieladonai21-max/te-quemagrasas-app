/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Lock, Target, X, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';
import { METABOLIC_TYPES, NIVELES, DNAMES, WEEK_INTRODUCTIONS } from '../constants';
import { getLevelMedal } from '../imageAssets';
import { DayView } from './DayView';

interface PlanProps {
  user: UserProfile;
  onOpenDay: (sem: number, dia: number) => void;
}

export const Plan: React.FC<PlanProps> = ({ user, onOpenDay }) => {
  const [selectedDay, setSelectedDay] = useState<{ s: number; d: number } | null>(null);
  const [showLifetimeModal, setShowLifetimeModal] = useState(false);
  const tipo = user.metabolicType || 'A';
  const info = METABOLIC_TYPES[tipo];
  const weekIntros = WEEK_INTRODUCTIONS[tipo];
  const completedDays = user.completedDays || [];
  const hasLifetime = user.modulos?.includes('vitalicio');

  // Daily Release Logic
  const daysSinceCreation = Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24));
  const maxAllowedDayIndex = daysSinceCreation + 1;

  const isDayUnlocked = (s: number, d: number) => {
    const index = (s - 1) * 7 + d;
    
    // 1. Must be within the daily release limit
    if (index > maxAllowedDayIndex) return false;

    // 2. First day is always unlocked (if within daily limit)
    if (index === 1) return true;

    // 3. Previous day must be completed
    const prevS = d === 1 ? s - 1 : s;
    const prevD = d === 1 ? 7 : d - 1;
    return completedDays.includes(`S${prevS}D${prevD}`);
  };
  
  const isSemOk = (s: number) => {
    if (s === 1) return true;
    const prevSem = s - 1;
    return Array.from({ length: 7 }, (_, i) => `S${prevSem}D${i + 1}`).every(d => completedDays.includes(d));
  };

  const week3Done = Array.from({ length: 7 }, (_, i) => `S3D${i + 1}`).every(d => completedDays.includes(d));

  const getDayInfo = () => {
    for (let s = 1; s <= 6; s++) {
      for (let d = 1; d <= 7; d++) {
        const key = `S${s}D${d}`;
        if (!completedDays.includes(key)) {
          return { s, d };
        }
      }
    }
    return { s: 6, d: 7 };
  };

  const { s: currentSem, d: currentDia } = getDayInfo();

  return (
    <div className="flex-1 flex flex-col bg-[#F7FAF5] p-6 pb-24">
      <h2 className="font-serif text-3xl font-bold text-[#1D4A1A] mb-6">Mi Protocolo</h2>

      <div className="space-y-8">
        {[1, 2, 3, 4, 5, 6].map((sem) => {
          const ok = isSemOk(sem);
          const isVitalicioWeek = sem > 3;
          const lockedByLifetime = isVitalicioWeek && !hasLifetime;
          const lockedByProgress = isVitalicioWeek && hasLifetime && !week3Done;
          
          const nivel = NIVELES[sem - 1];
          const intro = weekIntros[sem];
          const completedInSem = Array.from({ length: 7 }, (_, i) => `S${sem}D${i + 1}`).filter(d => completedDays.includes(d)).length;
          const pct = Math.round((completedInSem / 7) * 100);

          return (
            <div key={sem} className="space-y-4">
              {/* Weekly Intro Card */}
              {ok && !lockedByLifetime && !lockedByProgress && intro && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => sem === currentSem && setSelectedDay({ s: currentSem, d: currentDia })}
                  className={`bg-[#1a3d18] rounded-3xl p-6 text-white shadow-xl shadow-[#1a3d18]/20 relative overflow-hidden ${sem === currentSem ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
                >
                  {/* Background Level Icon */}
                  <img 
                    src={getLevelMedal(sem)} 
                    alt="" 
                    className="absolute -right-4 -top-4 w-32 h-32 opacity-10 rotate-12 pointer-events-none"
                  />

                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <span className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] block">
                      Introducción Semanal
                    </span>
                    {sem === currentSem && (
                      <span className="bg-[#E8A020] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        Protocolo Activo
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <img src={getLevelMedal(sem)} alt="" className="w-12 h-12 object-contain drop-shadow-lg" />
                    <h3 className="font-serif text-2xl font-bold leading-tight">
                      {intro.name}
                    </h3>
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed mb-6 font-sans relative z-10">
                    {intro.description}
                  </p>
                  
                  <div className="bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 bg-[#E8A020] rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#E8A020]/20">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest block">Meta de la semana</span>
                      <span className="text-sm font-bold">{intro.goal}</span>
                    </div>
                    {sem === currentSem && <ChevronRight className="w-5 h-5 opacity-40" />}
                  </div>
                </motion.div>
              )}

              {/* Days List Card */}
              <div 
                onClick={() => lockedByLifetime && setShowLifetimeModal(true)}
                className={`bg-white rounded-3xl shadow-xl shadow-black/5 overflow-hidden border border-[#E8EDE7] relative ${lockedByLifetime ? 'cursor-pointer' : ''}`}
              >
                {lockedByLifetime && (
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 bg-[#1D4A1A] rounded-full flex items-center justify-center mb-3 shadow-lg">
                      <Lock className="w-6 h-6 text-[#E8A020]" />
                    </div>
                    <h4 className="text-[#1D4A1A] font-bold text-sm mb-1">Plan Vitalicio Requerido</h4>
                    <p className="text-[10px] text-[#4A6741] font-medium">Toca para desbloquear las semanas 4, 5 y 6</p>
                  </div>
                )}

                <div className="p-5 flex items-center justify-between border-b border-[#E8EDE7]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center overflow-hidden">
                      <img src={getLevelMedal(sem)} alt="" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D4A1A]">Nivel {sem} — {nivel.name}</h3>
                      <p className="text-[10px] text-[#4A6741] font-medium uppercase tracking-wider">{nivel.days} · {info.sems[(sem - 1) % 3]}</p>
                    </div>
                  </div>
                  {completedInSem === 7 && <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />}
                  {(!ok || lockedByProgress) && <Lock className="w-5 h-5 text-[#8A9E87]" />}
                </div>

                {lockedByProgress && (
                  <div className="p-6 bg-gray-50 text-center">
                    <p className="text-[11px] text-[#4A6741] font-bold">
                      Plan Vitalicio comprado ✓<br/>
                      <span className="text-[10px] font-medium opacity-70">Disponible al completar Semana 3</span>
                    </p>
                  </div>
                )}

                {ok && !lockedByLifetime && !lockedByProgress ? (
                  <>
                    <div className="px-5 py-3 flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-[#E8EDE7] rounded-full overflow-hidden">
                        <div className="h-full bg-[#2E7D32] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#2E7D32]">{completedInSem}/7</span>
                    </div>
                    <div className="px-5 pb-4 space-y-2">
                      {Array.from({ length: 7 }, (_, i) => {
                        const d = i + 1;
                        const key = `S${sem}D${d}`;
                        const isDone = completedDays.includes(key);
                        const isUnlocked = isDayUnlocked(sem, d);
                        const isToday = currentSem === sem && currentDia === d && isUnlocked && !isDone;
                        const globalDay = (sem - 1) * 7 + d;

                        return (
                          <button
                            key={d}
                            disabled={!isUnlocked && !isDone}
                            onClick={() => setSelectedDay({ s: sem, d })}
                            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                              isToday 
                                ? 'bg-[#E8A020]/5 border-2 border-[#E8A020] relative overflow-hidden' 
                                : isDone 
                                ? 'bg-[#E8F5EE]' 
                                : isUnlocked
                                ? 'hover:bg-[#F7FAF5]'
                                : 'opacity-40 grayscale cursor-not-allowed'
                            }`}
                          >
                            {isToday && (
                              <motion.div
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-[#E8A020]"
                              />
                            )}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 relative z-10 ${
                              isDone 
                                ? 'bg-[#2E7D32] text-white' 
                                : isToday 
                                ? 'bg-[#E8A020] text-white' 
                                : isUnlocked
                                ? 'border-2 border-[#E8A020] text-[#E8A020]'
                                : 'border-2 border-[#E8EDE7] text-[#8A9E87]'
                            }`}>
                              {isDone ? '✓' : isUnlocked ? d : <Lock className="w-3 h-3" />}
                            </div>
                            <div className="flex-1 text-left relative z-10">
                              <div className={`text-sm font-bold ${isDone ? 'text-[#2E7D32]' : 'text-[#1A2E1A]'}`}>
                                {DNAMES[globalDay - 1] || 'Día ' + globalDay}
                              </div>
                              <div className="text-[10px] text-[#4A6741]">
                                {isDone ? 'Día completado ✓' : isUnlocked ? '2 blends + 1 bonus' : 'Bloqueado'}
                              </div>
                            </div>
                            {isToday ? (
                              <span className="relative z-10 text-[9px] font-black bg-[#E8A020] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Hoy
                              </span>
                            ) : isDone ? (
                              <span className="relative z-10 text-[9px] font-black text-[#2E7D32]/40 uppercase tracking-widest">
                                Ver
                              </span>
                            ) : !isUnlocked ? (
                              <Lock className="w-3 h-3 text-[#8A9E87] opacity-40" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : !lockedByLifetime && !lockedByProgress && (
                  <div className="p-8 text-center">
                    <Lock className="w-10 h-10 text-[#8A9E87] mx-auto mb-3 opacity-20" />
                    <p className="text-xs text-[#8A9E87] font-medium">Completa el Nivel {sem - 1} para desbloquear este nivel</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Week 3 Completion Prompt */}
      {week3Done && !hasLifetime && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-[#E8A020] p-6 rounded-[2.5rem] text-[#1D4A1A] text-center shadow-xl shadow-[#E8A020]/20"
        >
          <h3 className="font-serif text-xl font-bold mb-2">¡Completaste 21 días!</h3>
          <p className="text-sm font-medium mb-6 opacity-90">¿Quieres continuar tu transformación por 42 días y asegurar resultados permanentes?</p>
          <button 
            onClick={() => setShowLifetimeModal(true)}
            className="w-full py-4 bg-[#1D4A1A] text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-95"
          >
            Doblar mi transformación
          </button>
        </motion.div>
      )}

      {/* Lifetime Modal */}
      <AnimatePresence>
        {showLifetimeModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLifetimeModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[3rem] p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowLifetimeModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-[#E8A020] rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-[#E8A020]/20 transform rotate-6">
                  <Target className="w-10 h-10" />
                </div>
                
                <h3 className="font-serif text-2xl font-bold text-[#1D4A1A] mb-4">
                  Dobla tu transformación a 42 días
                </h3>
                
                <p className="text-[#4A6741] text-sm leading-relaxed mb-8 font-medium">
                  Desbloquea las semanas 4, 5 y 6 para consolidar tu nuevo metabolismo y evitar el efecto rebote para siempre.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => window.open('https://pay.hotmart.com/K104977165V', '_blank')}
                    className="w-full py-4 bg-gradient-to-r from-[#E8A020] to-[#C9953A] text-white font-bold rounded-2xl shadow-lg shadow-[#E8A020]/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Desbloquear Ahora
                  </button>
                  <p className="text-[10px] text-[#4A6741] font-bold opacity-50 uppercase tracking-widest">
                    Acceso Vitalicio • Pago Único
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDay && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDay(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#F7FAF5] rounded-t-[40px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <div className="overflow-y-auto">
                <DayView
                  s={selectedDay.s}
                  d={selectedDay.d}
                  user={user}
                  isCompleted={user.completedDays.includes(`S${selectedDay.s}D${selectedDay.d}`)}
                  onBack={() => setSelectedDay(null)}
                  onComplete={() => {
                    setSelectedDay(null);
                  }}
                  isModal
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
