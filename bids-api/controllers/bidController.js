const Bid = require('../models/Bid')

exports.create = async (req, res) => {
    _create(
        req.body.name,
        req.body.email,
        req.body.fileInfo,
        req.body.country
    )
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.get = async (req, res) => {
    // Get bid with the id that is passed in
    _get(req.params.id)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.update = async (req, res) => {

}

exports.delete = async (req, res) => {

}


_create = (name, email, fileInfo, country) => {
    const newBid = new Bid({
        name,
        email,
        fileInfo, // will be passed in from a double request
        country,
        createdAt: new Date(),
        status: false
    })
    newBid.save()
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
}
_get = (id) => {
    if(id) {
        // Pass back one
        Bid.find({_id: id})
        .then(response => {
            if(response)
                res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        // Pass back all bids
        Bid.find()
        .then(response => {
            if(response)
                res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
_update = () => {
    return true
}
_delete = () => {
    return true
}
