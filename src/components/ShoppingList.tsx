/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ShoppingCart, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { getRecipe } from '../services/recipeService';
import { METABOLIC_TYPES } from '../constants';

interface ShoppingListProps {
  user: UserProfile;
  onBack: () => void;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ user, onBack }) => {
  const tipo = user.metabolicType || 'A';
  const info = METABOLIC_TYPES[tipo];
  const completedDays = user.completedDays || [];

  // Determine current week
  const currentWeek = useMemo(() => {
    for (let s = 1; s <= 6; s++) {
      const weekCompleted = Array.from({ length: 7 }, (_, i) => `S${s}D${i + 1}`).every(d => completedDays.includes(d));
      if (!weekCompleted) return s;
    }
    return 6;
  }, [completedDays]);

  // Helper to clean ingredient names (remove quantities, units, and normalize)
  const cleanIngredient = (ing: string): string => {
    let cleaned = ing.toLowerCase();
    
    // Remove common quantity patterns at the start
    cleaned = cleaned.replace(/^\d+[\/\d\s\.]*(cdita|cdas|ml|l|g|gr|kg|pau|ramita|rodaja|fatia|semente|cravo|col|pizca|taza|vaso|unid|oz|lb|cup|tsp|tbsp|pau de|suco de|jugo de|fatias|sementes|cravos|rodajas|tazas|vasos|unidades|unidade|unid\.|cdas\.|col\.)\s*(de|do|da)?\s*/i, '');
    cleaned = cleaned.replace(/^\d+[\/\d\s\.]*(de|do|da)?\s*/, '');
    cleaned = cleaned.replace(/^[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]\s*(de|do|da)?\s*/, '');
    cleaned = cleaned.replace(/^\d+\/\d+\s*(de|do|da)?\s*/, '');
    
    // Remove trailing quantities or descriptors that feel like "how to prepare"
    cleaned = cleaned.replace(/\s+\d+[\/\d\s\.]*(cdita|cdas|ml|l|g|gr|kg|pau|ramita|rodaja|fatia|semente|cravo|col|pizca|taza|vaso|unid|oz|lb|cup|tsp|tbsp|pau de|suco de|jugo de|fatias|sementes|cravos|rodajas|tazas|vasos|unidades|unidade|unid\.|cdas\.|col\.)\s*$/i, '');
    cleaned = cleaned.replace(/\s+[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]\s*(col|cdita|cdas)?\s*$/i, '');
    cleaned = cleaned.replace(/\s+\d+\/\d+\s*(col|cdita|cdas)?\s*$/i, '');
    
    // Remove common preparation descriptors to avoid spoilers/clutter
    cleaned = cleaned.replace(/\s*(fresco|fresca|seco|seca|suelto|suelta|concentrado|concentrada|dupla|triple|abundante|gelado|morno|quente|frio|caliente)\s*$/i, '');

    cleaned = cleaned.trim();
    
    if (!cleaned) return ing;
    
    // Capitalize first letter
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  // Generate ingredients list for the current week
  const { essential, suggestive } = useMemo(() => {
    const essentialSet = new Set<string>();
    const suggestiveSet = new Set<string>();

    for (let d = 1; d <= 7; d++) {
      const recipes = getRecipe(tipo, currentWeek, d);
      
      // Essential: Option A (index 0)
      recipes.morning[0]?.ingredients.forEach(ing => {
        const cleaned = cleanIngredient(ing);
        if (cleaned) essentialSet.add(cleaned);
      });
      recipes.night[0]?.ingredients.forEach(ing => {
        const cleaned = cleanIngredient(ing);
        if (cleaned) essentialSet.add(cleaned);
      });

      // Suggestive: Option B (index 1) and Bonus
      recipes.morning[1]?.ingredients.forEach(ing => {
        const cleaned = cleanIngredient(ing);
        if (cleaned) suggestiveSet.add(cleaned);
      });
      recipes.night[1]?.ingredients.forEach(ing => {
        const cleaned = cleanIngredient(ing);
        if (cleaned) suggestiveSet.add(cleaned);
      });
      
      if (recipes.bonus) {
        recipes.bonus.ingredientes.forEach(ing => {
          const cleaned = cleanIngredient(ing);
          if (cleaned) suggestiveSet.add(cleaned);
        });
      }
    }

    // Remove duplicates from suggestive if they are already in essential
    const finalSuggestive = Array.from(suggestiveSet).filter(ing => !essentialSet.has(ing));

    return {
      essential: Array.from(essentialSet).sort((a, b) => a.localeCompare(b)),
      suggestive: finalSuggestive.sort((a, b) => a.localeCompare(b))
    };
  }, [tipo, currentWeek]);

  return (
    <div className="min-h-screen bg-[#F7FAF5] pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#1D4A1A]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="font-serif text-2xl font-bold text-[#1D4A1A]">Lista de Compras</h1>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-[#2E7D32]/5 rounded-2xl border border-[#2E7D32]/10">
          <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#2E7D32]/20">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#2E7D32] uppercase tracking-widest">Semana {currentWeek}</p>
            <h2 className="text-sm font-bold text-[#1D4A1A]">{info.sems[currentWeek - 1] || 'Protocolo Activo'}</h2>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Essential Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
            <h3 className="font-serif text-xl font-bold text-[#1D4A1A]">Productos Esenciales</h3>
          </div>
          <p className="text-xs text-[#4A6741] px-2 leading-relaxed">
            Estos son los ingredientes base para tus recetas de la Opción A. Son fundamentales para el éxito del protocolo esta semana.
          </p>
          
          <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-[#E8EDE7] overflow-hidden">
            <div className="divide-y divide-[#E8EDE7]">
              {essential.map((ing, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-5 h-5 rounded-md border-2 border-[#2E7D32]/20 flex-shrink-0" />
                  <span className="text-sm text-[#1D4A1A] font-medium">{ing}</span>
                </div>
              ))}
              {essential.length === 0 && (
                <div className="p-8 text-center text-gray-400 italic text-sm">
                  No hay ingredientes esenciales definidos para esta semana.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Suggestive Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Sparkles className="w-5 h-5 text-[#E8A020]" />
            <h3 className="font-serif text-xl font-bold text-[#1D4A1A]">Productos Sugestivos</h3>
          </div>
          <p className="text-xs text-[#4A6741] px-2 leading-relaxed">
            Ingredientes para las Opciones B y Bonos del día. Te permiten variar tu protocolo y potenciar los resultados.
          </p>
          
          <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-[#E8EDE7] overflow-hidden">
            <div className="divide-y divide-[#E8EDE7]">
              {suggestive.map((ing, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                  <div className="w-5 h-5 rounded-md border-2 border-[#E8A020]/20 flex-shrink-0" />
                  <span className="text-sm text-[#1D4A1A] font-medium">{ing}</span>
                </div>
              ))}
              {suggestive.length === 0 && (
                <div className="p-8 text-center text-gray-400 italic text-sm">
                  No hay ingredientes sugestivos definidos para esta semana.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Info Card */}
        <div className="bg-[#1D4A1A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Info className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <h4 className="font-serif text-xl font-bold mb-3">Consejo de Compra</h4>
            <p className="text-sm opacity-80 leading-relaxed font-medium">
              Prioriza ingredientes frescos y orgánicos cuando sea posible. Las especias como la canela Ceylon y el jengibre fresco marcan la diferencia en la activación de tu metabolismo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
