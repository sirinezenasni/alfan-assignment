FROM node:14.16.0-alpine3.10

# Add git
RUN apk update && apk add --no-cache git bash \
    && mkdir -p /client

VOLUME /client
WORKDIR /client

EXPOSE 3000
