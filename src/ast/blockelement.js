koara.BlockElement = function() {}
koara.BlockElement.prototype = new koara.Node();
koara.BlockElement.prototype.constructor = koara.BlockElement;

koara.BlockElement.prototype.isNested = function() {
	return !(this.parent instanceof koara.Document);
}

koara.BlockElement.prototype.isSingleChild = function() {
	return this.parent.children.length == 1;
}

koara.BlockElement.prototype.accept = function(renderer) {
	renderer.visit(this);
}