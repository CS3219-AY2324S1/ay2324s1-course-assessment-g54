# syntax=docker/dockerfile:1
FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", ".", ".env"]
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3002
CMD yarn start
