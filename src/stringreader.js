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