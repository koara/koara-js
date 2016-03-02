var koara = {}

if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = koara;
  }
  exports.koara = koara;
} 
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
koara.Document = function() {}
koara.Document.prototype = new koara.Node();
koara.Document.prototype.constructor = koara.Document;

koara.Document.prototype.accept = function(renderer) {
	renderer.visitDocument(this)
};
koara.BlockElement = function() {}
koara.BlockElement.prototype = new koara.Node();
koara.BlockElement.prototype.constructor = koara.BlockElement;

koara.BlockElement.prototype.isNested = function() {
	return !(this.parent instanceof koara.Document);
};

koara.BlockElement.prototype.isSingleChild = function() {
	return this.parent.children.length == 1;
};

koara.BlockElement.prototype.accept = function(renderer) {
	renderer.visit(this);
};
koara.BlockQuote = function() {}
koara.BlockQuote.prototype = new koara.BlockElement();

koara.BlockQuote.prototype = {
	constructor: koara.BlockQuote,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.Code = function() {}
koara.Code.prototype = new koara.Node();

koara.Code.prototype = {
	constructor: koara.Code,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}

koara.CodeBlock = function() {}
koara.CodeBlock.prototype = new koara.BlockElement();

koara.CodeBlock.prototype = {
	constructor: koara.CodeBlock,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}

koara.Em = function() {}
koara.Em.prototype = new koara.Node();

koara.Em.prototype = {
	constructor: koara.Em,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.Heading = function() {}
koara.Heading.prototype = new koara.BlockElement();

koara.Heading.prototype = {
	constructor: koara.Heading,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.Image = function() {}
koara.Image.prototype = new koara.Node();

koara.Image.prototype = {
	constructor: koara.Image,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.LineBreak = function() {}
koara.LineBreak.prototype = new koara.Node();

koara.LineBreak.prototype = {
	constructor: koara.LineBreak,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.Link = function() {}
koara.Link.prototype = new koara.Node();

koara.Link.prototype = {
	constructor: koara.Link,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.ListBlock = function() {}
koara.ListBlock.prototype = new koara.BlockElement();

koara.ListBlock.prototype = {
	constructor: koara.ListBlock,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.ListItem = function() {}
koara.ListItem.prototype = new koara.Node();

koara.ListItem.prototype = {
	constructor: koara.ListItem,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.Paragraph = function() {}
koara.Paragraph.prototype = new koara.BlockElement();
koara.Paragraph.prototype.constructor = koara.Paragraph;

koara.Paragraph.prototype.accept = function(renderer) {
	renderer.visitParagraph(this);
};
koara.Strong = function() {}
koara.Strong.prototype = new koara.Node();

koara.Strong.prototype = {
	constructor: koara.Strong,
	
	accept: function(renderer) {
		renderer.visit(this)
	}
}
koara.Text = function() {}
koara.Text.prototype = new koara.Node();
koara.Text.prototype.constructor = koara.Text;

koara.Text.prototype.accept = function(renderer) {
	renderer.visitText(this);
};
'use strict';

koara.StringReader = function(text) {
	this.index = 0;
	this.text = text;
}

koara.StringReader.prototype = {
	constructor: koara.StringReader,
	
	read: function(buffer, offset, length) {
		if(this.text.toString().substring(this.index).length > 0) {
			var charactersRead = 0;
			for(var i=0; i < length; i++) {
				var start = this.index + i;
				var c = this.text.toString().substring(start, start + 1);
				if(c !== '') {
					buffer[offset + i] = c;
					charactersRead++;
				}
			}
			this.index += length;
			return charactersRead;
		}
		return -1;
	}
}
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
koara.CharStream = function(reader) {
	this.available = 4096;
	this.bufsize = 4096;
	this.tokenBegin = 0;
	this.bufcolumn = [];
	this.bufpos = -1;
	this.bufline = [];
	this.column = 0;
	this.line = 1;
	this.prevCharIsLF;
	this.reader = reader;
	this.buffer = [];
	this.maxNextCharInd = 0;
	this.inBuf = 0;
	this.tabSize = 4;
}

koara.CharStream.prototype = {
	constructor: koara.CharStream,
	
	beginToken: function() {
		this.tokenBegin = -1;
		var c = this.readChar();
		this.tokenBegin = this.bufpos;
		return c;
	},

	readChar: function() {
		if (this.inBuf > 0) {
			--this.inBuf;
			if (++this.bufpos == this.bufsize) {
				this.bufpos = 0;
			}
			return this.buffer[this.bufpos];
		}
		if (++this.bufpos >= this.maxNextCharInd) {
			this.fillBuff();
		}

		var c = this.buffer[this.bufpos];
		this.updateLineColumn(c);
		return c;
	},
	
	fillBuff: function() {
		if (this.maxNextCharInd == this.available) {
			if (this.available == this.bufsize) {
				this.bufpos = 0;
				this.maxNextCharInd = 0;
				if (this.tokenBegin > 2048) {
					this.available = this.tokenBegin;
				}
			} else {
				this.available = this.bufsize;
			}
		}
		var i=0;
		try {
			if ((i = this.reader.read(this.buffer, this.maxNextCharInd, this.available - this.maxNextCharInd)) == -1) {
				throw new Error("IOException");
			} else {
				this.maxNextCharInd += i;
			}
		} catch (e) {
			--this.bufpos;
			this.backup(0);
			if (this.tokenBegin == -1) {
				this.tokenBegin = this.bufpos;
			}
			throw e;
		}
	},
	
	backup: function(amount) {
		this.inBuf += amount;
		if ((this.bufpos -= amount) < 0) {
			this.bufpos += this.bufsize;
		}
	},
	
	updateLineColumn: function(c) {
		this.column++;
		if (this.prevCharIsLF) {
			this.prevCharIsLF = false;
			this.column = 1;
			this.line += this.column;
		}

		switch (c) {
		case '\n':
			this.prevCharIsLF = true;
			break;
		case '\t':
			this.column--;
			this.column += this.tabSize - this.column % this.tabSize;
			break;
		}
		this.bufline[this.bufpos] = this.line;
		this.bufcolumn[this.bufpos] = this.column;
	},
	
	getImage: function() {
			if (this.bufpos >= this.tokenBegin) {
				return this.buffer.slice(this.tokenBegin, this.bufpos - this.tokenBegin + 1).join('')
			} else {
				return this.buffer.slice(this.tokenBegin, (this.bufsize - this.tokenBegin)).join('')
						+ this.buffer.slice(0, (this.bufpos + 1)).join('');
			}
	}, 
	
	getBeginColumn: function() {
		return this.bufpos in this.bufcolumn ? this.bufcolumn[this.bufpos] : 0;
	},
	
	getBeginLine: function() {
		return this.bufpos in this.bufline ? this.bufline[this.bufpos] : 0;
	},
	
	getEndColumn: function() {
		return this.tokenBegin in this.bufcolumn ? this.bufcolumn[this.tokenBegin] : 0;
	},
	
	getEndLine: function() {
		return this.tokenBegin in this.bufline ? this.bufline[this.tokenBegin] : 0;
	}
}		
		



koara.LookaheadSuccess = function() {}

koara.LookaheadSuccess.prototype = {
	constructor: koara.LookaheadSuccess
		
}
koara.Parser = function() {
	this.lookAheadSuccess = new koara.LookaheadSuccess();
	this.modules = ['paragraphs', 'headings', 'lists', 'links', 'images', 'formatting', 'blockquotes', 'code'];
}

koara.Parser.prototype = {
	constructor: koara.Parser,
	
	parse: function(text) {
		return this.parseReader(new koara.StringReader(text))
	},
	
	parseReader: function(reader) {
		this.cs = new koara.CharStream(reader);
		this.tm = new koara.TokenManager(this.cs);
		this.token = new koara.Token();
		this.tree = new koara.TreeState();
		this.nextTokenKind = -1;

		var document = new koara.Document();
		this.tree.openScope();
		
		while(this.getNextTokenKind() == this.tm.EOL) {
			this.consumeToken(this.tm.EOL);
		}
		this.whiteSpace();
		if (this.hasAnyBlockElementsAhead()) {
			this.blockElement();
			while (this.blockAhead(0)) {
				while (this.getNextTokenKind() == this.tm.EOL) {
                    this.consumeToken(this.tm.EOL);
                    this.whiteSpace();
				}
                this.blockElement();
              }
              while (this.getNextTokenKind() == this.tm.EOL) {
                this.consumeToken(this.tm.EOL);
            }
            this.whiteSpace();
        }
        this.consumeToken(this.tm.EOF);
        this.tree.closeScope(document);
        return document;
	},
	
	blockElement: function() {
        this.currentBlockLevel++;
        if (this.modules.indexOf("headings") >= 0 && this.headingAhead(1)) {
          this.heading();
        } else if (this.modules.indexOf("blockquotes") >= 0 && this.getNextTokenKind() == this.tm.GT) {
          this.blockQuote();
        } else if (this.modules.indexOf("lists") >= 0 && this.getNextTokenKind() == this.tm.DASH) {
          this.unorderedList();
        } else if (this.modules.indexOf("lists") >= 0 && this.hasOrderedListAhead()) {
          this.orderedList();
        } else if (this.modules.indexOf("code") >= 0 && this.hasFencedCodeBlockAhead()) {
          this.fencedCodeBlock();
        } else {
          this.paragraph();
        }
        this.currentBlockLevel--;
	},

    heading: function() {
        var heading = new koara.Heading();
        this.tree.openScope();
        var headingLevel = 0;

        while (this.getNextTokenKind() == this.tm.EQ) {
            this.consumeToken(this.tm.EQ);
            headingLevel++;
        }
        this.whiteSpace();
        while (this.headingHasInlineElementsAhead()) {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("formatting") >= 0 && this.hasStrongAhead()) {
                this.strong();
            } else if (this.modules.indexOf("formatting") >= 0 && this.hasEmAhead()) {
                this.em();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
                this.code();
            } else {
                this.looseChar();
            }
          }
          heading.value = headingLevel;
          this.tree.closeScope(heading);
    },

    blockQuote: function() {
        var blockQuote = new koara.BlockQuote();
        this.tree.openScope();
        this.currentQuoteLevel++;
        this.consumeToken(this.tm.GT);
        while (this.blockQuoteHasEmptyLineAhead()) {
            this.blockQuoteEmptyLine();
        }
        this.whiteSpace();
        if (this.blockQuoteHasAnyBlockElementseAhead()) {
            this.blockElement();
            while (this.blockAhead(0)) {
                while (this.getNextTokenKind() == this.tm.EOL) {
                    this.consumeToken(EOL);
                    this.whiteSpace();
                    this.blockQuotePrefix();
                }
                this.blockElement();
            }
        }
        while (this.hasBlockQuoteEmptyLinesAhead()) {
            this.blockQuoteEmptyLine();
        }
        this.currentQuoteLevel--;
        tree.closeScope(blockQuote);
      },

      blockQuotePrefix: function() {
        var i = 0;
        do {
            consumeToken(this.tm.GT);
            this.whiteSpace();
        } while (++i < this.currentQuoteLevel);
      },

      blockQuoteEmptyLine: function() {
          this.consumeToken(this.tm.EOL);
          this.whiteSpace();
          do {
        	  this.consumeToken(this.tm.GT);
        	  this.whiteSpace();
          } while (this.getNextTokenKind() == this.tm.GT);
      },

      unorderedList: function() {
    	  var list = new koara.ListBlock(false);
    	  this.tree.openScope();
    	  listBeginColumn = this.unorderedListItem();
    	  while (this.listItemAhead(this.listBeginColumn, false)) {
    		  while (this.getNextTokenKind() == this.tm.EOL) {
    			  this.consumeToken(this.tm.EOL);
    		  }
    		  this.whiteSpace();
    		  if (this.currentQuoteLevel > 0) {
    			  this.blockQuotePrefix();
    		  }
    		  this.unorderedListItem();
    	  }
    	  this.tree.closeScope(list);
      },

      unorderedListItem: function() {
          var listItem = new ListItem();
          this.tree.openScope();

          var t = consumeToken(this.tm.DASH);
          this.whiteSpace();
          if (this.listItemHasInlineElements()) {
        	  this.blockElement();
              while (this.blockAhead(t.beginColumn)) {
                 while (this.getNextTokenKind() == this.tm.EOL) {
                	  this.consumeToken(this.tm.EOL);
                	  this.whiteSpace();
                	  if (this.currentQuoteLevel > 0) {
                		  this.blockQuotePrefix();
                	  }
                 }
                 blockElement();
              }
          }
          this.tree.closeScope(listItem);
          return t.beginColumn;
      },

      orderedList: function() {
        var list = new koara.ListBlock(true);
        this.tree.openScope();
        var listBeginColumn = this.orderedListItem();
        while (this.listItemAhead(listBeginColumn, true)) {
            while (this.getNextTokenKind() == this.tm.EOL) {
                this.consumeToken(this.tm.EOL);
            }
            this.whiteSpace();
            if (this.currentQuoteLevel > 0) {
                this.blockQuotePrefix();
            }
            this.orderedListItem();
        }
        this.tree.closeScope(list);
    },

    orderedListItem: function() {
        var listItem = new koara.ListItem();
        this.tree.openScope();
        var t = this.consumeToken(this.tm.DIGITS);
        this.consumeToken(this.tm.DOT);
        this.whiteSpace();
        if (this.listItemHasInlineElements()) {
            this.blockElement();
            while (this.blockAhead(t.beginColumn)) {
                while (this.getNextTokenKind() == this.tm.EOL) {
                    this.consumeToken(this.tm.EOL);
                    this.whiteSpace();
                    if (this.currentQuoteLevel > 0) {
                        this.blockQuotePrefix();
                    }
                }
                this.blockElement();
            }
        }
        listItem.number = t.image;
        tree.closeScope(listItem);
        return t.beginColumn;
    },

    fencedCodeBlock: function() {
        var codeBlock = new CodeBlock();
        this.tree.openScope();
        var s = '';
        var beginColumn = this.consumeToken(this.tm.BACKTICK).beginColumn;
        do {
            this.consumeToken(BACKTICK);
        } while (this.getNextTokenKind() == this.tm.BACKTICK);
        	this.whiteSpace();
        	if (this.getNextTokenKind() == this.tm.CHAR_SEQUENCE) {
        		this.codeBlock.language = this.codeLanguage();
        	}
        	if (this.getNextTokenKind() != this.tm.EOF && !this.fencesAhead()) {
        	  this.consumeToken(this.tm.EOL);
        	  this.levelWhiteSpace(this.beginColumn);
        	}
        
        	while (this.getNextTokenKind() != this.tm.EOF && (this.getNextTokenKind() != this.tm.EOL || !this.fencesAhead())) {
        		switch (this.getNextTokenKind()) {
        			case this.tm.CHAR_SEQUENCE:
	        			s += this.consumeToken(this.tm.CHAR_SEQUENCE).image;
	        			break;
        			case this.tm.ASTERISK:
		                s += this.consumeToken(this.tm.ASTERISK).image;
		                break;
        			case this.tm.BACKSLASH:
        				s += this.consumeToken(this.tm.BACKSLASH).image;
        				break;
		            case this.tm.COLON:
		                s += this.consumeToken(this.tm.COLON).image;
		                break;
		            case this.tm.DASH:
		                s += this.consumeToken(this.tm.DASH).image;
		                break;
		            case this.tm.DIGITS:
		                s += this.consumeToken(this.tm.DIGITS).image;
		                break;
		            case this.tm.DOT:
		                s += this.consumeToken(this.tm.DOT).image;
		                break;
		            case this.tm.EQ:
		                s += this.consumeToken(this.tm.EQ).image;
		                break;
		            case this.tm.ESCAPED_CHAR:
		                s += this.consumeToken(this.tm.ESCAPED_CHAR).image;
		                break;
		            case this.tm.IMAGE_LABEL:
		                s += this.consumeToken(this.tm.IMAGE_LABEL).image;
		                break;
		            case this.tm.LT:
		                s += this.consumeToken(this.tm.LT).image;
		                break;
		            case this.tm.GT:
		                s += this.consumeToken(this.tm.GT).image;
		                break;
		            case this.tm.LBRACK:
		                s += this.consumeToken(this.tm.LBRACK).image;
		                break;
		            case this.tm.RBRACK:
		                s += this.consumeToken(this.tm.RBRACK).image;
		                break;
		            case this.tm.LPAREN:
		                s += this.consumeToken(this.tm.LPAREN).image;
		                break;
		            case this.tm.RPAREN:
		                s += this.consumeToken(this.tm.RPAREN).image;
		                break;
		            case this.tm.UNDERSCORE:
		                s += this.consumeToken(this.tm.UNDERSCORE).image;
		                break;
		            case this.tm.BACKTICK:
		                s += this.consumeToken(this.tm.BACKTICK).image;
		                break;
		            default:
		                if (!this.nextAfterSpace([this.tm.EOL, this.tm.EOF])) {
		                    switch (this.getNextTokenKind()) {
		                    case this.tm.SPACE:
		                        s += this.consumeToken(this.tm.SPACE).image;
		                        break;
		                    case this.tm.TAB:
		                        consumeToken(this.tm.TAB);
		                        s += "    ";
		                        break;
		                    }
		                } else if (!this.fencesAhead()) {
		                    this.consumeToken(this.tm.EOL);
		                    s += "\n";
		                    this.levelWhiteSpace(this.beginColumn);
		                }
		            }
        	}
        	if (this.fencesAhead()) {
        		this.consumeToken(this.tm.EOL);
        		this.whiteSpace();
        		while (this.getNextTokenKind() == this.tm.BACKTICK) {
        			this.consumeToken(BACKTICK);
        		}
        }
        codeBlock.setValue(s.toString());
        tree.closeScope(codeBlock);
    },

    paragraph: function() {
        var paragraph;
        if (this.modules.indexOf("paragraphs") >= 0) {
            paragraph = new koara.Paragraph();
        } else {
            paragraph = new koara.BlockElement();
        }
        this.tree.openScope();
        this.inline();
        while (this.textAhead()) {
            this.lineBreak();
            this.whiteSpace();
            if (this.modules.indexOf("blockquotes") >= 0) {
                while (this.getNextTokenKind() == this.tm.GT) {
                    this.consumeToken(this.tm.GT);
                    this.whiteSpace();
                }
            }
            this.inline();
        }
        this.tree.closeScope(paragraph);
    },

    text: function() {
        var text = new koara.Text();
        this.tree.openScope();
        var s = '';
        while (this.textHasTokensAhead()) {
            switch (this.getNextTokenKind()) {
        	case this.tm.CHAR_SEQUENCE:
        		s += this.consumeToken(this.tm.CHAR_SEQUENCE).image;
        		break;
            case this.tm.BACKSLASH:
                s += this.consumeToken(this.tm.BACKSLASH).image;
                break;
            case this.tm.COLON:
                s += this.consumeToken(this.tm.COLON).image;
                break;
            case this.tm.DASH:
                s += this.consumeToken(this.tm.DASH).image;
                break;
            case this.tm.DIGITS:
                s += this.consumeToken(this.tm.DIGITS).image;
                break;
            case this.tm.DOT:
                s += this.consumeToken(this.tm.DOT).image;
                break;
            case this.tm.EQ:
                s += this.consumeToken(this.tm.EQ).image;
                break;
            case this.tm.ESCAPED_CHAR:
                s += this.consumeToken(this.tm.ESCAPED_CHAR).image.substring(1);
                break;
            case this.tm.GT:
                s += this.consumeToken(this.tm.GT).image;
                break;
            case this.tm.IMAGE_LABEL:
                s += this.consumeToken(this.tm.IMAGE_LABEL).image;
                break;
            case this.tm.LPAREN:
                s += this.consumeToken(this.tm.LPAREN).image;
                break;
            case this.tm.LT:
                s += this.consumeToken(this.tm.LT).image;
                break;
            case this.tm.RBRACK:
                s += consumeToken(this.tm.RBRACK).image;
                break;
            case this.tm.RPAREN:
                s += consumeToken(RPAREN).image;
                break;
            default:
                if (!this.nextAfterSpace([this.tm.EOL, this.tm.EOF])) {
                    switch (this.getNextTokenKind()) {
                    case this.tm.SPACE:
                        s += this.consumeToken(this.tm.SPACE).image;
                        break;
                    case this.tm.TAB:
                        this.consumeToken(this.tm.TAB);
                        s += "    ";
                        break;
                    }
                }
            }
        }
        
        
        
        text.value = s;
        this.tree.closeScope(text);
    },

    image: function() {
        var image = new koara.Image();
        this.tree.openScope();
        var ref = '';
        this.consumeToken(this.tm.LBRACK);
        this.whiteSpace();
        this.consumeToken(this.tm.IMAGE_LABEL);
        this.whiteSpace();
        while (this.imageHasAnyElements()) {
            if (this.hasTextAhead()) {
                this.resourceText();
            } else {
                this.looseChar();
            }
        }
        this.whiteSpace();
        this.consumeToken(this.tm.RBRACK);
        if (this.hasResourceUrlAhead()) {
            ref = this.resourceUrl();
        }
        image.value = ref;
        this.tree.closeScope(image);
    },

    link: function() {
        var link = new Link();
        this.tree.openScope();
        var ref = "";
        this.consumeToken(this.tm.LBRACK);
        this.whiteSpace();
        while (this.linkHasAnyElements()) {
            if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("formatting") >= 0 && this.hasStrongAhead()) {
                this.strong();
            } else if (this.modules.indexOf("formatting") >= 0 && this.hasEmAhead()) {
                this.em();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
                this.code();
            } else if (this.hasResourceTextAhead()) {
                this.resourceText();
            } else {
                this.looseChar();
            }
        }
        this.whiteSpace();
        this.consumeToken(this.tm.RBRACK);
        if (this.hasResourceUrlAhead()) {
            ref = this.resourceUrl();
        }
        link.value = ref;
        tree.closeScope(link);
    },

    strong: function() {
    	var strong = new koara.Strong();
        this.tree.openScope();
        this.consumeToken(this.tm.ASTERISK);
        while (this.strongHasElements()) {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImage()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.multilineAhead(this.tm.BACKTICK)) {
                this.codeMultiline();
            } else if (this.strongEmWithinStrongAhead()) {
                this.emWithinStrong();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new koara.Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new koara.Text(), this.consumeToken(this.tm.UNDERSCORE));
                    break;
                }
            }
        }
        this.consumeToken(this.tm.ASTERISK);
        this.tree.closeScope(strong);
    },

    em: function() {
        var em = new Em();
        this.tree.openScope();
        this.consumeToken(this.tm.UNDERSCORE);
        while (this.emHasElements()) {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImage()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
                this.code();
            } else if (this.emHasStrongWithinEm()) {
                this.strongWithinEm();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.ASTERISK:
                    this.tree.addSingleValue(new koara.Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    tree.addSingleValue(new koara.Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                }
            }
        }
        this.consumeToken(this.tm.UNDERSCORE);
        this.tree.closeScope(em);
    },

    code: function() {
        var code = new Code();
        this.tree.openScope();
        this.consumeToken(this.tm.BACKTICK);
        this.codeText();
        this.consumeToken(this.tm.BACKTICK);
        this.tree.closeScope(code);
    },

    codeText: function() {
        var text = new Text();
        this.tree.openScope();
        var s = '';
        do {
            switch (this.getNextTokenKind()) {
        	case this.tm.CHAR_SEQUENCE:
        		s += this.consumeToken(this.tm.CHAR_SEQUENCE).image;
        		break;
            case this.tm.ASTERISK:
                s += this.consumeToken(this.tm.ASTERISK).image;
                break;
            case this.tm.BACKSLASH:
                s += this.consumeToken(this.tm.BACKSLASH).image;
                break;
            case this.tm.COLON:
                s += this.consumeToken(this.tm.COLON).image;
                break;
            case this.tm.DASH:
                s += this.consumeToken(this.tm.DASH).image;
                break;
            case this.tm.DIGITS:
                s += this.consumeToken(this.tm.DIGITS).image;
                break;
            case this.tm.DOT:
                s += this.consumeToken(this.tm.DOT).image;
                break;
            case this.tm.EQ:
                s += this.consumeToken(this.tm.EQ).image;
                break;
            case this.tm.ESCAPED_CHAR:
                s += this.consumeToken(this.tm.ESCAPED_CHAR).image;
                break;
            case this.tm.IMAGE_LABEL:
                s += this.consumeToken(this.tm.IMAGE_LABEL).image;
                break;
            case this.tm.LT:
                s += this.consumeToken(this.tm.LT).image;
                break;
            case this.tm.LBRACK:
                s += this.consumeToken(this.tm.LBRACK).image;
                break;
            case this.tm.RBRACK:
                s += this.consumeToken(this.tm.RBRACK).image;
                break;
            case this.tm.LPAREN:
                s += this.consumeToken(this.tm.LPAREN).image;
                break;
            case this.tm.GT:
                s += this.consumeToken(this.tm.GT).image;
                break;
            case this.tm.RPAREN:
                s += this.consumeToken(this.tm.RPAREN).image;
                break;
            case this.tm.UNDERSCORE:
                s += this.consumeToken(this.tm.UNDERSCORE).image;
                break;
            default:
                if (!this.nextAfterSpace(this.tm.EOL, this.tm.EOF)) {
                    switch (this.getNextTokenKind()) {
                    case this.tm.SPACE:
                        s += this.consumeToken(this.tm.SPACE).image;
                        break;
                    case this.tm.TAB:
                        this.consumeToken(this.tm.TAB);
                        s += "    ";
                        break;
                    }
                }
            }
        } while (this.codeTextHasAnyTokenAhead());
        text.value = s;
        this.tree.closeScope(text);
    },

   looseChar: function() {
        var text = new koara.Text();
        this.tree.openScope();
        switch (this.getNextTokenKind()) {
        case this.tm.ASTERISK:
            text.value = this.consumeToken(this.tm.ASTERISK).image;
            break;
        case this.tm.BACKTICK:
            text.value = this.consumeToken(this.tm.BACKTICK).image;
            break;
        case this.tm.LBRACK:
            text.value = this.consumeToken(this.tm.LBRACK).image;
            break;
        case this.tm.UNDERSCORE:
            text.value = this.consumeToken(this.tm.UNDERSCORE).image;
            break;
        }
        this.tree.closeScope(text);
    },

    lineBreak: function() {
        var linebreak = new LineBreak();
        this.tree.openScope();
        while (this.getNextTokenKind() == this.tm.SPACE || this.getNextTokenKind() == this.tm.TAB) {
            this.consumeToken(this.getNextTokenKind());
        }
        this.consumeToken(this.tm.EOL);
        this.tree.closeScope(linebreak);
    },

    levelWhiteSpace: function(threshold) {
        var currentPos = 1;
        while (this.getNextTokenKind() == this.tm.GT) {
            this.consumeToken(this.getNextTokenKind());
        }
        while ((this.getNextTokenKind() == this.tm.SPACE || this.getNextTokenKind() == this.tm.TAB) && currentPos < (threshold - 1)) {
            currentPos = this.consumeToken(this.getNextTokenKind()).beginColumn;
        }
    },

    codeLanguage: function() {
        var s = '';
        do {
            switch (this.getNextTokenKind()) {
        	case this.tm.CHAR_SEQUENCE:
        		s += this.consumeToken(this.tm.CHAR_SEQUENCE).image;
        		break;
            case this.tm.ASTERISK:
                s += this.consumeToken(this.tm.ASTERISK).image;
                break;
            case this.tm.BACKSLASH:
                s += this.consumeToken(this.tm.BACKSLASH).image;
                break;
            case this.tm.ACKTICK:
                s += this.consumeToken(this.tm.BACKTICK).image;
                break;
            case this.tm.COLON:
                s += this.consumeToken(this.tm.COLON).image;
                break;
            case this.tm.DASH:
                s += this.consumeToken(this.tm.DASH).image;
                break;
            case this.tm.DIGITS:
                s += this.consumeToken(this.tm.DIGITS).image;
                break;
            case this.tm.DOT:
                s += this.consumeToken(this.tm.DOT).imagec;
                break;
            case this.tm.EQ:
                s += this.consumeToken(this.tm.EQ).image;
                break;
            case this.tm.ESCAPED_CHAR:
                s += this.consumeToken(this.tm.ESCAPED_CHAR).image;
                break;
            case this.tm.IMAGE_LABEL:
                s += this.consumeToken(this.tm.IMAGE_LABEL).image;
                break;
            case this.tm.LT:
                s += this.consumeToken(this.tm.LT).image;
                break;
            case this.tm.GT:
                s += this.consumeToken(this.tm.GT).image;
                break;
            case this.tm.LBRACK:
                s += this.consumeToken(this.tm.LBRACK).image;
                break;
            case this.tm.RBRACK:
                s += this.consumeToken(this.tm.RBRACK).image;
                break;
            case this.tm.LPAREN:
                s += this.consumeToken(this.tm.LPAREN).image;
                break;
            case this.tm.RPAREN:
                s += this.consumeToken(this.tm.RPAREN).image;
                break;
            case this.tm.UNDERSCORE:
                s += this.consumeToken(this.tm.UNDERSCORE).image;
                break;
            case this.tm.SPACE:
                s += consumeToken(this.tm.SPACE).image;
                break;
            case this.tm.TAB:
                s += "    ";
                break;
            default:
                break;
            }
          } while (this.getNextTokenKind() != this.tm.EOL && this.getNextTokenKind() != this.tm.EOF);
          return s;
      },

      inline: function() {
    	  do {
    		if (this.hasInlineTextAhead()) {
    			  this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                  this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                  this.link();
            } else if (this.modules.indexOf("formatting") >= 0 && this.multilineAhead(this.tm.ASTERISK)) {
                  this.strongMultiline();
            } else if (this.modules.indexOf("formatting") >= 0 && this.multilineAhead(this.tm.UNDERSCORE)) {
                  this.emMultiline();
            } else if (this.modules.indexOf("code") >= 0 && this.multilineAhead(this.tm.BACKTICK)) {
                  this.codeMultiline();
            } else {
                 this.looseChar();
            }
          } while (this.hasInlineElementAhead());
      },

      resourceText: function() {
    	  var text = new Text();
    	  this.tree.openScope();
    	  var s = '';
    	  do {
            switch (this.getNextTokenKind()) {
            case this.tm.CHAR_SEQUENCE:
        		s += this.consumeToken(this.tm.CHAR_SEQUENCE).image;
        		break;
            case this.tm.BACKSLASH:
                s += this.consumeToken(this.tm.BACKSLASH).image;
                break;
            case this.tm.COLON:
                s += this.consumeToken(this.tm.COLON).image;
                break;
            case this.tm.DASH:
                s += this.consumeToken(this.tm.DASH).image;
                break;
            case this.tm.DIGITS:
                s += this.consumeToken(this.tm.DIGITS).image;
                break;
            case this.tm.DOT:
                s += this.consumeToken(this.tm.DOT).image;
                break;
            case this.tm.EQ:
                s += this.consumeToken(this.tm.EQ).image;
                break;
            case this.tm.ESCAPED_CHAR:
                s += this.consumeToken(this.tm.ESCAPED_CHAR).image.substring(1);
                break;
            case this.tm.IMAGE_LABEL:
                s += this.consumeToken(this.tm.IMAGE_LABEL).image;
                break;
            case this.tm.GT:
                s += this.consumeToken(this.tm.GT).image;
                break;
            case this.tm.LPAREN:
                s += this.consumeToken(this.tm.LPAREN).image;
                break;
            case this.tm.LT:
                s += this.consumeToken(this.tm.LT).image;
                break;
            case this.tm.RPAREN:
                s += this.consumeToken(this.tm.RPAREN).image;
                break;
            default:
                if (!this.nextAfterSpace(this.tm.RBRACK)) {
                    switch (this.getNextTokenKind()) {
                    case this.tm.SPACE:
                        s += this.consumeToken(this.tm.SPACE).image;
                        break;
                    case this.tm.TAB:
                        consumeToken(this.tm.TAB);
                        s += "    ";
                        break;
                    }
                }
            }
        } while (this.resourceHasElementAhead());
        text.value = s;
        this.tree.closeScope(text);
      },

      resourceUrl: function() {
        this.consumeToken(this.tm.LPAREN);
        this.whiteSpace();
        var ref = this.resourceUrlText();
        this.whiteSpace();
        this.consumeToken(this.tm.RPAREN);
        return ref;
      }, 

      resourceUrlText: function() {
          var s = '';
          while (this.resourceTextHasElementsAhead()) {
            switch (this.getNextTokenKind()) {
        	case this.tm.CHAR_SEQUENCE:
        		s += this.consumeToken(this.tm.CHAR_SEQUENCE).image;
        		break;
            case this.tm.ASTERISK:
                s += this.consumeToken(this.tm.ASTERISK).image;
                break;
            case this.tm.BACKSLASH:
                s += this.consumeToken(this.tm.BACKSLASH).image;
                break;
            case this.tm.BACKTICK:
                s += this.consumeToken(this.tm.BACKTICK).image;
                break;
            case this.tm.COLON:
                s += this.consumeToken(this.tm.COLON).image;
                break;
            case this.tm.DASH:
                s += this.consumeToken(this.tm.DASH).image;
                break;
            case this.tm.DIGITS:
                s += this.consumeToken(this.tm.DIGITS).image;
                break;
            case this.tm.DOT:
                s += this.consumeToken(this.tm.DOT).image;
                break;
            case this.tm.EQ:
                s += this.consumeToken(this.tm.EQ).image;
                break;
            case this.tm.ESCAPED_CHAR:
                s += this.consumeToken(this.tm.ESCAPED_CHAR).image.substring(1);
                break;
            case this.tm.IMAGE_LABEL:
                s += this.consumeToken(this.tm.IMAGE_LABEL).image;
                break;
            case this.tm.GT:
                s += this.consumeToken(this.tm.GT).image;
                break;
            case this.tm.LBRACK:
                s += this.consumeToken(this.tm.LBRACK).image;
                break;
            case this.tm.LPAREN:
                s += this.consumeToken(this.tm.LPAREN).image;
                break;
            case this.tm.LT:
                s += this.consumeToken(this.tm.LT).image;
                break;
            case this.tm.RBRACK:
                s += this.consumeToken(this.tm.RBRACK).image;
                break;
            case this.tm.UNDERSCORE:
                s += this.consumeToken(this.tm.UNDERSCORE).image;
                break;
            default:
                if (!this.nextAfterSpace(this.tm.RPAREN)) {
                    switch (this.getNextTokenKind()) {
                    case this.tm.SPACE:
                        s += this.consumeToken(this.tm.SPACE).image;
                        break;
                    case this.tm.TAB:
                        this.consumeToken(this.tm.TAB);
                        s += "    ";
                        break;
                    }
                }
              }
            }
            return s;
      },

	  strongMultiline: function() {
	    var strong = new Strong();
	    this.tree.openScope();
	    this.consumeToken(this.tm.ASTERISK);
	    this.strongMultilineContent();
	    while (this.textAhead()) {
	       this.lineBreak();
	       this.strongMultilineContent();
	    }
	    this.consumeToken(this.tm.ASTERISK);
	    this.tree.closeScope(this.tm.strong);
	  },

   	  strongMultilineContent: function() {
        do {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0  && this.hasCodeAhead()) {
                this.code();
            } else if (this.hasEmWithinStrongMultiline()) {
                this.emWithinStrongMultiline();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case LBRACK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.UNDERSCORE));
                    break;
                }
            }
        } while (this.strongMultilineHasElementsAhead());
   	  },

   	  strongWithinEmMultiline: function() {
        var strong = new Strong();
        this.tree.openScope();
        this.consumeToken(this.tm.ASTERISK);
        this. strongWithinEmMultilineContent();
        while (this.textAhead()) {
            this.lineBreak();
            this.strongWithinEmMultilineContent();
        }
        this.consumeToken(this.tm.ASTERISK);
        this.tree.closeScope(this.tm.strong);
   	  },

   	  strongWithinEmMultilineContent: function() {
        do {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0  && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0  && this.hasCodeAhead()) {
                this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case LBRACK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new KoaraText(), this.consumeToken(UNDERSCORE));
                    break;
                }
            }
        } while (this.strongWithinEmMultilineHasElementsAhead());
      },

      strongWithinEm: function() {
        var strong = new Strong();
        this.tree.openScope();
        thiss.consumeToken(this.tm.ASTERISK);
        do {
            if (this.hasTextAhead()) {
               this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
               this.image();
            } else if (this.modules.indexOf("links") >= 0  && this.hasLinkAhead()) {
               this.link();
            } else if (this.modules.indexOf("code") >= 0  && this.hasCodeAhead()) {
               this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new KoaraText(), this.consumeToken(this.tm.UNDERSCORE));
                    break;
                }
            }
        } while (this.strongWithinEmHasElementsAhead());
        this.consumeToken(this.tm.ASTERISK);
        this.tree.closeScope(strong);
    },

    emMultiline: function() {
        var em = new Em();
        this.tree.openScope();
        this.consumeToken(this.tm.UNDERSCORE);
        this.emMultilineContent();
        while (this.textAhead()) {
            this.lineBreak();
            this.emMultilineContent();
        }
        this.consumeToken(this.tm.UNDERSCORE);
        this.tree.closeScope(em);
    },

    emMultilineContent: function() {
        do {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0  && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0  && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0  && this.multilineAhead(this.tm.BACKTICK)) {
                this.codeMultiline();
            } else if (this.hasStrongWithinEmMultilineAhead()) {
                this.strongWithinEmMultiline();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.ASTERISK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                }
            }
        } while (this.emMultilineContentHasElementsAhead());
    },

    emWithinStrongMultiline: function() {
        var em = new Em();
        this.tree.openScope();
        this.consumeToken(this.tm.UNDERSCORE);
        this.emWithinStrongMultilineContent();
        while (this.textAhead()) {
            this.lineBreak();
            this.emWithinStrongMultilineContent();
        }
        this.consumeToken(this.tm.UNDERSCORE);
        this.tree.closeScope(em);
    },

    emWithinStrongMultilineContent: function() {
        do {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0  && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0  && this.hasCodeAhead()) {
                this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.ASTERISK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                }
            }
        } while (this.emWithinStrongMultilineContentHasElementsAhaed());
    },

    emWithinStrong: function() {
        var em = new Em();
        this.tree.openScope();
        this.consumeToken(this.tm.UNDERSCORE);
        do {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0  && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0  && this.hasCodeAhead()) {
                this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.ASTERISK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Koara.Text(), this.consumeToken(LBRACK));
                    break;
                }
            }
        } while (this.emWithinStrongHasElementsAhead());
        this.consumeToken(this.tm.UNDERSCORE);
        this.tree.closeScope(em);
    },

    codeMultiline: function() {
        var code = new Code();
        this.tree.openScope();
        this.consumeToken(this.tm.BACKTICK);
        this.codeText();
        while (this.textAhead()) {
            this.lineBreak();
            this.whiteSpace();
            while (this.getNextTokenKind() == this.tm.GT) {
                this.consumeToken(this.tm.GT);
                this.whiteSpace();
            }
            this.codeText();
        }
        this.consumeToken(this.tm.BACKTICK);
        this.tree.closeScope(code);
    },

    whiteSpace: function() {
        while (this.getNextTokenKind() == this.tm.SPACE || this.getNextTokenKind() == this.tm.TAB) {
            this.consumeToken(this.getNextTokenKind());
        }
    },

    hasAnyBlockElementsAhead: function() {
        try {
            this.lookAhead = 1;
            this.lastPosition = this.scanPosition = this.token;
            return !this.scanMoreBlockElements();
        } catch (ls) {
            return true;
        }
    },

    blockAhead: function(blockBeginColumn) {
        var quoteLevel;
        if (this.getNextTokenKind() == this.tm.EOL) {
            var t;
            var i = 2;
            var quoteLevel = 0;
            do {
                quoteLevel = 0;
                do {
                    t = this.getToken(i++);
                    if (t.kind == this.tm.GT) {
                        if (t.beginColumn == 1 && currentBlockLevel > 0 && currentQuoteLevel == 0) {
                            return false;
                        }
                        quoteLevel++;
                    }
                } while (t.kind == this.tm.GT || t.kind == this.tm.SPACE || t.kind == this.tm.TAB);
                if (quoteLevel > currentQuoteLevel) {
                    return true;
                }
                if (quoteLevel < currentQuoteLevel) {
                    return false;
                }
            } while (t.kind == this.tm.EOL);
            return t.kind != this.tm.EOF && (currentBlockLevel == 0 || t.beginColumn >= blockBeginColumn + 2);
        }
        return false;
    },

    multilineAhead: function(token) {
        if (this.getNextTokenKind() == token && this.getToken(2).kind != token && this.getToken(2).kind != this.tm.EOL) {
            for (var i = 2;; i++) {
                var t = this.getToken(i);
                if (t.kind == token) {
                    return true;
                } else if (t.kind == this.tm.EOL) {
                    i = this.skip(i + 1, [this.tm.SPACE, this.tm.TAB]);
                    var quoteLevel = this.newQuoteLevel(i);
                    if (quoteLevel == this.currentQuoteLevel) {
                        i = this.skip(i, this.tm.SPACE, this.tm.TAB, this.tm.GT);
                        if (this.getToken(i).kind == token || this.getToken(i).kind == this.tm.EOL || this.getToken(i).kind == this.tm.DASH
                                || (this.getToken(i).kind == this.tm.DIGITS && this.getToken(i + 1).kind == this.tm.DOT)
                                || (getToken(i).kind == this.tm.BACKTICK && getToken(i + 1).kind == this.tm.BACKTICK
                                        && getToken(i + 2).kind == this.tm.BACKTICK)
                                || this.headingAhead(i)) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if (t.kind == this.tm.EOF) {
                    return false;
                }
            }
        }
        return false;
    },

    fencesAhead: function() {
        if (this.getNextTokenKind() == this.tm.EOL) {
            var i = skip(2, this.tm.SPACE, this.tm.TAB, this.tm.GT);
            if (this.getToken(i).kind == this.tm.BACKTICK && getToken(i + 1).kind == this.tm.BACKTICK && getToken(i + 2).kind == this.tm.BACKTICK) {
                i = skip(i + 3, this.tm.SPACE, this.tm.TAB);
                return this.getToken(i).kind == this.tm.EOL || this.getToken(i).kind == this.tm.EOF;
            }
        }
        return false;
    },

    headingAhead: function(offset) {
        if (this.getToken(offset).kind == this.tm.EQ) {
            var heading = 1;
            for (var i = (offset + 1);; i++) {
                if (this.getToken(i).kind != this.tm.EQ) {
                    return true;
                }
                if (++heading > 6) {
                    return false;
                }
            }
        }
        return false;
    },

    listItemAhead: function(listBeginColumn, ordered) {
        if (this.getNextTokenKind() == this.tm.EOL) {
            for (var i = 2, eol = 1;; i++) {
                var t = this.getToken(i);

                if (t.kind == this.tm.EOL && ++eol > 2) {
                    return false;
                } else if (t.kind != this.tm.SPACE && t.kind != this.tm.TAB && t.kind != this.tm.GT && t.kind != this.tm.EOL) {
                    if (ordered) {
                        return (t.kind == this.tm.DIGITS && this.getToken(i + 1).kind == this.tm.DOT && t.beginColumn >= listBeginColumn);
                    }
                    return t.kind == this.tm.DASH && t.beginColumn >= listBeginColumn;
                }
            }
        }
        return false;
    },

    textAhead: function() {
        if (this.getNextTokenKind() == this.tm.EOL && this.getToken(2).kind != this.tm.EOL) {
            var i = skip(2, this.tm.SPACE, this.tm.TAB);
            var quoteLevel = this.newQuoteLevel(i);
            if (quoteLevel == this.currentQuoteLevel || !this.modules.contains(Module.BLOCKQUOTES)) {
                i = this.skip(i, this.tm.SPACE, this.tm.TAB, this.tm.GT);

                var t = this.getToken(i);
                return this.getToken(i).kind != this.tm.EOL && !(this.modules.contains(Module.LISTS) && t.kind == this.tm.DASH)
                        && !(this.modules.contains(Module.LISTS) && t.kind == this.tm.DIGITS && this.getToken(i + 1).kind == this.tm.DOT)
                        && !(this.getToken(i).kind == this.tm.BACKTICK && this.getToken(i + 1).kind == this.tm.BACKTICK
                                && this.getToken(i + 2).kind == this.tm.BACKTICK)
                        && !(this.modules.contains(Module.HEADINGS) && this.headingAhead(i));
            }
        }
        return false;
    },

    nextAfterSpace: function(tokens) {
        var i = this.skip(1, [this.tm.SPACE, this.tm.TAB]);
        return tokens.indexOf(this.getToken(i).kind) >= 0;
    },

    newQuoteLevel: function(offset) {
        var quoteLevel = 0;
        for (var i = offset;; i++) {
            var t = this.getToken(i);
            if (t.kind == this.tm.GT) {
                quoteLevel++;
            } else if (t.kind != this.tm.SPACE && t.kind != this.tm.TAB) {
                return quoteLevel;
            }

        }
    },

    skip: function(offset, tokens) {
        for (var i = offset;; i++) {
            var t = this.getToken(i);
            if (tokens.indexOf(t.kind) == -1 || t.kind == this.tm.EOF) {
                return i;
            }
        }
    },

    hasOrderedListAhead: function() {
        this.lookAhead = 2;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanToken(this.tm.DIGITS) && !this.scanToken(this.tm.DOT);
        } catch (ls) {
            return true;
        }
    },

    hasFencedCodeBlockAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanFencedCodeBlock();
        } catch (ls) {
            return true;
        }
    },

    headingHasInlineElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            var xsp = this.scanPosition;
            if (this.scanTextTokens()) {
                this.scanPosition = xsp;
                if (this.scanImage()) {
                    this.scanPosition = xsp;
                    if (this.scanLink()) {
                        this.scanPosition = xsp;
                        if (this.scanStrong()) {
                            this.scanPosition = xsp;
                            if (this.scanEm()) {
                                this.scanPosition = xsp;
                                if (this.scanCode()) {
                                    this.scanPosition = xsp;
                                    if (this.scanLooseChar()) {
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return true;
        } catch (ls) {
            return true;
        }
    },

    hasTextAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanTextTokens();
        } catch (ls) {
            return true;
        }
    },

    hasImageAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanImage();
        } catch (ls) {
            return true;
        }
    },

    blockQuoteHasEmptyLineAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanBlockQuoteEmptyLine();
        } catch (ls) {
            return true;
        }
    },

    hasStrongAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanStrong();
        } catch (ls) {
            return true;
        }
    },

    hasEmAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanEm();
        } catch (ls) {
            return true;
        }
    },

    hasCodeAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanCode();
        } catch (ls) {
            return true;
        }
    },

    blockQuoteHasAnyBlockElementseAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanMoreBlockElements();
        } catch (ls) {
            return true;
        }
    },

    hasBlockQuoteEmptyLinesAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanBlockQuoteEmptyLines();
        } catch (ls) {
            return true;
        }
    },

    listItemHasInlineElements: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanMoreBlockElements();
        } catch (ls) {
            return true;
        }
    },

    hasInlineTextAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanTextTokens();
        } catch (ls) {
            return true;
        }
    },

    hasInlineElementAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanInlineElement();
        } catch (ls) {
            return true;
        }
    },

    imageHasAnyElements: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanImageElement();
        } catch (ls) {
            return true;
        }
    },

    hasResourceTextAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanResourceElements();
        } catch (ls) {
            return true;
        }
    },

    linkHasAnyElements: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanLinkElement();
        } catch (ls) {
            return true;
        }
    },

    hasResourceUrlAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanResourceUrl();
        } catch (ls) {
            return true;
        }
    },

    resourceHasElementAhead: function() {
        this.lookAhead = 2;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !scanResourceElement();
        } catch (ls) {
            return true;
        }
    },

    resourceTextHasElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanResourceTextElement();
        } catch (ls) {
            return true;
        }
    },

    hasEmWithinStrongMultiline: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanEmWithinStrongMultiline();
        } catch (ls) {
            return true;
        }
    },

    strongMultilineHasElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanStrongMultilineElements();
        } catch (ls) {
            return true;
        }
    },

    strongWithinEmMultilineHasElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanStrongWithinEmMultilineElements();
        } catch (ls) {
            return true;
        }
    },

    hasImage: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanImage();
        } catch (ls) {
            return true;
        }
    },

    hasLinkAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanLink();
        } catch (ls) {
            return true;
        }
    },

    strongEmWithinStrongAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanEmWithinStrong();
        } catch (ls) {
            return true;
        }
    },

    strongHasElements: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanStrongElements();
        } catch (ls) {
            return true;
        }
    },

    strongWithinEmHasElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanStrongWithinEmElements();
        } catch (ls) {
            return true;
        }
    },

    hasStrongWithinEmMultilineAhead: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanStrongWithinEmMultiline();
        } catch (ls) {
            return true;
        }
    },

    emMultilineContentHasElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanEmMultilineContentElements();
        } catch (ls) {
            return true;
        }
    },

    emWithinStrongMultilineContentHasElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !scanEmWithinStrongMultilineContent();
        } catch (ls) {
            return true;
        }
    },

   emHasStrongWithinEm: function() {
        this.lookAhead = 2147483647;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanStrongWithinEm();
        } catch (ls) {
            return true;
        }
    },

    emHasElements: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanEmElements();
        } catch (ls) {
            return true;
        }
    },

    emWithinStrongHasElementsAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanEmWithinStrongElements();
        } catch (ls) {
            return true;
        }
    },

    codeTextHasAnyTokenAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanCodeTextTokens();
        } catch (ls) {
            return true;
        }
    },

    textHasTokensAhead: function() {
        this.lookAhead = 1;
        this.lastPosition = this.scanPosition = this.token;
        try {
            return !this.scanText();
        } catch (ls) {
            return true;
        }
    },

    scanLooseChar: function() {
        var xsp = this.scanPosition;
        if (this.scanToken(this.tm.ASTERISK)) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.BACKTICK)) {
                this.scanPosition = xsp;
                if (this.scanToken(this.tm.LBRACK)) {
                    this.scanPosition = xsp;
                    return this.scanToken(this.tm.UNDERSCORE);
                }
            }
        }
        return false;
    },

    scanText: function() {
        var xsp = this.scanPosition;
        if (this.scanToken(this.tm.BACKSLASH)) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.CHAR_SEQUENCE)) {
                this.scanPosition = xsp;
                if (this.scanToken(this.tm.COLON)) {
                    this.scanPosition = xsp;
                    if (this.scanToken(this.tm.DASH)) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.DIGITS)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.DOT)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.EQ)) {
                                    this.scanPosition = xsp;
                                    if (this.scanToken(this.tm.ESCAPED_CHAR)) {
                                        this.tm.scanPosition = xsp;
                                        if (this.scanToken(this.tm.GT)) {
                                            this.scanPosition = xsp;
                                            if (this.scanToken(this.tm.IMAGE_LABEL)) {
                                                this.scanPosition = xsp;
                                                if (this.scanToken(this.tm.LPAREN)) {
                                                    this.scanPosition = xsp;
                                                    if (this.scanToken(this.tm.LT)) {
                                                        this.scanPosition = xsp;
                                                        if (this.scanToken(this.tm.RBRACK)) {
                                                            this.scanPosition = xsp;
                                                            if (this.scanToken(this.tm.RPAREN)) {
                                                                this.scanPosition = xsp;
                                                                this.lookingAhead = true;
                                                                this.semanticLookAhead = !this.nextAfterSpace([this.tm.EOL, this.tm.EOF]);
                                                                this.lookingAhead = false;
                                                                return (!this.semanticLookAhead || this.scanWhitspaceToken());
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanTextTokens: function() {
        if (this.scanText()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanText()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanCodeTextTokens: function() {
        var xsp = this.scanPosition;
        if (this.scanToken(this.tm.ASTERISK)) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.BACKSLASH)) {
                this.scanPosition = xsp;
                if (this.scanToken(this.tm.CHAR_SEQUENCE)) {
                    this.scanPosition = xsp;
                    if (this.scanToken(this.tm.COLON)) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.DASH)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.DIGITS)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.DOT)) {
                                    this.scanPosition = xsp;
                                    if (this.scanToken(this.tm.EQ)) {
                                        this.scanPosition = xsp;
                                        if (this.scanToken(this.tm.ESCAPED_CHAR)) {
                                            this.scanPosition = xsp;
                                            if (this.scanToken(this.tm.IMAGE_LABEL)) {
                                                this.scanPosition = xsp;
                                                if (this.scanToken(this.tm.LT)) {
                                                    this.scanPosition = xsp;
                                                    if (this.scanToken(this.tm.LBRACK)) {
                                                        this.scanPosition = xsp;
                                                        if (this.scanToken(this.tm.RBRACK)) {
                                                            this.scanPosition = xsp;
                                                            if (this.scanToken(this.tm.LPAREN)) {
                                                                this.scanPosition = xsp;
                                                                if (this.scanToken(this.tm.GT)) {
                                                                    this.scanPosition = xsp;
                                                                    if (this.scanToken(this.tm.RPAREN)) {
                                                                        this.scanPosition = xsp;
                                                                        if (this.scanToken(this.tm.UNDERSCORE)) {
                                                                            this.scanPosition = xsp;
                                                                            this.lookingAhead = true;
                                                                            this.semanticLookAhead = !this.nextAfterSpace([this.tm.EOL, this.tm.EOF]);
                                                                            this.lookingAhead = false;
                                                                            return (!this.semanticLookAhead || this.scanWhitspaceToken());
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanCode: function() {
        return this.scanToken(this.tm.BACKTICK) || this.scanCodeTextTokensAhead() || this.scanToken(this.tm.BACKTICK);
    },

    scanCodeMultiline: function() {
        if (scanToken(this.tm.BACKTICK) || this.scanCodeTextTokensAhead()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.hasCodeTextOnNextLineAhead()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return scanToken(BACKTICK);
    },

    scanCodeTextTokensAhead: function() {
        if (this.scanCodeTextTokens()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanCodeTextTokens()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    hasCodeTextOnNextLineAhead: function() {
        if (this.scanWhitespaceTokenBeforeEol()) {
           return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanToken(this.tm.GT)) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanCodeTextTokensAhead();
    },

    scanWhitspaceTokens: function() {
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanWhitspaceToken()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanWhitespaceTokenBeforeEol: function() {
        return this.scanWhitspaceTokens() || this.scanToken(this.tm.EOL);
    },

    scanEmWithinStrongElements: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    if (this.scanCode()) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.ASTERISK)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.BACKTICK)) {
                                this.scanPosition = xsp;
                                return this.scanToken(this.tm.LBRACK);
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanEmWithinStrong: function() {
        if (this.scanToken(this.tm.UNDERSCORE) || this.scanEmWithinStrongElements()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanEmWithinStrongElements()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanToken(this.tm.UNDERSCORE);
    },

    scanEmElements: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    if (this.scanCode()) {
                        this.scanPosition = xsp;
                        if (this.scanStrongWithinEm()) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.ASTERISK)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.BACKTICK)) {
                                    this.scanPosition = xsp;
                                    return this.scanToken(this.tm.LBRACK);
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanEm: function() {
        if (this.scanToken(this.tm.UNDERSCORE) || this.scanEmElements()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanEmElements()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanToken(this.tm.UNDERSCORE);
    },

    scanEmWithinStrongMultilineContent: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    if (this.scanCode()) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.ASTERISK)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.BACKTICK)) {
                                this.scanPosition = xsp;
                                return this.scanToken(this.tm.LBRACK);
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    hasNoEmWithinStrongMultilineContentAhead: function() {
        if (this.scanEmWithinStrongMultilineContent()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanEmWithinStrongMultilineContent()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanEmWithinStrongMultiline: function() {
        if (this.scanToken(this.tm.UNDERSCORE) || this.hasNoEmWithinStrongMultilineContentAhead()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanWhitespaceTokenBeforeEol() || this.hasNoEmWithinStrongMultilineContentAhead()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanToken(this.tm.UNDERSCORE);
    },

    scanEmMultilineContentElements: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    this.lookingAhead = true;
                    this.semanticLookAhead = this.multilineAhead(this.tm.BACKTICK);
                    this.lookingAhead = false;
                    if (!this.semanticLookAhead || this.scanCodeMultiline()) {
                        this.scanPosition = xsp;
                        if (this.scanStrongWithinEmMultiline()) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.ASTERISK)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.BACKTICK)) {
                                    this.scanPosition = xsp;
                                    return this.scanToken(this.tm.LBRACK);
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanStrongWithinEmElements: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    if (this.scanCode()) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.BACKTICK)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.LBRACK)) {
                                this.scanPosition = xsp;
                                return this.scanToken(this.tm.UNDERSCORE);
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanStrongWithinEm: function() {
        if (this.scanToken(this.tm.ASTERISK) || this.scanStrongWithinEmElements()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanStrongWithinEmElements()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanToken(this.tm.ASTERISK);
    },

    scanStrongElements: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    this.lookingAhead = true;
                    this.semanticLookAhead = this.multilineAhead(this.tm.BACKTICK);
                    this.lookingAhead = false;
                    if (!this.semanticLookAhead || this.scanCodeMultiline()) {
                        this.scanPosition = xsp;
                        if (this.scanEmWithinStrong()) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.BACKTICK)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.LBRACK)) {
                                    this.scanPosition = xsp;
                                    return this.scanToken(this.tm.UNDERSCORE);
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanStrong: function() {
        if (this.scanToken(this.tm.ASTERISK) || this.scanStrongElements()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanStrongElements()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanToken(this.tm.ASTERISK);
    },

    scanStrongWithinEmMultilineElements: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    if (this.scanCode()) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.BACKTICK)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.LBRACK)) {
                                this.scanPosition = xsp;
                                return this.scanToken(this.tm.UNDERSCORE);
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanForMoreStrongWithinEmMultilineElements: function() {
        if (this.scanStrongWithinEmMultilineElements()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanStrongWithinEmMultilineElements()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanStrongWithinEmMultiline: function() {
        if (this.scanToken(ASTERISK) || this.scanForMoreStrongWithinEmMultilineElements()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanWhitespaceTokenBeforeEol() || this.scanForMoreStrongWithinEmMultilineElements()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanToken(this.tm.ASTERISK);
    },

    scanStrongMultilineElements: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    if (this.scanCode()) {
                        this.scanPosition = xsp;
                        if (this.scanEmWithinStrongMultiline()) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.BACKTICK)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.LBRACK)) {
                                    this.scanPosition = xsp;
                                    return this.scanToken(this.tm.UNDERSCORE);
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanResourceTextElement: function() {
        var xsp = this.scanPosition;
        if (this.scanToken(this.tm.ASTERISK)) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.BACKSLASH)) {
                this.scanPosition = xsp;
                if (this.scanToken(this.tm.BACKTICK)) {
                    this.scanPosition = xsp;
                    if (this.scanToken(this.tm.CHAR_SEQUENCE)) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.COLON)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.DASH)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.DIGITS)) {
                                    this.scanPosition = xsp;
                                    if (this.scanToken(this.tm.DOT)) {
                                        this.scanPosition = xsp;
                                        if (this.scanToken(this.tm.EQ)) {
                                            this.scanPosition = xsp;
                                            if (this.scanToken(this.tm.ESCAPED_CHAR)) {
                                                this.scanPosition = xsp;
                                                if (this.scanToken(this.tm.IMAGE_LABEL)) {
                                                    this.scanPosition = xsp;
                                                    if (this.scanToken(this.tm.GT)) {
                                                        this.scanPosition = xsp;
                                                        if (this.scanToken(this.tm.LBRACK)) {
                                                            this.scanPosition = xsp;
                                                            if (this.scanToken(this.tm.LPAREN)) {
                                                                this.scanPosition = xsp;
                                                                if (this.scanToken(this.tm.LT)) {
                                                                    this.scanPosition = xsp;
                                                                    if (this.scanToken(this.tm.RBRACK)) {
                                                                        this.scanPosition = xsp;
                                                                        if (this.scanToken(this.tm.UNDERSCORE)) {
                                                                            this.scanPosition = xsp;
                                                                            this.lookingAhead = true;
                                                                            this.semanticLookAhead = !this.nextAfterSpace([this.tm.RPAREN]);
                                                                            this.lookingAhead = false;
                                                                            return (!this.semanticLookAhead || this.scanWhitspaceToken());
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanImageElement: function() {
        var xsp = this.scanPosition;
        if (this.scanResourceElements()) {
            this.scanPosition = xsp;
            if (this.scanLooseChar()) {
                return true;
            }
        }
        return false;
    },

    scanResourceTextElements: function() {
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanResourceTextElement()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanResourceUrl: function() {
        return this.scanToken(this.tm.LPAREN) || this.scanWhitspaceTokens() || this.scanResourceTextElements() || this.scanWhitspaceTokens()
                || this.scanToken(this.tm.RPAREN);
    },

    scanLinkElement: function() {
        var xsp = this.scanPosition;
        if (this.scanImage()) {
            this.scanPosition = xsp;
            if (this.scanStrong()) {
                this.scanPosition = xsp;
                if (this.scanEm()) {
                    this.scanPosition = xsp;
                    if (this.scanCode()) {
                        this.scanPosition = xsp;
                        if (this.scanResourceElements()) {
                            this.scanPosition = xsp;
                            return this.scanLooseChar();
                        }
                    }
                }
            }
        }
        return false;
    },

    scanResourceElement: function() {
        var xsp = this.scanPosition;
        if (this.scanToken(this.tm.BACKSLASH)) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.COLON)) {
                this.scanPosition = xsp;
                if (this.scanToken(this.tm.CHAR_SEQUENCE)) {
                    this.scanPosition = xsp;
                    if (this.scanToken(this.tm.DASH)) {
                        this.scanPosition = xsp;
                        if (this.scanToken(this.tm.DIGITS)) {
                            this.scanPosition = xsp;
                            if (this.scanToken(this.tm.DOT)) {
                                this.scanPosition = xsp;
                                if (this.scanToken(this.tm.EQ)) {
                                    this.scanPosition = xsp;
                                    if (this.scanToken(this.tm.ESCAPED_CHAR)) {
                                        this.scanPosition = xsp;
                                        if (this.scanToken(this.tm.IMAGE_LABEL)) {
                                            this.scanPosition = xsp;
                                            if (this.scanToken(this.tm.GT)) {
                                                this.scanPosition = xsp;
                                                if (this.scanToken(this.tm.LPAREN)) {
                                                    this.scanPosition = xsp;
                                                    if (this.scanToken(this.tm.LT)) {
                                                        this.scanPosition = xsp;
                                                        if (this.scanToken(this.tm.RPAREN)) {
                                                            this.scanPosition = xsp;
                                                            this.lookingAhead = true;
                                                            this.semanticLookAhead = !this.nextAfterSpace([this.tm.RBRACK]);
                                                            this.lookingAhead = false;
                                                            return (!this.semanticLookAhead || this.scanWhitspaceToken());
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanResourceElements: function() {
        if (this.scanResourceElement()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanResourceElement()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanLink: function() {
        if (this.scanToken(this.tm.LBRACK) || this.scanWhitspaceTokens() || this.scanLinkElement()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanLinkElement()) {
                this.scanPosition = xsp;
                break;
            }
        }
        if (this.scanWhitspaceTokens() || this.scanToken(this.tm.RBRACK)) {
            return true;
        }
        xsp = this.scanPosition;
        if (this.scanResourceUrl()) {
            this.scanPosition = xsp;
        }
        return false;
    },

    scanImage: function() {
        if (this.scanToken(this.tm.LBRACK) || this.scanWhitspaceTokens() || this.scanToken(this.IMAGE_LABEL) || this.scanImageElement()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanImageElement()) {
                this.scanPosition = xsp;
                break;
            }
        }
        if (this.scanWhitspaceTokens() || this.scanToken(this.tm.RBRACK)) {
            return true;
        }
        xsp = this.scanPosition;
        if (this.scanResourceUrl()) {
            this.scanPosition = xsp;
        }
        return false;
    },

    scanInlineElement: function() {
        var xsp = this.scanPosition;
        if (this.scanTextTokens()) {
            this.scanPosition = xsp;
            if (this.scanImage()) {
                this.scanPosition = xsp;
                if (this.scanLink()) {
                    this.scanPosition = xsp;
                    this.lookingAhead = true;
                    this.semanticLookAhead = this.multilineAhead(this.tm.ASTERISK);
                    this.lookingAhead = false;
                    if (!this.semanticLookAhead || this.scanToken(this.tm.ASTERISK)) {
                        this.scanPosition = xsp;
                        this.lookingAhead = true;
                        this.semanticLookAhead = this.multilineAhead(this.tm.UNDERSCORE);
                        this.lookingAhead = false;
                        if (!this.semanticLookAhead || this.scanToken(this.tm.UNDERSCORE)) {
                            this.scanPosition = xsp;
                            this.lookingAhead = true;
                            this.semanticLookAhead = this.multilineAhead(this.tm.BACKTICK);
                            this.lookingAhead = false;
                            if (!this.semanticLookAhead || this.scanCodeMultiline()) {
                                this.scanPosition = xsp;
                                return this.scanLooseChar();
                            }
                        }
                    }
                }
            }
        }
        return false;
    },

    scanParagraph: function() {
        var xsp;
        if (this.scanInlineElement()) {
            return true;
        }
        while (true) {
            xsp = this.scanPosition;
            if (this.scanInlineElement()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanForCodeLanguageElement: function() {
        var xsp = this.scanPosition;
        if (this.scanToken(this.tm.CHAR_SEQUENCE)) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.BACKTICK)) {
                return true;
            }
        }
        return false;
    },

    scanForCodeLanguageElements: function() {
        if (this.scanForCodeLanguageElement()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanForCodeLanguageElement()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanWhitspaceToken: function() {
        var xsp = this.scanPosition;
        if (this.scanToken(this.tm.SPACE)) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.TAB)) {
                return true;
            }
        }
        return false;
    },

    scanFencedCodeBlock: function() {
        if (this.scanToken(this.tm.BACKTICK) || this.scanToken(this.tm.BACKTICK) || this.scanToken(this.tm.BACKTICK)) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanToken(this.tm.BACKTICK)) {
                this.scanPosition = xsp;
                break;
            }
        }
        if (this.scanWhitspaceTokens()) {
            return true;
        }
        xsp = this.scanPosition;
        if (this.scanForCodeLanguageElements()) {
            this.scanPosition = xsp;
        }
        xsp = this.scanPosition;
        if (this.scanToken(this.tm.EOL) || this.scanWhitspaceTokens()) {
            this.scanPosition = xsp;
        }
        return false;
    },

    scanBlockQuoteEmptyLines: function() {
        return this.scanBlockQuoteEmptyLine() || this.scanToken(EOL);
    },

    scanBlockQuoteEmptyLine: function() {
        if (this.scanToken(this.tm.EOL) || this.scanWhitspaceTokens() || this.scanToken(this.tm.GT) || this.scanWhitspaceTokens()) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanToken(this.tm.GT) || scanWhitspaceTokens()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanForHeadersigns: function() {
        if (this.scanToken(this.tm.EQ)) {
            return true;
        }
        var xsp;
        while (true) {
            xsp = this.scanPosition;
            if (this.scanToken(this.tm.EQ)) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanMoreBlockElements: function() {
        var xsp = this.scanPosition;
        this.lookingAhead = true;
        this.semanticLookAhead = this.headingAhead(1);
        this.lookingAhead = false;
        if (!this.semanticLookAhead || this.scanForHeadersigns()) {
            this.scanPosition = xsp;
            if (this.scanToken(this.tm.GT)) {
                this.scanPosition = xsp;
                if (this.scanToken(this.tm.DASH)) {
                    this.scanPosition = xsp;
                    if (scanToken(DIGITS) || scanToken(DOT)) {
                        this.scanPosition = xsp;
                        if (scanFencedCodeBlock()) {
                            this.scanPosition = xsp;
                            return this.scanParagraph();
                        }
                    }
                }
            }
        }
        return false;
    },

    scanToken: function(kind) {
        if (this.scanPosition == this.lastPosition) {
            this.lookAhead--;
            if (this.scanPosition.next == null) {
                this.lastPosition = this.scanPosition = this.scanPosition.next = this.tm.getNextToken();
            } else {
                this.lastPosition = this.scanPosition = this.scanPosition.next;
            }
        } else {
            this.scanPosition = this.scanPosition.next;
        }
        if (this.scanPosition.kind != kind) {
            return true;
        }
        if (this.lookAhead == 0 && this.scanPosition == this.lastPosition) {
            throw this.lookAheadSuccess;
        }
	    return false;
    },

    getNextTokenKind: function() {
    	if (this.nextTokenKind != -1) {
            return this.nextTokenKind;
        } else if ((this.nextToken = this.token.next) == null) {
        	this.token.next = this.tm.getNextToken();
            return (this.nextTokenKind = this.token.next.kind);
        }
        return (this.nextTokenKind = this.nextToken.kind);
    },

    consumeToken: function(kind) {
        old = this.token;
        if (this.token.next != null) {
            this.token = this.token.next;
        } else {
            this.token = this.token.next = this.tm.getNextToken();
        }
        this.nextTokenKind = -1;
        if (this.token.kind == kind) {
            return this.token;
        }
        this.token = old;
        return this.token;
    },

    getToken: function(index) {
        t = this.lookingAhead ? this.scanPosition : this.token;
        for (var i = 0; i < index; i++) {
            if (t.next != null) {
                t = t.next;
            } else {
                t = t.next = this.tm.getNextToken();
            }
        }
        return t;
    }

}

koara.Token = function(kind, beginLine, beginColumn, endLine, endColumn, image) {
	this.kind = kind;
	this.beginLine = beginLine;
	this.beginColumn = beginColumn;
    this.endLine = endLine;
	this.endColumn = endColumn;
	this.image = image;
}

koara.Token.prototype = {
	constructor: koara.Token
}
koara.TokenManager = function(stream) {
	this.cs = stream;
	this.jjrounds = [];
	this.jjstateSet = [];
	this.jjnextStates = [2, 3, 5];
}

koara.TokenManager.prototype = {
	constructor: koara.TokenManager,
	
	EOF: 0,
	ASTERISK: 1,
	BACKSLASH: 2,
	BACKTICK: 3,
	CHAR_SEQUENCE: 4,
	COLON: 5,
	DASH: 6,
	DIGITS: 7,
	DOT: 8,
	EOL: 9,
	EQ: 10,
	ESCAPED_CHAR: 11,
	GT: 12,
	IMAGE_LABEL: 13,
	LBRACK: 14,
	LPAREN: 15,
	LT: 16,
	RBRACK: 17,
	RPAREN: 18,
	SPACE: 19,
	TAB: 20,
	UNDERSCORE: 21,
	
    getNextToken: function() {
        try {
            var curPos = 0;
            while (true) {
                try {
                    this.curChar = this.cs.beginToken();
                } catch (e) {
                    this.matchedKind = 0;
                    this.matchedPos = -1;
                    return this.fillToken();
                }

                this.matchedKind = 2147483647;
                this.matchedPos = 0;
                curPos = this.moveStringLiteralDfa0_0();

                if (this.matchedKind != 2147483647) {
                    if (this.matchedPos + 1 < curPos) {
                        this.cs.backup(curPos - this.matchedPos - 1);
                    }
                    return this.fillToken();
                }
            }
        } catch (e) {
            return null;
        }
    },

    fillToken: function() {
        return new koara.Token(this.matchedKind, this.cs.getBeginLine(), this.cs.getBeginColumn(), this.cs.getEndLine(), this.cs.getEndColumn(),
                this.cs.getImage());
    },

    moveStringLiteralDfa0_0: function() {
        switch (this.curChar.charCodeAt(0)) {
        case 9: return this.startNfaWithStates(0, this.TAB, 8);
        case 32: return this.startNfaWithStates(0, this.SPACE, 8);
        case 40: return this.stopAtPos(0, this.LPAREN);
        case 41: return this.stopAtPos(0, this.RPAREN);
        case 42: return this.stopAtPos(0, this.ASTERISK);
        case 45: return this.stopAtPos(0, this.DASH);
        case 46: return this.stopAtPos(0, this.DOT);
        case 58: return this.stopAtPos(0, this.COLON);
        case 60: return this.stopAtPos(0, this.LT);
        case 61: return this.stopAtPos(0, this.EQ);
        case 62: return this.stopAtPos(0, this.GT);
        case 73: return this.moveStringLiteralDfa1_0(0x2000);
        case 91: return this.stopAtPos(0, this.LBRACK);
        case 92: return this.startNfaWithStates(0, this.BACKSLASH, 7);
        case 93: return this.stopAtPos(0, this.RBRACK);
        case 95: return this.stopAtPos(0, this.UNDERSCORE);
        case 96: return this.stopAtPos(0, this.BACKTICK);
        case 105: return this.moveStringLiteralDfa1_0(0x2000);
        default: return this.moveNfa(6, 0);
        }
    },

    startNfaWithStates: function(pos, kind, state) {
        this.matchedKind = kind;
        this.matchedPos = pos;
        try {
            this.curChar = this.cs.readChar();
        } catch (e) {
            return pos + 1;
        }
        return this.moveNfa(state, pos + 1);
    },

    stopAtPos: function(pos, kind) {
        this.matchedKind = kind;
        this.matchedPos = pos;
        return pos + 1;
    },

    moveStringLiteralDfa1_0: function(active) {
    	this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) == 77 || this.curChar.charCodeAt(0) == 109) {
            return this.moveStringLiteralDfa2_0(active, 0x2000);
        }
        return this.startNfa(0, active);
    },

    moveStringLiteralDfa2_0: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) == 65 || this.curChar.charCodeAt(0) == 97) {
            return this.moveStringLiteralDfa3_0(active, 0x2000);
        }
        return this.startNfa(1, active);

    },

    moveStringLiteralDfa3_0: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) == 71 || this.curChar.charCodeAt(0) == 103) {
            return this.moveStringLiteralDfa4_0(active, 0x2000);
        }
        return this.startNfa(2, active);
    },

    moveStringLiteralDfa4_0: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) == 69 || this.curChar.charCodeAt(0) == 101) {
            return this.moveStringLiteralDfa5_0(active, 0x2000);
        }
        return this.startNfa(3, active);
    },

    moveStringLiteralDfa5_0: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) == 58 && ((active & 0x2000) != 0)) {
            return this.stopAtPos(5, 13);
        }
        return this.startNfa(4, active);
    },

    startNfa: function(pos, active) {
        return this.moveNfa(this.stopStringLiteralDfa(pos, active), pos + 1);
    },

    moveNfa: function(startState, curPos) {
    	var startsAt = 0;
        this.jjnewStateCnt = 8;
        var i = 1;
        this.jjstateSet[0] = startState;
        var kind = 0x7fffffff;
        while (true) {
            if (++this.round == 0x7fffffff) {
                this.round = 0x80000001;
            }            
            if (this.curChar.charCodeAt(0) < 64) {
                var l = 1 << this.curChar.charCodeAt(0);
                do {
                    switch (this.jjstateSet[--i]) {
                    case 6:
                        if ((0x880098feffffd9ff & l) != 0) {
                            if (kind > 4) {
                                kind = 4;
                            }
                            this.checkNAdd(0);
                        } else if ((0x3ff000000000000 & l) != 0) {
                            if (kind > 7) {
                                kind = 7;
                            }
                            this.checkNAdd(1);
                        } else if ((0x2400 & l) != 0) {
                            if (kind > 9) {
                                kind = 9;
                            }
                        } else if ((0x100000200 & l) != 0) {
                            this.checkNAddStates(0, 2);
                        }
                        if (this.curChar.charCodeAt(0) == 13) {
                            this.jjstateSet[this.jjnewStateCnt++] = 4;
                        }
                        break;
                    case 8:
                        if ((0x2400 & l) != 0) {
                            if (kind > 9) {
                                kind = 9;
                            }
                        } else if ((0x100000200 & l) != 0) {
                            this.checkNAddStates(0, 2);
                        }
                        if (this.curChar.charCodeAt(0) == 13) {
                            this.jjstateSet[this.jjnewStateCnt++] = 4;
                        }
                        break;
                    case 0:
                        if ((0x880098feffffd9ff & l) != 0) {
                            kind = 4;
                            this.checkNAdd(0);
                        }
                        break;
                    case 1:
                        if ((0x3ff000000000000 & l) != 0) {
                            if (kind > 7) {
                                kind = 7;
                            }
                            this.checkNAdd(1);
                        }
                        break;
                    case 2:
                        if ((0x100000200 & l) != 0) {
                            this.checkNAddStates(0, 2);
                        }
                        break;
                    case 3:
                        if ((0x2400 & l) != 0 && kind > 9) {
                            kind = 9;
                        }
                        break;
                    case 4:
                        if (this.curChar.charCodeAt(0) == 10 && kind > 9) {
                            kind = 9;
                        }
                        break;
                    case 5:
                        if (this.curChar.charCodeAt(0) == 13) {
                            this.jjstateSet[this.jjnewStateCnt++] = 4;
                        }
                        break;
                    case 7:
                        if ((0x77ff670000000000 & l) != 0 && kind > 11) {
                            kind = 11;
                        }
                        break;
                    }
                } while (i != startsAt);
            } else if (this.curChar.charCodeAt(0) < 128) {
            	var l = (1 << (this.curChar.charCodeAt(0) & 077));
            	
                do {
                    switch (this.jjstateSet[--i]) {
                    case 6:
                        if (l != 0) {
                            if (kind > 4) {
                                kind = 4;
                            }
                            this.checkNAdd(0);
                        } else if (this.curChar.charCodeAt(0) == 92) {
                            this.jjstateSet[this.jjnewStateCnt++] = 7;
                        }
                        break;
                    case 0: 
                        if ((-7381975041 & l) != 0) {
                            kind = 4;
                            this.checkNAdd(0);
                        }
                        break;
                    case 7:
                        if ((0x1b8000000 & l) != 0 && kind > 11) {
                            kind = 11;
                        }
                        break;
                    }
                } while (i != startsAt);
            } else {
                do {
                    switch (this.jjstateSet[--i]) {
                    case 6:
                    case 0:
                        if (kind > 4) {
                            kind = 4;
                        }
                        this.checkNAdd(0);
                        break;
                    }
                } while (i != startsAt);
            }
            
            if (kind != 0x7fffffff) {
                this.matchedKind = kind;
                this.matchedPos = curPos;
                kind = 0x7fffffff;
            }
            ++curPos;
            
            if ((i = this.jjnewStateCnt) == (startsAt = 8 - (this.jjnewStateCnt = startsAt))) {
                return curPos;
            }
            try {
                this.curChar = this.cs.readChar();
            } catch (e) {
                return curPos;
            }
          }
      },

    checkNAddStates: function(start, end) {
        do {
            this.checkNAdd(this.jjnextStates[start]);
        } while (start++ != end);
    },

    checkNAdd: function(state) {
        if (this.jjrounds[state] != this.round) {
            this.jjstateSet[this.jjnewStateCnt++] = state;
            this.jjrounds[state] = this.round;
        }
    },

    stopStringLiteralDfa: function(pos, active) {
        if (pos == 0) {
            if ((active & 0x2000) != 0) {
                this.matchedKind = 4;
                return 0;
            } else if ((active & 0x180000) != 0) {
                return 8;
            } else if ((active & 0x4) != 0) {
                return 7;
            }
        } else if (pos == 1 && (active & 0x2000) != 0) {
            this.matchedKind = 4;
            this.matchedPos = 1;
            return 0;
        } else if (pos == 2 && (active & 0x2000) != 0) {
            this.matchedKind = 4;
            this.matchedPos = 2;
            return 0;
        } else if (pos == 3 && (active & 0x2000) != 0) {
            this.matchedKind = 4;
            this.matchedPos = 3;
            return 0;
        } else if (pos == 4 && (active & 0x2000) != 0) {
            this.matchedKind = 4;
            this.matchedPos = 4;
            return 0;
        }
        return -1;
    }

}

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
		this.currentMark = this.marks.pop(); // currentMark = marks.remove(marks.size() - 1);
		while (a-- > 0) {
          c = this.popNode();
          c.parent = n;
          n.add(c);
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
    	--this.nodesOnStack;
    	return this.nodes.pop();
    },
    
    pushNode: function(n) {
    	this.nodes.push(n);
    	 ++this.nodesOnStack;
    }
		
}

