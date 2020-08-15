module.exports = {
  'hooks': {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'concurrently "tsc --noEmit" "lint-staged"',
  }
};
