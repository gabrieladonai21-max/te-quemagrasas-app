import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChefHat } from 'lucide-react';

interface IngredientsSelectionProps {
  onSelect: (ingredients: string[]) => void;
}

const INGREDIENTES_COMUNES = [
  'Canela', 'Jengibre', 'Limón', 'Menta', 'Té verde', 'Manzanilla',
  'Cúrcuma', 'Miel', 'Pimienta cayena', 'Cardamomo', 'Clavo',
  'Anís estrellado', 'Té negro', 'Té blanco', 'Hibisco',
  'Romero', 'Tomillo', 'Lavanda',
];

export const IngredientsSelection: React.FC<IngredientsSelectionProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleIngredient = (ing: string) => {
    setSelected(prev => prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FAF5] to-[#E8EDE7] flex items-center justify-center p-4 md:p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#2E7D32] to-[#4A8C35] rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1D4A1A] mb-3">Potencia tu experiencia</h2>
          <p className="text-sm md:text-base text-gray-600">Selecciona los ingredientes que <strong>ya tienes en casa</strong>. Esto es opcional.</p>
        </div>
        <div className="bg-[#F7FAF5] rounded-2xl p-4 mb-6 border-l-4 border-[#E8A020]">
          <p className="text-xs md:text-sm text-[#1a3d18]/80"><strong className="text-[#E8A020]">💡 Importante:</strong> Esto NO limita tus recetas.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-6 md:mb-8 max-h-96 overflow-y-auto p-2">
          {INGREDIENTES_COMUNES.map((ing) => {
            const isSelected = selected.includes(ing);
            return (
              <button key={ing} onClick={() => toggleIngredient(ing)}
                className={`relative p-3 md:p-4 rounded-xl border-2 transition-all text-left ${isSelected ? 'border-[#2E7D32] bg-[#2E7D32]/5' : 'border-gray-200 hover:border-[#E8A020]'}`}>
                <div className="flex items-start justify-between">
                  <span className={`font-medium text-xs md:text-sm ${isSelected ? 'text-[#2E7D32]' : 'text-gray-700'}`}>{ing}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#2E7D32] shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
        <button onClick={() => onSelect(selected)}
          className="w-full py-3 md:py-4 bg-gradient-to-r from-[#2E7D32] to-[#4A8C35] text-white font-bold text-sm md:text-base rounded-full hover:scale-105 transition-transform shadow-lg">
          {selected.length > 0 ? `Continuar con ${selected.length} ingrediente${selected.length > 1 ? 's' : ''}` : 'Saltar este paso'}
        </button>
      </motion.div>
    </div>
  );
};
