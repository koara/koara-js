var fs = require('fs');
var path = require('path');
var koara = require('../dist/koara.js');
var testSuiteFolder = 'test/testsuite';
var modules = fs.readdirSync(testSuiteFolder +  '/input');
var tests = [];

for(i in modules) {
	if(modules.hasOwnProperty(i)) {
		testcases = fs.readdirSync(testSuiteFolder + '/input/' + modules[i]);
		for(j in testcases) {
			console.log('//' + testcases[j]);
			if(path.extname(testcases[j]) === ".kd") {
				tests.push({module: modules[i], name: testcases[j].substr(0, testcases[j].length-3)})
			}
		}
	}
}

describe("Koara Compliancy Tests", function() {
	tests.forEach(function (test) {
		it(test.name + ' to HTML', function () {
			var kd = fs.readFileSync(testSuiteFolder + '/input/' + test.module + '/' + test.name + ".kd");
			var html = fs.readFileSync(testSuiteFolder + '/output/html5/' + test.module + '/' + test.name + ".htm");
            var parser = new koara.Parser();
            var document = parser.parse(kd);                    
            var renderer = new koara.Html5Renderer();
            document.accept(renderer);
            expect(renderer.getOutput()).toEqual(html.toString());
        });
	});
});