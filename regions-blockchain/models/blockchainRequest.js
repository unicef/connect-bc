const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BlockchainRequestSchema = new Schema({
  // This model will be used to save "call" and "send" requests to the 
  // Region smart contract; the information that should be captured is the
  // following: 

  /**
   * when the Region is initiated
   * when deposits are received
   * when someone queries a balance
   * 
   * whitelist admin activities: 
   * - add whitelist admin
   * - add to whitelist
   * - remove whitelist
   * - renounce whitelist admin
   * 
   * whitelist activities: 
   * - renounce whitelist 
   * 
   * multi-sig activities: 
   * - add owner
   * - remove owner
   * - replace owner 
   * - change confirmations required
   * - submit / confirm / execute transactions
   * 
   * anyone activties
   * - contribute to the region (ether)
   * - check contributions from individuals
   */
  
});

module.exports = BlockchainRequest = mongoose.model("blockchainRequests", BlockchainRequestSchema);