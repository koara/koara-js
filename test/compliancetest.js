var fs = require('fs');
var path = require('path');

var koara = require('../lib/koara');
var Html5Renderer = require('./html5renderer');

var testSuiteFolder = 'testsuite';
var modules = fs.readdirSync(testSuiteFolder +  '/input');
var tests = [];

for(i in modules) {
	if(modules.hasOwnProperty(i) && path.basename(modules[i]) !== 'end2end.kd') {
		testcases = fs.readdirSync(testSuiteFolder + '/input/' + modules[i]);
		for(j in testcases) {
			if(path.extname(testcases[j]) === ".kd") {
				tests.push({module: modules[i], name: testcases[j].substr(0, testcases[j].length-3)})
			}
		}
	}
}

describe("Koara Compliancy Tests", function() {
//	tests.forEach(function (test) {
//		it(test.name + ' to HTML', function () {
//			var kd = fs.readFileSync(testSuiteFolder + '/input/' + test.module + '/' + test.name + ".kd");
//			var html = fs.readFileSync(testSuiteFolder + '/output/html5/' + test.module + '/' + test.name + ".htm");
//            var parser = new koara.Parser();
//            var document = parser.parse(kd);                    
//            var renderer = new Html5Renderer();
//            document.accept(renderer);
//            expect(renderer.getOutput()).toEqual(html.toString());
//        });
//	});
//	
	tests.forEach(function (test) {
		it(test.name + ' to Koara', function () {
			var kd = fs.readFileSync(testSuiteFolder + '/input/' + test.module + '/' + test.name + ".kd");
			var expected = fs.readFileSync(testSuiteFolder + '/output/koara/' + test.module + '/' + test.name + ".kd");
            var parser = new koara.Parser();
            var document = parser.parse(kd);                    
            var renderer = new koara.KoaraRenderer();
            document.accept(renderer);
            expect(renderer.getOutput()).toEqual(expected.toString());
        });
	});
});