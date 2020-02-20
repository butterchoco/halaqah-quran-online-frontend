module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  "collectCoverage": true,
  "collectCoverageFrom": [
    "src/components/*.vue",
    "src/views/*.vue",
  ],
  "coverageReporters": ["html", "text-summary"]
}
