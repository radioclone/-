import React from 'react';

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = ''
}) => {
  const icons = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ⓘ'
  };

  const classes = [
    'border p-4 flex items-start gap-3',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="alert">
      <span className="text-sm font-mono mt-0.5" aria-hidden="true">
        {icons[variant]}
      </span>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-medium mb-1">
            {title}
          </h4>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-sm hover:opacity-80 transition-opacity ml-2"
          aria-label="Close alert"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
