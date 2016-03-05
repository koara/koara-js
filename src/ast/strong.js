"use strict";

koara.Strong = function() {}
koara.Strong.prototype = new koara.Node();

koara.Strong.prototype = {
	constructor: koara.Strong,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}