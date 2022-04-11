# PROD CONFIG
FROM node:16-alpine as prod

WORKDIR /app

COPY ./package*.json ./

RUN npm install

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install

WORKDIR /app

COPY . .

EXPOSE 5000 3000 8000

ENV NODE_ENV=production

CMD [ "npm", "run", "docker-start" ]