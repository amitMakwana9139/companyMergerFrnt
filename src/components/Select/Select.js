// components/ui/Selector.jsx
export default function Selector({
    id,
    name,
    label,
    icon: Icon,
    value,
    onChange,
    required = false,
    options = [],
    className = '',
    error = false
}) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative mt-1">
                {Icon && (
                    <div className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
                        <Icon className="text-sm text-slate-600" />
                    </div>
                )}
                <select
                    id={id}
                    name={name}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className={`w-full pl-10 px-4 py-2 rounded-lg transition duration-150 sm:text-sm
                        ${error
                            ? 'border border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border border-slate-400 focus:ring-2 focus:ring-blue-500'}
                            focus:outline-none bg-white/5 text-black placeholder-gray-400 ${className}`
                    }

                >
                    {options && options?.length > 0 && options.map((opt, index) => (
                        <option key={index} value={opt} className="text-black">
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
