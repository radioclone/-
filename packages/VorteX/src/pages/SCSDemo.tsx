import React from 'react';

export function SCSDemo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">SCS Account Abstraction Demo</h1>
        <div className="text-sm text-gray-400">
          Social Login & Smart Contracts
        </div>
      </div>

      {/* Integration Notice */}
      <div className="bg-blue-800 border border-blue-600 rounded-lg p-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">ℹ️</span>
          <div>
            <h3 className="font-medium text-blue-100 mb-2">Integration Point</h3>
            <p className="text-blue-200 text-sm">
              This module integrates with the existing SCS-AA-Demo-UI package. 
              The full implementation can be found in the packages/SCS-AA-Demo-UI directory.
            </p>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Available Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">🔐</div>
            <h3 className="font-medium text-white mb-2">Social Login</h3>
            <p className="text-sm text-gray-400">
              Login with Google, GitHub, Twitter, or Discord using Web3Auth
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">🚀</div>
            <h3 className="font-medium text-white mb-2">Smart Accounts</h3>
            <p className="text-sm text-gray-400">
              Create and manage ERC-4337 compatible smart accounts
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">⛽</div>
            <h3 className="font-medium text-white mb-2">Gasless Transactions</h3>
            <p className="text-sm text-gray-400">
              Execute transactions without holding native tokens
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">🎲</div>
            <h3 className="font-medium text-white mb-2">Dice Roll Demo</h3>
            <p className="text-sm text-gray-400">
              Interactive demo showing smart account capabilities
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">🔄</div>
            <h3 className="font-medium text-white mb-2">Social Recovery</h3>
            <p className="text-sm text-gray-400">
              Recover accounts using social connections
            </p>
          </div>
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-medium text-white mb-2">Transaction History</h3>
            <p className="text-sm text-gray-400">
              View and track all smart account transactions
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Architecture Components</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <h3 className="font-medium text-white">Web3Auth Integration</h3>
              <p className="text-sm text-gray-400">
                Handles social login authentication and key management
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h3 className="font-medium text-white">Smart Account Factory</h3>
              <p className="text-sm text-gray-400">
                Deploys and manages ERC-4337 smart accounts using Startale SDK
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h3 className="font-medium text-white">Bundler & Paymaster</h3>
              <p className="text-sm text-gray-400">
                Processes UserOperations and sponsors gas fees
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-sm font-bold">
              4
            </div>
            <div>
              <h3 className="font-medium text-white">UI Components</h3>
              <p className="text-sm text-gray-400">
                React components for seamless user interaction
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Start Guide</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-3">
            <span className="text-green-400 font-bold">1.</span>
            <div>
              <p className="text-white font-medium">Authenticate with Social Provider</p>
              <p className="text-gray-400">Use the Authentication Demo to login with your preferred social provider</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-400 font-bold">2.</span>
            <div>
              <p className="text-white font-medium">Create Smart Account</p>
              <p className="text-gray-400">Generate your smart account address and prepare for deployment</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-400 font-bold">3.</span>
            <div>
              <p className="text-white font-medium">Access SCS Demo</p>
              <p className="text-gray-400">Navigate to the full SCS-AA-Demo-UI application for complete functionality</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-400 font-bold">4.</span>
            <div>
              <p className="text-white font-medium">Execute Transactions</p>
              <p className="text-gray-400">Try gasless transactions and experience the power of account abstraction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Launch External Demo */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Launch Full Demo</h2>
        <p className="text-gray-400 mb-4">
          The complete SCS Account Abstraction demo is available as a separate application with full functionality.
        </p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
            Launch SCS Demo App
          </button>
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors">
            View Documentation
          </button>
        </div>
      </div>

      {/* Technical Details */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Technical Implementation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-2">Smart Contract Standards</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• ERC-4337 Account Abstraction</li>
              <li>• EIP-1271 Signature Validation</li>
              <li>• ERC-1155 Multi-Token Standard</li>
              <li>• Custom Factory Contracts</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-white mb-2">Supported Networks</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Ethereum Mainnet</li>
              <li>• Polygon Network</li>
              <li>• Arbitrum One</li>
              <li>• Optimism</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
