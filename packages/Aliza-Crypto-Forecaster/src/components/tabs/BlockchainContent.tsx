
import { SoneiumWallet } from '@/components/blockchain/SoneiumWallet';
import { useTranslation } from 'react-i18next';

export const BlockchainContent = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Soneium Blockchain</h2>
      </div>
      <div className="grid gap-6">
        <SoneiumWallet />
        <div className="p-6 neo-blur rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">About Soneium</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Soneium is an Ethereum Layer 2 blockchain optimized for entertainment and creativity. 
            Built with Optimism's OP Stack, it provides fast, low-cost transactions while maintaining 
            Ethereum's security. This integration allows you to interact with the Soneium Minato testnet 
            using smart accounts and gasless transactions powered by Startale.
          </p>
        </div>
      </div>
    </div>
  );
};
