/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL_PROD: string,
  readonly VITE_API_BASE_URL_DEV: string,
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}