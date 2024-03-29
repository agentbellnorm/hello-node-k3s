FROM docker.io/arm64v8/node:16-bullseye-slim

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 3000

CMD [ "node", "index.js" ]