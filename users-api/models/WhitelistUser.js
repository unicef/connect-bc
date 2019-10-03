const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WhitelistUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  wallet: {
    type: Object,
    required: true
  },
  amountDonated: {
      type: Number
  },
  // whitelisted: {
  //     type: Boolean
  // },
  country: {
    // This is a list of countries that this user is allowed to donate to
    type: String
  }
});

module.exports = WhitelistUser = mongoose.model("whitelistUsers", WhitelistUserSchema);
