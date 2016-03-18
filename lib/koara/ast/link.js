"use strict";

var Node = require("./node");

function Link() {
	Node.call(this);
}

Link.prototype = new Node();
Link.prototype.constructor = Link;

Link.prototype.accept = function(renderer) {
	renderer.visitLink(this);
};

module.exports = Link;
