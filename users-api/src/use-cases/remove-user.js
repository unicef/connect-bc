import makeUser from '../user'

export default function makeRemoveUser ({ usersDb }) {
  return async function removeUser ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a user id.')
    }

    const userToDelete = await usersDb.findById({ id })

    if (!userToDelete) {
      return deleteNothing()
    }

    if (await hasReplies(userToDelete)) {
      return softDelete(userToDelete)
    }

    if (await isOnlyReplyOfDeletedParent(userToDelete)) {
      return deleteUserAndParent(userToDelete)
    }

    return hardDelete(userToDelete)
  }

  async function hasReplies ({ id: userId }) {
    const replies = await usersDb.findReplies({
      userId,
      publishedOnly: false
    })
    return replies.length > 0
  }

  async function isOnlyReplyOfDeletedParent (user) {
    if (!user.replyToId) {
      return false
    }
    const parent = await usersDb.findById({ id: user.replyToId })
    if (parent && makeUser(parent).isDeleted()) {
      const replies = await usersDb.findReplies({
        userId: parent.id,
        publishedOnly: false
      })
      return replies.length === 1
    }
    return false
  }

  function deleteNothing () {
    return {
      deletedCount: 0,
      softDelete: false,
      message: 'User not found, nothing to delete.'
    }
  }

  async function softDelete (userInfo) {
    const toDelete = makeUser(userInfo)
    toDelete.markDeleted()
    await usersDb.update({
      id: toDelete.getId(),
      author: toDelete.getAuthor(),
      text: toDelete.getText(),
      replyToId: toDelete.getReplyToId(),
      postId: toDelete.getPostId()
    })
    return {
      deletedCount: 1,
      softDelete: true,
      message: 'User has replies. Soft deleted.'
    }
  }

  async function deleteUserAndParent (user) {
    await Promise.all([
      usersDb.remove(user),
      usersDb.remove({ id: user.replyToId })
    ])
    return {
      deletedCount: 2,
      softDelete: false,
      message: 'User and parent deleted.'
    }
  }

  async function hardDelete (user) {
    await usersDb.remove(user)
    return {
      deletedCount: 1,
      softDelete: false,
      message: 'User deleted.'
    }
  }
}