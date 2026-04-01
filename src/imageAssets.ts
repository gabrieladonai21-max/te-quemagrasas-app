/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const IMAGE_ASSETS = {
  ingredients: {
    'té verde': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80&fit=crop',
    'canela': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&q=80&fit=crop',
    'jengibre': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80&fit=crop',
    'hibisco': 'https://images.unsplash.com/photo-1563911892437-1feda0179f1b?w=600&q=80&fit=crop',
    'curcuma': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&fit=crop',
    'ashwagandha': 'https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?w=600&q=80&fit=crop',
    'valeriana': 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=600&q=80&fit=crop',
    'melissa': 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80&fit=crop',
    'boldo': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop',
    'sopas': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&fit=crop',
  },
  ui: {
    splash: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80&auto=format&fit=crop',
    placeholder: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80&auto=format&fit=crop',
  },
  medals: {
    bronze: 'https://cdn-icons-png.flaticon.com/512/2583/2583319.png',
    silver: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
    gold: 'https://cdn-icons-png.flaticon.com/512/2583/2583351.png',
  }
};

// MEDALHAS DE NÍVEIS
export const LEVEL_MEDALS = {
  // Níveis do protocolo (1-3) - Desbloqueáveis
  nivel1: 'https://i.ibb.co/9k8HggQZ/Medalha-N-vel-1-Despertar-Activation-Detox.png',
  nivel2: 'https://i.ibb.co/7tMmYstL/Medalha-N-vel-2-Activaci-n.png',
  nivel3: 'https://i.ibb.co/DPsK2Xjj/Medalha-Nivel-3-Consolidaci-n-Total.png',
  
  // Níveis upsell (4-6) - Bloqueados (blur/opaco)
  nivel4: 'https://i.ibb.co/5xvjs6dJ/N-vel-4-Aceleraci-n-M-xima.png',
  nivel5: 'https://i.ibb.co/cSm8Nxfn/N-vel-5-Definici-n-Profunda.png',
  nivel6: 'https://i.ibb.co/BVXJw8Lj/N-vel-6-Mantenimiento-Vital.png',
};

// Função helper
export const getLevelMedal = (level: number): string => {
  const medals: Record<number, string> = {
    1: LEVEL_MEDALS.nivel1,
    2: LEVEL_MEDALS.nivel2,
    3: LEVEL_MEDALS.nivel3,
    4: LEVEL_MEDALS.nivel4,
    5: LEVEL_MEDALS.nivel5,
    6: LEVEL_MEDALS.nivel6,
  };
  return medals[level] || medals[1];
};

// ÍCONES TIPOS METABÓLICOS
export const METABOLIC_ICONS = {
  A: 'https://i.ibb.co/GQcj3X8k/Tipo-A.png',
  B: 'https://i.ibb.co/Fbbcf9XQ/Tipo-B.png',
  C: 'https://i.ibb.co/JFm0NrnL/Tipo-C.png',
  D: 'https://i.ibb.co/Zzc31dTM/Tipo-D.png',
  E: 'https://i.ibb.co/q3VHj4sr/Tipo-E.png',
  F: 'https://i.ibb.co/FLTwbzyZ/Tipo-F.png',
};

export const getMetabolicIcon = (tipo: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'): string => {
  return METABOLIC_ICONS[tipo] || METABOLIC_ICONS.A;
};

// LOGOS
export const LOGOS = {
  favicon: 'https://i.ibb.co/kV57ppRY/Flavicon.png',
  pwa: 'https://i.ibb.co/pv99XjXM/cone-do-App-PWA.png',
  horizontal: 'https://i.ibb.co/TMtRGHQq/Logo-Principal-Horizontal.png',
  vertical: 'https://i.ibb.co/ymsJgF1x/Logo-Redonda-Avatar.png',
};
