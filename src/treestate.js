"use strict";

function TreeState() {
	this.nodes = [];
	this.marks = [];
	this.nodesOnStack = 0;
	this.currentMark = 0;
}

TreeState.prototype = {
	constructor: TreeState,

	openScope: function() {
		this.marks.push(this.currentMark);
		this.currentMark = this.nodesOnStack;
	},

	closeScope: function(n) {
        var a = this.nodeArity();

		this.currentMark = this.marks.pop();
		while (a-- > 0) {
          c = this.popNode();
          c.parent = n;
          n.add(c, a);
        }
		this.pushNode(n);
	},

	addSingleValue: function(n, t) {
		this.openScope();
        n.value = t.image;
        this.closeScope(n);
	},

	nodeArity: function() {
		return this.nodesOnStack - this.currentMark;
	},

    popNode: function() {
        --this.nodesOnStack;
        return this.nodes.pop();
    },

    pushNode: function(n) {
        this.nodes.push(n);
        ++this.nodesOnStack;
    }

};

