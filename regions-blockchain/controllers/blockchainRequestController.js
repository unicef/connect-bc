const Web3 = require('web3')
, fs = require('fs')
, dotenv = require('dotenv')
, BlockchainRequest = require('../models/blockchainRequest')
, ContractCreationController = require('../controllers/contractCreationController')

dotenv.config()

const from = process.env.REGION_CONTRACT_DEPLOYING_ADDRESS
    , gas = process.env.GAS_TO_DEPLOY_REGION_CONTRACT
    , gasPrice = process.env.GAS_PRICE_TO_DEPLOY_REGION_CONTRACT
    , web3 = new Web3(Web3.givenProvider || process.env.BLOCKCHAIN_PROVIDER)

// whitelisting activities:

exports.addWhitelisted = (req, res) => {
    this._addWhitelisted(req.body.regionName, req.body.addressToAddToWhitelist)
    .then(methodResponse => {
        res.json(methodResponse)
    })
    .catch(err => {
        console.log(err)
    })
}

exports._addWhitelisted = (regionName, addressToAddToWhitelist) => {
    let source = fs.readFileSync('./build/contracts/Region.json', 'utf8')
    let abi = JSON.parse(source)['abi']
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.addWhitelisted(addressToAddToWhitelist).send({
            from: result[0].createdBy
        })
        .then(receipt => {
            // Have to figure out what you want to save in the database
            return receipt
        })
        .catch(err => {
            throw err
        })
    })
    .catch(err => {
        console.log('Error getting contract details from the database')
        throw err
    })
}

exports._addWhitelistAdmin = (regionName, addressToAddToAdminWhiteList) => {
    let source = fs.readFileSync('./build/contracts/Region.json', 'utf8')
    let abi = JSON.parse(source)['abi']
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.addWhitelistAdmin(addressToAddToAdminWhiteList).send({
            from: result[0].createdBy
        })
        .then(receipt => {
            // Have to figure out what you want to save in the database
            return receipt
        })
        .catch(err => {
            throw err
        })
    })
    .catch(err => {
        console.log('Error getting contract details from the database')
        throw err
    })
}

exports._renounceWhitelisted = (regionName, addressToRenounce) => {
    let source = fs.readFileSync('./build/contracts/Region.json', 'utf8')
    let abi = JSON.parse(source)['abi']
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.renounceWhitelisted(addressToRenounce).send({
            from: result[0].createdBy
        })
        .then(receipt => {
            // Have to figure out what you want to save in the database
            return receipt
        })
        .catch(err => {
            throw err
        })
    })
    .catch(err => {
        console.log('Error getting contract details from the database')
        throw err
    })
}

exports._renounceWhitelistAdmin = (regionName, addressToRenounce) => {
    let source = fs.readFileSync('./build/contracts/Region.json', 'utf8')
    let abi = JSON.parse(source)['abi']
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.renounceWhitelistAdmin(addressToRenounce).send({
            from: result[0].createdBy
        })
        .then(receipt => {
            // Have to figure out what you want to save in the database
            return receipt
        })
        .catch(err => {
            throw err
        })
    })
    .catch(err => {
        console.log('Error getting contract details from the database')
        throw err
    })
}

exports._removeWhitelisted = (regionName, addressToRemoveToWhitelist) => {
    let source = fs.readFileSync('./build/contracts/Region.json', 'utf8')
    let abi = JSON.parse(source)['abi']
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.removeWhitelisted(addressToAddToWhitelist).send({
            from: result[0].createdBy
        })
        .then(receipt => {
            // Have to figure out what you want to save in the database
            return receipt
        })
        .catch(err => {
            throw err
        })
    })
    .catch(err => {
        console.log('Error getting contract details from the database')
        throw err
    })
}

// multi-sig activities: 

exports._fallbackFromMultiSig = (regionName, deposit) => {
    let source = fs.readFileSync('./build/contracts/Region.json', 'utf8')
    let abi = JSON.parse(source)['abi']
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.renounceWhitelistAdmin(addressToRenounce).send({
            from: result[0].createdBy
        })
        .then(receipt => {
            // Have to figure out what you want to save in the database
            return receipt
        })
        .catch(err => {
            throw err
        })
    })
    .catch(err => {
        console.log('Error getting contract details from the database')
        throw err
    })
}
exports._addOwnerToMultiSig = (regionName, addressToAddToMultiSig) => {}
exports._removeOwnerFromMultiSig = (regionName, addressToRemoveFromMultiSig) => {}
exports._replaceOwnerInMultiSig = (regionName, addressToReplaceInMultiSig) => {}
exports._changeRequirementFromMultiSig = (regionName, newNumberOfConfirmationsRequiredForMultiSig) => {}
exports._submitTransactionFromMultiSig = () => {}
exports._confirmTransactionFromMultiSig = () => {}
exports._revokeConfirmationFromMultiSig = () => {}
exports._executeTransactionFromMultiSig = () => {}
exports._isConfirmedFromMultiSig = () => {}

// other activities