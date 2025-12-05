import { createContext } from 'react';
import type { RootStore } from '@shared/store/rootStore';

export const StoreContext = createContext<RootStore | null>(null);
