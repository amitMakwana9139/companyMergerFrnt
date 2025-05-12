// components/ui/Input.jsx
export default function Input({
    id,
    name,
    type = 'text',
    label,
    icon: Icon,
    value,
    onChange,
    required = false,
    autoComplete,
    placeholder,
    className = '',
    error = false,
    min
}) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative mt-1 border border-slate-500 rounded-xl">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-600">
                        <Icon className="text-sm" />
                    </div>
                )}
                <input
                    id={id}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    required={required}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${error ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-blue-500'} bg-white/5  placeholder-gray-400  focus:outline-none focus:ring-2  focus:border-transparent transition duration-150 sm:text-sm ${className}`}
                />
            </div>
        </div>
    );
}
