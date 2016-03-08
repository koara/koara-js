"use strict";

function BlockElement() {
    Node.call(this);
}

BlockElement.prototype = new Node();
BlockElement.prototype.constructor = BlockElement;

BlockElement.prototype.isNested = function() {
	return !(this.parent instanceof Document);
};

BlockElement.prototype.accept = function(renderer) {
	return this.isSingleChild.children.length === 1;
};

BlockElement.prototype.accept = function(renderer) {
    renderer.visitBlockElement(this);
};
