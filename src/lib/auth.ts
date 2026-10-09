import { betterAuth } from "better-auth";
import ENV from "../config/env.config.js";
// @ts-expect-error `pg` does not provide declarations in this project.
import { Pool } from "pg";
import { twoFactor, jwt } from "better-auth/plugins";

const { BETTER_AUTH_SECRET, AUTH_DB_URI, CLIENT_ORIGINS } = ENV;

export const auth = betterAuth({
    database: new Pool({
        connectionString: AUTH_DB_URI,
    }),
    basePath: "/auth",
    trustedOrigins: CLIENT_ORIGINS,
    secret: BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 5,
        },
    },
    plugins: [
        twoFactor(),
        jwt()
    ]
});