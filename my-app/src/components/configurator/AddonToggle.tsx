interface Addon {
  id: string;
  label: string;
  priceModifier: number;
}

interface AddonToggleProps {
  label: string;
  addons: Addon[];
  selected: string[];
  onChange: (selected: string[]) => void;
  formatPrice?: (n: number) => string;
}

export default function AddonToggle({
  label,
  addons,
  selected,
  onChange,
  formatPrice,
}: AddonToggleProps) {
  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  }

  return (
    <section>
      <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4">
        {label}
      </h3>
      <div className="flex flex-col gap-2.5">
        {addons.map((addon) => {
          const isOn = selected.includes(addon.id);
          return (
            <button
              key={addon.id}
              onClick={() => toggle(addon.id)}
              aria-pressed={isOn}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all duration-150 ${
                isOn
                  ? "border-blue-600 bg-blue-50/60"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className={`text-sm font-medium ${isOn ? "text-blue-700" : "text-gray-700"}`}>
                {addon.label}
              </span>
              <div className="flex items-center gap-2.5">
                <span className={`text-xs font-bold ${isOn ? "text-blue-600" : "text-gray-400"}`}>
                  +{formatPrice ? formatPrice(addon.priceModifier) : addon.priceModifier}
                </span>
                {/* Toggle switch */}
                <div
                  className={`w-10 h-5 rounded-full transition-colors duration-200 relative ${
                    isOn ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                      isOn ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
