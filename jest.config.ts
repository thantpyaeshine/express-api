import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^@lib/(.*)$': '<rootDir>/src/lib/$1.ts',
        '^@config/(.*)$': '<rootDir>/src/config/$1.config.ts',
        '^@validator/(.*)$': '<rootDir>/src/validators/$1.validator.ts',
        '^@model/(.*)$': '<rootDir>/src/models/$1.model.ts',
        '^@controller/(.*)$': '<rootDir>/src/controllers/$1.controller.ts',
        '^@middleware/(.*)$': '<rootDir>/src/middlewares/$1.middleware.ts',
        '^@route/(.*)$': '<rootDir>/src/routes/$1.route.ts',
        '^@type/(.*)$': '<rootDir>/src/types/$1.d.ts',
        '^@/(.*)\\.js$': '<rootDir>/src/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    clearMocks: true,
};

export default config;