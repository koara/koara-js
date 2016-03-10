"use strict";

function Heading() {
	BlockElement.call(this);
}

Heading.prototype = new BlockElement();
Heading.prototype.constructor = Heading;

Heading.prototype.accept = function(renderer) {
    renderer.visitHeading(this);
};
