
import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const options = [
  { id: 'just_starting', label: "I'm just starting", description: "I've got a great idea but haven't sold anything yet." },
  { id: 'selling_online', label: "I'm already selling online", description: "I'm moving my business from another platform." },
  { id: 'selling_person', label: "I'm selling in person", description: "I have a physical store or sell at markets/pop-ups." },
];

const StageStep: React.FC<Props> = ({ value, onChange, onNext, onPrev }) => {
  return (
    <div className="animate-fade-in h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Let’s get started. Which of these best describes you?</h2>
      <p className="text-gray-500 mb-8">We’ll help you set up your store based on your business needs.</p>
      
      <div className="space-y-4 flex-1">
        {options.map((opt) => (
          <label 
            key={opt.id}
            className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
              value === opt.id ? 'border-shopify-green bg-emerald-50' : 'border-gray-100 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <input 
                type="radio" 
                name="stage" 
                className="w-5 h-5 text-shopify-green border-gray-300 focus:ring-shopify-green"
                checked={value === opt.id}
                onChange={() => onChange(opt.id)}
              />
              <div className="ml-4">
                <span className="block font-semibold text-gray-900">{opt.label}</span>
                <span className="text-sm text-gray-500">{opt.description}</span>
              </div>
            </div>
          </label>
        ))}
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

export default StageStep;
