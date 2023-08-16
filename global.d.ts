namespace NodeJS {
    interface ProcessEnv {
        API_PORT: number;
        TOKEN_KEY: string;
        NODE_ENV: string;
    }
}

declare global {
    namespace Express {
        interface Request {
            cuil: string;
        }
    }
}

declare namespace Express {
    export interface Request {
       user?: any
    }
 }
 