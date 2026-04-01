import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Clock, Check, ChevronLeft } from 'lucide-react';

interface NotificationsSettingsProps {
  onBack: () => void;
}

export const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    morning: true,
    night: true,
    bonus: false,
    morningTime: '08:00',
    nightTime: '20:00'
  });

  const toggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="min-height-screen bg-[#F7FAF5] pb-24">
      <div className="bg-white p-6 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#1A2E1A]" />
        </button>
        <h1 className="text-xl font-bold text-[#1A2E1A]">Notificaciones</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A2E1A]">Té Matinal</h3>
                <p className="text-xs text-gray-500">Recordatorio de activación</p>
              </div>
            </div>
            <button
              onClick={() => toggle('morning')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.morning ? 'bg-[#2E7D32]' : 'bg-gray-200'}`}
            >
              <motion.div
                animate={{ x: settings.morning ? 26 : 2 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {settings.morning && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Clock className="w-4 h-4 text-gray-400" />
              <input
                type="time"
                value={settings.morningTime}
                onChange={(e) => setSettings(prev => ({ ...prev, morningTime: e.target.value }))}
                className="bg-transparent font-bold text-[#1A2E1A] outline-none"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A2E1A]">Té Nocturno</h3>
                <p className="text-xs text-gray-500">Recordatorio de descanso</p>
              </div>
            </div>
            <button
              onClick={() => toggle('night')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.night ? 'bg-[#2E7D32]' : 'bg-gray-200'}`}
            >
              <motion.div
                animate={{ x: settings.night ? 26 : 2 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          {settings.night && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Clock className="w-4 h-4 text-gray-400" />
              <input
                type="time"
                value={settings.nightTime}
                onChange={(e) => setSettings(prev => ({ ...prev, nightTime: e.target.value }))}
                className="bg-transparent font-bold text-[#1A2E1A] outline-none"
              />
            </div>
          )}
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-[#1A2E1A]">Bonos Diarios</h3>
                <p className="text-xs text-gray-500">Shots y blends especiales</p>
              </div>
            </div>
            <button
              onClick={() => toggle('bonus')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.bonus ? 'bg-[#2E7D32]' : 'bg-gray-200'}`}
            >
              <motion.div
                animate={{ x: settings.bonus ? 26 : 2 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full py-4 bg-[#2E7D32] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};
