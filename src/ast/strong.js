"use strict";

function Strong() {
	Node.call(this);
}

Strong.prototype = new Node();
Strong.prototype.constructor = Strong;

Strong.prototype.accept = function(renderer) {
	renderer.visitStrong(this);
};
