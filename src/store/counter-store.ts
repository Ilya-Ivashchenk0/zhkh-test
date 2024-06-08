import { flow, types, applySnapshot, Instance } from 'mobx-state-tree';
import CounterModel from '../models/counter-model';
import api from '../api';
import AddressModel from '../models/address-model';

const CounterStore = types
  .model('CounterStore', {
    counters: types.array(CounterModel),
    addresses: types.array(AddressModel),
    count: types.optional(types.number, 0),
    next: types.maybe(types.string),
    previous: types.maybe(types.string),
    cachedPages: types.map(types.boolean),
    currentPage: types.optional(types.number, 1),
  })
  .views((self) => ({
    get totalPages() {
      return Math.ceil(self.count / 20);
    },
    get displayedCounters() {
      const start = (self.currentPage - 1) * 20;
      const end = start + 20;
      return self.counters.slice(start, end);
    },
  }))
  .actions((self) => ({
    getCounters: flow(function* (page = 1, pageSize = 20) {
      if (!self.cachedPages.get(page)) {
        const offset = (page - 1) * pageSize;
        const data = yield api.getCounters(pageSize, offset);
        applySnapshot(
          self.counters,
          data.results.map((counter: Instance<typeof CounterModel>) =>
            CounterModel.create(counter)
          )
        );

        for (let counter of self.counters) {
          const addressData = yield api.getCountersAddresses([counter.area.id]);
          const address = AddressModel.create(addressData.results[0]);
          self.addresses.push(address);
        }

        self.cachedPages.set(page, true);
        self.currentPage = page;
      }
    }),
    getAllCounters: flow(function* () {
      const data = yield api.getAllCounters();
      self.count = data.count;
    }),
    afterCreate() {
      this.getAllCounters();
    },
    deleteCounter: flow(function* (id: string) {
      yield api.deleteCounter(id);
      applySnapshot(
        self.counters,
        self.counters.filter((counter) => counter.id !== id)
      );
    }),
    clearCache() {
      self.cachedPages.clear();
    },
  }));

export default CounterStore;
