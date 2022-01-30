import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws: WebSocket, req) => {
  console.info('websocket connection: ', req.socket.remoteAddress);
  ws.on('message', (message: string) => {
    console.info('websocket received: ', message.toString());
    ws.send(`Hello, you sent -> ${message}`);
  });
  ws.send('Hi there, I am a WebSocket server');
});

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
