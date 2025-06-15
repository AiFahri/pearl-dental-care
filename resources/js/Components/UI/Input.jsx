import { forwardRef } from 'react';

const Input = forwardRef(function Input({ 
    label,
    error,
    className = '',
    ...props 
}, ref) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={`
                    block w-full px-3 py-2 border border-gray-300 rounded-lg 
                    placeholder-gray-400 text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                    ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

export default Input;
