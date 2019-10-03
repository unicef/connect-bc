const WhitelistUser = require('../models/WhitelistUser')

exports.create = (req, res) => {
    _create(
        req.body.name, 
        req.body.email, 
        req.body.wallet, 
        req.body.amountDonated, 
        req.body.country
    )
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}
exports.get = (req, res) => {
    console.log(req.params.countryName)
    _get(req.params.countryName)
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}
exports.getByWallet = (req, res) => {
    _getByWallet(
        req.params.wallet_id
    )
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}
exports.update = (req, res) => {
    _update(
        req.params.wallet_id,
        req.body.updatesRequired
    )
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}
exports.delete = (req, res) => {
    _delete(
        req.params.wallet_id
    )
    .then(response => {
        console.log(response)
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

_create = async (name, email, walletAddress, amountDonated, country) => {
    // Adding a whitelist user to a country
    const newWhitelistUser = new WhitelistUser({
        name,
        email,
        wallet: walletAddress,
        amountDonated,
        country
    })
    console.log('Whitelist user:', newWhitelistUser)
    return await newWhitelistUser.save()
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}
_get = async (country) => {
    return await WhitelistUser.find({country})
    .then(response => {
        console.log('Getting whitelist users from database')
        if(response)
            return response
        else
            return { message: 'There are no whitelist users at this time'}
    })
    .catch(err => {
        console.log(err)
        throw(err)
    })
}
_getByWallet = async (wallet) => {
    return await WhitelistUser.find({wallet})
    .then(response => {
        console.log('Getting whitelist user by wallet from database')
        if(response)
            return response
        else
            return { message: 'There are no whitelist users with this wallet at this time'}
    })
    .catch(err => {
        console.log(err)
        throw(err)
    })
}
_update = async (wallet, updatesRequired) => {
    return await WhitelistUser.updateOne({wallet}, updatesRequired, function(err, doc){
        if(err)
            console.log('Error updating the bid')
        else {
            console.log('Whitelist user updated in the database')
            return doc
        }
    })
}
_delete = async (wallet) => {
    return await WhitelistUser.remove({wallet}, function(err) {
        if(!err) {
            console.log('Bid deleted from database')
            return { message: 'Whitelist user deleted from database'}
        } else {
            console.log('Error deleting bid from database')
            return { message: 'Whitelist user not deleted from database'}
        }
    })
}