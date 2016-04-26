"use strict";

var Node = require("./node");
var Document = require("./document");

function BlockElement() {
    Node.call(this);
}

BlockElement.prototype = new Node();
BlockElement.prototype.constructor = BlockElement;

BlockElement.prototype.hasChildren = function() {
    return this.children && this.children.length > 0;;
};

BlockElement.prototype.isFirstChild = function() {
	return this.parent.children[0] === this;
};

BlockElement.prototype.isLastChild = function() {
	return this.parent.children[this.parent.children.length - 1] === this;
};

BlockElement.prototype.isNested = function() {
	return !(this.parent.constructor.name === "Document");
};

BlockElement.prototype.isSingleChild = function() {
	return this.parent.children.length === 1;
};

BlockElement.prototype.accept = function(renderer) {
    renderer.visitBlockElement(this);
};

module.exports = BlockElement;
