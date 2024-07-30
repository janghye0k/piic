export default {
  '*': ['prettier --write --ignore-unknown'],
  'src/**/*.{ts,tsx}': ['prettier --write', 'eslint --cache --fix'],
};
