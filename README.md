# Project Connect - Blockchain

This project was demoed at Devcon V in Osaka, Japan. The application is a simple web application that was used to demonstrate how blockchain can play a role in Giga (https://gigaconnect.org/) and Project Connect (https://projectconnect.world/).

## Overview

The application is a three node js applications and one react js application. A mongo db instance is also required to run this application.

In addition to node js, react js, and mongo db, there is also a blockchain component. The application can use ganache-cli (a local blockchain virtual machine) so that you can simulate how this app can work with blockchain.

## Bids API

## Regions API

## Users API

## Client

This is the front end of the application. To run this application:

1. Run `cd client` from the root folder
2. Run `npm install` from the `client` folder
3. Run `npm start` from the `client` folder

The application should run on `http://localhost:3000`.

There is a `.env` sample in the client folder. In this file, you must set up the endpoints for the other services that this front-end relies on (e.g. bids app, regions app, etc.).

Here's one that worked for me... depending on how you configure it, the variables required might be different for you.

```
REACT_APP_SERVER_URL=http://localhost
REACT_APP_USER_PORT=3002
REACT_APP_BID_PORT=3001
REACT_APP_REGION_PORT=3003
```

## Todo list:

1. Explain the containerization of the application (4 Dockerfiles, 1 docker-compose file)
2. Explain how this would work on main Ethereum network
3. Explain the smart contracts that were created for this application
4. Add a contributing guide
5. Add a license
