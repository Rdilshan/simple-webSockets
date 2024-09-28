const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const http = require("http");
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
const clients = [];

wss.on("connection", (ws) => {
  const clientId = uuidv4();
  console.log(`New WebSocket client connected with ID: ${clientId}`);

  clients.push({ id: clientId, socket: ws });

  ws.on("message", (message) => {
    console.log("Received:", message);
    
    clients.forEach((client) => {

      if ((client.id != clientId)) {
        if (client.socket.readyState === WebSocket.OPEN) {
          client.socket.send(`${message}`);
        }
      }

    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const router = require("./route/route");
app.use("/api", router);
