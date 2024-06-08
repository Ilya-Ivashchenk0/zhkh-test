import { createContext, useContext } from 'react';
import RootStore from '../store';

export const store = RootStore.create({});

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
