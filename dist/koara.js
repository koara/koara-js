(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.koara = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib/koara");

},{"./lib/koara":2}],2:[function(require,module,exports){
"use strict";

var used = [],
    exports = module.exports = {};

exports.CharStream = require("./koara/charstream");
exports.Parser = require("./koara/parser");
exports.StringReader = require("./koara/io/stringreader");

},{"./koara/charstream":21,"./koara/io/stringreader":22,"./koara/parser":24}],3:[function(require,module,exports){
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

},{"./node":17}],4:[function(require,module,exports){
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

},{"./document":9,"./node":17}],5:[function(require,module,exports){
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

},{"./document":9,"./node":17}],6:[function(require,module,exports){
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

},{"./blockelement":5}],7:[function(require,module,exports){
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

},{"./node":17}],8:[function(require,module,exports){
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

},{"./blockelement":5}],9:[function(require,module,exports){
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

},{"./node":17}],10:[function(require,module,exports){
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

},{"./node":17}],11:[function(require,module,exports){
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

},{"./blockelement":5}],12:[function(require,module,exports){
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

},{"./node":17}],13:[function(require,module,exports){
"use strict";

var Node = require("./node");

function LineBreak() {}
LineBreak.prototype = new Node();
LineBreak.prototype.constructor = LineBreak;

LineBreak.prototype.accept = function(renderer) {
	renderer.visitLineBreak(this);
};

module.exports = LineBreak;

},{"./node":17}],14:[function(require,module,exports){
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

},{"./node":17}],15:[function(require,module,exports){
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

},{"./blockelement":5}],16:[function(require,module,exports){
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

},{"./node":17}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./blockelement":5}],19:[function(require,module,exports){
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

},{"./node":17}],20:[function(require,module,exports){
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

},{"./node":17}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
"use strict";

function LookaheadSuccess() {}

module.exports = LookaheadSuccess;

},{}],24:[function(require,module,exports){
"use strict";

var LookaheadSuccess = require("./lookaheadsuccess");
var StringReader = require("./io/stringreader");
var CharStream = require("./charstream");
var TokenManager = require("./tokenmanager");
var Token = require("./token");
var TreeState = require("./treestate");

var Document = require("./ast/Document");
var BlockElement = require("./ast/blockElement");
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
        this.lookAhead = 3;
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
        return this.scanToken(this.tm.BACKTICK) || this.scanToken(this.tm.BACKTICK) || this.scanToken(this.tm.BACKTICK);
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

},{"./ast/Document":3,"./ast/blockElement":4,"./ast/blockquote":6,"./ast/code":7,"./ast/codeblock":8,"./ast/em":10,"./ast/heading":11,"./ast/image":12,"./ast/linebreak":13,"./ast/link":14,"./ast/listblock":15,"./ast/listitem":16,"./ast/paragraph":18,"./ast/strong":19,"./ast/text":20,"./charstream":21,"./io/stringreader":22,"./lookaheadsuccess":23,"./token":25,"./tokenmanager":26,"./treestate":27}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{"./token":25}],27:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvaW5kZXguanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvRG9jdW1lbnQuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9ibG9ja0VsZW1lbnQuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9ibG9ja2VsZW1lbnQuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9ibG9ja3F1b3RlLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvY29kZS5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2NvZGVibG9jay5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2RvY3VtZW50LmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvZW0uanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9oZWFkaW5nLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvaW1hZ2UuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9saW5lYnJlYWsuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9saW5rLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvbGlzdGJsb2NrLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvbGlzdGl0ZW0uanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9ub2RlLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvcGFyYWdyYXBoLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3Qvc3Ryb25nLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvdGV4dC5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvY2hhcnN0cmVhbS5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvaW8vc3RyaW5ncmVhZGVyLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9sb29rYWhlYWRzdWNjZXNzLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9wYXJzZXIuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL3Rva2VuLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS90b2tlbm1hbmFnZXIuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL3RyZWVzdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDOzs7QUNBeEMsWUFBWSxDQUFDOztBQUViLElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbEMsT0FBTyxDQUFDLFVBQVUsR0FB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QyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUNuRCxNQUFNO29CQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXO3dCQUNwQixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDbEQsTUFBTTtvQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDWCxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDekMsTUFBTTtvQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDWCxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDekMsTUFBTTtvQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTt3QkFDZixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDN0MsTUFBTTtvQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTt3QkFDZixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDN0MsTUFBTTtvQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTt3QkFDZixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQzt3QkFDN0MsTUFBTTtvQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTt3QkFDZixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJ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RUFBRSxDQUFDO0FBQ2hDLFVBQVUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDOztVQUVYLEdBQUc7WUFDRCxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUMvQixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYTtnQkFDdEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3BELE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUztnQkFDbEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ2hELE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSztnQkFDZCxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDNUMsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJO2dCQUNiLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUMzQyxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07Z0JBQ2YsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRztnQkFDWixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDMUMsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNY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QWEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7b0JBRXZDLElBQUksVUFBVSxLQUFLLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt3QkFDdkMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUk7NkJBQ2pILElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQzs2QkFDdEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUTs0QkFDN0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDekUs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LEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxLQUFLLEVBQUUsRUFBRSxPQUFP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QzFDLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEIsS0FBSzs7SUFFRCxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLEdBQUcs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Q0FBQztBQUM1QixLQUFLOztBQUVMLENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9rb2FyYVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXNlZCA9IFtdLFxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5leHBvcnRzLkNoYXJTdHJlYW0gPSByZXF1aXJlKFwiLi9rb2FyYS9jaGFyc3RyZWFtXCIpO1xuZXhwb3J0cy5QYXJzZXIgPSByZXF1aXJlKFwiLi9rb2FyYS9wYXJzZXJcIik7XG5leHBvcnRzLlN0cmluZ1JlYWRlciA9IHJlcXVpcmUoXCIuL2tvYXJhL2lvL3N0cmluZ3JlYWRlclwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG5cbmZ1bmN0aW9uIERvY3VtZW50KCkge1xuICAgIE5vZGUuY2FsbCh0aGlzKTtcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcbkRvY3VtZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERvY3VtZW50O1xuRG9jdW1lbnQucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG4gICAgcmVuZGVyZXIudmlzaXREb2N1bWVudCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRG9jdW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKFwiLi9ub2RlXCIpO1xudmFyIERvY3VtZW50ID0gcmVxdWlyZShcIi4vZG9jdW1lbnRcIik7XG5cbmZ1bmN0aW9uIEJsb2NrRWxlbWVudCgpIHtcbiAgICBOb2RlLmNhbGwodGhpcyk7XG59XG5cbkJsb2NrRWxlbWVudC5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuQmxvY2tFbGVtZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJsb2NrRWxlbWVudDtcblxuQmxvY2tFbGVtZW50LnByb3RvdHlwZS5pc05lc3RlZCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gISh0aGlzLnBhcmVudC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIkRvY3VtZW50XCIpO1xufTtcblxuQmxvY2tFbGVtZW50LnByb3RvdHlwZS5pc1NpbmdsZUNoaWxkID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDE7XG59O1xuXG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG4gICAgcmVuZGVyZXIudmlzaXRCbG9ja0VsZW1lbnQodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2NrRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG52YXIgRG9jdW1lbnQgPSByZXF1aXJlKFwiLi9kb2N1bWVudFwiKTtcblxuZnVuY3Rpb24gQmxvY2tFbGVtZW50KCkge1xuICAgIE5vZGUuY2FsbCh0aGlzKTtcbn1cblxuQmxvY2tFbGVtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmxvY2tFbGVtZW50O1xuXG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmlzTmVzdGVkID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiAhKHRoaXMucGFyZW50LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiRG9jdW1lbnRcIik7XG59O1xuXG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmlzU2luZ2xlQ2hpbGQgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMTtcbn07XG5cbkJsb2NrRWxlbWVudC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdEJsb2NrRWxlbWVudCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmxvY2tFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9ibG9ja2VsZW1lbnRcIik7XG5cbmZ1bmN0aW9uIEJsb2NrUXVvdGUoKSB7XG5cdEJsb2NrRWxlbWVudC5jYWxsKHRoaXMpO1xufVxuXG5CbG9ja1F1b3RlLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcbkJsb2NrUXVvdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmxvY2tRdW90ZTtcblxuQmxvY2tRdW90ZS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdEJsb2NrUXVvdGUodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2NrUXVvdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKFwiLi9ub2RlXCIpO1xuXG5mdW5jdGlvbiBDb2RlKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkNvZGUucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcbkNvZGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTtcblxuQ29kZS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRDb2RlKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9ibG9ja2VsZW1lbnRcIik7XG5cbmZ1bmN0aW9uIENvZGVCbG9jaygpIHtcblx0QmxvY2tFbGVtZW50LmNhbGwodGhpcyk7XG59XG5cbkNvZGVCbG9jay5wcm90b3R5cGUgPSBuZXcgQmxvY2tFbGVtZW50KCk7XG5Db2RlQmxvY2sucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZUJsb2NrO1xuXG5Db2RlQmxvY2sucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0Q29kZUJsb2NrKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlQmxvY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKFwiLi9ub2RlXCIpO1xuXG5mdW5jdGlvbiBEb2N1bWVudCgpIHtcbiAgICBOb2RlLmNhbGwodGhpcyk7XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5Eb2N1bWVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEb2N1bWVudDtcbkRvY3VtZW50LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLnZpc2l0RG9jdW1lbnQodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gRW0oKSB7XG5cdE5vZGUuY2FsbCh0aGlzKTtcbn1cblxuRW0ucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcbkVtLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVtO1xuXG5FbS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRFbSh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJsb2NrRWxlbWVudCA9IHJlcXVpcmUoXCIuL2Jsb2NrZWxlbWVudFwiKTtcblxuZnVuY3Rpb24gSGVhZGluZygpIHtcblx0QmxvY2tFbGVtZW50LmNhbGwodGhpcyk7XG59XG5cbkhlYWRpbmcucHJvdG90eXBlID0gbmV3IEJsb2NrRWxlbWVudCgpO1xuSGVhZGluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBIZWFkaW5nO1xuXG5IZWFkaW5nLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLnZpc2l0SGVhZGluZyh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG5cbmZ1bmN0aW9uIEltYWdlKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkltYWdlLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5JbWFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbWFnZTtcblxuSW1hZ2UucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0SW1hZ2UodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gTGluZUJyZWFrKCkge31cbkxpbmVCcmVhay5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuTGluZUJyZWFrLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpbmVCcmVhaztcblxuTGluZUJyZWFrLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRyZW5kZXJlci52aXNpdExpbmVCcmVhayh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZUJyZWFrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gTGluaygpIHtcblx0Tm9kZS5jYWxsKHRoaXMpO1xufVxuXG5MaW5rLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5MaW5rLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpbms7XG5cbkxpbmsucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0TGluayh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQmxvY2tFbGVtZW50ID0gcmVxdWlyZShcIi4vYmxvY2tlbGVtZW50XCIpO1xuXG5mdW5jdGlvbiBMaXN0QmxvY2sob3JkZXJlZCkge1xuXHRCbG9ja0VsZW1lbnQuY2FsbCh0aGlzKTtcblx0dGhpcy5vcmRlcmVkID0gb3JkZXJlZDtcbn1cblxuTGlzdEJsb2NrLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcbkxpc3RCbG9jay5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaXN0QmxvY2s7XG5cbkxpc3RCbG9jay5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRMaXN0QmxvY2sodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RCbG9jaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG5cbmZ1bmN0aW9uIExpc3RJdGVtKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkxpc3RJdGVtLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5MaXN0SXRlbS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaXN0SXRlbTtcblxuTGlzdEl0ZW0ucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0TGlzdEl0ZW0odGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RJdGVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIE5vZGUoKSB7XG5cdHRoaXMuY2hpbGRyZW4gPSBbXTtcbn1cblxuTm9kZS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBOb2RlLFxuXG5cdGFkZDogZnVuY3Rpb24obiwgaSkge1xuXHRcdHRoaXMuY2hpbGRyZW5baV0gPSBuO1xuXHR9LFxuXG5cdGNoaWxkcmVuQWNjZXB0OiBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5jaGlsZHJlbltpXS5hY2NlcHQocmVuZGVyZXIpO1xuXHRcdH1cblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJsb2NrRWxlbWVudCA9IHJlcXVpcmUoXCIuL2Jsb2NrZWxlbWVudFwiKTtcblxuZnVuY3Rpb24gUGFyYWdyYXBoKCkge1xuXHRCbG9ja0VsZW1lbnQuY2FsbCh0aGlzKTtcbn1cblxuUGFyYWdyYXBoLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcblBhcmFncmFwaC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQYXJhZ3JhcGg7XG5cblBhcmFncmFwaC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdFBhcmFncmFwaCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyYWdyYXBoO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gU3Ryb25nKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cblN0cm9uZy5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuU3Ryb25nLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0cm9uZztcblxuU3Ryb25nLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRyZW5kZXJlci52aXNpdFN0cm9uZyh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3Ryb25nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gVGV4dCgpIHtcbiAgICBOb2RlLmNhbGwodGhpcyk7XG59XG5cblRleHQucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcblRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGV4dDtcblxuVGV4dC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRUZXh0KHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIENoYXJTdHJlYW0ocmVhZGVyKSB7XG5cdHRoaXMuYXZhaWxhYmxlID0gNDA5Njtcblx0dGhpcy5idWZzaXplID0gNDA5Njtcblx0dGhpcy50b2tlbkJlZ2luID0gMDtcblx0dGhpcy5idWZjb2x1bW4gPSBbXTtcblx0dGhpcy5idWZwb3MgPSAtMTtcblx0dGhpcy5idWZsaW5lID0gW107XG5cdHRoaXMuY29sdW1uID0gMDtcblx0dGhpcy5saW5lID0gMTtcblx0dGhpcy5wcmV2Q2hhcklzTEYgPSBmYWxzZTtcblx0dGhpcy5yZWFkZXIgPSByZWFkZXI7XG5cdHRoaXMuYnVmZmVyID0gW107XG5cdHRoaXMubWF4TmV4dENoYXJJbmQgPSAwO1xuXHR0aGlzLmluQnVmID0gMDtcblx0dGhpcy50YWJTaXplID0gNDtcbn1cblxuQ2hhclN0cmVhbS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBDaGFyU3RyZWFtLFxuXG5cdGJlZ2luVG9rZW46IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMudG9rZW5CZWdpbiA9IC0xO1xuXHRcdHZhciBjID0gdGhpcy5yZWFkQ2hhcigpO1xuXG5cdFx0dGhpcy50b2tlbkJlZ2luID0gdGhpcy5idWZwb3M7XG5cdFx0cmV0dXJuIGM7XG5cdH0sXG5cblx0cmVhZENoYXI6IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGlzLmluQnVmID4gMCkge1xuXHRcdFx0LS10aGlzLmluQnVmO1xuXHRcdFx0aWYgKCsrdGhpcy5idWZwb3MgPT09IHRoaXMuYnVmc2l6ZSkge1xuXHRcdFx0XHR0aGlzLmJ1ZnBvcyA9IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5idWZmZXJbdGhpcy5idWZwb3NdO1xuXHRcdH1cblx0XHRpZiAoKyt0aGlzLmJ1ZnBvcyA+PSB0aGlzLm1heE5leHRDaGFySW5kKSB7XG5cdFx0XHR0aGlzLmZpbGxCdWZmKCk7XG5cdFx0fVxuXG5cdFx0dmFyIGMgPSB0aGlzLmJ1ZmZlclt0aGlzLmJ1ZnBvc107XG5cblx0XHR0aGlzLnVwZGF0ZUxpbmVDb2x1bW4oYyk7XG5cdFx0cmV0dXJuIGM7XG5cdH0sXG5cblx0ZmlsbEJ1ZmY6IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGlzLm1heE5leHRDaGFySW5kID09PSB0aGlzLmF2YWlsYWJsZSkge1xuXHRcdFx0aWYgKHRoaXMuYXZhaWxhYmxlID09PSB0aGlzLmJ1ZnNpemUpIHtcblx0XHRcdFx0dGhpcy5idWZwb3MgPSAwO1xuXHRcdFx0XHR0aGlzLm1heE5leHRDaGFySW5kID0gMDtcblx0XHRcdFx0aWYgKHRoaXMudG9rZW5CZWdpbiA+IDIwNDgpIHtcblx0XHRcdFx0XHR0aGlzLmF2YWlsYWJsZSA9IHRoaXMudG9rZW5CZWdpbjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hdmFpbGFibGUgPSB0aGlzLmJ1ZnNpemU7XG5cdFx0XHR9XG5cdFx0fVxuICAgICAgICB2YXIgaSA9IDA7XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKChpID0gdGhpcy5yZWFkZXIucmVhZCh0aGlzLmJ1ZmZlciwgdGhpcy5tYXhOZXh0Q2hhckluZCwgdGhpcy5hdmFpbGFibGUgLSB0aGlzLm1heE5leHRDaGFySW5kKSkgPT09IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIklPRXhjZXB0aW9uXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5tYXhOZXh0Q2hhckluZCArPSBpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC0tdGhpcy5idWZwb3M7XG5cdFx0XHR0aGlzLmJhY2t1cCgwKTtcblx0XHRcdGlmICh0aGlzLnRva2VuQmVnaW4gPT09IC0xKSB7XG5cdFx0XHRcdHRoaXMudG9rZW5CZWdpbiA9IHRoaXMuYnVmcG9zO1xuXHRcdFx0fVxuXHRcdFx0dGhyb3cgZTtcblx0XHR9XG5cdH0sXG5cblx0YmFja3VwOiBmdW5jdGlvbihhbW91bnQpIHtcblx0XHR0aGlzLmluQnVmICs9IGFtb3VudDtcblx0XHRpZiAoKHRoaXMuYnVmcG9zIC09IGFtb3VudCkgPCAwKSB7XG5cdFx0XHR0aGlzLmJ1ZnBvcyArPSB0aGlzLmJ1ZnNpemU7XG5cdFx0fVxuXHR9LFxuXG5cdHVwZGF0ZUxpbmVDb2x1bW46IGZ1bmN0aW9uKGMpIHtcblx0XHR0aGlzLmNvbHVtbisrO1xuXHRcdGlmICh0aGlzLnByZXZDaGFySXNMRikge1xuXHRcdFx0dGhpcy5wcmV2Q2hhcklzTEYgPSBmYWxzZTtcblx0XHRcdHRoaXMuY29sdW1uID0gMTtcblx0XHRcdHRoaXMubGluZSArPSB0aGlzLmNvbHVtbjtcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGMpIHtcblx0XHRjYXNlIFwiXFxuXCI6XG5cdFx0XHR0aGlzLnByZXZDaGFySXNMRiA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiXFx0XCI6XG5cdFx0XHR0aGlzLmNvbHVtbi0tO1xuXHRcdFx0dGhpcy5jb2x1bW4gKz0gdGhpcy50YWJTaXplIC0gdGhpcy5jb2x1bW4gJSB0aGlzLnRhYlNpemU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdHRoaXMuYnVmbGluZVt0aGlzLmJ1ZnBvc10gPSB0aGlzLmxpbmU7XG5cdFx0dGhpcy5idWZjb2x1bW5bdGhpcy5idWZwb3NdID0gdGhpcy5jb2x1bW47XG5cdH0sXG5cblx0Z2V0SW1hZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuYnVmcG9zID49IHRoaXMudG9rZW5CZWdpbikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5idWZmZXIuc2xpY2UodGhpcy50b2tlbkJlZ2luLCB0aGlzLmJ1ZnBvcyArIDEpLmpvaW4oXCJcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5idWZmZXIuc2xpY2UodGhpcy50b2tlbkJlZ2luLCB0aGlzLmJ1ZnNpemUpLmpvaW4oXCJcIikgK1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnNsaWNlKDAsIHRoaXMuYnVmcG9zICsgMSkuam9pbihcIlwiKTtcblx0fSxcblxuXHRnZXRFbmRDb2x1bW46IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnRva2VuQmVnaW4gaW4gdGhpcy5idWZjb2x1bW4gPyB0aGlzLmJ1ZmNvbHVtblt0aGlzLmJ1ZnBvc10gOiAwO1xuXHR9LFxuXG5cdGdldEVuZExpbmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnRva2VuQmVnaW4gaW4gdGhpcy5idWZsaW5lID8gdGhpcy5idWZsaW5lW3RoaXMuYnVmcG9zXSA6IDA7XG5cdH0sXG5cblx0Z2V0QmVnaW5Db2x1bW46IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmJ1ZnBvcyBpbiB0aGlzLmJ1ZmNvbHVtbiA/IHRoaXMuYnVmY29sdW1uW3RoaXMudG9rZW5CZWdpbl0gOiAwO1xuXHR9LFxuXG5cdGdldEJlZ2luTGluZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYnVmcG9zIGluIHRoaXMuYnVmbGluZSA/IHRoaXMuYnVmbGluZVt0aGlzLnRva2VuQmVnaW5dIDogMDtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJTdHJlYW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gU3RyaW5nUmVhZGVyKHRleHQpIHtcblx0dGhpcy5pbmRleCA9IDA7XG5cdHRoaXMudGV4dCA9IHRleHQ7XG59XG5cblN0cmluZ1JlYWRlci5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBTdHJpbmdSZWFkZXIsXG5cblx0cmVhZDogZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCkge1xuXHRcdGlmICh0aGlzLnRleHQudG9TdHJpbmcoKS5zdWJzdHJpbmcodGhpcy5pbmRleCkubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIGNoYXJhY3RlcnNSZWFkID0gMDtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgc3RhcnQgPSB0aGlzLmluZGV4ICsgaTtcblx0XHRcdFx0dmFyIGMgPSB0aGlzLnRleHQudG9TdHJpbmcoKS5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0ICsgMSk7XG5cblx0XHRcdFx0aWYgKGMgIT09IFwiXCIpIHtcblx0XHRcdFx0XHRidWZmZXJbb2Zmc2V0ICsgaV0gPSBjO1xuXHRcdFx0XHRcdGNoYXJhY3RlcnNSZWFkKys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuaW5kZXggKz0gbGVuZ3RoO1xuXHRcdFx0cmV0dXJuIGNoYXJhY3RlcnNSZWFkO1xuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nUmVhZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIExvb2thaGVhZFN1Y2Nlc3MoKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvb2thaGVhZFN1Y2Nlc3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIExvb2thaGVhZFN1Y2Nlc3MgPSByZXF1aXJlKFwiLi9sb29rYWhlYWRzdWNjZXNzXCIpO1xudmFyIFN0cmluZ1JlYWRlciA9IHJlcXVpcmUoXCIuL2lvL3N0cmluZ3JlYWRlclwiKTtcbnZhciBDaGFyU3RyZWFtID0gcmVxdWlyZShcIi4vY2hhcnN0cmVhbVwiKTtcbnZhciBUb2tlbk1hbmFnZXIgPSByZXF1aXJlKFwiLi90b2tlbm1hbmFnZXJcIik7XG52YXIgVG9rZW4gPSByZXF1aXJlKFwiLi90b2tlblwiKTtcbnZhciBUcmVlU3RhdGUgPSByZXF1aXJlKFwiLi90cmVlc3RhdGVcIik7XG5cbnZhciBEb2N1bWVudCA9IHJlcXVpcmUoXCIuL2FzdC9Eb2N1bWVudFwiKTtcbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9hc3QvYmxvY2tFbGVtZW50XCIpO1xudmFyIEJsb2NrUXVvdGUgPSByZXF1aXJlKFwiLi9hc3QvYmxvY2txdW90ZVwiKTtcbnZhciBDb2RlID0gcmVxdWlyZShcIi4vYXN0L2NvZGVcIik7XG52YXIgQ29kZUJsb2NrID0gcmVxdWlyZShcIi4vYXN0L2NvZGVibG9ja1wiKTtcbnZhciBFbSA9IHJlcXVpcmUoXCIuL2FzdC9lbVwiKTtcbnZhciBIZWFkaW5nID0gcmVxdWlyZShcIi4vYXN0L2hlYWRpbmdcIik7XG52YXIgSW1hZ2UgPSByZXF1aXJlKFwiLi9hc3QvaW1hZ2VcIik7XG52YXIgTGluZUJyZWFrID0gcmVxdWlyZShcIi4vYXN0L2xpbmVicmVha1wiKTtcbnZhciBMaW5rID0gcmVxdWlyZShcIi4vYXN0L2xpbmtcIik7XG52YXIgTGlzdEJsb2NrID0gcmVxdWlyZShcIi4vYXN0L2xpc3RibG9ja1wiKTtcbnZhciBMaXN0SXRlbSA9IHJlcXVpcmUoXCIuL2FzdC9saXN0aXRlbVwiKTtcbnZhciBQYXJhZ3JhcGggPSByZXF1aXJlKFwiLi9hc3QvcGFyYWdyYXBoXCIpO1xudmFyIFN0cm9uZyA9IHJlcXVpcmUoXCIuL2FzdC9zdHJvbmdcIik7XG52YXIgVGV4dCA9IHJlcXVpcmUoXCIuL2FzdC90ZXh0XCIpO1xuXG5mdW5jdGlvbiBQYXJzZXIoKSB7XG5cdHRoaXMubG9va0FoZWFkU3VjY2VzcyA9IG5ldyBMb29rYWhlYWRTdWNjZXNzKCk7XG5cdHRoaXMubW9kdWxlcyA9IFtcInBhcmFncmFwaHNcIiwgXCJoZWFkaW5nc1wiLCBcImxpc3RzXCIsIFwibGlua3NcIiwgXCJpbWFnZXNcIiwgXCJmb3JtYXR0aW5nXCIsIFwiYmxvY2txdW90ZXNcIiwgXCJjb2RlXCJdO1xuXHR0aGlzLmN1cnJlbnRCbG9ja0xldmVsID0gMDtcblx0dGhpcy5jdXJyZW50UXVvdGVMZXZlbCA9IDA7XG59XG5cblBhcnNlci5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBQYXJzZXIsXG5cblx0cGFyc2U6IGZ1bmN0aW9uKHRleHQpIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJzZVJlYWRlcihuZXcgU3RyaW5nUmVhZGVyKHRleHQpKTtcblx0fSxcblxuXHRwYXJzZVJlYWRlcjogZnVuY3Rpb24ocmVhZGVyKSB7XG5cdFx0dGhpcy5jcyA9IG5ldyBDaGFyU3RyZWFtKHJlYWRlcik7XG5cdFx0dGhpcy50bSA9IG5ldyBUb2tlbk1hbmFnZXIodGhpcy5jcyk7XG5cdFx0dGhpcy50b2tlbiA9IG5ldyBUb2tlbigpO1xuXHRcdHRoaXMudHJlZSA9IG5ldyBUcmVlU3RhdGUoKTtcblx0XHR0aGlzLm5leHRUb2tlbktpbmQgPSAtMTtcblxuXHRcdHZhciBkb2N1bWVudCA9IG5ldyBEb2N1bWVudCgpO1xuXG5cdFx0dGhpcy50cmVlLm9wZW5TY29wZSgpO1xuXG5cdFx0d2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuXHRcdFx0dGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuXHRcdH1cblx0XHR0aGlzLndoaXRlU3BhY2UoKTtcblx0XHRpZiAodGhpcy5oYXNBbnlCbG9ja0VsZW1lbnRzQWhlYWQoKSkge1xuXHRcdFx0dGhpcy5ibG9ja0VsZW1lbnQoKTtcblx0XHRcdHdoaWxlICh0aGlzLmJsb2NrQWhlYWQoMCkpIHtcblx0XHRcdFx0d2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuXHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0YpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShkb2N1bWVudCk7XG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcblx0fSxcblxuXHRibG9ja0VsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRCbG9ja0xldmVsKys7XG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImhlYWRpbmdzXCIpID49IDAgJiYgdGhpcy5oZWFkaW5nQWhlYWQoMSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImJsb2NrcXVvdGVzXCIpID49IDAgJiYgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uR1QpIHtcbiAgICAgICAgICB0aGlzLmJsb2NrUXVvdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpc3RzXCIpID49IDAgJiYgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uREFTSCkge1xuICAgICAgICAgIHRoaXMudW5vcmRlcmVkTGlzdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlzdHNcIikgPj0gMCAmJiB0aGlzLmhhc09yZGVyZWRMaXN0QWhlYWQoKSkge1xuICAgICAgICAgIHRoaXMub3JkZXJlZExpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0ZlbmNlZENvZGVCbG9ja0FoZWFkKCkpIHtcbiAgICAgICAgICB0aGlzLmZlbmNlZENvZGVCbG9jaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFyYWdyYXBoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2tMZXZlbC0tO1xuXHR9LFxuXG4gICAgaGVhZGluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoZWFkaW5nID0gbmV3IEhlYWRpbmcoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHZhciBoZWFkaW5nTGV2ZWwgPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FUSkge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FUSk7XG4gICAgICAgICAgICBoZWFkaW5nTGV2ZWwrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuaGVhZGluZ0hhc0lubGluZUVsZW1lbnRzQWhlYWQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNTdHJvbmdBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNFbUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29zZUNoYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaGVhZGluZy52YWx1ZSA9IGhlYWRpbmdMZXZlbDtcbiAgICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShoZWFkaW5nKTtcbiAgICB9LFxuXG4gICAgYmxvY2tRdW90ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBibG9ja1F1b3RlID0gbmV3IEJsb2NrUXVvdGUoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFF1b3RlTGV2ZWwrKztcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmJsb2NrUXVvdGVIYXNFbXB0eUxpbmVBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrUXVvdGVFbXB0eUxpbmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgaWYgKHRoaXMuYmxvY2tRdW90ZUhhc0FueUJsb2NrRWxlbWVudHNlQWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmJsb2NrQWhlYWQoMCkpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tRdW90ZVByZWZpeCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrRWxlbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0aGlzLmhhc0Jsb2NrUXVvdGVFbXB0eUxpbmVzQWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlRW1wdHlMaW5lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50UXVvdGVMZXZlbC0tO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShibG9ja1F1b3RlKTtcbiAgICAgIH0sXG5cbiAgICAgIGJsb2NrUXVvdGVQcmVmaXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCk7XG4gICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgfSB3aGlsZSAoKytpIDwgdGhpcy5jdXJyZW50UXVvdGVMZXZlbCk7XG4gICAgICB9LFxuXG4gICAgICBibG9ja1F1b3RlRW1wdHlMaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKTtcbiAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgfSB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uR1QpO1xuICAgICAgfSxcblxuICAgICAgdW5vcmRlcmVkTGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGxpc3QgPSBuZXcgTGlzdEJsb2NrKGZhbHNlKTtcblxuICAgICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgICB2YXIgbGlzdEJlZ2luQ29sdW1uID0gdGhpcy51bm9yZGVyZWRMaXN0SXRlbSgpO1xuXG4gICAgICAgICAgd2hpbGUgKHRoaXMubGlzdEl0ZW1BaGVhZChsaXN0QmVnaW5Db2x1bW4sIGZhbHNlKSkge1xuICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdW90ZUxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy51bm9yZGVyZWRMaXN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaXN0KTtcbiAgICAgIH0sXG5cbiAgICAgIHVub3JkZXJlZExpc3RJdGVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0oKTtcblxuICAgICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcblxuICAgICAgICAgIHZhciB0ID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5EQVNIKTtcblxuICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgIGlmICh0aGlzLmxpc3RJdGVtSGFzSW5saW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICB0aGlzLmJsb2NrRWxlbWVudCgpO1xuICAgICAgICAgICAgICB3aGlsZSAodGhpcy5ibG9ja0FoZWFkKHQuYmVnaW5Db2x1bW4pKSB7XG4gICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaXN0SXRlbSk7XG4gICAgICAgICAgcmV0dXJuIHQuYmVnaW5Db2x1bW47XG4gICAgICB9LFxuXG4gICAgICBvcmRlcmVkTGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaXN0ID0gbmV3IExpc3RCbG9jayh0cnVlKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHZhciBsaXN0QmVnaW5Db2x1bW4gPSB0aGlzLm9yZGVyZWRMaXN0SXRlbSgpO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmxpc3RJdGVtQWhlYWQobGlzdEJlZ2luQ29sdW1uLCB0cnVlKSkge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9yZGVyZWRMaXN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGxpc3QpO1xuICAgIH0sXG5cbiAgICBvcmRlcmVkTGlzdEl0ZW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0oKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHZhciB0ID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpO1xuXG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKTtcbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtSGFzSW5saW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmJsb2NrQWhlYWQodC5iZWdpbkNvbHVtbikpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdW90ZUxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsaXN0SXRlbS5udW1iZXIgPSB0LmltYWdlO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaXN0SXRlbSk7XG4gICAgICAgIHJldHVybiB0LmJlZ2luQ29sdW1uO1xuICAgIH0sXG5cbiAgICBmZW5jZWRDb2RlQmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29kZUJsb2NrID0gbmV3IENvZGVCbG9jaygpO1xuICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB2YXIgYmVnaW5Db2x1bW4gPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5iZWdpbkNvbHVtbjtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uQkFDS1RJQ0spO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkge1xuICAgICAgICAgICAgICAgIGNvZGVCbG9jay5sYW5ndWFnZSA9IHRoaXMuY29kZUxhbmd1YWdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgIT09IHRoaXMudG0uRU9GICYmICF0aGlzLmZlbmNlc0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFdoaXRlU3BhY2UoYmVnaW5Db2x1bW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgIT09IHRoaXMudG0uRU9GICYmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSAhPT0gdGhpcy50bS5FT0wgfHwgIXRoaXMuZmVuY2VzQWhlYWQoKSkpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DSEFSX1NFUVVFTkNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DT0xPTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uREFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVEpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uSU1BR0VfTEFCRUwpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFBBUkVOKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLkVPTCwgdGhpcy50bS5FT0ZdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uU1BBQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5UQUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIiAgICBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5mZW5jZXNBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsV2hpdGVTcGFjZShiZWdpbkNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmVuY2VzQWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uQkFDS1RJQ0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb2RlQmxvY2sudmFsdWUgPSBzLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGNvZGVCbG9jayk7XG4gICAgfSxcblxuICAgIHBhcmFncmFwaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYXJhZ3JhcGggPSB0aGlzLm1vZHVsZXMuaW5kZXhPZihcInBhcmFncmFwaHNcIikgPj0gMCA/IG5ldyBQYXJhZ3JhcGgoKSA6IG5ldyBCbG9ja0VsZW1lbnQoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuaW5saW5lKCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVCcmVhaygpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJibG9ja3F1b3Rlc1wiKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlubGluZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHBhcmFncmFwaCk7XG4gICAgfSxcblxuICAgIHRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dCA9IG5ldyBUZXh0KCk7XG4gICAgICAgIHZhciBzID0gXCJcIjtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRIYXNUb2tlbnNBaGVhZCgpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ0hBUl9TRVFVRU5DRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1NMQVNIOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNPTE9OOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DT0xPTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uREFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uREFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRElHSVRTOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRPVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FUTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVEpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVTQ0FQRURfQ0hBUjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKS5pbWFnZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uR1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5JTUFHRV9MQUJFTDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uSU1BR0VfTEFCRUwpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxQQVJFTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFBBUkVOKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFQpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUkJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5FT0wsIHRoaXMudG0uRU9GXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uU1BBQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uU1BBQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5UQUI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlRBQik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiICAgIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0LnZhbHVlID0gcztcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUodGV4dCk7XG4gICAgfSxcblxuICAgIGltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHZhciByZWYgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spO1xuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCk7XG4gICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICB3aGlsZSAodGhpcy5pbWFnZUhhc0FueUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZVRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29zZUNoYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spO1xuICAgICAgICBpZiAodGhpcy5oYXNSZXNvdXJjZVVybEFoZWFkKCkpIHtcbiAgICAgICAgICAgIHJlZiA9IHRoaXMucmVzb3VyY2VVcmwoKTtcbiAgICAgICAgfVxuICAgICAgICBpbWFnZS52YWx1ZSA9IHJlZjtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoaW1hZ2UpO1xuICAgIH0sXG5cbiAgICBsaW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBuZXcgTGluaygpO1xuICAgICAgICB2YXIgcmVmID0gXCJcIjtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKTtcbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmxpbmtIYXNBbnlFbGVtZW50cygpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNTdHJvbmdBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNFbUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNSZXNvdXJjZVRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZVRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29zZUNoYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spO1xuICAgICAgICBpZiAodGhpcy5oYXNSZXNvdXJjZVVybEFoZWFkKCkpIHtcbiAgICAgICAgICAgIHJlZiA9IHRoaXMucmVzb3VyY2VVcmwoKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5rLnZhbHVlID0gcmVmO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaW5rKTtcbiAgICB9LFxuXG4gICAgc3Ryb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0cm9uZyA9IG5ldyBTdHJvbmcoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICB3aGlsZSAodGhpcy5zdHJvbmdIYXNFbGVtZW50cygpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0cm9uZ0VtV2l0aGluU3Ryb25nQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1XaXRoaW5TdHJvbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5VTkRFUlNDT1JFOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoc3Ryb25nKTtcbiAgICB9LFxuXG4gICAgZW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW0gPSBuZXcgRW0oKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgIHdoaWxlICh0aGlzLmVtSGFzRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlua3NcIikgPj0gMCAmJiB0aGlzLmhhc0xpbmtBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbUhhc1N0cm9uZ1dpdGhpbkVtKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9uZ1dpdGhpbkVtKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShlbSk7XG4gICAgfSxcblxuICAgIGNvZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29kZSA9IG5ldyBDb2RlKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgdGhpcy5jb2RlVGV4dCgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoY29kZSk7XG4gICAgfSxcblxuICAgIGNvZGVUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHQgPSBuZXcgVGV4dCgpO1xuICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DSEFSX1NFUVVFTkNFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFQpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEFmdGVyU3BhY2UoW3RoaXMudG0uRU9MLCB0aGlzLnRtLkVPRl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlNQQUNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlNQQUNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVEFCOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5UQUIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIiAgICBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLmNvZGVUZXh0SGFzQW55VG9rZW5BaGVhZCgpKTtcbiAgICAgICAgdGV4dC52YWx1ZSA9IHM7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHRleHQpO1xuICAgIH0sXG5cbiAgIGxvb3NlQ2hhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gbmV3IFRleHQoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgY2FzZSB0aGlzLnRtLkFTVEVSSVNLOlxuICAgICAgICAgICAgdGV4dC52YWx1ZSA9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spLmltYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5pbWFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgdGV4dC52YWx1ZSA9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUodGV4dCk7XG4gICAgfSxcblxuICAgIGxpbmVCcmVhazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaW5lYnJlYWsgPSBuZXcgTGluZUJyZWFrKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uU1BBQ0UgfHwgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLmdldE5leHRUb2tlbktpbmQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaW5lYnJlYWspO1xuICAgIH0sXG5cbiAgICBsZXZlbFdoaXRlU3BhY2U6IGZ1bmN0aW9uKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3VycmVudFBvcyA9IDE7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLmdldE5leHRUb2tlbktpbmQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKCh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5TUEFDRSB8fCB0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5UQUIpICYmIGN1cnJlbnRQb3MgPCB0aHJlc2hvbGQgLSAxKSB7XG4gICAgICAgICAgICBjdXJyZW50UG9zID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpLmJlZ2luQ29sdW1uO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvZGVMYW5ndWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzID0gXCJcIjtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ0hBUl9TRVFVRU5DRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLU0xBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFQpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUkJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlNQQUNFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uVEFCOlxuICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpICE9PSB0aGlzLnRtLkVPTCAmJiB0aGlzLmdldE5leHRUb2tlbktpbmQoKSAhPT0gdGhpcy50bS5FT0YpO1xuICAgICAgICAgIHJldHVybiBzO1xuICAgICAgfSxcblxuICAgICAgaW5saW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNJbmxpbmVUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImZvcm1hdHRpbmdcIikgPj0gMCAmJiB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQVNURVJJU0spKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmdNdWx0aWxpbmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLlVOREVSU0NPUkUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlTXVsdGlsaW5lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9vc2VDaGFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAodGhpcy5oYXNJbmxpbmVFbGVtZW50QWhlYWQoKSk7XG4gICAgICB9LFxuXG4gICAgICByZXNvdXJjZVRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgICB2YXIgdGV4dCA9IG5ldyBUZXh0KCk7XG4gICAgICAgICAgdmFyIHMgPSBcIlwiO1xuXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNIQVJfU0VRVUVOQ0U6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2Uuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLklNQUdFX0xBQkVMOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uR1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5SQlJBQ0tdKSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5TUEFDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlRBQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5yZXNvdXJjZUhhc0VsZW1lbnRBaGVhZCgpKTtcbiAgICAgICAgdGV4dC52YWx1ZSA9IHM7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHRleHQpO1xuICAgICAgfSxcblxuICAgICAgcmVzb3VyY2VVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTik7XG4gICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICB2YXIgcmVmID0gdGhpcy5yZXNvdXJjZVVybFRleHQoKTtcblxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pO1xuICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgfSxcblxuICAgICAgcmVzb3VyY2VVcmxUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgICB3aGlsZSAodGhpcy5yZXNvdXJjZVRleHRIYXNFbGVtZW50c0FoZWFkKCkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DSEFSX1NFUVVFTkNFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNPTE9OOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DT0xPTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uREFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uREFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRElHSVRTOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRPVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FUTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVEpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVTQ0FQRURfQ0hBUjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKS5pbWFnZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5HVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5SUEFSRU5dKSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5TUEFDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlRBQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9LFxuXG4gICAgICBzdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzdHJvbmcgPSBuZXcgU3Ryb25nKCk7XG5cbiAgICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgICAgdGhpcy5zdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgICAgd2hpbGUgKHRoaXMudGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgICAgdGhpcy5zdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHN0cm9uZyk7XG4gICAgICB9LFxuXG4gICAgICBzdHJvbmdNdWx0aWxpbmVDb250ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5oYXNDb2RlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0VtV2l0aGluU3Ryb25nTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtV2l0aGluU3Ryb25nTXVsdGlsaW5lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3Ryb25nTXVsdGlsaW5lSGFzRWxlbWVudHNBaGVhZCgpKTtcbiAgICAgIH0sXG5cbiAgICAgIHN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0cm9uZyA9IG5ldyBTdHJvbmcoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICB0aGlzLnN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgIHRoaXMuc3Ryb25nV2l0aGluRW1NdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHN0cm9uZyk7XG4gICAgICB9LFxuXG4gICAgICBzdHJvbmdXaXRoaW5FbU11bHRpbGluZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3Ryb25nV2l0aGluRW1NdWx0aWxpbmVIYXNFbGVtZW50c0FoZWFkKCkpO1xuICAgICAgfSxcblxuICAgICAgc3Ryb25nV2l0aGluRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3Ryb25nID0gbmV3IFN0cm9uZygpO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgIHRoaXMuY29kZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0cm9uZ1dpdGhpbkVtSGFzRWxlbWVudHNBaGVhZCgpKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHN0cm9uZyk7XG4gICAgfSxcblxuICAgIGVtTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVtID0gbmV3IEVtKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLmVtTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgIHRoaXMuZW1NdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoZW0pO1xuICAgIH0sXG5cbiAgICBlbU11bHRpbGluZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlTXVsdGlsaW5lKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmdXaXRoaW5FbU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkFTVEVSSVNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuZW1NdWx0aWxpbmVDb250ZW50SGFzRWxlbWVudHNBaGVhZCgpKTtcbiAgICB9LFxuXG4gICAgZW1XaXRoaW5TdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW0gPSBuZXcgRW0oKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgIHRoaXMuZW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVCcmVhaygpO1xuICAgICAgICAgICAgdGhpcy5lbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShlbSk7XG4gICAgfSxcblxuICAgIGVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaW1hZ2VzXCIpID49IDAgJiYgdGhpcy5oYXNJbWFnZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlua3NcIikgPj0gMCAmJiB0aGlzLmhhc0xpbmtBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLmVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudEhhc0VsZW1lbnRzQWhlYWQoKSk7XG4gICAgfSxcblxuICAgIGVtV2l0aGluU3Ryb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVtID0gbmV3IEVtKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5lbVdpdGhpblN0cm9uZ0hhc0VsZW1lbnRzQWhlYWQoKSk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGVtKTtcbiAgICB9LFxuXG4gICAgY29kZU11bHRpbGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb2RlID0gbmV3IENvZGUoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spO1xuICAgICAgICB0aGlzLmNvZGVUZXh0KCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVCcmVhaygpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uR1QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKTtcbiAgICAgICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29kZVRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoY29kZSk7XG4gICAgfSxcblxuICAgIHdoaXRlU3BhY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uU1BBQ0UgfHwgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLmdldE5leHRUb2tlbktpbmQoKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzQW55QmxvY2tFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5Nb3JlQmxvY2tFbGVtZW50cygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmxvY2tBaGVhZDogZnVuY3Rpb24oYmxvY2tCZWdpbkNvbHVtbikge1xuICAgICAgICB2YXIgcXVvdGVMZXZlbCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgdmFyIHQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGkgPSAyO1xuXG4gICAgICAgICAgICBxdW90ZUxldmVsID0gMDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBxdW90ZUxldmVsID0gMDtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmdldFRva2VuKGkrKyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0LmtpbmQgPT09IHRoaXMudG0uR1QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0LmJlZ2luQ29sdW1uID09PSAxICYmIHRoaXMuY3VycmVudEJsb2NrTGV2ZWwgPiAwICYmIHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBxdW90ZUxldmVsKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlICh0LmtpbmQgPT09IHRoaXMudG0uR1QgfHwgdC5raW5kID09PSB0aGlzLnRtLlNQQUNFIHx8IHQua2luZCA9PT0gdGhpcy50bS5UQUIpO1xuICAgICAgICAgICAgICAgIGlmIChxdW90ZUxldmVsID4gdGhpcy5jdXJyZW50UXVvdGVMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHF1b3RlTGV2ZWwgPCB0aGlzLmN1cnJlbnRRdW90ZUxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlICh0LmtpbmQgPT09IHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgIHJldHVybiB0LmtpbmQgIT09IHRoaXMudG0uRU9GICYmICh0aGlzLmN1cnJlbnRCbG9ja0xldmVsID09PSAwIHx8IHQuYmVnaW5Db2x1bW4gPj0gYmxvY2tCZWdpbkNvbHVtbiArIDIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgbXVsdGlsaW5lQWhlYWQ6IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdG9rZW4gJiYgdGhpcy5nZXRUb2tlbigyKS5raW5kICE9PSB0b2tlbiAmJiB0aGlzLmdldFRva2VuKDIpLmtpbmQgIT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMjsgOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuZ2V0VG9rZW4oaSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodC5raW5kID09PSB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHQua2luZCA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHRoaXMuc2tpcChpICsgMSwgW3RoaXMudG0uU1BBQ0UsIHRoaXMudG0uVEFCXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBxdW90ZUxldmVsID0gdGhpcy5uZXdRdW90ZUxldmVsKGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdW90ZUxldmVsID09PSB0aGlzLmN1cnJlbnRRdW90ZUxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gdGhpcy5za2lwKGksIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQiwgdGhpcy50bS5HVF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdG9rZW4gfHwgdGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkVPTCB8fCB0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uREFTSCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uRElHSVRTICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uRE9UKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0sgJiYgdGhpcy5nZXRUb2tlbihpICsgMSkua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW4oaSArIDIpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0spIHx8IHRoaXMuaGVhZGluZ0FoZWFkKGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0LmtpbmQgPT09IHRoaXMudG0uRU9GKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBmZW5jZXNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy5za2lwKDIsIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQiwgdGhpcy50bS5HVF0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0sgJiYgdGhpcy5nZXRUb2tlbihpICsgMikua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSykge1xuICAgICAgICAgICAgICAgIGkgPSB0aGlzLnNraXAoaSArIDMsIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQl0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uRU9MIHx8IHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdGhpcy50bS5FT0Y7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBoZWFkaW5nQWhlYWQ6IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICAgICBpZiAodGhpcy5nZXRUb2tlbihvZmZzZXQpLmtpbmQgPT09IHRoaXMudG0uRVEpIHtcbiAgICAgICAgICAgIHZhciBoZWFkaW5nID0gMTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IChvZmZzZXQgKyAxKTsgOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlbihpKS5raW5kICE9PSB0aGlzLnRtLkVRKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKytoZWFkaW5nID4gNikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgbGlzdEl0ZW1BaGVhZDogZnVuY3Rpb24obGlzdEJlZ2luQ29sdW1uLCBvcmRlcmVkKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGVvbCA9IDEsIGkgPSAyOyA7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5nZXRUb2tlbihpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0LmtpbmQgPT09IHRoaXMudG0uRU9MICYmICsrZW9sID4gMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0LmtpbmQgIT09IHRoaXMudG0uU1BBQ0UgJiYgdC5raW5kICE9PSB0aGlzLnRtLlRBQiAmJiB0LmtpbmQgIT09IHRoaXMudG0uR1QgJiYgdC5raW5kICE9PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0LmtpbmQgPT09IHRoaXMudG0uRElHSVRTICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uRE9UICYmIHQuYmVnaW5Db2x1bW4gPj0gbGlzdEJlZ2luQ29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5raW5kID09PSB0aGlzLnRtLkRBU0ggJiYgdC5iZWdpbkNvbHVtbiA+PSBsaXN0QmVnaW5Db2x1bW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgdGV4dEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCAmJiB0aGlzLmdldFRva2VuKDIpLmtpbmQgIT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuc2tpcCgyLCBbdGhpcy50bS5TUEFDRSwgdGhpcy50bS5UQUJdKTtcbiAgICAgICAgICAgIHZhciBxdW90ZUxldmVsID0gdGhpcy5uZXdRdW90ZUxldmVsKGkpO1xuXG4gICAgICAgICAgICBpZiAocXVvdGVMZXZlbCA9PT0gdGhpcy5jdXJyZW50UXVvdGVMZXZlbCB8fCAhKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiYmxvY2txdW90ZXNcIikgPj0gMCkpIHtcbiAgICAgICAgICAgICAgICBpID0gdGhpcy5za2lwKGksIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQiwgdGhpcy50bS5HVF0pO1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5nZXRUb2tlbihpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKGkpLmtpbmQgIT09IHRoaXMudG0uRU9MICYmICEodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaXN0c1wiKSA+PSAwICYmIHQua2luZCA9PT0gdGhpcy50bS5EQVNIKSAmJlxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlzdHNcIikgPj0gMCAmJiB0LmtpbmQgPT09IHRoaXMudG0uRElHSVRTICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uRE9UKSAmJlxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSyAmJiB0aGlzLmdldFRva2VuKGkgKyAxKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLICYmIHRoaXMuZ2V0VG9rZW4oaSArIDIpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0spICYmXG4gICAgICAgICAgICAgICAgICAgICEodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJoZWFkaW5nc1wiKSA+PSAwICYmIHRoaXMuaGVhZGluZ0FoZWFkKGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIG5leHRBZnRlclNwYWNlOiBmdW5jdGlvbih0b2tlbnMpIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnNraXAoMSwgW3RoaXMudG0uU1BBQ0UsIHRoaXMudG0uVEFCXSk7XG5cbiAgICAgICAgcmV0dXJuIHRva2Vucy5pbmRleE9mKHRoaXMuZ2V0VG9rZW4oaSkua2luZCkgPj0gMDtcbiAgICB9LFxuXG4gICAgbmV3UXVvdGVMZXZlbDogZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgICAgIHZhciBxdW90ZUxldmVsID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gb2Zmc2V0OyA7IGkrKykge1xuICAgICAgICAgICAgdmFyIHQgPSB0aGlzLmdldFRva2VuKGkpO1xuXG4gICAgICAgICAgICBpZiAodC5raW5kID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVMZXZlbCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0LmtpbmQgIT09IHRoaXMudG0uU1BBQ0UgJiYgdC5raW5kICE9PSB0aGlzLnRtLlRBQikge1xuICAgICAgICAgICAgICAgIHJldHVybiBxdW90ZUxldmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2tpcDogZnVuY3Rpb24ob2Zmc2V0LCB0b2tlbnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IG9mZnNldDsgOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcy5nZXRUb2tlbihpKTtcblxuICAgICAgICAgICAgaWYgKHRva2Vucy5pbmRleE9mKHQua2luZCkgPT09IC0xIHx8IHQua2luZCA9PT0gdGhpcy50bS5FT0YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNPcmRlcmVkTGlzdEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpICYmICF0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRPVCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNGZW5jZWRDb2RlQmxvY2tBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkZlbmNlZENvZGVCbG9jaygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGVhZGluZ0hhc0lubGluZUVsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblN0cm9uZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbkxvb3NlQ2hhcigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNUZXh0QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5UZXh0VG9rZW5zKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbWFnZUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuSW1hZ2UoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsb2NrUXVvdGVIYXNFbXB0eUxpbmVBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkJsb2NrUXVvdGVFbXB0eUxpbmUoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc1N0cm9uZ0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuU3Ryb25nKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNFbUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuRW0oKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc0NvZGVBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkNvZGUoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsb2NrUXVvdGVIYXNBbnlCbG9ja0VsZW1lbnRzZUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuTW9yZUJsb2NrRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc0Jsb2NrUXVvdGVFbXB0eUxpbmVzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5CbG9ja1F1b3RlRW1wdHlMaW5lcygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGlzdEl0ZW1IYXNJbmxpbmVFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2Nhbk1vcmVCbG9ja0VsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbmxpbmVUZXh0QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5UZXh0VG9rZW5zKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbmxpbmVFbGVtZW50QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5JbmxpbmVFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbWFnZUhhc0FueUVsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNSZXNvdXJjZVRleHRBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblJlc291cmNlRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxpbmtIYXNBbnlFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkxpbmtFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNSZXNvdXJjZVVybEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuUmVzb3VyY2VVcmwoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc291cmNlSGFzRWxlbWVudEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuUmVzb3VyY2VFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNvdXJjZVRleHRIYXNFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuUmVzb3VyY2VUZXh0RWxlbWVudCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ011bHRpbGluZSgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3Ryb25nTXVsdGlsaW5lSGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblN0cm9uZ011bHRpbGluZUVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHJvbmdXaXRoaW5FbU11bHRpbGluZUhhc0VsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdXaXRoaW5FbU11bHRpbGluZUVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkltYWdlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNMaW5rQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5MaW5rKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHJvbmdFbVdpdGhpblN0cm9uZ0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuRW1XaXRoaW5TdHJvbmcoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0cm9uZ0hhc0VsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuU3Ryb25nRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0cm9uZ1dpdGhpbkVtSGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc1N0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdXaXRoaW5FbU11bHRpbGluZSgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZW1NdWx0aWxpbmVDb250ZW50SGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtTXVsdGlsaW5lQ29udGVudEVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBlbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnRIYXNFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgIGVtSGFzU3Ryb25nV2l0aGluRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdXaXRoaW5FbSgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZW1IYXNFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGVtV2l0aGluU3Ryb25nSGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvZGVUZXh0SGFzQW55VG9rZW5BaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkNvZGVUZXh0VG9rZW5zKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZXh0SGFzVG9rZW5zQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5UZXh0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzY2FuTG9vc2VDaGFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ09MT04pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5EQVNIKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRE9UKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9ICF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLkVPTCwgdGhpcy50bS5FT0ZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuVGV4dFRva2VuczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5UZXh0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5UZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5Db2RlVGV4dFRva2VuczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1NMQVNIKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DT0xPTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uREFTSCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVRKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9ICF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLkVPTCwgdGhpcy50bS5FT0ZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuQ29kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSB8fCB0aGlzLnNjYW5Db2RlVGV4dFRva2Vuc0FoZWFkKCkgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgfSxcblxuICAgIHNjYW5Db2RlTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSB8fCB0aGlzLnNjYW5Db2RlVGV4dFRva2Vuc0FoZWFkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NvZGVUZXh0T25OZXh0TGluZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4oQkFDS1RJQ0spO1xuICAgIH0sXG5cbiAgICBzY2FuQ29kZVRleHRUb2tlbnNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Db2RlVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuQ29kZVRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgaGFzQ29kZVRleHRPbk5leHRMaW5lQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuV2hpdGVzcGFjZVRva2VuQmVmb3JlRW9sKCkpIHtcbiAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbkNvZGVUZXh0VG9rZW5zQWhlYWQoKTtcbiAgICB9LFxuXG4gICAgc2NhbldoaXRzcGFjZVRva2VuczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuV2hpdGVzcGFjZVRva2VuQmVmb3JlRW9sOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uRU9MKTtcbiAgICB9LFxuXG4gICAgc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5FbVdpdGhpblN0cm9uZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpIHx8IHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgIH0sXG5cbiAgICBzY2FuRW1FbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW0oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSB8fCB0aGlzLnNjYW5FbUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICB9LFxuXG4gICAgc2NhbkVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgaGFzTm9FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnRBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSB8fCB0aGlzLmhhc05vRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50QWhlYWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRlc3BhY2VUb2tlbkJlZm9yZUVvbCgpIHx8IHRoaXMuaGFzTm9FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgfSxcblxuICAgIHNjYW5FbU11bHRpbGluZUNvbnRlbnRFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWFudGljTG9va0FoZWFkID0gdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhbkNvZGVNdWx0aWxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW1FbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykgfHwgdGhpcy5zY2FuU3Ryb25nV2l0aGluRW1FbGVtZW50cygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1FbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9IHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCB8fCB0aGlzLnNjYW5Db2RlTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spIHx8IHRoaXMuc2NhblN0cm9uZ0VsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5TdHJvbmdFbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRm9yTW9yZVN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50cygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykgfHwgdGhpcy5zY2FuRm9yTW9yZVN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRlc3BhY2VUb2tlbkJlZm9yZUVvbCgpIHx8IHRoaXMuc2NhbkZvck1vcmVTdHJvbmdXaXRoaW5FbU11bHRpbGluZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgfSxcblxuICAgIHNjYW5TdHJvbmdNdWx0aWxpbmVFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5SZXNvdXJjZVRleHRFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DT0xPTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5EQVNIKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRElHSVRTKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FU0NBUEVEX0NIQVIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkdUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSAhdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5SUEFSRU5dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuSW1hZ2VFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbkxvb3NlQ2hhcigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VUZXh0RWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuUmVzb3VyY2VUZXh0RWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblJlc291cmNlVGV4dEVsZW1lbnRzKCkgfHxcbiAgICAgICAgICAgIHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uUlBBUkVOKTtcbiAgICB9LFxuXG4gICAgc2NhbkxpbmtFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5TdHJvbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuQ29kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuTG9vc2VDaGFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ09MT04pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRBU0gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRJR0lUUykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FUSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9ICF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLlJCUkFDS10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblJlc291cmNlRWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuTGluazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSykgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkgfHwgdGhpcy5zY2FuTGlua0VsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmtFbGVtZW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuc2NhblJlc291cmNlVXJsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSB8fCB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSB8fCB0aGlzLnNjYW5JbWFnZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlRWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uUkJSQUNLKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZVVybCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5JbmxpbmVFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5UZXh0VG9rZW5zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuTGluaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9IHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWFudGljTG9va0FoZWFkID0gdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCB8fCB0aGlzLnNjYW5Db2RlTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Mb29zZUNoYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUGFyYWdyYXBoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhbklubGluZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbklubGluZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkZvckNvZGVMYW5ndWFnZUVsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRm9yQ29kZUxhbmd1YWdlRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuRm9yQ29kZUxhbmd1YWdlRWxlbWVudCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuRm9yQ29kZUxhbmd1YWdlRWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuV2hpdHNwYWNlVG9rZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uU1BBQ0UpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlRBQikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5GZW5jZWRDb2RlQmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgfSxcblxuICAgIHNjYW5CbG9ja1F1b3RlRW1wdHlMaW5lczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5CbG9ja1F1b3RlRW1wdHlMaW5lKCkgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5FT0wpO1xuICAgIH0sXG5cbiAgICBzY2FuQmxvY2tRdW90ZUVtcHR5TGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVPTCkgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkdUKSB8fCB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkZvckhlYWRlcnNpZ25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVEpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FUSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5Nb3JlQmxvY2tFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSB0aGlzLmhlYWRpbmdBaGVhZCgxKTtcbiAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhbkZvckhlYWRlcnNpZ25zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uREFTSCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRJR0lUUykgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5GZW5jZWRDb2RlQmxvY2soKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5QYXJhZ3JhcGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5Ub2tlbjogZnVuY3Rpb24oa2luZCkge1xuICAgICAgICBpZiAodGhpcy5zY2FuUG9zaXRpb24gPT09IHRoaXMubGFzdFBvc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmxvb2tBaGVhZC0tO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNjYW5Qb3NpdGlvbi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uLm5leHQgPSB0aGlzLnRtLmdldE5leHRUb2tlbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24ubmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24ubmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY2FuUG9zaXRpb24ua2luZCAhPT0ga2luZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubG9va0FoZWFkID09PSAwICYmIHRoaXMuc2NhblBvc2l0aW9uID09PSB0aGlzLmxhc3RQb3NpdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgdGhpcy5sb29rQWhlYWRTdWNjZXNzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgZ2V0TmV4dFRva2VuS2luZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLm5leHRUb2tlbktpbmQgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uZXh0VG9rZW5LaW5kO1xuICAgICAgICB9IGVsc2UgaWYgKCEodGhpcy5uZXh0VG9rZW4gPSB0aGlzLnRva2VuLm5leHQpKSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuLm5leHQgPSB0aGlzLnRtLmdldE5leHRUb2tlbigpO1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLm5leHRUb2tlbktpbmQgPSB0aGlzLnRva2VuLm5leHQua2luZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh0aGlzLm5leHRUb2tlbktpbmQgPSB0aGlzLm5leHRUb2tlbi5raW5kKTtcbiAgICB9LFxuXG4gICAgY29uc3VtZVRva2VuOiBmdW5jdGlvbihraW5kKSB7XG4gICAgICAgIHZhciBvbGQgPSB0aGlzLnRva2VuO1xuXG4gICAgICAgIGlmICh0aGlzLnRva2VuLm5leHQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudG9rZW4gPSB0aGlzLnRva2VuLm5leHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy50b2tlbi5uZXh0ID0gdGhpcy50bS5nZXROZXh0VG9rZW4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5leHRUb2tlbktpbmQgPSAtMTtcbiAgICAgICAgaWYgKHRoaXMudG9rZW4ua2luZCA9PT0ga2luZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2tlbiA9IG9sZDtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgfSxcblxuICAgIGdldFRva2VuOiBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICB2YXIgdCA9IHRoaXMubG9va2luZ0FoZWFkID8gdGhpcy5zY2FuUG9zaXRpb24gOiB0aGlzLnRva2VuO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHQubmV4dCkge1xuICAgICAgICAgICAgICAgIHQgPSB0Lm5leHQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHQgPSB0Lm5leHQgPSB0aGlzLnRtLmdldE5leHRUb2tlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gVG9rZW4oa2luZCwgYmVnaW5MaW5lLCBiZWdpbkNvbHVtbiwgZW5kTGluZSwgZW5kQ29sdW1uLCBpbWFnZSkge1xuXHR0aGlzLmtpbmQgPSBraW5kO1xuXHR0aGlzLmJlZ2luTGluZSA9IGJlZ2luTGluZTtcblx0dGhpcy5iZWdpbkNvbHVtbiA9IGJlZ2luQ29sdW1uO1xuICAgIHRoaXMuZW5kTGluZSA9IGVuZExpbmU7XG5cdHRoaXMuZW5kQ29sdW1uID0gZW5kQ29sdW1uO1xuXHR0aGlzLmltYWdlID0gaW1hZ2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVG9rZW47XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFRva2VuID0gcmVxdWlyZShcIi4vdG9rZW5cIik7XG5cbmZ1bmN0aW9uIFRva2VuTWFuYWdlcihzdHJlYW0pIHtcblx0dGhpcy5jcyA9IHN0cmVhbTtcblx0dGhpcy5qanJvdW5kcyA9IFtdO1xuXHR0aGlzLmpqc3RhdGVTZXQgPSBbXTtcblx0dGhpcy5qam5leHRTdGF0ZXMgPSBbMiwgMywgNV07XG59XG5cblRva2VuTWFuYWdlci5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBUb2tlbk1hbmFnZXIsXG5cblx0RU9GOiAwLFxuXHRBU1RFUklTSzogMSxcblx0QkFDS1NMQVNIOiAyLFxuXHRCQUNLVElDSzogMyxcblx0Q0hBUl9TRVFVRU5DRTogNCxcblx0Q09MT046IDUsXG5cdERBU0g6IDYsXG5cdERJR0lUUzogNyxcblx0RE9UOiA4LFxuXHRFT0w6IDksXG5cdEVROiAxMCxcblx0RVNDQVBFRF9DSEFSOiAxMSxcblx0R1Q6IDEyLFxuXHRJTUFHRV9MQUJFTDogMTMsXG5cdExCUkFDSzogMTQsXG5cdExQQVJFTjogMTUsXG5cdExUOiAxNixcblx0UkJSQUNLOiAxNyxcblx0UlBBUkVOOiAxOCxcblx0U1BBQ0U6IDE5LFxuXHRUQUI6IDIwLFxuXHRVTkRFUlNDT1JFOiAyMSxcblxuICAgIGdldE5leHRUb2tlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY3VyUG9zID0gMDtcblxuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLmJlZ2luVG9rZW4oKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsbFRva2VuKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gMDtcbiAgICAgICAgICAgICAgICBjdXJQb3MgPSB0aGlzLm1vdmVTdHJpbmdMaXRlcmFsRGZhMCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hlZEtpbmQgIT09IDIxNDc0ODM2NDcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWF0Y2hlZFBvcyArIDEgPCBjdXJQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3MuYmFja3VwKGN1clBvcyAtIHRoaXMubWF0Y2hlZFBvcyAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxUb2tlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZmlsbFRva2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUb2tlbih0aGlzLm1hdGNoZWRLaW5kLCB0aGlzLmNzLmdldEJlZ2luTGluZSgpLCB0aGlzLmNzLmdldEJlZ2luQ29sdW1uKCksIHRoaXMuY3MuZ2V0RW5kTGluZSgpLCB0aGlzLmNzLmdldEVuZENvbHVtbigpLFxuICAgICAgICAgICAgICAgIHRoaXMuY3MuZ2V0SW1hZ2UoKSk7XG4gICAgfSxcblxuICAgIG1vdmVTdHJpbmdMaXRlcmFsRGZhMDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgY2FzZSA5OiByZXR1cm4gdGhpcy5zdGFydE5mYVdpdGhTdGF0ZXMoMCwgdGhpcy5UQUIsIDgpO1xuICAgICAgICBjYXNlIDMyOiByZXR1cm4gdGhpcy5zdGFydE5mYVdpdGhTdGF0ZXMoMCwgdGhpcy5TUEFDRSwgOCk7XG4gICAgICAgIGNhc2UgNDA6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkxQQVJFTik7XG4gICAgICAgIGNhc2UgNDE6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLlJQQVJFTik7XG4gICAgICAgIGNhc2UgNDI6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkFTVEVSSVNLKTtcbiAgICAgICAgY2FzZSA0NTogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuREFTSCk7XG4gICAgICAgIGNhc2UgNDY6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkRPVCk7XG4gICAgICAgIGNhc2UgNTg6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkNPTE9OKTtcbiAgICAgICAgY2FzZSA2MDogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuTFQpO1xuICAgICAgICBjYXNlIDYxOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5FUSk7XG4gICAgICAgIGNhc2UgNjI6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkdUKTtcbiAgICAgICAgY2FzZSA3MzogcmV0dXJuIHRoaXMubW92ZVN0cmluZ0xpdGVyYWxEZmExKDB4MjAwMCk7XG4gICAgICAgIGNhc2UgOTE6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkxCUkFDSyk7XG4gICAgICAgIGNhc2UgOTI6IHJldHVybiB0aGlzLnN0YXJ0TmZhV2l0aFN0YXRlcygwLCB0aGlzLkJBQ0tTTEFTSCwgNyk7XG4gICAgICAgIGNhc2UgOTM6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLlJCUkFDSyk7XG4gICAgICAgIGNhc2UgOTU6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLlVOREVSU0NPUkUpO1xuICAgICAgICBjYXNlIDk2OiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5CQUNLVElDSyk7XG4gICAgICAgIGNhc2UgMTA1OiByZXR1cm4gdGhpcy5tb3ZlU3RyaW5nTGl0ZXJhbERmYTEoMHgyMDAwKTtcbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHRoaXMubW92ZU5mYSg2LCAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydE5mYVdpdGhTdGF0ZXM6IGZ1bmN0aW9uKHBvcywga2luZCwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IGtpbmQ7XG4gICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IHBvcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MucmVhZENoYXIoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHBvcyArIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZU5mYShzdGF0ZSwgcG9zICsgMSk7XG4gICAgfSxcblxuICAgIHN0b3BBdFBvczogZnVuY3Rpb24ocG9zLCBraW5kKSB7XG4gICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSBraW5kO1xuICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSBwb3M7XG4gICAgICAgIHJldHVybiBwb3MgKyAxO1xuICAgIH0sXG5cbiAgICBtb3ZlU3RyaW5nTGl0ZXJhbERmYTE6IGZ1bmN0aW9uKGFjdGl2ZSkge1xuICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLnJlYWRDaGFyKCk7XG4gICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gNzcgfHwgdGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDEwOSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW92ZVN0cmluZ0xpdGVyYWxEZmEyKGFjdGl2ZSwgMHgyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE5mYSgwLCBhY3RpdmUpO1xuICAgIH0sXG5cbiAgICBtb3ZlU3RyaW5nTGl0ZXJhbERmYTI6IGZ1bmN0aW9uKG9sZCwgYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MucmVhZENoYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSA2NSB8fCB0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gOTcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdmVTdHJpbmdMaXRlcmFsRGZhMyhhY3RpdmUsIDB4MjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnROZmEoMSwgYWN0aXZlKTtcblxuICAgIH0sXG5cbiAgICBtb3ZlU3RyaW5nTGl0ZXJhbERmYTM6IGZ1bmN0aW9uKG9sZCwgYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MucmVhZENoYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSA3MSB8fCB0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gMTAzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlU3RyaW5nTGl0ZXJhbERmYTQoYWN0aXZlLCAweDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0TmZhKDIsIGFjdGl2ZSk7XG4gICAgfSxcblxuICAgIG1vdmVTdHJpbmdMaXRlcmFsRGZhNDogZnVuY3Rpb24ob2xkLCBhY3RpdmUpIHtcbiAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5yZWFkQ2hhcigpO1xuICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDY5IHx8IHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSAxMDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdmVTdHJpbmdMaXRlcmFsRGZhNShhY3RpdmUsIDB4MjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnROZmEoMywgYWN0aXZlKTtcbiAgICB9LFxuXG4gICAgbW92ZVN0cmluZ0xpdGVyYWxEZmE1OiBmdW5jdGlvbihvbGQsIGFjdGl2ZSkge1xuICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLnJlYWRDaGFyKCk7XG4gICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gNTggJiYgKChhY3RpdmUgJiAweDIwMDApICE9PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDUsIDEzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE5mYSg0LCBhY3RpdmUpO1xuICAgIH0sXG5cbiAgICBzdGFydE5mYTogZnVuY3Rpb24ocG9zLCBhY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZU5mYSh0aGlzLnN0b3BTdHJpbmdMaXRlcmFsRGZhKHBvcywgYWN0aXZlKSwgcG9zICsgMSk7XG4gICAgfSxcblxuICAgIG1vdmVOZmE6IGZ1bmN0aW9uKHN0YXJ0U3RhdGUsIGN1clBvcykge1xuICAgICAgICB0aGlzLmpqbmV3U3RhdGVDbnQgPSA4O1xuICAgICAgICB0aGlzLmpqc3RhdGVTZXRbMF0gPSBzdGFydFN0YXRlO1xuICAgICAgICB2YXIgc3RhcnRzQXQgPSAwO1xuICAgICAgICB2YXIgaSA9IDE7XG4gICAgICAgIHZhciBsID0gbnVsbDtcbiAgICAgICAgdmFyIGtpbmQgPSAweDdmZmZmZmZmO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBpZiAoKyt0aGlzLnJvdW5kID09PSAweDdmZmZmZmZmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3VuZCA9IDB4ODAwMDAwMDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPCA2NCkge1xuICAgICAgICAgICAgICAgIGwgPSAxICogTnVtYmVyKE1hdGgucG93KDIsIHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApKSk7XG5cbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5qanN0YXRlU2V0Wy0taV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4ODgwMDk4ZmVmZmZmZDlmZiwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpdHdpc2U2NCgweDNmZjAwMDAwMDAwMDAwMCwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA+IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpdHdpc2U2NCgweDI0MDAsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPiA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaXR3aXNlNjQoNDI5NDk2NzgwOCwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZFN0YXRlcygwLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpqc3RhdGVTZXRbdGhpcy5qam5ld1N0YXRlQ250KytdID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHgyNDAwLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID4gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYml0d2lzZTY0KDB4MTAwMDAwMjAwLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkU3RhdGVzKDAsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSAxMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuampzdGF0ZVNldFt0aGlzLmpqbmV3U3RhdGVDbnQrK10gPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDg4MDA5OGZlZmZmZmQ5ZmYsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4M2ZmMDAwMDAwMDAwMDAwLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID4gNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGQoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4MTAwMDAwMjAwLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkU3RhdGVzKDAsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDI0MDAsIGwpICE9PSAwICYmIGtpbmQgPiA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSAxMCAmJiBraW5kID4gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpqc3RhdGVTZXRbdGhpcy5qam5ld1N0YXRlQ250KytdID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHg3N2ZmNjcwMDAwMDAwMDAwLCBsKSAhPT0gMCAmJiBraW5kID4gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGkgIT09IHN0YXJ0c0F0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPCAxMjgpIHtcbiAgICAgICAgICAgICAgICBsID0gMSAqIE51bWJlcihNYXRoLnBvdygyLCB0aGlzLmJpdHdpc2U2NCh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSwgNjMpKSk7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuampzdGF0ZVNldFstLWldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPiA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDkyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qanN0YXRlU2V0W3RoaXMuampuZXdTdGF0ZUNudCsrXSA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4ZmZmZmZmZmU0N2ZmZmZmZiwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHgxYjgwMDAwMDAsIGwpICE9PSAwICYmIGtpbmQgPiAxMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoaSAhPT0gc3RhcnRzQXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5qanN0YXRlU2V0Wy0taV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA+IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlIChpICE9PSBzdGFydHNBdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChraW5kICE9PSAweDdmZmZmZmZmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IGtpbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gY3VyUG9zO1xuICAgICAgICAgICAgICAgIGtpbmQgPSAweDdmZmZmZmZmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgKytjdXJQb3M7XG5cbiAgICAgICAgICAgIGlmICgoaSA9IHRoaXMuampuZXdTdGF0ZUNudCkgPT09IChzdGFydHNBdCA9IDggLSAodGhpcy5qam5ld1N0YXRlQ250ID0gc3RhcnRzQXQpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJQb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MucmVhZENoYXIoKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICBjaGVja05BZGRTdGF0ZXM6IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdGhpcy5jaGVja05BZGQodGhpcy5qam5leHRTdGF0ZXNbc3RhcnRdKTtcbiAgICAgICAgfSB3aGlsZSAoc3RhcnQrKyAhPT0gZW5kKTtcbiAgICB9LFxuXG4gICAgY2hlY2tOQWRkOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5qanJvdW5kc1tzdGF0ZV0gIT09IHRoaXMucm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuampzdGF0ZVNldFt0aGlzLmpqbmV3U3RhdGVDbnQrK10gPSBzdGF0ZTtcbiAgICAgICAgICAgIHRoaXMuampyb3VuZHNbc3RhdGVdID0gdGhpcy5yb3VuZDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wU3RyaW5nTGl0ZXJhbERmYTogZnVuY3Rpb24ocG9zLCBhY3RpdmUpIHtcbiAgICAgICAgaWYgKHBvcyA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KGFjdGl2ZSwgMHgyMDAwKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSA0O1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpdHdpc2U2NChhY3RpdmUsIDB4MTgwMDAwKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpdHdpc2U2NChhY3RpdmUsIDB4NCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09IDEgJiYgdGhpcy5iaXR3aXNlNjQoYWN0aXZlLCAweDIwMDApICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0gNDtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IDE7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09IDIgJiYgdGhpcy5iaXR3aXNlNjQoYWN0aXZlLCAweDIwMDApICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0gNDtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IDI7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09IDMgJiYgdGhpcy5iaXR3aXNlNjQoYWN0aXZlLCAweDIwMDApICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0gNDtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IDM7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSBlbHNlIGlmIChwb3MgPT09IDQgJiYgdGhpcy5iaXR3aXNlNjQoYWN0aXZlLCAweDIwMDApICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0gNDtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IDQ7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSxcblxuICAgIGJpdHdpc2U2NDogZnVuY3Rpb24oYSwgYikge1xuICAgICAgICB2YXIgZGl2aXNvciA9IDEgPDwgMzA7XG4gICAgICAgIHZhciBtYXNrID0gfigofjApIDw8IDMwKTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgIHZhciBzaGlmdCA9IDA7XG5cbiAgICAgICAgd2hpbGUgKChhICE9PSAwKSAmJiAoYiAhPT0gMCkpIHtcbiAgICAgICAgICAgIHZhciBycyA9IChtYXNrICYgYSkgJiAobWFzayAmIGIpO1xuXG4gICAgICAgICAgICBhID0gTWF0aC5mbG9vcihhIC8gZGl2aXNvcik7XG4gICAgICAgICAgICBiID0gTWF0aC5mbG9vcihiIC8gZGl2aXNvcik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gc2hpZnQrKzsgaS0tOykge1xuICAgICAgICAgICAgICAgIHJzICo9IGRpdmlzb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgKz0gcnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVG9rZW5NYW5hZ2VyO1xuXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gVHJlZVN0YXRlKCkge1xuXHR0aGlzLm5vZGVzID0gW107XG5cdHRoaXMubWFya3MgPSBbXTtcblx0dGhpcy5ub2Rlc09uU3RhY2sgPSAwO1xuXHR0aGlzLmN1cnJlbnRNYXJrID0gMDtcbn1cblxuVHJlZVN0YXRlLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFRyZWVTdGF0ZSxcblxuXHRvcGVuU2NvcGU6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMubWFya3MucHVzaCh0aGlzLmN1cnJlbnRNYXJrKTtcblx0XHR0aGlzLmN1cnJlbnRNYXJrID0gdGhpcy5ub2Rlc09uU3RhY2s7XG5cdH0sXG5cblx0Y2xvc2VTY29wZTogZnVuY3Rpb24obikge1xuICAgICAgICB2YXIgYSA9IHRoaXMubm9kZUFyaXR5KCk7XG5cblx0XHR0aGlzLmN1cnJlbnRNYXJrID0gdGhpcy5tYXJrcy5wb3AoKTtcblx0XHR3aGlsZSAoYS0tID4gMCkge1xuICAgICAgICAgIHZhciBjID0gdGhpcy5wb3BOb2RlKCk7XG5cbiAgICAgICAgICBjLnBhcmVudCA9IG47XG4gICAgICAgICAgbi5hZGQoYywgYSk7XG4gICAgICAgIH1cblx0XHR0aGlzLnB1c2hOb2RlKG4pO1xuXHR9LFxuXG5cdGFkZFNpbmdsZVZhbHVlOiBmdW5jdGlvbihuLCB0KSB7XG5cdFx0dGhpcy5vcGVuU2NvcGUoKTtcbiAgICAgICAgbi52YWx1ZSA9IHQuaW1hZ2U7XG4gICAgICAgIHRoaXMuY2xvc2VTY29wZShuKTtcblx0fSxcblxuXHRub2RlQXJpdHk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLm5vZGVzT25TdGFjayAtIHRoaXMuY3VycmVudE1hcms7XG5cdH0sXG5cbiAgICBwb3BOb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLS10aGlzLm5vZGVzT25TdGFjaztcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMucG9wKCk7XG4gICAgfSxcblxuICAgIHB1c2hOb2RlOiBmdW5jdGlvbihuKSB7XG4gICAgICAgIHRoaXMubm9kZXMucHVzaChuKTtcbiAgICAgICAgKyt0aGlzLm5vZGVzT25TdGFjaztcbiAgICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZVN0YXRlO1xuIl19
