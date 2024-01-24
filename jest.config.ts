import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^edgen2$': '<rootDir>/src/index.ts',
    '^edgen2/_shims/auto/(.*)$': '<rootDir>/src/_shims/auto/$1-node',
    '^edgen2/(.*)$': '<rootDir>/src/$1',
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
