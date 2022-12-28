declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET: string;
            PORT: string;

            NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION';
            DATABASE_URL: string;
            R2_ENDPOINT: string;
            R2_KEY_ID: string;
            R2_SECREY_KEY: string;
            R2_PUBLIC_URL: string;
        }
    }
}
export {};
