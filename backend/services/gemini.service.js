const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const { getIo } = require("../utils/socketio.js");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.KEY_API_GEMINI);
const modelGemini = genAI.getGenerativeModel({ model: "gemini-pro" });

exports.answerGemini = async (history, prompt, messageId) => {
  const io = await getIo();
  console.log(history);
  const chatGemini = modelGemini.startChat({
    history: history,
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
        console.log(answer)
        io.emit("objectEmit", {
          answer: answer,
          messageId: messageId,
        });
        console.log(answer);
      }
    } catch (e) {
      console.error(e);
    }
  }
  io.emit("objectEmit", {
    answer: "",
    messageId: messageId,
    completeAnswer: answer,
  })
};
