// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import promisePlugin from 'eslint-plugin-promise';
import jestPlugin from 'eslint-plugin-jest';
import tseslint from 'typescript-eslint';
import * as importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'coverage', 'node_modules'],
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
    },
  },
  {
    plugins: { 'unused-imports': unusedImportsPlugin },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  promisePlugin.configs['flat/recommended'],
  importPlugin.flatConfigs?.recommended,
  importPlugin.flatConfigs?.typeScript,
  {
    settings: {
      'import/resolver': { typescript: true, node: true },
    },
  },

  jestPlugin.configs['flat/recommended'],
);
