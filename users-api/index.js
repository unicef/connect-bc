const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const users = require("./routes/userRoutes");

const app = express();

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

// DB Config

// Connect to MongoDB
mongoose
  .connect(
    db + db_name,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.listen(port, () => console.log(`Server for users api up and running on port ${port} !`));
