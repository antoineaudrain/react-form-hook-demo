import React, { forwardRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ hasError, className, ...props }, ref) => {
      const inputClassName = `input ${hasError ? 'input-error' : ''} ${className || ''}`.trim();

      return <input className={inputClassName} type="text" {...props} ref={ref} />;
  }
);

TextInput.displayName = 'TextInput';