// Moderation and questionable removed... ensure that it
// was done properly if code starts to break
import makeUser from '../user'
export default function makeEditUser({ usersDb  }) {
    return async function editUser({ id, ...changes } = {} ){
        if(!id) {
            throw new Error('You must supply an id.')
        }
        // This will be for a field that is specific for
        // the user model
        // if(!changes.text) {
        //     throw new Error('You must supply text.')
        // }
        const existing = await usersDb.findById({ id })
        if(!existing) {
            throw new RangeError('User not found')
        }
        const user = await makeUser({...existing, ...changes, modifiedOn: null })
        const updated = await usersDb.update({
            email: user.getEmail(),
            name: user.getSanitizedName(),
            bio: user.getBio(),
            role: user.getRole(),
            password: user.getPassword(),
            createdOn: user.getCreatedOn(),
            id: user.getId(),
            modifiedOn: user.getModifiedOn(),
        })
        return { ...existing, ...updated }
    }
}