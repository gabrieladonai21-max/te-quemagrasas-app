/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LogOut, RefreshCcw, MessageCircle, ChevronRight, Shield, Bell, HelpCircle, User } from 'lucide-react';
import { UserProfile } from '../types';
import { METABOLIC_TYPES } from '../constants';
import { getMetabolicIcon } from '../imageAssets';

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
  onTryChangeType: () => void;
  onUpdateUser: (user: UserProfile) => void;
  onOpenFAQ: () => void;
  onOpenSupport: () => void;
  onOpenNotifications: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onLogout, onTryChangeType, onUpdateUser, onOpenFAQ, onOpenSupport, onOpenNotifications }) => {
  const [devClicks, setDevClicks] = React.useState(0);
  const [isDev, setIsDev] = React.useState(false);

  const tipo = user.metabolicType || 'A';
  const info = METABOLIC_TYPES[tipo];
  const totalCompleted = user.completedDays.length;
  const pct = Math.round((totalCompleted / 21) * 100);

  const userName = user.email.split('@')[0].split('.')[0];
  const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);

  const handleDevClick = () => {
    const newClicks = devClicks + 1;
    setDevClicks(newClicks);
    if (newClicks >= 5) {
      setIsDev(true);
    }
  };

  const toggleModule = (modId: string) => {
    const currentMods = user.modulos || ['core'];
    let newMods;
    if (currentMods.includes(modId)) {
      newMods = currentMods.filter(id => id !== modId);
    } else {
      newMods = [...currentMods, modId];
    }
    onUpdateUser({ ...user, modulos: newMods });
  };

  const ProfileItem = ({ icon: Icon, label, sub, onClick, color = 'primary' }: any) => (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full p-4 bg-white border border-[#E8EDE7] rounded-2xl flex items-center gap-4 group hover:border-primary/30 transition-all"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        color === 'red' ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 text-left">
        <h4 className={`text-sm font-bold ${color === 'red' ? 'text-red-600' : 'text-ink'}`}>{label}</h4>
        {sub && <p className="text-[10px] text-muted font-medium">{sub}</p>}
      </div>
      <ChevronRight className={`w-4 h-4 ${color === 'red' ? 'text-red-200' : 'text-muted'}`} />
    </motion.button>
  );

  return (
    <div className="bg-white pb-24 min-h-screen">
      <header className="p-8 pt-12 flex flex-col items-center text-center bg-[#1D4A1A] rounded-b-[48px] shadow-lg mb-8">
        <div className="relative mb-4">
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-black/20 relative z-10"
            style={{ background: info.colors.gradient }}
          >
            {capitalizedName.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full border-4 border-[#1D4A1A] flex items-center justify-center text-white shadow-lg">
            <Shield className="w-4 h-4" />
          </div>
        </div>
        
        <h2 className="font-serif text-2xl font-bold text-white">{capitalizedName}</h2>
        <p className="text-white/70 text-xs mt-1 font-medium">{user.email}</p>
        
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold mt-4 shadow-sm text-white">
          <img 
            src={getMetabolicIcon(tipo)}
            alt={info.name}
            className="w-4 h-4 object-contain brightness-0 invert"
          />
          <span className="uppercase tracking-widest">{info.name}</span>
        </div>
      </header>

      <div className="px-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Días', val: totalCompleted, sub: 'Logrados' },
            { label: 'Progreso', val: `${pct}%`, sub: 'Total' },
            { label: 'Racha', val: 0, sub: 'Actual' },
          ].map((stat, i) => (
            <div key={i} className="premium-card p-4 text-center">
              <span className="text-xl font-black text-accent block">{stat.val}</span>
              <p className="text-[8px] text-muted uppercase font-bold tracking-[0.1em] mt-1">{stat.label}</p>
              <p className="text-[8px] text-secondary font-medium">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Menu Sections */}
        <div className="space-y-6">
          <section>
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-3 px-2">Configuración</h4>
            <div className="space-y-3">
              <ProfileItem 
                icon={RefreshCcw} 
                label="Perfil Metabólico" 
                sub={user.metabolicTypeLocked ? "Tipo confirmado ✓" : "Reiniciar o cambiar tu tipo"}
                onClick={onTryChangeType}
              />
              {user.metabolicTypeLocked && (
                <p className="px-4 text-[9px] text-muted font-medium italic">
                  * Tu tipo metabólico ha sido confirmado y bloqueado para asegurar la efectividad del protocolo.
                </p>
              )}
              <ProfileItem 
                icon={Bell} 
                label="Notificaciones" 
                sub="Recordatorios de tus tés"
                onClick={onOpenNotifications}
              />
            </div>
          </section>

          <section>
            <h4 className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] mb-3 px-2">Ayuda y Soporte</h4>
            <div className="space-y-3">
              <ProfileItem 
                icon={HelpCircle} 
                label="Preguntas Frecuentes" 
                sub="Dudas comunes sobre el plan"
                onClick={onOpenFAQ}
              />
              <ProfileItem 
                icon={MessageCircle} 
                label="Soporte IA" 
                sub="Habla con nuestro asistente"
                onClick={onOpenSupport}
              />
            </div>
          </section>

          <section className="pt-2">
            <ProfileItem 
              icon={LogOut} 
              label="Cerrar Sesión" 
              color="red"
              onClick={onLogout}
            />
          </section>

          {isDev && (
            <section className="bg-yellow-50 p-4 rounded-2xl border border-yellow-200">
              <h4 className="text-[10px] font-bold text-yellow-700 uppercase tracking-[0.2em] mb-3">Modo Desarrollador</h4>
              <div className="grid grid-cols-2 gap-2">
                {['ayuno', 'firmeza', 'sopas', 'vitalicio'].map(mod => (
                  <button
                    key={mod}
                    onClick={() => toggleModule(mod)}
                    className={`text-[10px] font-bold p-2 rounded-xl border transition-all ${
                      user.modulos?.includes(mod)
                        ? 'bg-green-100 border-green-300 text-green-700'
                        : 'bg-white border-gray-200 text-gray-500'
                    }`}
                  >
                    {mod.toUpperCase()} {user.modulos?.includes(mod) ? '🔓' : '🔒'}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <p 
          onClick={handleDevClick}
          className="text-center text-[10px] text-muted font-medium py-4 cursor-pointer select-none"
        >
          Versión 2.1.0 Premium<br />
          © 2026 Té Quema Grasas
        </p>
      </div>
    </div>
  );
};
