FROM node:17

WORKDIR /usr/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start" ]