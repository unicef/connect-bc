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


_create = async(
    nameOfContract, 
    internetServiceProviderAddress,
    regionAddress,
    minimumSpeedGuarantee,
    contractStartDate,
    contractEndDate
) => {
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

// this will simply deploy the contract
_createInternetContract = async(
    
) => {
    // What will I get back here?
    let code = JSON.parse(source)['bytecode']
    let InternetContract = new web3.eth.Contract(abi)
    // console.log(code)
    return InternetContract.deploy({
        data: code,
        arguments: [
            addressForPassportLogicRegistry
        ]
    })
    .send({
        from,
        gas,
        gasPrice
    }, (error, transactionHash) => { 
        // if(error) console.log(error)
        console.log('Initial hash when sending tx:', transactionHash) 
        transactionHashToSave = transactionHash
    })
    .then((newContractInstance) => {
        console.log('Internet Contract Address:', newContractInstance._address)
        // Save the contract here

    })
    .catch(err => {
        console.log('GG', err)
    });
}

// once the contract is deployed we may need to issue some passports
_createPassport = async(
    nameOfContract
    , address
) => {
    // What will I get back here?
    InternetContract.find({nameOfContract})
        .then(contractInfo => {
            let InternetContract = new web3.eth.Contract(abi, contractInfo[0].contractAddress)
            // let InternetContract = new web3.eth.Contract(abi, '0xa531c82AA12c9d034aC8Cb9d4959571498353bc1')
            InternetContract.methods.createPassport(address).send({
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

// _createPassport('Ok', '0x45876b7DF4E3d6672b7F0c7735D60638C6Cab2eB')

_updateInternetContract = async(
    nameOfContract
    , regionPassportAddress
    , ispPassportAddress
    , minSpeedGuarantee
    , contractStartDate
    , contractEndDate
) => {
    // InternetContract.find({nameOfContract})
        // .then(contractInfo => {
            // let InternetContract = new web3.eth.Contract(abi, contractInfo[0].contractAddress)
            let InternetContract = new web3.eth.Contract(abi, '0xa531c82AA12c9d034aC8Cb9d4959571498353bc1')
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
        // })
        // .catch(err => {
            // console.log('Error getting contract details from the database')
            // throw err
        // })
}

// _updateInternetContract('Ok', '0x45876b7DF4E3d6672b7F0c7735D60638C6Cab2eB', '0x45876b7DF4E3d6672b7F0c7735D60638C6Cab2eB', 100, 100, 100)

_readValuesFromInternetContract = async(
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
// _readValuesFromInternetContract('Ok')