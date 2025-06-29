import { CryptoData } from "@/types/crypto";
import { icons } from "./icons";
import { priceHistoryData } from "./priceHistory";

export const marketData: CryptoData[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: icons.BTC,
    price: 104350,
    change: -0.37,
    prediction: 105000,
    volume24h: 48320000000,
    marketCap: 2050000000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: icons.ETH,
    price: 3240.50,
    change: 0.65,
    prediction: 3300,
    volume24h: 15420000000,
    marketCap: 389000000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "MODE",
    name: "Mode Network",
    icon: icons.MODE,
    price: 0.85,
    change: 15.25,
    prediction: 1.00,
    volume24h: 12500000,
    marketCap: 85000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "AR",
    name: "Arweave",
    icon: icons.AR,
    price: 12.85,
    change: 2.35,
    prediction: 14.00,
    volume24h: 25600000,
    marketCap: 420000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "SOL",
    name: "Solana",
    icon: icons.SOL,
    price: 139.40,
    change: 0.35,
    prediction: 145,
    volume24h: 8420000000,
    marketCap: 62000000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "XRP",
    name: "Ripple",
    icon: icons.XRP,
    price: 0.62,
    change: 1.20,
    prediction: 0.70,
    volume24h: 2420000000,
    marketCap: 32000000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "ADA",
    name: "Cardano",
    icon: icons.ADA,
    price: 0.85,
    change: -1.20,
    prediction: 0.95,
    volume24h: 1420000000,
    marketCap: 28000000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    icon: icons.DOGE,
    price: 0.12,
    change: 2.50,
    prediction: 0.15,
    volume24h: 980000000,
    marketCap: 15000000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    icon: icons.DOT,
    price: 9.25,
    change: 2.15,
    prediction: 10.50,
    volume24h: 720000000,
    marketCap: 11000000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    icon: icons.UNI,
    price: 7.80,
    change: -0.90,
    prediction: 8.50,
    volume24h: 520000000,
    marketCap: 8900000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    icon: icons.AVAX,
    price: 42.30,
    change: 1.75,
    prediction: 45.00,
    volume24h: 890000000,
    marketCap: 14500000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    icon: icons.MATIC,
    price: 1.15,
    change: -0.45,
    prediction: 1.25,
    volume24h: 650000000,
    marketCap: 10800000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "ATOM",
    name: "Cosmos",
    icon: icons.ATOM,
    price: 9.85,
    change: 1.30,
    prediction: 11.00,
    volume24h: 480000000,
    marketCap: 7200000000,
    priceHistory: priceHistoryData
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    icon: icons.LINK,
    price: 18.90,
    change: 3.20,
    prediction: 20.00,
    volume24h: 750000000,
    marketCap: 9800000000,
    priceHistory: priceHistoryData
  }
];

export { aiPrompts } from './aiPrompts';