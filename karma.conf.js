module.exports = function(config) {
  config.set({
      frameworks: [ 'jasmine' ],
      files: [
          'dist/koara.js',
          'test/com*.js',
          'testsuite/**/*'
      ],
      preprocessors: {
          'testsuite/input/*.*'   : ['html2js'],
          'testsuite/output/html5/*.*'   : ['html2js']
      },
      browsers: [ 'PhantomJS' ]
  });  
};
