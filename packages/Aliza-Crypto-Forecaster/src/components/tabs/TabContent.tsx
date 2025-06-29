
import { TabsContent } from "@/components/ui/tabs";
import { MarketContent } from '@/components/market/MarketContent';
import { FAQSection } from '@/components/FAQSection';
import { NewsSection } from '@/components/NewsSection';
import { BlockchainContent } from '@/components/tabs/BlockchainContent';
import { useTranslation } from 'react-i18next';
import { CryptoData } from "@/types/crypto";

interface TabContentProps {
  isLoading: boolean;
  displayData: CryptoData[];
  searchQuery: string;
}

export const TabContent = ({ isLoading, displayData, searchQuery }: TabContentProps) => {
  const { t } = useTranslation();

  return (
    <>
      <TabsContent value="market" className="mt-6">
        <MarketContent 
          isLoading={isLoading}
          displayData={displayData}
          searchQuery={searchQuery}
        />
      </TabsContent>

      <TabsContent value="blockchain" className="mt-6">
        <BlockchainContent />
      </TabsContent>

      <TabsContent value="education" className="mt-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">{t('education.title')}</h2>
        </div>
        <FAQSection />
      </TabsContent>

      <TabsContent value="news" className="mt-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">{t('news.title')}</h2>
        </div>
        <NewsSection />
      </TabsContent>
    </>
  );
};
