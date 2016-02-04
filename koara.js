'use strict';

(function(exports) {
	
	var StringReader = function(text) {
		this.index = 0;
		this.text = text;
	}
	
	StringReader.prototype.read = function(buffer, offset, length) {
		if(this.text.substr(this.index).length > 0) {
			var charactersRead = 0;
			for(var i=0; i < length; i++) {
				var c = this.text.substr(this.index + i, 1);
				if(c !== '') {
					buffer[offset + i] = c;
					charactersRead++;
				}
			}
			this.index += length;
			return charactersRead;
		}
		return -1;
    }
	
	var CharStream = function(reader) {
		available = 4096;
		bufsize = 4096;
		tokenBegin;
		bufcolumn = [];
		bufpos = -1;
		bufline = [];
		column = 0;
		line = 1;
		prevCharIsLF;
		reader;
		buffer = [];
		maxNextCharInd = 0;
		inBuf = 0;
		tabSize = 4;
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