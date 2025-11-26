import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a Linux Terminal assistant embedded in a portfolio website. Respond briefly, like a command line tool or a helpful dev bot. If the user asks about the portfolio owner, be creative and say they are a great engineer. Output format: Plain text, minimal formatting, no markdown code blocks unless requested.",
      }
    });
    return response.text || "No response from system.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: System process failed. Check network connection or API key.";
  }
};
