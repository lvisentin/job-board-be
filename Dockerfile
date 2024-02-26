FROM node:20-slim

WORKDIR /home/node/app

cmd ['tail', '-f', '/dev/null']