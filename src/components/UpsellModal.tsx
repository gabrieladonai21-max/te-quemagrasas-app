import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Crown, ShieldCheck } from 'lucide-react';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  producto: 'vitalicio' | 'suplemento' | 'consulta';
}

const PRODUCTOS_HOTMART = {
  vitalicio: {
    icon: <Crown className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    titulo: '🔓 Protocolo Vitalício',
    subtitulo: 'Desbloquea tu máximo potencial',
    descripcion: 'Acceso ilimitado + nuevas recetas cada mes',
    beneficios: ['Acceso de por vida', 'Nuevas recetas mensuales', 'Cambia tu tipo cuando quieras', 'Soporte prioritario', 'Certificado'],
    precio: '$27',
    precioDe: '$97',
    link: 'https://pay.hotmart.com/Y93888888C?off=vitalicio',
    color: 'from-[#E8A020] to-[#C9953A]'
  },
  suplemento: {
    icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    titulo: '💊 Kit Suplementos',
    subtitulo: 'Potencializa tu transformación',
    descripcion: 'Fórmula exclusiva desarrollada por nutricionistas',
    beneficios: ['Acelera metabolismo 3x', 'Reduce hinchazón en 7 días', '100% natural', 'Certificado', 'Envío rápido'],
    precio: '$47',
    precioDe: '$97',
    link: 'https://pay.hotmart.com/Y93888888C?off=suplemento',
    color: 'from-[#2E7D32] to-[#4A8C35]'
  },
  consulta: {
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-white" />,
    titulo: '👩⚕️ Consulta Personalizada',
    subtitulo: 'Transformación guiada 1-on-1',
    descripcion: 'Sesión privada de 60 minutos',
    beneficios: ['Análisis personalizado', 'Plan ajustado a tu vida', 'Todas tus dudas resueltas', 'Acompañamiento 30 días', 'Garantía resultados'],
    precio: '$97',
    precioDe: '$297',
    link: 'https://pay.hotmart.com/Y93888888C?off=consulta',
    color: 'from-[#1D4A1A] to-[#2E7D32]'
  }
};

export const UpsellModal: React.FC<UpsellModalProps> = ({ isOpen, onClose, producto }) => {
  const prod = PRODUCTOS_HOTMART[producto];
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[300] p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }} 
              className="absolute top-4 right-4 z-50 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all active:scale-90"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
            <div className={`bg-gradient-to-br ${prod.color} p-6 md:p-8 text-white relative overflow-hidden`}>
              <div className="relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                  {prod.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">{prod.titulo}</h3>
                <p className="text-white/90 text-center text-sm">{prod.subtitulo}</p>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-sm md:text-base text-gray-600 text-center mb-6">{prod.descripcion}</p>
              <div className="space-y-3 mb-6">
                {prod.beneficios.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#2E7D32] to-[#4A8C35] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs md:text-sm text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-[#F7FAF5] to-[#E8EDE7] rounded-2xl p-4 md:p-6 mb-6 text-center">
                <div className="text-4xl md:text-5xl font-black text-[#2E7D32] mb-1">{prod.precio}</div>
                <div className="text-xs text-gray-500">Pago único</div>
              </div>
              <a href={prod.link} target="_blank" rel="noopener noreferrer"
                className={`block w-full py-3 md:py-4 bg-gradient-to-r ${prod.color} text-white font-bold text-sm md:text-base rounded-full text-center hover:scale-105 transition-transform shadow-lg mb-4`}>
                Quiero esto ahora →
              </a>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Garantía 7 días</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
