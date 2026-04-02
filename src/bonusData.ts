import { MetabolicType, BonusRecipe } from './types';
import { getRecipeImage } from './services/recipeService';

const SUEÑO_BONUSES: Record<number, BonusRecipe> = {
  1: { nome: "Blend Luna", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Camomila", "Melissa"], preparo: "Infusión de 15 min en agua caliente", beneficio: "Regula el ciclo circadiano", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/blend-luna.jpg" },
  3: { nome: "Tila Relajante", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Tila", "Lavanda"], preparo: "Infusión de 12 min", beneficio: "Reduce la activación nocturna", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/tila-relajante.jpg" },
  5: { nome: "Maracuyá Noche", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Maracuyá", "Camomila"], preparo: "Infusión de 15 min", beneficio: "Ansiolítico natural sin dependencia", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/maracuya-noche.jpg" },
  7: { nome: "Sueño Profundo", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Valeriana ½ col", "Camomila"], preparo: "Infusión de 15 min", beneficio: "Potencia el GABA", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sueno-profundo.jpg" },
  9: { nome: "Luna de Menta", categoria: "SUEÑO", horario: "10 min antes de dormir", ingredientes: ["Hortelã", "Camomila", "Clavo"], preparo: "Infusión de 10 min", beneficio: "Relaja el sistema digestivo", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/luna%20de-menta.jpg" },
  11: { nome: "Serenidad", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Melissa", "Lavanda", "Tila"], preparo: "Infusión de 12 min", beneficio: "Triple acción calmante", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/serenidad.jpg" },
  13: { nome: "Rooibos Nocturno", categoria: "SUEÑO", horario: "8 min antes de dormir", ingredientes: ["Rooibos", "Canela", "Camomila"], preparo: "Infusión de 8 min", beneficio: "Sin cafeína, rico en antioxidantes", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/rooibos-nocturno.jpg" },
  15: { nome: "Restaurador", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Valeriana", "Maracuyá", "Tila"], preparo: "Infusión de 15 min", beneficio: "Sueño reparador profundo", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/restaurador.jpg" },
  17: { nome: "Luna Herbácea", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Hortelã", "Melissa", "Camomila"], preparo: "Infusión de 12 min", beneficio: "Descomprime el sistema nervoso", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/luna-herbacea.jpg" },
  19: { nome: "Sueño Completo", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Valeriana", "Melissa", "Erva-doce"], preparo: "Infusión de 15 min", beneficio: "Preparación para el tramo final", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/sueno-completo.jpg" },
  21: { nome: "Blend Final", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Camomila triple concentración"], preparo: "Infusión de 12 min", beneficio: "Cierre del protocolo", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/blend-final.jpg" },
};

const DIGESTIVO_ENERGIA_BONUSES: Record<number, BonusRecipe> = {
  2: { nome: "Shot Digestivo", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Gengibre", "Limão", "Caiena"], preparo: "50ml quente", beneficio: "Ativa enzimas digestivas", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-digestivo.jpg" },
  4: { nome: "Alcachofa Express", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Alcachofra 1 col"], preparo: "200ml", beneficio: "Estimula la producción de bilis", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/alcachofa-express.jpg" },
  6: { nome: "Menta Digestiva", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Hortelã abundante"], preparo: "Infusión de 5 min", beneficio: "Relaja el músculo liso intestinal", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/menta-digestiva.jpg" },
  8: { nome: "Shot Enzimático", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Gengibre", "Abacaxi 2 fatias", "Limão"], preparo: "100ml", beneficio: "Bromelina + gingerois", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-enzimatico.jpg" },
  10: { nome: "Boldo Suave", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Boldo ½ col"], preparo: "100ml", beneficio: "Colerético natural, no exceder dosis", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/boldo-suave.jpg" },
  12: { nome: "Erva-doce Digest.", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Erva-doce 1.5 col"], preparo: "200ml", beneficio: "Carminativo, reduce gases", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/erva-doce-digest.jpg" },
  14: { nome: "Anti-gas Shot", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Gengibre", "Hortelã", "Cominho"], preparo: "80ml", beneficio: "Triple acción anti-hinchazón", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/anti-gas-shotb.jpg" },
  16: { nome: "Manzanilla Digest", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Camomila dupla"], preparo: "Infusión de 10 min", beneficio: "Antiespasmodico digestivo", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/manzanilla-digest.jpg" },
  18: { nome: "Shot Bienestar", categoria: "ENERGÍA", horario: "20 min após o almoço", ingredientes: ["Cúrcuma", "Pimenta", "Gengibre", "Limão"], preparo: "60ml", beneficio: "Antiinflamatorio sistémico", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-bienestar.jpg" },
  20: { nome: "Erva-doce Final", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Erva-doce", "Melissa"], preparo: "200ml", beneficio: "Cierre digestivo suave", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/erva-doce-final.jpg" },
};

const TYPE_SPECIFIC_BONUSES: Record<MetabolicType, BonusRecipe> = {
  A: { nome: "Shot Insulínico", categoria: "ESPECIAL", horario: "Post-carboidratos", ingredientes: ["Chá verde gelado", "Limão", "Caiena"], preparo: "60ml", beneficio: "Control de glucosa", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-insulinico-tipo-a.jpg" },
  B: { nome: "Shot Adaptógeno", categoria: "ESPECIAL", horario: "Pico de cortisol das 15h", ingredientes: ["Ashwagandha", "Mel", "Água"], preparo: "80ml", beneficio: "Regulación del estrés", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-adaptogeno-tipo-b.jpg" },
  C: { nome: "Shot Drenante", categoria: "ESPECIAL", horario: "Em jejum absoluto", ingredientes: ["Dente-de-leão concentrado", "Limão"], preparo: "60ml", beneficio: "Drenaje linfático", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-drenante-tipo-c.jpg" },
  D: { nome: "Shot Termogênico", categoria: "ESPECIAL", horario: "Antes de sair", ingredientes: ["Gengibre concentrado", "Caiena", "Limão"], preparo: "50ml quente", beneficio: "Activación tiroidea", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-termogenico-tipo-d.jpg" },
  E: { nome: "Shot Biliar", categoria: "ESPECIAL", horario: "Primeiro do dia em jejum", ingredientes: ["Limão", "Cúrcuma", "Pimenta preta"], preparo: "80ml", beneficio: "Limpieza hepática", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-biliar-tipo-e.jpg" },
  F: { nome: "Shot Metabólico", categoria: "ESPECIAL", horario: "Antes de qualquer refeição", ingredientes: ["Chá verde frio", "Canela", "Limão"], preparo: "80ml", beneficio: "Flexibilidad metabólica", image: "https://wlcyvdqvmgbsrrmamsyv.supabase.co/storage/v1/object/public/receitas/shot-metabolico-tipo-f.jpg" },
};

export const getBonusForDay = (type: MetabolicType, day: number): BonusRecipe => {
  // Specifc days: 3, 6, 9, 12, 15, 18, 21
  if ([3, 6, 9, 12, 15, 18, 21].includes(day)) {
    return TYPE_SPECIFIC_BONUSES[type];
  }
  
  if (day % 2 !== 0) {
    return SUEÑO_BONUSES[day] || SUEÑO_BONUSES[1];
  } else {
    return DIGESTIVO_ENERGIA_BONUSES[day] || DIGESTIVO_ENERGIA_BONUSES[2];
  }
};
