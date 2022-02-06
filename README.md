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

Make sure your root certifiate is added to the trust store of your operating system and that the `certs/server.key` and `certs/server.crt` exist.

> Note: In MacOS ensure that in 'Keychain Access' the certificate is set to 'always trust' and for `curl` to pickup the self signed certificate you have to install curl via brew (`brew install curl`) and then link it (`brew link curl`).

### Running in development mode
You can now run the server in dev mode. If you make a change to a `.ts` or `.json` file the server will automatically restart.
```
docker-compose up -d mongodb
DB=mongodb DB_HOST=localhost DB_USER=root DB_PASSWORD=changeme DB_NAME=example DB_PORT=7017 npm run dev
```

### Running as a container
If you want to run the server as a container, you can use the provided docker image. First make sure that your (self signed) root certificate is trusted on the devices from which you want to reach the server and secondly make sure that your DNS records point to the location where you server is running.

You build and run the docker image like so.
```
docker build . --tag websocket-example
docker-compose up -d
```

You're application should now be available on the domain name used in the certificate.

> TODO: certificates should not be baked into the image but should be fetched during container startup

## Examples
```
# Login
curl -X POST -H "Authorization: Basic $(echo -ne "simon:123" | base64)" -v https://ws.karman.dev/sessions

# Get Session
curl -H "Cookie: session-token=<token-here>" -v https://ws.karman.dev/sessions
```

> TODO: create postman collection