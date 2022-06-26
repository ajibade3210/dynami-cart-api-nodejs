const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server Is Running On Port: ${PORT}`);
  });
}

startServer();
