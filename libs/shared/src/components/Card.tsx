import React from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  padding = 'md'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const cardClasses = [
    'card',
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && (
            <h3 className="text-xs font-medium tracking-widest uppercase mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs opacity-60">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
