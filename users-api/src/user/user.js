export default function buildMakeUser ({ Id, sanitize, makeSource, encryptPassword }) {
    return async function makeUser ({
      id = Id.makeId(),
      email,
      name,
      bio,
      role,
      password,
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
      if(!password) {
        throw new Error('User must provide a password.')
      }
      console.log(
        email,
        name,
        password,
        id,
        role,
        bio,
        createdOn,
        modifiedOn,
        active
      )
      let sanitizedEmail = sanitize(email).trim()
      let sanitizedName = sanitize(name).trim()
      let sanitizedBio = sanitize(bio).trim()
      let hashedPassword = await encryptPassword(password)
      return Object.freeze({
        getEmail: () => sanitizedEmail,
        getSanitizedName: () => sanitizedName,
        getPassword: () => hashedPassword,
        getId: () => id,
        getRole: () => role,
        getBio: () => sanitizedBio,
        getCreatedOn: () => createdOn,
        getModifiedOn: () => modifiedOn,
        getStatus: () => active
      })

    // Any functions that you need can be defined below this:
    }
  }