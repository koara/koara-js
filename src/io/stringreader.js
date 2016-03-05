"use strict";

koara.StringReader = function(text) {
	this.index = 0;
	this.text = text;
}

koara.StringReader.prototype = {
	constructor: koara.StringReader,
	
	read: function(buffer, offset, length) {
		if(this.text.toString().substring(this.index).length > 0) {
			var charactersRead = 0;
			for(var i=0; i < length; i++) {
				var start = this.index + i;
				var c = this.text.toString().substring(start, start + 1);
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
}