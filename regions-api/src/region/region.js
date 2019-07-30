export default function buildMakeRegion ({ Id, sanitize, makeSource }) {
    return async function makeRegion ({
      id = Id.makeId(),
      name,
      population,
      numberOfSchools,
      blockchainAddress,
      smartContractAddress,
      sizeX,
      sizeY,
      regionOwner,
      landArea,
      totalArea,
      leader,
      languages,
      internetUsers,
      fixedLines,
      cellPhones,
      railways,
      roads,
      waterways,
      airports,
      createdOn = Date.now(),
      modifiedOn = Date.now(),
      active = true,
    } = {}) {
      if (!Id.isValidId(id)) {
        throw new Error('Region must have a valid id.')
      }
      if (!name) {
        throw new Error('Region must have an name.')
      }
      
      let sanitizedName = sanitize(name).trim()
      
      return Object.freeze({
        getId: () => id,
        getSanitizedName: () => name,
        getCreatedOn: () => createdOn,
        getModifiedOn: () => modifiedOn,
        // details for regions... may change later
        getPopulation: () => population,
        getNumberOfSchools: () => numberOfSchools,
        // this will be an address that is specific to the region
        getBlockchainAddress: () => blockchainAddress,
        // this will be a smart contract address that is specific to the region
        getSmartContractAddress: () => smartContractAddress,
        getSizeX: () => sizeX,
        getSizeY: () => sizeY,
        // This is the person that is responsible for the region
        getRegionOwner: () => regionOwner,
        // other details re. the region
        getLandArea: () => landArea,
        getTotalArea: () => totalArea,
        getLeader: () => leader,
        getLanguages: () => languages,
        getInternetUsers: () => internetUsers,
        getFixedLines: () => fixedLines,
        getCellPhones: () => cellPhones,
        getRailways: () => railways,
        getRoads: () => roads,
        getWaterways: () => waterways,
        getAirports: () => airports
      })

    // Any functions that you need can be defined below this:
    }
  }