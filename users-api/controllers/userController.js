const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = (req, res) => {
    this._register(req.body.name, req.body.email, req.body.email)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.login = (req, res) => {
    this._register(req.body.email, req.body.email)
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })  
}

_register = (name, email, password) => {
    User.findOne({ email })
        .then(async user => {
            if(user) {
                console.log('User already exists')
                throw user
            } else {
                const newUser = new User({
                    name,
                    email,
                    password, 
                    // need to create wallet
                })

                bcrypt.getSalt(10, (err, salt) => {
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
            console.log('Error making a request to the database')
        })
}

_login = (email, password) => {
  User.findOne({ email })
    .then(user => {
        if (!user) {
        return ({ emailnotfound: "Email not found" });
        }
        bcrypt.compare(password, user.password).then(async isMatch => {
        if (isMatch) {
            const userBadges = await Promise.all([
                badges.hasBadge(1, user.wallet.address),
                badges.hasBadge(2, user.wallet.address),
                badges.hasBadge(3, user.wallet.address),
                badges.hasBadge(4, user.wallet.address)
            ])
            const payload = {
                id: user.id,
                name: user.name,
                address: user.wallet ? user.wallet.address : '',
                githubHandle: user.githubUsername ? user.githubUsername : '',
                twitterHandle: user.twitterHandle ? user.twitterHandle : '',
                badges: {1: userBadges[0], 2: userBadges[1], 3: userBadges[2], 4: userBadges[3]}
            };

            // Sign token
            jwt.sign(
            payload,
            process.env.SECRET_OR_KEY,
            {
                expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
                return ({
                success: true,
                token: "Bearer " + token
                });
            }
            );
        } else {
            throw ({ passwordincorrect: "Password incorrect" });
        }
        });
    })
    .catch(err => {
        throw err
    })
}