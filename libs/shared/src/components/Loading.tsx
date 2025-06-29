import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const classes = [
    'animate-spin border-2 border-gray-40 border-t-white rounded-full',
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export interface LoadingStateProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  children,
  fallback
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        {fallback || <LoadingSpinner />}
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingSpinner;
