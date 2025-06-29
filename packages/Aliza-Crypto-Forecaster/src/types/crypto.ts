export interface PriceHistoryData {
  timestamp: string;
  price: number;
  predicted: number;
}

export interface CryptoData {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  change: number;
  prediction: number;
  volume24h?: number;
  marketCap?: number;
  priceHistory?: PriceHistoryData[];
}

export interface CryptoDisplayProps {
  data: CryptoData;
}