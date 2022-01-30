# Websocket Example
This repository contains the TypeScript implementation of a Websocket server and client by [Simon Karman](https://www.simonkarman.nl).

# Getting Started
To get started install all dependencies.
```bash
npm install
```

Generate a certificate by following the instruction from the [generating self signed certificates](https://www.simonkarman.nl/projects/generating-certificates) tutorial. Make sure the `certs/server.key` and `certs/server.crt` exist and that your root certificate is trusted on your devices.

And run the project in dev mode.
```
npm run dev
```

You can also build and run the docker image.
```
docker build . --tag websocket-example
docker run -p 8443
```