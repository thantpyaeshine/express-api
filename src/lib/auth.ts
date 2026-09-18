import { betterAuth } from "better-auth";
import { BETTER_AUTH_SECRET, PORT, AUTH_DB_URI, CLIENT_ORIGINS } from "../config/env.config.js";
// pg does not currently provide declarations in this setup.
// @ts-expect-error: pg is used at runtime and is intentionally untyped here.
import { Pool } from "pg";
import { twoFactor, jwt } from "better-auth/plugins";

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