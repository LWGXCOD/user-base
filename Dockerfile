FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm install @nestjs/cli

RUN npm run build

EXPOSE $PORT

CMD ["npm", "run", "start:prod"]