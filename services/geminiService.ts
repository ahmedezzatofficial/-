import { GoogleGenAI, ChatSession, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: ChatSession | null = null;

const getClient = (): GoogleGenAI => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set REACT_APP_GEMINI_API_KEY or VITE_GEMINI_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async (): Promise<ChatSession> => {
  if (chatSession) return chatSession;

  try {
    const ai = getClient();
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    throw error;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = await initializeChat();
    const result: GenerateContentResponse = await session.sendMessage({ message });
    return result.text || "عذراً، لم أتمكن من فهم ذلك. هل يمكنك المحاولة مرة أخرى؟";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "واجهنا مشكلة تقنية بسيطة. يرجى المحاولة لاحقاً.";
  }
};