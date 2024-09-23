// jest.config.js
module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
      '^pages/(.*)$': '<rootDir>/src/pages/$1',
      '^components/(.*)$': '<rootDir>/src/components/$1',
      '^services/(.*)$': '<rootDir>/src/services/$1',
    },
  };