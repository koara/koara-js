"use strict";

function Html5Renderer() {
	this.out = "";
}

Html5Renderer.prototype = {
	constructor: Html5Renderer,

	visitDocument: function(node) {
		this.out = "";
		this.level = 0;
		this.listSequence = [];
		node.childrenAccept(this);
	},

	visitHeading: function(node) {
		this.out += this.indent() + "<h" + 	node.value + ">";
		node.childrenAccept(this);
		this.out += "</h" + node.value + ">\n";
		if (!node.isNested()) {
            this.out += "\n";
        }
	},

	visitBlockQuote: function(node) {
		this.out += this.indent() + "<blockquote>";
		if (node.children && node.children.length > 0) {
            this.out += "\n";
		}
        this.level++;
        node.childrenAccept(this);
        this.level--;
        this.out += this.indent() + "</blockquote>\n";
        if (!node.isNested()) {
           this.out += "\n";
        }
	},

	visitListBlock: function(node) {
		this.listSequence.push(0);
		var tag = node.ordered ? "ol" : "ul";

		this.out += this.indent() + "<" + tag + ">\n";
		this.level++;
		node.childrenAccept(this);
		this.level--;
		this.out += this.indent() + "</" + tag + ">\n";
		if (!node.isNested()) {
            this.out += "\n";
		}
		this.listSequence.pop();
	},

	visitListItem: function(node) {
		var seq = Number(this.listSequence[this.listSequence.length - 1]) + 1;

		this.listSequence[this.listSequence.length - 1] = seq;

        this.out += this.indent() + "<li";
		if (node.number && (seq !== node.number)) {
			this.out += " value=\"" + node.number + "\"";
			this.listSequence.push(node.number);
		}
		this.out += ">";
		if (node.children && node.children.length > 0) {
			var block = (node.children[0].constructor.name === "Paragraph" || node.children[0].constructor.name === "BlockElement");

			if (node.children.length > 1 || !block) {
                this.out += "\n";
            }
			this.level++;
			node.childrenAccept(this);
			this.level--;
			if (node.children.length > 1 || !block) {
				this.out += this.indent();
			}
		}
		this.out += "</li>\n";
	},

	visitCodeBlock: function(node) {
		this.out += this.indent() + "<pre><code";
		if (node.language) {
			this.out += " class=\"language-" + this.escape(node.language) + "\"";
		}
		this.out += ">";
		this.out += this.escape(node.value) + "</code></pre>\n";
		if (!node.isNested()) {
            this.out += "\n";
        }
	},

	visitParagraph: function(node) {
		if (node.isNested() && (node.parent instanceof ListItem) && node.isSingleChild()) {
			node.childrenAccept(this);
		} else {
			this.out += this.indent() + "<p>";
			node.childrenAccept(this);
			this.out += "</p>\n";
			if (!node.isNested()) {
				this.out += "\n";
			}
		}
	},
//
//	@Override
//	public void visit(BlockElement node) {
//		if(node.isNested() && (node.getParent() instanceof ListItem) && node.isSingleChild()) {
//			node.childrenAccept(this);
//		} else {
//			out.append(indent());
//			node.childrenAccept(this);
//			if(!node.isNested()) { out.append("\n"); }
//		}
//	}
//
	visitImage: function(node) {
		this.out += "<img src=\"" + this.escapeUrl(node.value) + "\" alt=\"";
		node.childrenAccept(this);
		this.out += "\" />";
	},

	visitLink: function(node) {
		this.out += "<a href=\"" + this.escapeUrl(node.value.toString()) + "\">";
		node.childrenAccept(this);
		this.out += "</a>";
	},

	visitStrong: function(node) {
		this.out += "<strong>";
		node.childrenAccept(this);
		this.out += "</strong>";
	},

	visitEm: function(node) {
		this.out += "<em>";
		node.childrenAccept(this);
		this.out += "</em>";
	},

	visitCode: function(node) {
		this.out += "<code>";
		node.childrenAccept(this);
		this.out += "</code>";
	},

	visitText: function(node) {
		this.out += this.escape(node.value);
	},

	visitLineBreak: function(node) {
		this.out += "<br>\n" + this.indent();
		node.childrenAccept(this);
	},

	escapeUrl: function(text) {
        return text.replace(/ /gm, "%20").
            replace(/\"/gm, "%22").
            replace(/`/gm, "%60").
            replace(/</gm, "%3C").
            replace(/>/gm, "%3E").
            replace(/\[/gm, "%5B").
            replace(/\]/gm, "%5D").
            replace(/\\/gm, "%5C");
	},

	indent: function() {
		var repeat = this.level * 2;
        var ind = "";

		for (var i = repeat - 1; i >= 0; i--) {
			ind += " ";
		}
		return ind;
	},

	escape: function(text) {
		return text.replace(/&/gm, "&amp;").
            replace(/</gm, "&lt;").
            replace(/>/gm, "&gt;").
            replace(/\"/gm, "&quot;");
	},

	getOutput: function() {
        return this.out.trim();
	}

};
