"use strict";

var Node = require('./node');

function Em() {
	Node.call(this);
}

Em.prototype = new Node();
Em.prototype.constructor = Em;

Em.prototype.accept = function(renderer) {
	renderer.visitEm(this);
};

module.exports = Em;
