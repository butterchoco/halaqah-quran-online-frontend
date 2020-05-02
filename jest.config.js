module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  collectCoverageFrom: [
    "src/components/*.vue",
    "src/views/*.vue",
    "src/router/*",
    "src/store/*"
  ],
  coverageReporters: ["text", "lcov", "json", "html"],
};

process.env = Object.assign(process.env, {
  VUE_APP_URL: 'http://localhost:8000',
});