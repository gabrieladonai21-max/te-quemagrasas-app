/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Info, X } from 'lucide-react';
import { MetabolicType } from '../types';
import { METABOLIC_TYPES } from '../constants';
import { IngredientsPopup } from './IngredientsPopup';

interface MetabolicSelectionProps {
  onSelect: (type: MetabolicType, ingredients?: string[]) => void;
  currentType?: MetabolicType;
  onShowUpsell?: () => void;
  onBack?: () => void;
}

export const MetabolicSelection: React.FC<MetabolicSelectionProps> = ({ onSelect, currentType, onShowUpsell, onBack }) => {
  const [selected, setSelected] = useState<MetabolicType | null>(currentType || null);
  const [showModal, setShowModal] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const handleSelect = (type: MetabolicType) => {
    if (currentType && type !== currentType) {
      if (onShowUpsell) onShowUpsell();
    } else {
      setSelected(type);
    }
  };

  const handleConfirm = () => {
    if (selected) {
      setShowModal(true);
    }
  };

  const handleFinalConfirm = () => {
    if (selected) {
      setShowModal(false);
      onSelect(selected);
    }
  };

  const handleIngredientsSave = (ingredients: string[]) => {
    if (selected) {
      onSelect(selected, ingredients);
    }
  };

  const handleIngredientsSkip = () => {
    if (selected) {
      onSelect(selected, []);
    }
  };

  const metabolicData = {
    A: { title: 'TIPO A - INSULÍNICO', desc: 'Acumula grasa fácil, cansancio post-comida', color: '#2E7D32' },
    B: { title: 'TIPO B - CORTISÓLICO', desc: 'Barriga dura, estrés, mal sueño', color: '#E8A020' },
    C: { title: 'TIPO C - ESTROGÉNICO', desc: 'Retención, celulitis, hinchazón', color: '#7B3B6E' },
    D: { title: 'TIPO D - TIROIDEO', desc: 'Siempre con frío, cansancio extremo', color: '#2D5A8E' },
    E: { title: 'TIPO E - HEPÁTICO-VISCERAL', desc: 'Grasa visceral, digestión pesada', color: '#D35400' },
    F: { title: 'TIPO F - MIXTO-OXIDATIVO', desc: 'Grasa distribuida, energia irregular', color: '#1D6A6A' },
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1D4A1A] min-h-screen pb-32 relative">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />
      
      {/* Dotted Border Frame */}
      <div className="absolute inset-4 border-2 border-dashed border-white/10 rounded-3xl pointer-events-none" />

      {/* Back Button */}
      {onBack && (
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 z-50 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      <div className="relative z-10 px-8 pt-12 text-center">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-serif text-[26px] font-bold text-white uppercase tracking-wider"
        >
          SELECCIONA TU TIPO DE METABOLISMO
        </motion.h2>
        <p className="text-white/80 text-[14px] mt-3 leading-relaxed max-w-[280px] mx-auto font-medium">
          Tu selección debe corresponder al protocolo de tu prueba anterior. Esta elección no podrá ser alterada después de la confirmación. <span className="block mt-1 font-bold text-white">(Confirmar Elección Final)</span>
        </p>
      </div>

      <div className="px-6 pt-8 grid grid-cols-2 gap-3 relative z-10 max-w-md mx-auto w-full">
        {(Object.keys(METABOLIC_TYPES) as MetabolicType[]).map((type, index) => {
          const info = METABOLIC_TYPES[type];
          const display = metabolicData[type];
          const isSelected = selected === type;
          
          return (
            <motion.button
              key={type}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(type)}
              className={`relative bg-white p-4 rounded-[24px] border-2 transition-all text-center shadow-md flex flex-col items-center group w-full ${
                isSelected 
                  ? 'border-[#E8A020] shadow-[0_0_25px_rgba(232,160,32,0.2)]' 
                  : 'border-transparent'
              }`}
            >
              {/* Badge & Icon */}
              <div className="relative mb-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                  style={{ 
                    backgroundColor: display.color,
                    boxShadow: `0 0 15px ${display.color}40`
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d={info.icon} />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-[10px] font-black border-2" style={{ color: display.color, borderColor: display.color }}>
                  {type}
                </div>
              </div>

              <h3 className="text-[11px] font-black text-[#1D4A1A] leading-tight mb-1 uppercase tracking-tight">
                {display.title.split(' - ')[0]}
              </h3>
              <p className="text-[8px] text-[#1D4A1A]/60 leading-tight font-bold line-clamp-2">
                {display.desc}
              </p>
              
              {isSelected && (
                <div className="absolute top-4 right-4 bg-[#E8A020] rounded-full p-1 shadow-sm">
                  <Check className="w-3 h-3 text-white stroke-[4]" />
                </div>
              )}

              {/* Luminous Glow for Selection */}
              {isSelected && (
                <div className="absolute inset-0 rounded-[32px] ring-4 ring-[#E8A020]/10 animate-pulse pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="fixed-element bottom-0 p-8 bg-gradient-to-t from-[#1D4A1A] via-[#1D4A1A] to-transparent z-50 text-center">
        <button
          onClick={handleConfirm}
          disabled={!selected}
          className={`w-full py-4 bg-[#E8A020] text-[#1D4A1A] font-bold rounded-2xl shadow-xl shadow-[#E8A020]/20 transition-all flex flex-col items-center justify-center gap-0.5 ${
            !selected ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[0.98] active:scale-95'
          }`}
        >
          <span className="text-sm">Finalizar Elección Final</span>
          <span className="text-[9px] opacity-70 font-medium">(Acceso Restringido)</span>
        </button>
        <p className="text-[10px] text-white mt-3 font-bold italic opacity-60">
          *Si deseas cambiar después, será necesario el Acceso Vitalicio.*
        </p>
      </div>

      {/* Finality Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1D4A1A]/40 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1D4A1A] w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Gold Accent Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8A020]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-[#E8A020] rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-[#E8A020]/20 transform rotate-12">
                <Info className="w-8 h-8" />
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-white mb-4">
                Elección Final de Metabolismo
              </h3>
              
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                Has seleccionado el <span className="text-[#E8A020] font-bold">{metabolicData[selected!].title}</span>. 
                Esta elección es final y restringida. <br/><br/>
                <span className="italic font-medium text-white/60">
                  *Si deseas cambiar en el futuro, necesitarás adquirir el Acceso Vitalicio.*
                </span>
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleFinalConfirm}
                  className="w-full py-4 bg-[#E8A020] text-[#1D4A1A] font-black rounded-2xl shadow-lg shadow-[#E8A020]/20 transition-all hover:scale-[0.98] active:scale-95"
                >
                  Finalizar Selección
                </button>
                <button
                  onClick={() => {}}
                  className="w-full py-3 bg-white/5 text-white/70 text-xs font-bold rounded-2xl border border-white/10 transition-all hover:bg-white/10"
                >
                  Comprar Vitalicio (para cambio futuro)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

