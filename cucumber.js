module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    requireModule: ["tsx/cjs"],
    require: [
      "src/support/**/*.ts",
      "src/hooks/**/*.ts",
      "features/step-definitions/**/*.ts"
    ],
    format: ["progress"],
    publishQuiet: true
  }
};