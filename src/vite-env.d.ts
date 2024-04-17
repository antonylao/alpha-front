/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL_PROD: string,
  readonly VITE_API_BASE_URL_DEV: string,
  readonly VITE_TOKEN: string,
  readonly VITE_REFRESH_TOKEN: string,
  // more env variables...
  //not sure if i should use it
  readonly VITE_TOKEN_SECRET_KEY
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}