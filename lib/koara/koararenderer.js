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
//		node.childrenAccept(this);
//		if(!node.isLastChild()) {
//			indent();
//			out.append("\n");
//			Object next = node.next();
//			if(next instanceof ListBlock && ((ListBlock) next).isOrdered() == node.isOrdered() ) {
//				out.append("\n");
//			}
//		}
	},

	visitListItem: function(node) {
//		if(!node.getParent().isNested() || !node.isFirstChild() || !node.getParent().isFirstChild()) {
//			indent();
//		}
//		left.push("  ");
//		if(node.getNumber() != null) {			
//			out.append(node.getNumber() + ".");
//		} else {
//			out.append("-");
//		}
//		if(node.hasChildren()) {
//			out.append(" ");
//			node.childrenAccept(this);
//		} else {
//			out.append("\n");
//		}
//		left.pop();
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
		if(!node.isNested() || (node.getParent().constructor.name === "ListItem" && (node.next().constructor.name === "Paragraph") && !node.isLastChild())) {
			this.out += "\n";
		} else if(node.getParent().constructor.name === "BlockQuote" && (node.next().constructor.name === "Paragraph")) {
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
//		out.append("[image: ");
//		node.childrenAccept(this);
//		out.append("]");
//		if(node.getValue() != null && node.getValue().toString().trim().length() > 0) {
//			out.append("(");
//			out.append(escapeUrl(node.getValue().toString()));
//			out.append(")");
//		}
	},

	visitLink: function(node) {
//		out.append("[");
//		node.childrenAccept(this);
//		out.append("]");
//		if(node.getValue() != null && node.getValue().toString().trim().length() > 0) {
//			out.append("(");
//			out.append(escapeUrl(node.getValue().toString()));
//			out.append(")");
//		}
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
//		indent();
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
		
		

//		.replaceFirst("(\\d+)\\.", "\\\\$1.");
	},
	
	indent: function() {
		
	},

	getOutput: function() {
        return this.out.trim();
	}

};

module.exports = KoaraRenderer;


