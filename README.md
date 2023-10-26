# CS3219 AY2324S1 Project

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)


### Getting started

Install the necessary dependencies in all the micro services if you have not by running the following command in your terminal within each of the individual service folders. 
```bash
yarn install --frozen-lockfile
```
To start the development server, ensure that you already have docker installed and that your current directory is the `root` folder of the project. Then, start the docker containers by running the following command in your terminal.
```bash
docker compose -f compose.yml -f compose.development.yml up
```
If you have not, or there has been an update to the `postgresql` database migrations, go into the `users-service` folder and run the migrations by using the following commands. If you are facing an issue with the migration, it is quite likely that you previously already have an instance of PostgreSQL running on your device. Kill that instance of PostgreSQL and start the containers again before migrating your database. 
```bash
cd users-service
yarn knex migrate:up
```
During development, if there is a need to access the terminals of any of the docker containers, the commands are below. 
```bash
docker exec -it frontend-service sh
```
```bash
docker exec -it question-service sh
```
```bash
docker exec -it users-service sh
```
```bash
docker exec -it matchmaking-service sh
```
```bash
docker exec -it postgresql sh
```

## Question Microservice

### Getting started

If you are using the Atlas Mongo DB, follow the instructions below. Else, you can ignore it.
First, in the `Security` section of the left navigation, click `Network Access`.
Then, click `Add IP Address` and add your current IP address so that you will be whitelisted.

To create new database users, in the `Security` section, click `Database Access`. Then, click `Add New Database User` and select the required Authentication Method and User Privileges. Alternatively, you can use the `testuser` has already been created.

Install the necessary dependencies for the Question Service using 
```bash
yarn install --frozen-lockfile
```
Get the .env file from Juliet and paste it in the `question-service` folder.
To start the development server on `http://localhost:3002`, ensure that you already have docker installed and that your current directory is the `root` folder of the project. Then, start the docker containers by running the following command in your terminal.
```bash
docker compose -f compose.yml -f compose.development.yml up
```
If you are only working on the question-service, you can run this:
```bash
nodemon index.js
```
For debuging, to get the GUI of the mongo-db, go to `http://localhost:8081/`

## Users Microservice

### Getting started

Copy the contents `.env.example` file into `.env` in the `users` folder of the project and change the necessary environment variables.

Ensure that your current directory is the `users` folder of the project. Install the necessary dependencies if you have not by running the following command in your terminal. 
```bash
yarn install --frozen-lockfile
```
To start the development server on `http://localhost:3002`, ensure that you already have docker installed and that your current directory is the `root` folder of the project. Then, start the docker containers by running the following command in your terminal.
```bash
docker compose -f compose.yml -f compose.development.yml up
```
To run the postgresql migrations in `/users/migrations`, ensure that your current directory is the `users` folder of the project, then run the following command in the terminal.
```bash
yarn knex migrate:up
```
If you encounter an error to the command above, there may be some other instance of postgres running in the background. Please kill that instance to resolve the error. For Mac, you can try:
```bash
brew services
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql@15.plist
```
To directly access the terminal of the users service container, ensure that your docker containers are already running, then run the following command in your terminal.
```bash
docker exec -it users sh
```
To directly access postgresql database using the terminal of the postgresql container, ensure that your docker containers are already running, then run the following commands in your terminal.
```bash
docker exec -it postgresql sh
psql -U postgres
```

For debugging, to get the GUI of the PostgreSQL server, go to `http://localhost:8082`.
On the left panel, click `Servers` > `Register` > `Server`.

Under `General`:
- Name = `docker-sql`

Under `Connection`:
- Hostname = `postgresql`
- Port = `5432`
- Maintainence-Databaee = `postgres`
- Username = `postgres`
- Postgres = `postgres`

Then click save and you can run queries on the postgres server!

## Matchmaking Microservice

### RabbitMQ

The matchmaking microservice uses [RabbitMQ](https://www.rabbitmq.com/) as a message broker. To access the management UI, go to http://localhost:15672 after starting the `rabbitmq` docker container. 

## Judge0 
A sample UI for the Judge0 server is avaliable on `http://localhost:2358/dummy-client.html`.

If you have an error on the Mac:

- Change the config of `deprecatedCgroupv1` to `true` in

```bash
vim ~/Library/Group\ Containers/group.com.docker/settings.json
```

- Then, in `Docker` go to `Settings` > `Features` in development enable checkbox for `Use` > enable checkbox for Rosetta for `x86/amd64 emulation on Apple Silicon`
