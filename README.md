# Project Connect - Blockchain 

Project connect consists of 4 micro-apps as follows:

## Bids API

## Regions API

## Users API

## Client 


# Installing and running the CONNECT-BC application.

1. Ensure you've got nodejs and truffle installed on your computer.

2. Install MongoDB community server on your machine. Download from https://www.mongodb.com/download-center/community.
Install as service if running on Windows

3. For Windows: After ensuring service is running (i.e.by opening up the services dashboard from start->services), run mongo.exe from power shell or cmd with admin privileges.

4. Add environment files (.env) to the root directories of each micro-app each containing as follows:

# In bids-api, the .env file should contain:

    MONGO_URI=mongodb://localhost:27017/
    DB_NAME=bid_api
    PORT=3003
    # New blockchain variables:
    # ADMIN_ADDRESS should be one of the addresses you get from the local blockchain that you run
    ADMIN_ADDRESS=0xYOURADMINADDRESSHERE
    GAS_TO_DEPLOY_CONTRACT=4712388
    GAS_PRICE_TO_DEPLOY_CONTRACT=1000000000000
    BLOCKCHAIN_PROVIDER=http://localhost:8545


# In regions-blockchain, the .env file should contain:

    MONGO_URI=mongodb://localhost:27017/
    DB_NAME=regions_blockchain_api
    PORT=3001
    REGION_CONTRACT_DEPLOYING_ADDRESS=0xTHEREGIONCONTRACTDEPLOYINGADDRESS
    GAS_TO_DEPLOY_REGION_CONTRACT=4712388
    GAS_PRICE_TO_DEPLOY_REGION_CONTRACT=100000000000
    BLOCKCHAIN_PROVIDER=http://localhost:8545


# In users-api, the .env file should contain:

    MONGO_URI=mongodb://localhost:27017/
    DB_NAME=user_api
    PORT=3002
    SECRET_OR_KEY=dog-and-cat-lol


5. In a new command window: cd to regions-blockchain and do
>npm install
>npm start

6. In a new command window: cd to users-api and do
>npm install
>node index.js


7. In Powershell with admin privileges, start ganache-cli:
>ganache-cli


8. In a new command window: cd to bids-api/blockchain
>truffle compile

9. cd back up to bids-api root directory, then run
>npm install
>node index.js