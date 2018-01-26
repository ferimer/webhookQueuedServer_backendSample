FROM node:8

LABEL MAINTAINER="Ferimer, Servicios Informáticos <devteam@ferimer.es>"

WORKDIR /opt
COPY src/ .

RUN yarn
USER node

ENTRYPOINT [ "node", "index.js" ]