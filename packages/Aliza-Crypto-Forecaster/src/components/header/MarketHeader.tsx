
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { TypingText } from "@/components/text/TypingText";
import { useIsMobile, useIsTablet, useIsPortrait } from "@/hooks/use-mobile";

export const MarketHeader = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isPortrait = useIsPortrait();

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-black/80 backdrop-blur-sm border-b border-white/10 safe-area-inset-top">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between ${isMobile ? 'h-16' : (isTablet && isPortrait ? 'h-16' : 'h-18')}`}>
          <div className="flex items-center">
            <TypingText 
              text={t('common.retroverse')} 
              key={t('common.retroverse')} 
              className={isMobile || (isTablet && isPortrait) ? "text-lg" : ""}
            />
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            {!(isMobile || (isTablet && isPortrait)) && (
              <Link to="/ecosystem">
                <Button variant="ghost" className="text-white/80 hover:text-white">
                  <Rocket className="mr-2 h-4 w-4" />
                  {t('common.launchpad')}
                </Button>
              </Link>
            )}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};
