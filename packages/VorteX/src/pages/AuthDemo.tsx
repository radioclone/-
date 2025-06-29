import React from 'react';
import { useAuth } from '../providers/AuthProvider';

export function AuthDemo() {
  const { state, loginWithSocial, logout, createSmartAccount } = useAuth();

  const socialProviders = [
    { id: 'google', name: 'Google', icon: '🔍', color: 'bg-red-600 hover:bg-red-700' },
    { id: 'github', name: 'GitHub', icon: '🐙', color: 'bg-gray-600 hover:bg-gray-700' },
    { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'discord', name: 'Discord', icon: '💬', color: 'bg-indigo-600 hover:bg-indigo-700' },
  ];

  const handleSocialLogin = async (provider: string) => {
    try {
      await loginWithSocial(provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleCreateSmartAccount = async () => {
    try {
      await createSmartAccount();
    } catch (error) {
      console.error('Smart account creation failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Authentication Demo</h1>
        <div className="text-sm text-gray-400">
          Powered by Web3Auth
        </div>
      </div>

      {/* Authentication Status */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-2">
              {state.isAuthenticated ? '✅' : '❌'}
            </div>
            <div className="text-sm text-gray-400">Authentication</div>
            <div className={`font-medium ${state.isAuthenticated ? 'text-green-400' : 'text-red-400'}`}>
              {state.isAuthenticated ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-2">
              {state.smartAccount ? '🚀' : '⏳'}
            </div>
            <div className="text-sm text-gray-400">Smart Account</div>
            <div className={`font-medium ${state.smartAccount ? 'text-green-400' : 'text-yellow-400'}`}>
              {state.smartAccount ? 'Created' : 'Not Created'}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <div className="text-2xl mb-2">
              {state.isLoading ? '⏳' : '🔒'}
            </div>
            <div className="text-sm text-gray-400">System</div>
            <div className={`font-medium ${state.isLoading ? 'text-yellow-400' : 'text-green-400'}`}>
              {state.isLoading ? 'Processing' : 'Ready'}
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
              <h3 className="font-medium text-red-100">Authentication Error</h3>
              <p className="text-sm text-red-200">{state.error}</p>
            </div>
          </div>
        </div>
      )}

      {/* User Info */}
      {state.user && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <div className="text-white">{state.user.name || 'Not provided'}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <div className="text-white">{state.user.email || 'Not provided'}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Login Provider</label>
              <div className="text-white capitalize">{state.user.typeOfLogin}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Verifier ID</label>
              <div className="text-white font-mono text-sm break-all">{state.user.verifierId}</div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Account Info */}
      {state.smartAccount && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Smart Account</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Smart Account Address</label>
              <div className="text-white font-mono text-sm break-all">{state.smartAccount.address}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Owner Address</label>
              <div className="text-white font-mono text-sm break-all">{state.smartAccount.owner}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Chain ID</label>
              <div className="text-white">{state.smartAccount.chainId}</div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Deployment Status</label>
              <div className={`font-medium ${state.smartAccount.isDeployed ? 'text-green-400' : 'text-yellow-400'}`}>
                {state.smartAccount.isDeployed ? 'Deployed' : 'Not Deployed'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Actions</h2>
        
        {!state.isAuthenticated ? (
          <div>
            <p className="text-gray-400 mb-4">Choose a social provider to login:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialProviders.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => handleSocialLogin(provider.id)}
                  disabled={state.isLoading}
                  className={`p-4 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${provider.color}`}
                >
                  <div className="text-2xl mb-2">{provider.icon}</div>
                  <div className="text-sm">{provider.name}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                disabled={state.isLoading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
              >
                Logout
              </button>
              
              {!state.smartAccount && (
                <button
                  onClick={handleCreateSmartAccount}
                  disabled={state.isLoading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
                >
                  Create Smart Account
                </button>
              )}
            </div>
            
            <p className="text-sm text-gray-400">
              You are successfully authenticated with Web3Auth!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
