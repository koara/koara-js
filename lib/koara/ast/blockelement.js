"use strict";

var Node = require("./node");
var Document = require("./document");

function BlockElement() {
    Node.call(this);
}

BlockElement.prototype = new Node();
BlockElement.prototype.constructor = BlockElement;

BlockElement.prototype.isNested = function() {
	return !(this.parent instanceof Document);
};

BlockElement.prototype.isSingleChild = function() {
	return this.parent.children.length === 1;
};

BlockElement.prototype.accept = function(renderer) {
    renderer.visitBlockElement(this);
};

module.exports = BlockElement;
