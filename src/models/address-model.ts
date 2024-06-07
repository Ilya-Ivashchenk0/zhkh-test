import { types } from 'mobx-state-tree'

const HouseModel = types.model('House', {
  address: types.string,
  id: types.string,
  fias_addrobjs: types.array(types.string)
})

const AddressModel = types.model('Area', {
  id: types.string,
  number: types.number,
  str_number: types.string,
  str_number_full: types.maybe(types.string),
  house: types.maybe(HouseModel)
})

export default AddressModel
