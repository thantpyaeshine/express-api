import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    preset: 'ts-jest/presets/default-esm',
    extensionsToTreatAsEsm: ['.ts'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    clearMocks: true,
};

export default config;