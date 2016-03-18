"use strict";

var BlockElement = require("./blockelement");

function ListBlock(ordered) {
	BlockElement.call(this);
	this.ordered = ordered;
}

ListBlock.prototype = new BlockElement();
ListBlock.prototype.constructor = ListBlock;

ListBlock.prototype.accept = function(renderer) {
	renderer.visitListBlock(this);
};

module.exports = ListBlock;
