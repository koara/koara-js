"use strict";

koara.Em = function() {}
koara.Em.prototype = new koara.Node();

koara.Em.prototype = {
	constructor: koara.Em,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}