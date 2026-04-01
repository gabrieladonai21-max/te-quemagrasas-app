import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ChevronRight, CheckCircle2, ExternalLink, X } from 'lucide-react';
import { MODULES_METADATA, SPANISH_STRINGS } from '../constants';

interface ModuleCardProps {
  moduleId: keyof typeof MODULES_METADATA;
  isUnlocked: boolean;
  onOpen: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ moduleId, isUnlocked, onOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const data = MODULES_METADATA[moduleId];

  const handleClick = () => {
    if (isUnlocked) {
      onOpen();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`w-full relative rounded-[32px] p-6 text-left shadow-lg overflow-hidden group transition-all ${
          isUnlocked ? 'bg-white border border-[#1D4A1A]/5' : 'bg-[#F7FAF5] border border-[#E8A020]/20'
        }`}
      >
        {!isUnlocked && (
          <div className="absolute top-4 right-4 w-8 h-8 bg-[#E8A020] rounded-full flex items-center justify-center shadow-lg z-10">
            <Lock className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner"
            style={{ backgroundColor: `${data.color}15`, color: data.color }}
          >
            {moduleId === 'ayuno' ? '⏱️' : moduleId === 'firmeza' ? '✨' : moduleId === 'vitalicio' ? '💎' : '🍲'}
          </div>
          <div className="flex-1">
            <h3 className={`font-bold text-lg ${isUnlocked ? 'text-[#1D4A1A]' : 'text-[#1D4A1A]/60'}`}>
              {data.title}
            </h3>
            <p className="text-xs text-[#4A6741] font-medium">
              {data.desc}
            </p>
          </div>
          <ChevronRight className={`w-5 h-5 ${isUnlocked ? 'text-[#1D4A1A]' : 'text-[#E8A020]'}`} />
        </div>
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[40px] overflow-hidden shadow-2xl"
            >
              <div 
                className="p-8 text-center text-white relative"
                style={{ backgroundColor: data.color }}
              >
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="w-20 h-20 bg-white/20 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl backdrop-blur-md">
                  {moduleId === 'ayuno' ? '⏱️' : moduleId === 'firmeza' ? '✨' : moduleId === 'vitalicio' ? '💎' : '🍲'}
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">{data.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {data.desc}
                </p>
              </div>

              <div className="p-8">
                <h4 className="text-[10px] font-bold text-[#1D4A1A]/40 uppercase tracking-[0.2em] mb-4">
                  Beneficios Exclusivos
                </h4>
                <div className="space-y-3 mb-8">
                  {data.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle2 className="w-4 h-4" style={{ color: data.color }} />
                      </div>
                      <span className="text-sm text-[#1D4A1A] font-medium leading-tight">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                {data.proximamente ? (
                  <div className="w-full py-4 rounded-2xl bg-gray-100 text-gray-400 font-bold flex items-center justify-center gap-3">
                    Próximamente
                  </div>
                ) : (
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-gradient-to-r from-[#E8A020] to-[#C9953A] text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95"
                  >
                    {SPANISH_STRINGS.buy_now}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
