module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  collectCoverageFrom: [
    "src/components/*.vue",
    "src/views/*.vue",
    "src/router/*",
    "src/store/*"
  ]
};
