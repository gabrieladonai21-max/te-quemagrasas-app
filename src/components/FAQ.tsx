import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FAQProps {
  onBack: () => void;
}

const FAQS = [
  {
    q: "¿Puedo endulzar los tés?",
    a: "Lo ideal es consumirlos puros para no activar la respuesta insulínica. Si es necesario, usa una pizca de Stevia pura o Eritritol, pero evita la miel o azúcar."
  },
  {
    q: "¿Qué pasa si me salto un día?",
    a: "No te preocupes, retoma el protocolo en el día que te corresponde. La constancia es clave, pero un desliz no arruina todo el proceso."
  },
  {
    q: "¿Puedo tomar café?",
    a: "Sí, pero intenta que sea café negro sin azúcar y fuera de las ventanas de los tés principales para no interferir con la absorción de las catequinas."
  },
  {
    q: "¿Los tés rompen el ayuno?",
    a: "Los tés de este protocolo están diseñados para ser consumidos en ayunas sin romper el estado de autofagia, siempre que no añadas leche o endulzantes calóricos."
  },
  {
    q: "¿Puedo hacer ejercicio?",
    a: "¡Claro! De hecho, el té verde antes del ejercicio potencia la oxidación de grasas. Escucha a tu cuerpo y mantente hidratada."
  }
];

export const FAQ: React.FC<FAQProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = FAQS.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7FAF5] pb-24">
      <div className="bg-white p-6 flex items-center gap-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#1A2E1A]" />
        </button>
        <h1 className="text-xl font-bold text-[#1A2E1A]">Preguntas Frecuentes</h1>
      </div>

      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar duda..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm outline-none focus:border-[#2E7D32] transition-colors"
          />
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left"
              >
                <span className="font-bold text-[#1A2E1A] pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-[#2E7D32]/5 rounded-[24px] border border-[#2E7D32]/10 text-center">
          <HelpCircle className="w-8 h-8 text-[#2E7D32] mx-auto mb-3" />
          <h3 className="font-bold text-[#1A2E1A] mb-1">¿Aún tienes dudas?</h3>
          <p className="text-sm text-gray-600 mb-4">Nuestro soporte inteligente está disponible 24/7 para ayudarte.</p>
          <button className="text-[#2E7D32] font-bold text-sm underline">Hablar con el Centro de Ayuda</button>
        </div>
      </div>
    </div>
  );
};
