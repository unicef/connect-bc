import {
    addUser,
    editUser,
    listUsers,
    removeUser
} from '../use-cases'
import makeDeleteUser from './delete-user'
import makeGetUsers from './get-users'
import makePostUser from './post-user'
import makePatchUser from './patch-user'
import notFound from './not-found'

const deleteUser = makeDeleteUser({ removeUser })
const getUsers = makeGetUsers( {
    listUsers
})
const postUser = makePostUser({ addUser })
const patchUser = makePatchUser({ editUser})

const userController = Object.freeze({
    deleteUser,
    getUsers,
    notFound,
    postUser,
    patchUser
})

export default userController
export { deleteUser, getUsers, notFound, postUser, patchUser }