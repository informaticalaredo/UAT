
export enum OnboardingStep {
  WELCOME = 'welcome',
  SELLING_STAGE = 'selling_stage',
  PLATFORMS = 'platforms',
  PRODUCT_TYPE = 'product_type',
  STORE_NAME = 'store_name',
  CREATING = 'creating',
  DASHBOARD = 'dashboard'
}

export interface UserData {
  stage: string;
  platforms: string[];
  productType: string;
  storeName: string;
  email: string;
}

export interface GeminiResponse {
  suggestions?: string[];
  strategy?: string;
  nicheInsights?: string;
}
