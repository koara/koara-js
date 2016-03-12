"use strict";

function Image() {
	Node.call(this);
}

Image.prototype = new Node();
Image.prototype.constructor = Image;

Image.prototype.accept = function(renderer) {
	renderer.visitImage(this);
};
