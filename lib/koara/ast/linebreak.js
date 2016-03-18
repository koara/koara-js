"use strict";

var Node = require("./node");

function LineBreak() {}
LineBreak.prototype = new Node();
LineBreak.prototype.constructor = LineBreak;

LineBreak.prototype.accept = function(renderer) {
	renderer.visitLineBreak(this);
};

module.exports = LineBreak;
