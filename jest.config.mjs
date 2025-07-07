// @ts-check
/* eslint-env node */

/** @import { Config } from '@jest/types' */

/**
 * An object with Jest options.
 * @type {Config.InitialOptions}
 */
const options = {
  preset: 'ts-jest',
  resolver: 'ts-jest-resolver',
  testEnvironment: 'jsdom',
};

export default options;
