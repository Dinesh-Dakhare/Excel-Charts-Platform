import openai from "../util/openai.js";
import groq from "../util/groq.js";

export const generateSummary = async (req, res) => {
  try {
    const { chartData } = req.body;


    const prompt = `
    Analyze this chart data and write a summary with trends, highs, and lows:
    ${JSON.stringify(chartData)}
    `;


  const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ free + fast
      messages: [{ role: "user", content: prompt }],
    });

    const summary = response.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
   
    
  }
};
