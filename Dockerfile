FROM node:12.16.3

# RUN mkdir -p /usr/src/app


WORKDIR /usr/src/app/express
# WORKDIR /usr/src/app/fastify

COPY package*.json ./server/express

RUN npm i

# ENV key=value

COPY . ./server/express

EXPOSE 3000

CMD npm run serve



