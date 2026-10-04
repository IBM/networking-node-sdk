'use strict';

const js = require('@eslint/js');
const pluginN = require('eslint-plugin-n');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

// Rules extracted from eslint-config-google that are still relevant.
// Formatting rules are handled by prettier; removed/deprecated rules dropped.
const googleRules = {
  'no-cond-assign': 0,
  'no-irregular-whitespace': 2,
  'no-unexpected-multiline': 2,
  'curly': [2, 'multi-line'],
  'guard-for-in': 2,
  'no-caller': 2,
  'no-extend-native': 2,
  'no-extra-bind': 2,
  'no-invalid-this': 2,
  'no-multi-spaces': 2,
  'no-multi-str': 2,
  'no-new-wrappers': 2,
  'no-return-assign': 0,
  'no-with': 2,
  'no-unused-vars': [2, { args: 'none' }],
  'array-bracket-spacing': [2, 'never'],
  'block-spacing': [2, 'never'],
  'brace-style': 2,
  'camelcase': [2, { properties: 'never' }],
  'comma-dangle': [2, 'always-multiline'],
  'comma-spacing': 2,
  'comma-style': 2,
  'computed-property-spacing': 2,
  'eol-last': 2,
  'func-call-spacing': 2,
  'key-spacing': 2,
  'keyword-spacing': 2,
  'linebreak-style': 2,
  'new-cap': 2,
  'no-array-constructor': 2,
  'no-multiple-empty-lines': [2, { max: 2 }],
  'no-new-object': 2,
  'no-tabs': 2,
  'no-trailing-spaces': 2,
  'object-curly-spacing': 2,
  'one-var': [
    2,
    {
      var: 'never',
      let: 'never',
      const: 'never',
    },
  ],
  'operator-linebreak': [2, 'after'],
  'padded-blocks': [2, 'never'],
  'quote-props': [2, 'consistent'],
  'quotes': [2, 'single', { allowTemplateLiterals: true }],
  'semi': 2,
  'semi-spacing': 2,
  'space-before-blocks': 2,
  'space-before-function-paren': [
    2,
    {
      asyncArrow: 'always',
      anonymous: 'never',
      named: 'never',
    },
  ],
  'spaced-comment': [2, 'always'],
  'switch-colon-spacing': 2,
  'arrow-parens': [2, 'always'],
  'constructor-super': 2,
  'generator-star-spacing': [2, 'after'],
  'no-new-symbol': 2,
  'no-this-before-super': 2,
  'no-var': 2,
  'prefer-const': [2, { destructuring: 'all' }],
  'prefer-spread': 2,
  'rest-spread-spacing': 2,
  'yield-star-spacing': [2, 'after'],
};

module.exports = [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      'jsdoc/',
      'doc/',
      'coverage/',
      'dist/',
      'node_modules/',
      'examples/**/node_modules/',
      'test/resources/auth.js',
      '**/*v*.js',
      'lib/*.js',
      'scripts/typedoc/',
    ],
  },

  // Base config for all JS files
  {
    files: ['**/*.js'],
    plugins: { n: pluginN, prettier },
    languageOptions: { ecmaVersion: 2020, sourceType: 'commonjs', globals: globals.node },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginN.configs['flat/recommended'].rules,
      ...googleRules,
      // eslint-config-prettier turns off all rules that conflict with prettier
      ...prettierConfig.rules,
      'prettier/prettier': ['error', { singleQuote: true, printWidth: 100 }],
      'prefer-const': 'error',
      'prefer-rest-params': 'off',
      'camelcase': 'off',
      'n/no-unpublished-require': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
    },
  },

  // Test-specific overrides
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {},
  },
];
