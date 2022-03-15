import type { Config } from "@jest/types";
import jestConfig from "@ucm/tooling/jest.config";
import nextJest from "next/jest";

const { collectCoverageFrom, coveragePathIgnorePatterns, testPathIgnorePatterns } = jestConfig;

const createJestConfig = nextJest({
  dir: "./",
});

module.exports = createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  testRegex: ["(\\.|/)(test|spec)\\.[jt]sx?$"],
  collectCoverageFrom,
  coveragePathIgnorePatterns: [...(coveragePathIgnorePatterns || []), "<rootDir>/src/providers"],
  testPathIgnorePatterns,
} as Config.InitialOptions);
