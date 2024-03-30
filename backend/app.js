const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const routers = require("./routers/index.js");

app.use(express.json());
app.use(cors());
app.use("/api", routers);

app.get("/", (req, res) => {
  res.send("Hello World from the backend!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
