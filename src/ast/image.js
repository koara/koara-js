"use strict";

koara.Image = function() {};
koara.Image.prototype = new koara.Node();

koara.Image.prototype = {
	constructor: koara.Image,

	accept: function(renderer) {
		renderer.visit(this);
	}
};
