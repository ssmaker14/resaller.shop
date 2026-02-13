
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProductInsight = async (productName: string, description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, 2-sentence persuasive marketing blurb for a product named "${productName}". Description: ${description}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "This premium product is selected for quality and durability, ensuring a great experience for every customer.";
  }
};

export const getShoppingAssistantResponse = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are a friendly shopping assistant for resaller.shop. Keep your answers helpful, concise, and professional.",
      }
    });
    return response.text;
  } catch (error) {
    return "I'm having trouble connecting to my brain right now, but I can tell you that our support team is available 24/7!";
  }
};
