"use strict";

function Paragraph() {
	BlockElement.call(this);
}

Paragraph.prototype = new BlockElement();
Paragraph.prototype.constructor = Paragraph;

Paragraph.prototype.accept = function(renderer) {
    renderer.visitParagraph(this);
};
