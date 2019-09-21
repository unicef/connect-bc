const express = require('express')
, router = express.Router()
, BidController = require('../controllers/bidController')

router.post('/', BidController.create)
router.get('/:id', BidController.get)
router.put('/:id', BidController.update)
router.delete('/:id', BidController.delete)

module.exports = router