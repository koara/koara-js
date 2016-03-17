"use strict";

function ListItem() {
	Node.call(this);
}

ListItem.prototype = new Node();
ListItem.prototype.constructor = ListItem;

ListItem.prototype.accept = function(renderer) {
	renderer.visitListItem(this);
};

module.exports = ListItem;
