const chatService = require("../services/chat.service");

exports.createNewMessage = async (req, res) => {
  try {
    const { history, prompt } = req.body;
    const resData = await chatService.createNewMessage(history, prompt);
    return res.json(resData);
  } catch (error) {
    console.log(error);
    return res.send({
      status: error.code || 400,
      message: error.message,
    });
  }
};
