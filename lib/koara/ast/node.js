"use strict";

function Node() {
	this.children = [];
}

Node.prototype = {
	constructor: Node,

	add: function(n, i) {
		this.children[i] = n;
	},

	childrenAccept: function(renderer) {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].accept(renderer);
		}
	}

};

module.exports = Node;
