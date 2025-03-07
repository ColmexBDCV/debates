module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  globals: {
    L: 'readonly'
  },
  plugins: [
  ],
  // add your custom rules here
  rules: {}
}
