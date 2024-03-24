const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
