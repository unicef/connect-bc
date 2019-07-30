import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {
    deleteRegion,
    getRegions,
    notFound,
    postRegion,
    patchRegion
} from './controllers'
import makeExpressCallback from './express-callback/'

dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((_, res, next) => {
    console.log('Request being made!')
    res.set({ Tk: '!'})
    next()
})

// CRUD for the regions
app.post(`/regions`, makeExpressCallback(postRegion))
app.get(`/regions`, makeExpressCallback(getRegions))
app.delete(`/regions/:id`, makeExpressCallback(deleteRegion))
app.patch(`/regions/:id`, makeExpressCallback(patchRegion))
app.use(makeExpressCallback(notFound))

if(process.env.ENV === 'dev') {
    app.listen(3000, () => {
        console.log('Server is listening to port 3000')
    })
}

export default app