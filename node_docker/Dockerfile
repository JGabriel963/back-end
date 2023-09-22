FROM node:18

WORKDIR /usr/server

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]