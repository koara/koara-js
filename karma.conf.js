module.exports = function(config) {
  config.set({
      frameworks: [ 'jasmine' ],
      files: [
        'dist/koara.js',
        'test/*.js'
      ],
      reporters: [ 'progress' ],
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: [ 'PhantomJS' ],
      browserDisconnectTimeout: 10000,
      browserDisconnectTolerance: 2,
      browserNoActivityTimeout: 20000,
      singleRun: true
  });
};
