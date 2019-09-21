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
    _update(req.params.id, updatesRequired)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.delete = async (req, res) => {
    _delete(req.params.id)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
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
        console.log('New bid added to database')
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
            console.logO('Getting bids from database')
            if(response)
                res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
_update = (id, updatesRequired) => {
    Bid.update({_id: id}, updatesRequired, function(err, doc) {
        if(err)
            console.log('Error updating the bid')
        else 
            console.log('Bid updated in the database')
    })
}
_delete = (id) => {
    Bid.remove({_id: id}, function(err) {
        if(!err){
            console.log('Bid deleted from the database.')
        } else {
            console.log('Error deleting bid from the database')
        }
    })
}
