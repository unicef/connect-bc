const express = require("express")
, mongoose = require("mongoose")
, bodyParser = require("body-parser")
, dotenv = require('dotenv')
, cors = require('cors')
, app = express()
, contractCreations = require("./routes/contractCreationRoutes")
, blockchainRequests = require("./routes/blockchainRequestRoutes")

dotenv.config()

const db = process.env.MONGO_URI
, db_name = process.env.DB_NAME
, port = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use("/api/contract-creations", contractCreations)
app.use("/api/blockchain-requests", blockchainRequests)
app.listen(port, () => console.log(`Server for regions blockchain api is up and running on port ${port}`))
mongoose.connect( db + db_name, {useNewUrlParser: true})
    .then(() => console.log('Connection to Mongo DB is confirmed on port 27017'))
    .catch(err => console.log(err))