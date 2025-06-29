
import { CryptoData } from "@/types/crypto";
import { Network } from "lucide-react";
import { priceHistoryData } from "./priceHistory";

export const soneiumData: CryptoData = {
  symbol: "ETH",
  name: "Soneium Minato",
  icon: <Network className="h-6 w-6 text-purple-400" />,
  price: 0,
  change: 0,
  prediction: 0,
  volume24h: 0,
  marketCap: 0,
  priceHistory: priceHistoryData
};
