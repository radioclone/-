import { CryptoDisplayProps } from "@/types/crypto";
import { formatPrice, formatLargeNumber } from "@/lib/utils";
import { ArrowUp, ArrowDown, LineChart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PriceChart } from "./PriceChart";
import { soundManager } from "@/utils/sounds";

export const CryptoListItem = ({ data }: CryptoDisplayProps) => {
  const isPositive = data.change >= 0;

  const handleChartOpen = () => {
    soundManager.playSound('click');
  };

  const handleHover = () => {
    soundManager.playSound('click');
  };

  return (
    <div 
      className="flex items-center gap-4 p-4 neo-blur rounded-lg hover:bg-white/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5 group"
      onMouseEnter={handleHover}
    >
      <div className="flex items-center gap-3">
        <div className="transform transition-transform duration-300 group-hover:scale-110">
          {data.icon}
        </div>
        <div>
          <h3 className="font-semibold text-white">{data.name}</h3>
          <span className="text-sm text-white/60">{data.symbol}</span>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-6">
        <div className="text-right">
          <div className="font-medium transition-colors duration-300 group-hover:text-white">
            ${formatPrice(data.price)}
          </div>
          <div className={`text-sm flex items-center justify-end ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {Math.abs(data.change)}%
          </div>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-sm text-white/60">24h Volume</div>
          <div className="font-medium">${formatLargeNumber(data.volume24h || 0)}</div>
        </div>
        <div className="text-right hidden lg:block">
          <div className="text-sm text-white/60">Market Cap</div>
          <div className="font-medium">${formatLargeNumber(data.marketCap || 0)}</div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="transition-all duration-300 hover:bg-white/10 hover:scale-110"
              onClick={handleChartOpen}
            >
              <LineChart className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] bg-black border-white/10 animate-in fade-in-0 zoom-in-95">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {data.icon}
                {data.name} Price History & Prediction
              </DialogTitle>
            </DialogHeader>
            <div className="h-[400px]">
              <PriceChart data={data.priceHistory || []} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};