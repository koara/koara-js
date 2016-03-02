koara.Paragraph = function() {}
koara.Paragraph.prototype = new koara.BlockElement();
koara.Paragraph.prototype.constructor = koara.Paragraph;

koara.Paragraph.prototype.accept = function(renderer) {
	renderer.visitParagraph(this);
};