var testSuiteFolder = 'test/testsuite';
var fs = require('fs');
var path = require('path');
var modules = fs.readdirSync(testSuiteFolder);
var koara = require('../dist/koara.js');

for(i in modules) {
    describe(modules[i], function() {
	    testcases = fs.readdirSync(testSuiteFolder + '/' + modules[i] + '/koara');
	    for(j in testcases) {
            if(path.extname(testcases[j]) === ".kd") {
            	var testcase = testcases[j].substr(0, testcases[j].length-3);
                it(testcase + " to HTML", function() {
                	var kd = fs.readFileSync(testSuiteFolder + '/' + modules[i] + '/koara/' + testcase + ".kd");
                	var html = fs.readFileSync(testSuiteFolder + '/' + modules[i] + '/html5/' + testcase + ".htm");
                    var parser = new koara.Parser();
                    var document = parser.parse(kd);                    
                    var renderer = new koara.Html5Renderer();
                    document.accept(renderer);
                    expect(renderer.getOutput()).toEqual(html.toString());
                });
		    }
	    }
  });
}