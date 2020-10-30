const InternetContract = require('../models/InternetContract')
        , fs = require('fs')
        , dotenv = require('dotenv')
        , Web3 = require('web3')

dotenv.config()

function getMax(obj) {
    return Math.max.apply(null,Object.keys(obj));
}

const from = process.env.ADMIN_ADDRESS
            , gas = process.env.GAS_TO_DEPLOY_CONTRACT
            , gasPrice = process.env.GAS_PRICE_TO_DEPLOY_CONTRACT
            , web3 = new Web3(Web3.givenProvider || process.env.BLOCKCHAIN_PROVIDER)
            , source = fs.readFileSync('./blockchain/build/contracts/InternetContract.json', 'utf8')
            , abi = JSON.parse(source)['abi']
            , passportLogicRegistrySource = fs.readFileSync('./blockchain/build/contracts/PassportLogicRegistry.json', 'utf8')
            // , abiForPassportLogicRegistry = JSON.parse(passportLogicRegistrySource)['abi']
            , addressForPassportLogicRegistry = JSON.parse(passportLogicRegistrySource)['networks'][getMax(JSON.parse(passportLogicRegistrySource)['networks'])].address

// First thing to do is create a record in our db x 
// Then we want to create the thing on blockchain x
// Once it is on blockchain we want to get the tx id and the contract address x
// Then we have to use that contract to create a passport for the region and the isp 
// Once the region and the isp have passport addresses, we will update the model
// Then we will update the smart contract with the rest of the details 
// Save the event in the datbase 

function tieItAllTogether(nameOfContract, internetServiceProviderAddress, regionAddress, minimumSpeedGuarantee, contractStartDate, contractEndDate) {
    
}
// First step:
_create = async( nameOfContract, internetServiceProviderAddress, regionAddress, minimumSpeedGuarantee, contractStartDate, contractEndDate) => {
    console.log('Function to create internet contract in db')
    const newInternetContract = new InternetContract({
        nameOfContract,
        internetServiceProviderAddress,
        regionAddress,
        minimumSpeedGuarantee,
        contractStartDate,
        contractEndDate
    })
    return await newInternetContract.save()
    .then(response => {
        return response
    })
    .catch(err => { throw err })
}

// _create('Contract between Sprint and Kenya', '0x45876b7DF4E3d6672b7F0c7735D60638C6Cab2eB', '0x45876b7DF4E3d6672b7F0c7735D60638C6Cab2eB', 100, 20190101, 20290101)

// this will simply deploy the contract
// Second Step: 
_createInternetContract = async() => {
    let code = JSON.parse(source)['bytecode']
    let InternetContract = new web3.eth.Contract(abi)
    return InternetContract.deploy({
        data: code,
        arguments: [
            addressForPassportLogicRegistry
        ]
    })
    .send({ from, gas, gasPrice }, (error, transactionHash) => { 
        console.log('Initial hash when sending tx:', transactionHash) 
        transactionHashToSave = transactionHash
    })
    .then((newContractInstance) => {
        console.log('Internet Contract Address:', newContractInstance._address)
        return newContractInstance._address
    })
    .catch(err => {
        console.log('Error received!', err)
        throw err
    });
}

// _createInternetContract()

_updateContractWithBlockchainAddress = async(nameOfContract, contractAddress) => {
    InternetContract.findOne({nameOfContract})
    .then(contract => {
        contract.contractAddress = contractAddress
        contract.save()
        .then(updatedContract => {
            console.log('Saved contract:', updatedContract)
            return updatedContract
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log('Error getting contract details from the database')
        throw err
    })
}
// _updateContractWithBlockchainAddress('Contract between Sprint and Kenya', '0x1A1A3cE9A63e29f642d93e7376a4089a5573CCbC')

// once the contract is deployed we may need to issue some passports
_createPassportForIsp = async(
    nameOfContract
    , address
) => {
    // What will I get back here?
    InternetContract.find({nameOfContract})
        .then(contractInfo => {
            let InternetContract = new web3.eth.Contract(abi, contractInfo[0].contractAddress)
            InternetContract.methods.createPassport(contractInfo[0].internetServiceProviderAddress).send({ from, gas, gasPrice })
            .then(receipt => {
                // Have to figure out what you want to save in the database
                console.log(receipt.events.PassportCreated.returnValues)
                return receipt.events.PassportCreated.returnValues['passport']
            })
            .catch(err => {
                console.log(err)
                // throw err
            })
        })
        .catch(err => {
            console.log('Error getting contract details from the database')
            throw err
        })
}

_createPassportForRegion = async(
    nameOfContract
    , address
) => {
    // What will I get back here?
    InternetContract.find({nameOfContract})
        .then(contractInfo => {
            let InternetContract = new web3.eth.Contract(abi, contractInfo[0].contractAddress)
            InternetContract.methods.createPassport(contractInfo[0].regionAddress).send({ from, gas, gasPrice })
            .then(receipt => {
                // Have to figure out what you want to save in the database
                console.log(receipt.events.PassportCreated.returnValues)
                return receipt.events.PassportCreated.returnValues['passport']
            })
            .catch(err => {
                console.log(err)
                // throw err
            })
        })
        .catch(err => {
            console.log('Error getting contract details from the database')
            throw err
        })
}
// _createPassport('Contract between Sprint and Kenya', '0x45876b7DF4E3d6672b7F0c7735D60638C6Cab2eB')

_updateInternetContract = async(
    nameOfContract
    , regionPassportAddress
    , ispPassportAddress
    , minSpeedGuarantee
    , contractStartDate
    , contractEndDate
) => {
    InternetContract.find({nameOfContract})
        .then(contractInfo => {
            let InternetContract = new web3.eth.Contract(abi, contractInfo[0].contractAddress)
            InternetContract.methods.createContract(
                regionPassportAddress
                , ispPassportAddress
                , minSpeedGuarantee
                , contractStartDate
                , contractEndDate
            ).send({
                from,
                gas,
                gasPrice
            })
            .then(receipt => {
                // Have to figure out what you want to save in the database
                console.log(receipt)
                return receipt
            })
            .catch(err => {
                console.log(err)
                // throw err
            })
        })
        .catch(err => {
            console.log('Error getting contract details from the database')
            throw err
        })
}

// _updateInternetContract('Contract between Sprint and Kenya', '0x068E7237a64462B1236e2cd0E751a89DC60569Dd', '0x118B5986e5f4fd3e5566D85b36d2489356CE5552', 100, 100, 100)

_readRegionFromInternetContract = async(
    nameOfContract
) => {
    InternetContract.find({nameOfContract})
        .then(contractInfo => {
            let InternetContract = new web3.eth.Contract(abi, contractInfo[0].contractAddress)
            InternetContract.methods.region().call()
            .then(receipt => {
            //     // Have to figure out what you want to save in the database
                console.log(receipt)
                return receipt
            })
            .catch(err => {
                console.log(err)
                // throw err
            })
        })
        .catch(err => {
            console.log('Error getting contract details from the database')
            throw err
        })
}
// _readRegionFromInternetContract('Contract between Sprint and Kenya')