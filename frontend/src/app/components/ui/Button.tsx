import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
        const variantClasses = {
            primary: 'bg-blue-600 text-white hover:bg-blue-700',
            secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
            danger: 'bg-red-600 text-white hover:bg-red-700',
        };

        return <button ref={ref} className={twMerge(baseClasses, variantClasses[variant], className)} {...props} />;
    },
);

Button.displayName = 'Button';
