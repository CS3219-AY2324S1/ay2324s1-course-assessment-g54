# CS3219 AY2324S1 Project

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

## Frontend Microservice

### Getting started

Ensure that your current directory is the `frontend` folder of the project. Install the necessary dependencies if you have not by running the following command in your terminal. 
```bash
yarn install --frozen-lockfile
```
To start the development server on `http://localhost:3000`, ensure that you already have docker installed and that your current directory is the `root` folder of the project. Then, start the docker containers by running the following command in your terminal.
```bash
docker compose up
```
To directly access the terminal of the frontend container, ensure that your docker containers are already running, then run the following command in your terminal.
```bash
docker exec -it frontend sh
```

## Question Microservice

### Getting started

First, in the `Security` section of the left navigation, click `Network Access`.
Then, click `Add IP Address` and add your current IP address so that you will be whitelisted.

To create new database users, in the `Security` section, click `Database Access`. Then, click `Add New Database User` and select the required Authentication Method and User Privileges. Alternatively, you can use the `testuser` has already been created.

Install the necessary dependencies for the Question Service using 
```bash
npm install
```

To run the Question Service (for now), run
```bash
node index.js
```

## Users Microservice

### Getting started

Copy the contents `.env.example` file into `.env` in the `users` folder of the project and change the necessary environment variables.

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
