const express = require("express");
const chat = require("../controllers/chat.controller");

const routers = express.Router();

routers.post("/chat/create", chat.createNewMessage);

module.exports = routers;
