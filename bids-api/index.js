const express = require("express");
// ORM to interact with mongoose
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Might move this out later
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require ('gridfs-stream');
const methodOverride = require('method-override');
const cors = require('cors');


const bids = require("./routes/bidRoutes");
const internetContracts = require("./routes/internetContractRoutes");

const app = express();
app.use(cors());
dotenv.config()

const db = process.env.MONGO_URI
, db_name = process.env.DB_NAME
, port = process.env.PORT

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// For file uploads
app.use(methodOverride('_method'));

// DB Config

// Connect to MongoDB
let conn = mongoose
  .createConnection(
    db + db_name,
    { useNewUrlParser: true }
  )

let gfs

// For file uploads only 
conn.once('open', () => {
  // Initialize the stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads')
})

// For bids only
mongoose
  .connect(
    db + db_name,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Create storage engine 
const storage = new GridFsStorage({
  url: db + db_name,
  file: (req, file) => {
    console.log('File is being uploaded')
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if(err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})

const upload = multer({ storage })

// Need to pass in 'file' because the input in the form is called 'file'
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File upload function is called')
  // this will be used to pass information into the bid create call
  res.json({ file: req.file })
})

app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists!'})
    }
    // File exists!
    return res.json(file)
  })
})

app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' })
    }
    if(file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({ err: 'Not an image'})
    }
  })
})

app.get('/pdf/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({ err: 'No file exists' })
    }
    if(file.contentType === 'application/pdf' ) {
      const readstream = gfs.createReadStream(file.filename)
      readstream.pipe(res)
    } else {
      res.status(404).json({ err: 'Not a pdf'})
    }
  })
})

app.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if(err) { return res.status(404).json({err: err}) }
    // Need to figure out what to do
    res.redirect('/')
  })
})


// Bid end points
app.use("/api/bids", bids);
app.use('/api/internet-contracts', internetContracts)

app.listen(port, () => console.log(`Server for users api up and running on port ${port} !`));
