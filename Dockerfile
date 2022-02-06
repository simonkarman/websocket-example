FROM node:14 as builder

WORKDIR /build
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY src/ .
RUN npm run build

FROM node:14

WORKDIR /usr/src/app
COPY --from=builder /build/package*.json ./
RUN npm ci --production

# certs should not be part of the docker image, but should be dynamically loaded at some point
COPY certs/ certs/

COPY --from=builder /build/dist ./

EXPOSE 80 443
CMD [ "node", "server.js" ]