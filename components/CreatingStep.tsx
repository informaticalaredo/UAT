
import React, { useState, useEffect } from 'react';

interface Props {
  storeName: string;
}

const CreatingStep: React.FC<Props> = ({ storeName }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing store...");

  const statusMessages = [
    "Setting up your dashboard...",
    "Generating AI business strategy...",
    "Optimizing checkout flow...",
    "Finalizing configurations...",
    "Ready to launch!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        const step = Math.floor(p / 20);
        setStatus(statusMessages[step] || statusMessages[statusMessages.length - 1]);
        return p + 1.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-full">
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-100"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={377}
            strokeDashoffset={377 - (377 * progress) / 100}
            className="text-shopify-green transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Creating {storeName}</h2>
      <p className="text-gray-500 font-medium animate-pulse">{status}</p>
      
      <div className="mt-12 max-w-sm text-center bg-gray-50 p-4 rounded-xl">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-bold">Pro Tip</p>
        <p className="text-sm text-gray-600">Over 1,000,000 businesses use Shopify to power their sales around the globe.</p>
      </div>
    </div>
  );
};

export default CreatingStep;
