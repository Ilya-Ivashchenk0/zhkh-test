import { types } from 'mobx-state-tree'
import CounterStore from './counter-store'
import { AddressStore } from './address-store'

const RootStore = types.model('RootStore', {
  counters: types.optional(CounterStore, {}),
  addresses: types.optional(AddressStore, {})
})

export default RootStore
