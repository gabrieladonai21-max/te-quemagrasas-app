/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DayRecipes, MetabolicType, Recipe, BonusRecipe } from '../types';
import { IMAGE_ASSETS } from '../imageAssets';

export function getRecipeImage(name: string, ingredientePrincipal?: string): string {
  const key = (ingredientePrincipal || name).toLowerCase();
  if (key.includes('verde') || key.includes('matcha')) return IMAGE_ASSETS.ingredients['té verde'];
  if (key.includes('canela')) return IMAGE_ASSETS.ingredients['canela'];
  if (key.includes('jengibre') || key.includes('gengibre')) return IMAGE_ASSETS.ingredients['jengibre'];
  if (key.includes('hibisco')) return IMAGE_ASSETS.ingredients['hibisco'];
  if (key.includes('cúrcuma') || key.includes('curcuma')) return IMAGE_ASSETS.ingredients['curcuma'];
  if (key.includes('ashwagandha')) return IMAGE_ASSETS.ingredients['ashwagandha'];
  if (key.includes('valeriana')) return IMAGE_ASSETS.ingredients['valeriana'];
  if (key.includes('melissa')) return IMAGE_ASSETS.ingredients['melissa'];
  if (key.includes('boldo') || key.includes('plant')) return IMAGE_ASSETS.ingredients['boldo'];
  if (key.includes('sopa') || key.includes('crema')) return IMAGE_ASSETS.ingredients['sopas'];
  return IMAGE_ASSETS.ui.placeholder;
}

export interface ExtendedRecipe extends Recipe {
  ingredientePrincipal: string;
}

export interface ExtendedDayRecipes {
  morning: ExtendedRecipe[];
  night: ExtendedRecipe[];
  bonus?: BonusRecipe;
}

const RECIPE_IMAGES = {
  'te_verde_iniciador': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-verde-iniciador.jpg',
  'te_jengibre_limon': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-jengibre-y-limon.jpg',
  'te_canela_detox': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/canela-fenogreco.jpg',
  'te_menta_refrescante': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-de-anis-digestivo.jpg',
  'shot_curcuma_matinal': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-curcuma.jpg',
  'blend_metabolico': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/blend-metabolico-premium.jpg',
  'te_hibisco_nocturno': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-de-hibisco-concentrado.jpg',
  'infusion_manzanilla': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/Infusion-de-manzanilla-y-lavanda.jpg',
  'te_negro_energetico': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-matcha-energia.jpg',
  'shot_jengibre_cayena': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-de-jengibre-y-limon.jpg',
  'te_cardamomo_especiado': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/canela-fenogreco.jpg',
  'te_romero_claridad': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-de-tomillo-inmune.jpg',
  'infusion_lavanda_relax': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/Infusion-de-manzanilla-y-lavanda.jpg',
  'te_limon_alcalino': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/verde-con-limon.jpg',
  'shot_detox_verde': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-verde-iniciador.jpg',
  'te_anis_digestivo': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-de-anis-digestivo.jpg',
  'blend_antioxidante': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/blend-metabolico-premium.jpg',
  'te_tomillo_inmune': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-de-tomillo-inmune.jpg',
  'infusion_canela_miel': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/infusion-canela%20y-miel.jpg',
  'te_matcha_energia': 'https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/te-matcha-energia.jpg',
};

const REC_DATA_A_M1: ExtendedDayRecipes[] = [
  // Week 1: Activation
  {
    morning: [
      {
        id: 'A1M1',
        name: 'Té Verde Iniciador',
        time: 8,
        temp: '80°C',
        ingredients: ['1 cdita té verde suelto', '1 ramita canela Ceylon', '2 rodajas jengibre fresco', '350ml agua'],
        steps: ['Calentar agua a 80°C (sin hervir).', 'Agregar todos los ingredientes.', 'Infusionar 5 minutos tapado.', 'Colar y beber tibio o frío.'],
        whyItWorks: 'El EGCG del té verde activa enzimas que aumentan la oxidación de grasa. La canela Ceylon estabiliza el azúcar en sangre.',
        benefits: ['Activación del metabolismo matinal', 'Reducción del antojo de dulce'],
        ingredientePrincipal: 'té verde',
        image: RECIPE_IMAGES.te_verde_iniciador,
      },
      {
        id: 'A1M2',
        name: 'Verde con Limón Activador',
        time: 5,
        temp: '80°C',
        ingredients: ['1 cdita té verde', 'suco de ½ limão', '1 pau canela', '300ml agua'],
        steps: ['Infusión 5 min.', 'Coar.', 'Adicionar limão após coar.', 'Tomar morno.'],
        whyItWorks: 'Ácido ascórbico do limão aumenta absorção das catequinas do chá verde em até 13x.',
        benefits: ['Biodisponibilidad máxima', 'Detox matinal'],
        ingredientePrincipal: 'té verde',
        image: RECIPE_IMAGES.te_limon_alcalino,
      }
    ],
    night: [
      {
        id: 'A1N1',
        name: 'Canela Fenogrego Nocturno',
        time: 12,
        temp: 'Caliente',
        ingredients: ['1 pau canela Ceylon', '1 cdita sementes de feno-grego', '3 cravos', '200ml agua'],
        steps: ['Ferver 12 min.', 'Coar bem.', 'Tomar 15 min antes do jantar.'],
        whyItWorks: 'Galactomananos do feno-grego retardam esvaziamento gástrico e absorção de carboidratos.',
        benefits: ['Menos pico insulínico', 'Digestión lenta'],
        ingredientePrincipal: 'canela',
        image: RECIPE_IMAGES.te_canela_detox,
      },
      {
        id: 'A1N2',
        name: 'Shot de Hibisco Concentrado',
        time: 10,
        temp: 'Frío',
        ingredients: ['3 cdas flor de hibisco seca', '200ml agua'],
        steps: ['Ferver 10 min concentrado.', 'Coar.', 'Refrigerar.', 'Tomar 80ml gelado após jantar.'],
        whyItWorks: 'Antocianinas inibem enzimas que convertem amido em glicose.',
        benefits: ['Bloqueo de carbohidratos', 'Quema nocturna'],
        ingredientePrincipal: 'hibisco',
        image: RECIPE_IMAGES.te_hibisco_nocturno,
      }
    ]
  },
  // Week 2: Oxidation
  {
    morning: [
      {
        id: 'A2M1',
        name: 'Shot Cúrcuma Matinal',
        time: 5,
        temp: 'Morno',
        ingredients: ['1 cdita cúrcuma pura', '1 pizca pimienta negra', 'suco de 1 limón', '50ml agua'],
        steps: ['Mezclar todo.', 'Tomar en ayunas.'],
        whyItWorks: 'La curcumina es un potente antiinflamatorio que mejora la sensibilidad a la insulina.',
        benefits: ['Reducción de inflamación', 'Mejora metabólica'],
        ingredientePrincipal: 'cúrcuma',
        image: RECIPE_IMAGES.shot_curcuma_matinal,
      },
      {
        id: 'A2M2',
        name: 'Té de Jengibre y Limón',
        time: 10,
        temp: 'Caliente',
        ingredients: ['3 rodajas jengibre', 'suco de 1 limón', '1 cdita miel orgánica', '300ml agua'],
        steps: ['Hervir jengibre 10 min.', 'Añadir limón y miel al final.'],
        whyItWorks: 'El jengibre aumenta la termogénesis y el limón alcaliniza el cuerpo.',
        benefits: ['Termogénesis activa', 'Energía natural'],
        ingredientePrincipal: 'jengibre',
        image: RECIPE_IMAGES.te_jengibre_limon,
      }
    ],
    night: [
      {
        id: 'A2N1',
        name: 'Infusión de Manzanilla y Lavanda',
        time: 8,
        temp: 'Caliente',
        ingredients: ['1 cdita manzanilla', '1 cdita lavanda seca', '200ml agua'],
        steps: ['Infusionar 8 min.', 'Tomar antes de dormir.'],
        whyItWorks: 'Reduce el cortisol nocturno, permitiendo que la hormona del crecimiento trabaje en la quema de grasa.',
        benefits: ['Sueño reparador', 'Control de cortisol'],
        ingredientePrincipal: 'manzanilla',
        image: RECIPE_IMAGES.infusion_manzanilla,
      },
      {
        id: 'A2N2',
        name: 'Té de Anís Digestivo',
        time: 5,
        temp: 'Caliente',
        ingredients: ['1 cdita anís estrellado', '1 ramita menta', '200ml agua'],
        steps: ['Infusionar 5 min.', 'Tomar después de cenar.'],
        whyItWorks: 'Mejora la digestión y evita la hinchazón abdominal nocturna.',
        benefits: ['Vientre plano', 'Digestión ligera'],
        ingredientePrincipal: 'anís',
        image: RECIPE_IMAGES.te_anis_digestivo,
      }
    ]
  },
  // Week 3: Consolidation
  {
    morning: [
      {
        id: 'A3M1',
        name: 'Blend Metabólico Premium',
        time: 10,
        temp: '80°C',
        ingredients: ['1 cdita matcha', '1 cdita ashwagandha', '1 cdita canela', '300ml agua'],
        steps: ['Mezclar polvos con agua a 80°C.', 'Batir bien.'],
        whyItWorks: 'Combinación sinérgica para máxima flexibilidad metabólica.',
        benefits: ['Foco mental', 'Quema de grasa máxima'],
        ingredientePrincipal: 'matcha',
        image: RECIPE_IMAGES.blend_metabolico,
      },
      {
        id: 'A3M2',
        name: 'Té Matcha Energía',
        time: 3,
        temp: 'Caliente',
        ingredients: ['1 cdita matcha', 'suco de ½ limón', '250ml agua'],
        steps: ['Mezclar y beber.'],
        whyItWorks: 'L-teanina + cafeína para energía sostenida sin picos de insulina.',
        benefits: ['Energía estable', 'Antioxidantes'],
        ingredientePrincipal: 'matcha',
        image: RECIPE_IMAGES.te_matcha_energia,
      }
    ],
    night: [
      {
        id: 'A3N1',
        name: 'Té de Tomillo Inmune',
        time: 10,
        temp: 'Caliente',
        ingredients: ['1 cdita tomillo', '1 rodaja limón', '200ml agua'],
        steps: ['Hervir 10 min.', 'Tomar caliente.'],
        whyItWorks: 'Fortalece el sistema inmune mientras el cuerpo descansa.',
        benefits: ['Inmunidad', 'Recuperación'],
        ingredientePrincipal: 'tomillo',
        image: RECIPE_IMAGES.te_tomillo_inmune,
      },
      {
        id: 'A3N2',
        name: 'Infusión Canela y Miel',
        time: 5,
        temp: 'Caliente',
        ingredients: ['1 ramita canela', '1 cdita miel', '200ml agua'],
        steps: ['Infusionar 5 min.'],
        whyItWorks: 'Mantiene el metabolismo activo durante el ayuno nocturno.',
        benefits: ['Metabolismo nocturno', 'Saciante'],
        ingredientePrincipal: 'canela',
        image: RECIPE_IMAGES.infusion_canela_miel,
      }
    ]
  }
];

import { getBonusForDay } from '../bonusData';

export function getRecipe(tipo: MetabolicType, sem: number, dia: number): DayRecipes {
  const globalDay = (sem - 1) * 7 + dia;
  const nivelTag = sem === 2 ? ' (N2)' : sem === 3 ? ' (N3)' : '';

  // Use week-specific data
  const base = REC_DATA_A_M1[(sem - 1) % REC_DATA_A_M1.length]; 
  
  return {
    morning: base.morning.map(r => ({ 
      ...r, 
      name: r.name + nivelTag,
      image: r.image || getRecipeImage(r.name, r.ingredientePrincipal)
    })),
    night: base.night.map(r => ({ 
      ...r, 
      name: r.name + nivelTag,
      image: r.image || getRecipeImage(r.name, r.ingredientePrincipal)
    })),
    bonus: getBonusForDay(tipo, globalDay),
  };
}
