## Locally installed images
- sudo docker images

## run container
- sudo docker run --it -d --name demo_nginx -p 8000:80 nginx:alpine
    :- -it : interactive mode.
    :- -d : run in detached mode. Resumes again in command mode. Runs in background mode
    :- -p : port (locally:container port)

## Running container
- sudo docker pi

## All container
- sudo docker ps -a

## To go to container
- sudo docker exec -it "containerId" /bin/sh

## Stop container
- sudo docker stop "name or containerId"

## Start container
- sudo docker start "name or containerId"

## Remove docker container
- sudo docker rm "name or containerId

## Docker Compose

It is a file that can be used to run multi container docker application

### Docker File

- filename:- DockerFile

FROM nginx:alpine
COPY ./index.html /usr/share/nginx/html/index.html

### Run docker file

sudo docker build -t "name":v1 -f "filename"

## Composing
sudo docker compose up -d

# Github link
github.com/deesirouss/laravelDemo