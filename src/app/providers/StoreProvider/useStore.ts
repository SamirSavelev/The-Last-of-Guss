import type { RootStore } from '@shared/store/rootStore';
import { StoreContext } from './StoreContext';
import { useContext } from 'react';

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return store;
};
