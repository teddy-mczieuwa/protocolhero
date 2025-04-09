/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import { jest } from '@jest/globals';

declare global {
  export const expect: typeof jest.expect;
  export const describe: typeof jest.describe;
  export const test: typeof jest.test;
  export const it: typeof jest.it;
  export const beforeAll: typeof jest.beforeAll;
  export const afterAll: typeof jest.afterAll;
  export const beforeEach: typeof jest.beforeEach;
  export const afterEach: typeof jest.afterEach;
}
