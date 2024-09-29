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
let clients = [];

wss.on("connection", (ws) => {
  const clientId = uuidv4();
  console.log(`New WebSocket client connected with ID: ${clientId}`);

  ws.on("message", (message) => {
    let parsedMessage;

    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error("Invalid JSON:", message);
      return;
    }
    console.log(parsedMessage);
    
    if (parsedMessage.activityType === "assignName") {
      const userName = parsedMessage.name;

      clients.push({ id: clientId, socket: ws, name: userName });

      clients = clients.filter(
        (client) => client.socket.readyState === WebSocket.OPEN
      );

      console.log(`Client ${clientId} identified as ${userName}`);

      clients.forEach((client) => {
        if (client.socket.readyState === WebSocket.OPEN) {
          const clientsData = clients.map(({ id, name }) => ({ id, name }));
          client.socket.send(
            JSON.stringify({ activityType: "assignId", clients: clientsData })
          );
        }
      });
    }

    if (parsedMessage.activityType === "sendMessage") {
      clients.forEach((client) => {
        if (client.id != clientId) {
          if (client.socket.readyState === WebSocket.OPEN) {
            // client.socket.send(`${parsedMessage.message}`);
            client.socket.send(
              JSON.stringify({
                activityType: "sendMessage",
                message: `${parsedMessage.message}`,
              })
            );
          }
        }
      });
    }
  });

  ws.on("close", () => {
    clients = clients.filter(
      (client) => client.socket.readyState === WebSocket.OPEN
    );

    clients.forEach((client) => {
      if (client.socket.readyState === WebSocket.OPEN) {
        const clientsData = clients.map(({ id, name }) => ({ id, name }));
        client.socket.send(
          JSON.stringify({ activityType: "assignId", clients: clientsData })
        );
      }
    });

    
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

const router = require("./route/route");
app.use("/api", router);
