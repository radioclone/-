import React from 'react';
import { useWeb3 } from '../providers/Web3Provider';

export function ConnectWalletButton() {
  const { state, connect, disconnect } = useWeb3();

  const handleClick = () => {
    if (state.isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  if (state.isLoading) {
    return (
      <button
        disabled
        className="bg-gray-600 text-gray-400 px-4 py-2 rounded-md text-sm font-medium cursor-not-allowed"
      >
        Connecting...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        state.isConnected
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {state.isConnected ? 'Disconnect' : 'Connect Wallet'}
    </button>
  );
}
