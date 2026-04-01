import { MetabolicType, BonusRecipe } from './types';

const SUEÑO_BONUSES: Record<number, BonusRecipe> = {
  1: { nome: "Blend Luna", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Camomila", "Melissa"], preparo: "Infusión de 15 min en agua caliente", beneficio: "Regula el ciclo circadiano" },
  3: { nome: "Tila Relajante", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Tila", "Lavanda"], preparo: "Infusión de 12 min", beneficio: "Reduce la activación nocturna" },
  5: { nome: "Maracuyá Noche", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Maracuyá", "Camomila"], preparo: "Infusión de 15 min", beneficio: "Ansiolítico natural sin dependencia" },
  7: { nome: "Sueño Profundo", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Valeriana ½ col", "Camomila"], preparo: "Infusión de 15 min", beneficio: "Potencia el GABA" },
  9: { nome: "Luna de Menta", categoria: "SUEÑO", horario: "10 min antes de dormir", ingredientes: ["Hortelã", "Camomila", "Clavo"], preparo: "Infusión de 10 min", beneficio: "Relaja el sistema digestivo" },
  11: { nome: "Serenidad", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Melissa", "Lavanda", "Tila"], preparo: "Infusión de 12 min", beneficio: "Triple acción calmante" },
  13: { nome: "Rooibos Nocturno", categoria: "SUEÑO", horario: "8 min antes de dormir", ingredientes: ["Rooibos", "Canela", "Camomila"], preparo: "Infusión de 8 min", beneficio: "Sin cafeína, rico en antioxidantes" },
  15: { nome: "Restaurador", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Valeriana", "Maracuyá", "Tila"], preparo: "Infusión de 15 min", beneficio: "Sueño reparador profundo" },
  17: { nome: "Luna Herbácea", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Hortelã", "Melissa", "Camomila"], preparo: "Infusión de 12 min", beneficio: "Descomprime el sistema nervoso" },
  19: { nome: "Sueño Completo", categoria: "SUEÑO", horario: "15 min antes de dormir", ingredientes: ["Valeriana", "Melissa", "Erva-doce"], preparo: "Infusión de 15 min", beneficio: "Preparación para el tramo final" },
  21: { nome: "Blend Final", categoria: "SUEÑO", horario: "12 min antes de dormir", ingredientes: ["Camomila triple concentración"], preparo: "Infusión de 12 min", beneficio: "Cierre del protocolo" },
};

const DIGESTIVO_ENERGIA_BONUSES: Record<number, BonusRecipe> = {
  2: { nome: "Shot Digestivo", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Gengibre", "Limão", "Caiena"], preparo: "50ml quente", beneficio: "Ativa enzimas digestivas" },
  4: { nome: "Alcachofa Express", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Alcachofra 1 col"], preparo: "200ml", beneficio: "Estimula la producción de bilis" },
  6: { nome: "Menta Digestiva", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Hortelã abundante"], preparo: "Infusión de 5 min", beneficio: "Relaja el músculo liso intestinal" },
  8: { nome: "Shot Enzimático", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Gengibre", "Abacaxi 2 fatias", "Limão"], preparo: "100ml", beneficio: "Bromelina + gingerois" },
  10: { nome: "Boldo Suave", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Boldo ½ col"], preparo: "100ml", beneficio: "Colerético natural, no exceder dosis" },
  12: { nome: "Erva-doce Digest.", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Erva-doce 1.5 col"], preparo: "200ml", beneficio: "Carminativo, reduce gases" },
  14: { nome: "Anti-gas Shot", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Gengibre", "Hortelã", "Cominho"], preparo: "80ml", beneficio: "Triple acción anti-hinchazón" },
  16: { nome: "Manzanilla Digest", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Camomila dupla"], preparo: "Infusión de 10 min", beneficio: "Antiespasmodico digestivo" },
  18: { nome: "Shot Bienestar", categoria: "ENERGÍA", horario: "20 min após o almoço", ingredientes: ["Cúrcuma", "Pimenta", "Gengibre", "Limão"], preparo: "60ml", beneficio: "Antiinflamatorio sistémico" },
  20: { nome: "Erva-doce Final", categoria: "DIGESTIVO", horario: "20 min após o almoço", ingredientes: ["Erva-doce", "Melissa"], preparo: "200ml", beneficio: "Cierre digestivo suave" },
};

const TYPE_SPECIFIC_BONUSES: Record<MetabolicType, BonusRecipe> = {
  A: { nome: "Shot Insulínico", categoria: "ESPECIAL", horario: "Post-carboidratos", ingredientes: ["Chá verde gelado", "Limão", "Caiena"], preparo: "60ml", beneficio: "Control de glucosa" },
  B: { nome: "Shot Adaptógeno", categoria: "ESPECIAL", horario: "Pico de cortisol das 15h", ingredientes: ["Ashwagandha", "Mel", "Água"], preparo: "80ml", beneficio: "Regulación del estrés" },
  C: { nome: "Shot Drenante", categoria: "ESPECIAL", horario: "Em jejum absoluto", ingredientes: ["Dente-de-leão concentrado", "Limão"], preparo: "60ml", beneficio: "Drenaje linfático" },
  D: { nome: "Shot Termogênico", categoria: "ESPECIAL", horario: "Antes de sair", ingredientes: ["Gengibre concentrado", "Caiena", "Limão"], preparo: "50ml quente", beneficio: "Activación tiroidea" },
  E: { nome: "Shot Biliar", categoria: "ESPECIAL", horario: "Primeiro do dia em jejum", ingredientes: ["Limão", "Cúrcuma", "Pimenta preta"], preparo: "80ml", beneficio: "Limpieza hepática" },
  F: { nome: "Shot Metabólico", categoria: "ESPECIAL", horario: "Antes de qualquer refeição", ingredientes: ["Chá verde frio", "Canela", "Limão"], preparo: "80ml", beneficio: "Flexibilidad metabólica" },
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
