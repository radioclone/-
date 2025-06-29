import React from 'react';

export function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-400">VorteX</h1>
              <p className="text-xs text-gray-400">Web3 Ecosystem</p>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <a href="#dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </a>
              <a href="#scs-demo" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                SCS Demo
              </a>
              <a href="#crypto-predictions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Crypto Predictions
              </a>
            </nav>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-sm text-gray-400">VorteX Ready</span>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
