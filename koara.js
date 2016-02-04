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
		this.available = 4096;
		this.bufsize = 4096;
		this.tokenBegin;
		this.bufcolumn = [];
		this.bufpos = -1;
		this.bufline = [];
		this.column = 0;
		this.line = 1;
		this.prevCharIsLF;
		this.reader = reader;
		this.buffer = [];
		this.maxNextCharInd = 0;
		this.inBuf = 0;
		this.tabSize = 4;
	}
	
	CharStream.prototype.beginToken = function() {
		return 'a'
	}
	
	CharStream.prototype.readChar = function() {
		if (this.inBuf > 0) {
            --this.inBuf;
            if (++this.bufpos == this.bufsize) {
                this.bufpos = 0;
            }
            return this.buffer[this.bufpos];
        }
        if (++this.bufpos >= this.maxNextCharInd) {
            this.fillBuff();
        }
        var c = this.buffer[this.bufpos];
        this.updateLineColumn(c);
        return c;
	}
	
	CharStream.prototype.fillBuff = function() {
		if (this.maxNextCharInd == this.available) {
            if (this.available == this.bufsize) {
                this.bufpos = 0;
                this.maxNextCharInd = 0;
                if (this.tokenBegin > 2048) {
                    this.available = this.tokenBegin;
                }
            } else {
                this.available = this.bufsize;
            }
        }
        var i;
        
        try {
            if ((i = this.reader.read(this.buffer, this.maxNextCharInd, this.available - this.maxNextCharInd)) == -1) {
            	this.reader.close();
                throw "IOException";
            } else {
                this.maxNextCharInd += i;
            }
        } catch (e) {
            --this.bufpos;
            this.backup(0);
            if (this.tokenBegin == -1) {
                this.tokenBegin = this.bufpos;
            }
            throw e;
        }
	}
	
	CharStream.prototype.backup = function(amount) {
        this.inBuf += this.amount;
        if ((this.bufpos -= this.amount) < 0) {
            this.bufpos += this.bufsize;
        }
    }
	
	CharStream.prototype.updateLineColumn = function(c) {
        this.column++;
        if (this.prevCharIsLF) {
            this.prevCharIsLF = false;
            this.column = 1;
            this.line += this.column;
        }

        switch (c) {
        case '\n':
            this.prevCharIsLF = true;
            break;
        case '\t':
            this.column--;
            this.column += (this.tabSize - (this.column % this.tabSize));
            break;
        }
        this.bufline[this.bufpos] = this.line;
        this.bufcolumn[this.bufpos] = this.column;
    }
	
	CharStream.prototype.getBeginColumn = function() {
		return 1;
	}
	
	CharStream.prototype.getBeginLine = function() {
		return 1;
	}
	
	CharStream.prototype.getEndColumn = function() {
		return 1;
	}
	
	CharStream.prototype.getEndLine = function() {
		return 1;
	}
	
	exports.CharStream = CharStream;
	exports.StringReader = StringReader;
})(typeof exports === 'undefined' ? this.koara = {} : exports);