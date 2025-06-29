import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface PriceCardProps {
  symbol: string;
  icon: React.ReactNode;
  price: number;
  change: number;
  prediction: number;
}

export const PriceCard = ({ symbol, icon, price, change, prediction }: PriceCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-6 neo-blur transition-all duration-300 hover:bg-white/5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <div className="space-y-1">
            <p className="text-sm text-white/60">Current Price</p>
            <h3 className="text-2xl font-semibold tracking-tight text-white">{symbol}</h3>
          </div>
        </div>
        <span className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
          {Math.abs(change)}%
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold text-white">${price.toLocaleString()}</p>
        </div>
        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-white/60 mb-1">Predicted Price</p>
          <p className="text-xl font-semibold text-green-400">${prediction.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
};