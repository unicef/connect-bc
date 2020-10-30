FROM mhart/alpine-node:12.18

WORKDIR /bids-api

COPY package*.json /bids-api/

RUN yarn install

COPY . /bids-api/

EXPOSE 3001

ENTRYPOINT ["node", "index.js"]