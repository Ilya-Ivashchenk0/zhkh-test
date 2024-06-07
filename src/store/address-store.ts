import { flow, types } from 'mobx-state-tree'
import AddressModel from '../models/address-model'
import api from '../api'

export const AddressStore = types
  .model('AddressStore', {
    addresses: types.array(AddressModel)
  })
  .actions((self) => ({
    getAddresses: flow(function* (ids: string[]) {
      try {
        const data = yield api.getCountersAddresses(ids)
        self.addresses = data.results.map((address: any) =>
          AddressModel.create(address)
        )
      } catch (error) {
        console.error('Error fetching addresses:', error)
      }
    })
  }))
