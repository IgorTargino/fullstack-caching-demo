import { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`bg-white rounded-lg shadow p-6 ${className}`}>{children}</div>;
}
