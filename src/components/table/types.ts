import { Instance } from 'mobx-state-tree'
import CounterModel from '../../models/counter-model'

export interface tableProps {
  counters: Instance<typeof CounterModel>[]
}
