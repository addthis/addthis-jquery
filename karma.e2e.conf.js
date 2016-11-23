// Karma configuration
// Generated on Wed Aug 31 2016 19:33:45 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'fixture'],


    // list of files / patterns to load in the browser
    files: [
      './test/fixtures/**/*.html',
      './test/e2e/**/*.js',
      './node_modules/jquery/dist/jquery.js',
      './src/jquery-addthis.js',
      'https://s7.addthis.com/js/300/addthis_widget.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js'             : 'coverage',
      'test/fixtures/**/*.html' : 'html2js'
    },

    coverageReporter: {
        dir : 'test_reports/e2e/',
        reporters: [
            { type: 'html', subdir: 'coverage_html' },
            { type: 'cobertura', subdir: 'coverage_cobertura' }
        ]
    },

    htmlReporter: {
        outputDir: 'test_reports/e2e/bytest_html',

        // Optional
        pageTitle: 'Unit Tests',
        subPageTitle: 'jquery-addthis plugin',
        groupSuites: true,
        useCompactStyle: true,
        useLegacyStyle: true
    },

    junitReporter: {
      outputDir: './test_reports/e2e/bytest_junit'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html', 'junit', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'Chrome',
        'Firefox',
        //'Safari',
        'PhantomJS'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
