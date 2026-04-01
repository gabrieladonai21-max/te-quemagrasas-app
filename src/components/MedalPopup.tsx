import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, X } from 'lucide-react';
import { IMAGE_ASSETS } from '../imageAssets';

interface MedalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  medalId: string;
  title: string;
}

export const MedalPopup: React.FC<MedalPopupProps> = ({ isOpen, onClose, medalId, title }) => {
  const getMedalImage = () => {
    if (medalId.includes('S1')) return IMAGE_ASSETS.medals.bronze;
    if (medalId.includes('S2')) return IMAGE_ASSETS.medals.silver;
    return IMAGE_ASSETS.medals.gold;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="absolute top-4 right-4 z-50">
              <button onClick={onClose} className="p-3 bg-black/5 rounded-full hover:bg-black/10 transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-8 text-center">
              <motion.div
                initial={{ rotate: -10, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-32 h-32 mx-auto mb-6 relative"
              >
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
                <img src={getMedalImage()} alt="Medalla" className="w-full h-full object-contain relative z-10" />
              </motion.div>

              <h2 className="text-2xl font-bold text-[#1A2E1A] mb-2">¡Nueva Medalla!</h2>
              <p className="text-gray-600 mb-6 font-medium">{title}</p>

              <div className="bg-[#F7FAF5] rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-[#2E7D32] font-bold">
                  <Award className="w-5 h-5" />
                  <span>Logro Desbloqueado</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-[#2E7D32] text-white font-bold rounded-2xl shadow-lg shadow-green-900/20 active:scale-95 transition-transform"
              >
                Continuar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
