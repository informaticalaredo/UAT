
import { GoogleGenAI, Type } from "@google/genai";
import { UserData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStoreNameSuggestions = async (productType: string): Promise<string[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest 5 creative and catchy Shopify store names for a business that sells ${productType}. Return only a JSON array of strings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return ["My Awesome Store", "The Marketplace", "E-shop Hub"];
  }
};

export const getBusinessStrategy = async (userData: UserData): Promise<string> => {
  const prompt = `
    Generate a short, professional "Launch Strategy" for a new Shopify merchant.
    User Details:
    - Product: ${userData.productType}
    - Store Name: ${userData.storeName}
    - Selling Stage: ${userData.stage}
    - Target Platforms: ${userData.platforms.join(', ')}

    Provide 3 actionable steps in Markdown format (bullet points). Focus on marketing and growth. Keep it under 200 words.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });

  return response.text || "Start by listing your products and sharing your store on social media!";
};
