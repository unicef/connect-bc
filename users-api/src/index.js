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
app.post(`${apiRoot}/comments`, makeExpressCallback(postUser))
app.delete(`${apiRoot}/comments/:id`, makeExpressCallback(deleteUser))
app.delete(`${apiRoot}/comments`, makeExpressCallback(deleteUser))
app.patch(`${apiRoot}/comments/:id`, makeExpressCallback(patchUser))
app.patch(`${apiRoot}/comments`, makeExpressCallback(patchUser))
app.get(`${apiRoot}/comments`, makeExpressCallback(getUsers))
app.use(makeExpressCallback(notFound))

if(process.env.ENV === 'dev') {
    // Listen for requests
    app.listen(3000, () => {
        console.log('Server is listening to port 3000')
    })
}

export default app