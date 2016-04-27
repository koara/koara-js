"use strict";

function KoaraRenderer() {
	this.out = "";
}

KoaraRenderer.prototype = {
	constructor: KoaraRenderer,

	visitDocument: function(node) {
		this.out = "";
		this.left = [];
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
//		if(!node.isFirstChild()) {
//			indent();
//		}
//		
//		if(node.hasChildren()) {
//			out.append("> ");
//			left.push("> ");
//			node.childrenAccept(this);
//			left.pop();
//		} else {
//			out.append(">\n");
//		}
//		if(!node.isNested()) {
//			out.append("\n");
//		}
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
//		StringBuilder indent = new StringBuilder();
//		for(String s : left) {
//			indent.append(s);
//		}
//		
//		out.append("```");
//		if(node.getLanguage() != null) {
//			out.append(node.getLanguage());
//		}
//		out.append("\n");
//		
//		
//		
//		out.append(node.getValue().toString().replaceAll("(?m)^", indent.toString()));
//		out.append("\n");
//		indent();
//		out.append("```");
//		
//		out.append("\n");
//		out.append("\n");
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
//		if(!node.isFirstChild()) {
//			indent();
//		}
//		node.childrenAccept(this);
//		out.append("\n");
//		if(!node.isNested() || (node.getParent() instanceof ListItem && (node.next() instanceof Paragraph) && !node.isLastChild())) {
//			out.append("\n");
//		} else if(node.getParent() instanceof BlockQuote && (node.next() instanceof Paragraph)) {
//			indent();
//			out.append("\n");
//		}
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
//		out.append("*");
//		node.childrenAccept(this);
//		out.append("*");
	},

	visitEm: function(node) {
//		out.append("_");
//		node.childrenAccept(this);
//		out.append("_");
	},

	visitCode: function(node) {
//		out.append("`");
//		node.childrenAccept(this);
//		out.append("`");
	},

	visitText: function(node) {
//		if(node.getParent() instanceof Code) {
//			out.append(node.getValue().toString());
//		} else {
			this.out += this.escape(node.value);
//		}
	},

	visitLineBreak: function(node) {
		this.out += "\n";
		this.indent();
	},
	
	escape: function(text) {
		return text.replace(/\[/gm, "\\[")
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


