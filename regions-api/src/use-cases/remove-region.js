import makeRegion from '../region'

export default function makeRemoveRegion ({ regionsDb }) {
  return async function removeRegion ({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a region id.')
    }

    const regionToDelete = await regionsDb.findById({ id })

    if (!regionToDelete) {
      return deleteNothing()
    }

    if (await hasReplies(regionToDelete)) {
      return softDelete(regionToDelete)
    }

    if (await isOnlyReplyOfDeletedParent(regionToDelete)) {
      return deleteRegionAndParent(regionToDelete)
    }

    return hardDelete(regionToDelete)
  }

  async function hasReplies ({ id: regionId }) {
    const replies = await regionsDb.findReplies({
      regionId,
      publishedOnly: false
    })
    return replies.length > 0
  }

  async function isOnlyReplyOfDeletedParent (region) {
    if (!region.replyToId) {
      return false
    }
    const parent = await regionsDb.findById({ id: region.replyToId })
    if (parent && makeRegion(parent).isDeleted()) {
      const replies = await regionsDb.findReplies({
        regionId: parent.id,
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
      message: 'Region not found, nothing to delete.'
    }
  }

  async function softDelete (regionInfo) {
    const toDelete = makeRegion(regionInfo)
    toDelete.markDeleted()
    await regionsDb.update({
      id: toDelete.getId(),
      author: toDelete.getAuthor(),
      text: toDelete.getText(),
      replyToId: toDelete.getReplyToId(),
      postId: toDelete.getPostId()
    })
    return {
      deletedCount: 1,
      softDelete: true,
      message: 'Region has replies. Soft deleted.'
    }
  }

  async function deleteRegionAndParent (region) {
    await Promise.all([
      regionsDb.remove(region),
      regionsDb.remove({ id: region.replyToId })
    ])
    return {
      deletedCount: 2,
      softDelete: false,
      message: 'Region and parent deleted.'
    }
  }

  async function hardDelete (region) {
    await regionsDb.remove(region)
    return {
      deletedCount: 1,
      softDelete: false,
      message: 'Region deleted.'
    }
  }
}