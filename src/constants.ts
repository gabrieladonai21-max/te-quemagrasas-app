/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetabolicInfo, MetabolicType } from './types';

// Gamificación de niveles
export const NIVEL_EMBLEMAS = {
  1: '🌱',
  2: '🔥',
  3: '⚡',
};

export const NIVEL_NOMBRES_GAMIFICADOS: Record<MetabolicType, string[]> = {
  A: ['Despertar Verde', 'Llama Interior', 'Fuerza Vital'],
  B: ['Raíz Profunda', 'Brote Fuerte', 'Árbol Poderoso'],
  C: ['Semilla Dorada', 'Sol Naciente', 'Luz Radiante'],
  D: ['Gota de Vida', 'Río Fluido', 'Océano Infinito'],
  E: ['Chispa Inicial', 'Fuego Creciente', 'Volcán Imparable'],
  F: ['Brisa Suave', 'Viento Libre', 'Huracán Transformador'],
};

export const METABOLIC_TYPES: Record<MetabolicType, MetabolicInfo> = {
  A: {
    name: 'Metabólico Insulínico',
    icon: 'M12 2a10 10 0 0 1 7.39 16.74M12 22a10 10 0 0 1-7.39-16.74 M12 6v6l4 2',
    short: 'Insulínico',
    sems: ['⚡ Activación Metabólica', '🔥 Quema Activa', '💪 Consolidación Total'],
    colors: {
      primary: '#2E6B4F',
      secondary: '#A8D5B5',
      gradient: 'linear-gradient(135deg, #1A4A32, #2E6B4F)'
    },
    keyword: 'Activación Metabólica',
    fastingWindow: '16:8',
    emblem: `<svg viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="#2E6B4F"/>
  <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
  <text x="24" y="22" textAnchor="middle" dominantBaseline="central" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="800" fill="white">A</text>
  <path d="M24 30v4m0 0h2m-2 0h-2" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  <circle cx="24" cy="34" r="3" fill="none" stroke="white" stroke-width="1.5" opacity="0.7"/>
</svg>`
  },
  B: {
    name: 'Metabólico Cortisólico',
    icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    short: 'Cortisólico',
    sems: ['🌿 Calma Activa', '🧠 Regulación Profunda', '✨ Equilibrio Total'],
    colors: {
      primary: '#7B4A2D',
      secondary: '#FADBD8',
      gradient: 'linear-gradient(135deg, #5C321D, #7B4A2D)'
    },
    keyword: 'Equilibrio Cortisólico',
    fastingWindow: '14:10',
    emblem: `<svg viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="#7B4A2D"/>
  <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
  <text x="24" y="22" textAnchor="middle" dominantBaseline="central" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="800" fill="white">B</text>
  <path d="M22 32l4 4l-2 4l6-6l-4-4l2-4z" fill="white" opacity="0.7"/>
</svg>`
  },
  C: {
    name: 'Metabólico Estrogénico',
    icon: 'M12 2c0 0-8 8-8 13a8 8 0 0 0 16 0c0-5-8-13-8-13z M12 15a3 3 0 0 0 3-3',
    short: 'Estrogénico',
    sems: ['🌊 Drenaje y Detox', '⚖️ Equilibrio Hormonal', '💎 Firmeza Total'],
    colors: {
      primary: '#7B3B6E',
      secondary: '#F0C8E8',
      gradient: 'linear-gradient(135deg, #5C2A52, #7B3B6E)'
    },
    keyword: 'Drenaje Hormonal',
    fastingWindow: '14:10',
    emblem: `<svg viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="#7B3B6E"/>
  <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
  <text x="24" y="22" textAnchor="middle" dominantBaseline="central" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="800" fill="white">C</text>
  <path d="M24 32c0 0-4 4-4 6.5s1.8 4.5 4 4.5 4-2 4-4.5-4-6.5-4-6.5z" fill="white" opacity="0.7"/>
</svg>`
  },
  D: {
    name: 'Metabólico Tiroideo',
    icon: 'M12 22c4 0 7-3.5 7-7.5 0-3-1.5-5-3-7-1 2-1.5 3-3 4-1-2-2-4-1-7C9 6 5 9.5 5 14.5c0 4 3 7.5 7 7.5z M12 17a2.5 2.5 0 0 0 2.5-2.5c0-1.5-2.5-4-2.5-4s-2.5 2.5-2.5 4A2.5 2.5 0 0 0 12 17z',
    short: 'Tiroideo',
    sems: ['🔥 Despertar Metabólico', '⚡ Activación Tiroidea', '🚀 Metabolismo Encendido'],
    colors: {
      primary: '#2D5A8E',
      secondary: '#B8D4F5',
      gradient: 'linear-gradient(135deg, #1A3A5C, #2D5A8E)'
    },
    keyword: 'Activación Tiroidea',
    fastingWindow: '12:12',
    emblem: `<svg viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="#2D5A8E"/>
  <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
  <text x="24" y="22" textAnchor="middle" dominantBaseline="central" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="800" fill="white">D</text>
  <path d="M24 30c-4 0-6 4-6 8s2 6 6 6 6-2 6-6-2-8-6-8z" fill="white" opacity="0.7"/>
</svg>`
  },
  E: {
    name: 'Metabólico Hepático-Visceral',
    icon: 'M12 22V12M12 12C12 8 16 4 20 4c0 4-2 8-8 8zM12 12C12 8 8 4 4 4c0 4 2 8 8 8z',
    short: 'Hepático',
    sems: ['🍃 Limpieza Hepática', '💊 Desinflamación Profunda', '🌟 Regeneración Visceral'],
    colors: {
      primary: '#D35400',
      secondary: '#F5CBA7',
      gradient: 'linear-gradient(135deg, #A04000, #D35400)'
    },
    keyword: 'Regeneración Hepática',
    fastingWindow: '16:8',
    emblem: `<svg viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="#D35400"/>
  <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
  <text x="24" y="22" textAnchor="middle" dominantBaseline="central" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="800" fill="white">E</text>
  <path d="M24 32c-4 0-6 2-6 6s2 6 6 6 6-2 6-6-2-6-6-6z" fill="white" opacity="0.7"/>
</svg>`
  },
  F: {
    name: 'Metabólico Mixto-Oxidativo',
    icon: 'M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z M12 12c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z',
    short: 'Mixto',
    sems: ['🎯 Calibración Metabólica', '⚡ Flexibilidad Activa', '🏆 Optimización Total'],
    colors: {
      primary: '#1D6A6A',
      secondary: '#B0E8E8',
      gradient: 'linear-gradient(135deg, #0F4A4A, #1D6A6A)'
    },
    keyword: 'Flexibilidad Metabólica',
    fastingWindow: '15:9',
    emblem: `<svg viewBox="0 0 48 48" width="48" height="48">
  <circle cx="24" cy="24" r="22" fill="#1D6A6A"/>
  <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
  <text x="24" y="22" textAnchor="middle" dominantBaseline="central" fontFamily="Inter,sans-serif" fontSize="18" fontWeight="800" fill="white">F</text>
  <path d="M18 36c0-3 3-3 6-3s6 0 6 3-3 3-6 3-6 0-6-3z" fill="white" opacity="0.7"/>
</svg>`
  },
};

export const LEVEL_NAMES: Record<MetabolicType, string[]> = {
  A: ['RESET', 'QUEMA', 'PEAK'],
  B: ['CALMA', 'FLOW', 'BALANCE'],
  C: ['DRAIN', 'PURIFY', 'GLOW'],
  D: ['IGNITE', 'BURN', 'BLAZE'],
  E: ['CLEANSE', 'RESTORE', 'RENEW'],
  F: ['SYNC', 'ADAPT', 'OPTIMIZE'],
};

export const NIVELES = [
  { ico: '⚡', name: 'Activación Detox', days: 'Días 1–7' },
  { ico: '🔥', name: 'Quema Activa', days: 'Días 8–14' },
  { ico: '💪', name: 'Consolidación Total', days: 'Días 15–21' },
  { ico: '🚀', name: 'Aceleración Máxima', days: 'Días 22–28' },
  { ico: '💎', name: 'Definición Profunda', days: 'Días 29–35' },
  { ico: '🏆', name: 'Mantenimiento Vital', days: 'Días 36–42' },
];

export const DNAMES = [
  'Despertar Metabólico', 'Activación Profunda', 'Equilibrio Interior', 'Fuego Interno', 'Regeneración Celular', 'Pureza y Energía', 'Cierre del Nivel 1',
  'Nueva Intensidad', 'Quema Activa', 'Aceleración Natural', 'Desinflamación Total', 'Potencia Natural', 'Renovación Interna', 'Cierre del Nivel 2',
  'Consolidación Máxima', 'Transformación Definitiva', 'Flexibilidad Metabólica', 'Energía Sostenida', 'Equilibrio Perfecto', 'Detox Final', '¡El Gran Cierre 21!'
];

export const MODULES_METADATA = {
  vitalicio: {
    id: 'vitalicio',
    title: 'Acceso Vitalicio',
    desc: 'Semanas 4-6 y actualizaciones permanentes.',
    benefits: ['Acceso a semanas 4, 5 y 6', 'Actualizaciones de por vida', 'Soporte prioritario'],
    link: 'https://pay.hotmart.com/K104977165V',
    proximamente: false,
    color: '#E8A020'
  },
  ayuno: {
    id: 'ayuno',
    title: 'Ayuno Inteligente',
    desc: 'Potencia tu quema de grasa con ayuno estratégico.',
    benefits: ['Timer circular de ayuno', 'Guía de tés permitidos', 'Historial de progresos'],
    link: '#',
    proximamente: true,
    color: '#2E7D32'
  },
  firmeza: {
    id: 'firmeza',
    title: 'Protocolo Firmeza Total',
    desc: 'Blends concentrados y shots para celulitis y flacidez.',
    benefits: ['Recetas de Blends Concentrados', 'Guía de Shots Metabólicos', 'Protocolo de piel firme'],
    link: '#',
    proximamente: true,
    color: '#7B3B6E'
  },
  sopas: {
    id: 'sopas',
    title: 'Sopas Termogénicas',
    desc: '7 recetas exclusivas para acelerar tu metabolismo.',
    benefits: ['7 Recetas de Sopas Quemagrasas', 'Guía de preparación paso a paso', 'Ingredientes termogénicos'],
    link: 'https://pay.hotmart.com/E104977226Q',
    proximamente: false,
    color: '#D35400'
  }
};

export const SPANISH_STRINGS = {
  activate: "Activa tu metabolismo",
  firmeza: "Protocolo Firmeza Total",
  ayuno: "Ayuno Inteligente",
  activated: "Tu perfil metabólico ha sido activado",
  available_after: "Disponible cuando completes el Nivel 3",
  confirm_selection: "¿Estás seguro? Esta elección es definitiva y no puede cambiarse sin Acceso Vitalicio.",
  buy_now: "Comprar ahora",
  daily_bonus: "Bono del Día"
};

export const SOPAS_RECIPES = [
  { 
    id: 'sopa1', 
    name: 'Sopa de Calabaza y Jengibre', 
    desc: 'Termogénica y saciante', 
    category: 'Termogénica',
    image: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sopa-de-calabaza-y-jengibre.jpg',
    ingredients: ['Calabaza', 'Jengibre', 'Caldo vegetal', 'Aceite coco'],
    steps: [
      'Cortar calabaza en cubos',
      'Sofreír jengibre rallado',
      'Agregar calabaza y caldo',
      'Cocinar 20min y licuar',
    ],
    whyItWorks: 'El jengibre acelera metabolismo mientras la calabaza aporta fibra saciante.',
    time: 25,
    temp: 'Caliente'
  },
  { 
    id: 'sopa2', 
    name: 'Crema de Brócoli y Cúrcuma', 
    desc: 'Antiinflamatoria y detox', 
    category: 'Termogénica',
    image: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/crema-de-brocoli-y-curcuma.jpg',
    ingredients: ['Brócoli', 'Cúrcuma', 'Caldo vegetal', 'Ajo'],
    steps: [
      'Cocinar brócoli al vapor',
      'Agregar cúrcuma y ajo',
      'Licuar con caldo caliente',
      'Servir con pimienta negra',
    ],
    whyItWorks: 'Cúrcuma antiinflamatorio potenciado con brócoli desintoxicante.',
    time: 20,
    temp: 'Caliente'
  },
  { 
    id: 'sopa3', 
    name: 'Sopa de Lentejas y Comino', 
    desc: 'Proteica y activadora', 
    category: 'Termogénica',
    image: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sopa-de-lentejas-y-comino.jpg',
    ingredients: ['Lentejas', 'Comino', 'Cebolla', 'Zanahoria'],
    steps: [
      'Hervir lentejas',
      'Sofreír cebolla y zanahoria',
      'Agregar comino',
      'Mezclar y cocinar',
    ],
    whyItWorks: 'Las lentejas aportan proteína y el comino activa la digestión.',
    time: 30,
    temp: 'Caliente'
  },
  { 
    id: 'sopa4', 
    name: 'Sopa de Tomate y Albahaca', 
    desc: 'Ligera y antioxidante', 
    category: 'Termogénica',
    image: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sopa-de-tomate-y-albahaca.jpg',
    ingredients: ['Tomate', 'Albahaca', 'Ajo', 'Aceite de oliva'],
    steps: [
      'Asar tomates y ajo',
      'Licuar con albahaca fresca',
      'Calentar y servir',
    ],
    whyItWorks: 'El licopeno del tomate es un potente antioxidante.',
    time: 15,
    temp: 'Caliente'
  },
  { 
    id: 'sopa5', 
    name: 'Sopa de Espinacas y Ajo', 
    desc: 'Hierro y energía pura', 
    category: 'Termogénica',
    image: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sopa-de-espinacas-y-ajo.jpg',
    ingredients: ['Espinacas', 'Ajo', 'Cebolla', 'Papas'],
    steps: [
      'Saltear ajo y cebolla',
      'Añadir papas y caldo',
      'Agregar espinacas al final',
      'Licuar',
    ],
    whyItWorks: 'El hierro de las espinacas mejora el transporte de oxígeno.',
    time: 20,
    temp: 'Caliente'
  },
  { 
    id: 'sopa6', 
    name: 'Sopa de Zanahoria y Coco', 
    desc: 'Grasas saludables y quema', 
    category: 'Termogénica',
    image: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sopa-de-zanahoria-y-coco.jpg',
    ingredients: ['Zanahoria', 'Leche de coco', 'Cúrcuma', 'Jengibre'],
    steps: [
      'Cocinar zanahorias',
      'Licuar con leche de coco',
      'Agregar especias',
      'Calentar',
    ],
    whyItWorks: 'Las grasas del coco ayudan a la absorción de nutrientes.',
    time: 25,
    temp: 'Caliente'
  },
  { 
    id: 'sopa7', 
    name: 'Sopa de Champiñones y Tomillo', 
    desc: 'Sabor intenso y saciedad', 
    category: 'Termogénica',
    image: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sopa-de-champinones-y-tomillo.jpg',
    ingredients: ['Champiñones', 'Tomillo', 'Cebolla', 'Caldo vegetal'],
    steps: [
      'Saltear champiñones y cebolla',
      'Agregar tomillo y caldo',
      'Cocinar a fuego lento',
      'Opcional: licuar',
    ],
    whyItWorks: 'Los champiñones son bajos en calorías y muy saciantes.',
    time: 20,
    temp: 'Caliente'
  }
];

export const FRASES = [
  '"El cuerpo logra lo que la mente cree."',
  '"Cada sorbo de té es un acto de amor propio."',
  '"Los pequeños hábitos crean grandes transformaciones."',
  '"Tu metabolismo es tu aliado, no tu enemigo."',
  '"La constancia supera al talento."',
  '"Un día a la vez, un té a la vez."',
  '"Invertir en tu salud es la mejor inversión."',
  '"Hoy es un día perfecto para cuidarte."',
];

export const WEEK_INTRODUCTIONS: Record<string, Record<number, { name: string; description: string; goal: string }>> = {
  A: {
    1: {
      name: "Nivel 1: Despertar Insulínico",
      description: "Esta semana le enseñas a tu cuerpo a reconocer la insulina de nuevo. Cada té actúa como un reset metabólico gradual: el té verde activa las enzimas de oxidación de grasa, la canela estabiliza tu glucosa y el jengibre despierta tu termogénesis dormida. No esperes resultados visibles todavía — esta semana es la base. Sin base, no hay transformación.",
      goal: "Reducir el antojo de dulce a media tarde"
    },
    2: {
      name: "Nivel 2: Quema Activa",
      description: "La base metabólica ya está establecida. Ahora intensificamos. El fenogreco entra en escena para frenar la absorción de carbohidratos mientras el té verde y la canela trabajan con más concentración. Tu cuerpo ya está preparado para responder. Esta semana empezarás a ver la diferencia en el espejo y en cómo te queda la ropa.",
      goal: "Reducción visible en el contorno de cintura"
    },
    3: {
      name: "Nivel 3: Consolidación Insulínica",
      description: "Has llegado a la fase final de reprogramación. Tu sensibilidad a la insulina está en su punto óptimo. Ahora consolidamos estos cambios para que tu metabolismo trabaje a tu favor de forma permanente. La disciplina de estas semanas se convierte en tu nuevo estándar de bienestar.",
      goal: "Mantener niveles de energía estables todo el día"
    },
    4: {
      name: "Nivel 4: Aceleración Metabólica II",
      description: "Iniciamos la segunda fase de tu transformación. Ahora que tu base es sólida, desafiamos al metabolismo con nuevas combinaciones para evitar el estancamiento y seguir quemando grasa de forma eficiente.",
      goal: "Aumentar la tasa metabólica basal"
    },
    5: {
      name: "Nivel 5: Definición Avanzada",
      description: "Nos enfocamos en la grasa más rebelde. Tu cuerpo ya es una máquina de quemar grasa; ahora afinamos los detalles para una definición muscular y estética superior.",
      goal: "Eliminar grasa localizada persistente"
    },
    6: {
      name: "Nivel 6: Estilo de Vida Vitalicio",
      description: "Consolidamos los 42 días de transformación. Este nivel es el puente hacia tu nuevo estilo de vida, donde mantener tu peso ideal es natural y sin esfuerzo.",
      goal: "Autonomía metabólica completa"
    }
  },
  B: {
    1: {
      name: "Nivel 1: Calma Activa",
      description: "Tu cortisol elevado está convirtiendo cada caloría en grasa abdominal dura. Esta semana tu protocolo no es quemar — es calmar. La ashwagandha y la melissa trabajan sobre el eje HPA, la raíz bioquímica de tu problema. El cambio en la barriga solo ocurre cuando el cortisol baja primero. Esta semana es tu semana de regulación.",
      goal: "Dormir sin despertarte a las 3am"
    },
    2: {
      name: "Nivel 2: Regulación Profunda",
      description: "El eje del estrés empezó a calmarse en la semana 1. Ahora profundizamos con rhodiola, que mejora la resiliencia al estrés a nivel celular. La barriga cortisólica empieza a responder solo cuando el cortisol nocturno lleva varios días controlado. Esta semana es esa semana. Sigue el protocolo nocturno sin fallar.",
      goal: "Barriga más blanda al despertar"
    },
    3: {
      name: "Nivel 3: Equilibrio Total",
      description: "Tu sistema nervioso ha encontrado su centro. En esta fase final, sellamos la regulación del cortisol. Notarás no solo cambios físicos, sino una claridad mental y una paz que antes te faltaban. Tu cuerpo ya no necesita almacenar grasa por 'emergencia'.",
      goal: "Sentir control total sobre las respuestas al estrés"
    },
    4: {
      name: "Nivel 4: Resiliencia Metabólica",
      description: "Tu cuerpo ya no reacciona al estrés acumulando grasa. Ahora fortalecemos tu sistema para que sea capaz de procesar cualquier desafío sin perder el equilibrio metabólico.",
      goal: "Mantener la calma en situaciones de alta demanda"
    },
    5: {
      name: "Nivel 5: Optimización Hormonal",
      description: "Ajustamos los ritmos circadianos y la respuesta hormonal profunda. Tu sueño es reparador y tu energía es constante, permitiendo una quema de grasa ininterrumpida.",
      goal: "Optimizar el ciclo de descanso y quema"
    },
    6: {
      name: "Nivel 6: Blindaje Cortisólico",
      description: "Has dominado tu metabolismo. Este nivel final asegura que tu cuerpo mantenga este estado de paz y eficiencia de por vida, sin importar las circunstancias externas.",
      goal: "Estabilidad emocional y física permanente"
    }
  },
  C: {
    1: {
      name: "Nivel 1: Gran Drenaje",
      description: "La retención que sientes no es grasa — es el resultado de un hígado que no elimina el estrógeno de manera eficiente. Esta semana tu protocolo trabaja en dos frentes: drenar el sistema linfático con diente de león y cola de caballo, y apoyar la depuración hepática con cardo mariano. Verás reducción de hinchazón antes de ver reducción de peso. Eso es señal de que funciona.",
      goal: "Sentir el vientre menos hinchado al despertar"
    },
    2: {
      name: "Nivel 2: Equilibrio Hormonal",
      description: "El sistema de drenaje está activo. Ahora trabajamos el equilibrio hormonal desde el hígado. La alcachofra e hibisco entran con más protagonismo para inhibir la reabsorción de estrógeno desde el intestino. La celulitis responde más despacio que la retención — pero ya está respondiendo.",
      goal: "Menos sensibilidad en senos y piernas"
    },
    3: {
      name: "Nivel 3: Firmeza y Liberación",
      description: "Con el sistema hormonal equilibrado, nos enfocamos en la firmeza de los tejidos. Tu cuerpo ha liberado la carga tóxica y el exceso de líquidos. Ahora consolidamos una estructura más limpia y definida. Es el momento de brillar con tu nueva ligereza.",
      goal: "Piel más firme y reducción de celulitis visible"
    },
    4: {
      name: "Nivel 4: Esculpido Metabólico",
      description: "Sin retención, empezamos a esculpir. Los blends de esta fase están diseñados para mejorar la elasticidad de la piel y la densidad del tejido conectivo.",
      goal: "Mejorar la textura y tono de la piel"
    },
    5: {
      name: "Nivel 5: Detox Profundo II",
      description: "Realizamos una limpieza a nivel celular para asegurar que no queden residuos metabólicos que puedan causar inflamación futura. Tu cuerpo se siente más ligero que nunca.",
      goal: "Claridad sistémica y ligereza total"
    },
    6: {
      name: "Nivel 6: Brillo Vitalicio",
      description: "Tu transformación de 42 días llega a su punto máximo. Has liberado lo que no te servía y has construido una base hormonal sólida y radiante.",
      goal: "Mantener la silueta definida y saludable"
    }
  },
  D: {
    1: {
      name: "Nivel 1: Encendido Tiroideo",
      description: "Tu metabolismo está en modo ahorro: tu cuerpo quema menos de lo que debería porque tu tiroides no está recibiendo el soporte correcto. Esta semana los tés termogénicos — especialmente el jengibre caliente y la cayena — empiezan a activar la conversión de T4 en T3 activa. Es un proceso gradual. Toma los tés calientes. Siempre calientes.",
      goal: "Sentir menos frío en manos y pies"
    },
    2: {
      name: "Nivel 2: Activación Sostenida",
      description: "Tu termogénesis ya está despertando. Esta semana aumentamos la intensidad: más jengibre, más cayena, y añadimos cúrcuma que potencia la conversión tiroídea. Los cambios son más visibles ahora — especialmente en la energía matinal y la tolerancia al frío.",
      goal: "Energía sostenida hasta las 15h sin cafeína"
    },
    3: {
      name: "Nivel 3: Metabolismo Encendido",
      description: "Tu 'horno' interno está funcionando a pleno rendimiento. En esta fase final, aseguramos que esta velocidad metabólica se mantenga. Te sentirás más vital, con un pensamiento más ágil y una capacidad de quema calórica que antes parecía imposible.",
      goal: "Temperatura corporal estable y vitalidad alta"
    },
    4: {
      name: "Nivel 4: Turbo Metabólico",
      description: "Llevamos tu metabolismo a un nuevo nivel de eficiencia. Los blends de esta fase potencian la producción de energía mitocondrial para una quema de grasa sin precedentes.",
      goal: "Aumentar la vitalidad y el gasto calórico"
    },
    5: {
      name: "Nivel 5: Activación Celular",
      description: "Nos enfocamos en la salud de tus células para que respondan instantáneamente a las demandas de energía. Tu cuerpo procesa los nutrientes con una velocidad asombrosa.",
      goal: "Optimizar la respuesta energética celular"
    },
    6: {
      name: "Nivel 6: Energía Vitalicia",
      description: "Has completado los 42 días. Tu tiroides y tu metabolismo están en perfecta sintonía, garantizando energía y peso estable para tu nueva vida.",
      goal: "Mantener el 'fuego' interno siempre encendido"
    }
  },
  E: {
    1: {
      name: "Nivel 1: Limpieza Profunda",
      description: "La grasa visceral que tienes no es solo un problema estético — es un indicador de que tu hígado está sobrecargado. Esta semana tu protocolo ataca directamente la raíz: cúrcuma con pimienta negra reduce la inflamación hepática, el cardo mariano regenera los hepatocitos y el boldo nocturno estimula la bilis para eliminar la grasa acumulada. La digestión mejora antes que el peso.",
      goal: "Digestión más liviana después del almuerzo"
    },
    2: {
      name: "Nivel 2: Desinflamación Visceral",
      description: "El hígado ya está recibiendo soporte. Esta semana la alcachofra se suma con más protagonismo para estimular la producción biliar y la eliminación de colesterol oxidado — el combustible de la grasa visceral. La barriga alta empieza a ceder.",
      goal: "Menos gases y sensación de ligereza post-almuerzo"
    },
    3: {
      name: "Nivel 3: Regeneración Completa",
      description: "Tu filtro principal, el hígado, está renovado. La inflamación sistémica ha bajado drásticamente. Ahora tu cuerpo puede procesar las grasas de forma eficiente sin almacenarlas alrededor de tus órganos. Disfruta de esta nueva vitalidad desde adentro hacia afuera.",
      goal: "Vientre plano y digestión perfecta"
    },
    4: {
      name: "Nivel 4: Depuración Hepática II",
      description: "Continuamos la limpieza profunda. Esta fase elimina las grasas más antiguas y resistentes almacenadas en el tejido visceral, liberando tu abdomen.",
      goal: "Reducción drástica de la circunferencia abdominal"
    },
    5: {
      name: "Nivel 5: Protección Metabólica",
      description: "Fortalecemos las funciones de filtrado de tu cuerpo. Tu hígado ahora es capaz de neutralizar toxinas antes de que causen inflamación o almacenamiento de grasa.",
      goal: "Inmunidad metabólica y digestión óptima"
    },
    6: {
      name: "Nivel 6: Pureza Vitalicia",
      description: "42 días de regeneración. Tu sistema digestivo y hepático funcionan como nuevos. Has recuperado la salud desde la raíz metabólica.",
      goal: "Salud visceral y bienestar permanente"
    }
  },
  F: {
    1: {
      name: "Nivel 1: Calibración Metabólica",
      description: "Tu metabolismo mezcla señales — a veces quema bien, a veces no. Esa irregularidad es el problema central. Esta semana vamos a calibrarlo: el té verde activa AMPK (la enzima que regula cómo tu cuerpo usa energía), la canela estabiliza la glucosa y la manzanilla nocturna restaura el ritmo circadiano que determina cuándo y cómo quemas. Regularidad es la clave.",
      goal: "Tener energía estable sin picos ni caídas"
    },
    2: {
      name: "Nivel 2: Flexibilidad Activa",
      description: "La calibración de la semana 1 creó las condiciones. Ahora activamos la flexibilidad metabólica de verdad: concentraciones más altas de EGCG y curcumina para optimizar las mitocondrias. Tu cuerpo ya sabe alternar fuentes de energía — ahora lo reforzamos.",
      goal: "Dormir de corrido sin despertarse a mitad de la noche"
    },
    3: {
      name: "Nivel 3: Optimización Total",
      description: "Tu cuerpo es ahora una máquina eficiente y flexible. Puede usar tanto carbohidratos como grasas como combustible sin drama. Has alcanzado el equilibrio metabólico superior donde la energía fluye de manera constante y natural.",
      goal: "Máximo rendimiento físico y mental"
    },
    4: {
      name: "Nivel 4: Flexibilidad Avanzada",
      description: "Entramos en la fase de maestría metabólica. Tu cuerpo ahora se adapta instantáneamente a diferentes tipos de nutrientes, optimizando la quema en cada momento.",
      goal: "Adaptabilidad energética superior"
    },
    5: {
      name: "Nivel 5: Sincronización Celular",
      description: "Ajustamos los relojes biológicos de cada célula para que trabajen en armonía. Tu quema de grasa nocturna y tu energía diurna están perfectamente alineadas.",
      goal: "Armonía metabólica total"
    },
    6: {
      name: "Nivel 6: Maestría Vitalicia",
      description: "Has completado el ciclo de 42 días. Eres dueño de tu metabolismo. Tu cuerpo es flexible, eficiente y está preparado para mantener este estado de salud para siempre.",
      goal: "Control metabólico absoluto y duradero"
    }
  }
};
