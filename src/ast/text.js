"use strict";

koara.Text = function() {}
koara.Text.prototype = new koara.Node();
koara.Text.prototype.constructor = koara.Text;

koara.Text.prototype.accept = function(renderer) {
	renderer.visitText(this);
};