koara.LineBreak = function() {}
koara.LineBreak.prototype = new koara.Node();

koara.LineBreak.prototype = {
	constructor: koara.LineBreak,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}