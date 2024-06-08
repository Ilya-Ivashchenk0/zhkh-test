import { types } from 'mobx-state-tree';

const AreaModel = types.model('Area', {
  id: types.string,
});

const CounterModel = types.model('Counter', {
  id: types.identifier,
  _type: types.array(types.string),
  area: AreaModel,
  is_automatic: types.maybeNull(types.boolean),
  communication: types.string,
  description: types.maybeNull(types.string),
  serial_number: types.string,
  installation_date: types.string,
  brand_name: types.maybeNull(types.string),
  model_name: types.maybeNull(types.string),
  initial_values: types.array(types.number),
});

export default CounterModel;
