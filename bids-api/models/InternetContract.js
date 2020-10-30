const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InternetContractSchema = new Schema({
  nameOfContract: {
    type: String,
    required: true
  },
  internetServiceProviderAddress: {
      type: String
  },
  regionAddress: {
      type: String
  },
  internetServiceProviderPassport: {
    type: String
  },
  regionPassportReceipt: {
    type: String
  },
  internetServiceProviderPassportReceipt: {
    type: String
  },
  regionPassport: {
    type: String
  },
  minimumSpeedGuarantee: {
    type: String,
  },
  contractStartDate: {
    type: Date,
  },
  contractEndDate: {
      type: String
  },
  blockchainTransactionId: {
    type: String
  },
  contractAddress: {
    type: String
  },
  eventDetails: {
    type: String
  }
});

module.exports = InternetContract = mongoose.model("internetContracts", InternetContractSchema);
