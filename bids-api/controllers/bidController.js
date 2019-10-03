const Bid = require('../models/Bid')

exports.create = async (req, res) => {
    console.log('External function to create bids')
    _create(
        req.body.name,
        req.body.email,
        req.body.fileInfo,
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

exports.getBidsByCountry = async(req, res) => {
    _getBidsByCountry(req.params.country) 
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.update = async (req, res) => {
    _update(req.params.id, req.body.updatesRequired)
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


_create = async (name, email, fileInfo, country) => {
    console.log('Function to create bids')
    const newBid = new Bid({
        name,
        email,
        fileInfo, // will be passed in from a double request
        country,
        createdAt: new Date(),
        status: false
    })
    console.log('Bid to create:', newBid)
     return await newBid.save()
    .then(response => {
        console.log('New bid added to database')
        return response
    })
    .catch(err => {
        console.log('Bid not created:', err)
        throw err
    })
}
_get = async (id) => {
    if(id) {
        // Pass back one
        return await Bid.find({_id: id})
        .then(response => {
            if(response)
                return(response)
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        // Pass back all bids
        Bid.find()
        .then(response => {
            console.log('Getting bids from database')
            if(response)
                return(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

_getBidsByCountry = async (country) => {
    if(country) {
        return await Bid.find({country})
        .then(response => {
            if(response) 
                return response
        })
        .catch(err => {
            console.log(err)
        })
    }
}
_update = async (id, updatesRequired) => {
    console.log(id, updatesRequired)
    return await Bid.updateOne({_id: id}, updatesRequired, function(err, doc) {
        if(err)
            console.log('Error updating the bid')
        else { 
            console.log('Bid updated in the database')
            return doc
        }
    })
}
_delete = async (id) => {
    return await Bid.remove({_id: id}, function(err) {
        if(!err){
            console.log('Bid deleted from the database.')
        } else {
            console.log('Error deleting bid from the database')
            return ({ message:'Bid deleted from the database' })
        }
    })
}
