"use strict";

koara.ListBlock = function() {};
koara.ListBlock.prototype = new koara.BlockElement();

koara.ListBlock.prototype = {
	constructor: koara.ListBlock,

	accept: function(renderer) {
		renderer.visit(this);
	}
};
