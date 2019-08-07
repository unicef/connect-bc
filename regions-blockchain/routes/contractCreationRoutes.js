const express = require('express')
, router = express.Router()
, ContractCreationController = require('../controllers/contractCreationController')

router.get('/region', ContractCreationController.list)    
router.get('/region/:regionName', ContractCreationController.get)
router.post('/region', ContractCreationController.post)

module.exports = router