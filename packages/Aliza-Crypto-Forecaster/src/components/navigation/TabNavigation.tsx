
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CryptoSearch } from "@/components/search/CryptoSearch";
import { useTranslation } from "react-i18next";
import { BarChart3, BookOpen, Newspaper, Network } from "lucide-react";
import { useIsMobile, useIsTablet, useIsPortrait } from "@/hooks/use-mobile";

interface TabNavigationProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const TabNavigation = ({ searchQuery, onSearchChange }: TabNavigationProps) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isPortrait = useIsPortrait();

  return (
    <div className={`flex ${isTablet || isMobile ? 'flex-col' : 'flex-row'} justify-between items-start sm:items-center gap-4 md:gap-6`}>
      <TabsList className="bg-white/5 border border-white/10 w-full sm:w-auto rounded-xl overflow-hidden">
        <TabsTrigger value="market" className="data-[state=active]:bg-white/10 flex-1 sm:flex-initial h-12 sm:h-11">
          <BarChart3 className="h-4 w-4 mr-2" />
          {isMobile ? "" : t('tabs.market')}
        </TabsTrigger>
        <TabsTrigger value="blockchain" className="data-[state=active]:bg-white/10 flex-1 sm:flex-initial h-12 sm:h-11">
          <Network className="h-4 w-4 mr-2" />
          {isMobile ? "" : "Soneium"}
        </TabsTrigger>
        <TabsTrigger value="education" className="data-[state=active]:bg-white/10 flex-1 sm:flex-initial h-12 sm:h-11">
          <BookOpen className="h-4 w-4 mr-2" />
          {isMobile ? "" : t('tabs.education')}
        </TabsTrigger>
        <TabsTrigger value="news" className="data-[state=active]:bg-white/10 flex-1 sm:flex-initial h-12 sm:h-11">
          <Newspaper className="h-4 w-4 mr-2" />
          {isMobile ? "" : t('tabs.news')}
        </TabsTrigger>
      </TabsList>
      <CryptoSearch 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};
