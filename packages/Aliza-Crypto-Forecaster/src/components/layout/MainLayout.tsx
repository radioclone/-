
import { BackgroundProvider } from '@/components/backgrounds/BackgroundProvider';
import { MarketHeader } from '@/components/header/MarketHeader';
import { MarketStatus } from '@/components/market/MarketStatus';
import { MarketSentimentLED } from '@/components/market/MarketSentimentLED';
import { CryptoTicker } from '@/components/CryptoTicker';
import { Attribution } from '@/components/layout/Attribution';
import { CryptoData } from '@/types/crypto';
import { useIsMobile, useIsTablet, useIsPortrait } from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
  isLoading: boolean;
  marketData: CryptoData[];
}

export const MainLayout = ({ children, isLoading, marketData }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isPortrait = useIsPortrait();

  const getSpacerHeight = () => {
    if (isMobile) return 'pb-24';
    if (isTablet && isPortrait) return 'pb-28';
    return 'pb-24';
  };

  return (
    <BackgroundProvider type="space">
      <div className="min-h-screen font-sans flex flex-col relative">
        <div className="notch-area-padding z-header">
          <MarketHeader />
        </div>
        <div className="container mx-auto px-4 max-w-full md:max-w-[90%] lg:max-w-[1280px] z-content pt-2">
          <MarketStatus isLoading={isLoading} marketData={marketData} />
        </div>
        {!isMobile && <CryptoTicker marketData={marketData} />}
        <MarketSentimentLED marketData={marketData} />

        <main className="container mx-auto px-4 pt-24 md:pt-28 lg:pt-32 pb-24 md:pb-28 lg:pb-32 max-w-full md:max-w-[90%] lg:max-w-[1280px] flex-grow z-content">
          {children}
        </main>

        <div className={`${getSpacerHeight()} pt-6 safe-area-inset-bottom`}>
          {/* Extra spacing to prevent content from being hidden behind fixed elements */}
        </div>
        
        <Attribution />
      </div>
    </BackgroundProvider>
  );
};
