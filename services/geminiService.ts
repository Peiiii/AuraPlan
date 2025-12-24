
import { GoogleGenAI, Type } from "@google/genai";
import { TimeScale } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getCreativeInsight(scale: TimeScale, tasks: string[]) {
    const prompt = `你是一位富有远见的人生导师和哲学家。
    用户正在审视他们的“${scale}”视角下的计划。
    当前任务/目标：${tasks.length > 0 ? tasks.join(', ') : '暂无任务'}。
    
    请提供一个富有创意、诗意且充满想象力的洞察。
    - 如果是“今日”，侧重正念与细微的美。
    - 如果是“本周/本月”，侧重节奏、韵律与阶段性进展。
    - 如果是“年度/五年”，侧重变革、生命轨迹与宏大图景。
    - 如果是“一生”，侧重生命传承、本质意义以及你在这个世界留下的印记。
    
    请务必使用中文回答，并返回如下 JSON 对象：
    - prompt: 给用户的一段简短的创意写作引导。
    - suggestion: 一个富有想象力的行动建议或视角转变。
    - vision: 一句描述该时间维度之美的高度诗意的话语。`;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              prompt: { type: Type.STRING },
              suggestion: { type: Type.STRING },
              vision: { type: Type.STRING }
            },
            required: ["prompt", "suggestion", "vision"]
          }
        }
      });

      return JSON.parse(response.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      return {
        prompt: "今天有什么事能让你感到由衷的喜悦？",
        suggestion: "深呼吸，在静默中寻找 60 秒的安宁。",
        vision: "每一刻都是一块等待你挥洒独特色彩的画布。"
      };
    }
  }
}

export const geminiService = new GeminiService();
