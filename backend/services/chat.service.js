const { v4: uuidv4 } = require("uuid");
const { answerGemini } = require("./gemini.service");

exports.createNewMessage = async (prompt) => {
  const messageId = uuidv4();
  answerGemini(prompt, messageId);
  return { messageId };
};
