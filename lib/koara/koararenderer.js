"use strict";

function KoaraRenderer() {
	this.out = "";
}

KoaraRenderer.prototype = {
	constructor: KoaraRenderer,

	visitDocument: function(node) {
		this.out = "";
		this.left = [];
		this.hardWrap = false;
		node.childrenAccept(this);
	},

	visitHeading: function(node) {
		if(!node.isFirstChild()) {
			this.indent();
		}
		for(var i=0; i<node.value; i++) {
			this.out += "=";
		}
		if(node.hasChildren()) {
		  this.out += " ";
		  node.childrenAccept(this);
		}
		this.out += "\n";
		if(!node.isLastChild()) {
			this.indent();
			this.out += "\n";
		}
	},

	visitBlockQuote: function(node) {
		if(!node.isFirstChild()) {
			this.indent();
		}		
		if(node.hasChildren()) {
			this.out += "> ";
			this.left.push("> ");
			node.childrenAccept(this);
			this.left.pop();
		} else {
			this.out += ">\n";
		}
		if(!node.isNested()) {
			this.out += "\n";
		}
	},

	visitListBlock: function(node) {
		node.childrenAccept(this);
		if(!node.isLastChild()) {
			this.indent();
			this.out += "\n";
			var next = node.next();
			if(next.constructor.name === "ListBlock" && next.ordered === node.ordered) {
				this.out += "\n";
			}
		}
	},

	visitListItem: function(node) {
		if(!node.parent.isNested() || !node.isFirstChild() || !node.parent.isFirstChild()) {
			this.indent();
		}
		this.left.push("  ");
		if(node.number) {			
			this.out += (node.number + ".");
		} else {
			this.out += "-";
		}
		if(node.hasChildren()) {
			this.out += " ";
			node.childrenAccept(this);
		} else {
			this.out += "\n";
		}
		this.left.pop();
	},

	visitCodeBlock: function(node) {
		var str = this.left.join("");
		this.out += "```";
		if(node.language) {
			this.out += node.language;
		}
		this.out += "\n";
		this.out += node.value.toString().replace(/^/gm, str);
		this.out += "\n";
		this.indent();
		this.out += "```";		
		this.out += "\n";
		if(!node.isLastChild()) {
			this.indent();
			this.out += "\n";
		}
	},

	visitParagraph: function(node) {
		if(!node.isFirstChild()) {
			this.indent();
		}
		node.childrenAccept(this);
		this.out += "\n";
		
		var next = node.next();
		if(!node.isNested() || (node.parent.constructor.name === "ListItem" && (next && next.constructor.name === "Paragraph") && !node.isLastChild())) {
			this.out += "\n";
		} else if(node.parent.constructor.name === "BlockQuote" && (next && next.constructor.name === "Paragraph")) {
			this.indent();
			this.out += "\n";
		}
	},
	
	visitBlockElement: function(node) {
		if(!node.isFirstChild()) {
			this.indent();
		}
		node.childrenAccept(this);
		this.out += "\n";
		var next = node.next();
		if(!node.isNested() || (node.parent.constructor.name === "ListItem" && (next && next.constructor.name === "Paragraph") && !node.isLastChild())) {
			this.out += "\n";
		} else if(node.parent.constructor.name === "BlockQuote" && (next && next.constructor.name === "Paragraph")) {
			this.indent();
			this.out += "\n";
		}
	},

	visitImage: function(node) {
		this.out += "[image: ";
		node.childrenAccept(this);
		this.out += "]";
		if(node.value && node.value.trim().length > 0) {
			this.out += "(";
			this.out += this.escapeUrl(node.value);
			this.out += ")";
		}
	},

	visitLink: function(node) {
		this.out += "[";
		node.childrenAccept(this);
		this.out += "]";
		if(node.value && node.value.toString().trim().length > 0) {
			this.out += "(";
			this.out += this.escapeUrl(node.value);
			this.out += ")";
		}
	},

	visitStrong: function(node) {
		this.out += "*";
		node.childrenAccept(this);
		this.out += "*";
	},

	visitEm: function(node) {
		this.out += "_";
		node.childrenAccept(this);
		this.out += "_";
	},

	visitCode: function(node) {
		this.out += "`";
		node.childrenAccept(this);
		this.out += "`";
	},

	visitText: function(node) {
		if(node.parent.constructor.name === "Code") {
			this.out += node.value;
		} else {
			this.out += this.escape(node.value);
		}
	},

	visitLineBreak: function(node) {
		if(this.hardWrap || node.explicit) {
			this.out += "  ";
		}
		this.out += "\n";
		this.indent();
	},
	
	escape: function(text) {
		return text
				.replace(/\[/gm, "\\[")
				.replace(/\]/gm, "\\]")
				.replace(/\*/gm, "\\*")
				.replace(/\_/gm, "\\_")
				.replace("`", "\\`")
				.replace("=", "\\=")
				.replace(">", "\\>")
				.replace("-", "\\-")
				.replace(/(\d+)\./, "\\$1.");
	},
	
	escapeUrl: function(text) {
        return text.replace(/\(/gm, "\\(")
        	.replace(/\)/gm, "\\)");
	},
	
	indent: function() {
		this.out += this.left.join("");
	},

	getOutput: function() {
        return this.out.trim();
	}

};

module.exports = KoaraRenderer;


