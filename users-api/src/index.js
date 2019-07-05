import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
    deleteUser,
    getUsers,
    notFound,
    postUser,
    patchUser
} from './controllers'
import makeExpressCallback from './express-callback/'

dotenv.config()

const apiRoot = process.env.BASE_URL
const app = express()
app.use(bodyParser.json())
app.use((_, res, next) => {
    res.set({ Tk: '!'})
    next()
})
// Set roots here for each of the controllers listed above
if(process.env.DM_ENV === 'dev') {
    // Listen for requests
    app.listen(3000, () => {
        console.log('Server is listening to port 3000')
    })
}

export default app