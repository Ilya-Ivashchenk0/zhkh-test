import { Instance } from 'mobx-state-tree';
import CounterModel from '../../models/counter-model';
import AddressModel from '../../models/address-model';

export interface tableProps {
  counters: Instance<typeof CounterModel>[];
  addresses: Instance<typeof AddressModel>[];
  totalPages: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
  handleDeleteCounter: (id: string) => void;
}
