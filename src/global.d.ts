namespace NodeJS {
    interface ProcessEnv {
        API_PORT: number;
        NODE_ENV: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_DATABASE: string;
        PASS_SALT_ROUNDS: string;
        SALT_ROUNDS: string;
        TOKEN_KEY: string;
        MX_HOST: string;
        MX_PORT: string;
        MX_USER: string;
        MX_PASSWORD: string;
        WEB_URL: string;
    }
}

declare namespace Express {
    export interface Request {
       user?: any
    }
 }
 