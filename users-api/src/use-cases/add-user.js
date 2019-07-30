import makeUser from '../user'
export default function makeAddUser ({ usersDb, handleModeration }) {
  return async function addUser (userInfo) {
    const user = makeUser(userInfo)
    // Cannot find users by hash u idiot
    const exists = await usersDb.findById({ id: user.getId() })
    if (exists) {
      return exists
    }

    return usersDb.insert({
      email: user.getEmail(),
      createdOn: user.getCreatedOn(),
      id: user.getId(),
      modifiedOn: user.getModifiedOn(),
    })
  }
}