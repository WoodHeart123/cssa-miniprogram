import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,vue}']},
  {languageOptions: { globals: { ...globals.browser, uni: true, wx: true}}},
  {ignores: ['**/pages.json', '**/uni_modules', '**/unpackage', '**/eslint.config.mjs']},
  pluginJs.configs.recommended,
  {
    rules: {
  	  'no-unused-vars': 'warn',
      'no-console': 'warn'
    },
  },
  ...pluginVue.configs['flat/essential'],
  eslintConfigPrettier
]