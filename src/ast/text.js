koara.Text = function() {}
koara.Text.prototype = new koara.Node();

koara.Text.prototype = {
	constructor: koara.Text,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}