koara.Heading = function() {}
koara.Heading.prototype = new koara.BlockElement();

koara.Heading.prototype = {
	constructor: koara.Heading,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}