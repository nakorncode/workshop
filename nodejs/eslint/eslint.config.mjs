import globals from 'globals'
import pluginJs from '@eslint/js'
// import path from 'node:path'
// import url from 'node:url'
// import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

/** @type {import('eslint').Linter.Config[]} */
export default [
  // ...(new FlatCompat({
  //   baseDirectory: path.dirname(url.fileURLToPath(import.meta.url))
  // }).extends('eslint-config-standard')),
  {
    languageOptions: { globals: globals.node },
  },
  eslintPluginUnicorn.configs['flat/recommended'],
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'camelcase': 'error',
      'eqeqeq': 'error'
    }
  }
]
