module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  "moduleNameMapper": {
    "\\.(css|less|sass|scss)$": "<rootDir>/tests/__mocks__/styleMock.js",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  "testEnvironment": "jsdom",
  "transform": {
    "\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest"
  }
};
