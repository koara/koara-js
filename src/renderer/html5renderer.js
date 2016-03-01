koara.Html5Renderer = function() {
	this.level = 0;
}

koara.Html5Renderer.prototype = {
	constructor: koara.Html5Renderer,
	
	visitDocument: function(node) {
		this.output = '';
		node.childrenAccept(this);
	},

//	public void visit(Heading node) {
//		out.append(indent() + "<h" + node.getValue() + ">");
//		node.childrenAccept(this);
//		out.append("</h" + node.getValue() + ">\n");
//		if(!node.isNested()) { out.append("\n"); }
//	}
//	
//	public void visit(BlockQuote node) {
//		out.append(indent() + "<blockquote>");
//		if(node.getChildren() != null && node.getChildren().length > 0) { out.append("\n"); }
//		level++;
//		node.childrenAccept(this);
//		level--;
//		out.append(indent() + "</blockquote>\n");
//		if(!node.isNested()) { out.append("\n"); }
//	}
//	
//	public void visit(ListBlock node) {
//		listSequence.push(0);
//		String tag = node.isOrdered() ? "ol" : "ul";
//		out.append(indent() + "<" + tag + ">\n");
//		level++;
//		node.childrenAccept(this);
//		level--;
//		out.append(indent() + "</" + tag + ">\n");
//		if(!node.isNested()) { out.append("\n"); }
//		listSequence.pop();
//	}
//	
//	public void visit(ListItem node) {
//		Integer seq = listSequence.peek() + 1;		
//		listSequence.set(listSequence.size() - 1, seq);
//		out.append(indent() + "<li");
//		if(node.getNumber() != null && (seq != node.getNumber())) {
//			out.append(" value=\"" + node.getNumber() + "\"");
//			listSequence.push(node.getNumber());
//		}
//		out.append(">");
//		if(node.getChildren() != null) {
//			boolean block = (node.getChildren()[0].getClass() == Paragraph.class || node.getChildren()[0].getClass() == BlockElement.class);
//			
//			if(node.getChildren().length > 1 || !block) { out.append("\n"); }
//			level++;
//			node.childrenAccept(this);
//			level--;
//			if(node.getChildren().length > 1 || !block) { out.append(indent()); }
//		}
//		out.append("</li>\n");
//	}
//	
//	public void visit(CodeBlock node) {
//		out.append(indent() + "<pre><code");
//		if(node.getLanguage() != null) {
//			out.append(" class=\"language-" + escape(node.getLanguage()) + "\"");
//		}
//		out.append(">");
//		out.append(escape(node.getValue().toString()) + "</code></pre>\n");
//		if(!node.isNested()) { out.append("\n"); }
//	}
//
	visitParagraph: function(node) {
		if(node.isNested() && (node.getParent() instanceof ListItem) && node.isSingleChild()) {
			node.childrenAccept(this);
		} else {
			this.output += this.indent() + "<p>";
			node.childrenAccept(this);
			this.output += "</p>\n";
			if(!node.isNested()) { this.output += "\n"; }
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
//	public void visit(Image node) {
//		out.append("<img src=\"" + escapeUrl(node.getValue().toString()) + "\" alt=\"");
//		node.childrenAccept(this);
//		out.append("\" />");
//	}
//	
//	public void visit(Link node) {
//		out.append("<a href=\"" + escapeUrl(node.getValue().toString()) + "\">");
//		node.childrenAccept(this);
//		out.append("</a>");
//	}
//	
//	public void visit(Strong node) {
//		out.append("<strong>");
//		node.childrenAccept(this);
//		out.append("</strong>");
//	}
//	
//	public void visit(Em node) {
//		out.append("<em>");
//		node.childrenAccept(this);
//		out.append("</em>");
//	}
//	
//	public void visit(Code node) {
//		out.append("<code>");
//		node.childrenAccept(this);
//		out.append("</code>");
//	}
//		
	visitText: function(node) {
		
		console.log('//' + JSON.stringify(node));
		
		this.output += node.value;
	},
	
//	public String escape(String text) {
//		return text.replaceAll("&", "&amp;")
//				.replaceAll("<", "&lt;")
//				.replaceAll(">", "&gt;")
//				.replaceAll("\"", "&quot;");
//	}
//	
//	public void visit(LineBreak node) {
//		out.append("<br>\n" + indent());
//		node.childrenAccept(this);
//	}
//	
//	public String escapeUrl(String text) {
//		return text.replaceAll(" ", "%20")
//				.replaceAll("\"", "%22")
//				.replaceAll("`", "%60")
//				.replaceAll("<", "%3C")
//				.replaceAll(">", "%3E")
//				.replaceAll("\\[", "%5B")
//				.replaceAll("\\]", "%5D")
//				.replaceAll("\\\\", "%5C");
//	}
//	
	indent: function() {
		var repeat = this.level * 2;
	    var buf = [];
		for (var i = repeat - 1; i >= 0; i--) {
		 buf.push(' ');
		} 
		return new String(buf);
	}
	
}