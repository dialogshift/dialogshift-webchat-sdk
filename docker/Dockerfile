FROM node:16-bullseye

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get -y upgrade
RUN apt-get -y --no-install-recommends install python3 python3-pip python3-dev jq git

RUN npm install -g uglify-js

RUN pip3 install awscli