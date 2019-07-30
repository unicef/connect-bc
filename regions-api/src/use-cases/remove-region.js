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

    return hardDelete(regionToDelete)
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


  async function hardDelete (region) {
    await regionsDb.remove(region)
    return {
      deletedCount: 1,
      softDelete: false,
      message: 'Region deleted.'
    }
  }
}