/// <reference types="vite/client" />

import { GoogleGenerativeAI } from "@google/generative-ai";

// Access the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a Linux Terminal assistant embedded in a portfolio website. Respond briefly, like a command line tool or a helpful dev bot. If the user asks about the portfolio owner, be creative and say they are a great engineer. Output format: Plain text, minimal formatting, no markdown code blocks unless requested.",
    });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: System process failed. Check network connection or API key.";
  }
};
