'use strict';

(function(exports) {
	
	var StringReader = function(text) {
		return {
			index: 0,
			read: function(buffer, offset, length) {
				if(text.substr(this.index).length > 0) {
					var charactersRead = 0;
					for(var i=0; i < length; i++) {
						var c = text.substr((this.index + i), 1);
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
	}
	
	exports.StringReader = StringReader;
	
})(typeof exports === 'undefined' ? this.koara = {} : exports);