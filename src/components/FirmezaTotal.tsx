import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Sparkles, 
  Zap, 
  Flame, 
  Droplets, 
  ArrowRight, 
  Info, 
  CheckCircle2 
} from 'lucide-react';
import { SPANISH_STRINGS } from '../constants';

interface FirmezaTotalProps {
  onBack: () => void;
}

export const FirmezaTotal: React.FC<FirmezaTotalProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'blends' | 'shots'>('blends');

  const blends = [
    { name: 'Blend Firmeza Extrema', ingredients: ['Té de Hibisco', 'Canela Ceylon', 'Jengibre', 'Pimienta'], desc: 'Drenaje profundo y elasticidad.' },
    { name: 'Blend Anti-Celulitis', ingredients: ['Diente de León', 'Cola de Caballo', 'Té Verde'], desc: 'Elimina toxinas y retención de líquidos.' },
    { name: 'Blend Regenerador', ingredients: ['Cúrcuma', 'Limón', 'Miel de Manuka'], desc: 'Repara tejidos y mejora la textura.' }
  ];

  const shots = [
    { name: 'Shot Metabólico AM', ingredients: ['Vinagre de Manzana', 'Limón', 'Cayena'], desc: 'Activa la quema de grasa en ayunas.' },
    { name: 'Shot Firmeza PM', ingredients: ['Colágeno Hidrolizado', 'Vitamina C', 'Agua de Coco'], desc: 'Soporte estructural durante el sueño.' },
    { name: 'Shot Detox Hígado', ingredients: ['Cardo Mariano', 'Boldo', 'Cúrcuma'], desc: 'Limpia el filtro principal de tu cuerpo.' }
  ];

  return (
    <div className="min-h-screen bg-[#F9F5F9] pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-6 flex items-center justify-between border-b border-[#7B3B6E]/5 sticky top-0 z-30 shadow-sm">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-[#F9F5F9] flex items-center justify-center text-[#7B3B6E]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-serif text-xl font-bold text-[#7B3B6E]">{SPANISH_STRINGS.firmeza}</h2>
        <div className="w-10" />
      </div>

      <div className="max-w-md mx-auto px-6 pt-8 space-y-8">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#7B3B6E] to-[#5C2A52] rounded-[48px] p-8 text-white relative overflow-hidden shadow-2xl shadow-[#7B3B6E]/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#F0C8E8]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C8E8]">Protocolo Premium</span>
            </div>
            <h3 className="font-serif text-3xl font-bold mb-4 leading-tight">
              Recupera la elasticidad de tu piel
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Combina blends concentrados con shots metabólicos para atacar la flacidez desde adentro hacia afuera.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#7B3B6E] bg-white/20 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium text-white/60">Pasos del protocolo</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white p-2 rounded-3xl flex gap-2 shadow-sm border border-[#7B3B6E]/5">
          <button
            onClick={() => setActiveTab('blends')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'blends' ? 'bg-[#7B3B6E] text-white shadow-lg' : 'text-[#7B3B6E]/60'
            }`}
          >
            Blends Concentrados
          </button>
          <button
            onClick={() => setActiveTab('shots')}
            className={`flex-1 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeTab === 'shots' ? 'bg-[#7B3B6E] text-white shadow-lg' : 'text-[#7B3B6E]/60'
            }`}
          >
            Shots Metabólicos
          </button>
        </div>

        {/* Content List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {(activeTab === 'blends' ? blends : shots).map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[32px] border border-[#7B3B6E]/5 shadow-sm group hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#F9F5F9] rounded-2xl flex items-center justify-center text-[#7B3B6E]">
                    {activeTab === 'blends' ? <Droplets className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[#F9F5F9] flex items-center justify-center text-[#7B3B6E] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <h4 className="text-lg font-bold text-[#1D4A1A] mb-2">{item.name}</h4>
                <p className="text-xs text-[#4A6741] mb-4 leading-relaxed">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, j) => (
                    <span key={j} className="px-3 py-1 bg-[#F9F5F9] text-[#7B3B6E] text-[10px] font-bold rounded-full border border-[#7B3B6E]/10">
                      {ing}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Tip Card */}
        <div className="bg-[#7B3B6E]/5 border border-[#7B3B6E]/10 rounded-[32px] p-6 flex gap-4">
          <div className="mt-1">
            <Info className="w-5 h-5 text-[#7B3B6E]" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#7B3B6E] mb-1">Tip de Firmeza</h5>
            <p className="text-xs text-[#7B3B6E]/80 leading-relaxed">
              Para mejores resultados, toma tu blend concentrado tibio y realiza masajes circulares en las zonas críticas durante 5 minutos al día.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
