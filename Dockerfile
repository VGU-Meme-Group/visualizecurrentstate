FROM node:18-alpine 

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3812

CMD ["node", "Server.js"]
