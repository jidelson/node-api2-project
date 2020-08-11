const express = require("express");
const port = 8000; 
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
  <h2>Welcome to api 2!!!</h2>
  `)
});

const hubsRouter = require("./data/routers/router.js");

server.use("/api/posts", hubsRouter);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
