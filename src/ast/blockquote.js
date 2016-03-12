"use strict";

function BlockQuote() {
	BlockElement.call(this);
}

BlockQuote.prototype = new BlockElement();
BlockQuote.prototype.constructor = BlockQuote;

BlockQuote.prototype.accept = function(renderer) {
    renderer.visitBlockQuote(this);
};
