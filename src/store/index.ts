import { types } from 'mobx-state-tree'
import CounterStore from './counter-store'

const RootStore = types.model('RootStore', {
  counters: types.optional(CounterStore, {})
})

export default RootStore
