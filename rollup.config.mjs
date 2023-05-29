// @ts-check

import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript2 from 'rollup-plugin-typescript2';

import pkg from './package.json' assert { type: 'json' };

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author.name}
 * Released under the ${pkg.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
  return {
    banner,
    name: 'ReactHooksForBackbone',
    exports: 'named',
    sourcemap: true,
    globals: {
      react: 'React',
    },
    ...options,
  };
}

/** Rollup.js base options object. */
const BASE_OPTIONS = {
  input: './src/index.ts',
  plugins: [
    typescript2({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfig: './tsconfig.bundle.json',
    }),
  ],
  external: ['react'],
};

/**
 * Rollup.js options object.
 * @type {import('rollup').RollupOptions[]}
 */
const options = [
  {
    ...BASE_OPTIONS,
    output: [
      createOutputOptions({
        file: './dist/index.js',
        format: 'commonjs',
      }),
      createOutputOptions({
        file: './dist/index.cjs',
        format: 'commonjs',
      }),
      createOutputOptions({
        file: './dist/index.mjs',
        format: 'esm',
      }),
      createOutputOptions({
        file: './dist/index.esm.js',
        format: 'esm',
      }),
    ],
    external: [...BASE_OPTIONS.external, 'lodash.isequal'],
  },
  {
    ...BASE_OPTIONS,
    output: [
      createOutputOptions({
        file: './dist/index.umd.js',
        format: 'umd',
      }),
      createOutputOptions({
        file: './dist/index.umd.min.js',
        format: 'umd',
        plugins: [terser()],
      }),
    ],
    plugins: [
      ...(BASE_OPTIONS.plugins ?? []),
      resolve({ browser: true }),
      commonjs(),
    ],
  },
];

export default options;
