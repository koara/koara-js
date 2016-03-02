koara.Node = function() {
  this.children = [];
}
   
koara.Node.prototype.add = function(n) {
	this.children.push(n);
};
   
koara.Node.prototype.childrenAccept = function(renderer) {
	for(var i=0; i < this.children.length; i++) {
		this.children[i].accept(renderer);
	}
};