koara.TreeState = function() {
	this.nodes = [];
	this.marks = [];
	this.nodesOnStack = 0;
	this.currentMark = 0;
}

koara.TreeState.prototype = {
	constructor: koara.TreeState,
	
	openScope: function() {
		this.marks.push(this.currentMark);
		this.currentMark = this.nodesOnStack;
	},
	
	closeScope: function(n) {
		a = this.nodeArity();
		this.currentMark = marks.pop(); // currentMark = marks.remove(marks.size() - 1);
		while (a-- > 0) {
          c = this.popNode();
          c.setParent(n);
          n.add(c, a);
        }
		this.pushNode(n);
	},
	
	addSingleValue: function(n, t) {
		this.openScope();
        n.setValue(t.image);
        this.closeScope(n);
	},
	
	nodeArity: function() {
		return this.nodesOnStack - this.currentMark;
	}, 
	
    popNode: function() {
    	--nodesOnStack;
    	return nodes.pop();
    },
    
    pushNode: function(n) {
    	this.nodes.add(n);
    	 ++this.nodesOnStack;
    }
		
}

