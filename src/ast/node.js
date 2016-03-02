koara.Node.prototype.constructor = function() {
	this.children = [];
	this.value = '';
}

koara.Node.prototype.add = function(renderer) {
	this.children.push(n);
}

koara.Node.prototype.childrenAccept = function(renderer) {
	for(var i=0; i < this.children.length; i++) {
		this.children[i].accept(renderer);
	}
}