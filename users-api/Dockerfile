FROM mhart/alpine-node:12.18

WORKDIR /users-api

COPY package*.json /users-api/

RUN npm install

COPY . /users-api/

EXPOSE 3002

ENTRYPOINT ["node", "index.js"]