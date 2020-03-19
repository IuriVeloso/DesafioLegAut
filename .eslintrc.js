module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'prettier',
    'prettier/react',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    "react", "jsx-a11y", "import", "react-hooks", "prettier"
  ],
  rules: {
      "prettier/prettier": "error",
      "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
      "react/jsx-indent": [2, 2],
      "react/jsx-one-expresion-per-line": 0,
      "arrow-parens": 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'comma-dangle':0
    },
};
