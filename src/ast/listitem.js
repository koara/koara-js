"use strict";

koara.ListItem = function() {};
koara.ListItem.prototype = new koara.Node();

koara.ListItem.prototype = {
	constructor: koara.ListItem,

	accept: function(renderer) {
		renderer.visit(this);
	}
};
