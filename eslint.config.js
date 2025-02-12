import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';

export default [
  {
    ignores: ['dist', 'build', 'node_modules', '*.config.js', 'coverage'],
  },
  eslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tseslintParser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      vue: vuePlugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
        },
      ],
      // Disable multi-word component names for shadcn-vue components
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: [
            'Accordion',
            'Button',
            'Card',
            'Dialog',
            'Input',
            'Label',
            'Parameter',
            'Textarea',
            'modal',
            'header',
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'prettier/prettier': 'error',
      // Handle unused variables
      'no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
];
