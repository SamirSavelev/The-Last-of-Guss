import '@shared/lib/mobx/configureMobx';
import { StoreProvider } from '@app/providers/StoreProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { AppRouter } from '@app/router/AppRouter';
import { themeConfig } from '@app/styles/theme';

import { QueryProvider } from '@app/providers/QueryProvider';
import { BrowserRouter } from 'react-router-dom';

import '@app/styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <StoreProvider>
        <QueryProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </QueryProvider>
      </StoreProvider>
    </ConfigProvider>
  </StrictMode>
);
