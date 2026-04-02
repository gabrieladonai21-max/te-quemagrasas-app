/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ChevronRight, Search, Clock, Thermometer, Flame, X, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { UserProfile, Recipe } from '../types';
import { getRecipe, getRecipeImage } from '../services/recipeService';
import { METABOLIC_TYPES, SOPAS_RECIPES, MODULES_METADATA, SPANISH_STRINGS } from '../constants';

interface RecipesProps {
  user: UserProfile;
  onOpenDay: (sem: number, dia: number) => void;
  initialTab?: 'blends' | 'sopas';
}

export const Recipes: React.FC<RecipesProps> = ({ user, onOpenDay, initialTab = 'blends' }) => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'blends' | 'sopas'>(initialTab);
  const [showModal, setShowModal] = useState(false);
  const [viewingRecipe, setViewingRecipe] = useState<{ recipe: Recipe | any; day: number; period: string; isToday?: boolean } | null>(null);
  
  const tipo = user.metabolicType || 'A';
  const modulos = user.modulos || [];
  const completedDays = user.completedDays || [];
  const isSopasUnlocked = modulos.includes('sopas');

  const accessibleSoupsCount = useMemo(() => {
    // Libera 1 sopa a cada 3 dias completos
    return Math.floor(completedDays.length / 3);
  }, [completedDays]);

  const accessibleSoups = useMemo(() => {
    return SOPAS_RECIPES.slice(0, accessibleSoupsCount);
  }, [accessibleSoupsCount]);

  const completedRecipes = useMemo(() => {
    const list: any[] = [];
    
    // 1. Add completed recipes
    completedDays.forEach(key => {
      const match = key.match(/S(\d)D(\d)/);
      if (!match) return;
      const s = parseInt(match[1]);
      const d = parseInt(match[2]);
      const globalDay = (s - 1) * 7 + d;
      const chosen = user.chosenRecipes?.[key];
      if (!chosen) return;

      const recipes = getRecipe(tipo, s, d);
      
      // Morning
      const morningRecipe = recipes.morning[chosen.morning];
      if (morningRecipe) {
        list.push({ ...morningRecipe, globalDay, period: 'Mañana', s, d, isCompleted: true });
      }

      // Night
      const nightRecipe = recipes.night[chosen.night];
      if (nightRecipe) {
        list.push({ ...nightRecipe, globalDay, period: 'Tarde/Noche', s, d, isCompleted: true });
      }

      // Bonus
      if (chosen.bonus && recipes.bonus) {
        list.push({ ...recipes.bonus, globalDay, period: 'Bonus', s, d, isBonus: true, isCompleted: true });
      }
    });

    // 2. Add current day recipes (if not already completed)
    const getNextDay = () => {
      for (let s = 1; s <= 6; s++) {
        for (let d = 1; d <= 7; d++) {
          const key = `S${s}D${d}`;
          if (!completedDays.includes(key)) return { s, d };
        }
      }
      return null;
    };

    const next = getNextDay();
    if (next) {
      const recipes = getRecipe(tipo, next.s, next.d);
      const globalDay = (next.s - 1) * 7 + next.d;
      
      // Add both options for morning and night to the list so they can see them
      recipes.morning.slice(0, 2).forEach((r, i) => {
        list.push({ ...r, globalDay, period: 'Mañana', s: next.s, d: next.d, isToday: true, option: i === 0 ? 'A' : 'B' });
      });
      recipes.night.slice(0, 2).forEach((r, i) => {
        list.push({ ...r, globalDay, period: 'Tarde/Noche', s: next.s, d: next.d, isToday: true, option: i === 0 ? 'A' : 'B' });
      });
      if (recipes.bonus) {
        list.push({ ...recipes.bonus, globalDay, period: 'Bonus', s: next.s, d: next.d, isToday: true, isBonus: true });
      }
    }

    return list.sort((a, b) => {
      if (a.isToday && !b.isToday) return -1;
      if (!a.isToday && b.isToday) return 1;
      return b.globalDay - a.globalDay;
    });
  }, [user, tipo, completedDays]);

  const filteredRecipes = completedRecipes.filter(r => 
    r.name?.toLowerCase().includes(search.toLowerCase()) || 
    r.nome?.toLowerCase().includes(search.toLowerCase())
  );

  const handleRecipeClick = (recipe: any) => {
    setViewingRecipe({ recipe, day: recipe.globalDay, period: recipe.period, isToday: recipe.isToday });
  };

  const handleSopaClick = () => {
    if (!isSopasUnlocked) {
      setShowModal(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7FAF5] pb-24 min-h-screen">
      <header className="p-8 pt-12 bg-[#1D4A1A] rounded-b-[48px] shadow-lg">
        <h2 className="font-serif text-3xl font-bold text-white leading-tight">Recetario</h2>
        <p className="text-white/70 text-xs mt-2 font-medium tracking-wide uppercase">Tus infusiones y sopas para el éxito</p>
      </header>

      <div className="px-6 pt-8 space-y-6">
        {/* Tabs */}
        <div className="bg-white p-2 rounded-3xl flex gap-2 shadow-sm border border-[#1D4A1A]/5">
          <button
            onClick={() => setActiveTab('blends')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'blends' ? 'bg-[#2E7D32] text-white shadow-lg' : 'text-[#2E7D32]/60'
            }`}
          >
            Blends
          </button>
          <button
            onClick={() => setActiveTab('sopas')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'sopas' ? 'bg-[#D35400] text-white shadow-lg' : 'text-[#D35400]/60'
            }`}
          >
            Sopas
            {!isSopasUnlocked && <Lock className="w-3 h-3" />}
          </button>
        </div>

        {activeTab === 'blends' ? (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A6741]/40" />
              <input 
                type="text"
                placeholder="Buscar receta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E8EDE7] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
              />
            </div>

            <div className="space-y-3">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe, idx) => (
                  <motion.div
                    key={`${recipe.globalDay}-${recipe.period}-${recipe.option || ''}-${idx}`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRecipeClick(recipe)}
                    className={`bg-white p-4 rounded-[32px] border flex items-center gap-4 shadow-sm transition-all cursor-pointer ${
                      recipe.isToday 
                        ? 'border-[#E8A020] bg-[#E8A020]/5' 
                        : 'border-[#1D4A1A]/5 hover:border-[#2E7D32]/30'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#F7FAF5] flex items-center justify-center">
                      {recipe.image || getRecipeImage(recipe.name) ? (
                        <img src={recipe.image || getRecipeImage(recipe.name)} alt={recipe.name} className="w-full h-full object-cover" />
                      ) : (
                        <Sparkles className="w-6 h-6 text-[#E8A020]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`text-[9px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded ${
                          recipe.isToday ? 'bg-[#E8A020] text-white' :
                          recipe.period === 'Mañana' ? 'bg-[#E8A020]/10 text-[#E8A020]' : 
                          recipe.period === 'Bonus' ? 'bg-[#D35400]/10 text-[#D35400]' : 'bg-[#2E7D32]/10 text-[#2E7D32]'
                        }`}>
                          {recipe.isToday ? 'Hoy' : recipe.period}
                        </span>
                        {recipe.isToday && (
                          <span className="text-[9px] font-bold text-[#E8A020] uppercase">{recipe.period} {recipe.option && `· Opción ${recipe.option}`}</span>
                        )}
                        <span className="text-[9px] font-bold text-[#4A6741]/40 uppercase">Día {recipe.globalDay}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1D4A1A] truncate">{recipe.name || recipe.nome}</h4>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#4A6741]/40" />
                  </motion.div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-[#E8EDE7]">
                  <div className="w-16 h-16 bg-[#F7FAF5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-[#4A6741]/20" />
                  </div>
                  <h4 className="text-[#1D4A1A] font-bold mb-2">Aquí aparecerán tus recetas.</h4>
                  <p className="text-xs text-[#4A6741] leading-relaxed">
                    Completa los días en tu protocolo para ver tu historial.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {SOPAS_RECIPES.map((sopa, i) => {
              const isSoupAccessible = i < accessibleSoupsCount;
              const hasAccess = isSopasUnlocked && isSoupAccessible;

              return (
                <motion.div
                  key={sopa.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all mb-3 relative border border-[#D35400]/5"
                >
                  {/* Badge BLOQUEADO (se não tiver acesso) */}
                  {!hasAccess && (
                    <div className="absolute top-2 right-2 z-20 bg-[#E8A020] text-white text-[8px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                      <Lock className="w-2 h-2" /> PREMIUM
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 p-3">
                    {/* FOTO ESQUERDA */}
                    <div 
                      className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => hasAccess ? handleRecipeClick({ ...sopa, period: 'Sopa Termogénica', globalDay: (i + 1) * 3 }) : handleSopaClick()}
                    >
                      <img 
                        src={sopa.image || getRecipeImage(sopa.name)} 
                        alt={sopa.name} 
                        className={`w-full h-full object-cover ${!hasAccess ? 'blur-sm' : ''}`}
                      />
                    </div>

                    {/* INFO CENTRO */}
                    <div 
                      className="flex-1 min-w-0 cursor-pointer" 
                      onClick={() => hasAccess ? handleRecipeClick({ ...sopa, period: 'Sopa Termogénica', globalDay: (i + 1) * 3 }) : handleSopaClick()}
                    >
                      <h4 className="font-bold text-sm text-[#1D4A1A] mb-1 line-clamp-2">{sopa.name}</h4>
                      <p className="text-[10px] text-[#4A6741] line-clamp-1">{sopa.desc}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Flame className="w-3 h-3 text-[#D35400]" />
                        <span className="text-[8px] font-bold text-[#D35400] bg-[#D35400]/10 px-2 py-0.5 rounded-full uppercase">
                          {sopa.category}
                        </span>
                      </div>
                    </div>

                    {/* BOTÃO DIREITA */}
                    <button 
                      className={`px-4 py-2 text-[10px] font-bold rounded-full transition-transform active:scale-95 ${
                        hasAccess 
                          ? 'bg-gradient-to-r from-[#2E7D32] to-[#4A8C35] text-white'
                          : 'bg-gradient-to-r from-[#E8A020] to-[#C9953A] text-white'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        hasAccess ? handleRecipeClick({ ...sopa, period: 'Sopa Termogénica', globalDay: (i + 1) * 3 }) : handleSopaClick();
                      }}
                    >
                      {hasAccess ? 'Ver' : 'Comprar'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recipe Reading Mode Modal */}
      <AnimatePresence>
        {viewingRecipe && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-[300] bg-[#F7FAF5] overflow-y-auto scroll-smooth"
          >
            <div className="relative min-h-screen">
              {/* Botão de Fechar Fixo e Visível */}
              <button
                onClick={() => setViewingRecipe(null)}
                className="fixed top-4 right-4 z-[310] w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl hover:bg-black/60 transition-all active:scale-90"
              >
                <X className="w-6 h-6" />
              </button>

              {viewingRecipe.recipe.image || getRecipeImage(viewingRecipe.recipe.name || viewingRecipe.recipe.nome) ? (
                <div className="relative h-72 shrink-0">
                  <img 
                    src={viewingRecipe.recipe.image || getRecipeImage(viewingRecipe.recipe.name || viewingRecipe.recipe.nome)} 
                    alt={viewingRecipe.recipe.name || viewingRecipe.recipe.nome} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="backdrop-blur-md px-3 py-1 rounded-full w-fit mb-3 flex items-center gap-2 bg-white/20 border border-white/30">
                      {viewingRecipe.isToday ? <Sparkles className="w-3 h-3 text-white" /> : <CheckCircle2 className="w-3 h-3 text-white" />}
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        {viewingRecipe.period === 'Sopa Termogénica' ? 'Sopa Exclusiva' : `Día ${viewingRecipe.day} · ${viewingRecipe.isToday ? 'Receta de Hoy' : 'Completada'}`}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight drop-shadow-lg">
                      {viewingRecipe.recipe.name || viewingRecipe.recipe.nome}
                    </h2>
                  </div>
                </div>
              ) : (
                <div 
                  className="p-10 pt-16 text-white relative rounded-b-[48px] shadow-2xl shrink-0"
                  style={{ background: viewingRecipe.isToday ? 'linear-gradient(135deg, #E8A020 0%, #D35400 100%)' : METABOLIC_TYPES[tipo].colors.gradient }}
                >
                  <div className="mt-4">
                    <div className={`backdrop-blur-md px-3 py-1 rounded-full w-fit mb-4 flex items-center gap-2 border border-white/30 ${viewingRecipe.isToday ? 'bg-white/30' : 'bg-white/20'}`}>
                      {viewingRecipe.isToday ? <Sparkles className="w-3 h-3 text-white" /> : <CheckCircle2 className="w-3 h-3 text-white" />}
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        Día {viewingRecipe.day} · {viewingRecipe.isToday ? 'Receta de Hoy' : 'Completada'}
                      </span>
                    </div>
                    <h2 className="font-serif text-4xl font-bold leading-tight drop-shadow-md">
                      {viewingRecipe.recipe.name || viewingRecipe.recipe.nome}
                    </h2>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-[0.3em] mt-3">{viewingRecipe.period}</p>
                  </div>
                </div>
              )}

              <div className="p-8 pb-32 space-y-10">
                <div className="flex gap-6 text-[11px] text-[#4A6741] font-black uppercase tracking-[0.15em] border-b border-[#1D4A1A]/10 pb-4">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#E8A020]" /> {viewingRecipe.recipe.time || '10'} MIN</span>
                  <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#E8A020]" /> {viewingRecipe.recipe.temp || 'Caliente'}</span>
                </div>

                <div className="grid gap-10">
                  <section>
                    <h5 className="text-[10px] font-black text-[#1D4A1A]/30 uppercase tracking-[0.25em] mb-5 flex items-center gap-2">
                      <div className="w-4 h-[1px] bg-[#1D4A1A]/20" /> Ingredientes
                    </h5>
                    <ul className="space-y-4">
                      {(viewingRecipe.recipe.ingredients || viewingRecipe.recipe.ingredientes || []).map((ing: string, i: number) => (
                        <li key={i} className="flex items-start gap-4 text-[15px] text-[#1D4A1A]/90 leading-relaxed">
                          <div className="w-2 h-2 bg-[#E8A020] rounded-full mt-1.5 shrink-0 shadow-sm" />
                          <span className="break-words">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h5 className="text-[10px] font-black text-[#1D4A1A]/30 uppercase tracking-[0.25em] mb-5 flex items-center gap-2">
                      <div className="w-4 h-[1px] bg-[#1D4A1A]/20" /> Preparación
                    </h5>
                    <div className="space-y-6">
                      {viewingRecipe.recipe.steps ? viewingRecipe.recipe.steps.map((step: string, i: number) => (
                        <div key={i} className="flex gap-5 text-[15px] text-[#1D4A1A]/90 leading-relaxed">
                          <span className="font-black text-[#E8A020] text-lg leading-none">{i + 1}</span>
                          <p className="break-words">{step}</p>
                        </div>
                      )) : (
                        <p className="text-[15px] text-[#1D4A1A]/90 leading-relaxed break-words">{viewingRecipe.recipe.preparo}</p>
                      )}
                    </div>
                  </section>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-[#E8A020]/20 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#E8A020]" />
                  <h5 className="text-[10px] font-black text-[#E8A020] uppercase tracking-[0.2em] mb-3">
                    El Secreto Metabólico
                  </h5>
                  <p className="text-[15px] text-[#1D4A1A]/80 leading-relaxed italic break-words">
                    {viewingRecipe.recipe.whyItWorks}
                  </p>
                </div>

                {viewingRecipe.isToday && (
                  <div className="pt-8">
                    <button
                      onClick={() => {
                        onOpenDay(viewingRecipe.recipe.s, viewingRecipe.recipe.d);
                        setViewingRecipe(null);
                      }}
                      className="w-full py-4 bg-[#E8A020] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                    >
                      Ir al Protocolo para completar <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sales Modal for Sopas */}
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
              <div className="p-8 text-center text-white relative bg-[#D35400]">
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="w-20 h-20 bg-white/20 rounded-[32px] flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl backdrop-blur-md">
                  🍲
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">{MODULES_METADATA.sopas.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {MODULES_METADATA.sopas.desc}
                </p>
              </div>

              <div className="p-8">
                <h4 className="text-[10px] font-bold text-[#1D4A1A]/40 uppercase tracking-[0.2em] mb-4">
                  Beneficios Exclusivos
                </h4>
                <div className="space-y-3 mb-8">
                  {MODULES_METADATA.sopas.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1">
                        <CheckCircle2 className="w-4 h-4 text-[#D35400]" />
                      </div>
                      <span className="text-sm text-[#1D4A1A] font-medium leading-tight">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={MODULES_METADATA.sopas.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-3 shadow-lg transition-transform active:scale-95 bg-[#D35400]"
                >
                  {SPANISH_STRINGS.buy_now}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
