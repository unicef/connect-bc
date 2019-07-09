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
        // This is to confirm that the meta data associated
        // with a user is actually legit / the same (between existing user
        // and changed user that was passed in)
        const user = makeUser({...existing, ...changes, modifiedOn: null })
        if(user.getHash() === existing.hash) {
            console.log(user)
            return existing
        }
        const updated = await usersDb.update({
            id: user.getId(),
            // pass in other fields
            // the are relevant to the user
            modifiedOn: user.getModifiedOn(),
            hash: user.getHash()
        })
        return { ...existing, ...updated }
    }
}