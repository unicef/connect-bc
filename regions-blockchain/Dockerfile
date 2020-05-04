FROM node:latest

WORKDIR /app

COPY package*.json ./


#RUN apt-get update || : && apt-get install build-essential -y
#RUN apt-get install build-dependencies

#RUN apk --no-cache --virtual build-dependencies add \
#    python \
#    make \
#    g++ \
#    && npm install \
#    && apk del build-dependencies


RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]


