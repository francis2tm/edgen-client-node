import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^edgen$': '<rootDir>/src/index.ts',
    '^edgen/_shims/auto/(.*)$': '<rootDir>/src/_shims/auto/$1-node',
    '^edgen/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/ecosystem-tests/',
    '<rootDir>/dist/',
    '<rootDir>/deno/',
    '<rootDir>/deno_tests/',
    '<rootDir>/unused/',
  ],
};

export default config;
