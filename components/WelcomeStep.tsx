
import React from 'react';

interface Props {
  onNext: () => void;
}

const WelcomeStep: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-full">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Shopify_Logo.png" 
        alt="Shopify Logo" 
        className="h-12 mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">The path to your first sale starts here</h1>
      <p className="text-lg text-gray-600 mb-10 max-w-md">
        Join millions of entrepreneurs who chose Shopify to build their business. Let's get your store set up in minutes.
      </p>
      <button 
        onClick={onNext}
        className="bg-shopify-green text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-all shadow-md active:scale-95"
      >
        Start free trial
      </button>
      <p className="mt-6 text-sm text-gray-400">
        No credit card required. Simulator only.
      </p>
    </div>
  );
};

export default WelcomeStep;
