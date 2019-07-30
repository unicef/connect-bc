import makeAddRegion from './add-region'
import makeEditRegion from './edit-region'
import makeRemoveRegion from './remove-region'
import makeListRegions from './list-regions'
import regionsDb from '../data-access'

const addRegion = makeAddRegion({ regionsDb })
const editRegion = makeEditRegion({ regionsDb })
const listRegions = makeListRegions({ regionsDb })
const removeRegion = makeRemoveRegion({ regionsDb })

const regionService = Object.freeze({
  addRegion,
  editRegion,
  listRegions,
  removeRegion
})

export default regionService
export { addRegion, editRegion, listRegions, removeRegion }