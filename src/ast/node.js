"use strict";

koara.Node = function() {
	this.children = [];
};

koara.Node.prototype = {
	constructor: koara.Node,

	add: function(n, i) {
		this.children[i] = n;
	},

	childrenAccept: function(renderer) {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].accept(renderer);
		}
	}

};
