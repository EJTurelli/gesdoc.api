namespace NodeJS {
    interface ProcessEnv {
        API_PORT: number;
        NODE_ENV: string;
        DB_HOST: string;
        DB_PORT: number;
        DB_USER: string;
        DB_PASSWORD: string;
        DB_DATABASE: string;
        PASS_SALT_ROUNDS: number;
        TOKEN_KEY: string;
    }
}

declare namespace Express {
    export interface Request {
       user?: any
    }
 }
 