import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useWeb3 } from '../providers/Web3Provider';
import { ConnectWalletButton } from './ConnectWalletButton';
import { UserProfile } from './UserProfile';

export function Header() {
  const { state: authState } = useAuth();
  const { state: web3State } = useWeb3();

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-400">VorteX</h1>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                SCS Demo
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Aliza Predictions
              </a>
            </nav>
          </div>

          {/* Connection Status */}
          <div className="flex items-center space-x-4">
            {/* Web3 Connection Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${web3State.isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm text-gray-400">
                {web3State.isConnected ? `Chain ${web3State.chainId}` : 'Not connected'}
              </span>
            </div>

            {/* Auth Status */}
            {authState.isAuthenticated ? (
              <UserProfile user={authState.user} />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="text-sm text-gray-400">Not authenticated</span>
              </div>
            )}

            {/* Connect Wallet Button */}
            <ConnectWalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
