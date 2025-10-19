module.exports = {
  default: {
    paths: ['qwiik_tests/features/**/*.feature'],
    require: ['qwiik_tests/steps/**/*.js', 'qwiik_tests/hooks/**/*.js'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    publishQuiet: true
  }
};
