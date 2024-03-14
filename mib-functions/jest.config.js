module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
}
