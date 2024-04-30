const { v4: uuidv4 } = require("uuid");
const { answerGemini } = require("./gemini.service");

exports.createNewMessage = async (history, prompt) => {
  const messageId = uuidv4();
  answerGemini(history, prompt, messageId);
  return { messageId };
};
