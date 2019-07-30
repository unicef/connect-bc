// Moderation and questionable removed... ensure that it
// was done properly if code starts to break
import makeRegion from '../region'
export default function makeEditRegion({ regionsDb  }) {
    return async function editRegion({ id, ...changes } = {} ){
        if(!id) {
            throw new Error('You must supply an id.')
        }
        // This will be for a field that is specific for
        // the region model
        // if(!changes.text) {
        //     throw new Error('You must supply text.')
        // }
        const existing = await regionsDb.findById({ id })
        if(!existing) {
            throw new RangeError('Region not found')
        }
        const region = await makeRegion({...existing, ...changes, modifiedOn: null })
        const updated = await regionsDb.update({
            email: region.getEmail(),
            name: region.getSanitizedName(),
            bio: region.getBio(),
            role: region.getRole(),
            password: region.getPassword(),
            createdOn: region.getCreatedOn(),
            id: region.getId(),
            modifiedOn: region.getModifiedOn(),
        })
        return { ...existing, ...updated }
    }
}