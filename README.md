# alfan-assignment
Alfan Assignment

## Requirements

- docker: https://docs.docker.com/get-docker/
- docker-compose: https://docs.docker.com/compose/install/

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

## Run

Once connected to alfan-backend container, run: `npm start`

Once connected to alfan-frontend container, run: `npm start`

## Access

Postgres local Database: see credentials in `.env` file. Port `5439`

Alfan frontend: http://localhost:8001/

Alfan backend: http://localhost:8002/
