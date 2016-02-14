koara.Code = function() {}
koara.Code.prototype = new koara.Node();

koara.Code.prototype = {
	constructor: koara.Code,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
