## Description

This project was created to study docker and docker compose. It's a simple TODO LIST app.

The app was developed using:
 - API: [NESTJS](https://nestjs.com/) and [mongoose](https://mongoosejs.com/).
 - FRONTEND: [react(vite) - Typescript](https://vite.dev/)
 - Hosted frontend in [Docker](https://www.docker.com/) using [NGINX](https://nginx.org/)

## Running in Docker

In the root folder, use the follow commands to start and stop containers:

To create and run the containers
```bash
$ docker compose up -d
```

To stop and remove it
```bash
docker compose down
```

In case any change on source code, an image rebuild is needed. Use:
```bash
docker compose up --build --force-recreate -d
```

In order to delete all, including volume(mongo):
```bash
docker compose down --rmi all -v
```

## Compile and run the project

### Database
Install and run mongodb using docker:
```bash
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=${user}}$ -e MONGO_INITDB_ROOT_PASSWORD=${pass} -v db-data:/data/db mongo
```

### Backend
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### .env file example file
```
NODE_ENV=production
PORT=3001
MONGO_URL=mongodb://${user}:${pass}@mongodb:27017/task_db_prod?authSource=admin
BUILD_VERSION=1.0.0-prod
```

### Debugging using VSCODE
Create a ```launch.json``` file using the follow content inside .vscode folder at the project todo-api root:
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Nest Framework",
      "args": ["${workspaceFolder}/src/main.ts"],
      "runtimeArgs": ["--nolazy", "-r", "ts-node/register", "-r", "tsconfig-paths/register"],
      "sourceMaps": true,
      "envFile": "${workspaceFolder}/.env",
      "cwd": "${workspaceRoot}",
      "console": "integratedTerminal",
      "protocol": "inspector"
    }
  ]
}
```

## Frontend
```bash
# development
$ npm run dev

# build
$ npm run build
```

### .env file example file
```
VITE_API_URL= "http://localhost:3001/v1"
```

## Open at browser

use ```http://localhost:3000```