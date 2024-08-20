import React, { forwardRef, useEffect, useRef, useState } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Array<{ value: string; label: string; disabled?: boolean }>;
    hasError?: boolean;
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ hasError, className, options, placeholder, onChange, ...props }, ref) => {
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const [isPlaceholder, setIsPlaceholder] = useState(true);

    const combinedRef = (node: HTMLSelectElement) => {
        selectRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
    };

    useEffect(() => {
        if (selectRef.current) setIsPlaceholder(!selectRef.current.value);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsPlaceholder(!e.target.value);
        onChange?.(e);
    };

    const selectClassName = `select ${hasError ? 'select-error' : ''} ${isPlaceholder ? 'select-placeholder' : ''} ${className || ''}`.trim()

    return (
        <select className={selectClassName} {...props} onChange={handleChange} ref={combinedRef}>
            {placeholder && (
              <option value="" disabled selected hidden>
                  {placeholder}
              </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});

Select.displayName = 'Select';
