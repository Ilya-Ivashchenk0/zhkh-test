import { flow, types, applySnapshot, Instance } from 'mobx-state-tree'
import CounterModel from '../models/counter-model'
import api from '../api'
import AddressModel from '../models/address-model'

const CounterStore = types
  .model('CounterStore', {
    counters: types.array(CounterModel),
    addresses: types.array(AddressModel),
    count: types.optional(types.number, 0),
    next: types.maybe(types.string),
    previous: types.maybe(types.string)
  })
  .actions((self) => ({
    getCounters: flow(function* (limit = 20, offset = 0) {
      const data = yield api.getCounters(limit, offset)
      applySnapshot(
        self.counters,
        data.results.map((counter: Instance<typeof CounterModel>) =>
          CounterModel.create(counter)
        )
      )

      for (let counter of self.counters) {
        const addressData = yield api.getCountersAddresses([counter.area.id])
        const address = AddressModel.create(addressData.results[0])
        self.addresses.push(address)
      }
    }),
    afterCreate() {
      this.getCounters()
    },
    deleteCounter: flow(function* (id: string) {
      yield api.deleteCounter(id)
      applySnapshot(
        self.counters,
        self.counters.filter((counter) => counter.id !== id)
      )
    })
  }))

export default CounterStore
