const http = require('http'); // built in node.js module to handle http traffic

const hostname = 'localhost'; // the local computer where the server is running
const port = 8000; // a port we'll use to watch for traffic

const server = express();
const hubsRouter = require("./data/routers/router.js");


server.use("/api/posts", hubsRouter);

server.listen(port, hostname, () => {
  // start watching for connections on the port specified
  console.log(`Server running at http://${hostname}:${port}/`);
});