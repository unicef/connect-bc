export default function buildMakeUser ({ Id, sanitize, makeSource }) {
    return function makeUser ({
      id = Id.makeId(),
      email,
      name,
      bio,
      role,
      hash,
      salt,
      source,
      createdOn = Date.now(),
      modifiedOn = Date.now(),
      active = true,
    } = {}) {
      if (!Id.isValidId(id)) {
        throw new Error('User must have a valid id.')
      }
      if (!email) {
        console.log(email)
        throw new Error('User must have an email.')
      } 
      if (!name) {
        throw new Error('User must have an name.')
      }
      if(!bio) {
        throw new Error('User must have a bio.')
      }
      if(!role) {
        throw new Error('User must have a role.')
      }
      if(!hash) {
        throw new Error('User must have a hash.')
      }      
      if(!salt) {
        throw new Error('User must have a salt.')
      }
      // Remove whitespaces from the text (if any)
      let sanitizedEmail = sanitize(email).trim()
      let sanitizedName = sanitize(name).trim()
      let sanitizedBio = sanitize(bio).trim()
      
      // const validSource = makeSource(source)
  
      return Object.freeze({
        getEmail: () => sanitizedEmail,
        getSanitizedName: () => sanitizedName,
        getSalt: () => salt,
        getId: () => id,
        getSource: () => validSource,
        getBio: () => sanitizedBio,
        getCreatedOn: () => createdOn,
        getModifiedOn: () => modifiedOn,
        getStatus: () => active
      })
  
    // Any functions that you need can be defined below this:
    }
  }