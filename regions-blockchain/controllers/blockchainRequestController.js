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
    , source = fs.readFileSync('./build/contracts/Region.json', 'utf8')
    , abi = JSON.parse(source)['abi']

// whitelisting activities:

exports.addWhitelisted = (req, res) => {
    _addWhitelisted(req.body.regionName, req.body.addressToAddToWhitelist)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}

_addWhitelisted = (regionName, addressToAddToWhitelist) => {
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

exports.addWhitelistAdmin = (req, res) => {
    _addWhitelistAdmin(req.body.regionName, req.body.addressToAddToAdminWhiteList) 
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_addWhitelistAdmin = (regionName, addressToAddToAdminWhiteList) => {
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
exports.renounceWhitelisted = (req, res) => {
    _renounceWhitelisted(req.body.regionName, req.body.addressToRenounce) 
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_renounceWhitelisted = (regionName, addressToRenounce) => {
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
exports.renounceWhitelistAdmin = (req, res) => {
    _renounceWhitelistAdmin(req.body.regionName, req.body.addressToRenounce) 
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_renounceWhitelistAdmin = (regionName, addressToRenounce) => {
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
exports.removeWhitelisted = (req, res) => {
    _removeWhitelisted(req.body.regionName, req.body.addressToRemoveToWhitelist) 
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_removeWhitelisted = (regionName, addressToRemoveToWhitelist) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.removeWhitelisted(addressToRemoveToWhitelist).send({
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
exports.fallbackFromMultiSig = (req, res) => {
    _fallbackFromMultiSig(req.body.regionName, req.body.deposit) 
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_fallbackFromMultiSig = (regionName, deposit) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        web3.eth.sendTransaction({
            from: result[0].createdBy,
            to: result[0].contractAddress,
            value: deposit
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
exports.addOwnerToMultiSig = (req, res) => {
    _addOwnerToMultiSig(regionName, addressToAddToMultiSig)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_addOwnerToMultiSig = (regionName, addressToAddToMultiSig) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.addWhitelistAdmin(addressToAddToMultiSig).send({
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
exports.removeOwnerFromMultiSig = (req, res) => {
    _removeOwnerFromMultiSig(regionName, addressToRemoveFromMultiSig)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_removeOwnerFromMultiSig = (regionName, addressToRemoveFromMultiSig) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.removeOwner(addressToRemoveFromMultiSig).send({
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
exports.replaceOwnerInMultiSig = (req, res) => {
    _replaceOwnerInMultiSig(regionName, addressToReplaceInMultiSig)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_replaceOwnerInMultiSig = (regionName, addressToReplaceInMultiSig) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.replaceOwner(addressToReplaceInMultiSig).send({
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
exports.changeRequirementFromMultiSig = (req, res) => {
    _changeRequirementFromMultiSig(regionName, newNumberOfConfirmationsRequiredForMultiSig)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_changeRequirementFromMultiSig = (regionName, newNumberOfConfirmationsRequiredForMultiSig) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.addWhitelistAdmin(newNumberOfConfirmationsRequiredForMultiSig).send({
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
exports.submitTransactionFromMultiSig = (req, res) => {
    _submitTransactionFromMultiSig(regionName, addressOfTransactionOwner, transactionNumber, transactionData)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_submitTransactionFromMultiSig = (regionName, addressOfTransactionOwner, transactionNumber, transactionData) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        // has to be from one of the owners of the multi-sig
        RegionContract.methods.submitTransaction(addressOfTransactionOwner, transactionNumber, transactionData).send({
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
exports.confirmTransactionFromMultiSig = (req, res) => {
    _confirmTransactionFromMultiSig(regionName, transactionNumber)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_confirmTransactionFromMultiSig = (regionName, transactionNumber) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        // has to be from one of the owners of the multi-sig
        RegionContract.methods.confirmTransaction(transactionNumber).send({
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
exports.revokeConfirmationFromMultiSig = (req, res) => {
    _revokeConfirmationFromMultiSig(regionName, transactionNumber)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_revokeConfirmationFromMultiSig = (regionName, transactionNumber) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        // has to be from one of the owners of the multi-sig
        RegionContract.methods.revokeConfirmation(transactionNumber).send({
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
exports.executeTransactionFromMultiSig = (req, res) => {
    _executeTransactionFromMultiSig(regionName, transactionNumber)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
_executeTransactionFromMultiSig = (regionName, transactionNumber) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        // Has to be an owner of the multi-sig
        RegionContract.methods.executeTransaction(transactionNumber).send({
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
exports.isConfirmedFromMultiSig = (req, res) => {
    _isConfirmedFromMultiSig(regionName, transactionNumber)
        .then(methodResponse => {
            res.json(methodResponse)
        })
        .catch(err => {
            console.log(err)
        })
}
// Returns confirmation status of a transaction
_isConfirmedFromMultiSig = (regionName, transactionNumber) => {
    return ContractCreationController._get(regionName)
    .then(result => {
        let RegionContract = new web3.eth.Contract(abi, result[0].contractAddress)
        RegionContract.methods.isConfirmed(transactionNumber).send({
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

// other activities