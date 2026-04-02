import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Send, Sparkles, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface SoporteIAProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
  userName?: string;
}

export const SoporteIA: React.FC<SoporteIAProps> = ({ onBack, onNavigate, userName }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: `¡Hola, ${userName || 'amiga'}! Soy tu asistente personal de Te Quemagrasas. Estoy aquí para que tu jornada sea más ligera y efectiva. ¿Qué necesitas ahora?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const options = [
    { 
      id: 'funcionamiento', 
      label: '📖 ¿Cómo funciona el protocolo?', 
      response: '¡Claro! Aquí tienes la información que necesitas... Es un viaje de 21 días para resetear tu metabolismo. Cada día tienes una guía clara aquí en el app.',
      action: null 
    },
    { 
      id: 'guia', 
      label: '📅 Ver mi guía de hoy', 
      response: '¡Excelente elección! Te llevo ahora mismo a tu guía del día...',
      action: () => setTimeout(() => onNavigate('plan'), 1500)
    },
    { 
      id: 'recetas', 
      label: '🥗 Mis recetas saludables', 
      response: '¡Claro que sí! Te llevo a descubrir las mejores recetas para tu metabolismo...',
      action: () => setTimeout(() => onNavigate('recipes'), 1500)
    },
    { 
      id: 'faq', 
      label: '❓ Dudas Frecuentes (FAQ)', 
      response: '¡Excelente! Aquí tienes las respuestas a las dudas más comunes...',
      action: () => setTimeout(() => onNavigate('faq'), 1500)
    },
    { 
      id: 'vitalicio', 
      label: '💎 Acceso Vitalicio', 
      response: '¡Esta es la mejor inversión para tu salud! El acceso vitalicio te permite mantener tus resultados para siempre, sin suscripciones ni pagos extra. Tendrás todas las actualizaciones futuras de regalo.',
      action: 'link'
    }
  ];

  const handleOptionClick = (option: typeof options[0]) => {
    if (isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: option.label }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: option.response }]);
      setIsLoading(false);
      
      if (option.action === 'link') {
        setTimeout(() => {
          window.open('https://pay.hotmart.com/example?checkoutMode=10', '_blank');
        }, 1000);
      } else if (typeof option.action === 'function') {
        option.action();
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F7FAF5]">
      <div className="bg-white p-6 flex items-center gap-4 border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-[#1A2E1A]" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#2E7D32]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1A2E1A]">Centro de Ayuda</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">En línea</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#2E7D32] text-white' : 'bg-white text-[#2E7D32] shadow-sm'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#2E7D32] text-white rounded-tr-none' : 'bg-white text-[#1A2E1A] shadow-sm rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-100 shrink-0">
        <div className="grid grid-cols-1 gap-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleOptionClick(opt)}
              disabled={isLoading}
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-xl text-sm font-medium text-gray-700 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
