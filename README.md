# alfan-assignment
Alfan Assignment

## Requirements

- docker: https://docs.docker.com/get-docker/
- docker-compose: https://docs.docker.com/compose/install/
- google api: https://console.cloud.google.com/apis
- create OAuth 2.0 client: https://console.cloud.google.com/apis/credentials
- Authorised JavaScript origins: http://localhost:8001
- Authorised redirect URIs: http://localhost:8001/oauth2callback

## Docker

Run containers:

```
docker-compose up -d
```

Connect to dockers:

```
docker exec -it alfan-postgres bash
docker exec -it alfan-backend bash
docker exec -it alfan-frontend bash
```

## Install

### Backend

Copy .env.template file to .env and fill variables with your accounts data

Once connected to alfan-backend container, run: `npm install`

### Frontend

Once connected to alfan-frontend container, run: `npm install`

## Run

Once connected to alfan-backend container, run: `npm start`

Once connected to alfan-frontend container, run: `npm start`

## Access

Postgres local Database: see credentials in `.env` file. Port `5439`

Alfan frontend: http://localhost:8001/

Alfan backend: http://localhost:8002/
