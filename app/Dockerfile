FROM node:8.4

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm test

EXPOSE 3000

CMD [ "node", "index.js" ]
