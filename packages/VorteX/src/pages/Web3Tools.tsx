import React, { useState } from 'react';
import { useWeb3 } from '../providers/Web3Provider';

export function Web3Tools() {
  const { state, connect, disconnect, switchChain, getBalance } = useWeb3();
  const [selectedChain, setSelectedChain] = useState(1);

  const supportedChains = [
    { id: 1, name: 'Ethereum', symbol: 'ETH' },
    { id: 137, name: 'Polygon', symbol: 'MATIC' },
    { id: 42161, name: 'Arbitrum', symbol: 'ETH' },
    { id: 10, name: 'Optimism', symbol: 'ETH' },
  ];

  const handleSwitchChain = async () => {
    try {
      await switchChain(selectedChain);
    } catch (error) {
      console.error('Chain switch failed:', error);
    }
  };

  const handleRefreshBalance = async () => {
    try {
      await getBalance();
    } catch (error) {
      console.error('Balance refresh failed:', error);
    }
  };

  const formatBalance = (balance: string) => {
    const eth = parseFloat(balance) / 1e18;
    return eth.toFixed(6);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Web3 Tools</h1>
        <div className="text-sm text-gray-400">
          Blockchain interaction utilities
        </div>
      </div>

      {/* Connection Status */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Connection Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-2">
              {state.isConnected ? '🟢' : '🔴'}
            </div>
            <div className="text-sm text-gray-400">Status</div>
            <div className={`font-medium ${state.isConnected ? 'text-green-400' : 'text-red-400'}`}>
              {state.isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-2">⛓️</div>
            <div className="text-sm text-gray-400">Chain ID</div>
            <div className="font-medium text-white">{state.chainId}</div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-sm text-gray-400">Address</div>
            <div className="font-medium text-white font-mono text-xs">
              {state.address ? `${state.address.slice(0, 6)}...${state.address.slice(-4)}` : 'Not connected'}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm text-gray-400">Balance</div>
            <div className="font-medium text-white">
              {state.balance !== '0' ? `${formatBalance(state.balance)} ETH` : '0 ETH'}
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="bg-red-800 border border-red-600 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-lg mr-2">❌</span>
            <div>
              <h3 className="font-medium text-red-100">Web3 Error</h3>
              <p className="text-sm text-red-200">{state.error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Actions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Wallet Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={state.isConnected ? disconnect : connect}
            disabled={state.isLoading}
            className={`px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 ${
              state.isConnected
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {state.isLoading ? 'Processing...' : state.isConnected ? 'Disconnect' : 'Connect Wallet'}
          </button>
          
          {state.isConnected && (
            <button
              onClick={handleRefreshBalance}
              disabled={state.isLoading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
            >
              Refresh Balance
            </button>
          )}
        </div>
      </div>

      {/* Chain Management */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Chain Management</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Chain</label>
            <select
              value={selectedChain}
              onChange={(e) => setSelectedChain(Number(e.target.value))}
              className="w-full md:w-auto px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {supportedChains.map((chain) => (
                <option key={chain.id} value={chain.id}>
                  {chain.name} ({chain.symbol})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSwitchChain}
            disabled={!state.isConnected || state.isLoading || selectedChain === state.chainId}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
          >
            Switch to {supportedChains.find(c => c.id === selectedChain)?.name}
          </button>
        </div>
      </div>

      {/* Current Chain Info */}
      {state.isConnected && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Current Chain Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Chain ID</label>
              <div className="text-white">{state.chainId}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Chain Name</label>
              <div className="text-white">
                {supportedChains.find(c => c.id === state.chainId)?.name || 'Unknown Chain'}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Native Token</label>
              <div className="text-white">
                {supportedChains.find(c => c.id === state.chainId)?.symbol || 'Unknown'}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Connection Status</label>
              <div className="text-green-400">Active</div>
            </div>
          </div>
        </div>
      )}

      {/* Account Information */}
      {state.address && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Address</label>
              <div className="text-white font-mono text-sm break-all bg-gray-700 p-2 rounded">
                {state.address}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Balance</label>
              <div className="text-white">
                {formatBalance(state.balance)} {supportedChains.find(c => c.id === state.chainId)?.symbol || 'ETH'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Usage Instructions</h2>
        <div className="space-y-2 text-sm text-gray-400">
          <p>1. Click "Connect Wallet" to connect your MetaMask or compatible wallet</p>
          <p>2. Once connected, you can view your balance and account information</p>
          <p>3. Use the chain management tools to switch between different networks</p>
          <p>4. Refresh your balance to get the latest information from the blockchain</p>
        </div>
      </div>
    </div>
  );
}
