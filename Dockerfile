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

COPY certs/ certs/

COPY --from=builder /build/dist ./

EXPOSE 80 443
CMD [ "node", "server.js" ]