import makeAddUser from './add-user'
import makeEditUser from './edit-user'
import makeRemoveUser from './remove-user'
import makeListUsers from './list-users'
import usersDb from '../data-access'

const addUser = makeAddUser({ usersDb })
const editUser = makeEditUser({ usersDb })
const listUsers = makeListUsers({ usersDb })
const removeUser = makeRemoveUser({ usersDb })

const userService = Object.freeze({
  addUser,
  editUser,
  listUsers,
  removeUser
})

export default userService
export { addUser, editUser, listUsers, removeUser }