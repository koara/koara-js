koara.Paragraph = function() {}
koara.Paragraph.prototype = new koara.BlockElement();

koara.Paragraph.prototype = {
	constructor: koara.Paragraph,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}