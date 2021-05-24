/* need start with vite prefix */
interface ImportMetaEnv {
  VITE_API_PROXY: string;
  VITE_CRYPTO_IV: string;
  VITE_CRYPTO_SALT: string;
  VITE_CRYPTO_ISSUER: string;
  VITE_SERVER_PORT: number;
}
