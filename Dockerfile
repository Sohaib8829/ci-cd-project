FROM node:22-alpine

WORKDIR /app

COPY package*json .

RUN npm ci

ARG APP_VERSION

ENV APP_VERSION=$APP_VERSION

COPY --chown=node:node . .

EXPOSE 3000

USER node

CMD ["npm","start"]
