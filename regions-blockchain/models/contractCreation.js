const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContractCreationSchema = new Schema({
  // This model will be used to save information related
  // to creating contracts (i.e. what parameters are used to
  // create the smart contract)

  // The information below is what will be passed in to
  // create all contracts...
  regionName: {type: String, unique: true},
  numberOfSchools: Number,
  areaOfRegion: Number,
  addressForMultiSig1: String,
  addressForMultiSig2: String,
  addressForMultiSig3: String,
  confirmationsRequiredForMultiSig: Number,
  transactionHash: String, 
  contractAddress: String,
  dateCreated: {type: Date, default: new Date()},
  createdBy: String
  /**
   * region name
   * number of schools in a region
   * area of the region that is being targeted
   * addresses that will be on the multi-sig
   * confirmations required 
   */
  
});

module.exports = ContractCreation = mongoose.model("contractCreations", ContractCreationSchema);