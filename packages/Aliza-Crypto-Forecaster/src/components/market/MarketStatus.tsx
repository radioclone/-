import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { CryptoData } from "@/types/crypto";

interface MarketStatusProps {
  isLoading: boolean;
  marketData: CryptoData[];
}

export const MarketStatus = ({ isLoading, marketData }: MarketStatusProps) => {
  const { t } = useTranslation();
  
  const isMarketBullish = marketData.reduce((acc, crypto) => acc + crypto.change, 0) / marketData.length > 0;

  return (
    <Badge variant="secondary" className="bg-white/10 flex items-center gap-2">
      <div 
        className={`w-2 h-2 rounded-full animate-pulse ${
          isMarketBullish ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      {isLoading ? 'Updating...' : t('common.liveMarketData')}
    </Badge>
  );
};