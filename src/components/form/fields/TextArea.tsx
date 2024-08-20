import React, { forwardRef } from 'react';

interface TextArea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextArea>(({ hasError, className, ...props }, ref) => {
    const textareaClassName = `input ${hasError ? 'input-error' : ''} ${className || ''}`.trim();

    return <textarea className={textareaClassName} {...props} ref={ref} />;
});

TextArea.displayName = 'TextInput';