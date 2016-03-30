var fs = require('fs');
var koara = require('../lib/koara');
var Html5Renderer = require('./html5renderer');

describe("Koara End2End Tests", function() {
	
	var parser;

	beforeEach(function() {
		parser = new koara.Parser();;
	});
	
	it("end2end-000001", function () {
	    assertOutput("end2end-000001", ["paragraphs"])
	});

	it("end2end-000002", function () {
	    assertOutput("end2end-000002", ["headings"])
	});

	it("end2end-000003", function () {
	    assertOutput("end2end-000003", ["paragraphs", "headings"])
	});

	it("end2end-000004", function () {
	    assertOutput("end2end-000004", ["lists"])
	});

	it("end2end-000005", function () {
	    assertOutput("end2end-000005", ["paragraphs", "lists"])
	});

	it("end2end-000006", function () {
	    assertOutput("end2end-000006", ["headings", "lists"])
	});

	it("end2end-000007", function () {
	    assertOutput("end2end-000007", ["paragraphs", "headings", "lists"])
	});

	it("end2end-000008", function () {
	    assertOutput("end2end-000008", ["links"])
	});

	it("end2end-000009", function () {
	    assertOutput("end2end-000009", ["paragraphs", "links"])
	});

	it("end2end-000010", function () {
	    assertOutput("end2end-000010", ["headings", "links"])
	});

	it("end2end-000011", function () {
	    assertOutput("end2end-000011", ["paragraphs", "headings", "links"])
	});

	it("end2end-000012", function () {
	    assertOutput("end2end-000012", ["lists", "links"])
	});

	it("end2end-000013", function () {
	    assertOutput("end2end-000013", ["paragraphs", "lists", "links"])
	});

	it("end2end-000014", function () {
	    assertOutput("end2end-000014", ["headings", "lists", "links"])
	});

	it("end2end-000015", function () {
	    assertOutput("end2end-000015", ["paragraphs", "headings", "lists", "links"])
	});

	it("end2end-000016", function () {
	    assertOutput("end2end-000016", ["images"])
	});

	it("end2end-000017", function () {
	    assertOutput("end2end-000017", ["paragraphs", "images"])
	});

	it("end2end-000018", function () {
	    assertOutput("end2end-000018", ["headings", "images"])
	});

	it("end2end-000019", function () {
	    assertOutput("end2end-000019", ["paragraphs", "headings", "images"])
	});

	it("end2end-000020", function () {
	    assertOutput("end2end-000020", ["lists", "images"])
	});

	it("end2end-000021", function () {
	    assertOutput("end2end-000021", ["paragraphs", "lists", "images"])
	});

	it("end2end-000022", function () {
	    assertOutput("end2end-000022", ["headings", "lists", "images"])
	});

	it("end2end-000023", function () {
	    assertOutput("end2end-000023", ["paragraphs", "headings", "lists", "images"])
	});

	it("end2end-000024", function () {
	    assertOutput("end2end-000024", ["links", "images"])
	});

	it("end2end-000025", function () {
	    assertOutput("end2end-000025", ["paragraphs", "links", "images"])
	});

	it("end2end-000026", function () {
	    assertOutput("end2end-000026", ["headings", "links", "images"])
	});

	it("end2end-000027", function () {
	    assertOutput("end2end-000027", ["paragraphs", "headings", "links", "images"])
	});

	it("end2end-000028", function () {
	    assertOutput("end2end-000028", ["lists", "links", "images"])
	});

	it("end2end-000029", function () {
	    assertOutput("end2end-000029", ["paragraphs", "lists", "links", "images"])
	});

	it("end2end-000030", function () {
	    assertOutput("end2end-000030", ["headings", "lists", "links", "images"])
	});

	it("end2end-000031", function () {
	    assertOutput("end2end-000031", ["paragraphs", "headings", "lists", "links", "images"])
	});

	it("end2end-000032", function () {
	    assertOutput("end2end-000032", ["formatting"])
	});

	it("end2end-000033", function () {
	    assertOutput("end2end-000033", ["paragraphs", "formatting"])
	});

	it("end2end-000034", function () {
	    assertOutput("end2end-000034", ["headings", "formatting"])
	});

	it("end2end-000035", function () {
	    assertOutput("end2end-000035", ["paragraphs", "headings", "formatting"])
	});

	it("end2end-000036", function () {
	    assertOutput("end2end-000036", ["lists", "formatting"])
	});

	it("end2end-000037", function () {
	    assertOutput("end2end-000037", ["paragraphs", "lists", "formatting"])
	});

	it("end2end-000038", function () {
	    assertOutput("end2end-000038", ["headings", "lists", "formatting"])
	});

	it("end2end-000039", function () {
	    assertOutput("end2end-000039", ["paragraphs", "headings", "lists", "formatting"])
	});

	it("end2end-000040", function () {
	    assertOutput("end2end-000040", ["links", "formatting"])
	});

	it("end2end-000041", function () {
	    assertOutput("end2end-000041", ["paragraphs", "links", "formatting"])
	});

	it("end2end-000042", function () {
	    assertOutput("end2end-000042", ["headings", "links", "formatting"])
	});

	it("end2end-000043", function () {
	    assertOutput("end2end-000043", ["paragraphs", "headings", "links", "formatting"])
	});

	it("end2end-000044", function () {
	    assertOutput("end2end-000044", ["lists", "links", "formatting"])
	});

	it("end2end-000045", function () {
	    assertOutput("end2end-000045", ["paragraphs", "lists", "links", "formatting"])
	});

	it("end2end-000046", function () {
	    assertOutput("end2end-000046", ["headings", "lists", "links", "formatting"])
	});

	it("end2end-000047", function () {
	    assertOutput("end2end-000047", ["paragraphs", "headings", "lists", "links", "formatting"])
	});

	it("end2end-000048", function () {
	    assertOutput("end2end-000048", ["images", "formatting"])
	});

	it("end2end-000049", function () {
	    assertOutput("end2end-000049", ["paragraphs", "images", "formatting"])
	});

	it("end2end-000050", function () {
	    assertOutput("end2end-000050", ["headings", "images", "formatting"])
	});

	it("end2end-000051", function () {
	    assertOutput("end2end-000051", ["paragraphs", "headings", "images", "formatting"])
	});

	it("end2end-000052", function () {
	    assertOutput("end2end-000052", ["lists", "images", "formatting"])
	});

	it("end2end-000053", function () {
	    assertOutput("end2end-000053", ["paragraphs", "lists", "images", "formatting"])
	});

	it("end2end-000054", function () {
	    assertOutput("end2end-000054", ["headings", "lists", "images", "formatting"])
	});

	it("end2end-000055", function () {
	    assertOutput("end2end-000055", ["paragraphs", "headings", "lists", "images", "formatting"])
	});

	it("end2end-000056", function () {
	    assertOutput("end2end-000056", ["links", "images", "formatting"])
	});

	it("end2end-000057", function () {
	    assertOutput("end2end-000057", ["paragraphs", "links", "images", "formatting"])
	});

	it("end2end-000058", function () {
	    assertOutput("end2end-000058", ["headings", "links", "images", "formatting"])
	});

	it("end2end-000059", function () {
	    assertOutput("end2end-000059", ["paragraphs", "headings", "links", "images", "formatting"])
	});

	it("end2end-000060", function () {
	    assertOutput("end2end-000060", ["lists", "links", "images", "formatting"])
	});

	it("end2end-000061", function () {
	    assertOutput("end2end-000061", ["paragraphs", "lists", "links", "images", "formatting"])
	});

	it("end2end-000062", function () {
	    assertOutput("end2end-000062", ["headings", "lists", "links", "images", "formatting"])
	});

	it("end2end-000063", function () {
	    assertOutput("end2end-000063", ["paragraphs", "headings", "lists", "links", "images", "formatting"])
	});

	it("end2end-000064", function () {
	    assertOutput("end2end-000064", ["blockquotes"])
	});

	it("end2end-000065", function () {
	    assertOutput("end2end-000065", ["paragraphs", "blockquotes"])
	});

	it("end2end-000066", function () {
	    assertOutput("end2end-000066", ["headings", "blockquotes"])
	});

	it("end2end-000067", function () {
	    assertOutput("end2end-000067", ["paragraphs", "headings", "blockquotes"])
	});

	it("end2end-000068", function () {
	    assertOutput("end2end-000068", ["lists", "blockquotes"])
	});

	it("end2end-000069", function () {
	    assertOutput("end2end-000069", ["paragraphs", "lists", "blockquotes"])
	});

	it("end2end-000070", function () {
	    assertOutput("end2end-000070", ["headings", "lists", "blockquotes"])
	});

	it("end2end-000071", function () {
	    assertOutput("end2end-000071", ["paragraphs", "headings", "lists", "blockquotes"])
	});

	it("end2end-000072", function () {
	    assertOutput("end2end-000072", ["links", "blockquotes"])
	});

	it("end2end-000073", function () {
	    assertOutput("end2end-000073", ["paragraphs", "links", "blockquotes"])
	});

	it("end2end-000074", function () {
	    assertOutput("end2end-000074", ["headings", "links", "blockquotes"])
	});

	it("end2end-000075", function () {
	    assertOutput("end2end-000075", ["paragraphs", "headings", "links", "blockquotes"])
	});

	it("end2end-000076", function () {
	    assertOutput("end2end-000076", ["lists", "links", "blockquotes"])
	});

	it("end2end-000077", function () {
	    assertOutput("end2end-000077", ["paragraphs", "lists", "links", "blockquotes"])
	});

	it("end2end-000078", function () {
	    assertOutput("end2end-000078", ["headings", "lists", "links", "blockquotes"])
	});

	it("end2end-000079", function () {
	    assertOutput("end2end-000079", ["paragraphs", "headings", "lists", "links", "blockquotes"])
	});

	it("end2end-000080", function () {
	    assertOutput("end2end-000080", ["images", "blockquotes"])
	});

	it("end2end-000081", function () {
	    assertOutput("end2end-000081", ["paragraphs", "images", "blockquotes"])
	});

	it("end2end-000082", function () {
	    assertOutput("end2end-000082", ["headings", "images", "blockquotes"])
	});

	it("end2end-000083", function () {
	    assertOutput("end2end-000083", ["paragraphs", "headings", "images", "blockquotes"])
	});

	it("end2end-000084", function () {
	    assertOutput("end2end-000084", ["lists", "images", "blockquotes"])
	});

	it("end2end-000085", function () {
	    assertOutput("end2end-000085", ["paragraphs", "lists", "images", "blockquotes"])
	});

	it("end2end-000086", function () {
	    assertOutput("end2end-000086", ["headings", "lists", "images", "blockquotes"])
	});

	it("end2end-000087", function () {
	    assertOutput("end2end-000087", ["paragraphs", "headings", "lists", "images", "blockquotes"])
	});

	it("end2end-000088", function () {
	    assertOutput("end2end-000088", ["links", "images", "blockquotes"])
	});

	it("end2end-000089", function () {
	    assertOutput("end2end-000089", ["paragraphs", "links", "images", "blockquotes"])
	});

	it("end2end-000090", function () {
	    assertOutput("end2end-000090", ["headings", "links", "images", "blockquotes"])
	});

	it("end2end-000091", function () {
	    assertOutput("end2end-000091", ["paragraphs", "headings", "links", "images", "blockquotes"])
	});

	it("end2end-000092", function () {
	    assertOutput("end2end-000092", ["lists", "links", "images", "blockquotes"])
	});

	it("end2end-000093", function () {
	    assertOutput("end2end-000093", ["paragraphs", "lists", "links", "images", "blockquotes"])
	});

	it("end2end-000094", function () {
	    assertOutput("end2end-000094", ["headings", "lists", "links", "images", "blockquotes"])
	});

	it("end2end-000095", function () {
	    assertOutput("end2end-000095", ["paragraphs", "headings", "lists", "links", "images", "blockquotes"])
	});

	it("end2end-000096", function () {
	    assertOutput("end2end-000096", ["formatting", "blockquotes"])
	});

	it("end2end-000097", function () {
	    assertOutput("end2end-000097", ["paragraphs", "formatting", "blockquotes"])
	});

	it("end2end-000098", function () {
	    assertOutput("end2end-000098", ["headings", "formatting", "blockquotes"])
	});

	it("end2end-000099", function () {
	    assertOutput("end2end-000099", ["paragraphs", "headings", "formatting", "blockquotes"])
	});

	it("end2end-000100", function () {
	    assertOutput("end2end-000100", ["lists", "formatting", "blockquotes"])
	});

	it("end2end-000101", function () {
	    assertOutput("end2end-000101", ["paragraphs", "lists", "formatting", "blockquotes"])
	});

	it("end2end-000102", function () {
	    assertOutput("end2end-000102", ["headings", "lists", "formatting", "blockquotes"])
	});

	it("end2end-000103", function () {
	    assertOutput("end2end-000103", ["paragraphs", "headings", "lists", "formatting", "blockquotes"])
	});

	it("end2end-000104", function () {
	    assertOutput("end2end-000104", ["links", "formatting", "blockquotes"])
	});

	it("end2end-000105", function () {
	    assertOutput("end2end-000105", ["paragraphs", "links", "formatting", "blockquotes"])
	});

	it("end2end-000106", function () {
	    assertOutput("end2end-000106", ["headings", "links", "formatting", "blockquotes"])
	});

	it("end2end-000107", function () {
	    assertOutput("end2end-000107", ["paragraphs", "headings", "links", "formatting", "blockquotes"])
	});

	it("end2end-000108", function () {
	    assertOutput("end2end-000108", ["lists", "links", "formatting", "blockquotes"])
	});

	it("end2end-000109", function () {
	    assertOutput("end2end-000109", ["paragraphs", "lists", "links", "formatting", "blockquotes"])
	});

	it("end2end-000110", function () {
	    assertOutput("end2end-000110", ["headings", "lists", "links", "formatting", "blockquotes"])
	});

	it("end2end-000111", function () {
	    assertOutput("end2end-000111", ["paragraphs", "headings", "lists", "links", "formatting", "blockquotes"])
	});

	it("end2end-000112", function () {
	    assertOutput("end2end-000112", ["images", "formatting", "blockquotes"])
	});

	it("end2end-000113", function () {
	    assertOutput("end2end-000113", ["paragraphs", "images", "formatting", "blockquotes"])
	});

	it("end2end-000114", function () {
	    assertOutput("end2end-000114", ["headings", "images", "formatting", "blockquotes"])
	});

	it("end2end-000115", function () {
	    assertOutput("end2end-000115", ["paragraphs", "headings", "images", "formatting", "blockquotes"])
	});

	it("end2end-000116", function () {
	    assertOutput("end2end-000116", ["lists", "images", "formatting", "blockquotes"])
	});

	it("end2end-000117", function () {
	    assertOutput("end2end-000117", ["paragraphs", "lists", "images", "formatting", "blockquotes"])
	});

	it("end2end-000118", function () {
	    assertOutput("end2end-000118", ["headings", "lists", "images", "formatting", "blockquotes"])
	});

	it("end2end-000119", function () {
	    assertOutput("end2end-000119", ["paragraphs", "headings", "lists", "images", "formatting", "blockquotes"])
	});

	it("end2end-000120", function () {
	    assertOutput("end2end-000120", ["links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000121", function () {
	    assertOutput("end2end-000121", ["paragraphs", "links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000122", function () {
	    assertOutput("end2end-000122", ["headings", "links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000123", function () {
	    assertOutput("end2end-000123", ["paragraphs", "headings", "links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000124", function () {
	    assertOutput("end2end-000124", ["lists", "links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000125", function () {
	    assertOutput("end2end-000125", ["paragraphs", "lists", "links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000126", function () {
	    assertOutput("end2end-000126", ["headings", "lists", "links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000127", function () {
	    assertOutput("end2end-000127", ["paragraphs", "headings", "lists", "links", "images", "formatting", "blockquotes"])
	});

	it("end2end-000128", function () {
	    assertOutput("end2end-000128", ["code"])
	});

	it("end2end-000129", function () {
	    assertOutput("end2end-000129", ["paragraphs", "code"])
	});

	it("end2end-000130", function () {
	    assertOutput("end2end-000130", ["headings", "code"])
	});

	it("end2end-000131", function () {
	    assertOutput("end2end-000131", ["paragraphs", "headings", "code"])
	});

	it("end2end-000132", function () {
	    assertOutput("end2end-000132", ["lists", "code"])
	});

	it("end2end-000133", function () {
	    assertOutput("end2end-000133", ["paragraphs", "lists", "code"])
	});

	it("end2end-000134", function () {
	    assertOutput("end2end-000134", ["headings", "lists", "code"])
	});

	it("end2end-000135", function () {
	    assertOutput("end2end-000135", ["paragraphs", "headings", "lists", "code"])
	});

	it("end2end-000136", function () {
	    assertOutput("end2end-000136", ["links", "code"])
	});

	it("end2end-000137", function () {
	    assertOutput("end2end-000137", ["paragraphs", "links", "code"])
	});

	it("end2end-000138", function () {
	    assertOutput("end2end-000138", ["headings", "links", "code"])
	});

	it("end2end-000139", function () {
	    assertOutput("end2end-000139", ["paragraphs", "headings", "links", "code"])
	});

	it("end2end-000140", function () {
	    assertOutput("end2end-000140", ["lists", "links", "code"])
	});

	it("end2end-000141", function () {
	    assertOutput("end2end-000141", ["paragraphs", "lists", "links", "code"])
	});

	it("end2end-000142", function () {
	    assertOutput("end2end-000142", ["headings", "lists", "links", "code"])
	});

	it("end2end-000143", function () {
	    assertOutput("end2end-000143", ["paragraphs", "headings", "lists", "links", "code"])
	});

	it("end2end-000144", function () {
	    assertOutput("end2end-000144", ["images", "code"])
	});

	it("end2end-000145", function () {
	    assertOutput("end2end-000145", ["paragraphs", "images", "code"])
	});

	it("end2end-000146", function () {
	    assertOutput("end2end-000146", ["headings", "images", "code"])
	});

	it("end2end-000147", function () {
	    assertOutput("end2end-000147", ["paragraphs", "headings", "images", "code"])
	});

	it("end2end-000148", function () {
	    assertOutput("end2end-000148", ["lists", "images", "code"])
	});

	it("end2end-000149", function () {
	    assertOutput("end2end-000149", ["paragraphs", "lists", "images", "code"])
	});

	it("end2end-000150", function () {
	    assertOutput("end2end-000150", ["headings", "lists", "images", "code"])
	});

	it("end2end-000151", function () {
	    assertOutput("end2end-000151", ["paragraphs", "headings", "lists", "images", "code"])
	});

	it("end2end-000152", function () {
	    assertOutput("end2end-000152", ["links", "images", "code"])
	});

	it("end2end-000153", function () {
	    assertOutput("end2end-000153", ["paragraphs", "links", "images", "code"])
	});

	it("end2end-000154", function () {
	    assertOutput("end2end-000154", ["headings", "links", "images", "code"])
	});

	it("end2end-000155", function () {
	    assertOutput("end2end-000155", ["paragraphs", "headings", "links", "images", "code"])
	});

	it("end2end-000156", function () {
	    assertOutput("end2end-000156", ["lists", "links", "images", "code"])
	});

	it("end2end-000157", function () {
	    assertOutput("end2end-000157", ["paragraphs", "lists", "links", "images", "code"])
	});

	it("end2end-000158", function () {
	    assertOutput("end2end-000158", ["headings", "lists", "links", "images", "code"])
	});

	it("end2end-000159", function () {
	    assertOutput("end2end-000159", ["paragraphs", "headings", "lists", "links", "images", "code"])
	});

	it("end2end-000160", function () {
	    assertOutput("end2end-000160", ["formatting", "code"])
	});

	it("end2end-000161", function () {
	    assertOutput("end2end-000161", ["paragraphs", "formatting", "code"])
	});

	it("end2end-000162", function () {
	    assertOutput("end2end-000162", ["headings", "formatting", "code"])
	});

	it("end2end-000163", function () {
	    assertOutput("end2end-000163", ["paragraphs", "headings", "formatting", "code"])
	});

	it("end2end-000164", function () {
	    assertOutput("end2end-000164", ["lists", "formatting", "code"])
	});

	it("end2end-000165", function () {
	    assertOutput("end2end-000165", ["paragraphs", "lists", "formatting", "code"])
	});

	it("end2end-000166", function () {
	    assertOutput("end2end-000166", ["headings", "lists", "formatting", "code"])
	});

	it("end2end-000167", function () {
	    assertOutput("end2end-000167", ["paragraphs", "headings", "lists", "formatting", "code"])
	});

	it("end2end-000168", function () {
	    assertOutput("end2end-000168", ["links", "formatting", "code"])
	});

	it("end2end-000169", function () {
	    assertOutput("end2end-000169", ["paragraphs", "links", "formatting", "code"])
	});

	it("end2end-000170", function () {
	    assertOutput("end2end-000170", ["headings", "links", "formatting", "code"])
	});

	it("end2end-000171", function () {
	    assertOutput("end2end-000171", ["paragraphs", "headings", "links", "formatting", "code"])
	});

	it("end2end-000172", function () {
	    assertOutput("end2end-000172", ["lists", "links", "formatting", "code"])
	});

	it("end2end-000173", function () {
	    assertOutput("end2end-000173", ["paragraphs", "lists", "links", "formatting", "code"])
	});

	it("end2end-000174", function () {
	    assertOutput("end2end-000174", ["headings", "lists", "links", "formatting", "code"])
	});

	it("end2end-000175", function () {
	    assertOutput("end2end-000175", ["paragraphs", "headings", "lists", "links", "formatting", "code"])
	});

	it("end2end-000176", function () {
	    assertOutput("end2end-000176", ["images", "formatting", "code"])
	});

	it("end2end-000177", function () {
	    assertOutput("end2end-000177", ["paragraphs", "images", "formatting", "code"])
	});

	it("end2end-000178", function () {
	    assertOutput("end2end-000178", ["headings", "images", "formatting", "code"])
	});

	it("end2end-000179", function () {
	    assertOutput("end2end-000179", ["paragraphs", "headings", "images", "formatting", "code"])
	});

	it("end2end-000180", function () {
	    assertOutput("end2end-000180", ["lists", "images", "formatting", "code"])
	});

	it("end2end-000181", function () {
	    assertOutput("end2end-000181", ["paragraphs", "lists", "images", "formatting", "code"])
	});

	it("end2end-000182", function () {
	    assertOutput("end2end-000182", ["headings", "lists", "images", "formatting", "code"])
	});

	it("end2end-000183", function () {
	    assertOutput("end2end-000183", ["paragraphs", "headings", "lists", "images", "formatting", "code"])
	});

	it("end2end-000184", function () {
	    assertOutput("end2end-000184", ["links", "images", "formatting", "code"])
	});

	it("end2end-000185", function () {
	    assertOutput("end2end-000185", ["paragraphs", "links", "images", "formatting", "code"])
	});

	it("end2end-000186", function () {
	    assertOutput("end2end-000186", ["headings", "links", "images", "formatting", "code"])
	});

	it("end2end-000187", function () {
	    assertOutput("end2end-000187", ["paragraphs", "headings", "links", "images", "formatting", "code"])
	});

	it("end2end-000188", function () {
	    assertOutput("end2end-000188", ["lists", "links", "images", "formatting", "code"])
	});

	it("end2end-000189", function () {
	    assertOutput("end2end-000189", ["paragraphs", "lists", "links", "images", "formatting", "code"])
	});

	it("end2end-000190", function () {
	    assertOutput("end2end-000190", ["headings", "lists", "links", "images", "formatting", "code"])
	});

	it("end2end-000191", function () {
	    assertOutput("end2end-000191", ["paragraphs", "headings", "lists", "links", "images", "formatting", "code"])
	});

	it("end2end-000192", function () {
	    assertOutput("end2end-000192", ["blockquotes", "code"])
	});

	it("end2end-000193", function () {
	    assertOutput("end2end-000193", ["paragraphs", "blockquotes", "code"])
	});

	it("end2end-000194", function () {
	    assertOutput("end2end-000194", ["headings", "blockquotes", "code"])
	});

	it("end2end-000195", function () {
	    assertOutput("end2end-000195", ["paragraphs", "headings", "blockquotes", "code"])
	});

	it("end2end-000196", function () {
	    assertOutput("end2end-000196", ["lists", "blockquotes", "code"])
	});

	it("end2end-000197", function () {
	    assertOutput("end2end-000197", ["paragraphs", "lists", "blockquotes", "code"])
	});

	it("end2end-000198", function () {
	    assertOutput("end2end-000198", ["headings", "lists", "blockquotes", "code"])
	});

	it("end2end-000199", function () {
	    assertOutput("end2end-000199", ["paragraphs", "headings", "lists", "blockquotes", "code"])
	});

	it("end2end-000200", function () {
	    assertOutput("end2end-000200", ["links", "blockquotes", "code"])
	});

	it("end2end-000201", function () {
	    assertOutput("end2end-000201", ["paragraphs", "links", "blockquotes", "code"])
	});

	it("end2end-000202", function () {
	    assertOutput("end2end-000202", ["headings", "links", "blockquotes", "code"])
	});

	it("end2end-000203", function () {
	    assertOutput("end2end-000203", ["paragraphs", "headings", "links", "blockquotes", "code"])
	});

	it("end2end-000204", function () {
	    assertOutput("end2end-000204", ["lists", "links", "blockquotes", "code"])
	});

	it("end2end-000205", function () {
	    assertOutput("end2end-000205", ["paragraphs", "lists", "links", "blockquotes", "code"])
	});

	it("end2end-000206", function () {
	    assertOutput("end2end-000206", ["headings", "lists", "links", "blockquotes", "code"])
	});

	it("end2end-000207", function () {
	    assertOutput("end2end-000207", ["paragraphs", "headings", "lists", "links", "blockquotes", "code"])
	});

	it("end2end-000208", function () {
	    assertOutput("end2end-000208", ["images", "blockquotes", "code"])
	});

	it("end2end-000209", function () {
	    assertOutput("end2end-000209", ["paragraphs", "images", "blockquotes", "code"])
	});

	it("end2end-000210", function () {
	    assertOutput("end2end-000210", ["headings", "images", "blockquotes", "code"])
	});

	it("end2end-000211", function () {
	    assertOutput("end2end-000211", ["paragraphs", "headings", "images", "blockquotes", "code"])
	});

	it("end2end-000212", function () {
	    assertOutput("end2end-000212", ["lists", "images", "blockquotes", "code"])
	});

	it("end2end-000213", function () {
	    assertOutput("end2end-000213", ["paragraphs", "lists", "images", "blockquotes", "code"])
	});

	it("end2end-000214", function () {
	    assertOutput("end2end-000214", ["headings", "lists", "images", "blockquotes", "code"])
	});

	it("end2end-000215", function () {
	    assertOutput("end2end-000215", ["paragraphs", "headings", "lists", "images", "blockquotes", "code"])
	});

	it("end2end-000216", function () {
	    assertOutput("end2end-000216", ["links", "images", "blockquotes", "code"])
	});

	it("end2end-000217", function () {
	    assertOutput("end2end-000217", ["paragraphs", "links", "images", "blockquotes", "code"])
	});

	it("end2end-000218", function () {
	    assertOutput("end2end-000218", ["headings", "links", "images", "blockquotes", "code"])
	});

	it("end2end-000219", function () {
	    assertOutput("end2end-000219", ["paragraphs", "headings", "links", "images", "blockquotes", "code"])
	});

	it("end2end-000220", function () {
	    assertOutput("end2end-000220", ["lists", "links", "images", "blockquotes", "code"])
	});

	it("end2end-000221", function () {
	    assertOutput("end2end-000221", ["paragraphs", "lists", "links", "images", "blockquotes", "code"])
	});

	it("end2end-000222", function () {
	    assertOutput("end2end-000222", ["headings", "lists", "links", "images", "blockquotes", "code"])
	});

	it("end2end-000223", function () {
	    assertOutput("end2end-000223", ["paragraphs", "headings", "lists", "links", "images", "blockquotes", "code"])
	});

	it("end2end-000224", function () {
	    assertOutput("end2end-000224", ["formatting", "blockquotes", "code"])
	});

	it("end2end-000225", function () {
	    assertOutput("end2end-000225", ["paragraphs", "formatting", "blockquotes", "code"])
	});

	it("end2end-000226", function () {
	    assertOutput("end2end-000226", ["headings", "formatting", "blockquotes", "code"])
	});

	it("end2end-000227", function () {
	    assertOutput("end2end-000227", ["paragraphs", "headings", "formatting", "blockquotes", "code"])
	});

	it("end2end-000228", function () {
	    assertOutput("end2end-000228", ["lists", "formatting", "blockquotes", "code"])
	});

	it("end2end-000229", function () {
	    assertOutput("end2end-000229", ["paragraphs", "lists", "formatting", "blockquotes", "code"])
	});

	it("end2end-000230", function () {
	    assertOutput("end2end-000230", ["headings", "lists", "formatting", "blockquotes", "code"])
	});

	it("end2end-000231", function () {
	    assertOutput("end2end-000231", ["paragraphs", "headings", "lists", "formatting", "blockquotes", "code"])
	});

	it("end2end-000232", function () {
	    assertOutput("end2end-000232", ["links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000233", function () {
	    assertOutput("end2end-000233", ["paragraphs", "links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000234", function () {
	    assertOutput("end2end-000234", ["headings", "links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000235", function () {
	    assertOutput("end2end-000235", ["paragraphs", "headings", "links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000236", function () {
	    assertOutput("end2end-000236", ["lists", "links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000237", function () {
	    assertOutput("end2end-000237", ["paragraphs", "lists", "links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000238", function () {
	    assertOutput("end2end-000238", ["headings", "lists", "links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000239", function () {
	    assertOutput("end2end-000239", ["paragraphs", "headings", "lists", "links", "formatting", "blockquotes", "code"])
	});

	it("end2end-000240", function () {
	    assertOutput("end2end-000240", ["images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000241", function () {
	    assertOutput("end2end-000241", ["paragraphs", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000242", function () {
	    assertOutput("end2end-000242", ["headings", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000243", function () {
	    assertOutput("end2end-000243", ["paragraphs", "headings", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000244", function () {
	    assertOutput("end2end-000244", ["lists", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000245", function () {
	    assertOutput("end2end-000245", ["paragraphs", "lists", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000246", function () {
	    assertOutput("end2end-000246", ["headings", "lists", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000247", function () {
	    assertOutput("end2end-000247", ["paragraphs", "headings", "lists", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000248", function () {
	    assertOutput("end2end-000248", ["links", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000249", function () {
	    assertOutput("end2end-000249", ["paragraphs", "links", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000250", function () {
	    assertOutput("end2end-000250", ["headings", "links", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000251", function () {
	    assertOutput("end2end-000251", ["paragraphs", "headings", "links", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000252", function () {
	    assertOutput("end2end-000252", ["lists", "links", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000253", function () {
	    assertOutput("end2end-000253", ["paragraphs", "lists", "links", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000254", function () {
	    assertOutput("end2end-000254", ["headings", "lists", "links", "images", "formatting", "blockquotes", "code"])
	});

	it("end2end-000255", function () {
	    assertOutput("end2end-000255", ["paragraphs", "headings", "lists", "links", "images", "formatting", "blockquotes", "code"])
	});

	function assertOutput(file, modules) {
		var kd = fs.readFileSync("testsuite/input/end2end.kd");
		var html = fs.readFileSync("testsuite/output/html5/end2end/" + file + ".htm");
		
		parser.modules = modules;
        var document = parser.parse(kd);                    
        var renderer = new Html5Renderer();
        document.accept(renderer);
        expect(renderer.getOutput()).toEqual(html.toString());
	}
});
