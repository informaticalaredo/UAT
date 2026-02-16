
import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProductStep: React.FC<Props> = ({ value, onChange, onNext, onPrev }) => {
  return (
    <div className="animate-fade-in h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you plan to sell?</h2>
      <p className="text-gray-500 mb-8">This helps us tailor your store's initial setup.</p>
      
      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product niche or category</label>
          <input 
            type="text" 
            placeholder="e.g. Handmade jewelry, Organic dog treats, Tech accessories..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-shopify-green focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-lg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {['Clothing', 'Beauty', 'Home Decor', 'Art', 'Food', 'Digital products'].map(cat => (
            <button 
              key={cat}
              onClick={() => onChange(cat)}
              className="px-4 py-3 border-2 border-gray-100 rounded-xl text-left hover:bg-gray-50 transition-all text-gray-700 font-medium"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button onClick={onPrev} className="text-gray-500 font-medium hover:text-gray-800">Back</button>
        <button 
          onClick={onNext} 
          disabled={!value}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            !value ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-shopify-green text-white hover:opacity-90'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductStep;
