
import { Circle } from "lucide-react";
import { CryptoData } from "@/types/crypto";
import { useIsMobile } from "@/hooks/use-mobile";

interface MarketSentimentLEDProps {
  marketData: CryptoData[];
}

export const MarketSentimentLED = ({ marketData }: MarketSentimentLEDProps) => {
  const isMarketBullish = marketData.reduce((acc, crypto) => acc + crypto.change, 0) / marketData.length > 0;
  const isMobile = useIsMobile();
  
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-[45] flex items-center gap-2 px-2 py-1 neo-blur rounded-full shadow-md">
      <Circle
        fill={isMarketBullish ? "#3B82F6" : "#EF4444"}
        className={`h-2 w-2 ${isMarketBullish ? "text-blue-500" : "text-red-500"} animate-pulse`}
      />
      <span className="text-[10px] font-medium text-white">
        Market Sentiment
      </span>
    </div>
  );
};
