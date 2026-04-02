/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, RefreshCcw, MessageCircle, ChevronRight, Shield, Bell, HelpCircle, User, Pencil, Camera, X, Check } from 'lucide-react';
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
  const [showEditMenu, setShowEditMenu] = React.useState(false);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [newName, setNewName] = React.useState('');

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
            className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-black/20 relative z-10 overflow-hidden"
            style={{ background: info.colors.gradient }}
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <button 
            onClick={() => setShowEditMenu(true)}
            className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#E8A020] rounded-full border-4 border-[#1D4A1A] flex items-center justify-center text-white shadow-lg z-20 hover:scale-110 transition-transform"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
        
        <h2 className="font-serif text-2xl font-bold text-white">{user.name}</h2>
        <p className="text-white/70 text-xs mt-1 font-medium">{user.email}</p>
        
        <div 
          className="inline-flex items-center gap-2 backdrop-blur-md border px-4 py-1.5 rounded-full text-[10px] font-bold mt-4 shadow-sm text-white transition-all duration-500"
          style={{ 
            backgroundColor: `${info.colors.primary}4D`,
            borderColor: `${info.colors.primary}80`
          }}
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <img 
              src={getMetabolicIcon(tipo)}
              alt={info.name}
              className="w-3 h-3 object-contain brightness-0 invert"
            />
          </div>
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
              <span className="text-xl font-black text-[#E8A020] block">{stat.val}</span>
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
                label="Centro de Ayuda" 
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
      <AnimatePresence>
        {showEditMenu && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="w-full max-w-md bg-white rounded-t-[32px] p-8 pb-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-ink">Editar Perfil</h3>
                <button onClick={() => setShowEditMenu(false)} className="p-2 bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-muted" />
                </button>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setIsEditingName(true);
                    setNewName(user.name || capitalizedName);
                    setShowEditMenu(false);
                  }}
                  className="w-full p-4 bg-gray-50 rounded-2xl flex items-center gap-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-ink">Editar Nombre</span>
                </button>

                <button 
                  onClick={() => {
                    // Simular cambio de foto
                    const photos = [
                      'https://picsum.photos/seed/user1/200',
                      'https://picsum.photos/seed/user2/200',
                      'https://picsum.photos/seed/user3/200'
                    ];
                    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
                    onUpdateUser({ ...user, photoURL: randomPhoto });
                    setShowEditMenu(false);
                  }}
                  className="w-full p-4 bg-gray-50 rounded-2xl flex items-center gap-4 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Camera className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-ink">Cambiar Foto</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isEditingName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-ink mb-6">Tu Nombre</h3>
              <input 
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-primary transition-colors mb-6 font-bold"
                autoFocus
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsEditingName(false)}
                  className="flex-1 py-4 bg-gray-100 text-muted font-bold rounded-2xl"
                >
                  Cancelar
                </button>
                <button 
                  onClick={() => {
                    onUpdateUser({ ...user, name: newName });
                    setIsEditingName(false);
                  }}
                  className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
