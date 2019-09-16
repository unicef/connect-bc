const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BidSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  fileInfo: {
      type: String
  },
  country: {
    type: String
  }    
});

module.exports = Bid = mongoose.model("bids", BidSchema);
