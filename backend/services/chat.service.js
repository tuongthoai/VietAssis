const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.KEY_API_GEMINI);
const modelGemini = genAI.getGenerativeModel({ model: "gemini-pro" });

exports.createNewMessage = async (prompt) => {
  const chatGemini = modelGemini.startChat({
    generationConfig: {
      temperature: 0.9,
      topP: 1,
      topK: 1,
      maxOutputTokens: 4096,
    },
  });
  let answer = ``;
  const result = await chatGemini.sendMessageStream(prompt);
  for await (const payload of result.stream) {
    try {
      const item = payload.text();
      if (item) {
        answer += item;
        console.log(answer);
      }
    } catch (e) {
      console.error(e);
    }
  }
  return {
    message: answer,
  };
};
