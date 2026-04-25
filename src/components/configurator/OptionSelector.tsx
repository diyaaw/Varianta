interface Option {
  id: string;
  label: string;
  description?: string;
  priceModifier?: number;
}

interface OptionSelectorProps {
  label: string;
  options: Option[];
  selected: string;
  onChange: (id: string) => void;
  variant?: "pills" | "cards";
  formatPrice?: (n: number) => string;
}

export default function OptionSelector({
  label,
  options,
  selected,
  onChange,
  variant = "cards",
  formatPrice,
}: OptionSelectorProps) {
  return (
    <section>
      <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4">
        {label}
      </h3>

      {variant === "pills" ? (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              aria-pressed={selected === opt.id}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-150 ${
                selected === opt.id
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {opt.label}
              {opt.priceModifier && opt.priceModifier > 0 ? (
                <span className="ml-1.5 text-xs font-normal opacity-70">
                  +{formatPrice ? formatPrice(opt.priceModifier) : opt.priceModifier}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onChange(opt.id)}
                aria-pressed={isSelected}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60"
                    : "border-gray-150 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={`text-sm font-semibold ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                      {opt.label}
                    </p>
                    {opt.description && (
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{opt.description}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    {opt.priceModifier !== undefined && opt.priceModifier > 0 && (
                      <span className="text-xs text-blue-600 font-bold">
                        +{formatPrice ? formatPrice(opt.priceModifier) : opt.priceModifier}
                      </span>
                    )}
                    {isSelected ? (
                      <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
