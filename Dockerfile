FROM node:20 as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
RUN npm run prisma:generate
RUN npm run build
EXPOSE ${APP_PORT}
CMD [ "npm", "run", "start:prod" ]