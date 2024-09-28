const express = require('express');
const app = express();
app.use(express.json());

const http = require('http'); 
const WebSocket = require('ws');


const server = http.createServer(app);

const wss = new WebSocket.Server({ server});

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
     
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


server.listen(3000, () => {
   console.log('Server is running on http://localhost:3000');
});

const router = require('./route/route');
app.use('/api', router);