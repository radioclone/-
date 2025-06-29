import { Loader } from "lucide-react";
import { CryptoListItem } from "@/components/CryptoListItem";
import { useTranslation } from "react-i18next";
import { CryptoData } from "@/types/crypto";

interface MarketContentProps {
  isLoading: boolean;
  displayData: CryptoData[];
  searchQuery: string;
}

export const MarketContent = ({ isLoading, displayData, searchQuery }: MarketContentProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 animate-spin text-white/60" />
      </div>
    );
  }

  const filteredData = displayData.filter(crypto => 
    crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">{t('market.title')}</h2>
      </div>
      <div className="grid gap-6">
        {filteredData.map((crypto) => (
          <CryptoListItem key={crypto.symbol} data={crypto} />
        ))}
      </div>
    </div>
  );
};