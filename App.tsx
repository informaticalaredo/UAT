
import React, { useState, useEffect } from 'react';
import { OnboardingStep, UserData } from './types';
import WelcomeStep from './components/WelcomeStep';
import StageStep from './components/StageStep';
import PlatformStep from './components/PlatformStep';
import ProductStep from './components/ProductStep';
import StoreNameStep from './components/StoreNameStep';
import CreatingStep from './components/CreatingStep';
import Dashboard from './components/Dashboard';
import { getBusinessStrategy } from './services/gemini';

const App: React.FC = () => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.WELCOME);
  const [userData, setUserData] = useState<UserData>({
    stage: '',
    platforms: [],
    productType: '',
    storeName: '',
    email: '',
  });
  const [strategy, setStrategy] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const steps = Object.values(OnboardingStep);
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps = Object.values(OnboardingStep);
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  useEffect(() => {
    if (step === OnboardingStep.CREATING) {
      const generateStrategy = async () => {
        try {
          const res = await getBusinessStrategy(userData);
          setStrategy(res);
          // Simulate the "creating" progress
          setTimeout(() => {
            setStep(OnboardingStep.DASHBOARD);
          }, 3500);
        } catch (error) {
          console.error("Strategy error", error);
          setStep(OnboardingStep.DASHBOARD);
        }
      };
      generateStrategy();
    }
  }, [step, userData]);

  const renderStep = () => {
    switch (step) {
      case OnboardingStep.WELCOME:
        return <WelcomeStep onNext={nextStep} />;
      case OnboardingStep.SELLING_STAGE:
        return <StageStep value={userData.stage} onChange={(val) => updateUserData({ stage: val })} onNext={nextStep} onPrev={prevStep} />;
      case OnboardingStep.PLATFORMS:
        return <PlatformStep value={userData.platforms} onChange={(val) => updateUserData({ platforms: val })} onNext={nextStep} onPrev={prevStep} />;
      case OnboardingStep.PRODUCT_TYPE:
        return <ProductStep value={userData.productType} onChange={(val) => updateUserData({ productType: val })} onNext={nextStep} onPrev={prevStep} />;
      case OnboardingStep.STORE_NAME:
        return <StoreNameStep userData={userData} onChange={(val) => updateUserData({ storeName: val })} onNext={nextStep} onPrev={prevStep} />;
      case OnboardingStep.CREATING:
        return <CreatingStep storeName={userData.storeName} />;
      case OnboardingStep.DASHBOARD:
        return <Dashboard userData={userData} strategy={strategy} onReset={() => setStep(OnboardingStep.WELCOME)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
        {/* Header Progress Bar */}
        {step !== OnboardingStep.DASHBOARD && step !== OnboardingStep.WELCOME && step !== OnboardingStep.CREATING && (
          <div className="w-full h-1.5 bg-gray-100">
            <div 
              className="h-full bg-shopify-green transition-all duration-500 ease-in-out" 
              style={{ width: `${(Object.values(OnboardingStep).indexOf(step) / (Object.values(OnboardingStep).length - 2)) * 100}%` }}
            />
          </div>
        )}
        
        <div className="flex-1 flex flex-col p-8 md:p-12">
          {renderStep()}
        </div>
      </div>
      
      <p className="mt-8 text-gray-500 text-sm">
        Shopify Simulator &copy; 2024 • Build with Gemini AI
      </p>
    </div>
  );
};

export default App;
