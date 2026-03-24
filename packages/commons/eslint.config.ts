/// <reference path="./modules.d.ts" preserve="true" />
import { defineConfig } from 'eslint/config';
import * as mdx from 'eslint-plugin-mdx';
import json from 'eslint-plugin-jsonc';
import packageJson from 'eslint-plugin-package-json';
import neostandard from 'neostandard';

const tsFiles = ['**/*.{ts,tsx}'];
const tsCodeBlocks = ['**/*.{md,mdx}'].map((pattern) => `${pattern}/*.ts`);

export default defineConfig(
  ...neostandard({
    files: ['**/*.{cj,j}s', '**/*.jsx'],
    noStyle: true,
    ts: true
  }),
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: process.cwd(),
        warnOnUnsupportedTypeScriptVersion: false
      }
    }
  },
  {
    files: tsFiles,
    ignores: tsCodeBlocks,
    languageOptions: {
      parserOptions: {
        projectService: true,
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    rules: {
      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          allowNullableBoolean: true,
          allowNullableString: true,
          allowAny: true
        }
      ],
      yoda: ['error', 'never', { exceptRange: true }]
    }
  },
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true
    }),
    plugins: {
      mdx
    }
  },
  mdx.flatCodeBlocks,
  ...json.configs['recommended-with-json'],
  ...json.configs['recommended-with-jsonc'],
  ...json.configs['recommended-with-json5'],
  {
    files: ['**/tsconfig.json', '**/tsconfig.*.json'],
    plugins: {
      jsonc: json
    },
    rules: {
      'jsonc/no-comments': 0
    }
  },
  ...json.configs.prettier,
  packageJson.configs.recommended,
  {
    settings: {
      packageJson: {
        enforceForPrivate: false
      }
    }
  },
  {
    ignores: [
      '.github/**/*.md',
      '.turbo/',
      '.yarn/**/*',
      '!.yarn/plugins/*',
      'dist/',
      'esm/',
      'cjs/',
      'coverage/',
      'node_modules/',
      'storybook-static/',
      'temp/',
      'tmp/',
      '.temp/',
      '.tmp',
      '.pnp.cjs',
      '.pnp.loader.mjs',
      'vite.config.*.timestamp-*'
    ]
  }
);
