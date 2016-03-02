koara.Document = function() {}
koara.Document.prototype = new koara.Node();

koara.Document.prototype = {
	constructor: koara.Document,
	
	accept: function(renderer) {
		renderer.visitDocument(this)
	}
}