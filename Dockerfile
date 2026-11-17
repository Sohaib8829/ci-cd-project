FROM node:22-alpine

WORKDIR /app

COPY package*json .

RUN npm ci

ARG APP_VERSION

ENV APP_VERSION=$APP_VERSION

COPY . .

EXPOSE 3000

CMD ["npm","start"]
