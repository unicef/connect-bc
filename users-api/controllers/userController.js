const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    _register(req.body.name, req.body.email, req.body.password, req.body.blockchainAddress)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.login = async (req, res) => {
    _login(req.body.email, req.body.password)
    .then(response => {
        bcrypt.compare(req.body.password, response.password)
            .then(async isMatch => {
            if (isMatch) {
                const payload = {
                    id: response.id,
                    name: response.name,
                    address: response.wallet ? response.wallet : ''
                };
    
                // Sign token
                jwt.sign(
                payload,
                process.env.SECRET_OR_KEY,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                    success: true,
                    token: "Bearer " + token
                    });
                }
                );
            } else {
                console.log ({ error: "Password incorrect" });
            }
        })
    })
    .catch(err => {
        console.log(err)
    })  
}

_register = async (name, email, password, wallet) => {
    await User.findOne({ email })
        .then(async user => {
            if(user) {
                console.log('User already exists')
                throw user
            } else {
                const newUser = new User({
                    name,
                    email,
                    password, 
                    wallet
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(async user => {
                                return user;
                            })
                            .catch(err => {
                                throw err
                            })
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
            console.log('Error making a request to the database')
        })
}

_login = async (email, password) => {
  return await User.findOne({ email })
    .then(user => {
        if (!user) {
            throw ({ error: "Email not found" });
        }
        return user

    })
    .catch(err => {
        throw err
    })
}