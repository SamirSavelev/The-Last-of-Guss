import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { AppRouter } from '@app/router/AppRouter';
import { themeConfig } from '@app/styles/theme';

import '@app/styles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={themeConfig}>
      <AppRouter />
    </ConfigProvider>
  </StrictMode>
);
