FROM mhart/alpine-node:12.18

WORKDIR /regions-blockchain

COPY package*.json /regions-blockchain/

RUN yarn install

COPY . /regions-blockchain/

EXPOSE 3003

ENTRYPOINT ["node", "server.js"]