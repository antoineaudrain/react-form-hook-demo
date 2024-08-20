import React, { ReactElement } from 'react';

interface FormControlProps {
    label?: string;
    error?: string;
    children: ReactElement;
}

export const FormControl: React.FC<FormControlProps> = ({ label, error, children }) => {
    return (
        <div className="form-control">
            {label && <label className="form-label">{label}</label>}
            {children}
            {error && <p className="form-error">{error}</p>}
        </div>
    );
};