export default function makeListRegions ({ regionsDb }) {
    return async function listRegions ({ postId } = {}) {
      if (!postId) {
        throw new Error('You must supply a post id.')
      }
      const regions = await regionsDb.findByPostId({
        postId,
        omitReplies: false
      })
      const nestedRegions = nest(regions)
      return nestedRegions
  
      // If this gets slow introduce caching.
      function nest (regions) {
        if (regions.length === 0) {
          return regions
        }
        return regions.reduce((nested, region) => {
          region.replies = regions.filter(
            reply => reply.replyToId === region.id
          )
          nest(region.replies)
          if (region.replyToId == null) {
            nested.push(region)
          }
          return nested
        }, [])
      }
    }
  }