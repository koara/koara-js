"use strict";

koara.Link = function() {}
koara.Link.prototype = new koara.Node();

koara.Link.prototype = {
	constructor: koara.Link,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}