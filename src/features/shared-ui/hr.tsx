import * as React from 'react';

interface HrProps {
    type?: 'light' | 'dark' | 'normal' | 'vertical';
    className?: string;
}

export const Hr = ({ type, className }: HrProps) => {
    const typeClass = type ? `hr--${type}` : 'hr--normal';

    return <div className={`${className ?? ''} ${typeClass}`}/>;
};
