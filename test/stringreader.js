'use strict';

var koara = require('../koara.js');
var buffer;

describe("CharStream tests", function() {
	
	beforeEach(function() {
	   buffer = [];
    });
	
	it("Test Read", function() {
      var reader = koara.StringReader('abcd');
      expect(reader.read(buffer, 0, 4)).toEqual(4);
      expect(buffer[0]).toEqual('a');
      expect(buffer[1]).toEqual('b');
      expect(buffer[2]).toEqual('c');
      expect(buffer[3]).toEqual('d');
      expect(buffer.length).toEqual(4);
      expect(reader.read(buffer, 0, 4)).toEqual(-1);
    });
	
	it("Test Read Part Of String", function() {
      var reader = koara.StringReader('abcd');
      expect(reader.read(buffer, 0, 2)).toEqual(2);
      expect(buffer[0]).toEqual('a');
      expect(buffer[1]).toEqual('b');
      expect(buffer.length).toEqual(2);
	});
	
	it("Test Read With Offset Part Of String", function() {
		var reader = koara.StringReader('abcd');
		expect(reader.read(buffer, 2, 4)).toEqual(4);
		expect(0 in buffer).toBe(false);
		expect(1 in buffer).toBe(false);
		expect(buffer[2]).toEqual('a');
	    expect(buffer[3]).toEqual('b');
	});
	
	it("Test Read With Offset Too Large Part Of String", function() {
		var reader = koara.StringReader('abcd');
		expect(reader.read(buffer, 6, 4)).toEqual(4);
		expect(0 in buffer).toBe(false);
		expect(1 in buffer).toBe(false);
		expect(2 in buffer).toBe(false);
		expect(3 in buffer).toBe(false);
	});
	
	it("Test Read Until Eof", function() {
		var reader = koara.StringReader('abcd');
		expect(reader.read(buffer, 0, 2)).toEqual(2);
		expect(buffer[0]).toEqual('a');
	    expect(buffer[1]).toEqual('b');
	    
	    expect(reader.read(buffer, 0, 3)).toEqual(2);
	    expect(buffer[0]).toEqual('c');
	    expect(buffer[1]).toEqual('d');
	    
	    expect(reader.read(buffer, 0, 2)).toEqual(-1);
	});
	
	it("Test Read With Unicode", function() {
		var reader = koara.StringReader('ðinæ');
		expect(reader.read(buffer, 0, 4)).toEqual(4);
		expect(buffer[0]).toEqual('ð');
	    expect(buffer[1]).toEqual('i');
	    expect(buffer[2]).toEqual('n');
	    expect(buffer[3]).toEqual('æ');
	});
	
	it("Test Read With Unicode Part Of String", function() {
		var reader = koara.StringReader('ðinæ');
		expect(reader.read(buffer, 0, 2)).toEqual(2);
		expect(buffer[0]).toEqual('ð');
	    expect(buffer[1]).toEqual('i');
	    expect(buffer.length).toEqual(2);
	});
	
	it("Test Read With Unicode And Offset Part Of String", function() {
		var reader = koara.StringReader('ðinæ');
		expect(reader.read(buffer, 2, 4)).toEqual(4);
		expect(0 in buffer).toBe(false);
		expect(1 in buffer).toBe(false);
		expect(buffer[2]).toEqual('ð');
	    expect(buffer[3]).toEqual('i');
	});
	
	it("Test Read With Unicode And Offset Too Large Part Of String", function() {
		var reader = koara.StringReader('ðinæ');
		expect(reader.read(buffer, 6, 4)).toEqual(4);
		expect(0 in buffer).toBe(false);
		expect(1 in buffer).toBe(false);
		expect(2 in buffer).toBe(false);
		expect(3 in buffer).toBe(false);
	});
	
	it("Test Read With Unicode Until Eof", function() {
		var reader = koara.StringReader('ðinæ');
		expect(reader.read(buffer, 0, 3)).toEqual(3);
		expect(buffer[0]).toEqual('ð');
	    expect(buffer[1]).toEqual('i');
	    
	    expect(reader.read(buffer, 0, 3)).toEqual(1);
	    expect(buffer[0]).toEqual('æ');
	    
	    expect(reader.read(buffer, 0, 2)).toEqual(-1);
	});
	
});