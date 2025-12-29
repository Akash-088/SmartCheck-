
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeResume = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Analyze the following resume against the job description.
      
      RESUME:
      ${resumeText}
      
      JOB DESCRIPTION:
      ${jobDescription}
    `,
    config: {
      systemInstruction: `
        You are an expert ATS (Applicant Tracking System) and HR recruiter. 
        Your task is to provide a detailed match analysis.
        Return a JSON response with:
        - score: A number from 0 to 100 indicating fit.
        - missingSkills: An array of key skills mentioned in the job description but not clearly demonstrated in the resume.
        - suggestions: An array of objects each with "category" (e.g., Experience, Skills, Formatting) and "description" (specific tip).
        - overview: A brief summary of why the candidate is or isn't a good fit.
      `,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          missingSkills: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["category", "description"]
            }
          },
          overview: { type: Type.STRING }
        },
        required: ["score", "missingSkills", "suggestions", "overview"]
      }
    },
  });

  const response = await model;
  const jsonStr = response.text || "{}";
  return JSON.parse(jsonStr);
};
