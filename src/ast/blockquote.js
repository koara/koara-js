"use strict";

koara.BlockQuote = function() {};
koara.BlockQuote.prototype = new koara.BlockElement();

koara.BlockQuote.prototype = {
	constructor: koara.BlockQuote,

	accept: function(renderer) {
		renderer.visit(this);
	}
};
