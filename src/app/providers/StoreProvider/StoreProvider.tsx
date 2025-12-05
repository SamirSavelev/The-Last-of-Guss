import { useMemo, type PropsWithChildren } from 'react';
import { rootStore } from '@shared/store/rootStore';
import { StoreContext } from './StoreContext';

const { Provider } = StoreContext;

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const store = useMemo(() => rootStore, []);

  return <Provider value={store}>{children}</Provider>;
};
