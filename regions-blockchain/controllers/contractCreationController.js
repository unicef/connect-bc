const Web3 = require("web3"),
  fs = require("fs"),
  dotenv = require("dotenv"),
  ContractCreation = require("../models/contractCreation");

dotenv.config();

const from = process.env.REGION_CONTRACT_DEPLOYING_ADDRESS,
  gas = process.env.GAS_TO_DEPLOY_REGION_CONTRACT,
  gasPrice = process.env.GAS_PRICE_TO_DEPLOY_REGION_CONTRACT,
  web3 = new Web3(Web3.givenProvider || process.env.BLOCKCHAIN_PROVIDER);

exports.list = (req, res) => {
  _list()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.get = (req, res) => {
  exports
    ._get(req.params.regionName)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.post = (req, res) => {
  console.log(req.body);
  _post(
    req.body.name,
    req.body.numberOfSchools,
    req.body.areaOfRegion,
    req.body.addressForMultiSig1,
    req.body.addressForMultiSig2,
    req.body.addressForMultiSig3,
    req.body.confirmationsRequiredForMultiSig
  )
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log("Error invoking the post function", err);
    });
};

_list = () => {
  return ContractCreation.find()
    .then((contracts) => {
      return contracts;
    })
    .catch((err) => {
      throw err;
    });
};
exports._get = (regionName) => {
  return ContractCreation.find({ regionName })
    .then((contractInfo) => {
      return contractInfo;
    })
    .catch((err) => {
      throw err;
    });
};
_post = (
  region,
  numberOfSchools,
  areaOfRegion,
  addressForMultiSig1,
  addressForMultiSig2,
  addressForMultiSig3,
  confirmationsRequiredForMultiSig
) => {
  let source = fs.readFileSync("./build/contracts/Region.json", "utf8");
  let abi = JSON.parse(source)["abi"];
  let code = JSON.parse(source)["bytecode"];
  let RegionContract = new web3.eth.Contract(abi);
  let transactionHashToSave = "";
  console.log("Information ready to create smart contract");
  return RegionContract.deploy({
    data: code,
    arguments: [
      region,
      numberOfSchools,
      areaOfRegion,
      [addressForMultiSig1, addressForMultiSig2, addressForMultiSig3],
      2,
    ],
  })
    .send(
      {
        from,
        gas,
        gasPrice,
      },
      (error, transactionHash) => {
        if (error)
          console.log("Error sending smart contract to blockchain", error);
        console.log("Initial hash when sending tx:", transactionHash);
        transactionHashToSave = transactionHash;
      }
    )
    .on("error", (error) => {
      console.log("Error creating smart contract!");
      console.log(error);
    })
    .then((newContractInstance) => {
      // At this point we should make a few updates...
      /**
       * 1. Region in the region db should be updated with the contract address
       * 2. The database should save this country / region with the deployed contract address
       */
      let newContractCreation = new ContractCreation({
        regionName: region,
        numberOfSchools: numberOfSchools,
        areaOfRegion: areaOfRegion,
        addressForMultiSig1: addressForMultiSig1,
        addressForMultiSig2: addressForMultiSig2,
        addressForMultiSig3: addressForMultiSig3,
        confirmationsRequiredForMultiSig: confirmationsRequiredForMultiSig,
        transactionHash: transactionHashToSave,
        contractAddress: newContractInstance.options.address,
        createdBy: from,
      });
      return newContractCreation
        .save()
        .then((savedContractCreation) => {
          return savedContractCreation;
        })
        .catch((err) => console.log(err));
    });
};
