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
    sopas: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sopa-de-calabaza-y-jengibre.jpg',
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
  nivel1: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/medalha-nivel-1-despertar-activation-detox.png',
  nivel2: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/medalha-nivel-2-activacion.png',
  nivel3: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/medalha-nivel-3-consolidacion-total.png',
  
  // Níveis upsell (4-6) - Bloqueados (blur/opaco)
  nivel4: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/nivel-4-aceleracion-maxima.png',
  nivel5: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/nivel-5-definicion-profunda.png',
  nivel6: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/nivel-6-mantenimiento-vital.png',
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
  A: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/tipo-a.png',
  B: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/tipo-b.png',
  C: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/tipo-c.png',
  D: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/tipo-d.png',
  E: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/tipo-e.png',
  F: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/tipo-f.png',
};

export const getMetabolicIcon = (tipo: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'): string => {
  return METABOLIC_ICONS[tipo] || METABOLIC_ICONS.A;
};

// LOGOS
export const LOGOS = {
  favicon: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/Flavicon.png',
  pwa: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/icone%20do-app-pwa.png',
  horizontal: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/logo-principal-horizontal.png',
  vertical: 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/assets/logo-redonda-avatar.png',
};
