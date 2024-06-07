import { flow, types, applySnapshot } from 'mobx-state-tree'
import CounterModel from '../models/counter-model'
import api from '../api'
import { ICounter } from './types'

const CounterStore = types
  .model('CounterStore', {
    counters: types.array(CounterModel),
    count: types.optional(types.number, 0),
    next: types.maybe(types.string),
    previous: types.maybe(types.string)
  })
  .actions((self) => ({
    getCounters: flow(function* (limit = 20, offset = 0) {
      const data = yield api.getCounters(limit, offset)
      applySnapshot(
        self.counters,
        data.results.map((counter: ICounter) => CounterModel.create(counter))
      )
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
