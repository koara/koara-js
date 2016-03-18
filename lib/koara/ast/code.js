"use strict";

var Node = require("./node");

function Code() {
	Node.call(this);
}

Code.prototype = new Node();
Code.prototype.constructor = Code;

Code.prototype.accept = function(renderer) {
	renderer.visitCode(this);
};

module.exports = Code;
