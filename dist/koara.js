var koara = {}

if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = koara;
  }
  exports.koara = koara;
} else {
  root.koara = koara;
}
koara.CharStream = function(reader) {
	this.available = 4096;
	this.bufsize = 4096;
	this.tokenBegin = 0;
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

koara.CharStream.prototype.beginToken = function() {
	this.tokenBegin = -1;
	var c = this.readChar();
	this.tokenBegin = this.bufpos;
	return c;
}

koara.CharStream.prototype.readChar = function() {
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

koara.CharStream.prototype.fillBuff = function() {
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
		if ((i = this.reader.read(this.buffer, this.maxNextCharInd,
				this.available - this.maxNextCharInd)) == -1) {
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

koara.CharStream.prototype.backup = function(amount) {
	this.inBuf += this.amount;
	if ((this.bufpos -= this.amount) < 0) {
		this.bufpos += this.bufsize;
	}
}

koara.CharStream.prototype.updateLineColumn = function(c) {
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
		this.column += this.tabSize - this.column % this.tabSize;
		break;
	}
	this.bufline[this.bufpos] = this.line;
	this.bufcolumn[this.bufpos] = this.column;
}

koara.CharStream.prototype.getImage = function() {
	if (this.bufpos >= this.tokenBegin) {
		return this.buffer.slice(this.tokenBegin, this.bufpos - this.tokenBegin + 1).join('');
	} else {
		return this.buffer.slice(this.tokenBegin, this.bufsize - this.tokenBegin).join('')
				+ this.buffer.slice(0, this.bufpos + 1).join('');
	}
}

koara.CharStream.prototype.getBeginColumn = function() {
	return this.bufpos in this.bufcolumn ? this.bufcolumn[this.bufpos] : 0;
}

koara.CharStream.prototype.getBeginLine = function() {
	return this.bufpos in this.bufline ? this.bufline[this.bufpos] : 0;
}

koara.CharStream.prototype.getEndColumn = function() {
	return this.tokenBegin in this.bufcolumn ? this.bufcolumn[this.tokenBegin] : 0;
}

koara.CharStream.prototype.getEndLine = function() {
	return this.tokenBegin in this.bufline ? this.bufline[this.tokenBegin] : 0;
}
'use strict';

koara.StringReader = function(text) {
	this.index = 0;
	this.text = text;
}

koara.StringReader.prototype.read = function(buffer, offset, length) {
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