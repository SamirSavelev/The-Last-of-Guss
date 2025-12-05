// <reference types="vite/client" />

type AppEnv = 'development' | 'staging' | 'production' | 'test';

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_ENV?: AppEnv;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
