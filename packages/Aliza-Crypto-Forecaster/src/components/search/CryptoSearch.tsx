
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile, useIsTablet, useIsPortrait } from "@/hooks/use-mobile";

interface CryptoSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const CryptoSearch = ({ searchQuery, onSearchChange }: CryptoSearchProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isPortrait = useIsPortrait();
  
  const getWidthClass = () => {
    if (isMobile) return 'w-full';
    if (isTablet && isPortrait) return 'w-full';
    return 'w-full sm:w-64 md:w-72';
  };
  
  return (
    <div className={`relative ${getWidthClass()}`}>
      <Input
        type="text"
        placeholder={isMobile ? "Search..." : "Search cryptocurrencies..."}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 ${isMobile ? 'h-10 text-sm' : 'h-11'}`}
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
    </div>
  );
};
