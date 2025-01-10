import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier"
import prettierConfig from "eslint-config-prettier"


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig,
  {
    settings: {
      react: {
        version: 'detect' // 自动检测 React 版本
      }
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/react-in-jsx-scope': 'off', // 关闭需要导入 React 的规则，因为 React 17+ 不再需要
      'react/jsx-uses-react': 'off'      // 同上
    }
  }
];
