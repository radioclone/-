import { BirthData } from '@/types/birth';
import { supabase } from "@/integrations/supabase/client";

export class PredictionService {
  static async generatePrediction(birthData: BirthData) {
    try {
      const { data, error } = await supabase.functions.invoke('generate-prediction', {
        body: { birthData }
      });

      if (error) {
        console.error('Error calling prediction function:', error);
        throw new Error('Failed to generate prediction');
      }

      return data;
    } catch (error) {
      console.error('Error in PredictionService:', error);
      throw error;
    }
  }
}