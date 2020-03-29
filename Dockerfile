FROM node:latest

COPY . /app

WORKDIR /app

EXPOSE 3000

RUN npm install --production

CMD [ "node", "server.js" ]
