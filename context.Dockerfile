# this docker file does nothing but make it easy to test your .dockerignore
# use same image as Dockerfile so we don't have to download any additional ones
FROM python:3.14-slim

WORKDIR /context

COPY . .
