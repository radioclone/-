import React from 'react';
import { useVorteX } from '../providers/VorteXProvider';
import { Dashboard } from '../pages/Dashboard';
import { AuthDemo } from '../pages/AuthDemo';
import { Web3Tools } from '../pages/Web3Tools';
import { SCSDemo } from '../pages/SCSDemo';
import { CryptoPredictions } from '../pages/CryptoPredictions';

export function Router() {
  const { state } = useVorteX();

  const renderCurrentModule = () => {
    switch (state.currentModule) {
      case 'auth':
        return <AuthDemo />;
      case 'web3':
        return <Web3Tools />;
      case 'scs-demo':
        return <SCSDemo />;
      case 'predictions':
        return <CryptoPredictions />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="w-full">
      {renderCurrentModule()}
    </div>
  );
}
