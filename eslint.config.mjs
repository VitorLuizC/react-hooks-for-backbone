// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['dist/', 'docs/'],
  },
  eslint.configs.recommended,
  // @ts-expect-error because of it isn't compatible with ESLint type
  // declarations. See https://github.com/typescript-eslint/typescript-eslint/issues/10899
  tseslint.configs.recommended,
);
