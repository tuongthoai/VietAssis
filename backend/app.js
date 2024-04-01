const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const routers = require("./routers/index.js");
const http = require("http");
const { createIo } = require("./utils/socketio.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routers);

const server = http.createServer(app);
createIo(server);

app.get("/", (req, res) => {
  res.send("Hello World from the backend!");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
