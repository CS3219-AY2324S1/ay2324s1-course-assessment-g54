# CS3219 AY2324S1 Project

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

## Frontend Microservice

### Getting started

Ensure that your current directory is the `frontend` folder of the project. Install the necessary dependencies if you have not by running the following command in your terminal. 
```bash
yarn install --frozen-lockfile
```
To start the development server on `http://localhost:3000`, run the following command in your terminal.
```bash
yarn start
```

## Users Microservice

### Getting started

Ensure that your current directory is the `users` folder of the project. Install the necessary dependencies if you have not by running the following command in your terminal. 
```bash
yarn install --frozen-lockfile
```
To start the development server on `http://localhost:3002`, ensure that you already have docker installed and that your current directory is the `root` folder of the project. Then, start the docker containers by running the following command in your terminal.
```bash
docker compose up
```
To directly access postgresql database using the terminal of the postgresql container, ensure that your docker containers are already running, then run the following commands in your terminal.
```bash
docker exec -it users sh
psql -U postgres
```