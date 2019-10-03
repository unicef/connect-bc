const express = require('express')
, router = express.Router()
, WhitelistUserController = require('../controllers/whitelistUserController')

router.post('/', WhitelistUserController.create)
router.get('/all/:countryName', WhitelistUserController.get)
router.get('/:wallet_id', WhitelistUserController.getByWallet)
router.put('/:wallet_id', WhitelistUserController.update)
router.delete('/:wallet_id', WhitelistUserController.delete)

module.exports = router