import makeRegion from '../region'
export default function makeAddRegion ({ regionsDb, handleModeration }) {
  return async function addRegion (regionInfo) {
    const region = await makeRegion(regionInfo)
    const exists = await regionsDb.findByName({ name: region.getSanitizedName() })
    if (exists && exists.name === region.getName()) {
      return exists
    }

    return regionsDb.insert({
      id: region.getId(),
      name: region.getSanitizedName(),
      createdOn: region.getCreatedOn(),
      modifiedOn: region.getModifiedOn(),
      // details for regions... may change later
      population: region.getPopulation(),
      numberOfSchools: region.getNumberOfSchools(),
      // this will be an address that is specific to the region
      blockchainAddress: region.getBlockchainAddress(),
      // this will be a smart contract address that is specific to the region
      smartContractAddress: region.getSmartContractAddress(),
      sizeX: region.getSizeX(),
      sizeY: region.getSizeY(),
      // This is the person that is responsible for the region
      regionOwner: region.getRegionOwner(),
      // other details re. the region
      landArea: region.getLandArea(),
      totalArea: region.getTotalArea(),
      leader: region.getLeader(),
      languages: region.getLanguages(),
      internetUsers: region.getInternetUsers(),
      fixedLines: region.getFixedLines(),
      cellPhones: region.getCellPhones(),
      railways: region.getRailways(),
      roads: region.getRoads(),
      waterways: region.getWaterways(),
      airports: region.getAirports()
    })
  }
}