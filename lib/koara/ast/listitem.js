"use strict";

var BlockElement = require("./blockelement");

function ListItem() {
	BlockElement.call(this);
}

ListItem.prototype = new BlockElement();
ListItem.prototype.constructor = ListItem;

ListItem.prototype.accept = function(renderer) {
	renderer.visitListItem(this);
};

module.exports = ListItem;
