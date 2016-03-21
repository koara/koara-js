(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib/koara");

},{"./lib/koara":2}],2:[function(require,module,exports){
"use strict";

var used = [],
    exports = module.exports = {};

exports.CharStream = require("./koara/charstream");
exports.Parser = require("./koara/parser");
exports.StringReader = require("./koara/io/stringreader");

},{"./koara/charstream":20,"./koara/io/stringreader":21,"./koara/parser":23}],3:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Document() {
    Node.call(this);
}

Document.prototype = new Node();
Document.prototype.constructor = Document;
Document.prototype.accept = function(renderer) {
    renderer.visitDocument(this);
};

module.exports = Document;

},{"./node":16}],4:[function(require,module,exports){
"use strict";

var Node = require("./node");
var Document = require("./document");

function BlockElement() {
    Node.call(this);
}

BlockElement.prototype = new Node();
BlockElement.prototype.constructor = BlockElement;

BlockElement.prototype.isNested = function() {
	return !(this.parent.constructor.name === "Document");
};

BlockElement.prototype.isSingleChild = function() {
	return this.parent.children.length === 1;
};

BlockElement.prototype.accept = function(renderer) {
    renderer.visitBlockElement(this);
};

module.exports = BlockElement;

},{"./document":8,"./node":16}],5:[function(require,module,exports){
"use strict";

var BlockElement = require("./blockelement");

function BlockQuote() {
	BlockElement.call(this);
}

BlockQuote.prototype = new BlockElement();
BlockQuote.prototype.constructor = BlockQuote;

BlockQuote.prototype.accept = function(renderer) {
    renderer.visitBlockQuote(this);
};

module.exports = BlockQuote;

},{"./blockelement":4}],6:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Code() {
	Node.call(this);
}

Code.prototype = new Node();
Code.prototype.constructor = Code;

Code.prototype.accept = function(renderer) {
	renderer.visitCode(this);
};

module.exports = Code;

},{"./node":16}],7:[function(require,module,exports){
"use strict";

var BlockElement = require("./blockelement");

function CodeBlock() {
	BlockElement.call(this);
}

CodeBlock.prototype = new BlockElement();
CodeBlock.prototype.constructor = CodeBlock;

CodeBlock.prototype.accept = function(renderer) {
	renderer.visitCodeBlock(this);
};

module.exports = CodeBlock;

},{"./blockelement":4}],8:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Document() {
    Node.call(this);
}

Document.prototype = new Node();
Document.prototype.constructor = Document;
Document.prototype.accept = function(renderer) {
    renderer.visitDocument(this);
};

module.exports = Document;

},{"./node":16}],9:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Em() {
	Node.call(this);
}

Em.prototype = new Node();
Em.prototype.constructor = Em;

Em.prototype.accept = function(renderer) {
	renderer.visitEm(this);
};

module.exports = Em;

},{"./node":16}],10:[function(require,module,exports){
"use strict";

var BlockElement = require("./blockelement");

function Heading() {
	BlockElement.call(this);
}

Heading.prototype = new BlockElement();
Heading.prototype.constructor = Heading;

Heading.prototype.accept = function(renderer) {
    renderer.visitHeading(this);
};

module.exports = Heading;

},{"./blockelement":4}],11:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Image() {
	Node.call(this);
}

Image.prototype = new Node();
Image.prototype.constructor = Image;

Image.prototype.accept = function(renderer) {
	renderer.visitImage(this);
};

module.exports = Image;

},{"./node":16}],12:[function(require,module,exports){
"use strict";

var Node = require("./node");

function LineBreak() {}
LineBreak.prototype = new Node();
LineBreak.prototype.constructor = LineBreak;

LineBreak.prototype.accept = function(renderer) {
	renderer.visitLineBreak(this);
};

module.exports = LineBreak;

},{"./node":16}],13:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Link() {
	Node.call(this);
}

Link.prototype = new Node();
Link.prototype.constructor = Link;

Link.prototype.accept = function(renderer) {
	renderer.visitLink(this);
};

module.exports = Link;

},{"./node":16}],14:[function(require,module,exports){
"use strict";

var BlockElement = require("./blockelement");

function ListBlock(ordered) {
	BlockElement.call(this);
	this.ordered = ordered;
}

ListBlock.prototype = new BlockElement();
ListBlock.prototype.constructor = ListBlock;

ListBlock.prototype.accept = function(renderer) {
	renderer.visitListBlock(this);
};

module.exports = ListBlock;

},{"./blockelement":4}],15:[function(require,module,exports){
"use strict";

var Node = require("./node");

function ListItem() {
	Node.call(this);
}

ListItem.prototype = new Node();
ListItem.prototype.constructor = ListItem;

ListItem.prototype.accept = function(renderer) {
	renderer.visitListItem(this);
};

module.exports = ListItem;

},{"./node":16}],16:[function(require,module,exports){
"use strict";

function Node() {
	this.children = [];
}

Node.prototype = {
	constructor: Node,

	add: function(n, i) {
		this.children[i] = n;
	},

	childrenAccept: function(renderer) {
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].accept(renderer);
		}
	}

};

module.exports = Node;

},{}],17:[function(require,module,exports){
"use strict";

var BlockElement = require("./blockelement");

function Paragraph() {
	BlockElement.call(this);
}

Paragraph.prototype = new BlockElement();
Paragraph.prototype.constructor = Paragraph;

Paragraph.prototype.accept = function(renderer) {
    renderer.visitParagraph(this);
};

module.exports = Paragraph;

},{"./blockelement":4}],18:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Strong() {
	Node.call(this);
}

Strong.prototype = new Node();
Strong.prototype.constructor = Strong;

Strong.prototype.accept = function(renderer) {
	renderer.visitStrong(this);
};

module.exports = Strong;

},{"./node":16}],19:[function(require,module,exports){
"use strict";

var Node = require("./node");

function Text() {
    Node.call(this);
}

Text.prototype = new Node();
Text.prototype.constructor = Text;

Text.prototype.accept = function(renderer) {
	renderer.visitText(this);
};

module.exports = Text;

},{"./node":16}],20:[function(require,module,exports){
"use strict";

function CharStream(reader) {
	this.available = 4096;
	this.bufsize = 4096;
	this.tokenBegin = 0;
	this.bufcolumn = [];
	this.bufpos = -1;
	this.bufline = [];
	this.column = 0;
	this.line = 1;
	this.prevCharIsLF = false;
	this.reader = reader;
	this.buffer = [];
	this.maxNextCharInd = 0;
	this.inBuf = 0;
	this.tabSize = 4;
}

CharStream.prototype = {
	constructor: CharStream,

	beginToken: function() {
		this.tokenBegin = -1;
		var c = this.readChar();

		this.tokenBegin = this.bufpos;
		return c;
	},

	readChar: function() {
		if (this.inBuf > 0) {
			--this.inBuf;
			if (++this.bufpos === this.bufsize) {
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
		if (this.maxNextCharInd === this.available) {
			if (this.available === this.bufsize) {
				this.bufpos = 0;
				this.maxNextCharInd = 0;
				if (this.tokenBegin > 2048) {
					this.available = this.tokenBegin;
				}
			} else {
				this.available = this.bufsize;
			}
		}
        var i = 0;

		try {
			if ((i = this.reader.read(this.buffer, this.maxNextCharInd, this.available - this.maxNextCharInd)) === -1) {
				throw new Error("IOException");
			} else {
				this.maxNextCharInd += i;
			}
		} catch (e) {
			--this.bufpos;
			this.backup(0);
			if (this.tokenBegin === -1) {
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
		case "\n":
			this.prevCharIsLF = true;
			break;
		case "\t":
			this.column--;
			this.column += this.tabSize - this.column % this.tabSize;
			break;
		default:
			break;
		}
		this.bufline[this.bufpos] = this.line;
		this.bufcolumn[this.bufpos] = this.column;
	},

	getImage: function() {
			if (this.bufpos >= this.tokenBegin) {
				return this.buffer.slice(this.tokenBegin, this.bufpos + 1).join("");
			}
			return this.buffer.slice(this.tokenBegin, this.bufsize).join("") +
                this.buffer.slice(0, this.bufpos + 1).join("");
	},

	getEndColumn: function() {
		return this.tokenBegin in this.bufcolumn ? this.bufcolumn[this.bufpos] : 0;
	},

	getEndLine: function() {
		return this.tokenBegin in this.bufline ? this.bufline[this.bufpos] : 0;
	},

	getBeginColumn: function() {
		return this.bufpos in this.bufcolumn ? this.bufcolumn[this.tokenBegin] : 0;
	},

	getBeginLine: function() {
		return this.bufpos in this.bufline ? this.bufline[this.tokenBegin] : 0;
	}

};

module.exports = CharStream;

},{}],21:[function(require,module,exports){
"use strict";

function StringReader(text) {
	this.index = 0;
	this.text = text;
}

StringReader.prototype = {
	constructor: StringReader,

	read: function(buffer, offset, length) {
		if (this.text.toString().substring(this.index).length > 0) {
			var charactersRead = 0;

			for (var i = 0; i < length; i++) {
				var start = this.index + i;
				var c = this.text.toString().substring(start, start + 1);

				if (c !== "") {
					buffer[offset + i] = c;
					charactersRead++;
				}
			}
			this.index += length;
			return charactersRead;
		}
		return -1;
	}
};

module.exports = StringReader;

},{}],22:[function(require,module,exports){
"use strict";

function LookaheadSuccess() {}

module.exports = LookaheadSuccess;

},{}],23:[function(require,module,exports){
"use strict";

var LookaheadSuccess = require("./lookaheadsuccess");
var StringReader = require("./io/stringreader");
var CharStream = require("./charstream");
var TokenManager = require("./tokenmanager");
var Token = require("./token");
var TreeState = require("./treestate");

var Document = require("./ast/Document");
var BlockQuote = require("./ast/blockquote");
var Code = require("./ast/code");
var CodeBlock = require("./ast/codeblock");
var Em = require("./ast/em");
var Heading = require("./ast/heading");
var Image = require("./ast/image");
var LineBreak = require("./ast/linebreak");
var Link = require("./ast/link");
var ListBlock = require("./ast/listblock");
var ListItem = require("./ast/listitem");
var Paragraph = require("./ast/paragraph");
var Strong = require("./ast/strong");
var Text = require("./ast/text");

function Parser() {
	this.lookAheadSuccess = new LookaheadSuccess();
	this.modules = ["paragraphs", "headings", "lists", "links", "images", "formatting", "blockquotes", "code"];
	this.currentBlockLevel = 0;
	this.currentQuoteLevel = 0;
}

Parser.prototype = {
	constructor: Parser,

	parse: function(text) {
		return this.parseReader(new StringReader(text));
	},

	parseReader: function(reader) {
		this.cs = new CharStream(reader);
		this.tm = new TokenManager(this.cs);
		this.token = new Token();
		this.tree = new TreeState();
		this.nextTokenKind = -1;

		var document = new Document();

		this.tree.openScope();

		while (this.getNextTokenKind() === this.tm.EOL) {
			this.consumeToken(this.tm.EOL);
		}
		this.whiteSpace();
		if (this.hasAnyBlockElementsAhead()) {
			this.blockElement();
			while (this.blockAhead(0)) {
				while (this.getNextTokenKind() === this.tm.EOL) {
                    this.consumeToken(this.tm.EOL);
                    this.whiteSpace();
				}
                this.blockElement();
              }
              while (this.getNextTokenKind() === this.tm.EOL) {
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
        } else if (this.modules.indexOf("blockquotes") >= 0 && this.getNextTokenKind() === this.tm.GT) {
          this.blockQuote();
        } else if (this.modules.indexOf("lists") >= 0 && this.getNextTokenKind() === this.tm.DASH) {
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
        var heading = new Heading();

        this.tree.openScope();
        var headingLevel = 0;

        while (this.getNextTokenKind() === this.tm.EQ) {
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
        var blockQuote = new BlockQuote();

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
                while (this.getNextTokenKind() === this.tm.EOL) {
                    this.consumeToken(this.tm.EOL);
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
        this.tree.closeScope(blockQuote);
      },

      blockQuotePrefix: function() {
        var i = 0;

        do {
            this.consumeToken(this.tm.GT);
            this.whiteSpace();
        } while (++i < this.currentQuoteLevel);
      },

      blockQuoteEmptyLine: function() {
          this.consumeToken(this.tm.EOL);
          this.whiteSpace();
          do {
              this.consumeToken(this.tm.GT);
              this.whiteSpace();
          } while (this.getNextTokenKind() === this.tm.GT);
      },

      unorderedList: function() {
          var list = new ListBlock(false);

          this.tree.openScope();
          var listBeginColumn = this.unorderedListItem();

          while (this.listItemAhead(listBeginColumn, false)) {
              while (this.getNextTokenKind() === this.tm.EOL) {
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

          var t = this.consumeToken(this.tm.DASH);

          this.whiteSpace();
          if (this.listItemHasInlineElements()) {
              this.blockElement();
              while (this.blockAhead(t.beginColumn)) {
                 while (this.getNextTokenKind() === this.tm.EOL) {
                     this.consumeToken(this.tm.EOL);
                     this.whiteSpace();
                     if (this.currentQuoteLevel > 0) {
                         this.blockQuotePrefix();
                     }
                 }
                 this.blockElement();
              }
          }
          this.tree.closeScope(listItem);
          return t.beginColumn;
      },

      orderedList: function() {
        var list = new ListBlock(true);

        this.tree.openScope();
        var listBeginColumn = this.orderedListItem();

        while (this.listItemAhead(listBeginColumn, true)) {
            while (this.getNextTokenKind() === this.tm.EOL) {
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
        var listItem = new ListItem();

        this.tree.openScope();
        var t = this.consumeToken(this.tm.DIGITS);

        this.consumeToken(this.tm.DOT);
        this.whiteSpace();
        if (this.listItemHasInlineElements()) {
            this.blockElement();
            while (this.blockAhead(t.beginColumn)) {
                while (this.getNextTokenKind() === this.tm.EOL) {
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
        this.tree.closeScope(listItem);
        return t.beginColumn;
    },

    fencedCodeBlock: function() {
        var codeBlock = new CodeBlock();
        var s = "";

        this.tree.openScope();
        var beginColumn = this.consumeToken(this.tm.BACKTICK).beginColumn;

        do {
            this.consumeToken(this.tm.BACKTICK);
        } while (this.getNextTokenKind() === this.tm.BACKTICK);
            this.whiteSpace();
            if (this.getNextTokenKind() === this.tm.CHAR_SEQUENCE) {
                codeBlock.language = this.codeLanguage();
            }
            if (this.getNextTokenKind() !== this.tm.EOF && !this.fencesAhead()) {
                this.consumeToken(this.tm.EOL);
                this.levelWhiteSpace(beginColumn);
            }

            while (this.getNextTokenKind() !== this.tm.EOF && (this.getNextTokenKind() !== this.tm.EOL || !this.fencesAhead())) {
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
                                this.consumeToken(this.tm.TAB);
                                s += "    ";
                                break;
                            }
                        } else if (!this.fencesAhead()) {
                            this.consumeToken(this.tm.EOL);
                            s += "\n";
                            this.levelWhiteSpace(beginColumn);
                        }
            }
        }
        if (this.fencesAhead()) {
            this.consumeToken(this.tm.EOL);
            this.whiteSpace();
            while (this.getNextTokenKind() === this.tm.BACKTICK) {
                this.consumeToken(this.tm.BACKTICK);
            }
        }
        codeBlock.value = s.toString();
        this.tree.closeScope(codeBlock);
    },

    paragraph: function() {
        var paragraph = this.modules.indexOf("paragraphs") >= 0 ? new Paragraph() : new BlockElement();

        this.tree.openScope();
        this.inline();
        while (this.textAhead()) {
            this.lineBreak();
            this.whiteSpace();
            if (this.modules.indexOf("blockquotes") >= 0) {
                while (this.getNextTokenKind() === this.tm.GT) {
                    this.consumeToken(this.tm.GT);
                    this.whiteSpace();
                }
            }
            this.inline();
        }
        this.tree.closeScope(paragraph);
    },

    text: function() {
        var text = new Text();
        var s = "";

        this.tree.openScope();
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
                s += this.consumeToken(this.tm.RBRACK).image;
                break;
            case this.tm.RPAREN:
                s += this.consumeToken(this.tm.RPAREN).image;
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
        var image = new Image();
        var ref = "";

        this.tree.openScope();
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
        var ref = "";

        this.tree.openScope();
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
        this.tree.closeScope(link);
    },

    strong: function() {
        var strong = new Strong();

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
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.UNDERSCORE));
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
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
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
        var s = "";

        this.tree.openScope();

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
        } while (this.codeTextHasAnyTokenAhead());
        text.value = s;
        this.tree.closeScope(text);
    },

   looseChar: function() {
        var text = new Text();

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
        while (this.getNextTokenKind() === this.tm.SPACE || this.getNextTokenKind() === this.tm.TAB) {
            this.consumeToken(this.getNextTokenKind());
        }
        this.consumeToken(this.tm.EOL);
        this.tree.closeScope(linebreak);
    },

    levelWhiteSpace: function(threshold) {
        var currentPos = 1;

        while (this.getNextTokenKind() === this.tm.GT) {
            this.consumeToken(this.getNextTokenKind());
        }
        while ((this.getNextTokenKind() === this.tm.SPACE || this.getNextTokenKind() === this.tm.TAB) && currentPos < threshold - 1) {
            currentPos = this.consumeToken(this.getNextTokenKind()).beginColumn;
        }
    },

    codeLanguage: function() {
        var s = "";

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
                s += this.consumeToken(this.tm.SPACE).image;
                break;
            case this.tm.TAB:
                s += "    ";
                break;
            default:
                break;
            }
          } while (this.getNextTokenKind() !== this.tm.EOL && this.getNextTokenKind() !== this.tm.EOF);
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
          this.tree.openScope();
          var text = new Text();
          var s = "";

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
                if (!this.nextAfterSpace([this.tm.RBRACK])) {
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
          var s = "";

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
                if (!this.nextAfterSpace([this.tm.RPAREN])) {
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
          this.tree.closeScope(strong);
      },

      strongMultilineContent: function() {
        do {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
                this.code();
            } else if (this.hasEmWithinStrongMultiline()) {
                this.emWithinStrongMultiline();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.UNDERSCORE));
                    break;
                }
            }
        } while (this.strongMultilineHasElementsAhead());
      },

      strongWithinEmMultiline: function() {
        var strong = new Strong();

        this.tree.openScope();
        this.consumeToken(this.tm.ASTERISK);
        this.strongWithinEmMultilineContent();
        while (this.textAhead()) {
            this.lineBreak();
            this.strongWithinEmMultilineContent();
        }
        this.consumeToken(this.tm.ASTERISK);
        this.tree.closeScope(strong);
      },

      strongWithinEmMultilineContent: function() {
        do {
            if (this.hasTextAhead()) {
                this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
                this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.UNDERSCORE));
                    break;
                }
            }
        } while (this.strongWithinEmMultilineHasElementsAhead());
      },

      strongWithinEm: function() {
        var strong = new Strong();

        this.tree.openScope();
        this.consumeToken(this.tm.ASTERISK);
        do {
            if (this.hasTextAhead()) {
               this.text();
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
               this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
               this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
               this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                case this.tm.UNDERSCORE:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.UNDERSCORE));
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
            } else if (this.modules.indexOf("images") >= 0 && this.hasImageAhead()) {
                this.image();
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.multilineAhead(this.tm.BACKTICK)) {
                this.codeMultiline();
            } else if (this.hasStrongWithinEmMultilineAhead()) {
                this.strongWithinEmMultiline();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.ASTERISK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
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
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
                this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.ASTERISK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
                    break;
                }
            }
        } while (this.emWithinStrongMultilineContentHasElementsAhead());
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
            } else if (this.modules.indexOf("links") >= 0 && this.hasLinkAhead()) {
                this.link();
            } else if (this.modules.indexOf("code") >= 0 && this.hasCodeAhead()) {
                this.code();
            } else {
                switch (this.getNextTokenKind()) {
                case this.tm.ASTERISK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.ASTERISK));
                    break;
                case this.tm.BACKTICK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.BACKTICK));
                    break;
                case this.tm.LBRACK:
                    this.tree.addSingleValue(new Text(), this.consumeToken(this.tm.LBRACK));
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
            while (this.getNextTokenKind() === this.tm.GT) {
                this.consumeToken(this.tm.GT);
                this.whiteSpace();
            }
            this.codeText();
        }
        this.consumeToken(this.tm.BACKTICK);
        this.tree.closeScope(code);
    },

    whiteSpace: function() {
        while (this.getNextTokenKind() === this.tm.SPACE || this.getNextTokenKind() === this.tm.TAB) {
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
        var quoteLevel = 0;

        if (this.getNextTokenKind() === this.tm.EOL) {
            var t = null;
            var i = 2;

            quoteLevel = 0;
            do {
                quoteLevel = 0;
                do {
                    t = this.getToken(i++);
                    if (t.kind === this.tm.GT) {
                        if (t.beginColumn === 1 && this.currentBlockLevel > 0 && this.currentQuoteLevel === 0) {
                            return false;
                        }
                        quoteLevel++;
                    }
                } while (t.kind === this.tm.GT || t.kind === this.tm.SPACE || t.kind === this.tm.TAB);
                if (quoteLevel > this.currentQuoteLevel) {
                    return true;
                }
                if (quoteLevel < this.currentQuoteLevel) {
                    return false;
                }
            } while (t.kind === this.tm.EOL);
            return t.kind !== this.tm.EOF && (this.currentBlockLevel === 0 || t.beginColumn >= blockBeginColumn + 2);
        }
        return false;
    },

    multilineAhead: function(token) {
        if (this.getNextTokenKind() === token && this.getToken(2).kind !== token && this.getToken(2).kind !== this.tm.EOL) {
            for (var i = 2; ; i++) {
                var t = this.getToken(i);

                if (t.kind === token) {
                    return true;
                } else if (t.kind === this.tm.EOL) {
                    i = this.skip(i + 1, [this.tm.SPACE, this.tm.TAB]);
                    var quoteLevel = this.newQuoteLevel(i);

                    if (quoteLevel === this.currentQuoteLevel) {
                        i = this.skip(i, [this.tm.SPACE, this.tm.TAB, this.tm.GT]);
                        if (this.getToken(i).kind === token || this.getToken(i).kind === this.tm.EOL || this.getToken(i).kind === this.tm.DASH ||
                            (this.getToken(i).kind === this.tm.DIGITS && this.getToken(i + 1).kind === this.tm.DOT) ||
                            (this.getToken(i).kind === this.tm.BACKTICK && this.getToken(i + 1).kind === this.tm.BACKTICK &&
                            this.getToken(i + 2).kind === this.tm.BACKTICK) || this.headingAhead(i)) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else if (t.kind === this.tm.EOF) {
                    return false;
                }
            }
        }
        return false;
    },

    fencesAhead: function() {
        if (this.getNextTokenKind() === this.tm.EOL) {
            var i = this.skip(2, [this.tm.SPACE, this.tm.TAB, this.tm.GT]);

            if (this.getToken(i).kind === this.tm.BACKTICK && this.getToken(i + 1).kind === this.tm.BACKTICK && this.getToken(i + 2).kind === this.tm.BACKTICK) {
                i = this.skip(i + 3, [this.tm.SPACE, this.tm.TAB]);
                return this.getToken(i).kind === this.tm.EOL || this.getToken(i).kind === this.tm.EOF;
            }
        }
        return false;
    },

    headingAhead: function(offset) {
        if (this.getToken(offset).kind === this.tm.EQ) {
            var heading = 1;

            for (var i = (offset + 1); ; i++) {
                if (this.getToken(i).kind !== this.tm.EQ) {
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
        if (this.getNextTokenKind() === this.tm.EOL) {
            for (var eol = 1, i = 2; ; i++) {
                var t = this.getToken(i);

                if (t.kind === this.tm.EOL && ++eol > 2) {
                    return false;
                } else if (t.kind !== this.tm.SPACE && t.kind !== this.tm.TAB && t.kind !== this.tm.GT && t.kind !== this.tm.EOL) {
                    if (ordered) {
                        return (t.kind === this.tm.DIGITS && this.getToken(i + 1).kind === this.tm.DOT && t.beginColumn >= listBeginColumn);
                    }
                    return t.kind === this.tm.DASH && t.beginColumn >= listBeginColumn;
                }
            }
        }
        return false;
    },

    textAhead: function() {
        if (this.getNextTokenKind() === this.tm.EOL && this.getToken(2).kind !== this.tm.EOL) {
            var i = this.skip(2, [this.tm.SPACE, this.tm.TAB]);
            var quoteLevel = this.newQuoteLevel(i);

            if (quoteLevel === this.currentQuoteLevel || !(this.modules.indexOf("blockquotes") >= 0)) {
                i = this.skip(i, [this.tm.SPACE, this.tm.TAB, this.tm.GT]);
                var t = this.getToken(i);

                return this.getToken(i).kind !== this.tm.EOL && !(this.modules.indexOf("lists") >= 0 && t.kind === this.tm.DASH) &&
                    !(this.modules.indexOf("lists") >= 0 && t.kind === this.tm.DIGITS && this.getToken(i + 1).kind === this.tm.DOT) &&
                    !(this.getToken(i).kind === this.tm.BACKTICK && this.getToken(i + 1).kind === this.tm.BACKTICK && this.getToken(i + 2).kind === this.tm.BACKTICK) &&
                    !(this.modules.indexOf("headings") >= 0 && this.headingAhead(i));
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

        for (var i = offset; ; i++) {
            var t = this.getToken(i);

            if (t.kind === this.tm.GT) {
                quoteLevel++;
            } else if (t.kind !== this.tm.SPACE && t.kind !== this.tm.TAB) {
                return quoteLevel;
            }

        }
    },

    skip: function(offset, tokens) {
        for (var i = offset; ; i++) {
            var t = this.getToken(i);

            if (tokens.indexOf(t.kind) === -1 || t.kind === this.tm.EOF) {
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
            return !this.scanResourceElement();
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
            return !this.scanEmWithinStrongMultilineContent();
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
                                        this.scanPosition = xsp;
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
        var xsp = null;

        if (this.scanText()) {
            return true;
        }
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
        var xsp = null;

        if (scanToken(this.tm.BACKTICK) || this.scanCodeTextTokensAhead()) {
            return true;
        }
        while (true) {
            xsp = this.scanPosition;
            if (this.hasCodeTextOnNextLineAhead()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return this.scanToken(BACKTICK);
    },

    scanCodeTextTokensAhead: function() {
        var xsp = null;

        if (this.scanCodeTextTokens()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanWhitespaceTokenBeforeEol()) {
           return true;
        }
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
        var xsp = null;

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
        var xsp = null;

        if (this.scanToken(this.tm.UNDERSCORE) || this.scanEmWithinStrongElements()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.UNDERSCORE) || this.scanEmElements()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanEmWithinStrongMultilineContent()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.UNDERSCORE) || this.hasNoEmWithinStrongMultilineContentAhead()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.ASTERISK) || this.scanStrongWithinEmElements()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.ASTERISK) || this.scanStrongElements()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanStrongWithinEmMultilineElements()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.ASTERISK) || this.scanForMoreStrongWithinEmMultilineElements()) {
            return true;
        }
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
        var xsp = null;

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
        return this.scanToken(this.tm.LPAREN) || this.scanWhitspaceTokens() || this.scanResourceTextElements() ||
            this.scanWhitspaceTokens() || this.scanToken(this.tm.RPAREN);
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
        var xsp = null;

        if (this.scanResourceElement()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.LBRACK) || this.scanWhitspaceTokens() || this.scanLinkElement()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.LBRACK) || this.scanWhitspaceTokens() || this.scanToken(this.tm.IMAGE_LABEL) || this.scanImageElement()) {
            return true;
        }
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
        var xsp = null;

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
        var xsp = null;

        if (this.scanForCodeLanguageElement()) {
            return true;
        }
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
        var xsp = null;

        if (this.scanToken(this.tm.BACKTICK) || this.scanToken(this.tm.BACKTICK) || this.scanToken(this.tm.BACKTICK)) {
            return true;
        }
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
        return this.scanBlockQuoteEmptyLine() || this.scanToken(this.tm.EOL);
    },

    scanBlockQuoteEmptyLine: function() {
        var xsp = null;

        if (this.scanToken(this.tm.EOL) || this.scanWhitspaceTokens() || this.scanToken(this.tm.GT) || this.scanWhitspaceTokens()) {
            return true;
        }
        while (true) {
            xsp = this.scanPosition;
            if (this.scanToken(this.tm.GT) || this.scanWhitspaceTokens()) {
                this.scanPosition = xsp;
                break;
            }
        }
        return false;
    },

    scanForHeadersigns: function() {
        var xsp = null;

        if (this.scanToken(this.tm.EQ)) {
            return true;
        }
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
                    if (this.scanToken(this.tm.DIGITS) || this.scanToken(this.tm.DOT)) {
                        this.scanPosition = xsp;
                        if (this.scanFencedCodeBlock()) {
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
        if (this.scanPosition === this.lastPosition) {
            this.lookAhead--;
            if (!this.scanPosition.next) {
                this.lastPosition = this.scanPosition = this.scanPosition.next = this.tm.getNextToken();
            } else {
                this.lastPosition = this.scanPosition = this.scanPosition.next;
            }
        } else {
            this.scanPosition = this.scanPosition.next;
        }
        if (this.scanPosition.kind !== kind) {
            return true;
        }
        if (this.lookAhead === 0 && this.scanPosition === this.lastPosition) {
            throw this.lookAheadSuccess;
        }
        return false;
    },

    getNextTokenKind: function() {
        if (this.nextTokenKind !== -1) {
            return this.nextTokenKind;
        } else if (!(this.nextToken = this.token.next)) {
            this.token.next = this.tm.getNextToken();
            return (this.nextTokenKind = this.token.next.kind);
        }
        return (this.nextTokenKind = this.nextToken.kind);
    },

    consumeToken: function(kind) {
        var old = this.token;

        if (this.token.next !== null) {
            this.token = this.token.next;
        } else {
            this.token = this.token.next = this.tm.getNextToken();
        }
        this.nextTokenKind = -1;
        if (this.token.kind === kind) {
            return this.token;
        }
        this.token = old;
        return this.token;
    },

    getToken: function(index) {
        var t = this.lookingAhead ? this.scanPosition : this.token;

        for (var i = 0; i < index; i++) {
            if (t.next) {
                t = t.next;
            } else {
                t = t.next = this.tm.getNextToken();
            }
        }
        return t;
    }

};

module.exports = Parser;

},{"./ast/Document":3,"./ast/blockquote":5,"./ast/code":6,"./ast/codeblock":7,"./ast/em":9,"./ast/heading":10,"./ast/image":11,"./ast/linebreak":12,"./ast/link":13,"./ast/listblock":14,"./ast/listitem":15,"./ast/paragraph":17,"./ast/strong":18,"./ast/text":19,"./charstream":20,"./io/stringreader":21,"./lookaheadsuccess":22,"./token":24,"./tokenmanager":25,"./treestate":26}],24:[function(require,module,exports){
"use strict";

function Token(kind, beginLine, beginColumn, endLine, endColumn, image) {
	this.kind = kind;
	this.beginLine = beginLine;
	this.beginColumn = beginColumn;
    this.endLine = endLine;
	this.endColumn = endColumn;
	this.image = image;
}

module.exports = Token;

},{}],25:[function(require,module,exports){
"use strict";

var Token = require("./token");

function TokenManager(stream) {
	this.cs = stream;
	this.jjrounds = [];
	this.jjstateSet = [];
	this.jjnextStates = [2, 3, 5];
}

TokenManager.prototype = {
	constructor: TokenManager,

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
                curPos = this.moveStringLiteralDfa0();

                if (this.matchedKind !== 2147483647) {
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
        return new Token(this.matchedKind, this.cs.getBeginLine(), this.cs.getBeginColumn(), this.cs.getEndLine(), this.cs.getEndColumn(),
                this.cs.getImage());
    },

    moveStringLiteralDfa0: function() {
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
        case 73: return this.moveStringLiteralDfa1(0x2000);
        case 91: return this.stopAtPos(0, this.LBRACK);
        case 92: return this.startNfaWithStates(0, this.BACKSLASH, 7);
        case 93: return this.stopAtPos(0, this.RBRACK);
        case 95: return this.stopAtPos(0, this.UNDERSCORE);
        case 96: return this.stopAtPos(0, this.BACKTICK);
        case 105: return this.moveStringLiteralDfa1(0x2000);
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

    moveStringLiteralDfa1: function(active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) === 77 || this.curChar.charCodeAt(0) === 109) {
            return this.moveStringLiteralDfa2(active, 0x2000);
        }
        return this.startNfa(0, active);
    },

    moveStringLiteralDfa2: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) === 65 || this.curChar.charCodeAt(0) === 97) {
            return this.moveStringLiteralDfa3(active, 0x2000);
        }
        return this.startNfa(1, active);

    },

    moveStringLiteralDfa3: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) === 71 || this.curChar.charCodeAt(0) === 103) {
            return this.moveStringLiteralDfa4(active, 0x2000);
        }
        return this.startNfa(2, active);
    },

    moveStringLiteralDfa4: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) === 69 || this.curChar.charCodeAt(0) === 101) {
            return this.moveStringLiteralDfa5(active, 0x2000);
        }
        return this.startNfa(3, active);
    },

    moveStringLiteralDfa5: function(old, active) {
        this.curChar = this.cs.readChar();
        if (this.curChar.charCodeAt(0) === 58 && ((active & 0x2000) !== 0)) {
            return this.stopAtPos(5, 13);
        }
        return this.startNfa(4, active);
    },

    startNfa: function(pos, active) {
        return this.moveNfa(this.stopStringLiteralDfa(pos, active), pos + 1);
    },

    moveNfa: function(startState, curPos) {
        this.jjnewStateCnt = 8;
        this.jjstateSet[0] = startState;
        var startsAt = 0;
        var i = 1;
        var l = null;
        var kind = 0x7fffffff;

        while (true) {
            if (++this.round === 0x7fffffff) {
                this.round = 0x80000001;
            }
            if (this.curChar.charCodeAt(0) < 64) {
                l = 1 * Number(Math.pow(2, this.curChar.charCodeAt(0)));

                do {
                    switch (this.jjstateSet[--i]) {
                    case 6:
                        if (this.bitwise64(0x880098feffffd9ff, l) !== 0) {
                            if (kind > 4) {
                                kind = 4;
                            }
                            this.checkNAdd(0);
                        } else if (this.bitwise64(0x3ff000000000000, l) !== 0) {
                            if (kind > 7) {
                                kind = 7;
                            }
                            this.checkNAdd(1);
                        } else if (this.bitwise64(0x2400, l) !== 0) {
                            if (kind > 9) {
                                kind = 9;
                            }
                        } else if (this.bitwise64(4294967808, l) !== 0) {
                            this.checkNAddStates(0, 2);
                        }
                        if (this.curChar.charCodeAt(0) === 13) {
                            this.jjstateSet[this.jjnewStateCnt++] = 4;
                        }
                        break;
                    case 8:
                        if (this.bitwise64(0x2400, l) !== 0) {
                            if (kind > 9) {
                                kind = 9;
                            }
                        } else if (this.bitwise64(0x100000200, l) !== 0) {
                            this.checkNAddStates(0, 2);
                        }
                        if (this.curChar.charCodeAt(0) === 13) {
                            this.jjstateSet[this.jjnewStateCnt++] = 4;
                        }
                        break;
                    case 0:
                        if (this.bitwise64(0x880098feffffd9ff, l) !== 0) {
                            kind = 4;
                            this.checkNAdd(0);
                        }
                        break;
                    case 1:
                        if (this.bitwise64(0x3ff000000000000, l) !== 0) {
                            if (kind > 7) {
                                kind = 7;
                            }
                            this.checkNAdd(1);
                        }
                        break;
                    case 2:
                        if (this.bitwise64(0x100000200, l) !== 0) {
                            this.checkNAddStates(0, 2);
                        }
                        break;
                    case 3:
                        if (this.bitwise64(0x2400, l) !== 0 && kind > 9) {
                            kind = 9;
                        }
                        break;
                    case 4:
                        if (this.curChar.charCodeAt(0) === 10 && kind > 9) {
                            kind = 9;
                        }
                        break;
                    case 5:
                        if (this.curChar.charCodeAt(0) === 13) {
                            this.jjstateSet[this.jjnewStateCnt++] = 4;
                        }
                        break;
                    case 7:
                        if (this.bitwise64(0x77ff670000000000, l) !== 0 && kind > 11) {
                            kind = 11;
                        }
                        break;
                    }
                } while (i !== startsAt);
            } else if (this.curChar.charCodeAt(0) < 128) {
                l = 1 * Number(Math.pow(2, this.bitwise64(this.curChar.charCodeAt(0), 63)));
                do {
                    switch (this.jjstateSet[--i]) {
                    case 6:
                        if (l !== 0) {
                            if (kind > 4) {
                                kind = 4;
                            }
                            this.checkNAdd(0);
                        } else if (this.curChar.charCodeAt(0) === 92) {
                            this.jjstateSet[this.jjnewStateCnt++] = 7;
                        }
                        break;
                    case 0:
                        if (this.bitwise64(0xfffffffe47ffffff, l) !== 0) {
                            kind = 4;
                            this.checkNAdd(0);
                        }
                        break;
                    case 7:
                        if (this.bitwise64(0x1b8000000, l) !== 0 && kind > 11) {
                            kind = 11;
                        }
                        break;
                    }
                } while (i !== startsAt);
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
                } while (i !== startsAt);
            }

            if (kind !== 0x7fffffff) {
                this.matchedKind = kind;
                this.matchedPos = curPos;
                kind = 0x7fffffff;
            }
            ++curPos;

            if ((i = this.jjnewStateCnt) === (startsAt = 8 - (this.jjnewStateCnt = startsAt))) {
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
        } while (start++ !== end);
    },

    checkNAdd: function(state) {
        if (this.jjrounds[state] !== this.round) {
            this.jjstateSet[this.jjnewStateCnt++] = state;
            this.jjrounds[state] = this.round;
        }
    },

    stopStringLiteralDfa: function(pos, active) {
        if (pos === 0) {
            if (this.bitwise64(active, 0x2000) !== 0) {
                this.matchedKind = 4;
                return 0;
            } else if (this.bitwise64(active, 0x180000) !== 0) {
                return 8;
            } else if (this.bitwise64(active, 0x4) !== 0) {
                return 7;
            }
        } else if (pos === 1 && this.bitwise64(active, 0x2000) !== 0) {
            this.matchedKind = 4;
            this.matchedPos = 1;
            return 0;
        } else if (pos === 2 && this.bitwise64(active, 0x2000) !== 0) {
            this.matchedKind = 4;
            this.matchedPos = 2;
            return 0;
        } else if (pos === 3 && this.bitwise64(active, 0x2000) !== 0) {
            this.matchedKind = 4;
            this.matchedPos = 3;
            return 0;
        } else if (pos === 4 && this.bitwise64(active, 0x2000) !== 0) {
            this.matchedKind = 4;
            this.matchedPos = 4;
            return 0;
        }
        return -1;
    },

    bitwise64: function(a, b) {
        var divisor = 1 << 30;
        var mask = ~((~0) << 30);
        var result = 0;
        var shift = 0;

        while ((a !== 0) && (b !== 0)) {
            var rs = (mask & a) & (mask & b);

            a = Math.floor(a / divisor);
            b = Math.floor(b / divisor);
            for (var i = shift++; i--;) {
                rs *= divisor;
            }
            result += rs;
        }
        return result;
    }

};

module.exports = TokenManager;

},{"./token":24}],26:[function(require,module,exports){
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
          var c = this.popNode();

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

module.exports = TreeState;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvaW5kZXguanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvRG9jdW1lbnQuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9ibG9ja2VsZW1lbnQuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9ibG9ja3F1b3RlLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvY29kZS5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2NvZGVibG9jay5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2RvY3VtZW50LmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvZW0uanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9oZWFkaW5nLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvaW1hZ2UuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9saW5lYnJlYWsuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9saW5rLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvbGlzdGJsb2NrLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvbGlzdGl0ZW0uanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9ub2RlLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvcGFyYWdyYXBoLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3Qvc3Ryb25nLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvdGV4dC5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvY2hhcnN0cmVhbS5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvaW8vc3RyaW5ncmVhZGVyLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9sb29rYWhlYWRzdWNjZXNzLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9wYXJzZXIuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL3Rva2VuLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS90b2tlbm1hbmFnZXIuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL3RyZWVzdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7QUNBeEMsWUFBWSxDQUFDOztBQUViLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbEMsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuRCxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FB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TyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDOUQsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkQsS0FBSyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsS0FBSyxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMscUJB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S0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0VBQ3BDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ2xCLFVBQVUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztVQUV2QixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztVQUNiLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2I7RUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25CLEVBQUU7O0NBRUQsY0FBYyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM5QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQixFQUFFOztDQUVELFNBQVMsRUFBRSxXQUFXO0VBQ3JCLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQzlDLEVBQUU7O0lBRUUsT0FBTyxFQUFFLFdBQVc7UUFDaEIsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNoQyxLQUFLOztJQUVELFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDNUIsS0FBSzs7QUFFTCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9saWIva29hcmFcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHVzZWQgPSBbXSxcbiAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuZXhwb3J0cy5DaGFyU3RyZWFtID0gcmVxdWlyZShcIi4va29hcmEvY2hhcnN0cmVhbVwiKTtcbmV4cG9ydHMuUGFyc2VyID0gcmVxdWlyZShcIi4va29hcmEvcGFyc2VyXCIpO1xuZXhwb3J0cy5TdHJpbmdSZWFkZXIgPSByZXF1aXJlKFwiLi9rb2FyYS9pby9zdHJpbmdyZWFkZXJcIik7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gICAgTm9kZS5jYWxsKHRoaXMpO1xufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuRG9jdW1lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRG9jdW1lbnQ7XG5Eb2N1bWVudC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdERvY3VtZW50KHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG52YXIgRG9jdW1lbnQgPSByZXF1aXJlKFwiLi9kb2N1bWVudFwiKTtcblxuZnVuY3Rpb24gQmxvY2tFbGVtZW50KCkge1xuICAgIE5vZGUuY2FsbCh0aGlzKTtcbn1cblxuQmxvY2tFbGVtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmxvY2tFbGVtZW50O1xuXG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmlzTmVzdGVkID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiAhKHRoaXMucGFyZW50LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiRG9jdW1lbnRcIik7XG59O1xuXG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmlzU2luZ2xlQ2hpbGQgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMTtcbn07XG5cbkJsb2NrRWxlbWVudC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdEJsb2NrRWxlbWVudCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmxvY2tFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9ibG9ja2VsZW1lbnRcIik7XG5cbmZ1bmN0aW9uIEJsb2NrUXVvdGUoKSB7XG5cdEJsb2NrRWxlbWVudC5jYWxsKHRoaXMpO1xufVxuXG5CbG9ja1F1b3RlLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcbkJsb2NrUXVvdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmxvY2tRdW90ZTtcblxuQmxvY2tRdW90ZS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdEJsb2NrUXVvdGUodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2NrUXVvdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKFwiLi9ub2RlXCIpO1xuXG5mdW5jdGlvbiBDb2RlKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkNvZGUucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcbkNvZGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTtcblxuQ29kZS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRDb2RlKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9ibG9ja2VsZW1lbnRcIik7XG5cbmZ1bmN0aW9uIENvZGVCbG9jaygpIHtcblx0QmxvY2tFbGVtZW50LmNhbGwodGhpcyk7XG59XG5cbkNvZGVCbG9jay5wcm90b3R5cGUgPSBuZXcgQmxvY2tFbGVtZW50KCk7XG5Db2RlQmxvY2sucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZUJsb2NrO1xuXG5Db2RlQmxvY2sucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0Q29kZUJsb2NrKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlQmxvY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKFwiLi9ub2RlXCIpO1xuXG5mdW5jdGlvbiBEb2N1bWVudCgpIHtcbiAgICBOb2RlLmNhbGwodGhpcyk7XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5Eb2N1bWVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEb2N1bWVudDtcbkRvY3VtZW50LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLnZpc2l0RG9jdW1lbnQodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gRW0oKSB7XG5cdE5vZGUuY2FsbCh0aGlzKTtcbn1cblxuRW0ucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcbkVtLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVtO1xuXG5FbS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRFbSh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJsb2NrRWxlbWVudCA9IHJlcXVpcmUoXCIuL2Jsb2NrZWxlbWVudFwiKTtcblxuZnVuY3Rpb24gSGVhZGluZygpIHtcblx0QmxvY2tFbGVtZW50LmNhbGwodGhpcyk7XG59XG5cbkhlYWRpbmcucHJvdG90eXBlID0gbmV3IEJsb2NrRWxlbWVudCgpO1xuSGVhZGluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBIZWFkaW5nO1xuXG5IZWFkaW5nLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLnZpc2l0SGVhZGluZyh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG5cbmZ1bmN0aW9uIEltYWdlKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkltYWdlLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5JbWFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbWFnZTtcblxuSW1hZ2UucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0SW1hZ2UodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gTGluZUJyZWFrKCkge31cbkxpbmVCcmVhay5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuTGluZUJyZWFrLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpbmVCcmVhaztcblxuTGluZUJyZWFrLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRyZW5kZXJlci52aXNpdExpbmVCcmVhayh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZUJyZWFrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gTGluaygpIHtcblx0Tm9kZS5jYWxsKHRoaXMpO1xufVxuXG5MaW5rLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5MaW5rLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpbms7XG5cbkxpbmsucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0TGluayh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQmxvY2tFbGVtZW50ID0gcmVxdWlyZShcIi4vYmxvY2tlbGVtZW50XCIpO1xuXG5mdW5jdGlvbiBMaXN0QmxvY2sob3JkZXJlZCkge1xuXHRCbG9ja0VsZW1lbnQuY2FsbCh0aGlzKTtcblx0dGhpcy5vcmRlcmVkID0gb3JkZXJlZDtcbn1cblxuTGlzdEJsb2NrLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcbkxpc3RCbG9jay5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaXN0QmxvY2s7XG5cbkxpc3RCbG9jay5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRMaXN0QmxvY2sodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RCbG9jaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG5cbmZ1bmN0aW9uIExpc3RJdGVtKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkxpc3RJdGVtLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5MaXN0SXRlbS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaXN0SXRlbTtcblxuTGlzdEl0ZW0ucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0TGlzdEl0ZW0odGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RJdGVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIE5vZGUoKSB7XG5cdHRoaXMuY2hpbGRyZW4gPSBbXTtcbn1cblxuTm9kZS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBOb2RlLFxuXG5cdGFkZDogZnVuY3Rpb24obiwgaSkge1xuXHRcdHRoaXMuY2hpbGRyZW5baV0gPSBuO1xuXHR9LFxuXG5cdGNoaWxkcmVuQWNjZXB0OiBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5jaGlsZHJlbltpXS5hY2NlcHQocmVuZGVyZXIpO1xuXHRcdH1cblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJsb2NrRWxlbWVudCA9IHJlcXVpcmUoXCIuL2Jsb2NrZWxlbWVudFwiKTtcblxuZnVuY3Rpb24gUGFyYWdyYXBoKCkge1xuXHRCbG9ja0VsZW1lbnQuY2FsbCh0aGlzKTtcbn1cblxuUGFyYWdyYXBoLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcblBhcmFncmFwaC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQYXJhZ3JhcGg7XG5cblBhcmFncmFwaC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdFBhcmFncmFwaCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyYWdyYXBoO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gU3Ryb25nKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cblN0cm9uZy5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuU3Ryb25nLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0cm9uZztcblxuU3Ryb25nLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRyZW5kZXJlci52aXNpdFN0cm9uZyh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3Ryb25nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gVGV4dCgpIHtcbiAgICBOb2RlLmNhbGwodGhpcyk7XG59XG5cblRleHQucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcblRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGV4dDtcblxuVGV4dC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRUZXh0KHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIENoYXJTdHJlYW0ocmVhZGVyKSB7XG5cdHRoaXMuYXZhaWxhYmxlID0gNDA5Njtcblx0dGhpcy5idWZzaXplID0gNDA5Njtcblx0dGhpcy50b2tlbkJlZ2luID0gMDtcblx0dGhpcy5idWZjb2x1bW4gPSBbXTtcblx0dGhpcy5idWZwb3MgPSAtMTtcblx0dGhpcy5idWZsaW5lID0gW107XG5cdHRoaXMuY29sdW1uID0gMDtcblx0dGhpcy5saW5lID0gMTtcblx0dGhpcy5wcmV2Q2hhcklzTEYgPSBmYWxzZTtcblx0dGhpcy5yZWFkZXIgPSByZWFkZXI7XG5cdHRoaXMuYnVmZmVyID0gW107XG5cdHRoaXMubWF4TmV4dENoYXJJbmQgPSAwO1xuXHR0aGlzLmluQnVmID0gMDtcblx0dGhpcy50YWJTaXplID0gNDtcbn1cblxuQ2hhclN0cmVhbS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBDaGFyU3RyZWFtLFxuXG5cdGJlZ2luVG9rZW46IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMudG9rZW5CZWdpbiA9IC0xO1xuXHRcdHZhciBjID0gdGhpcy5yZWFkQ2hhcigpO1xuXG5cdFx0dGhpcy50b2tlbkJlZ2luID0gdGhpcy5idWZwb3M7XG5cdFx0cmV0dXJuIGM7XG5cdH0sXG5cblx0cmVhZENoYXI6IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGlzLmluQnVmID4gMCkge1xuXHRcdFx0LS10aGlzLmluQnVmO1xuXHRcdFx0aWYgKCsrdGhpcy5idWZwb3MgPT09IHRoaXMuYnVmc2l6ZSkge1xuXHRcdFx0XHR0aGlzLmJ1ZnBvcyA9IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5idWZmZXJbdGhpcy5idWZwb3NdO1xuXHRcdH1cblx0XHRpZiAoKyt0aGlzLmJ1ZnBvcyA+PSB0aGlzLm1heE5leHRDaGFySW5kKSB7XG5cdFx0XHR0aGlzLmZpbGxCdWZmKCk7XG5cdFx0fVxuXG5cdFx0dmFyIGMgPSB0aGlzLmJ1ZmZlclt0aGlzLmJ1ZnBvc107XG5cblx0XHR0aGlzLnVwZGF0ZUxpbmVDb2x1bW4oYyk7XG5cdFx0cmV0dXJuIGM7XG5cdH0sXG5cblx0ZmlsbEJ1ZmY6IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGlzLm1heE5leHRDaGFySW5kID09PSB0aGlzLmF2YWlsYWJsZSkge1xuXHRcdFx0aWYgKHRoaXMuYXZhaWxhYmxlID09PSB0aGlzLmJ1ZnNpemUpIHtcblx0XHRcdFx0dGhpcy5idWZwb3MgPSAwO1xuXHRcdFx0XHR0aGlzLm1heE5leHRDaGFySW5kID0gMDtcblx0XHRcdFx0aWYgKHRoaXMudG9rZW5CZWdpbiA+IDIwNDgpIHtcblx0XHRcdFx0XHR0aGlzLmF2YWlsYWJsZSA9IHRoaXMudG9rZW5CZWdpbjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hdmFpbGFibGUgPSB0aGlzLmJ1ZnNpemU7XG5cdFx0XHR9XG5cdFx0fVxuICAgICAgICB2YXIgaSA9IDA7XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKChpID0gdGhpcy5yZWFkZXIucmVhZCh0aGlzLmJ1ZmZlciwgdGhpcy5tYXhOZXh0Q2hhckluZCwgdGhpcy5hdmFpbGFibGUgLSB0aGlzLm1heE5leHRDaGFySW5kKSkgPT09IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIklPRXhjZXB0aW9uXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5tYXhOZXh0Q2hhckluZCArPSBpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC0tdGhpcy5idWZwb3M7XG5cdFx0XHR0aGlzLmJhY2t1cCgwKTtcblx0XHRcdGlmICh0aGlzLnRva2VuQmVnaW4gPT09IC0xKSB7XG5cdFx0XHRcdHRoaXMudG9rZW5CZWdpbiA9IHRoaXMuYnVmcG9zO1xuXHRcdFx0fVxuXHRcdFx0dGhyb3cgZTtcblx0XHR9XG5cdH0sXG5cblx0YmFja3VwOiBmdW5jdGlvbihhbW91bnQpIHtcblx0XHR0aGlzLmluQnVmICs9IGFtb3VudDtcblx0XHRpZiAoKHRoaXMuYnVmcG9zIC09IGFtb3VudCkgPCAwKSB7XG5cdFx0XHR0aGlzLmJ1ZnBvcyArPSB0aGlzLmJ1ZnNpemU7XG5cdFx0fVxuXHR9LFxuXG5cdHVwZGF0ZUxpbmVDb2x1bW46IGZ1bmN0aW9uKGMpIHtcblx0XHR0aGlzLmNvbHVtbisrO1xuXHRcdGlmICh0aGlzLnByZXZDaGFySXNMRikge1xuXHRcdFx0dGhpcy5wcmV2Q2hhcklzTEYgPSBmYWxzZTtcblx0XHRcdHRoaXMuY29sdW1uID0gMTtcblx0XHRcdHRoaXMubGluZSArPSB0aGlzLmNvbHVtbjtcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGMpIHtcblx0XHRjYXNlIFwiXFxuXCI6XG5cdFx0XHR0aGlzLnByZXZDaGFySXNMRiA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiXFx0XCI6XG5cdFx0XHR0aGlzLmNvbHVtbi0tO1xuXHRcdFx0dGhpcy5jb2x1bW4gKz0gdGhpcy50YWJTaXplIC0gdGhpcy5jb2x1bW4gJSB0aGlzLnRhYlNpemU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdHRoaXMuYnVmbGluZVt0aGlzLmJ1ZnBvc10gPSB0aGlzLmxpbmU7XG5cdFx0dGhpcy5idWZjb2x1bW5bdGhpcy5idWZwb3NdID0gdGhpcy5jb2x1bW47XG5cdH0sXG5cblx0Z2V0SW1hZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuYnVmcG9zID49IHRoaXMudG9rZW5CZWdpbikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5idWZmZXIuc2xpY2UodGhpcy50b2tlbkJlZ2luLCB0aGlzLmJ1ZnBvcyArIDEpLmpvaW4oXCJcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5idWZmZXIuc2xpY2UodGhpcy50b2tlbkJlZ2luLCB0aGlzLmJ1ZnNpemUpLmpvaW4oXCJcIikgK1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnNsaWNlKDAsIHRoaXMuYnVmcG9zICsgMSkuam9pbihcIlwiKTtcblx0fSxcblxuXHRnZXRFbmRDb2x1bW46IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnRva2VuQmVnaW4gaW4gdGhpcy5idWZjb2x1bW4gPyB0aGlzLmJ1ZmNvbHVtblt0aGlzLmJ1ZnBvc10gOiAwO1xuXHR9LFxuXG5cdGdldEVuZExpbmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnRva2VuQmVnaW4gaW4gdGhpcy5idWZsaW5lID8gdGhpcy5idWZsaW5lW3RoaXMuYnVmcG9zXSA6IDA7XG5cdH0sXG5cblx0Z2V0QmVnaW5Db2x1bW46IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmJ1ZnBvcyBpbiB0aGlzLmJ1ZmNvbHVtbiA/IHRoaXMuYnVmY29sdW1uW3RoaXMudG9rZW5CZWdpbl0gOiAwO1xuXHR9LFxuXG5cdGdldEJlZ2luTGluZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYnVmcG9zIGluIHRoaXMuYnVmbGluZSA/IHRoaXMuYnVmbGluZVt0aGlzLnRva2VuQmVnaW5dIDogMDtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJTdHJlYW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gU3RyaW5nUmVhZGVyKHRleHQpIHtcblx0dGhpcy5pbmRleCA9IDA7XG5cdHRoaXMudGV4dCA9IHRleHQ7XG59XG5cblN0cmluZ1JlYWRlci5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBTdHJpbmdSZWFkZXIsXG5cblx0cmVhZDogZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCkge1xuXHRcdGlmICh0aGlzLnRleHQudG9TdHJpbmcoKS5zdWJzdHJpbmcodGhpcy5pbmRleCkubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIGNoYXJhY3RlcnNSZWFkID0gMDtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgc3RhcnQgPSB0aGlzLmluZGV4ICsgaTtcblx0XHRcdFx0dmFyIGMgPSB0aGlzLnRleHQudG9TdHJpbmcoKS5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0ICsgMSk7XG5cblx0XHRcdFx0aWYgKGMgIT09IFwiXCIpIHtcblx0XHRcdFx0XHRidWZmZXJbb2Zmc2V0ICsgaV0gPSBjO1xuXHRcdFx0XHRcdGNoYXJhY3RlcnNSZWFkKys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuaW5kZXggKz0gbGVuZ3RoO1xuXHRcdFx0cmV0dXJuIGNoYXJhY3RlcnNSZWFkO1xuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nUmVhZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIExvb2thaGVhZFN1Y2Nlc3MoKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvb2thaGVhZFN1Y2Nlc3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIExvb2thaGVhZFN1Y2Nlc3MgPSByZXF1aXJlKFwiLi9sb29rYWhlYWRzdWNjZXNzXCIpO1xudmFyIFN0cmluZ1JlYWRlciA9IHJlcXVpcmUoXCIuL2lvL3N0cmluZ3JlYWRlclwiKTtcbnZhciBDaGFyU3RyZWFtID0gcmVxdWlyZShcIi4vY2hhcnN0cmVhbVwiKTtcbnZhciBUb2tlbk1hbmFnZXIgPSByZXF1aXJlKFwiLi90b2tlbm1hbmFnZXJcIik7XG52YXIgVG9rZW4gPSByZXF1aXJlKFwiLi90b2tlblwiKTtcbnZhciBUcmVlU3RhdGUgPSByZXF1aXJlKFwiLi90cmVlc3RhdGVcIik7XG5cbnZhciBEb2N1bWVudCA9IHJlcXVpcmUoXCIuL2FzdC9Eb2N1bWVudFwiKTtcbnZhciBCbG9ja1F1b3RlID0gcmVxdWlyZShcIi4vYXN0L2Jsb2NrcXVvdGVcIik7XG52YXIgQ29kZSA9IHJlcXVpcmUoXCIuL2FzdC9jb2RlXCIpO1xudmFyIENvZGVCbG9jayA9IHJlcXVpcmUoXCIuL2FzdC9jb2RlYmxvY2tcIik7XG52YXIgRW0gPSByZXF1aXJlKFwiLi9hc3QvZW1cIik7XG52YXIgSGVhZGluZyA9IHJlcXVpcmUoXCIuL2FzdC9oZWFkaW5nXCIpO1xudmFyIEltYWdlID0gcmVxdWlyZShcIi4vYXN0L2ltYWdlXCIpO1xudmFyIExpbmVCcmVhayA9IHJlcXVpcmUoXCIuL2FzdC9saW5lYnJlYWtcIik7XG52YXIgTGluayA9IHJlcXVpcmUoXCIuL2FzdC9saW5rXCIpO1xudmFyIExpc3RCbG9jayA9IHJlcXVpcmUoXCIuL2FzdC9saXN0YmxvY2tcIik7XG52YXIgTGlzdEl0ZW0gPSByZXF1aXJlKFwiLi9hc3QvbGlzdGl0ZW1cIik7XG52YXIgUGFyYWdyYXBoID0gcmVxdWlyZShcIi4vYXN0L3BhcmFncmFwaFwiKTtcbnZhciBTdHJvbmcgPSByZXF1aXJlKFwiLi9hc3Qvc3Ryb25nXCIpO1xudmFyIFRleHQgPSByZXF1aXJlKFwiLi9hc3QvdGV4dFwiKTtcblxuZnVuY3Rpb24gUGFyc2VyKCkge1xuXHR0aGlzLmxvb2tBaGVhZFN1Y2Nlc3MgPSBuZXcgTG9va2FoZWFkU3VjY2VzcygpO1xuXHR0aGlzLm1vZHVsZXMgPSBbXCJwYXJhZ3JhcGhzXCIsIFwiaGVhZGluZ3NcIiwgXCJsaXN0c1wiLCBcImxpbmtzXCIsIFwiaW1hZ2VzXCIsIFwiZm9ybWF0dGluZ1wiLCBcImJsb2NrcXVvdGVzXCIsIFwiY29kZVwiXTtcblx0dGhpcy5jdXJyZW50QmxvY2tMZXZlbCA9IDA7XG5cdHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgPSAwO1xufVxuXG5QYXJzZXIucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogUGFyc2VyLFxuXG5cdHBhcnNlOiBmdW5jdGlvbih0ZXh0KSB7XG5cdFx0cmV0dXJuIHRoaXMucGFyc2VSZWFkZXIobmV3IFN0cmluZ1JlYWRlcih0ZXh0KSk7XG5cdH0sXG5cblx0cGFyc2VSZWFkZXI6IGZ1bmN0aW9uKHJlYWRlcikge1xuXHRcdHRoaXMuY3MgPSBuZXcgQ2hhclN0cmVhbShyZWFkZXIpO1xuXHRcdHRoaXMudG0gPSBuZXcgVG9rZW5NYW5hZ2VyKHRoaXMuY3MpO1xuXHRcdHRoaXMudG9rZW4gPSBuZXcgVG9rZW4oKTtcblx0XHR0aGlzLnRyZWUgPSBuZXcgVHJlZVN0YXRlKCk7XG5cdFx0dGhpcy5uZXh0VG9rZW5LaW5kID0gLTE7XG5cblx0XHR2YXIgZG9jdW1lbnQgPSBuZXcgRG9jdW1lbnQoKTtcblxuXHRcdHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcblxuXHRcdHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcblx0XHRcdHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcblx0XHR9XG5cdFx0dGhpcy53aGl0ZVNwYWNlKCk7XG5cdFx0aWYgKHRoaXMuaGFzQW55QmxvY2tFbGVtZW50c0FoZWFkKCkpIHtcblx0XHRcdHRoaXMuYmxvY2tFbGVtZW50KCk7XG5cdFx0XHR3aGlsZSAodGhpcy5ibG9ja0FoZWFkKDApKSB7XG5cdFx0XHRcdHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcblx0XHRcdFx0fVxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tFbGVtZW50KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9GKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoZG9jdW1lbnQpO1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQ7XG5cdH0sXG5cblx0YmxvY2tFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2tMZXZlbCsrO1xuICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJoZWFkaW5nc1wiKSA+PSAwICYmIHRoaXMuaGVhZGluZ0FoZWFkKDEpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJibG9ja3F1b3Rlc1wiKSA+PSAwICYmIHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgdGhpcy5ibG9ja1F1b3RlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaXN0c1wiKSA+PSAwICYmIHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkRBU0gpIHtcbiAgICAgICAgICB0aGlzLnVub3JkZXJlZExpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpc3RzXCIpID49IDAgJiYgdGhpcy5oYXNPcmRlcmVkTGlzdEFoZWFkKCkpIHtcbiAgICAgICAgICB0aGlzLm9yZGVyZWRMaXN0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5oYXNGZW5jZWRDb2RlQmxvY2tBaGVhZCgpKSB7XG4gICAgICAgICAgdGhpcy5mZW5jZWRDb2RlQmxvY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhcmFncmFwaCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudEJsb2NrTGV2ZWwtLTtcblx0fSxcblxuICAgIGhlYWRpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGVhZGluZyA9IG5ldyBIZWFkaW5nKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB2YXIgaGVhZGluZ0xldmVsID0gMDtcblxuICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRVEpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVEpO1xuICAgICAgICAgICAgaGVhZGluZ0xldmVsKys7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmhlYWRpbmdIYXNJbmxpbmVFbGVtZW50c0FoZWFkKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaW1hZ2VzXCIpID49IDAgJiYgdGhpcy5oYXNJbWFnZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlua3NcIikgPj0gMCAmJiB0aGlzLmhhc0xpbmtBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiZm9ybWF0dGluZ1wiKSA+PSAwICYmIHRoaXMuaGFzU3Ryb25nQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb25nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiZm9ybWF0dGluZ1wiKSA+PSAwICYmIHRoaXMuaGFzRW1BaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9vc2VDaGFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGhlYWRpbmcudmFsdWUgPSBoZWFkaW5nTGV2ZWw7XG4gICAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoaGVhZGluZyk7XG4gICAgfSxcblxuICAgIGJsb2NrUXVvdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYmxvY2tRdW90ZSA9IG5ldyBCbG9ja1F1b3RlKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRRdW90ZUxldmVsKys7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpO1xuICAgICAgICB3aGlsZSAodGhpcy5ibG9ja1F1b3RlSGFzRW1wdHlMaW5lQWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlRW1wdHlMaW5lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIGlmICh0aGlzLmJsb2NrUXVvdGVIYXNBbnlCbG9ja0VsZW1lbnRzZUFoZWFkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tFbGVtZW50KCk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5ibG9ja0FoZWFkKDApKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJsb2NrUXVvdGVQcmVmaXgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5oYXNCbG9ja1F1b3RlRW1wdHlMaW5lc0FoZWFkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tRdW90ZUVtcHR5TGluZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudFF1b3RlTGV2ZWwtLTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoYmxvY2tRdW90ZSk7XG4gICAgICB9LFxuXG4gICAgICBibG9ja1F1b3RlUHJlZml4OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIH0gd2hpbGUgKCsraSA8IHRoaXMuY3VycmVudFF1b3RlTGV2ZWwpO1xuICAgICAgfSxcblxuICAgICAgYmxvY2tRdW90ZUVtcHR5TGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCk7XG4gICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgIH0gd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkdUKTtcbiAgICAgIH0sXG5cbiAgICAgIHVub3JkZXJlZExpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBsaXN0ID0gbmV3IExpc3RCbG9jayhmYWxzZSk7XG5cbiAgICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgICAgdmFyIGxpc3RCZWdpbkNvbHVtbiA9IHRoaXMudW5vcmRlcmVkTGlzdEl0ZW0oKTtcblxuICAgICAgICAgIHdoaWxlICh0aGlzLmxpc3RJdGVtQWhlYWQobGlzdEJlZ2luQ29sdW1uLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UXVvdGVMZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tRdW90ZVByZWZpeCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMudW5vcmRlcmVkTGlzdEl0ZW0oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUobGlzdCk7XG4gICAgICB9LFxuXG4gICAgICB1bm9yZGVyZWRMaXN0SXRlbTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGxpc3RJdGVtID0gbmV3IExpc3RJdGVtKCk7XG5cbiAgICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG5cbiAgICAgICAgICB2YXIgdCA9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uREFTSCk7XG5cbiAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgICBpZiAodGhpcy5saXN0SXRlbUhhc0lubGluZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuYmxvY2tBaGVhZCh0LmJlZ2luQ29sdW1uKSkge1xuICAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdW90ZUxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tRdW90ZVByZWZpeCgpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tFbGVtZW50KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUobGlzdEl0ZW0pO1xuICAgICAgICAgIHJldHVybiB0LmJlZ2luQ29sdW1uO1xuICAgICAgfSxcblxuICAgICAgb3JkZXJlZExpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGlzdCA9IG5ldyBMaXN0QmxvY2sodHJ1ZSk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB2YXIgbGlzdEJlZ2luQ29sdW1uID0gdGhpcy5vcmRlcmVkTGlzdEl0ZW0oKTtcblxuICAgICAgICB3aGlsZSAodGhpcy5saXN0SXRlbUFoZWFkKGxpc3RCZWdpbkNvbHVtbiwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdW90ZUxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tRdW90ZVByZWZpeCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vcmRlcmVkTGlzdEl0ZW0oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaXN0KTtcbiAgICB9LFxuXG4gICAgb3JkZXJlZExpc3RJdGVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxpc3RJdGVtID0gbmV3IExpc3RJdGVtKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB2YXIgdCA9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKTtcblxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCk7XG4gICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICBpZiAodGhpcy5saXN0SXRlbUhhc0lubGluZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmxvY2tFbGVtZW50KCk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5ibG9ja0FoZWFkKHQuYmVnaW5Db2x1bW4pKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50UXVvdGVMZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tRdW90ZVByZWZpeCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tFbGVtZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGlzdEl0ZW0ubnVtYmVyID0gdC5pbWFnZTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUobGlzdEl0ZW0pO1xuICAgICAgICByZXR1cm4gdC5iZWdpbkNvbHVtbjtcbiAgICB9LFxuXG4gICAgZmVuY2VkQ29kZUJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvZGVCbG9jayA9IG5ldyBDb2RlQmxvY2soKTtcbiAgICAgICAgdmFyIHMgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdmFyIGJlZ2luQ29sdW1uID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykuYmVnaW5Db2x1bW47XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpIHtcbiAgICAgICAgICAgICAgICBjb2RlQmxvY2subGFuZ3VhZ2UgPSB0aGlzLmNvZGVMYW5ndWFnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpICE9PSB0aGlzLnRtLkVPRiAmJiAhdGhpcy5mZW5jZXNBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgICAgIHRoaXMubGV2ZWxXaGl0ZVNwYWNlKGJlZ2luQ29sdW1uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpICE9PSB0aGlzLnRtLkVPRiAmJiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgIT09IHRoaXMudG0uRU9MIHx8ICF0aGlzLmZlbmNlc0FoZWFkKCkpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQ0hBUl9TRVFVRU5DRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLU0xBU0g6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQ09MT046XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5EQVNIOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ESUdJVFM6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uRE9UOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVROlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uRVNDQVBFRF9DSEFSOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLklNQUdFX0xBQkVMOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFQpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5HVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUkJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTFBBUkVOOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJQQVJFTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5VTkRFUlNDT1JFOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5FT0wsIHRoaXMudG0uRU9GXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlNQQUNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uU1BBQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVEFCOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlRBQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuZmVuY2VzQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sZXZlbFdoaXRlU3BhY2UoYmVnaW5Db2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZlbmNlc0FoZWFkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkJBQ0tUSUNLKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29kZUJsb2NrLnZhbHVlID0gcy50b1N0cmluZygpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShjb2RlQmxvY2spO1xuICAgIH0sXG5cbiAgICBwYXJhZ3JhcGg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGFyYWdyYXBoID0gdGhpcy5tb2R1bGVzLmluZGV4T2YoXCJwYXJhZ3JhcGhzXCIpID49IDAgPyBuZXcgUGFyYWdyYXBoKCkgOiBuZXcgQmxvY2tFbGVtZW50KCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmlubGluZSgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiYmxvY2txdW90ZXNcIikgPj0gMCkge1xuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5HVCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbmxpbmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShwYXJhZ3JhcGgpO1xuICAgIH0sXG5cbiAgICB0ZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHQgPSBuZXcgVGV4dCgpO1xuICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0SGFzVG9rZW5zQWhlYWQoKSkge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNIQVJfU0VRVUVOQ0U6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2Uuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEFmdGVyU3BhY2UoW3RoaXMudG0uRU9MLCB0aGlzLnRtLkVPRl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlNQQUNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlNQQUNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVEFCOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5UQUIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIiAgICBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGV4dC52YWx1ZSA9IHM7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHRleHQpO1xuICAgIH0sXG5cbiAgICBpbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICB2YXIgcmVmID0gXCJcIjtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKTtcbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uSU1BR0VfTEFCRUwpO1xuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuaW1hZ2VIYXNBbnlFbGVtZW50cygpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VUZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9vc2VDaGFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUkJSQUNLKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzUmVzb3VyY2VVcmxBaGVhZCgpKSB7XG4gICAgICAgICAgICByZWYgPSB0aGlzLnJlc291cmNlVXJsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaW1hZ2UudmFsdWUgPSByZWY7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGltYWdlKTtcbiAgICB9LFxuXG4gICAgbGluazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaW5rID0gbmV3IExpbmsoKTtcbiAgICAgICAgdmFyIHJlZiA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSyk7XG4gICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICB3aGlsZSAodGhpcy5saW5rSGFzQW55RWxlbWVudHMoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaW1hZ2VzXCIpID49IDAgJiYgdGhpcy5oYXNJbWFnZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiZm9ybWF0dGluZ1wiKSA+PSAwICYmIHRoaXMuaGFzU3Ryb25nQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb25nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiZm9ybWF0dGluZ1wiKSA+PSAwICYmIHRoaXMuaGFzRW1BaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzUmVzb3VyY2VUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzb3VyY2VUZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9vc2VDaGFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUkJSQUNLKTtcbiAgICAgICAgaWYgKHRoaXMuaGFzUmVzb3VyY2VVcmxBaGVhZCgpKSB7XG4gICAgICAgICAgICByZWYgPSB0aGlzLnJlc291cmNlVXJsKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGluay52YWx1ZSA9IHJlZjtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUobGluayk7XG4gICAgfSxcblxuICAgIHN0cm9uZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHJvbmcgPSBuZXcgU3Ryb25nKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuc3Ryb25nSGFzRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlua3NcIikgPj0gMCAmJiB0aGlzLmhhc0xpbmtBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGVNdWx0aWxpbmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdHJvbmdFbVdpdGhpblN0cm9uZ0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtV2l0aGluU3Ryb25nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHN0cm9uZyk7XG4gICAgfSxcblxuICAgIGVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVtID0gbmV3IEVtKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB3aGlsZSAodGhpcy5lbUhhc0VsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaW1hZ2VzXCIpID49IDAgJiYgdGhpcy5oYXNJbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZW1IYXNTdHJvbmdXaXRoaW5FbSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmdXaXRoaW5FbSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkFTVEVSSVNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoZW0pO1xuICAgIH0sXG5cbiAgICBjb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBuZXcgQ29kZSgpO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgIHRoaXMuY29kZVRleHQoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGNvZGUpO1xuICAgIH0sXG5cbiAgICBjb2RlVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gbmV3IFRleHQoKTtcbiAgICAgICAgdmFyIHMgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ0hBUl9TRVFVRU5DRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLU0xBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ09MT046XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNPTE9OKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5EQVNIOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5EQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ESUdJVFM6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRJR0lUUykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRE9UOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ET1QpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVROlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FUSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVNDQVBFRF9DSEFSOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FU0NBUEVEX0NIQVIpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLklNQUdFX0xBQkVMOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUkJSQUNLOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxQQVJFTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFBBUkVOKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5HVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJQQVJFTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUlBBUkVOKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5VTkRFUlNDT1JFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLkVPTCwgdGhpcy50bS5FT0ZdKSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5TUEFDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlRBQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5jb2RlVGV4dEhhc0FueVRva2VuQWhlYWQoKSk7XG4gICAgICAgIHRleHQudmFsdWUgPSBzO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZSh0ZXh0KTtcbiAgICB9LFxuXG4gICBsb29zZUNoYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dCA9IG5ldyBUZXh0KCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKS5pbWFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICB0ZXh0LnZhbHVlID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykuaW1hZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICB0ZXh0LnZhbHVlID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKS5pbWFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHRleHQpO1xuICAgIH0sXG5cbiAgICBsaW5lQnJlYWs6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGluZWJyZWFrID0gbmV3IExpbmVCcmVhaygpO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLlNQQUNFIHx8IHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLlRBQikge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUobGluZWJyZWFrKTtcbiAgICB9LFxuXG4gICAgbGV2ZWxXaGl0ZVNwYWNlOiBmdW5jdGlvbih0aHJlc2hvbGQpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSAxO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5HVCkge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICgodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uU1BBQ0UgfHwgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uVEFCKSAmJiBjdXJyZW50UG9zIDwgdGhyZXNob2xkIC0gMSkge1xuICAgICAgICAgICAgY3VycmVudFBvcyA9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKS5iZWdpbkNvbHVtbjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb2RlTGFuZ3VhZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNIQVJfU0VRVUVOQ0U6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkFTVEVSSVNLOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1NMQVNIOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ09MT046XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNPTE9OKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5EQVNIOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5EQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ESUdJVFM6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRJR0lUUykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRE9UOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ET1QpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVROlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FUSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVNDQVBFRF9DSEFSOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FU0NBUEVEX0NIQVIpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLklNQUdFX0xBQkVMOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5HVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJQQVJFTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUlBBUkVOKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5VTkRFUlNDT1JFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5TUEFDRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uU1BBQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlRBQjpcbiAgICAgICAgICAgICAgICBzICs9IFwiICAgIFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSAhPT0gdGhpcy50bS5FT0wgJiYgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgIT09IHRoaXMudG0uRU9GKTtcbiAgICAgICAgICByZXR1cm4gcztcbiAgICAgIH0sXG5cbiAgICAgIGlubGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzSW5saW5lVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb25nTXVsdGlsaW5lKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiZm9ybWF0dGluZ1wiKSA+PSAwICYmIHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5VTkRFUlNDT1JFKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1NdWx0aWxpbmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvb3NlQ2hhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKHRoaXMuaGFzSW5saW5lRWxlbWVudEFoZWFkKCkpO1xuICAgICAgfSxcblxuICAgICAgcmVzb3VyY2VUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgICAgdmFyIHRleHQgPSBuZXcgVGV4dCgpO1xuICAgICAgICAgIHZhciBzID0gXCJcIjtcblxuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DSEFSX1NFUVVFTkNFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLU0xBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ09MT046XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNPTE9OKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5EQVNIOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5EQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ESUdJVFM6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRJR0lUUykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRE9UOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ET1QpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVROlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FUSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVNDQVBFRF9DSEFSOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FU0NBUEVEX0NIQVIpLmltYWdlLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5JTUFHRV9MQUJFTDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uSU1BR0VfTEFCRUwpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEFmdGVyU3BhY2UoW3RoaXMudG0uUkJSQUNLXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uU1BBQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uU1BBQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5UQUI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlRBQik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiICAgIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMucmVzb3VyY2VIYXNFbGVtZW50QWhlYWQoKSk7XG4gICAgICAgIHRleHQudmFsdWUgPSBzO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZSh0ZXh0KTtcbiAgICAgIH0sXG5cbiAgICAgIHJlc291cmNlVXJsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MUEFSRU4pO1xuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdmFyIHJlZiA9IHRoaXMucmVzb3VyY2VVcmxUZXh0KCk7XG5cbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUlBBUkVOKTtcbiAgICAgICAgcmV0dXJuIHJlZjtcbiAgICAgIH0sXG5cbiAgICAgIHJlc291cmNlVXJsVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHMgPSBcIlwiO1xuXG4gICAgICAgICAgd2hpbGUgKHRoaXMucmVzb3VyY2VUZXh0SGFzRWxlbWVudHNBaGVhZCgpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ0hBUl9TRVFVRU5DRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLU0xBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2Uuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLklNQUdFX0xBQkVMOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uR1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUkJSQUNLOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEFmdGVyU3BhY2UoW3RoaXMudG0uUlBBUkVOXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uU1BBQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uU1BBQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5UQUI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlRBQik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiICAgIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgfSxcblxuICAgICAgc3Ryb25nTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgc3Ryb25nID0gbmV3IFN0cm9uZygpO1xuXG4gICAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICAgIHRoaXMuc3Ryb25nTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICAgIHdoaWxlICh0aGlzLnRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgIHRoaXMubGluZUJyZWFrKCk7XG4gICAgICAgICAgICAgIHRoaXMuc3Ryb25nTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShzdHJvbmcpO1xuICAgICAgfSxcblxuICAgICAgc3Ryb25nTXVsdGlsaW5lQ29udGVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaW1hZ2VzXCIpID49IDAgJiYgdGhpcy5oYXNJbWFnZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlua3NcIikgPj0gMCAmJiB0aGlzLmhhc0xpbmtBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNFbVdpdGhpblN0cm9uZ011bHRpbGluZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbVdpdGhpblN0cm9uZ011bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0cm9uZ011bHRpbGluZUhhc0VsZW1lbnRzQWhlYWQoKSk7XG4gICAgICB9LFxuXG4gICAgICBzdHJvbmdXaXRoaW5FbU11bHRpbGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHJvbmcgPSBuZXcgU3Ryb25nKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICAgICAgdGhpcy5zdHJvbmdXaXRoaW5FbU11bHRpbGluZUNvbnRlbnQoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMudGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubGluZUJyZWFrKCk7XG4gICAgICAgICAgICB0aGlzLnN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShzdHJvbmcpO1xuICAgICAgfSxcblxuICAgICAgc3Ryb25nV2l0aGluRW1NdWx0aWxpbmVDb250ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5oYXNDb2RlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lSGFzRWxlbWVudHNBaGVhZCgpKTtcbiAgICAgIH0sXG5cbiAgICAgIHN0cm9uZ1dpdGhpbkVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0cm9uZyA9IG5ldyBTdHJvbmcoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgdGhpcy50ZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaW1hZ2VzXCIpID49IDAgJiYgdGhpcy5oYXNJbWFnZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5VTkRFUlNDT1JFOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5zdHJvbmdXaXRoaW5FbUhhc0VsZW1lbnRzQWhlYWQoKSk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShzdHJvbmcpO1xuICAgIH0sXG5cbiAgICBlbU11bHRpbGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbSA9IG5ldyBFbSgpO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgdGhpcy5lbU11bHRpbGluZUNvbnRlbnQoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMudGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubGluZUJyZWFrKCk7XG4gICAgICAgICAgICB0aGlzLmVtTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGVtKTtcbiAgICB9LFxuXG4gICAgZW1NdWx0aWxpbmVDb250ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc1N0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Ryb25nV2l0aGluRW1NdWx0aWxpbmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLmVtTXVsdGlsaW5lQ29udGVudEhhc0VsZW1lbnRzQWhlYWQoKSk7XG4gICAgfSxcblxuICAgIGVtV2l0aGluU3Ryb25nTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVtID0gbmV3IEVtKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLmVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgIHRoaXMuZW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoZW0pO1xuICAgIH0sXG5cbiAgICBlbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5lbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnRIYXNFbGVtZW50c0FoZWFkKCkpO1xuICAgIH0sXG5cbiAgICBlbVdpdGhpblN0cm9uZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbSA9IG5ldyBFbSgpO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5oYXNDb2RlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkFTVEVSSVNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuZW1XaXRoaW5TdHJvbmdIYXNFbGVtZW50c0FoZWFkKCkpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShlbSk7XG4gICAgfSxcblxuICAgIGNvZGVNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29kZSA9IG5ldyBDb2RlKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgdGhpcy5jb2RlVGV4dCgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCk7XG4gICAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvZGVUZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGNvZGUpO1xuICAgIH0sXG5cbiAgICB3aGl0ZVNwYWNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLlNQQUNFIHx8IHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLlRBQikge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc0FueUJsb2NrRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuTW9yZUJsb2NrRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsb2NrQWhlYWQ6IGZ1bmN0aW9uKGJsb2NrQmVnaW5Db2x1bW4pIHtcbiAgICAgICAgdmFyIHF1b3RlTGV2ZWwgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgIHZhciB0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBpID0gMjtcblxuICAgICAgICAgICAgcXVvdGVMZXZlbCA9IDA7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgcXVvdGVMZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICB0ID0gdGhpcy5nZXRUb2tlbihpKyspO1xuICAgICAgICAgICAgICAgICAgICBpZiAodC5raW5kID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodC5iZWdpbkNvbHVtbiA9PT0gMSAmJiB0aGlzLmN1cnJlbnRCbG9ja0xldmVsID4gMCAmJiB0aGlzLmN1cnJlbnRRdW90ZUxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcXVvdGVMZXZlbCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAodC5raW5kID09PSB0aGlzLnRtLkdUIHx8IHQua2luZCA9PT0gdGhpcy50bS5TUEFDRSB8fCB0LmtpbmQgPT09IHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICBpZiAocXVvdGVMZXZlbCA+IHRoaXMuY3VycmVudFF1b3RlTGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChxdW90ZUxldmVsIDwgdGhpcy5jdXJyZW50UXVvdGVMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAodC5raW5kID09PSB0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICByZXR1cm4gdC5raW5kICE9PSB0aGlzLnRtLkVPRiAmJiAodGhpcy5jdXJyZW50QmxvY2tMZXZlbCA9PT0gMCB8fCB0LmJlZ2luQ29sdW1uID49IGJsb2NrQmVnaW5Db2x1bW4gKyAyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIG11bHRpbGluZUFoZWFkOiBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICBpZiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRva2VuICYmIHRoaXMuZ2V0VG9rZW4oMikua2luZCAhPT0gdG9rZW4gJiYgdGhpcy5nZXRUb2tlbigyKS5raW5kICE9PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDI7IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSB0aGlzLmdldFRva2VuKGkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHQua2luZCA9PT0gdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0LmtpbmQgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB0aGlzLnNraXAoaSArIDEsIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQl0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVvdGVMZXZlbCA9IHRoaXMubmV3UXVvdGVMZXZlbChpKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocXVvdGVMZXZlbCA9PT0gdGhpcy5jdXJyZW50UXVvdGVMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHRoaXMuc2tpcChpLCBbdGhpcy50bS5TUEFDRSwgdGhpcy50bS5UQUIsIHRoaXMudG0uR1RdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRva2VuIHx8IHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdGhpcy50bS5FT0wgfHwgdGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkRBU0ggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkRJR0lUUyAmJiB0aGlzLmdldFRva2VuKGkgKyAxKS5raW5kID09PSB0aGlzLnRtLkRPVCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0sgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFRva2VuKGkgKyAyKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLKSB8fCB0aGlzLmhlYWRpbmdBaGVhZChpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodC5raW5kID09PSB0aGlzLnRtLkVPRikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgZmVuY2VzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuc2tpcCgyLCBbdGhpcy50bS5TUEFDRSwgdGhpcy50bS5UQUIsIHRoaXMudG0uR1RdKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSyAmJiB0aGlzLmdldFRva2VuKGkgKyAxKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLICYmIHRoaXMuZ2V0VG9rZW4oaSArIDIpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0spIHtcbiAgICAgICAgICAgICAgICBpID0gdGhpcy5za2lwKGkgKyAzLCBbdGhpcy50bS5TUEFDRSwgdGhpcy50bS5UQUJdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkVPTCB8fCB0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uRU9GO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgaGVhZGluZ0FoZWFkOiBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW4ob2Zmc2V0KS5raW5kID09PSB0aGlzLnRtLkVRKSB7XG4gICAgICAgICAgICB2YXIgaGVhZGluZyA9IDE7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAob2Zmc2V0ICsgMSk7IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW4oaSkua2luZCAhPT0gdGhpcy50bS5FUSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCsraGVhZGluZyA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGxpc3RJdGVtQWhlYWQ6IGZ1bmN0aW9uKGxpc3RCZWdpbkNvbHVtbiwgb3JkZXJlZCkge1xuICAgICAgICBpZiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBlb2wgPSAxLCBpID0gMjsgOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuZ2V0VG9rZW4oaSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodC5raW5kID09PSB0aGlzLnRtLkVPTCAmJiArK2VvbCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodC5raW5kICE9PSB0aGlzLnRtLlNQQUNFICYmIHQua2luZCAhPT0gdGhpcy50bS5UQUIgJiYgdC5raW5kICE9PSB0aGlzLnRtLkdUICYmIHQua2luZCAhPT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAodC5raW5kID09PSB0aGlzLnRtLkRJR0lUUyAmJiB0aGlzLmdldFRva2VuKGkgKyAxKS5raW5kID09PSB0aGlzLnRtLkRPVCAmJiB0LmJlZ2luQ29sdW1uID49IGxpc3RCZWdpbkNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQua2luZCA9PT0gdGhpcy50bS5EQVNIICYmIHQuYmVnaW5Db2x1bW4gPj0gbGlzdEJlZ2luQ29sdW1uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHRleHRBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wgJiYgdGhpcy5nZXRUb2tlbigyKS5raW5kICE9PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLnNraXAoMiwgW3RoaXMudG0uU1BBQ0UsIHRoaXMudG0uVEFCXSk7XG4gICAgICAgICAgICB2YXIgcXVvdGVMZXZlbCA9IHRoaXMubmV3UXVvdGVMZXZlbChpKTtcblxuICAgICAgICAgICAgaWYgKHF1b3RlTGV2ZWwgPT09IHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgfHwgISh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImJsb2NrcXVvdGVzXCIpID49IDApKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuc2tpcChpLCBbdGhpcy50bS5TUEFDRSwgdGhpcy50bS5UQUIsIHRoaXMudG0uR1RdKTtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuZ2V0VG9rZW4oaSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUb2tlbihpKS5raW5kICE9PSB0aGlzLnRtLkVPTCAmJiAhKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlzdHNcIikgPj0gMCAmJiB0LmtpbmQgPT09IHRoaXMudG0uREFTSCkgJiZcbiAgICAgICAgICAgICAgICAgICAgISh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpc3RzXCIpID49IDAgJiYgdC5raW5kID09PSB0aGlzLnRtLkRJR0lUUyAmJiB0aGlzLmdldFRva2VuKGkgKyAxKS5raW5kID09PSB0aGlzLnRtLkRPVCkgJiZcbiAgICAgICAgICAgICAgICAgICAgISh0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0sgJiYgdGhpcy5nZXRUb2tlbihpICsgMSkua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSyAmJiB0aGlzLmdldFRva2VuKGkgKyAyKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLKSAmJlxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaGVhZGluZ3NcIikgPj0gMCAmJiB0aGlzLmhlYWRpbmdBaGVhZChpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBuZXh0QWZ0ZXJTcGFjZTogZnVuY3Rpb24odG9rZW5zKSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5za2lwKDEsIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQl0pO1xuXG4gICAgICAgIHJldHVybiB0b2tlbnMuaW5kZXhPZih0aGlzLmdldFRva2VuKGkpLmtpbmQpID49IDA7XG4gICAgfSxcblxuICAgIG5ld1F1b3RlTGV2ZWw6IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICAgICB2YXIgcXVvdGVMZXZlbCA9IDA7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IG9mZnNldDsgOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcy5nZXRUb2tlbihpKTtcblxuICAgICAgICAgICAgaWYgKHQua2luZCA9PT0gdGhpcy50bS5HVCkge1xuICAgICAgICAgICAgICAgIHF1b3RlTGV2ZWwrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodC5raW5kICE9PSB0aGlzLnRtLlNQQUNFICYmIHQua2luZCAhPT0gdGhpcy50bS5UQUIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVvdGVMZXZlbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNraXA6IGZ1bmN0aW9uKG9mZnNldCwgdG9rZW5zKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBvZmZzZXQ7IDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHRoaXMuZ2V0VG9rZW4oaSk7XG5cbiAgICAgICAgICAgIGlmICh0b2tlbnMuaW5kZXhPZih0LmtpbmQpID09PSAtMSB8fCB0LmtpbmQgPT09IHRoaXMudG0uRU9GKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzT3JkZXJlZExpc3RBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblRva2VuKHRoaXMudG0uRElHSVRTKSAmJiAhdGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzRmVuY2VkQ29kZUJsb2NrQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5GZW5jZWRDb2RlQmxvY2soKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhlYWRpbmdIYXNJbmxpbmVFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuTGluaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5TdHJvbmcoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuQ29kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Mb29zZUNoYXIoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzVGV4dEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuVGV4dFRva2VucygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzSW1hZ2VBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkltYWdlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBibG9ja1F1b3RlSGFzRW1wdHlMaW5lQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5CbG9ja1F1b3RlRW1wdHlMaW5lKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNTdHJvbmdBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblN0cm9uZygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzRW1BaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNDb2RlQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5Db2RlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBibG9ja1F1b3RlSGFzQW55QmxvY2tFbGVtZW50c2VBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2Nhbk1vcmVCbG9ja0VsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNCbG9ja1F1b3RlRW1wdHlMaW5lc0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuQmxvY2tRdW90ZUVtcHR5TGluZXMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxpc3RJdGVtSGFzSW5saW5lRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5Nb3JlQmxvY2tFbGVtZW50cygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzSW5saW5lVGV4dEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuVGV4dFRva2VucygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzSW5saW5lRWxlbWVudEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuSW5saW5lRWxlbWVudCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaW1hZ2VIYXNBbnlFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkltYWdlRWxlbWVudCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzUmVzb3VyY2VUZXh0QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsaW5rSGFzQW55RWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5MaW5rRWxlbWVudCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzUmVzb3VyY2VVcmxBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblJlc291cmNlVXJsKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNvdXJjZUhhc0VsZW1lbnRBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblJlc291cmNlRWxlbWVudCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVzb3VyY2VUZXh0SGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblJlc291cmNlVGV4dEVsZW1lbnQoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc0VtV2l0aGluU3Ryb25nTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmUoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0cm9uZ011bHRpbGluZUhhc0VsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdNdWx0aWxpbmVFbGVtZW50cygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3Ryb25nV2l0aGluRW1NdWx0aWxpbmVIYXNFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50cygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzSW1hZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5JbWFnZSgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzTGlua0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuTGluaygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3Ryb25nRW1XaXRoaW5TdHJvbmdBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtV2l0aGluU3Ryb25nKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHJvbmdIYXNFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblN0cm9uZ0VsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHJvbmdXaXRoaW5FbUhhc0VsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdXaXRoaW5FbUVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNTdHJvbmdXaXRoaW5FbU11bHRpbGluZUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmUoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGVtTXVsdGlsaW5lQ29udGVudEhhc0VsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5FbU11bHRpbGluZUNvbnRlbnRFbGVtZW50cygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50SGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICBlbUhhc1N0cm9uZ1dpdGhpbkVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuU3Ryb25nV2l0aGluRW0oKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGVtSGFzRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5FbUVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBlbVdpdGhpblN0cm9uZ0hhc0VsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ0VsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb2RlVGV4dEhhc0FueVRva2VuQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5Db2RlVGV4dFRva2VucygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdGV4dEhhc1Rva2Vuc0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuVGV4dCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2Nhbkxvb3NlQ2hhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1NMQVNIKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNPTE9OKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uREFTSCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRElHSVRTKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRPVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVRKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FU0NBUEVEX0NIQVIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFBBUkVOKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uUkJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSAhdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5FT0wsIHRoaXMudG0uRU9GXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VuKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblRleHRUb2tlbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVGV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuQ29kZVRleHRUb2tlbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ09MT04pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRBU0gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRElHSVRTKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRE9UKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FUSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FU0NBUEVEX0NIQVIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uUkJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSAhdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5FT0wsIHRoaXMudG0uRU9GXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VuKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkNvZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykgfHwgdGhpcy5zY2FuQ29kZVRleHRUb2tlbnNBaGVhZCgpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spO1xuICAgIH0sXG5cbiAgICBzY2FuQ29kZU11bHRpbGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmIChzY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykgfHwgdGhpcy5zY2FuQ29kZVRleHRUb2tlbnNBaGVhZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNDb2RlVGV4dE9uTmV4dExpbmVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKEJBQ0tUSUNLKTtcbiAgICB9LFxuXG4gICAgc2NhbkNvZGVUZXh0VG9rZW5zQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuQ29kZVRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGVUZXh0VG9rZW5zKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGhhc0NvZGVUZXh0T25OZXh0TGluZUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRlc3BhY2VUb2tlbkJlZm9yZUVvbCgpKSB7XG4gICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkdUKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Db2RlVGV4dFRva2Vuc0FoZWFkKCk7XG4gICAgfSxcblxuICAgIHNjYW5XaGl0c3BhY2VUb2tlbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbldoaXRlc3BhY2VUb2tlbkJlZm9yZUVvbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVPTCk7XG4gICAgfSxcblxuICAgIHNjYW5FbVdpdGhpblN0cm9uZ0VsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5UZXh0VG9rZW5zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuTGluaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuQ29kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRW1XaXRoaW5TdHJvbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSB8fCB0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ0VsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ0VsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICB9LFxuXG4gICAgc2NhbkVtRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkgfHwgdGhpcy5zY2FuRW1FbGVtZW50cygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuRW1FbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgfSxcblxuICAgIHNjYW5FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGhhc05vRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkVtV2l0aGluU3Ryb25nTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkgfHwgdGhpcy5oYXNOb0VtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudEFoZWFkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5XaGl0ZXNwYWNlVG9rZW5CZWZvcmVFb2woKSB8fCB0aGlzLmhhc05vRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgIH0sXG5cbiAgICBzY2FuRW1NdWx0aWxpbmVDb250ZW50RWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9IHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCB8fCB0aGlzLnNjYW5Db2RlTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblN0cm9uZ1dpdGhpbkVtRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblN0cm9uZ1dpdGhpbkVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spIHx8IHRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICB9LFxuXG4gICAgc2NhblN0cm9uZ0VsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5UZXh0VG9rZW5zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuTGluaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQkFDS1RJQ0spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuQ29kZU11bHRpbGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbVdpdGhpblN0cm9uZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblN0cm9uZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSB8fCB0aGlzLnNjYW5TdHJvbmdFbGVtZW50cygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICB9LFxuXG4gICAgc2NhblN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkZvck1vcmVTdHJvbmdXaXRoaW5FbU11bHRpbGluZUVsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spIHx8IHRoaXMuc2NhbkZvck1vcmVTdHJvbmdXaXRoaW5FbU11bHRpbGluZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5XaGl0ZXNwYWNlVG9rZW5CZWZvcmVFb2woKSB8fCB0aGlzLnNjYW5Gb3JNb3JlU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nTXVsdGlsaW5lRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VUZXh0RWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1NMQVNIKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ09MT04pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uREFTSCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRJR0lUUykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRE9UKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVRKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFBBUkVOKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uUkJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWFudGljTG9va0FoZWFkID0gIXRoaXMubmV4dEFmdGVyU3BhY2UoW3RoaXMudG0uUlBBUkVOXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VuKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkltYWdlRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuUmVzb3VyY2VFbGVtZW50cygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Mb29zZUNoYXIoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblJlc291cmNlVGV4dEVsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblJlc291cmNlVGV4dEVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblJlc291cmNlVXJsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFBBUkVOKSB8fCB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSB8fCB0aGlzLnNjYW5SZXNvdXJjZVRleHRFbGVtZW50cygpIHx8XG4gICAgICAgICAgICB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJQQVJFTik7XG4gICAgfSxcblxuICAgIHNjYW5MaW5rRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuRW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuUmVzb3VyY2VFbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Nhbkxvb3NlQ2hhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblJlc291cmNlRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNPTE9OKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5EQVNIKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRE9UKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkdUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSAhdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5SQlJBQ0tdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VuKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblJlc291cmNlRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuUmVzb3VyY2VFbGVtZW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2Nhbkxpbms6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhbkxpbmtFbGVtZW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rRWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uUkJSQUNLKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZVVybCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5JbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSykgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkgfHwgdGhpcy5zY2FuSW1hZ2VFbGVtZW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJCUkFDSykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICBpZiAodGhpcy5zY2FuUmVzb3VyY2VVcmwoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuSW5saW5lRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWFudGljTG9va0FoZWFkID0gdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9IHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuQ29kZU11bHRpbGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuTG9vc2VDaGFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblBhcmFncmFwaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5JbmxpbmVFbGVtZW50KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbmxpbmVFbGVtZW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5Gb3JDb2RlTGFuZ3VhZ2VFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkZvckNvZGVMYW5ndWFnZUVsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhbkZvckNvZGVMYW5ndWFnZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkZvckNvZGVMYW5ndWFnZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbldoaXRzcGFjZVRva2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlNQQUNFKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5UQUIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRmVuY2VkQ29kZUJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICBpZiAodGhpcy5zY2FuRm9yQ29kZUxhbmd1YWdlRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgIH1cbiAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVPTCkgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkJsb2NrUXVvdGVFbXB0eUxpbmVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbkJsb2NrUXVvdGVFbXB0eUxpbmUoKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVPTCk7XG4gICAgfSxcblxuICAgIHNjYW5CbG9ja1F1b3RlRW1wdHlMaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRU9MKSB8fCB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkdUKSB8fCB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRm9ySGVhZGVyc2lnbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FUSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVRKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2Nhbk1vcmVCbG9ja0VsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9IHRoaXMuaGVhZGluZ0FoZWFkKDEpO1xuICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuRm9ySGVhZGVyc2lnbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5EQVNIKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRElHSVRTKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRPVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkZlbmNlZENvZGVCbG9jaygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblBhcmFncmFwaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhblRva2VuOiBmdW5jdGlvbihraW5kKSB7XG4gICAgICAgIGlmICh0aGlzLnNjYW5Qb3NpdGlvbiA9PT0gdGhpcy5sYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubG9va0FoZWFkLS07XG4gICAgICAgICAgICBpZiAoIXRoaXMuc2NhblBvc2l0aW9uLm5leHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24ubmV4dCA9IHRoaXMudG0uZ2V0TmV4dFRva2VuKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbi5uZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbi5uZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNjYW5Qb3NpdGlvbi5raW5kICE9PSBraW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5sb29rQWhlYWQgPT09IDAgJiYgdGhpcy5zY2FuUG9zaXRpb24gPT09IHRoaXMubGFzdFBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyB0aGlzLmxvb2tBaGVhZFN1Y2Nlc3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBnZXROZXh0VG9rZW5LaW5kOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMubmV4dFRva2VuS2luZCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHRUb2tlbktpbmQ7XG4gICAgICAgIH0gZWxzZSBpZiAoISh0aGlzLm5leHRUb2tlbiA9IHRoaXMudG9rZW4ubmV4dCkpIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4ubmV4dCA9IHRoaXMudG0uZ2V0TmV4dFRva2VuKCk7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMubmV4dFRva2VuS2luZCA9IHRoaXMudG9rZW4ubmV4dC5raW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMubmV4dFRva2VuS2luZCA9IHRoaXMubmV4dFRva2VuLmtpbmQpO1xuICAgIH0sXG5cbiAgICBjb25zdW1lVG9rZW46IGZ1bmN0aW9uKGtpbmQpIHtcbiAgICAgICAgdmFyIG9sZCA9IHRoaXMudG9rZW47XG5cbiAgICAgICAgaWYgKHRoaXMudG9rZW4ubmV4dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMudG9rZW4ubmV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLnRva2VuLm5leHQgPSB0aGlzLnRtLmdldE5leHRUb2tlbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV4dFRva2VuS2luZCA9IC0xO1xuICAgICAgICBpZiAodGhpcy50b2tlbi5raW5kID09PSBraW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRva2VuID0gb2xkO1xuICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICB9LFxuXG4gICAgZ2V0VG9rZW46IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIHZhciB0ID0gdGhpcy5sb29raW5nQWhlYWQgPyB0aGlzLnNjYW5Qb3NpdGlvbiA6IHRoaXMudG9rZW47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgdCA9IHQubmV4dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdCA9IHQubmV4dCA9IHRoaXMudG0uZ2V0TmV4dFRva2VuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBUb2tlbihraW5kLCBiZWdpbkxpbmUsIGJlZ2luQ29sdW1uLCBlbmRMaW5lLCBlbmRDb2x1bW4sIGltYWdlKSB7XG5cdHRoaXMua2luZCA9IGtpbmQ7XG5cdHRoaXMuYmVnaW5MaW5lID0gYmVnaW5MaW5lO1xuXHR0aGlzLmJlZ2luQ29sdW1uID0gYmVnaW5Db2x1bW47XG4gICAgdGhpcy5lbmRMaW5lID0gZW5kTGluZTtcblx0dGhpcy5lbmRDb2x1bW4gPSBlbmRDb2x1bW47XG5cdHRoaXMuaW1hZ2UgPSBpbWFnZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUb2tlbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgVG9rZW4gPSByZXF1aXJlKFwiLi90b2tlblwiKTtcblxuZnVuY3Rpb24gVG9rZW5NYW5hZ2VyKHN0cmVhbSkge1xuXHR0aGlzLmNzID0gc3RyZWFtO1xuXHR0aGlzLmpqcm91bmRzID0gW107XG5cdHRoaXMuampzdGF0ZVNldCA9IFtdO1xuXHR0aGlzLmpqbmV4dFN0YXRlcyA9IFsyLCAzLCA1XTtcbn1cblxuVG9rZW5NYW5hZ2VyLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFRva2VuTWFuYWdlcixcblxuXHRFT0Y6IDAsXG5cdEFTVEVSSVNLOiAxLFxuXHRCQUNLU0xBU0g6IDIsXG5cdEJBQ0tUSUNLOiAzLFxuXHRDSEFSX1NFUVVFTkNFOiA0LFxuXHRDT0xPTjogNSxcblx0REFTSDogNixcblx0RElHSVRTOiA3LFxuXHRET1Q6IDgsXG5cdEVPTDogOSxcblx0RVE6IDEwLFxuXHRFU0NBUEVEX0NIQVI6IDExLFxuXHRHVDogMTIsXG5cdElNQUdFX0xBQkVMOiAxMyxcblx0TEJSQUNLOiAxNCxcblx0TFBBUkVOOiAxNSxcblx0TFQ6IDE2LFxuXHRSQlJBQ0s6IDE3LFxuXHRSUEFSRU46IDE4LFxuXHRTUEFDRTogMTksXG5cdFRBQjogMjAsXG5cdFVOREVSU0NPUkU6IDIxLFxuXG4gICAgZ2V0TmV4dFRva2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBjdXJQb3MgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MuYmVnaW5Ub2tlbigpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IC0xO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsVG9rZW4oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0gMjE0NzQ4MzY0NztcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSAwO1xuICAgICAgICAgICAgICAgIGN1clBvcyA9IHRoaXMubW92ZVN0cmluZ0xpdGVyYWxEZmEwKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaGVkS2luZCAhPT0gMjE0NzQ4MzY0Nykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXRjaGVkUG9zICsgMSA8IGN1clBvcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcy5iYWNrdXAoY3VyUG9zIC0gdGhpcy5tYXRjaGVkUG9zIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFRva2VuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBmaWxsVG9rZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFRva2VuKHRoaXMubWF0Y2hlZEtpbmQsIHRoaXMuY3MuZ2V0QmVnaW5MaW5lKCksIHRoaXMuY3MuZ2V0QmVnaW5Db2x1bW4oKSwgdGhpcy5jcy5nZXRFbmRMaW5lKCksIHRoaXMuY3MuZ2V0RW5kQ29sdW1uKCksXG4gICAgICAgICAgICAgICAgdGhpcy5jcy5nZXRJbWFnZSgpKTtcbiAgICB9LFxuXG4gICAgbW92ZVN0cmluZ0xpdGVyYWxEZmEwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICBjYXNlIDk6IHJldHVybiB0aGlzLnN0YXJ0TmZhV2l0aFN0YXRlcygwLCB0aGlzLlRBQiwgOCk7XG4gICAgICAgIGNhc2UgMzI6IHJldHVybiB0aGlzLnN0YXJ0TmZhV2l0aFN0YXRlcygwLCB0aGlzLlNQQUNFLCA4KTtcbiAgICAgICAgY2FzZSA0MDogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuTFBBUkVOKTtcbiAgICAgICAgY2FzZSA0MTogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuUlBBUkVOKTtcbiAgICAgICAgY2FzZSA0MjogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuQVNURVJJU0spO1xuICAgICAgICBjYXNlIDQ1OiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5EQVNIKTtcbiAgICAgICAgY2FzZSA0NjogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuRE9UKTtcbiAgICAgICAgY2FzZSA1ODogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuQ09MT04pO1xuICAgICAgICBjYXNlIDYwOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5MVCk7XG4gICAgICAgIGNhc2UgNjE6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkVRKTtcbiAgICAgICAgY2FzZSA2MjogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuR1QpO1xuICAgICAgICBjYXNlIDczOiByZXR1cm4gdGhpcy5tb3ZlU3RyaW5nTGl0ZXJhbERmYTEoMHgyMDAwKTtcbiAgICAgICAgY2FzZSA5MTogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuTEJSQUNLKTtcbiAgICAgICAgY2FzZSA5MjogcmV0dXJuIHRoaXMuc3RhcnROZmFXaXRoU3RhdGVzKDAsIHRoaXMuQkFDS1NMQVNILCA3KTtcbiAgICAgICAgY2FzZSA5MzogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuUkJSQUNLKTtcbiAgICAgICAgY2FzZSA5NTogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuVU5ERVJTQ09SRSk7XG4gICAgICAgIGNhc2UgOTY6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkJBQ0tUSUNLKTtcbiAgICAgICAgY2FzZSAxMDU6IHJldHVybiB0aGlzLm1vdmVTdHJpbmdMaXRlcmFsRGZhMSgweDIwMDApO1xuICAgICAgICBkZWZhdWx0OiByZXR1cm4gdGhpcy5tb3ZlTmZhKDYsIDApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0TmZhV2l0aFN0YXRlczogZnVuY3Rpb24ocG9zLCBraW5kLCBzdGF0ZSkge1xuICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0ga2luZDtcbiAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gcG9zO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5yZWFkQ2hhcigpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zICsgMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmZhKHN0YXRlLCBwb3MgKyAxKTtcbiAgICB9LFxuXG4gICAgc3RvcEF0UG9zOiBmdW5jdGlvbihwb3MsIGtpbmQpIHtcbiAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IGtpbmQ7XG4gICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IHBvcztcbiAgICAgICAgcmV0dXJuIHBvcyArIDE7XG4gICAgfSxcblxuICAgIG1vdmVTdHJpbmdMaXRlcmFsRGZhMTogZnVuY3Rpb24oYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MucmVhZENoYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSA3NyB8fCB0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gMTA5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlU3RyaW5nTGl0ZXJhbERmYTIoYWN0aXZlLCAweDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0TmZhKDAsIGFjdGl2ZSk7XG4gICAgfSxcblxuICAgIG1vdmVTdHJpbmdMaXRlcmFsRGZhMjogZnVuY3Rpb24ob2xkLCBhY3RpdmUpIHtcbiAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5yZWFkQ2hhcigpO1xuICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDY1IHx8IHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSA5Nykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW92ZVN0cmluZ0xpdGVyYWxEZmEzKGFjdGl2ZSwgMHgyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE5mYSgxLCBhY3RpdmUpO1xuXG4gICAgfSxcblxuICAgIG1vdmVTdHJpbmdMaXRlcmFsRGZhMzogZnVuY3Rpb24ob2xkLCBhY3RpdmUpIHtcbiAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5yZWFkQ2hhcigpO1xuICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDcxIHx8IHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSAxMDMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdmVTdHJpbmdMaXRlcmFsRGZhNChhY3RpdmUsIDB4MjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnROZmEoMiwgYWN0aXZlKTtcbiAgICB9LFxuXG4gICAgbW92ZVN0cmluZ0xpdGVyYWxEZmE0OiBmdW5jdGlvbihvbGQsIGFjdGl2ZSkge1xuICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLnJlYWRDaGFyKCk7XG4gICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gNjkgfHwgdGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDEwMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW92ZVN0cmluZ0xpdGVyYWxEZmE1KGFjdGl2ZSwgMHgyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE5mYSgzLCBhY3RpdmUpO1xuICAgIH0sXG5cbiAgICBtb3ZlU3RyaW5nTGl0ZXJhbERmYTU6IGZ1bmN0aW9uKG9sZCwgYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MucmVhZENoYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSA1OCAmJiAoKGFjdGl2ZSAmIDB4MjAwMCkgIT09IDApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9wQXRQb3MoNSwgMTMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0TmZhKDQsIGFjdGl2ZSk7XG4gICAgfSxcblxuICAgIHN0YXJ0TmZhOiBmdW5jdGlvbihwb3MsIGFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlTmZhKHRoaXMuc3RvcFN0cmluZ0xpdGVyYWxEZmEocG9zLCBhY3RpdmUpLCBwb3MgKyAxKTtcbiAgICB9LFxuXG4gICAgbW92ZU5mYTogZnVuY3Rpb24oc3RhcnRTdGF0ZSwgY3VyUG9zKSB7XG4gICAgICAgIHRoaXMuampuZXdTdGF0ZUNudCA9IDg7XG4gICAgICAgIHRoaXMuampzdGF0ZVNldFswXSA9IHN0YXJ0U3RhdGU7XG4gICAgICAgIHZhciBzdGFydHNBdCA9IDA7XG4gICAgICAgIHZhciBpID0gMTtcbiAgICAgICAgdmFyIGwgPSBudWxsO1xuICAgICAgICB2YXIga2luZCA9IDB4N2ZmZmZmZmY7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmICgrK3RoaXMucm91bmQgPT09IDB4N2ZmZmZmZmYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdW5kID0gMHg4MDAwMDAwMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA8IDY0KSB7XG4gICAgICAgICAgICAgICAgbCA9IDEgKiBOdW1iZXIoTWF0aC5wb3coMiwgdGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkpKTtcblxuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmpqc3RhdGVTZXRbLS1pXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHg4ODAwOThmZWZmZmZkOWZmLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID4gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYml0d2lzZTY0KDB4M2ZmMDAwMDAwMDAwMDAwLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID4gNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGQoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYml0d2lzZTY0KDB4MjQwMCwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA+IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpdHdpc2U2NCg0Mjk0OTY3ODA4LCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkU3RhdGVzKDAsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuampzdGF0ZVNldFt0aGlzLmpqbmV3U3RhdGVDbnQrK10gPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDI0MDAsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPiA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaXR3aXNlNjQoMHgxMDAwMDAyMDAsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGRTdGF0ZXMoMCwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qanN0YXRlU2V0W3RoaXMuampuZXdTdGF0ZUNudCsrXSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4ODgwMDk4ZmVmZmZmZDlmZiwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHgzZmYwMDAwMDAwMDAwMDAsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPiA3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHgxMDAwMDAyMDAsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGRTdGF0ZXMoMCwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4MjQwMCwgbCkgIT09IDAgJiYga2luZCA+IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDEwICYmIGtpbmQgPiA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuampzdGF0ZVNldFt0aGlzLmpqbmV3U3RhdGVDbnQrK10gPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDc3ZmY2NzAwMDAwMDAwMDAsIGwpICE9PSAwICYmIGtpbmQgPiAxMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoaSAhPT0gc3RhcnRzQXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA8IDEyOCkge1xuICAgICAgICAgICAgICAgIGwgPSAxICogTnVtYmVyKE1hdGgucG93KDIsIHRoaXMuYml0d2lzZTY0KHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApLCA2MykpKTtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5qanN0YXRlU2V0Wy0taV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gOTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpqc3RhdGVTZXRbdGhpcy5qam5ld1N0YXRlQ250KytdID0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHhmZmZmZmZmZTQ3ZmZmZmZmLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDFiODAwMDAwMCwgbCkgIT09IDAgJiYga2luZCA+IDExKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDExO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlIChpICE9PSBzdGFydHNBdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmpqc3RhdGVTZXRbLS1pXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID4gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGkgIT09IHN0YXJ0c0F0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGtpbmQgIT09IDB4N2ZmZmZmZmYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0ga2luZDtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSBjdXJQb3M7XG4gICAgICAgICAgICAgICAga2luZCA9IDB4N2ZmZmZmZmY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICArK2N1clBvcztcblxuICAgICAgICAgICAgaWYgKChpID0gdGhpcy5qam5ld1N0YXRlQ250KSA9PT0gKHN0YXJ0c0F0ID0gOCAtICh0aGlzLmpqbmV3U3RhdGVDbnQgPSBzdGFydHNBdCkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1clBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5yZWFkQ2hhcigpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSxcblxuICAgIGNoZWNrTkFkZFN0YXRlczogZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCh0aGlzLmpqbmV4dFN0YXRlc1tzdGFydF0pO1xuICAgICAgICB9IHdoaWxlIChzdGFydCsrICE9PSBlbmQpO1xuICAgIH0sXG5cbiAgICBjaGVja05BZGQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgIGlmICh0aGlzLmpqcm91bmRzW3N0YXRlXSAhPT0gdGhpcy5yb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5qanN0YXRlU2V0W3RoaXMuampuZXdTdGF0ZUNudCsrXSA9IHN0YXRlO1xuICAgICAgICAgICAgdGhpcy5qanJvdW5kc1tzdGF0ZV0gPSB0aGlzLnJvdW5kO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0b3BTdHJpbmdMaXRlcmFsRGZhOiBmdW5jdGlvbihwb3MsIGFjdGl2ZSkge1xuICAgICAgICBpZiAocG9zID09PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoYWN0aXZlLCAweDIwMDApICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IDQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYml0d2lzZTY0KGFjdGl2ZSwgMHgxODAwMDApICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYml0d2lzZTY0KGFjdGl2ZSwgMHg0KSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiA3O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gMSAmJiB0aGlzLmJpdHdpc2U2NChhY3RpdmUsIDB4MjAwMCkgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSA0O1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gMTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gMiAmJiB0aGlzLmJpdHdpc2U2NChhY3RpdmUsIDB4MjAwMCkgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSA0O1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gMjtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gMyAmJiB0aGlzLmJpdHdpc2U2NChhY3RpdmUsIDB4MjAwMCkgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSA0O1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gMztcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9IGVsc2UgaWYgKHBvcyA9PT0gNCAmJiB0aGlzLmJpdHdpc2U2NChhY3RpdmUsIDB4MjAwMCkgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSA0O1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gNDtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuXG4gICAgYml0d2lzZTY0OiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHZhciBkaXZpc29yID0gMSA8PCAzMDtcbiAgICAgICAgdmFyIG1hc2sgPSB+KCh+MCkgPDwgMzApO1xuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgdmFyIHNoaWZ0ID0gMDtcblxuICAgICAgICB3aGlsZSAoKGEgIT09IDApICYmIChiICE9PSAwKSkge1xuICAgICAgICAgICAgdmFyIHJzID0gKG1hc2sgJiBhKSAmIChtYXNrICYgYik7XG5cbiAgICAgICAgICAgIGEgPSBNYXRoLmZsb29yKGEgLyBkaXZpc29yKTtcbiAgICAgICAgICAgIGIgPSBNYXRoLmZsb29yKGIgLyBkaXZpc29yKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBzaGlmdCsrOyBpLS07KSB7XG4gICAgICAgICAgICAgICAgcnMgKj0gZGl2aXNvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCArPSBycztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb2tlbk1hbmFnZXI7XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBUcmVlU3RhdGUoKSB7XG5cdHRoaXMubm9kZXMgPSBbXTtcblx0dGhpcy5tYXJrcyA9IFtdO1xuXHR0aGlzLm5vZGVzT25TdGFjayA9IDA7XG5cdHRoaXMuY3VycmVudE1hcmsgPSAwO1xufVxuXG5UcmVlU3RhdGUucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVHJlZVN0YXRlLFxuXG5cdG9wZW5TY29wZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5tYXJrcy5wdXNoKHRoaXMuY3VycmVudE1hcmspO1xuXHRcdHRoaXMuY3VycmVudE1hcmsgPSB0aGlzLm5vZGVzT25TdGFjaztcblx0fSxcblxuXHRjbG9zZVNjb3BlOiBmdW5jdGlvbihuKSB7XG4gICAgICAgIHZhciBhID0gdGhpcy5ub2RlQXJpdHkoKTtcblxuXHRcdHRoaXMuY3VycmVudE1hcmsgPSB0aGlzLm1hcmtzLnBvcCgpO1xuXHRcdHdoaWxlIChhLS0gPiAwKSB7XG4gICAgICAgICAgdmFyIGMgPSB0aGlzLnBvcE5vZGUoKTtcblxuICAgICAgICAgIGMucGFyZW50ID0gbjtcbiAgICAgICAgICBuLmFkZChjLCBhKTtcbiAgICAgICAgfVxuXHRcdHRoaXMucHVzaE5vZGUobik7XG5cdH0sXG5cblx0YWRkU2luZ2xlVmFsdWU6IGZ1bmN0aW9uKG4sIHQpIHtcblx0XHR0aGlzLm9wZW5TY29wZSgpO1xuICAgICAgICBuLnZhbHVlID0gdC5pbWFnZTtcbiAgICAgICAgdGhpcy5jbG9zZVNjb3BlKG4pO1xuXHR9LFxuXG5cdG5vZGVBcml0eTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMubm9kZXNPblN0YWNrIC0gdGhpcy5jdXJyZW50TWFyaztcblx0fSxcblxuICAgIHBvcE5vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAtLXRoaXMubm9kZXNPblN0YWNrO1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5wb3AoKTtcbiAgICB9LFxuXG4gICAgcHVzaE5vZGU6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKG4pO1xuICAgICAgICArK3RoaXMubm9kZXNPblN0YWNrO1xuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmVlU3RhdGU7XG4iXX0=
