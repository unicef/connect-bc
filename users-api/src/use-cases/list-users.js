export default function makeListUsers ({ usersDb }) {
    return async function listUsers ({ postId } = {}) {
      if (!postId) {
        throw new Error('You must supply a post id.')
      }
      const users = await usersDb.findByPostId({
        postId,
        omitReplies: false
      })
      const nestedUsers = nest(users)
      return nestedUsers
  
      // If this gets slow introduce caching.
      function nest (users) {
        if (users.length === 0) {
          return users
        }
        return users.reduce((nested, user) => {
          user.replies = users.filter(
            reply => reply.replyToId === user.id
          )
          nest(user.replies)
          if (user.replyToId == null) {
            nested.push(user)
          }
          return nested
        }, [])
      }
    }
  }