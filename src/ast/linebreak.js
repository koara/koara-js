koara.LineBreak = function() {}
koara.LineBreak.prototype = new koara.Node();
koara.LineBreak.prototype.constructor = koara.LineBreak;

koara.LineBreak.prototype.accept = function(renderer) {
	renderer.visitLineBreak(this);
};