module.exports = {
  default: {
    paths: ["features/**/*.feature"],

    requireModule: ["tsx/cjs"],

    require: [
      "src/support/**/*.ts",
      "src/hooks/**/*.ts",
      "src/step-definitions/**/*.ts"
    ],

    format: [
      "progress-bar",
      "summary",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ],

    formatOptions: {
      snippetInterface: "async-await"
    },

    parallel: 1
  }
};