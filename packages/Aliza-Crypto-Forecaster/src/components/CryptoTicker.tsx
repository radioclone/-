import { ArrowUp } from "lucide-react";

interface MarketData {
  symbol: string;
  icon: React.ReactNode;
  price: number;
  change: number;
  prediction: number;
}

interface CryptoTickerProps {
  marketData: MarketData[];
}

export const CryptoTicker = ({ marketData }: CryptoTickerProps) => {
  return (
    <div className="w-full overflow-hidden bg-black/50 border-t border-b border-white/10 fixed top-16 z-40">
      <div className="relative w-full">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {marketData.map((item, index) => (
            <div 
              key={`${item.symbol}-${index}`}
              className="flex items-center gap-2 mx-4 transition-all duration-300 hover:scale-105 hover:bg-white/5 rounded-lg p-2"
            >
              <div className="transition-transform duration-300 hover:rotate-12">
                {item.icon}
              </div>
              <span className="font-medium text-white">{item.symbol}</span>
              <span className="text-sm text-white/80">${item.price.toLocaleString()}</span>
              <span className={`text-sm flex items-center ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change >= 0 ? <ArrowUp className="h-3 w-3 animate-bounce" /> : null}
                {item.change}%
              </span>
            </div>
          ))}
        </div>
        <div className="flex absolute top-0 animate-marquee2 whitespace-nowrap py-2">
          {marketData.map((item, index) => (
            <div 
              key={`${item.symbol}-duplicate-${index}`}
              className="flex items-center gap-2 mx-4 transition-all duration-300 hover:scale-105 hover:bg-white/5 rounded-lg p-2"
            >
              <div className="transition-transform duration-300 hover:rotate-12">
                {item.icon}
              </div>
              <span className="font-medium text-white">{item.symbol}</span>
              <span className="text-sm text-white/80">${item.price.toLocaleString()}</span>
              <span className={`text-sm flex items-center ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.change >= 0 ? <ArrowUp className="h-3 w-3 animate-bounce" /> : null}
                {item.change}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};