import { flow, types, applySnapshot, Instance } from 'mobx-state-tree';
import CounterModel from '../models/counter-model';
import api from '../api';
import AddressModel from '../models/address-model';

const sortUniqueIds = (counters: Instance<typeof CounterModel>[]) => {
  const seenIds = new Set<string>();
  const uniqueIds: string[] = [];

  counters.forEach((counter) => {
    if (!seenIds.has(counter.area.id)) {
      seenIds.add(counter.area.id);
      uniqueIds.push(counter.area.id);
    }
  });
  return uniqueIds;
};

const CounterStore = types
  .model('CounterStore', {
    counters: types.array(CounterModel),
    addresses: types.array(AddressModel),
    count: types.optional(types.number, 0),
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

        const uniqueIds = sortUniqueIds(self.counters);

        if (uniqueIds.length > 0) {
          const addressData = yield api.getCountersAddresses(uniqueIds);

          applySnapshot(
            self.addresses,
            addressData.results.map((address: Instance<typeof AddressModel>) =>
              AddressModel.create(address)
            )
          );
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
      const indexToDelete = self.counters.findIndex(
        (counter) => counter.id === id
      );
      if (indexToDelete !== -1) {
        self.counters.splice(indexToDelete, 1);
      }

      const remainingCount = self.counters.length;
      if (remainingCount < 20) {
        const offset = (self.currentPage - 1) * 20 + remainingCount;
        const data = yield api.getCounters(20 - remainingCount, offset);
        applySnapshot(
          self.counters,
          self.counters.concat(
            data.results.map((counter: Instance<typeof CounterModel>) =>
              CounterModel.create(counter)
            )
          )
        );

        const uniqueIds = sortUniqueIds(self.counters);

        if (uniqueIds.length > 0) {
          const addressData = yield api.getCountersAddresses(uniqueIds);

          applySnapshot(
            self.addresses,
            addressData.results.map((address: Instance<typeof AddressModel>) =>
              AddressModel.create(address)
            )
          );
        }
      }
    }),
    clearCache() {
      self.cachedPages.clear();
    },
  }));

export default CounterStore;
