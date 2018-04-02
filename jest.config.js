"use strict";

module.exports = {
  rootDir: ".",
  testEnvironment: "./out/test/jest-vscode-environment.js",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "test/.+\\.(test|spec)\\.ts$",
  testPathIgnorePatterns: [
    "<rootDir>/__mocks__/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
  ],
  setupTestFrameworkScriptFile: "./out/test/jest-vscode-framework-setup.js",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageReporters: ["json", "lcov", "text", "html"],
  coveragePathIgnorePatterns: [
    "<rootDir>/__mocks__/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
  ],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
      enableTsDiagnostics: true,
    },
  },
};
