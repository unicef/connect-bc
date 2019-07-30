import makeRegion from '../region'
export default function makeAddRegion ({ regionsDb, handleModeration }) {
  return async function addRegion (regionInfo) {
    const region = await makeRegion(regionInfo)
    const exists = await regionsDb.findByEmail({ email: region.getEmail() })
    if (exists && exists.email === region.getEmail()) {
      return exists
    }

    return regionsDb.insert({
      email: region.getEmail(),
      name: region.getSanitizedName(),
      bio: region.getBio(),
      role: region.getRole(),
      password: region.getPassword(),
      createdOn: region.getCreatedOn(),
      id: region.getId(),
      modifiedOn: region.getModifiedOn(),
    })
  }
}