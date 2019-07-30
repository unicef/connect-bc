import makeUser from '../user'
export default function makeAddUser ({ usersDb, handleModeration }) {
  return async function addUser (userInfo) {
    const user = await makeUser(userInfo)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })
    if (exists && exists.email === user.getEmail()) {
      return exists
    }

    return usersDb.insert({
      email: user.getEmail(),
      name: user.getSanitizedName(),
      bio: user.getBio(),
      role: user.getRole(),
      password: user.getPassword(),
      createdOn: user.getCreatedOn(),
      id: user.getId(),
      modifiedOn: user.getModifiedOn(),
    })
  }
}