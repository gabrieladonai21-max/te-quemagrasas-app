/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('gabrieladonai21@gmail.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    setError(null);
    // Simulate login
    setTimeout(() => {
      // For demo purposes, let's assume any email works, but if we wanted to show error:
      // if (email !== 'valid@email.com') { setError("Este correo no tiene acceso activo. ¿Ya compraste? Revisa tu bandeja de entrada."); setLoading(false); return; }
      onLogin(email);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7FAF5] px-8 py-12">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12"
        >
          <span className="font-sans text-[16px] text-[#4A6741] tracking-tight">Protocolo Té</span>
          <span className="font-serif text-[22px] font-bold text-[#1D4A1A] -mt-1">Quemagrasas</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full"
        >
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-[#1D4A1A] mb-3">
              Bienvenida de nuevo
            </h2>
            <p className="font-sans text-[#1D4A1A]/60 text-sm">
              Ingresa tu correo para continuar tu protocolo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#1D4A1A]/40 font-bold ml-4">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full px-6 py-4 bg-white border border-[#1D4A1A]/10 rounded-2xl focus:border-[#1D4A1A] focus:ring-0 outline-none transition-all text-[#1D4A1A] font-sans"
                required
              />
              <p className="font-inter text-xs text-[#8FA888] text-center mt-2">
                Usa el correo con el que realizaste tu compra
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center font-medium">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#1D4A1A] text-white font-bold rounded-2xl shadow-xl shadow-[#1D4A1A]/10 hover:bg-[#244d21] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {loading ? 'Verificando...' : 'Acceder a mi protocolo →'}
              </button>

              <button
                type="button"
                onClick={() => window.open('https://pay.hotmart.com/C104977080A', '_blank')}
                className="w-full h-[44px] border border-[#E8A020] text-[#E8A020] font-bold rounded-[50px] bg-transparent hover:bg-[#E8A020]/5 transition-all flex items-center justify-center"
              >
                Adquirir mi protocolo
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      <footer className="text-center">
        <p className="text-[10px] text-[#1a3d18]/30 uppercase tracking-widest font-medium">
          Protocolo Té Quemagrasas © 2024
        </p>
      </footer>
    </div>
  );
};
