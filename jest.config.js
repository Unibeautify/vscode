module.exports = {
  rootDir: ".",
  testEnvironment: "./out/test/jest-vscode-environment.js",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "test/.+\\.(test|spec)\\.ts$",
  testPathIgnorePatterns: [
    "<rootDir>/__mocks__/", "<rootDir>/dist/", "<rootDir>/node_modules/",
  ],
  setupFilesAfterEnv: [
    "./out/test/jest-vscode-framework-setup.js"
  ],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "node",
    "ts",
    "tsx"
  ],
  collectCoverage: true,
  coverageReporters: [
    "json", "lcov", "text", "html"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/__mocks__/", "<rootDir>/dist/", "<rootDir>/node_modules/",
  ],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: {
        warnOnly: true
      },
    }
  }
};
