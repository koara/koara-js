"use strict";

function CodeBlock() {
	BlockElement.call(this);
}

CodeBlock.prototype = new BlockElement();
CodeBlock.prototype.constructor = CodeBlock;

CodeBlock.prototype.accept = function(renderer) {
	renderer.visitCodeBlock(this);
};
