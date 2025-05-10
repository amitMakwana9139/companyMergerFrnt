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
    className = ''
}) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-black mb-1">
                    {label}
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
                    className={`w-full pl-10 px-4 py-2 rounded-lg border border-slate-400 bg-white/5 text-slate-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 sm:text-sm ${className}`}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="text-black">
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
