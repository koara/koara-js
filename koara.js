'use strict';

(function(exports) {
	
	var StringReader = function(text) {
		var index = 0;
		return {
			read: function(buffer, offset, length) {
				if(text.substr(index).length > 0) {
					var charactersRead = 0;
					for(var i=0; i < length; i++) {
						var c = text.substr(index + i, 1);
						if(c !== '') {
							buffer[offset + i] = c;
							charactersRead++;
						}
					}
					index += length;
					return charactersRead;
				}
				return -1;
			}
		}
	}
	
	var CharStream = function(reader) {
		var available = 4096;
		var bufsize = 4096;
		var tokenBegin;
		var bufcolumn = [];
		var bufpos = -1;
		var bufline = [];
		var column = 0;
		var line = 1;
		var prevCharIsLF;
		var reader;
		var buffer = [];
		var maxNextCharInd = 0;
		var inBuf = 0;
		var tabSize = 4;
		return {
			beginToken: function() {
				return 'a'
			},
			readChar: function() {
				return 'a'
			},
			getBeginColumn: function() {
				return 1
			},
			getBeginLine: function() {
				return 1
			},
			getEndColumn: function() {
				return 1
			},
			getEndLine: function() {
				return 1
			}
		}
	}
	
	exports.CharStream = CharStream;
	exports.StringReader = StringReader;
})(typeof exports === 'undefined' ? this.koara = {} : exports);