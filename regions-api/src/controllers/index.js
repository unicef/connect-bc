import {
    addRegion,
    editRegion,
    listRegions,
    removeRegion
} from '../use-cases'
import makeDeleteRegion from './delete-region'
import makeGetRegions from './get-regions'
import makePostRegion from './post-region'
import makePatchRegion from './patch-region'
import notFound from './not-found'

const deleteRegion = makeDeleteRegion({ removeRegion })
const getRegions = makeGetRegions( {
    listRegions
})
const postRegion = makePostRegion({ addRegion })
const patchRegion = makePatchRegion({ editRegion})

const regionController = Object.freeze({
    deleteRegion,
    getRegions,
    notFound,
    postRegion,
    patchRegion
})

export default regionController
export { deleteRegion, getRegions, notFound, postRegion, patchRegion }