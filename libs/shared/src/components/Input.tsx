import React from 'react';

export interface InputProps {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  disabled = false,
  readOnly = false,
  required = false,
  error,
  className = '',
}) => {
  const inputClasses = [
    'input',
    error ? 'border-red-500' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-xs font-medium tracking-wider uppercase opacity-80"
        >
          {label}
          {required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id || name}-error` : undefined}
      />
      {error && (
        <span 
          id={`${id || name}-error`}
          className="block text-xs text-red-400"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
