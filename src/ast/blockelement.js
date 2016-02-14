koara.BlockElement = function() {}
koara.BlockElement.prototype = new koara.Node();

koara.BlockElement.prototype = {
	constructor: koara.BlockElement,

	isNested: function() {
		return !(this.parent instanceof Document);
	}, 
	
	isSingleChild: function() {
		return this.parent.children.length == 1;
	},
	
	accept: function(renderer) {
		renderer.visit(this);
	}
	
}