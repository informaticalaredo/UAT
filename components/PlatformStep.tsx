
import React from 'react';

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const options = [
  { id: 'store', label: "An online store", icon: "🌐" },
  { id: 'social', label: "Social media", icon: "📱" },
  { id: 'existing_site', label: "An existing website or blog", icon: "💻" },
  { id: 'markets', label: "In person", icon: "🤝" },
  { id: 'marketplaces', label: "Marketplaces (Amazon, eBay, etc.)", icon: "🛍️" },
];

const PlatformStep: React.FC<Props> = ({ value, onChange, onNext, onPrev }) => {
  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(v => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Where would you like to sell?</h2>
      <p className="text-gray-500 mb-8">Pick as many as you like. You can always change these later.</p>
      
      <div className="grid grid-cols-1 gap-4 flex-1">
        {options.map((opt) => (
          <label 
            key={opt.id}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              value.includes(opt.id) ? 'border-shopify-green bg-emerald-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded text-shopify-green focus:ring-shopify-green border-gray-300"
              checked={value.includes(opt.id)}
              onChange={() => toggle(opt.id)}
            />
            <span className="ml-4 text-2xl">{opt.icon}</span>
            <span className="ml-3 font-semibold text-gray-900">{opt.label}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button onClick={onPrev} className="text-gray-500 font-medium hover:text-gray-800">Back</button>
        <button 
          onClick={onNext} 
          disabled={value.length === 0}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            value.length === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-shopify-green text-white hover:opacity-90'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlatformStep;
