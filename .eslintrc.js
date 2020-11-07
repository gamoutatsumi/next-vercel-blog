module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/no-empty-interface": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
