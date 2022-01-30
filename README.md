# WebSocket Example
This repository contains the TypeScript implementation of a WebSocket server, including the Dockerfile to run it as a container. It is written by [Simon Karman](https://www.simonkarman.nl).

## Getting Started

### Installing dependencies
To get started install all dependencies.
```bash
npm install
```

### Generating a self signed certificate
Generate a certificate by following the instruction from the [generating self signed certificates](https://www.simonkarman.nl/projects/generating-certificates) tutorial.

Make sure the `certs/server.key` and `certs/server.crt` exist.

### Running in development mode
You can now run the server in dev mode. If you make a change to a `.ts` or `.json` file the server will automatically restart.
```
npm run dev
```

### Running as a container
If you want to run the server as a container, you can use the provided docker image. First make sure that your (self signed) root certificate is trusted on the devices froim which you want to reach the server and secondly make sure that your DNS records point to the location where you server is running.

You build and run the docker image like so.
```
docker build . --tag websocket-example
docker run -d --rm -p 80:80 -p 443:443 websocket-example
```

You're application should now be available on the domain name used in the certificate.