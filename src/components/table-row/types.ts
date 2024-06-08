import { Instance } from 'mobx-state-tree'
import AddressModel from '../../models/address-model'
import CounterModel from '../../models/counter-model'

export interface tableRowProps extends Instance<typeof CounterModel> {
  number: number
  address: Instance<typeof AddressModel>
  handleDeleteCounter: (id: string) => void
}
