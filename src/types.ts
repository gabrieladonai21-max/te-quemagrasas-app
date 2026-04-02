/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MetabolicType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  photoURL?: string;
  metabolicType?: MetabolicType;
  completedDays: string[]; // e.g., "S1D1", "S1D2"
  modulos: string[]; // e.g., "vitalicio", "ayuno", "firmeza", "sopas"
  chosenRecipes?: Record<string, { morning: number; night: number; bonus?: boolean }>;
  medals?: string[]; // IDs of earned medals
  isPremium?: boolean;
  isAdmin: boolean;
  createdAt: string;
  ingredientes_disponibles?: string[];
  ingredientes_popup_shown?: boolean;
  metabolicTypeLocked?: boolean;
  tipoConfirmado?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  time: number;
  temp: string;
  ingredients: string[];
  steps: string[];
  whyItWorks: string;
  benefits: string[];
  image: string;
  imageKey?: string;
}

export interface BonusRecipe {
  nome: string;
  categoria: string;
  horario: string;
  ingredientes: string[];
  preparo: string;
  beneficio: string;
  image?: string;
}

export interface DayRecipes {
  morning: Recipe[];
  night: Recipe[];
  bonus?: BonusRecipe;
}

export interface MetabolicInfo {
  name: string;
  icon: string; // SVG path or component name
  short: string;
  sems: string[];
  colors: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  keyword: string;
  fastingWindow: string;
  emblem: string; // SVG string
}
