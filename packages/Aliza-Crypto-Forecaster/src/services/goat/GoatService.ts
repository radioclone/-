import { supabase } from "@/integrations/supabase/client";
import { soundManager } from "@/utils/sounds";

export class GoatService {
  private static instance: GoatService;
  
  private constructor() {}

  public static getInstance(): GoatService {
    if (!GoatService.instance) {
      GoatService.instance = new GoatService();
    }
    return GoatService.instance;
  }

  async processUserRequest(prompt: string): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('process-ai-request', {
        body: { message: prompt }
      });

      if (error) {
        console.error('Error calling AI function:', error);
        soundManager.playSound('error');
        throw error;
      }

      return data.response;
    } catch (error) {
      console.error('Error in processUserRequest:', error);
      soundManager.playSound('error');
      throw error;
    }
  }

  async generateMarketPrediction(birthData: any): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-prediction', {
        body: { birthData }
      });

      if (error) {
        console.error('Error generating prediction:', error);
        soundManager.playSound('error');
        throw error;
      }

      return data.prediction;
    } catch (error) {
      console.error('Error in generateMarketPrediction:', error);
      soundManager.playSound('error');
      throw error;
    }
  }
}

export const goatService = GoatService.getInstance();