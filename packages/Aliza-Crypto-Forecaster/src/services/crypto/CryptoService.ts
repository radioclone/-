import { CryptoData } from "@/types/crypto";

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// Map our symbols to CoinGecko IDs - updated with correct IDs
const COIN_IDS: { [key: string]: string } = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  XRP: 'ripple',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  DOT: 'polkadot',
  UNI: 'uniswap',
  AVAX: 'avalanche-2',
  MATIC: 'polygon',
  ATOM: 'cosmos',
  LINK: 'chainlink',
  MODE: 'mode',
  AR: 'arweave'
};

export const fetchCryptoPrices = async () => {
  try {
    console.log('Fetching crypto prices...');
    const ids = Object.values(COIN_IDS).join(',');
    const response = await fetch(
      `${COINGECKO_BASE_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
      {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );
    
    if (!response.ok) {
      console.error(`CoinGecko API error: ${response.status}`);
      throw new Error(`Failed to fetch crypto prices: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received price data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

export const transformCryptoData = (rawData: any, staticData: CryptoData[]): CryptoData[] => {
  if (!rawData) {
    console.log('No raw data received, using static data');
    return staticData;
  }

  return staticData.map(crypto => {
    const coinId = COIN_IDS[crypto.symbol];
    const priceData = rawData[coinId];

    if (!priceData) {
      console.log(`No price data found for ${crypto.symbol} (CoinGecko ID: ${coinId})`);
      return crypto;
    }

    return {
      ...crypto,
      price: Number(priceData.usd) || crypto.price,
      change: Number(priceData.usd_24h_change?.toFixed(2)) || crypto.change,
      volume24h: Number(priceData.usd_24h_vol) || crypto.volume24h,
      marketCap: Number(priceData.usd_market_cap) || crypto.marketCap,
      prediction: Number(priceData.usd) * 1.1 // Simple prediction logic
    };
  });
};
