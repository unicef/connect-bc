import makeUser from '../user'
export default function makeAddUser ({ usersDb, handleModeration }) {
  return async function addUser (userInfo) {
    const user = makeUser(userInfo)
    const exists = await usersDb.findByHash({ hash: user.getHash() })
    if (exists) {
      return exists
    }

    return usersDb.insert({
      author: user.getAuthor(),
      createdOn: user.getCreatedOn(),
      hash: user.getHash(),
      id: user.getId(),
      modifiedOn: user.getModifiedOn(),
    })
  }
}