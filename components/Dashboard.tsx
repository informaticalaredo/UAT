
import React from 'react';
import { UserData } from '../types';

interface Props {
  userData: UserData;
  strategy: string;
  onReset: () => void;
}

const Dashboard: React.FC<Props> = ({ userData, strategy, onReset }) => {
  return (
    <div className="animate-fade-in flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-shopify-green rounded-lg flex items-center justify-center text-white font-bold mr-3">
            {userData.storeName.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-gray-900">{userData.storeName}</h2>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Trial: 14 days left</span>
          </div>
        </div>
        <button onClick={onReset} className="text-sm text-gray-400 hover:text-red-500 transition-colors">Logout (Reset)</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto">
        {/* Left Column: AI Strategy */}
        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 shadow-sm">
            <h3 className="text-emerald-800 font-bold mb-4 flex items-center">
              <span className="mr-2">🚀</span> AI Launch Strategy
            </h3>
            <div className="prose prose-sm text-emerald-900 leading-relaxed opacity-90">
              {strategy.split('\n').map((line, i) => (
                <p key={i} className="mb-2">{line}</p>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Store Checklist</h3>
            <div className="space-y-3">
              {[
                { label: 'Add your first product', done: false },
                { label: 'Customize theme', done: false },
                { label: 'Add a domain', done: false },
                { label: 'Set up payments', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 border-2 border-gray-200 rounded mr-3"></div>
                  <span className="text-gray-600 text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Analytics Simulation */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-gray-400 text-sm font-medium mb-1">Total Sales</h3>
            <div className="text-3xl font-bold mb-4">$0.00</div>
            <div className="h-24 flex items-end space-x-1">
              {[15, 30, 20, 45, 10, 25, 35].map((h, i) => (
                <div 
                  key={i} 
                  className="bg-emerald-500 w-full opacity-30 rounded-t"
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400">Your store is live and ready to receive orders!</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Active Channels</h3>
            <div className="flex flex-wrap gap-2">
              {userData.platforms.map(p => (
                <span key={p} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold capitalize">
                  {p.replace('_', ' ')}
                </span>
              ))}
              <span className="bg-shopify-green/10 text-shopify-green border border-shopify-green/20 px-3 py-1 rounded-full text-xs font-bold">
                Online Store
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 flex items-center justify-center space-x-4">
        <button className="bg-shopify-green text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 shadow-lg">
          Add Products
        </button>
        <button className="border-2 border-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-50">
          View Store
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
