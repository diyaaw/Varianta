interface ColorOption {
  id: string;
  label: string;
  hex: string;
  border?: boolean;
}

interface ColorPickerProps {
  label: string;
  colors: ColorOption[];
  selected: string;
  onChange: (id: string) => void;
}

export default function ColorPicker({ label, colors, selected, onChange }: ColorPickerProps) {
  return (
    <section>
      <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-4">
        {label}
      </h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            title={color.label}
            aria-label={`Select ${color.label}`}
            aria-pressed={selected === color.id}
            onClick={() => onChange(color.id)}
            className="flex flex-col items-center gap-1.5 group"
          >
            <span
              className={`w-10 h-10 rounded-full transition-all duration-200 ${
                color.border ? "border-2 border-gray-200" : ""
              } ${
                selected === color.id
                  ? "ring-2 ring-blue-600 ring-offset-2 scale-110"
                  : "hover:scale-105 hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
              }`}
              style={{ backgroundColor: color.hex }}
            />
            <span
              className={`text-[10px] font-semibold max-w-[52px] text-center truncate ${
                selected === color.id ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {color.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
