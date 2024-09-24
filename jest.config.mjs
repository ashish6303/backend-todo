// jest.config.mjs
export default {
  preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['globalConfig'],
};
