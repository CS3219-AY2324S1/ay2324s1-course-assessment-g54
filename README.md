# CS3219 AY2324S1 Project

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)


### Getting started

Start by ensuring that you have NodeJS and Yarn installed. The following commands should show the version of NodeJS and Yarn you have installed. 
```bash
node --version
yarn --version
```

Run the installation script for the development environment using the following command. 
```
bash install-deps-dev.sh
```

Migrate your database for users service and history service to the latest update by running the following commands. 
```
cd users-service
yarn knex migrate:latest
cd ../history-service
yarn knex migrate:latest
cd ..
```

Copy `.env.example` in `./users-service` into `.env` to set the environment variables for users service. Please remember to change your `JWT_SECRET`. 

Ensure that you have docker installed in your system. The following command should show the version of Docker you have installed. 
```
docker --version
```

To start the containers in the development environment, run the following command. 
```
bash start-dev.sh
```

When you start the containers for the first time, go into the PostgreSQL container and create 2 databases, users and history. 
```
docker exec -it postgresql sh
psql -U postgres
create database users;
create database history;
```

Then, go into the users-service and history-service and run the database migrations.
```
cd users-service
yarn knex migrate:latest
cd history-service
yarn knex migrate:latest
```

The following list shows the connection details for each of the microservice used in this application. 

Services:
- Frontend: http://localhost:3000
- Questions Service: http://localhost:3001
- Users Service: http://localhost:3002
- Matchmaking Service: ws://localhost:3003
- Collaboration Service: ws://localhost:3004
- History Service: http://localhost:3005
- Video Service: ws://localhost:3006
- Python Formatter Service: http://localhost:5000

Databases:
- MongoDB: Port 27017
- Postgresql: Port 5432
- Redis: Port 6379

Development Tools:
- MongoExpress: http://localhost:8081
- PgAdmin: http://localhost:8082
  - Email: test@example.com
  - Password: test
- RedisInsight: http://localhost:8083
