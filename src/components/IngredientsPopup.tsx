import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { MetabolicType } from '../types';

interface IngredientsPopupProps {
  metabolicType: MetabolicType;
  onSave: (ingredients: string[]) => void;
  onSkip: () => void;
}

const INGREDIENTS = [
  'Acelga', 'Apio', 'Berenjena', 'Brócoli', 'Calabacín', 'Canela', 'Cebolla', 
  'Cilantro', 'Coliflor', 'Cúrcuma', 'Espinaca', 'Jengibre', 'Limón', 
  'Manzana Verde', 'Pepino', 'Perejil', 'Pimiento', 'Repollo', 'Tomate'
];

export const IngredientsPopup: React.FC<IngredientsPopupProps> = ({ metabolicType, onSave, onSkip }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleIngredient = (ing: string) => {
    setSelected(prev => 
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#1D4A1A]/60 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="text-center mb-6">
          <h3 className="font-serif text-[20px] font-bold text-[#1D4A1A] mb-2">
            ¿Qué ingredientes tienes en casa?
          </h3>
          <p className="text-[#4A6741] text-[14px] font-medium leading-tight">
            Priorizaremos las recetas que usen lo que ya tienes.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {INGREDIENTS.map(ing => (
              <button
                key={ing}
                onClick={() => toggleIngredient(ing)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${
                  selected.includes(ing)
                    ? 'bg-[#1D4A1A] border-[#1D4A1A] text-white shadow-md'
                    : 'bg-gray-50 border-gray-100 text-[#1D4A1A]/60'
                }`}
              >
                <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                  selected.includes(ing) ? 'bg-white border-white' : 'bg-white border-gray-200'
                }`}>
                  {selected.includes(ing) && <Check className="w-3 h-3 text-[#1D4A1A] stroke-[4]" />}
                </div>
                <span className="text-[11px] font-bold leading-tight">{ing}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => onSave(selected)}
            className="w-full py-4 bg-[#1D4A1A] text-white font-black rounded-2xl shadow-lg shadow-[#1D4A1A]/20 transition-all hover:scale-[0.98] active:scale-95"
          >
            Guardar y ver mi protocolo
          </button>
          <button
            onClick={onSkip}
            className="w-full py-2 text-[#4A6741] text-sm font-bold transition-all hover:opacity-70"
          >
            Saltar por ahora
          </button>
        </div>
      </motion.div>
    </div>
  );
};
