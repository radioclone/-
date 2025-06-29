import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

interface User {
  id: string;
  email?: string;
  name?: string;
  profileImage?: string;
  verifier: string;
  verifierId: string;
  typeOfLogin: string;
  aggregateVerifier?: string;
  dappShare?: string;
  oAuthIdToken?: string;
  oAuthAccessToken?: string;
  appState?: string;
  touchIDPreference?: string;
  isMfaEnabled?: boolean;
}

interface UserProfileProps {
  user: User | null;
}

export function UserProfile({ user }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-white"
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.name || 'User'}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-sm font-medium">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
        )}
        <span className="text-sm hidden md:block">
          {user.name || user.email || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-gray-700">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
              <div className="font-medium text-white">{user.name || 'User'}</div>
              <div className="text-xs">{user.email}</div>
              <div className="text-xs">via {user.typeOfLogin}</div>
            </div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
