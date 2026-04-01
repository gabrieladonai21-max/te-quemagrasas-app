import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Play, 
  Square, 
  History, 
  Info, 
  ChevronLeft, 
  Flame, 
  Zap, 
  Coffee, 
  Droplets,
  CheckCircle2
} from 'lucide-react';
import { SPANISH_STRINGS } from '../constants';

interface FastingProps {
  onBack: () => void;
}

export const Fasting: React.FC<FastingProps> = ({ onBack }) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [history, setHistory] = useState<{ date: string; duration: string }[]>([]);

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    if (isActive) {
      const newEntry = {
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
        duration: formatTime(seconds)
      };
      setHistory(prev => [newEntry, ...prev].slice(0, 5));
      setSeconds(0);
    }
    setIsActive(!isActive);
  };

  const teaGuide = [
    { name: 'Té Verde', icon: <Leaf className="w-4 h-4" />, desc: 'Acelera la quema de grasa sin romper el ayuno.' },
    { name: 'Té de Canela', icon: <Flame className="w-4 h-4" />, desc: 'Estabiliza la glucosa y reduce el hambre.' },
    { name: 'Té de Hibisco', icon: <Droplets className="w-4 h-4" />, desc: 'Drenaje linfático y control de retención.' },
    { name: 'Agua con Limón', icon: <Zap className="w-4 h-4" />, desc: 'Alcaliniza y despierta el metabolismo.' }
  ];

  return (
    <div className="min-h-screen bg-[#F7FAF5] pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-6 flex items-center justify-between border-b border-[#1D4A1A]/5 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#F7FAF5] flex items-center justify-center text-[#1D4A1A]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-serif text-xl font-bold text-[#1D4A1A]">{SPANISH_STRINGS.ayuno}</h2>
        <div className="w-10" />
      </div>

      <div className="max-w-md mx-auto px-6 pt-8 space-y-8">
        {/* Timer Section */}
        <div className="bg-white rounded-[48px] p-10 text-center shadow-xl shadow-black/5 border border-[#1D4A1A]/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E7D32] to-[#E8A020]" />
          
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#F7FAF5"
                strokeWidth="12"
                fill="transparent"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke="#2E7D32"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="754"
                animate={{ strokeDashoffset: isActive ? 754 - (seconds % 3600 / 3600) * 754 : 754 }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Clock className="w-8 h-8 text-[#2E7D32] mb-2" />
              <span className="text-4xl font-mono font-bold text-[#1D4A1A]">
                {formatTime(seconds)}
              </span>
              <span className="text-[10px] font-bold text-[#4A6741] uppercase tracking-[0.2em] mt-2">
                {isActive ? 'Ayuno en curso' : 'Listo para iniciar'}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggle}
            className={`w-full py-5 rounded-3xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${
              isActive ? 'bg-[#FF5252] text-white' : 'bg-[#2E7D32] text-white'
            }`}
          >
            {isActive ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
            {isActive ? 'Finalizar Ayuno' : 'Iniciar Ayuno'}
          </button>
        </div>

        {/* Tea Guide Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#1D4A1A]">Tés Permitidos</h3>
            <span className="text-[10px] font-bold text-[#E8A020] uppercase tracking-wider">Sin Calorías</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {teaGuide.map((tea, i) => (
              <div key={i} className="bg-white p-5 rounded-[32px] border border-[#1D4A1A]/5 flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 bg-[#F7FAF5] rounded-2xl flex items-center justify-center text-[#2E7D32] shadow-inner">
                  {tea.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#1D4A1A]">{tea.name}</h4>
                  <p className="text-[11px] text-[#4A6741] leading-tight mt-1">{tea.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#1D4A1A]" />
            <h3 className="font-serif text-xl font-bold text-[#1D4A1A]">Historial Reciente</h3>
          </div>
          <div className="bg-white rounded-[32px] overflow-hidden border border-[#1D4A1A]/5 shadow-sm">
            {history.length > 0 ? (
              history.map((entry, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between border-b border-[#1D4A1A]/5 last:border-0">
                  <span className="text-sm font-bold text-[#1D4A1A]">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#4A6741]">{entry.duration}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#4A6741]/40 text-sm italic">
                Aún no hay registros de ayuno.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

function Leaf(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C10.26 14.33 11.73 13.61 14 12" />
    </svg>
  );
}
