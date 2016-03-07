"use strict";

koara.Document = function() {
	this.children = [];
};
koara.Document.prototype = new koara.Node();

koara.Document.prototype.accept = function(renderer) {
	renderer.visitDocument(this);
};


