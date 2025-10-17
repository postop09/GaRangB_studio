'use client';

import { memo } from 'react';
import type { BaseComponentProps } from '../types';

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const variantClasses = {
  primary: 'text-[#8b7355]',
  secondary: 'text-gray-500',
  white: 'text-white',
};

export const LoadingSpinner = memo<LoadingSpinnerProps>(
  ({
    size = 'md',
    variant = 'primary',
    text,
    fullScreen = false,
    className,
    'data-testid': testId,
  }) => {
    const spinnerElement = (
      <div
        className={`flex flex-col items-center justify-center ${
          fullScreen ? 'min-h-screen' : ''
        } ${className || ''}`}
        data-testid={testId}
        role="status"
        aria-label={text || '로딩 중'}
      >
        <svg
          className={`animate-spin ${sizeClasses[size]} ${variantClasses[variant]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        {text && (
          <p
            className={`mt-3 text-sm ${variantClasses[variant]} animate-pulse`}
          >
            {text}
          </p>
        )}

        <span className="sr-only">{text || '로딩 중입니다'}</span>
      </div>
    );

    return spinnerElement;
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';
