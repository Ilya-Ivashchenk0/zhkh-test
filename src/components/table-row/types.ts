import { Instance } from 'mobx-state-tree'
import AddressModel from '../../models/address-model'
import { ICounter } from '../../store/types'

export interface tableRowProps extends ICounter {
  number: number
  // address: Instance<typeof AddressModel>
}
