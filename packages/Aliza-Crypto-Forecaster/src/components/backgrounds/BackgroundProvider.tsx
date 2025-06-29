import React from 'react';
import { SpaceBackground } from './SpaceBackground';
import { StarryBackground } from './StarryBackground';

type BackgroundType = 'space' | 'starry' | 'solid' | 'gradient';

interface BackgroundProviderProps {
  type?: BackgroundType;
  children: React.ReactNode;
}

export const BackgroundProvider = ({ type = 'space', children }: BackgroundProviderProps) => {
  const renderBackground = () => {
    switch (type) {
      case 'space':
        return <SpaceBackground />;
      case 'starry':
        return <StarryBackground />;
      case 'solid':
        return <div className="fixed inset-0 -z-10 bg-black" />;
      case 'gradient':
        return <div className="fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 to-black" />;
      default:
        return <SpaceBackground />;
    }
  };

  return (
    <>
      {renderBackground()}
      {children}
    </>
  );
};