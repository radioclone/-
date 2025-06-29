import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { birthData } = await req.json();
    console.log('Received birth data:', birthData);
    
    // Create a detailed prompt for the AI
    const prompt = `As an astrological financial advisor, analyze the following birth data and provide market predictions:
    Date: ${birthData.date}/${birthData.month}/${birthData.year}
    Time: ${birthData.time}
    Location: ${birthData.birthplace}
    
    Please provide a detailed analysis with these exact sections:
    1. Market Outlook: How the planetary positions affect market trends
    2. Trading Personality: Key traits based on the birth chart
    3. Timing: Best times for trading based on transits

    Format the response as a JSON object with these exact keys: marketOutlook, personalityTraits, timing`;

    console.log('Sending request to OpenAI with prompt:', prompt);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert in astrology and financial markets. Provide insights based on astrological analysis.' 
          },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    const prediction = JSON.parse(data.choices[0].message.content);
    console.log('Parsed prediction:', prediction);

    return new Response(JSON.stringify(prediction), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating prediction:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate prediction',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});