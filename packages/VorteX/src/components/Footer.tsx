import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            © 2025 VorteX Web3 Ecosystem. Built with ❤️ for the decentralized future.
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500">
              Version 1.0.0
            </span>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>Powered by</span>
              <span className="text-blue-400">Startale</span>
              <span>•</span>
              <span className="text-purple-400">Web3Auth</span>
              <span>•</span>
              <span className="text-green-400">Viem</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
