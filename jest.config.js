module.exports = {
  testEnvironment: 'node',
  reporters: [
    "default",
    ["jest-html-reporter", {
      outputPath: "reports/test-report.html"
    }]
  ],
  testMatch: [
    '**/pact/**/*.test.js',
    '**/validation/**/*.test.js'
  ]
};
