koara.Node = function() {
	this.children = [];
	this.value = '';
}

koara.Node.prototype = {
	constructor: koara.Node, 
	
	add: function(n, i) {
		this.children.push(n);
	}, 
	
	childrenAccept: function(renderer) {
		for(var i=0; i < this.children.length; i++) {
			this.children[i].accept(renderer);
		}
	}
	
}