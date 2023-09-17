# syntax=docker/dockerfile:1
FROM node:lts-alpine
WORKDIR /app
COPY ["package.json", "yarn.lock", "."]
RUN yarn install --frozen-lockfile
COPY . .
EXPOSE 3001
CMD yarn start
