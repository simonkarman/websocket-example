import express from 'express';
import https from 'https';
import fs from 'fs';
import WebSocket from 'ws';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { healthRouter } from './routers/health-router';
import { sessionRouter } from './routers/session-router';

// eslint-disable-next-line no-process-env
const portHTTP = process.env.PORT_HTTP || 80;
// eslint-disable-next-line no-process-env
const portHTTPS = process.env.PORT_HTTPS || 443;

// HTTP => HTTPS redirect
const http = express();
http.get('*', (req, res) => {
  const url = 'https://' + req.headers.host + req.url;
  console.info('Redirecting HTTP to HTTPS:', url);
  res.redirect(301, url);
});
http.listen(portHTTP, () => {
  console.info(`Redirecting HTTP to HTTPS on port ${portHTTP}`);
});

// HTTPS server
const app = express();
const server = https.createServer({
  key: fs.readFileSync('certs/server.key', 'utf8'),
  cert: fs.readFileSync('certs/server.crt', 'utf8'),
}, app);
app.use(cors({
  credentials: true,
  origin: ['https://localhost', 'https://ws.karman.dev'],
  methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRouter);
app.use('/sessions', sessionRouter);

// WebSocket server
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws: WebSocket, req) => {
  console.info('websocket connection:', req.socket.remoteAddress);
  ws.on('message', (message: string) => {
    console.info('websocket received:', message.toString());
    ws.send(`Hello, you sent -> ${message}`);
  });
  ws.send('Hi there, I am a WebSocket server');
});

// Start server
server.listen(portHTTPS, () => {
  console.info(`Listening on port ${portHTTPS}`);
});
