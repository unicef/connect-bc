import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import passport from 'passport'
import {
    deleteUser,
    getUsers,
    notFound,
    postUser,
    patchUser
} from './controllers'
import makeExpressCallback from './express-callback/'

dotenv.config()

const app = express()
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((_, res, next) => {
    console.log('Request being made!')
    res.set({ Tk: '!'})
    next()
})
// CRUD for the users
app.post(`/users`, makeExpressCallback(postUser))
app.delete(`/users/:id`, makeExpressCallback(deleteUser))
app.delete(`/users`, makeExpressCallback(deleteUser))
app.patch(`/users/:id`, makeExpressCallback(patchUser))
app.patch(`/users`, makeExpressCallback(patchUser))
app.get(`/users`, makeExpressCallback(getUsers))
// Passport for the users 
// Need Login
app.use(passport.initialize())
app.use(passport.session())
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
}))
// Need Logout
app.delete('/logout', (req, res) => {
    req.logOut()
})

app.use(makeExpressCallback(notFound))

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        // Send them back to a location in the site where
        // people that are logged in are allowed to see
    }
    next()
}
if(process.env.ENV === 'dev') {
    app.listen(3000, () => {
        console.log('Server is listening to port 3000')
    })
}

export default app