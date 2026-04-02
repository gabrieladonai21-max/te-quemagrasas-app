import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Thermometer, CheckCircle2, Lock, X, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MetabolicType, Recipe, UserProfile, BonusRecipe } from '../types';
import { METABOLIC_TYPES, NIVELES, DNAMES } from '../constants';
import { getRecipe } from '../services/recipeService';

interface DayViewProps {
  s: number;
  d: number;
  user: UserProfile;
  isCompleted: boolean;
  onBack: () => void;
  onComplete: () => void;
  isModal?: boolean;
}

export const DayView: React.FC<DayViewProps> = ({ s, d, user, isCompleted, onBack, onComplete, isModal }) => {
  const [checkedMorning, setCheckedMorning] = useState<string | null>(null);
  const [checkedNight, setCheckedNight] = useState<string | null>(null);
  const [bonusTaken, setBonusTaken] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState<Recipe | null>(null);
  const [showOptionB, setShowOptionB] = useState(false);
  
  const tipo = user.metabolicType || 'A';
  const info = METABOLIC_TYPES[tipo];
  const nivel = NIVELES[s - 1];
  const globalDay = (s - 1) * 7 + d;
  const rawDayRecipes = getRecipe(tipo, s, d);

  const availableIngredients = user.ingredientes_disponibles || [];

  const sortRecipes = (recipes: Recipe[]) => {
    return [...recipes].sort((a, b) => {
      const aCount = a.ingredients.filter(ing => 
        availableIngredients.some(ai => ing.toLowerCase().includes(ai.toLowerCase()))
      ).length;
      const bCount = b.ingredients.filter(ing => 
        availableIngredients.some(ai => ing.toLowerCase().includes(ai.toLowerCase()))
      ).length;
      return bCount - aCount;
    });
  };

  const dayRecipes = {
    ...rawDayRecipes,
    morning: sortRecipes(rawDayRecipes.morning),
    night: sortRecipes(rawDayRecipes.night)
  };

  const handleComplete = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2E7D32', '#E8A020', '#FFFFFF', '#1D4A1A']
    });
    onComplete();
  };

  const canComplete = () => {
    return checkedMorning !== null && checkedNight !== null && !isCompleted;
  };

  const handleToggleCheck = (recipeId: string, period: 'morning' | 'night') => {
    if (period === 'morning') {
      setCheckedMorning(checkedMorning === recipeId ? null : recipeId);
    } else {
      setCheckedNight(checkedNight === recipeId ? null : recipeId);
    }
  };

  const RecipeCard = ({ recipe, period }: { recipe: Recipe; period: 'morning' | 'night' }) => {
    const matchedCount = recipe.ingredients.filter(ing => 
      availableIngredients.some(ai => ing.toLowerCase().includes(ai.toLowerCase()))
    ).length;
    const hasAll = matchedCount === recipe.ingredients.length;
    
    const isChecked = period === 'morning' 
      ? checkedMorning === recipe.id 
      : checkedNight === recipe.id;

    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all mb-3 relative">
        {/* CHECK BADGE no topo direito */}
        {isChecked && (
          <div className="absolute top-2 right-2 z-20 w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        )}
        
        <div className="flex items-center gap-3 p-3">
          {/* FOTO ESQUERDA - USA A IMAGEM DA RECEITA */}
          <div 
            className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
            onClick={() => setShowRecipeModal(recipe)}
          >
            <img 
              src={recipe.image || 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-verde-iniciador.jpg'} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
            />
            {hasAll && (
              <div className="absolute top-1 left-1 bg-[#2E7D32] text-white text-[7px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                <CheckCircle2 className="w-2 h-2" />
                TODO
              </div>
            )}
          </div>

          {/* INFO CENTRO */}
          <div className="flex-1 min-w-0" onClick={() => setShowRecipeModal(recipe)}>
            <h4 className="font-bold text-sm text-[#1D4A1A] mb-1 line-clamp-2">{recipe.name}</h4>
            <div className="flex gap-3 text-[10px] text-[#8FA888] font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {recipe.time}min
              </span>
              <span className="flex items-center gap-1">
                <Thermometer className="w-3 h-3" /> {recipe.temp}
              </span>
            </div>
          </div>

          {/* BOTÕES DIREITA */}
          <div className="flex flex-col gap-2">
            <button 
              className="px-3 py-2 bg-gradient-to-r from-[#2E7D32] to-[#4A8C35] text-white text-[10px] font-bold rounded-full hover:scale-105 transition-transform"
              onClick={(e) => {
                e.stopPropagation();
                setShowRecipeModal(recipe);
              }}
            >
              Ver
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleCheck(recipe.id, period);
              }}
              className={`px-3 py-2 text-[10px] font-bold rounded-full transition-all ${
                isChecked
                  ? 'bg-[#2E7D32] text-white'
                  : 'border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10'
              }`}
            >
              {isChecked ? '✓ Hecho' : 'Marcar'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RecipeModal = ({ recipe }: { recipe: Recipe }) => {
    if (!recipe) return null;

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="relative h-48">
            <img 
              src={recipe.image || 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-verde-iniciador.jpg'} 
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowRecipeModal(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="p-4 md:p-6">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#1D4A1A] mb-3">{recipe.name}</h2>
            
            <div className="flex gap-4 mb-6 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#E8A020]" /> {recipe.time} min
              </span>
              <span className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-[#E8A020]" /> {recipe.temp}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-black text-[#1a3d18]/40 uppercase tracking-widest mb-3">Ingredientes</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => {
                  const isAvailable = availableIngredients.some(ai => ing.toLowerCase().includes(ai.toLowerCase()));
                  return (
                    <li key={i} className={`flex items-start gap-2 text-sm ${isAvailable ? 'text-[#2E7D32] font-bold' : 'text-[#1a3d18]/80'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${isAvailable ? 'bg-[#2E7D32]' : 'bg-gray-300'}`} />
                      <span className="flex-1 text-justify">{ing}</span>
                      {isAvailable && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-black text-[#1a3d18]/40 uppercase tracking-widest mb-3">Preparación</h3>
              <ol className="space-y-3">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#1a3d18]/80">
                    <span className="font-bold text-[#E8A020] shrink-0">{i + 1}.</span>
                    <p className="text-justify">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-[#F7FAF5] rounded-2xl p-4 border-l-4 border-[#2E7D32]">
              <h3 className="text-xs font-black text-[#1a3d18]/40 uppercase tracking-widest mb-2">
                Por qué funciona
              </h3>
              <p className="text-sm text-[#1a3d18]/70 italic text-justify">{recipe.whyItWorks}</p>
            </div>

            <p className="text-xs text-[#8FA888] italic mt-6 text-center border-t border-[#E8EDE7] pt-4">
              Preparación de bienestar · No sustituye evaluación médica
            </p>
          </div>
        </motion.div>
      </div>
    );
  };

  const BonusSection = ({ bonus }: { bonus?: BonusRecipe }) => {
    if (!bonus) return null;

    return (
      <div className="mb-10 rounded-r-xl overflow-hidden" style={{
        borderLeft: '3px solid #E8A020',
        background: 'linear-gradient(to right, #FFFBF0, transparent)',
        padding: '12px 14px'
      }}>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" width="16" height="16">
                  <path d="M10 1l2.5 6H19l-5.5 4 2 6.5L10 14l-5.5 3.5 2-6.5L1 7h6.5z"
                    fill="#E8A020" stroke="#C9953A" strokeWidth="0.5"/>
                </svg>
                <span className="text-[9px] font-bold text-[#C9953A] uppercase tracking-widest">BONUS DEL DÍA</span>
              </div>
              {bonusTaken && (
                <span className="text-[9px] font-bold text-[#E8A020] flex items-center gap-1">
                  ★ Bonus tomado
                </span>
              )}
            </div>
            
            <h4 className="font-serif text-base md:text-lg font-bold text-[#1D4A1A] mb-1">{bonus.nome}</h4>
            <div className="flex gap-3 text-[10px] text-[#8FA888] font-medium mb-3">
              <span className="uppercase">{bonus.categoria}</span>
              <span>•</span>
              <span>{bonus.horario}</span>
            </div>
          </div>

          {bonus.image && (
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
              <img src={bonus.image} alt={bonus.nome} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-xs text-[#1a3d18]/80 text-justify"><strong>Ingredientes:</strong> {bonus.ingredientes.join(', ')}</p>
          <p className="text-xs text-[#1a3d18]/80 text-justify"><strong>Preparo:</strong> {bonus.preparo}</p>
          <p className="text-xs text-[#1a3d18]/70 italic text-justify">"{bonus.beneficio}"</p>
        </div>

        {!bonusTaken && (
          <button 
            onClick={() => setBonusTaken(true)}
            className="px-4 py-2 border border-[#E8A020] text-[#E8A020] text-[10px] font-bold rounded-full hover:bg-[#E8A020]/5 transition-all"
          >
            Tomé mi bonus ✓
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7FAF5]">
      <div 
        className="p-6 md:p-8 pt-12 text-white relative rounded-b-[40px] shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #1D4A1A 0%, #2E7D32 100%)' }}
      >
        <button
          onClick={onBack}
          className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="mt-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
            Día {globalDay} — {DNAMES[globalDay - 1] || 'Día ' + globalDay}
          </h2>
        </div>
        
        <div className="flex gap-2 mt-6">
          <div className="bg-white/15 backdrop-blur-md border border-white/25 px-3 md:px-4 py-2 rounded-full flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d={info.icon} />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Tipo {tipo}
            </span>
          </div>
          <div className="bg-white/15 backdrop-blur-md border border-white/25 px-3 md:px-4 py-2 rounded-full flex items-center gap-2">
            <span className="text-sm">{nivel.ico}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              {nivel.name}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 pb-32">
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowOptionB(!showOptionB)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-[#E8A020] rounded-full text-[#E8A020] font-bold text-xs hover:bg-[#E8A020]/10 transition-all shadow-md"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">
              {showOptionB ? 'Opción A (Creativa)' : 'Opción B (Simple)'}
            </span>
            <span className="sm:hidden">
              {showOptionB ? 'Opción A' : 'Opción B'}
            </span>
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-black text-[#1a3d18]/40 uppercase tracking-[0.2em] mb-4 ml-2">
            Protocolo Mañana
          </h3>
          {(showOptionB 
            ? dayRecipes.morning.slice(1, 2) 
            : dayRecipes.morning.slice(0, 1)
          ).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} period="morning" />
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-black text-[#1a3d18]/40 uppercase tracking-[0.2em] mb-4 ml-2">
            Protocolo Tarde/Noche
          </h3>
          {(showOptionB 
            ? dayRecipes.night.slice(1, 2) 
            : dayRecipes.night.slice(0, 1)
          ).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} period="night" />
          ))}
        </div>

        <BonusSection bonus={dayRecipes.bonus} />

        <div className="pb-10">
          <button
            onClick={handleComplete}
            disabled={!canComplete()}
            className={`w-full py-4 md:py-5 font-black rounded-full shadow-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs ${
              isCompleted 
                ? 'bg-[#2E7D32]/10 text-[#2E7D32] cursor-default' 
                : !canComplete()
                ? 'bg-[#E8EDE7] text-[#8A9E87] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#2E7D32] to-[#4A8C35] text-white hover:scale-[0.98]'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Día completado
              </>
            ) : !canComplete() ? (
              <>
                <Lock className="w-5 h-5" />
                Marca 1 mañana + 1 tarde
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Marcar día como completado
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showRecipeModal && <RecipeModal recipe={showRecipeModal} />}
      </AnimatePresence>
    </div>
  );
};
