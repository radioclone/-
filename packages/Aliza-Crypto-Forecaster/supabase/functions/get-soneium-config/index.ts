
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.48.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get secrets from Supabase vault
    const { data: secrets, error } = await supabase
      .from('vault.decrypted_secrets')
      .select('name, decrypted_secret')
      .in('name', ['SONEIUM_RPC_URL', 'SONEIUM_API_KEY', 'SONEIUM_BUNDLER_URL', 'SONEIUM_PAYMASTER_URL'])

    if (error) {
      console.error('Error fetching secrets:', error)
      throw new Error('Failed to fetch configuration')
    }

    const configMap = secrets.reduce((acc: any, secret: any) => {
      acc[secret.name] = secret.decrypted_secret
      return acc
    }, {})

    const config = {
      rpcUrl: configMap.SONEIUM_RPC_URL || 'https://soneium-minato.rpc.scs.startale.com?apikey=butho5zMVTb5oOGAQaaHIGKdR6Z2q4yr',
      apiKey: configMap.SONEIUM_API_KEY || 'butho5zMVTb5oOGAQaaHIGKdR6Z2q4yr',
      bundlerUrl: configMap.SONEIUM_BUNDLER_URL || 'https://soneium-minato.bundler.scs.startale.com',
      paymasterUrl: configMap.SONEIUM_PAYMASTER_URL || 'https://soneium-minato.paymaster.scs.startale.com',
    }

    return new Response(
      JSON.stringify({ config }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Error in get-soneium-config function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
