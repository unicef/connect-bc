const express = require('express')
, router = express.Router()
, BlockchainRequestController = require('../controllers/blockchainRequestController')

router.post('/whitelist/add', BlockchainRequestController.addWhitelisted)
router.post('/whitelist/renounce', BlockchainRequestController.renounceWhitelisted)
router.post('/whitelist/remove', BlockchainRequestController.removeWhitelisted)
router.post('/whitelist/admin/add', BlockchainRequestController.addWhitelistAdmin)
router.post('/whitelist/admin/renounce', BlockchainRequestController.renounceWhitelistAdmin)
router.post('/multi-sig/', BlockchainRequestController.fallbackFromMultiSig)
router.post('/multi-sig/owner/add', BlockchainRequestController.addOwnerToMultiSig)
router.post('/multi-sig/owner/remove', BlockchainRequestController.removeOwnerFromMultiSig)
router.post('/multi-sig/owner/replace', BlockchainRequestController.replaceOwnerInMultiSig)
router.post('/multi-sig/requirements', BlockchainRequestController.changeRequirementFromMultiSig)
router.post('/multi-sig/transaction/submit', BlockchainRequestController.submitTransactionFromMultiSig)
router.post('/multi-sig/transaction/confirm', BlockchainRequestController.confirmTransactionFromMultiSig)
router.post('/multi-sig/transaction/revoke-confirmation', BlockchainRequestController.revokeConfirmationFromMultiSig)
router.post('/multi-sig/transaction/execute', BlockchainRequestController.executeTransactionFromMultiSig)
router.post('/multi-sig/transaction/is-confirmed', BlockchainRequestController.isConfirmedFromMultiSig)
router.post('/multi-sig/owner/all-owners', BlockchainRequestController.getOwnersOfMultiSig)
router.post('/multi-sig/transaction/confirmation-count', BlockchainRequestController.getConfirmationCount)
router.post('/multi-sig/transaction/number-of-confirmations', BlockchainRequestController.getConfirmations)

// New Routes:
router.post('/contract/get-balance', BlockchainRequestController.getBalanceOfContractAddress)
router.post('/whitelist/check/', BlockchainRequestController.checkWhitelist)

module.exports = router