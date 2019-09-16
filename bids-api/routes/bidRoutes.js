const express = require('express')
, router = express.Router()
, BidController = require('../controllers/bidController')

router.post('/', BidController.create)
router.get('/', BidController.get)
router.put('/', BidController.update)
router.delete('/', BidController.delete)

module.exports = router