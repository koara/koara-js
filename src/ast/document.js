'use strict';

koara.Document = function() {}
koara.Document.prototype = new koara.Node();
koara.Document.prototype.constructor = koara.Document;

koara.Document.prototype.accept = function(renderer) {
	renderer.visitDocument(this);
};

