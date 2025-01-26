module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
  transform: {
    "^.+\\.(ts|js|html)$": "jest-preset-angular",
  },
  moduleNameMapper: {
  "^src/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["ts", "js", "html", "json"],
};
