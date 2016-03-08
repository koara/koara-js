"use strict";

function Text() {
    Node.call(this);
}

Text.prototype = new Node();
Text.prototype.constructor = Text;

Text.prototype.accept = function(renderer) {
	renderer.visitText(this);
};
