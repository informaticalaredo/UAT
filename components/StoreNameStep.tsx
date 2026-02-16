
import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { getStoreNameSuggestions } from '../services/gemini';

interface Props {
  userData: UserData;
  onChange: (val: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StoreNameStep: React.FC<Props> = ({ userData, onChange, onNext, onPrev }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await getStoreNameSuggestions(userData.productType);
        setSuggestions(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuggestions();
  }, [userData.productType]);

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Give your store a name</h2>
      <p className="text-gray-500 mb-8">You can always change your store name later.</p>
      
      <div className="space-y-6 flex-1">
        <input 
          type="text" 
          placeholder="Store Name"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-shopify-green outline-none transition-all text-xl font-semibold"
          value={userData.storeName}
          onChange={(e) => onChange(e.target.value)}
        />

        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-emerald-800 font-bold flex items-center">
              <span className="mr-2">✨</span> Gemini Suggestions
            </h3>
            {loading && <span className="text-xs text-emerald-600 animate-pulse">Thinking...</span>}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button 
                key={idx}
                onClick={() => onChange(s)}
                className="bg-white px-4 py-2 rounded-full text-sm border border-emerald-200 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
              >
                {s}
              </button>
            ))}
            {!loading && suggestions.length === 0 && (
              <p className="text-sm text-emerald-600">Enter a product niche for suggestions.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button onClick={onPrev} className="text-gray-500 font-medium hover:text-gray-800">Back</button>
        <button 
          onClick={onNext} 
          disabled={!userData.storeName}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            !userData.storeName ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-shopify-green text-white hover:opacity-90'
          }`}
        >
          Create my store
        </button>
      </div>
    </div>
  );
};

export default StoreNameStep;
