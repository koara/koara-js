koara.CodeBlock = function() {}
koara.CodeBlock.prototype = new koara.BlockElement();

koara.CodeBlock.prototype = {
	constructor: koara.CodeBlock,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
