/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Lock } from 'lucide-react';
import { UserProfile } from '../types';

const MODS = [
  { 
    id: 'core', 
    ico: '🍵', 
    name: 'Mi Protocolo 21 Días', 
    desc: 'Tu plan completo personalizado', 
    link: '#',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'vitalicio', 
    ico: '🔑', 
    name: 'Acceso Vitalicio', 
    desc: 'Semanas 4-6 y actualizaciones permanentes.', 
    link: 'https://pay.hotmart.com/K104977165V',
    img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'sopas', 
    ico: '🥣', 
    name: 'Sopa Termogénica', 
    desc: 'Complemento termogénico natural', 
    link: 'https://pay.hotmart.com/E104977226Q',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'
  },
  { 
    id: 'ayuno', 
    ico: '⏱️', 
    name: 'Ayuno Inteligente', 
    desc: 'Protocolo de ayuno acelerador', 
    link: '#',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    proximamente: true
  },
  { 
    id: 'firmeza', 
    ico: '💪', 
    name: 'Protocolo Firmeza Total', 
    desc: 'Tonificación avanzada', 
    link: '#',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    proximamente: true
  },
];

interface ModulesProps {
  user: UserProfile;
  onOpenRecipes: (tab?: 'blends' | 'sopas') => void;
}

export const Modules: React.FC<ModulesProps> = ({ user, onOpenRecipes }) => {
  const userMods = user.modulos || ['core'];

  const handleModuleClick = (m: typeof MODS[0]) => {
    if (m.proximamente) {
      alert('¡Muy pronto disponible! Estamos preparando algo increíble.');
      return;
    }

    const has = userMods.includes(m.id);
    if (m.id === 'core' && has) {
      onOpenRecipes('blends');
      return;
    }

    if (m.id === 'sopas' && has) {
      onOpenRecipes('sopas');
      return;
    }

    if (!has) {
      window.open(m.link, '_blank');
      return;
    }

    // For other unlocked modules
    onOpenRecipes('blends');
  };

  return (
    <div className="bg-[#F7FAF5] p-6 pb-24">
      <h2 className="font-serif text-3xl font-bold text-[#1D4A1A] mb-6">Mis Módulos</h2>

      <div className="space-y-6">
        {MODS.map((m) => {
          const has = userMods.includes(m.id);
          const isProximamente = m.proximamente;
          
          return (
            <motion.div
              key={m.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModuleClick(m)}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5 border border-[#E8EDE7] group cursor-pointer ${isProximamente ? 'opacity-70 grayscale bg-gray-100' : ''}`}
            >
              <div className="relative h-32 w-full">
                <img 
                  src={m.img} 
                  alt={m.name} 
                  className={`w-full h-full object-cover ${!has && !isProximamente ? 'grayscale opacity-50' : ''}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {isProximamente && (
                  <div className="absolute top-3 right-4 bg-[#E8A020] text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Próximamente
                  </div>
                )}

                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-2xl">{m.ico}</span>
                  <h3 className="text-white font-bold text-lg leading-tight">{m.name}</h3>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[11px] text-[#4A6741] font-medium leading-relaxed">{m.desc}</p>
                </div>
                
                {isProximamente ? (
                  <div className="text-[#E8A020] text-[10px] font-bold uppercase tracking-widest">
                    Próximamente
                  </div>
                ) : has ? (
                  <button className="bg-[#2E7D32] text-white text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg shadow-[#2E7D32]/20 flex items-center gap-1 transition-colors hover:bg-[#244d21]">
                    Acceder <ChevronRight className="w-3 h-3" />
                  </button>
                ) : (
                  <div className="bg-gradient-to-r from-[#E8A020] to-[#C9953A] text-white text-[11px] font-bold px-5 py-2.5 rounded-full shadow-lg shadow-[#E8A020]/20 flex items-center gap-1 transition-all hover:scale-[1.02] active:scale-95">
                    Desbloquear <Lock className="w-3 h-3" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
