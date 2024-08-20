import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    as?: React.ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ as: Component = 'button', disabled, isLoading, className, children, ...props }, ref) => {
    const isDisabled = disabled || isLoading;
    const buttonClassName = `button ${className || ''}`.trim();

    return (
          <Component
            className={buttonClassName}
            disabled={isDisabled}
            ref={ref}
            {...(Component === 'a' ? { role: 'button' } : {})}
            {...props}
          >
            {isLoading ? (
              <>
                  <span className="button-spinner" aria-hidden="true" />
                  <span className="button-text">{children}</span>
              </>
            ) : (
              children
            )}
        </Component>
    );
});

Button.displayName = 'Button';
