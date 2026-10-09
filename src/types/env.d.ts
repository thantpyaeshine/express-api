export type EnvironmentVariables = {
    NODE_ENV: string;
    PORT: number = 3000;
    BETTER_AUTH_URL: string = `http://localhost:${process.env.PORT || 3000}`;
    BETTER_AUTH_SECRET: string;
    AUTH_DB_URI: string;
    CLIENT_ORIGINS: string[] = ["http://localhost:3000"];
};
