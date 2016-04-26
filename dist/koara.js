(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.koara = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require("./lib/koara");

},{"./lib/koara":2}],2:[function(require,module,exports){
"use strict";

var used = [],
    exports = module.exports = {};

exports.CharStream = require("./koara/charstream");
exports.Parser = require("./koara/parser");
exports.StringReader = require("./koara/io/stringreader");

},{"./koara/charstream":19,"./koara/io/stringreader":20,"./koara/parser":22}],3:[function(require,module,exports){
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

},{"./document":7,"./node":15}],4:[function(require,module,exports){
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

},{"./blockelement":3}],5:[function(require,module,exports){
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

},{"./node":15}],6:[function(require,module,exports){
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

},{"./blockelement":3}],7:[function(require,module,exports){
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

},{"./node":15}],8:[function(require,module,exports){
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

},{"./node":15}],9:[function(require,module,exports){
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

},{"./blockelement":3}],10:[function(require,module,exports){
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

},{"./node":15}],11:[function(require,module,exports){
"use strict";

var Node = require("./node");

function LineBreak() {}
LineBreak.prototype = new Node();
LineBreak.prototype.constructor = LineBreak;

LineBreak.prototype.accept = function(renderer) {
	renderer.visitLineBreak(this);
};

module.exports = LineBreak;

},{"./node":15}],12:[function(require,module,exports){
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

},{"./node":15}],13:[function(require,module,exports){
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

},{"./blockelement":3}],14:[function(require,module,exports){
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

},{"./node":15}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{"./blockelement":3}],17:[function(require,module,exports){
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

},{"./node":15}],18:[function(require,module,exports){
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

},{"./node":15}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
"use strict";

function LookaheadSuccess() {}

module.exports = LookaheadSuccess;

},{}],22:[function(require,module,exports){
"use strict";

var LookaheadSuccess = require("./lookaheadsuccess");
var StringReader = require("./io/stringreader");
var CharStream = require("./charstream");
var TokenManager = require("./tokenmanager");
var Token = require("./token");
var TreeState = require("./treestate");

var Document = require("./ast/document");
var BlockElement = require("./ast/blockelement");
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

},{"./ast/blockelement":3,"./ast/blockquote":4,"./ast/code":5,"./ast/codeblock":6,"./ast/document":7,"./ast/em":8,"./ast/heading":9,"./ast/image":10,"./ast/linebreak":11,"./ast/link":12,"./ast/listblock":13,"./ast/listitem":14,"./ast/paragraph":16,"./ast/strong":17,"./ast/text":18,"./charstream":19,"./io/stringreader":20,"./lookaheadsuccess":21,"./token":23,"./tokenmanager":24,"./treestate":25}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./token":23}],25:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvaW5kZXguanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvYmxvY2tlbGVtZW50LmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvYmxvY2txdW90ZS5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2NvZGUuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9jb2RlYmxvY2suanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2FzdC9kb2N1bWVudC5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2VtLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvaGVhZGluZy5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2ltYWdlLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvbGluZWJyZWFrLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3QvbGluay5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2xpc3RibG9jay5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L2xpc3RpdGVtLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS9hc3Qvbm9kZS5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L3BhcmFncmFwaC5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L3N0cm9uZy5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvYXN0L3RleHQuanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2NoYXJzdHJlYW0uanMiLCIvVXNlcnMvYW5keS9naXQva29hcmEva29hcmEtanMvbGliL2tvYXJhL2lvL3N0cmluZ3JlYWRlci5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvbG9va2FoZWFkc3VjY2Vzcy5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvcGFyc2VyLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS90b2tlbi5qcyIsIi9Vc2Vycy9hbmR5L2dpdC9rb2FyYS9rb2FyYS1qcy9saWIva29hcmEvdG9rZW5tYW5hZ2VyLmpzIiwiL1VzZXJzL2FuZHkvZ2l0L2tvYXJhL2tvYXJhLWpzL2xpYi9rb2FyYS90cmVlc3RhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O0FDQXhDLFlBQVksQ0FBQzs7QUFFYixJQUFJLElBQUksR0FBRyxFQUFFO0FBQ2IsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWxDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkQsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMzQyxPQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyx5QkFB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Q0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3pDLE1BQU07b0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7d0JBQ1gsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQ3pDLE1BQU07b0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07d0JBQ2YsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQzdDLE1BQU07b0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07d0JBQ2YsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQzdDLE1BQU07b0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07d0JBQ2YsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQzdDLE1BQU07b0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07d0JBQ2YsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQzdDLE1BQU07b0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVU7d0JBQ25CLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO3dCQUNqRCxNQUFNO29CQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRO3dCQUNqQixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMs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QyxFQUFFO2dCQUNYLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN6QyxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVk7Z0JBQ3JCLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNYLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUN6QyxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVc7Z0JBQ3BCLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07Z0JBQ2YsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDWCxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDekMsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNO2dCQUNmLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUM3QyxNQUFNO1lBQ1Ys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QyxDQUFDLEtBQUssQ0FBQztnQkFDL0MsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTO2dCQUNsQixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDaEQsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRO2dCQUNqQixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDL0MsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLO2dCQUNkLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUM1QyxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUk7Z0JBQ2IsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtnQkFDZixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0MsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHO2dCQUNaLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUMxQyxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pDLE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWTtnQkFDckIsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVc7Z0JBQ3BCLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pDLE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtnQkFDZixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0MsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNO2dCQUNmLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUM3QyxNQUFNO1lBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ1gsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pDLE1BQU07WUFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtnQkFDZixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDN0MsTUFBTTtZQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVO2dCQUNuQixDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDakQsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFO29CQUN4QyxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDL0IsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUs7d0JBQ2QsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7d0JBQzVDLE1BQU07b0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUc7d0JBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUMvQixDQUFDLElBQUksTUFBTSxDQUFDO3dCQUNaLE1BQU07cUJBQ1Q7aUJBQ0o7ZUFDRjthQUNGO1lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDckIsT0FBTzs7TUFFRCxlQUFlLEVBQUUsV0FBVztBQUNsQyxVQUFVLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7O1VBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7VUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1VBQ3BDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1VBQzlCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2NBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztjQUNqQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztXQUNqQztVQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztVQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxPQUFPOztNQUVELHNCQUFzQixFQUFFLFdBQVc7UUFDakMsR0FBRztZQUNDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDcEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hCLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNsRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDakUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRSxFQUFFO2dCQUMxQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzthQUNsQyxNQUFNO2dCQUNILFFBQVEsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMvQixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUTtvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDMUUsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtvQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVO29CQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUM1RSxNQUFNO2lCQUNUO2FBQ0o7U0FDSixRQUFRLElBQUksQ0FBQywrQkFBK0IsRUFBRSxFQUFFO0FBQ3pELE9BQU87O01BRUQsdUJBQXVCLEVBQUUsV0FBVztBQUMxQyxRQUFRLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7O1FBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQyxPQUFPOztNQUVELDhCQUE4QixFQUFFLFdBQVc7UUFDekMsR0FBRztZQUNDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDcEUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hCLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNsRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDakUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2YsTUFBTTtnQkFDSCxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDL0IsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVE7b0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzFFLE1BQU07Z0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU07b0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDeEUsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVTtvQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDNUUsTUFBTTtpQkFDVDthQUNKO1NBQ0osUUFBUSxJQUFJLENBQUMsdUNBQXVDLEVBQUUsRUFBRTtBQUNqRSxPQUFPOztNQUVELGNBQWMsRUFBRSxXQUFXO0FBQ2pDLFFBQVEsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQzs7UUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsR0FBRztZQUNDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2VBQ3RCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNkLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO2VBQ3JFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNmLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2VBQ25FLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNkLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2VBQ2xFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNkLE1BQU07Z0JBQ0gsUUFBUSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRO29CQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMxRSxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNO29CQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3hFLE1BQU07Z0JBQ1YsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVU7b0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzVFLE1BQU07aUJBQ1Q7YUFDSjtTQUNKLFFBQVEsSUFBSSxDQUFDLDhCQUE4QixFQUFFLEVBQUU7UUFDaEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLEtBQUs7O0lBRUQsV0FBVyxFQUFFLFdBQVc7QUFDNUIsUUFBUSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDOztRQUVsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakMsS0FBSzs7SUFFRCxrQkFBa0IsRUFBRSxXQUFXO1FBQzNCLEdBQUc7WUFDQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDckIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7Z0JBQ3BFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQixNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2YsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ25GLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QixNQUFNLElBQUksSUFBSSxDQUFDLCtCQUErQixFQUFFLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ2xDLE1BQU07Z0JBQ0gsUUFBUSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRO29CQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMxRSxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRO29CQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMxRSxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNO29CQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ3hFLE1BQU07aUJBQ1Q7YUFDSjtTQUNKLFFBQVEsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEVBQUU7QUFDNUQsS0FBSzs7SUFFRCx1QkFBdUIsRUFBRSxXQUFXO0FBQ3hDLFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQzs7UUFFbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLEtBQUs7O0lBRUQsOEJBQThCLEVBQUUsV0FBVztRQUN2QyxHQUFHO1lBQ0MsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNwRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEIsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNO2dCQUNILFFBQVEsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMvQixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUTtvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDMUUsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUTtvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDMUUsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtvQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxNQUFNO2lCQUNUO2FBQ0o7U0FDSixRQUFRLElBQUksQ0FBQyw4Q0FBOEMsRUFBRSxFQUFFO0FBQ3hFLEtBQUs7O0lBRUQsY0FBYyxFQUFFLFdBQVc7QUFDL0IsUUFBUSxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDOztRQUVsQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxHQUFHO1lBQ0MsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO2dCQUNwRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEIsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUU7Z0JBQ2xFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNO2dCQUNILFFBQVEsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMvQixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUTtvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDMUUsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUTtvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDMUUsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTTtvQkFDZixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN4RSxNQUFNO2lCQUNUO2FBQ0o7U0FDSixRQUFRLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNqQyxLQUFLOztJQUVELGFBQWEsRUFBRSxXQUFXO0FBQzlCLFFBQVEsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7UUFFdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsS0FBSzs7SUFFRCxVQUFVLEVBQUUsV0FBVztRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQ3pGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztTQUM5QztBQUNULEtBQUs7O0lBRUQsd0JBQXdCLEVBQUUsV0FBVztRQUNqQyxJQUFJO1lBQ0EsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQ3hDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCxVQUFVLEVBQUUsU0FBUyxnQkFBZ0IsRUFBRTtBQUMzQyxRQUFRLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQzs7UUFFbkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUN6QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDekIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBRVYsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNmLEdBQUc7Z0JBQ0MsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDZixHQUFHO29CQUNDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDdkIsSUFBSSxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsS0FBSyxDQUFDLEVBQUU7NEJBQ25GLE9BQU8sS0FBSyxDQUFDO3lCQUNoQjt3QkFDRCxVQUFVLEVBQUUsQ0FBQztxQkFDaEI7aUJBQ0osUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDdEYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFO29CQUNyQyxPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3JDLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNKLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtZQUNqQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLGlCQUFpQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzVHO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxjQUFjLEVBQUUsU0FBUyxLQUFLLEVBQUU7UUFDNUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO1lBQy9HLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ25DLGdCQUFnQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFFekIsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtvQkFDbEIsT0FBTyxJQUFJLENBQUM7aUJBQ2YsTUFBTSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7b0JBQy9CLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdkUsb0JBQW9CLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7O29CQUV2QyxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3ZDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDM0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJOzZCQUNqSCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7NkJBQ3RGLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVE7NEJBQzdGLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUU7NEJBQ3pFLE9BQU8sS0FBSyxDQUFDO3lCQUNoQjtxQkFDSixNQUFNO3dCQUNILE9BQU8sS0FBSyxDQUFDO3FCQUNoQjtpQkFDSixNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtvQkFDL0IsT0FBTyxLQUFLLENBQUM7aUJBQ2hCO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsV0FBVyxFQUFFLFdBQVc7UUFDcEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtBQUNyRCxZQUFZLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztZQUUvRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hKLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7YUFDekY7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsWUFBWSxFQUFFLFNBQVMsTUFBTSxFQUFFO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdkQsWUFBWSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7O1lBRWhCLEtBQUssSUFBSSxDQUFDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN0QyxPQUFPLElBQUksQ0FBQztpQkFDZjtnQkFDRCxJQUFJLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRTtvQkFDZixPQUFPLEtBQUssQ0FBQztpQkFDaEI7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxhQUFhLEVBQUUsU0FBUyxlQUFlLEVBQUUsT0FBTyxFQUFFO1FBQzlDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDekMsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUM1QyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRXpCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUU7b0JBQ3JDLE9BQU8sS0FBSyxDQUFDO2lCQUNoQixNQUFNLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtvQkFDOUcsSUFBSSxPQUFPLEVBQUU7d0JBQ1QsUUFBUSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLGVBQWUsRUFBRTtxQkFDdkg7b0JBQ0QsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksZUFBZSxDQUFDO2lCQUN0RTthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELFNBQVMsRUFBRSxXQUFXO1FBQ2xCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7WUFDbEYsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDL0QsWUFBWSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUV2QyxJQUFJLFVBQVUsS0FBSyxJQUFJLENBQUMsaUJBQWlCLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQkFDdEYsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNFLGdCQUFnQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFFekIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29CQUM1RyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDL0csRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO29CQUNqSixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEU7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsY0FBYyxFQUFFLFNBQVMsTUFBTSxFQUFFO0FBQ3JDLFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1FBRW5ELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxRCxLQUFLOztJQUVELGFBQWEsRUFBRSxTQUFTLE1BQU0sRUFBRTtBQUNwQyxRQUFRLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQzs7UUFFbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDcEMsWUFBWSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUV6QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3ZCLFVBQVUsRUFBRSxDQUFDO2FBQ2hCLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7Z0JBQzNELE9BQU8sVUFBVSxDQUFDO0FBQ2xDLGFBQWE7O1NBRUo7QUFDVCxLQUFLOztJQUVELElBQUksRUFBRSxTQUFTLE1BQU0sRUFBRSxNQUFNLEVBQUU7UUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDcEMsWUFBWSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUV6QixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3pELE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSjtBQUNULEtBQUs7O0lBRUQsbUJBQW1CLEVBQUUsV0FBVztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMxRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsdUJBQXVCLEVBQUUsV0FBVztRQUNoQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ3RDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCw2QkFBNkIsRUFBRSxXQUFXO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7QUFDWixZQUFZLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O1lBRTVCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29CQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7d0JBQ3hCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFOzRCQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0QkFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0NBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0NBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO29DQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQ0FDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7d0NBQ3RCLE9BQU8sS0FBSyxDQUFDO3FDQUNoQjtpQ0FDSjs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsWUFBWSxFQUFFLFdBQVc7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDakMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELGFBQWEsRUFBRSxXQUFXO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzVCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCwyQkFBMkIsRUFBRSxXQUFXO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDMUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELGNBQWMsRUFBRSxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzdCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCxVQUFVLEVBQUUsV0FBVztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN6QixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsWUFBWSxFQUFFLFdBQVc7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0IsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELG1DQUFtQyxFQUFFLFdBQVc7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUN4QyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsNEJBQTRCLEVBQUUsV0FBVztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQzNDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCx5QkFBeUIsRUFBRSxXQUFXO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDeEMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELGtCQUFrQixFQUFFLFdBQVc7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDakMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELHFCQUFxQixFQUFFLFdBQVc7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUNwQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsbUJBQW1CLEVBQUUsV0FBVztRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ25DLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCxvQkFBb0IsRUFBRSxXQUFXO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDdkMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELGtCQUFrQixFQUFFLFdBQVc7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDbEMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELG1CQUFtQixFQUFFLFdBQVc7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDbEMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELHVCQUF1QixFQUFFLFdBQVc7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUN0QyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsNEJBQTRCLEVBQUUsV0FBVztRQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQzFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCwwQkFBMEIsRUFBRSxXQUFXO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7U0FDOUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELCtCQUErQixFQUFFLFdBQVc7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztTQUM5QyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsdUNBQXVDLEVBQUUsV0FBVztRQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDO1NBQ3RELENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCxRQUFRLEVBQUUsV0FBVztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUM1QixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsWUFBWSxFQUFFLFdBQVc7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0IsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELHlCQUF5QixFQUFFLFdBQVc7UUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNyQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsaUJBQWlCLEVBQUUsV0FBVztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3JDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCw4QkFBOEIsRUFBRSxXQUFXO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7U0FDN0MsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELCtCQUErQixFQUFFLFdBQVc7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztTQUM5QyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsa0NBQWtDLEVBQUUsV0FBVztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1NBQ2pELENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCw4Q0FBOEMsRUFBRSxXQUFXO1FBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUM7U0FDckQsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztHQUVGLG1CQUFtQixFQUFFLFdBQVc7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNyQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsYUFBYSxFQUFFLFdBQVc7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDakMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELDhCQUE4QixFQUFFLFdBQVc7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSTtZQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztTQUM3QyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDZjtBQUNULEtBQUs7O0lBRUQsd0JBQXdCLEVBQUUsV0FBVztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3JDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCxrQkFBa0IsRUFBRSxXQUFXO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ25ELElBQUk7WUFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNmO0FBQ1QsS0FBSzs7SUFFRCxhQUFhLEVBQUUsV0FBVztBQUM5QixRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O1FBRTVCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29CQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDN0M7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxRQUFRLEVBQUUsV0FBVztBQUN6QixRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O1FBRTVCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29CQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7d0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0QkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0NBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dDQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQ0FDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0NBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFO3dDQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzt3Q0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7NENBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzRDQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtnREFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0RBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29EQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvREFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7d0RBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dEQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTs0REFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NERBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dFQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnRUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0VBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0VBQzFFLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dFQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFOzZEQUNqRTt5REFDSjtxREFDSjtpREFDSjs2Q0FDSjt5Q0FDSjtxQ0FDSjtpQ0FDSjs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELGNBQWMsRUFBRSxXQUFXO0FBQy9CLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDOztRQUVmLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFO29CQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dDQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7b0NBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29DQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTt3Q0FDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7d0NBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFOzRDQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0Q0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0RBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dEQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtvREFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0RBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dEQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzt3REFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7NERBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzREQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtnRUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0VBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29FQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvRUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7d0VBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dFQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTs0RUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEVBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzRFQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRFQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzs0RUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTt5RUFDakU7cUVBQ0o7aUVBQ0o7NkRBQ0o7eURBQ0o7cURBQ0o7aURBQ0o7NkNBQ0o7eUNBQ0o7cUNBQ0o7aUNBQ0o7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxRQUFRLEVBQUUsV0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEgsS0FBSzs7SUFFRCxpQkFBaUIsRUFBRSxXQUFXO0FBQ2xDLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDOztRQUVmLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDL0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLE1BQU07YUFDVDtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLEtBQUs7O0lBRUQsdUJBQXVCLEVBQUUsV0FBVztBQUN4QyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsMEJBQTBCLEVBQUUsV0FBVztBQUMzQyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxFQUFFO1dBQ3RDLE9BQU8sSUFBSSxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0FBQzlDLEtBQUs7O0lBRUQsbUJBQW1CLEVBQUUsV0FBVztBQUNwQyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixPQUFPLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsNEJBQTRCLEVBQUUsV0FBVztRQUNyQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6RSxLQUFLOztJQUVELDBCQUEwQixFQUFFLFdBQVc7QUFDM0MsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dDQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3pDO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsa0JBQWtCLEVBQUUsV0FBVztBQUNuQyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsRUFBRTtZQUN6RSxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNsRCxLQUFLOztJQUVELGNBQWMsRUFBRSxXQUFXO0FBQy9CLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFNUIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0JBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dCQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzt3QkFDeEIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTs0QkFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dDQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7b0NBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29DQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQ0FDekM7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxNQUFNLEVBQUUsV0FBVztBQUN2QixRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDN0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xELEtBQUs7O0lBRUQsa0NBQWtDLEVBQUUsV0FBVztBQUNuRCxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O1FBRTVCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29CQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7d0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzRCQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0QkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dDQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDekM7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCx3Q0FBd0MsRUFBRSxXQUFXO0FBQ3pELFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDOztRQUVmLElBQUksSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsa0NBQWtDLEVBQUUsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLE1BQU07YUFDVDtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCwyQkFBMkIsRUFBRSxXQUFXO0FBQzVDLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDOztRQUVmLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyx3Q0FBd0MsRUFBRSxFQUFFO1lBQ3ZGLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLDRCQUE0QixFQUFFLElBQUksSUFBSSxDQUFDLHdDQUF3QyxFQUFFLEVBQUU7Z0JBQ3hGLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2xELEtBQUs7O0lBRUQsOEJBQThCLEVBQUUsV0FBVztBQUMvQyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O1FBRTVCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29CQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7d0JBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxFQUFFOzRCQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0QkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dDQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQ0FDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0NBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lDQUN6Qzs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELDBCQUEwQixFQUFFLFdBQVc7QUFDM0MsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dDQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7NkJBQzdDO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsa0JBQWtCLEVBQUUsV0FBVztBQUNuQyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsRUFBRTtZQUN2RSxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQywwQkFBMEIsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxLQUFLOztJQUVELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQy9ELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO29CQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO3dCQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzt3QkFDeEIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTs0QkFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dDQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7b0NBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29DQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQ0FDN0M7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxVQUFVLEVBQUUsV0FBVztBQUMzQixRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUMvRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO2dCQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxLQUFLOztJQUVELG1DQUFtQyxFQUFFLFdBQVc7QUFDcEQsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dDQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7NkJBQzdDO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsMENBQTBDLEVBQUUsV0FBVztBQUMzRCxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxFQUFFO1lBQzVDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxPQUFPLElBQUksRUFBRTtZQUNULEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLG1DQUFtQyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsMkJBQTJCLEVBQUUsV0FBVztBQUM1QyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsMENBQTBDLEVBQUUsRUFBRTtZQUN2RixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLElBQUksQ0FBQywwQ0FBMEMsRUFBRSxFQUFFO2dCQUMxRixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxLQUFLOztJQUVELDJCQUEyQixFQUFFLFdBQVc7QUFDNUMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxFQUFFOzRCQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0QkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0NBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dDQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQ0FDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0NBQ3hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lDQUM3Qzs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELHVCQUF1QixFQUFFLFdBQVc7QUFDeEMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUU7d0JBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dDQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7b0NBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29DQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTt3Q0FDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7d0NBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFOzRDQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0Q0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0RBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dEQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtvREFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0RBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dEQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzt3REFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7NERBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzREQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtnRUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0VBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29FQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvRUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7d0VBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dFQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTs0RUFDcEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEVBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOzRFQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRFQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQzs0RUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTt5RUFDakU7cUVBQ0o7aUVBQ0o7NkRBQ0o7eURBQ0o7cURBQ0o7aURBQ0o7NkNBQ0o7eUNBQ0o7cUNBQ0o7aUNBQ0o7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxnQkFBZ0IsRUFBRSxXQUFXO0FBQ2pDLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFNUIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCx3QkFBd0IsRUFBRSxXQUFXO0FBQ3pDLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDOztRQUVmLE9BQU8sSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLE1BQU07YUFDVDtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxlQUFlLEVBQUUsV0FBVztRQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7WUFDbEcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pFLEtBQUs7O0lBRUQsZUFBZSxFQUFFLFdBQVc7QUFDaEMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO29CQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29CQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTt3QkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7d0JBQ3hCLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUU7NEJBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzRCQUN4QixPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzt5QkFDL0I7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxtQkFBbUIsRUFBRSxXQUFXO0FBQ3BDLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFNUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzt3QkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7NEJBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzRCQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQ0FDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0NBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29DQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQ0FDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7d0NBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dDQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTs0Q0FDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NENBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dEQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnREFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7b0RBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO29EQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTt3REFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7d0RBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzREQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0REFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7NERBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NERBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDOzREQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO3lEQUNqRTtxREFDSjtpREFDSjs2Q0FDSjt5Q0FDSjtxQ0FDSjtpQ0FDSjs2QkFDSjt5QkFDSjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELG9CQUFvQixFQUFFLFdBQVc7QUFDckMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7O1FBRWYsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO2dCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELFFBQVEsRUFBRSxXQUFXO0FBQ3pCLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDOztRQUVmLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN4RixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxTQUFTLEVBQUUsV0FBVztBQUMxQixRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7WUFDaEksT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDOUQsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxpQkFBaUIsRUFBRSxXQUFXO0FBQ2xDLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFNUIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQzdELElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO3dCQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzt3QkFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7d0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7NEJBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQy9ELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDOzRCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dDQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQ0FDeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NkJBQy9CO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsYUFBYSxFQUFFLFdBQVc7QUFDOUIsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7O1FBRWYsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtZQUMxQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELGtCQUFrQixFQUFFLFdBQVc7QUFDbkMsUUFBUSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztRQUU1QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxtQkFBbUIsRUFBRSxXQUFXO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDeEgsS0FBSzs7SUFFRCx3QkFBd0IsRUFBRSxXQUFXO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixFQUFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdFLEtBQUs7O0lBRUQsdUJBQXVCLEVBQUUsV0FBVztBQUN4QyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7WUFDdkgsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELE9BQU8sSUFBSSxFQUFFO1lBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUU7Z0JBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7O0lBRUQsa0JBQWtCLEVBQUUsV0FBVztBQUNuQyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQzs7UUFFZixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxJQUFJLEVBQUU7WUFDVCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLE1BQU07YUFDVDtTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxxQkFBcUIsRUFBRSxXQUFXO0FBQ3RDLFFBQVEsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQzt3QkFDeEIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTs0QkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7NEJBQ3hCLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3lCQUMvQjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLOztJQUVELFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRTtRQUN0QixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN6QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO2dCQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUMzRixNQUFNO2dCQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQzthQUNsRTtTQUNKLE1BQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDakMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pFLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQy9CO1FBQ0QsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSzs7SUFFRCxnQkFBZ0IsRUFBRSxXQUFXO1FBQ3pCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0IsTUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekMsUUFBUSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtTQUN0RDtRQUNELFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtBQUMxRCxLQUFLOztJQUVELFlBQVksRUFBRSxTQUFTLElBQUksRUFBRTtBQUNqQyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBRXJCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7U0FDaEMsTUFBTTtZQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN6RDtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQzFCLEtBQUs7O0lBRUQsUUFBUSxFQUFFLFNBQVMsS0FBSyxFQUFFO0FBQzlCLFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBRTNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO2dCQUNSLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ2QsTUFBTTtnQkFDSCxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3ZDO1NBQ0o7UUFDRCxPQUFPLENBQUMsQ0FBQztBQUNqQixLQUFLOztBQUVMLENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7O0FDNXBGeEIsWUFBWSxDQUFDOztBQUViLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO0NBQ3ZFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0NBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0NBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0NBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLENBQUM7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7OztBQ1h2QixZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixTQUFTLFlBQVksQ0FBQyxNQUFNLEVBQUU7Q0FDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7Q0FDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Q0FDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Q0FDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQzs7QUFFRCxZQUFZLENBQUMsU0FBUyxHQUFHO0FBQ3pCLENBQUMsV0FBVyxFQUFFLFlBQVk7O0NBRXpCLEdBQUcsRUFBRSxDQUFDO0NBQ04sUUFBUSxFQUFFLENBQUM7Q0FDWCxTQUFTLEVBQUUsQ0FBQztDQUNaLFFBQVEsRUFBRSxDQUFDO0NBQ1gsYUFBYSxFQUFFLENBQUM7Q0FDaEIsS0FBSyxFQUFFLENBQUM7Q0FDUixJQUFJLEVBQUUsQ0FBQztDQUNQLE1BQU0sRUFBRSxDQUFDO0NBQ1QsR0FBRyxFQUFFLENBQUM7Q0FDTixHQUFHLEVBQUUsQ0FBQztDQUNOLEVBQUUsRUFBRSxFQUFFO0NBQ04sWUFBWSxFQUFFLEVBQUU7Q0FDaEIsRUFBRSxFQUFFLEVBQUU7Q0FDTixXQUFXLEVBQUUsRUFBRTtDQUNmLE1BQU0sRUFBRSxFQUFFO0NBQ1YsTUFBTSxFQUFFLEVBQUU7Q0FDVixFQUFFLEVBQUUsRUFBRTtDQUNOLE1BQU0sRUFBRSxFQUFFO0NBQ1YsTUFBTSxFQUFFLEVBQUU7Q0FDVixLQUFLLEVBQUUsRUFBRTtDQUNULEdBQUcsRUFBRSxFQUFFO0FBQ1IsQ0FBQyxVQUFVLEVBQUUsRUFBRTs7SUFFWCxZQUFZLEVBQUUsV0FBVztRQUNyQixJQUFJO0FBQ1osWUFBWSxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7O1lBRWYsT0FBTyxJQUFJLEVBQUU7Z0JBQ1QsSUFBSTtvQkFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3ZDLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzVDLGlCQUFpQjs7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLGdCQUFnQixNQUFNLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O2dCQUV0QyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO29CQUNqQyxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLE1BQU0sRUFBRTt3QkFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ2hEO29CQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUMzQjthQUNKO1NBQ0osQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7QUFDVCxLQUFLOztJQUVELFNBQVMsRUFBRSxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRTtnQkFDekgsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLEtBQUs7O0lBRUQscUJBQXFCLEVBQUUsV0FBVztRQUM5QixRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNsQyxLQUFLLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRCxLQUFLLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxLQUFLLEdBQUcsRUFBRSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxTQUFTLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbEM7QUFDVCxLQUFLOztJQUVELGtCQUFrQixFQUFFLFNBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdEIsSUFBSTtZQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNyQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDNUMsS0FBSzs7SUFFRCxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUN2QixLQUFLOztJQUVELHFCQUFxQixFQUFFLFNBQVMsTUFBTSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDekUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QyxLQUFLOztJQUVELHFCQUFxQixFQUFFLFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRTtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hFLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyRDtBQUNULFFBQVEsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFeEMsS0FBSzs7SUFFRCxxQkFBcUIsRUFBRSxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUU7UUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUN6RSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLEtBQUs7O0lBRUQscUJBQXFCLEVBQUUsU0FBUyxHQUFHLEVBQUUsTUFBTSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDekUsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QyxLQUFLOztJQUVELHFCQUFxQixFQUFFLFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRTtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLEtBQUs7O0lBRUQsUUFBUSxFQUFFLFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRTtRQUM1QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0UsS0FBSzs7SUFFRCxPQUFPLEVBQUUsU0FBUyxVQUFVLEVBQUUsTUFBTSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1FBQ2hDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDckIsUUFBUSxJQUFJLElBQUksR0FBRyxVQUFVLENBQUM7O1FBRXRCLE9BQU8sSUFBSSxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO2dCQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQzthQUMzQjtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0FBQ2pELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUV4RCxHQUFHO29CQUNDLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUIsS0FBSyxDQUFDO3dCQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQzdDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtnQ0FDVixJQUFJLEdBQUcsQ0FBQyxDQUFDOzZCQUNaOzRCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3JCLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDbkQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dDQUNWLElBQUksR0FBRyxDQUFDLENBQUM7NkJBQ1o7NEJBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDckIsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDeEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dDQUNWLElBQUksR0FBRyxDQUFDLENBQUM7NkJBQ1o7eUJBQ0osTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7eUJBQzlCO3dCQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDN0M7d0JBQ0QsTUFBTTtvQkFDVixLQUFLLENBQUM7d0JBQ0YsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ2pDLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtnQ0FDVixJQUFJLEdBQUcsQ0FBQyxDQUFDOzZCQUNaO3lCQUNKLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQzdDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUM5Qjt3QkFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQzdDO3dCQUNELE1BQU07b0JBQ1YsS0FBSyxDQUFDO3dCQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQzdDLElBQUksR0FBRyxDQUFDLENBQUM7NEJBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDckI7d0JBQ0QsTUFBTTtvQkFDVixLQUFLLENBQUM7d0JBQ0YsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDNUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO2dDQUNWLElBQUksR0FBRyxDQUFDLENBQUM7NkJBQ1o7NEJBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDckI7d0JBQ0QsTUFBTTtvQkFDVixLQUFLLENBQUM7d0JBQ0YsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUM5Qjt3QkFDRCxNQUFNO29CQUNWLEtBQUssQ0FBQzt3QkFDRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFOzRCQUM3QyxJQUFJLEdBQUcsQ0FBQyxDQUFDO3lCQUNaO3dCQUNELE1BQU07b0JBQ1YsS0FBSyxDQUFDO3dCQUNGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7NEJBQy9DLElBQUksR0FBRyxDQUFDLENBQUM7eUJBQ1o7d0JBQ0QsTUFBTTtvQkFDVixLQUFLLENBQUM7d0JBQ0YsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7NEJBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUM3Qzt3QkFDRCxNQUFNO29CQUNWLEtBQUssQ0FBQzt3QkFDRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUU7NEJBQzFELElBQUksR0FBRyxFQUFFLENBQUM7eUJBQ2I7d0JBQ0QsTUFBTTtxQkFDVDtpQkFDSixRQUFRLENBQUMsS0FBSyxRQUFRLEVBQUU7YUFDNUIsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRTtnQkFDekMsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLEdBQUc7b0JBQ0MsUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1QixLQUFLLENBQUM7d0JBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUNULElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtnQ0FDVixJQUFJLEdBQUcsQ0FBQyxDQUFDOzZCQUNaOzRCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3JCLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7NEJBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUM3Qzt3QkFDRCxNQUFNO29CQUNWLEtBQUssQ0FBQzt3QkFDRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUM3QyxJQUFJLEdBQUcsQ0FBQyxDQUFDOzRCQUNULElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3JCO3dCQUNELE1BQU07b0JBQ1YsS0FBSyxDQUFDO3dCQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLEVBQUU7NEJBQ25ELElBQUksR0FBRyxFQUFFLENBQUM7eUJBQ2I7d0JBQ0QsTUFBTTtxQkFDVDtpQkFDSixRQUFRLENBQUMsS0FBSyxRQUFRLEVBQUU7YUFDNUIsTUFBTTtnQkFDSCxHQUFHO29CQUNDLFFBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDNUIsS0FBSyxDQUFDLENBQUM7b0JBQ1AsS0FBSyxDQUFDO3dCQUNGLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTs0QkFDVixJQUFJLEdBQUcsQ0FBQyxDQUFDO3lCQUNaO3dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLE1BQU07cUJBQ1Q7aUJBQ0osUUFBUSxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQ3pDLGFBQWE7O1lBRUQsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO2dCQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksR0FBRyxVQUFVLENBQUM7YUFDckI7QUFDYixZQUFZLEVBQUUsTUFBTSxDQUFDOztZQUVULElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsT0FBTyxRQUFRLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRTtnQkFDL0UsT0FBTyxNQUFNLENBQUM7YUFDakI7WUFDRCxJQUFJO2dCQUNBLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNyQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1dBQ0Y7QUFDWCxPQUFPOztJQUVILGVBQWUsRUFBRSxTQUFTLEtBQUssRUFBRSxHQUFHLEVBQUU7UUFDbEMsR0FBRztZQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVDLFFBQVEsS0FBSyxFQUFFLEtBQUssR0FBRyxFQUFFO0FBQ2xDLEtBQUs7O0lBRUQsU0FBUyxFQUFFLFNBQVMsS0FBSyxFQUFFO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQztBQUNULEtBQUs7O0lBRUQsb0JBQW9CLEVBQUUsU0FBUyxHQUFHLEVBQUUsTUFBTSxFQUFFO1FBQ3hDLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRTtZQUNYLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLENBQUM7YUFDWixNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMvQyxPQUFPLENBQUMsQ0FBQzthQUNaLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzFDLE9BQU8sQ0FBQyxDQUFDO2FBQ1o7U0FDSixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUM7U0FDWjtRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEIsS0FBSzs7SUFFRCxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN2QixRQUFRLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQzs7UUFFZCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDdkMsWUFBWSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOztZQUVqQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUc7Z0JBQ3hCLEVBQUUsSUFBSSxPQUFPLENBQUM7YUFDakI7WUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxNQUFNLENBQUM7QUFDdEIsS0FBSzs7QUFFTCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7OztBQ3BYOUIsWUFBWSxDQUFDOztBQUViLFNBQVMsU0FBUyxHQUFHO0NBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0NBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0NBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7O0FBRUQsU0FBUyxDQUFDLFNBQVMsR0FBRztBQUN0QixDQUFDLFdBQVcsRUFBRSxTQUFTOztDQUV0QixTQUFTLEVBQUUsV0FBVztFQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQ3ZDLEVBQUU7O0NBRUQsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztFQUUvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7RUFDcEMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDbEIsVUFBVSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O1VBRXZCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1VBQ2IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDYjtFQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsRUFBRTs7Q0FFRCxjQUFjLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzlCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLEVBQUU7O0NBRUQsU0FBUyxFQUFFLFdBQVc7RUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDOUMsRUFBRTs7SUFFRSxPQUFPLEVBQUUsV0FBVztRQUNoQixFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLEtBQUs7O0lBRUQsUUFBUSxFQUFFLFNBQVMsQ0FBQyxFQUFFO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUM1QixLQUFLOztBQUVMLENBQUMsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2xpYi9rb2FyYVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXNlZCA9IFtdLFxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5leHBvcnRzLkNoYXJTdHJlYW0gPSByZXF1aXJlKFwiLi9rb2FyYS9jaGFyc3RyZWFtXCIpO1xuZXhwb3J0cy5QYXJzZXIgPSByZXF1aXJlKFwiLi9rb2FyYS9wYXJzZXJcIik7XG5leHBvcnRzLlN0cmluZ1JlYWRlciA9IHJlcXVpcmUoXCIuL2tvYXJhL2lvL3N0cmluZ3JlYWRlclwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG52YXIgRG9jdW1lbnQgPSByZXF1aXJlKFwiLi9kb2N1bWVudFwiKTtcblxuZnVuY3Rpb24gQmxvY2tFbGVtZW50KCkge1xuICAgIE5vZGUuY2FsbCh0aGlzKTtcbn1cblxuQmxvY2tFbGVtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmxvY2tFbGVtZW50O1xuXG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmlzTmVzdGVkID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiAhKHRoaXMucGFyZW50LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiRG9jdW1lbnRcIik7XG59O1xuXG5CbG9ja0VsZW1lbnQucHJvdG90eXBlLmlzU2luZ2xlQ2hpbGQgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCA9PT0gMTtcbn07XG5cbkJsb2NrRWxlbWVudC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdEJsb2NrRWxlbWVudCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmxvY2tFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9ibG9ja2VsZW1lbnRcIik7XG5cbmZ1bmN0aW9uIEJsb2NrUXVvdGUoKSB7XG5cdEJsb2NrRWxlbWVudC5jYWxsKHRoaXMpO1xufVxuXG5CbG9ja1F1b3RlLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcbkJsb2NrUXVvdGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQmxvY2tRdW90ZTtcblxuQmxvY2tRdW90ZS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdEJsb2NrUXVvdGUodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2NrUXVvdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKFwiLi9ub2RlXCIpO1xuXG5mdW5jdGlvbiBDb2RlKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkNvZGUucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcbkNvZGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZTtcblxuQ29kZS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRDb2RlKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9ibG9ja2VsZW1lbnRcIik7XG5cbmZ1bmN0aW9uIENvZGVCbG9jaygpIHtcblx0QmxvY2tFbGVtZW50LmNhbGwodGhpcyk7XG59XG5cbkNvZGVCbG9jay5wcm90b3R5cGUgPSBuZXcgQmxvY2tFbGVtZW50KCk7XG5Db2RlQmxvY2sucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29kZUJsb2NrO1xuXG5Db2RlQmxvY2sucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0Q29kZUJsb2NrKHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2RlQmxvY2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIE5vZGUgPSByZXF1aXJlKFwiLi9ub2RlXCIpO1xuXG5mdW5jdGlvbiBEb2N1bWVudCgpIHtcbiAgICBOb2RlLmNhbGwodGhpcyk7XG59XG5cbkRvY3VtZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5Eb2N1bWVudC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEb2N1bWVudDtcbkRvY3VtZW50LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLnZpc2l0RG9jdW1lbnQodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gRW0oKSB7XG5cdE5vZGUuY2FsbCh0aGlzKTtcbn1cblxuRW0ucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcbkVtLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEVtO1xuXG5FbS5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRFbSh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJsb2NrRWxlbWVudCA9IHJlcXVpcmUoXCIuL2Jsb2NrZWxlbWVudFwiKTtcblxuZnVuY3Rpb24gSGVhZGluZygpIHtcblx0QmxvY2tFbGVtZW50LmNhbGwodGhpcyk7XG59XG5cbkhlYWRpbmcucHJvdG90eXBlID0gbmV3IEJsb2NrRWxlbWVudCgpO1xuSGVhZGluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBIZWFkaW5nO1xuXG5IZWFkaW5nLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuICAgIHJlbmRlcmVyLnZpc2l0SGVhZGluZyh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSGVhZGluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG5cbmZ1bmN0aW9uIEltYWdlKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkltYWdlLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5JbWFnZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbWFnZTtcblxuSW1hZ2UucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0SW1hZ2UodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gTGluZUJyZWFrKCkge31cbkxpbmVCcmVhay5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuTGluZUJyZWFrLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpbmVCcmVhaztcblxuTGluZUJyZWFrLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRyZW5kZXJlci52aXNpdExpbmVCcmVhayh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZUJyZWFrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gTGluaygpIHtcblx0Tm9kZS5jYWxsKHRoaXMpO1xufVxuXG5MaW5rLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5MaW5rLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExpbms7XG5cbkxpbmsucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0TGluayh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgQmxvY2tFbGVtZW50ID0gcmVxdWlyZShcIi4vYmxvY2tlbGVtZW50XCIpO1xuXG5mdW5jdGlvbiBMaXN0QmxvY2sob3JkZXJlZCkge1xuXHRCbG9ja0VsZW1lbnQuY2FsbCh0aGlzKTtcblx0dGhpcy5vcmRlcmVkID0gb3JkZXJlZDtcbn1cblxuTGlzdEJsb2NrLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcbkxpc3RCbG9jay5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaXN0QmxvY2s7XG5cbkxpc3RCbG9jay5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRMaXN0QmxvY2sodGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RCbG9jaztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgTm9kZSA9IHJlcXVpcmUoXCIuL25vZGVcIik7XG5cbmZ1bmN0aW9uIExpc3RJdGVtKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cbkxpc3RJdGVtLnByb3RvdHlwZSA9IG5ldyBOb2RlKCk7XG5MaXN0SXRlbS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaXN0SXRlbTtcblxuTGlzdEl0ZW0ucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHJlbmRlcmVyKSB7XG5cdHJlbmRlcmVyLnZpc2l0TGlzdEl0ZW0odGhpcyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RJdGVtO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIE5vZGUoKSB7XG5cdHRoaXMuY2hpbGRyZW4gPSBbXTtcbn1cblxuTm9kZS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBOb2RlLFxuXG5cdGFkZDogZnVuY3Rpb24obiwgaSkge1xuXHRcdHRoaXMuY2hpbGRyZW5baV0gPSBuO1xuXHR9LFxuXG5cdGNoaWxkcmVuQWNjZXB0OiBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5jaGlsZHJlbltpXS5hY2NlcHQocmVuZGVyZXIpO1xuXHRcdH1cblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIEJsb2NrRWxlbWVudCA9IHJlcXVpcmUoXCIuL2Jsb2NrZWxlbWVudFwiKTtcblxuZnVuY3Rpb24gUGFyYWdyYXBoKCkge1xuXHRCbG9ja0VsZW1lbnQuY2FsbCh0aGlzKTtcbn1cblxuUGFyYWdyYXBoLnByb3RvdHlwZSA9IG5ldyBCbG9ja0VsZW1lbnQoKTtcblBhcmFncmFwaC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQYXJhZ3JhcGg7XG5cblBhcmFncmFwaC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcbiAgICByZW5kZXJlci52aXNpdFBhcmFncmFwaCh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyYWdyYXBoO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gU3Ryb25nKCkge1xuXHROb2RlLmNhbGwodGhpcyk7XG59XG5cblN0cm9uZy5wcm90b3R5cGUgPSBuZXcgTm9kZSgpO1xuU3Ryb25nLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN0cm9uZztcblxuU3Ryb25nLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbihyZW5kZXJlcikge1xuXHRyZW5kZXJlci52aXNpdFN0cm9uZyh0aGlzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3Ryb25nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBOb2RlID0gcmVxdWlyZShcIi4vbm9kZVwiKTtcblxuZnVuY3Rpb24gVGV4dCgpIHtcbiAgICBOb2RlLmNhbGwodGhpcyk7XG59XG5cblRleHQucHJvdG90eXBlID0gbmV3IE5vZGUoKTtcblRleHQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGV4dDtcblxuVGV4dC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24ocmVuZGVyZXIpIHtcblx0cmVuZGVyZXIudmlzaXRUZXh0KHRoaXMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIENoYXJTdHJlYW0ocmVhZGVyKSB7XG5cdHRoaXMuYXZhaWxhYmxlID0gNDA5Njtcblx0dGhpcy5idWZzaXplID0gNDA5Njtcblx0dGhpcy50b2tlbkJlZ2luID0gMDtcblx0dGhpcy5idWZjb2x1bW4gPSBbXTtcblx0dGhpcy5idWZwb3MgPSAtMTtcblx0dGhpcy5idWZsaW5lID0gW107XG5cdHRoaXMuY29sdW1uID0gMDtcblx0dGhpcy5saW5lID0gMTtcblx0dGhpcy5wcmV2Q2hhcklzTEYgPSBmYWxzZTtcblx0dGhpcy5yZWFkZXIgPSByZWFkZXI7XG5cdHRoaXMuYnVmZmVyID0gW107XG5cdHRoaXMubWF4TmV4dENoYXJJbmQgPSAwO1xuXHR0aGlzLmluQnVmID0gMDtcblx0dGhpcy50YWJTaXplID0gNDtcbn1cblxuQ2hhclN0cmVhbS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBDaGFyU3RyZWFtLFxuXG5cdGJlZ2luVG9rZW46IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMudG9rZW5CZWdpbiA9IC0xO1xuXHRcdHZhciBjID0gdGhpcy5yZWFkQ2hhcigpO1xuXG5cdFx0dGhpcy50b2tlbkJlZ2luID0gdGhpcy5idWZwb3M7XG5cdFx0cmV0dXJuIGM7XG5cdH0sXG5cblx0cmVhZENoYXI6IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGlzLmluQnVmID4gMCkge1xuXHRcdFx0LS10aGlzLmluQnVmO1xuXHRcdFx0aWYgKCsrdGhpcy5idWZwb3MgPT09IHRoaXMuYnVmc2l6ZSkge1xuXHRcdFx0XHR0aGlzLmJ1ZnBvcyA9IDA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5idWZmZXJbdGhpcy5idWZwb3NdO1xuXHRcdH1cblx0XHRpZiAoKyt0aGlzLmJ1ZnBvcyA+PSB0aGlzLm1heE5leHRDaGFySW5kKSB7XG5cdFx0XHR0aGlzLmZpbGxCdWZmKCk7XG5cdFx0fVxuXG5cdFx0dmFyIGMgPSB0aGlzLmJ1ZmZlclt0aGlzLmJ1ZnBvc107XG5cblx0XHR0aGlzLnVwZGF0ZUxpbmVDb2x1bW4oYyk7XG5cdFx0cmV0dXJuIGM7XG5cdH0sXG5cblx0ZmlsbEJ1ZmY6IGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aGlzLm1heE5leHRDaGFySW5kID09PSB0aGlzLmF2YWlsYWJsZSkge1xuXHRcdFx0aWYgKHRoaXMuYXZhaWxhYmxlID09PSB0aGlzLmJ1ZnNpemUpIHtcblx0XHRcdFx0dGhpcy5idWZwb3MgPSAwO1xuXHRcdFx0XHR0aGlzLm1heE5leHRDaGFySW5kID0gMDtcblx0XHRcdFx0aWYgKHRoaXMudG9rZW5CZWdpbiA+IDIwNDgpIHtcblx0XHRcdFx0XHR0aGlzLmF2YWlsYWJsZSA9IHRoaXMudG9rZW5CZWdpbjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hdmFpbGFibGUgPSB0aGlzLmJ1ZnNpemU7XG5cdFx0XHR9XG5cdFx0fVxuICAgICAgICB2YXIgaSA9IDA7XG5cblx0XHR0cnkge1xuXHRcdFx0aWYgKChpID0gdGhpcy5yZWFkZXIucmVhZCh0aGlzLmJ1ZmZlciwgdGhpcy5tYXhOZXh0Q2hhckluZCwgdGhpcy5hdmFpbGFibGUgLSB0aGlzLm1heE5leHRDaGFySW5kKSkgPT09IC0xKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIklPRXhjZXB0aW9uXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5tYXhOZXh0Q2hhckluZCArPSBpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC0tdGhpcy5idWZwb3M7XG5cdFx0XHR0aGlzLmJhY2t1cCgwKTtcblx0XHRcdGlmICh0aGlzLnRva2VuQmVnaW4gPT09IC0xKSB7XG5cdFx0XHRcdHRoaXMudG9rZW5CZWdpbiA9IHRoaXMuYnVmcG9zO1xuXHRcdFx0fVxuXHRcdFx0dGhyb3cgZTtcblx0XHR9XG5cdH0sXG5cblx0YmFja3VwOiBmdW5jdGlvbihhbW91bnQpIHtcblx0XHR0aGlzLmluQnVmICs9IGFtb3VudDtcblx0XHRpZiAoKHRoaXMuYnVmcG9zIC09IGFtb3VudCkgPCAwKSB7XG5cdFx0XHR0aGlzLmJ1ZnBvcyArPSB0aGlzLmJ1ZnNpemU7XG5cdFx0fVxuXHR9LFxuXG5cdHVwZGF0ZUxpbmVDb2x1bW46IGZ1bmN0aW9uKGMpIHtcblx0XHR0aGlzLmNvbHVtbisrO1xuXHRcdGlmICh0aGlzLnByZXZDaGFySXNMRikge1xuXHRcdFx0dGhpcy5wcmV2Q2hhcklzTEYgPSBmYWxzZTtcblx0XHRcdHRoaXMuY29sdW1uID0gMTtcblx0XHRcdHRoaXMubGluZSArPSB0aGlzLmNvbHVtbjtcblx0XHR9XG5cblx0XHRzd2l0Y2ggKGMpIHtcblx0XHRjYXNlIFwiXFxuXCI6XG5cdFx0XHR0aGlzLnByZXZDaGFySXNMRiA9IHRydWU7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiXFx0XCI6XG5cdFx0XHR0aGlzLmNvbHVtbi0tO1xuXHRcdFx0dGhpcy5jb2x1bW4gKz0gdGhpcy50YWJTaXplIC0gdGhpcy5jb2x1bW4gJSB0aGlzLnRhYlNpemU7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHRcdHRoaXMuYnVmbGluZVt0aGlzLmJ1ZnBvc10gPSB0aGlzLmxpbmU7XG5cdFx0dGhpcy5idWZjb2x1bW5bdGhpcy5idWZwb3NdID0gdGhpcy5jb2x1bW47XG5cdH0sXG5cblx0Z2V0SW1hZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKHRoaXMuYnVmcG9zID49IHRoaXMudG9rZW5CZWdpbikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5idWZmZXIuc2xpY2UodGhpcy50b2tlbkJlZ2luLCB0aGlzLmJ1ZnBvcyArIDEpLmpvaW4oXCJcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcy5idWZmZXIuc2xpY2UodGhpcy50b2tlbkJlZ2luLCB0aGlzLmJ1ZnNpemUpLmpvaW4oXCJcIikgK1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnNsaWNlKDAsIHRoaXMuYnVmcG9zICsgMSkuam9pbihcIlwiKTtcblx0fSxcblxuXHRnZXRFbmRDb2x1bW46IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnRva2VuQmVnaW4gaW4gdGhpcy5idWZjb2x1bW4gPyB0aGlzLmJ1ZmNvbHVtblt0aGlzLmJ1ZnBvc10gOiAwO1xuXHR9LFxuXG5cdGdldEVuZExpbmU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnRva2VuQmVnaW4gaW4gdGhpcy5idWZsaW5lID8gdGhpcy5idWZsaW5lW3RoaXMuYnVmcG9zXSA6IDA7XG5cdH0sXG5cblx0Z2V0QmVnaW5Db2x1bW46IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmJ1ZnBvcyBpbiB0aGlzLmJ1ZmNvbHVtbiA/IHRoaXMuYnVmY29sdW1uW3RoaXMudG9rZW5CZWdpbl0gOiAwO1xuXHR9LFxuXG5cdGdldEJlZ2luTGluZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMuYnVmcG9zIGluIHRoaXMuYnVmbGluZSA/IHRoaXMuYnVmbGluZVt0aGlzLnRva2VuQmVnaW5dIDogMDtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJTdHJlYW07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gU3RyaW5nUmVhZGVyKHRleHQpIHtcblx0dGhpcy5pbmRleCA9IDA7XG5cdHRoaXMudGV4dCA9IHRleHQ7XG59XG5cblN0cmluZ1JlYWRlci5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBTdHJpbmdSZWFkZXIsXG5cblx0cmVhZDogZnVuY3Rpb24oYnVmZmVyLCBvZmZzZXQsIGxlbmd0aCkge1xuXHRcdGlmICh0aGlzLnRleHQudG9TdHJpbmcoKS5zdWJzdHJpbmcodGhpcy5pbmRleCkubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIGNoYXJhY3RlcnNSZWFkID0gMDtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgc3RhcnQgPSB0aGlzLmluZGV4ICsgaTtcblx0XHRcdFx0dmFyIGMgPSB0aGlzLnRleHQudG9TdHJpbmcoKS5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0ICsgMSk7XG5cblx0XHRcdFx0aWYgKGMgIT09IFwiXCIpIHtcblx0XHRcdFx0XHRidWZmZXJbb2Zmc2V0ICsgaV0gPSBjO1xuXHRcdFx0XHRcdGNoYXJhY3RlcnNSZWFkKys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuaW5kZXggKz0gbGVuZ3RoO1xuXHRcdFx0cmV0dXJuIGNoYXJhY3RlcnNSZWFkO1xuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyaW5nUmVhZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIExvb2thaGVhZFN1Y2Nlc3MoKSB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvb2thaGVhZFN1Y2Nlc3M7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIExvb2thaGVhZFN1Y2Nlc3MgPSByZXF1aXJlKFwiLi9sb29rYWhlYWRzdWNjZXNzXCIpO1xudmFyIFN0cmluZ1JlYWRlciA9IHJlcXVpcmUoXCIuL2lvL3N0cmluZ3JlYWRlclwiKTtcbnZhciBDaGFyU3RyZWFtID0gcmVxdWlyZShcIi4vY2hhcnN0cmVhbVwiKTtcbnZhciBUb2tlbk1hbmFnZXIgPSByZXF1aXJlKFwiLi90b2tlbm1hbmFnZXJcIik7XG52YXIgVG9rZW4gPSByZXF1aXJlKFwiLi90b2tlblwiKTtcbnZhciBUcmVlU3RhdGUgPSByZXF1aXJlKFwiLi90cmVlc3RhdGVcIik7XG5cbnZhciBEb2N1bWVudCA9IHJlcXVpcmUoXCIuL2FzdC9kb2N1bWVudFwiKTtcbnZhciBCbG9ja0VsZW1lbnQgPSByZXF1aXJlKFwiLi9hc3QvYmxvY2tlbGVtZW50XCIpO1xudmFyIEJsb2NrUXVvdGUgPSByZXF1aXJlKFwiLi9hc3QvYmxvY2txdW90ZVwiKTtcbnZhciBDb2RlID0gcmVxdWlyZShcIi4vYXN0L2NvZGVcIik7XG52YXIgQ29kZUJsb2NrID0gcmVxdWlyZShcIi4vYXN0L2NvZGVibG9ja1wiKTtcbnZhciBFbSA9IHJlcXVpcmUoXCIuL2FzdC9lbVwiKTtcbnZhciBIZWFkaW5nID0gcmVxdWlyZShcIi4vYXN0L2hlYWRpbmdcIik7XG52YXIgSW1hZ2UgPSByZXF1aXJlKFwiLi9hc3QvaW1hZ2VcIik7XG52YXIgTGluZUJyZWFrID0gcmVxdWlyZShcIi4vYXN0L2xpbmVicmVha1wiKTtcbnZhciBMaW5rID0gcmVxdWlyZShcIi4vYXN0L2xpbmtcIik7XG52YXIgTGlzdEJsb2NrID0gcmVxdWlyZShcIi4vYXN0L2xpc3RibG9ja1wiKTtcbnZhciBMaXN0SXRlbSA9IHJlcXVpcmUoXCIuL2FzdC9saXN0aXRlbVwiKTtcbnZhciBQYXJhZ3JhcGggPSByZXF1aXJlKFwiLi9hc3QvcGFyYWdyYXBoXCIpO1xudmFyIFN0cm9uZyA9IHJlcXVpcmUoXCIuL2FzdC9zdHJvbmdcIik7XG52YXIgVGV4dCA9IHJlcXVpcmUoXCIuL2FzdC90ZXh0XCIpO1xuXG5mdW5jdGlvbiBQYXJzZXIoKSB7XG5cdHRoaXMubG9va0FoZWFkU3VjY2VzcyA9IG5ldyBMb29rYWhlYWRTdWNjZXNzKCk7XG5cdHRoaXMubW9kdWxlcyA9IFtcInBhcmFncmFwaHNcIiwgXCJoZWFkaW5nc1wiLCBcImxpc3RzXCIsIFwibGlua3NcIiwgXCJpbWFnZXNcIiwgXCJmb3JtYXR0aW5nXCIsIFwiYmxvY2txdW90ZXNcIiwgXCJjb2RlXCJdO1xuXHR0aGlzLmN1cnJlbnRCbG9ja0xldmVsID0gMDtcblx0dGhpcy5jdXJyZW50UXVvdGVMZXZlbCA9IDA7XG59XG5cblBhcnNlci5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBQYXJzZXIsXG5cblx0cGFyc2U6IGZ1bmN0aW9uKHRleHQpIHtcblx0XHRyZXR1cm4gdGhpcy5wYXJzZVJlYWRlcihuZXcgU3RyaW5nUmVhZGVyKHRleHQpKTtcblx0fSxcblxuXHRwYXJzZVJlYWRlcjogZnVuY3Rpb24ocmVhZGVyKSB7XG5cdFx0dGhpcy5jcyA9IG5ldyBDaGFyU3RyZWFtKHJlYWRlcik7XG5cdFx0dGhpcy50bSA9IG5ldyBUb2tlbk1hbmFnZXIodGhpcy5jcyk7XG5cdFx0dGhpcy50b2tlbiA9IG5ldyBUb2tlbigpO1xuXHRcdHRoaXMudHJlZSA9IG5ldyBUcmVlU3RhdGUoKTtcblx0XHR0aGlzLm5leHRUb2tlbktpbmQgPSAtMTtcblxuXHRcdHZhciBkb2N1bWVudCA9IG5ldyBEb2N1bWVudCgpO1xuXG5cdFx0dGhpcy50cmVlLm9wZW5TY29wZSgpO1xuXG5cdFx0d2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuXHRcdFx0dGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuXHRcdH1cblx0XHR0aGlzLndoaXRlU3BhY2UoKTtcblx0XHRpZiAodGhpcy5oYXNBbnlCbG9ja0VsZW1lbnRzQWhlYWQoKSkge1xuXHRcdFx0dGhpcy5ibG9ja0VsZW1lbnQoKTtcblx0XHRcdHdoaWxlICh0aGlzLmJsb2NrQWhlYWQoMCkpIHtcblx0XHRcdFx0d2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuXHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0YpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShkb2N1bWVudCk7XG4gICAgICAgIHJldHVybiBkb2N1bWVudDtcblx0fSxcblxuXHRibG9ja0VsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRCbG9ja0xldmVsKys7XG4gICAgICAgIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImhlYWRpbmdzXCIpID49IDAgJiYgdGhpcy5oZWFkaW5nQWhlYWQoMSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImJsb2NrcXVvdGVzXCIpID49IDAgJiYgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uR1QpIHtcbiAgICAgICAgICB0aGlzLmJsb2NrUXVvdGUoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpc3RzXCIpID49IDAgJiYgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uREFTSCkge1xuICAgICAgICAgIHRoaXMudW5vcmRlcmVkTGlzdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlzdHNcIikgPj0gMCAmJiB0aGlzLmhhc09yZGVyZWRMaXN0QWhlYWQoKSkge1xuICAgICAgICAgIHRoaXMub3JkZXJlZExpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0ZlbmNlZENvZGVCbG9ja0FoZWFkKCkpIHtcbiAgICAgICAgICB0aGlzLmZlbmNlZENvZGVCbG9jaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFyYWdyYXBoKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50QmxvY2tMZXZlbC0tO1xuXHR9LFxuXG4gICAgaGVhZGluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoZWFkaW5nID0gbmV3IEhlYWRpbmcoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHZhciBoZWFkaW5nTGV2ZWwgPSAwO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FUSkge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FUSk7XG4gICAgICAgICAgICBoZWFkaW5nTGV2ZWwrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgd2hpbGUgKHRoaXMuaGVhZGluZ0hhc0lubGluZUVsZW1lbnRzQWhlYWQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNTdHJvbmdBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNFbUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29zZUNoYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaGVhZGluZy52YWx1ZSA9IGhlYWRpbmdMZXZlbDtcbiAgICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShoZWFkaW5nKTtcbiAgICB9LFxuXG4gICAgYmxvY2tRdW90ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBibG9ja1F1b3RlID0gbmV3IEJsb2NrUXVvdGUoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFF1b3RlTGV2ZWwrKztcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmJsb2NrUXVvdGVIYXNFbXB0eUxpbmVBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrUXVvdGVFbXB0eUxpbmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgaWYgKHRoaXMuYmxvY2tRdW90ZUhhc0FueUJsb2NrRWxlbWVudHNlQWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmJsb2NrQWhlYWQoMCkpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tRdW90ZVByZWZpeCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrRWxlbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0aGlzLmhhc0Jsb2NrUXVvdGVFbXB0eUxpbmVzQWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlRW1wdHlMaW5lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50UXVvdGVMZXZlbC0tO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShibG9ja1F1b3RlKTtcbiAgICAgIH0sXG5cbiAgICAgIGJsb2NrUXVvdGVQcmVmaXg6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSA9IDA7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCk7XG4gICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgfSB3aGlsZSAoKytpIDwgdGhpcy5jdXJyZW50UXVvdGVMZXZlbCk7XG4gICAgICB9LFxuXG4gICAgICBibG9ja1F1b3RlRW1wdHlMaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKTtcbiAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgfSB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uR1QpO1xuICAgICAgfSxcblxuICAgICAgdW5vcmRlcmVkTGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGxpc3QgPSBuZXcgTGlzdEJsb2NrKGZhbHNlKTtcblxuICAgICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgICB2YXIgbGlzdEJlZ2luQ29sdW1uID0gdGhpcy51bm9yZGVyZWRMaXN0SXRlbSgpO1xuXG4gICAgICAgICAgd2hpbGUgKHRoaXMubGlzdEl0ZW1BaGVhZChsaXN0QmVnaW5Db2x1bW4sIGZhbHNlKSkge1xuICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdW90ZUxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy51bm9yZGVyZWRMaXN0SXRlbSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaXN0KTtcbiAgICAgIH0sXG5cbiAgICAgIHVub3JkZXJlZExpc3RJdGVtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgbGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0oKTtcblxuICAgICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcblxuICAgICAgICAgIHZhciB0ID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5EQVNIKTtcblxuICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgIGlmICh0aGlzLmxpc3RJdGVtSGFzSW5saW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICB0aGlzLmJsb2NrRWxlbWVudCgpO1xuICAgICAgICAgICAgICB3aGlsZSAodGhpcy5ibG9ja0FoZWFkKHQuYmVnaW5Db2x1bW4pKSB7XG4gICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaXN0SXRlbSk7XG4gICAgICAgICAgcmV0dXJuIHQuYmVnaW5Db2x1bW47XG4gICAgICB9LFxuXG4gICAgICBvcmRlcmVkTGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaXN0ID0gbmV3IExpc3RCbG9jayh0cnVlKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHZhciBsaXN0QmVnaW5Db2x1bW4gPSB0aGlzLm9yZGVyZWRMaXN0SXRlbSgpO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLmxpc3RJdGVtQWhlYWQobGlzdEJlZ2luQ29sdW1uLCB0cnVlKSkge1xuICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9yZGVyZWRMaXN0SXRlbSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGxpc3QpO1xuICAgIH0sXG5cbiAgICBvcmRlcmVkTGlzdEl0ZW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0oKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHZhciB0ID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpO1xuXG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKTtcbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIGlmICh0aGlzLmxpc3RJdGVtSGFzSW5saW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmJsb2NrQWhlYWQodC5iZWdpbkNvbHVtbikpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRRdW90ZUxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ibG9ja1F1b3RlUHJlZml4KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ibG9ja0VsZW1lbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsaXN0SXRlbS5udW1iZXIgPSB0LmltYWdlO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaXN0SXRlbSk7XG4gICAgICAgIHJldHVybiB0LmJlZ2luQ29sdW1uO1xuICAgIH0sXG5cbiAgICBmZW5jZWRDb2RlQmxvY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29kZUJsb2NrID0gbmV3IENvZGVCbG9jaygpO1xuICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB2YXIgYmVnaW5Db2x1bW4gPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5iZWdpbkNvbHVtbjtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgfSB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uQkFDS1RJQ0spO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkge1xuICAgICAgICAgICAgICAgIGNvZGVCbG9jay5sYW5ndWFnZSA9IHRoaXMuY29kZUxhbmd1YWdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgIT09IHRoaXMudG0uRU9GICYmICF0aGlzLmZlbmNlc0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVPTCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZXZlbFdoaXRlU3BhY2UoYmVnaW5Db2x1bW4pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgIT09IHRoaXMudG0uRU9GICYmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSAhPT0gdGhpcy50bS5FT0wgfHwgIXRoaXMuZmVuY2VzQWhlYWQoKSkpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DSEFSX1NFUVVFTkNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DT0xPTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uREFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVEpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uSU1BR0VfTEFCRUwpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFBBUkVOKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLkVPTCwgdGhpcy50bS5FT0ZdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uU1BBQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5UQUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIiAgICBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5mZW5jZXNBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCJcXG5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxldmVsV2hpdGVTcGFjZShiZWdpbkNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmVuY2VzQWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uQkFDS1RJQ0spIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb2RlQmxvY2sudmFsdWUgPSBzLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGNvZGVCbG9jayk7XG4gICAgfSxcblxuICAgIHBhcmFncmFwaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYXJhZ3JhcGggPSB0aGlzLm1vZHVsZXMuaW5kZXhPZihcInBhcmFncmFwaHNcIikgPj0gMCA/IG5ldyBQYXJhZ3JhcGgoKSA6IG5ldyBCbG9ja0VsZW1lbnQoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuaW5saW5lKCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVCcmVhaygpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJibG9ja3F1b3Rlc1wiKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlubGluZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHBhcmFncmFwaCk7XG4gICAgfSxcblxuICAgIHRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGV4dCA9IG5ldyBUZXh0KCk7XG4gICAgICAgIHZhciBzID0gXCJcIjtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRIYXNUb2tlbnNBaGVhZCgpKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ0hBUl9TRVFVRU5DRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1NMQVNIOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNPTE9OOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DT0xPTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uREFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uREFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRElHSVRTOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRPVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FUTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVEpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVTQ0FQRURfQ0hBUjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKS5pbWFnZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uR1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5JTUFHRV9MQUJFTDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uSU1BR0VfTEFCRUwpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxQQVJFTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFBBUkVOKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFQpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUkJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5FT0wsIHRoaXMudG0uRU9GXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uU1BBQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uU1BBQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5UQUI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlRBQik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzICs9IFwiICAgIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0ZXh0LnZhbHVlID0gcztcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUodGV4dCk7XG4gICAgfSxcblxuICAgIGltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHZhciByZWYgPSBcIlwiO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spO1xuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCk7XG4gICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICB3aGlsZSAodGhpcy5pbWFnZUhhc0FueUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZVRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29zZUNoYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spO1xuICAgICAgICBpZiAodGhpcy5oYXNSZXNvdXJjZVVybEFoZWFkKCkpIHtcbiAgICAgICAgICAgIHJlZiA9IHRoaXMucmVzb3VyY2VVcmwoKTtcbiAgICAgICAgfVxuICAgICAgICBpbWFnZS52YWx1ZSA9IHJlZjtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoaW1hZ2UpO1xuICAgIH0sXG5cbiAgICBsaW5rOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxpbmsgPSBuZXcgTGluaygpO1xuICAgICAgICB2YXIgcmVmID0gXCJcIjtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKTtcbiAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmxpbmtIYXNBbnlFbGVtZW50cygpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNTdHJvbmdBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5oYXNFbUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNSZXNvdXJjZVRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvdXJjZVRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb29zZUNoYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SQlJBQ0spO1xuICAgICAgICBpZiAodGhpcy5oYXNSZXNvdXJjZVVybEFoZWFkKCkpIHtcbiAgICAgICAgICAgIHJlZiA9IHRoaXMucmVzb3VyY2VVcmwoKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5rLnZhbHVlID0gcmVmO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaW5rKTtcbiAgICB9LFxuXG4gICAgc3Ryb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0cm9uZyA9IG5ldyBTdHJvbmcoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICB3aGlsZSAodGhpcy5zdHJvbmdIYXNFbGVtZW50cygpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0cm9uZ0VtV2l0aGluU3Ryb25nQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1XaXRoaW5TdHJvbmcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5VTkRFUlNDT1JFOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoc3Ryb25nKTtcbiAgICB9LFxuXG4gICAgZW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW0gPSBuZXcgRW0oKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgIHdoaWxlICh0aGlzLmVtSGFzRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlua3NcIikgPj0gMCAmJiB0aGlzLmhhc0xpbmtBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbUhhc1N0cm9uZ1dpdGhpbkVtKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cm9uZ1dpdGhpbkVtKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShlbSk7XG4gICAgfSxcblxuICAgIGNvZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29kZSA9IG5ldyBDb2RlKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgdGhpcy5jb2RlVGV4dCgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoY29kZSk7XG4gICAgfSxcblxuICAgIGNvZGVUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRleHQgPSBuZXcgVGV4dCgpO1xuICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DSEFSX1NFUVVFTkNFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFQpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubmV4dEFmdGVyU3BhY2UoW3RoaXMudG0uRU9MLCB0aGlzLnRtLkVPRl0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlNQQUNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlNQQUNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVEFCOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5UQUIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcyArPSBcIiAgICBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLmNvZGVUZXh0SGFzQW55VG9rZW5BaGVhZCgpKTtcbiAgICAgICAgdGV4dC52YWx1ZSA9IHM7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHRleHQpO1xuICAgIH0sXG5cbiAgIGxvb3NlQ2hhcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gbmV3IFRleHQoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgY2FzZSB0aGlzLnRtLkFTVEVSSVNLOlxuICAgICAgICAgICAgdGV4dC52YWx1ZSA9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spLmltYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5pbWFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgdGV4dC52YWx1ZSA9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgIHRleHQudmFsdWUgPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUodGV4dCk7XG4gICAgfSxcblxuICAgIGxpbmVCcmVhazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsaW5lYnJlYWsgPSBuZXcgTGluZUJyZWFrKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uU1BBQ0UgfHwgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLmdldE5leHRUb2tlbktpbmQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5FT0wpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShsaW5lYnJlYWspO1xuICAgIH0sXG5cbiAgICBsZXZlbFdoaXRlU3BhY2U6IGZ1bmN0aW9uKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3VycmVudFBvcyA9IDE7XG5cbiAgICAgICAgd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLmdldE5leHRUb2tlbktpbmQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKCh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5TUEFDRSB8fCB0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5UQUIpICYmIGN1cnJlbnRQb3MgPCB0aHJlc2hvbGQgLSAxKSB7XG4gICAgICAgICAgICBjdXJyZW50UG9zID0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpLmJlZ2luQ29sdW1uO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvZGVMYW5ndWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzID0gXCJcIjtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQ0hBUl9TRVFVRU5DRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLU0xBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTFQpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkdUOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5HVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlJCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uUkJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uUlBBUkVOOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlNQQUNFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uVEFCOlxuICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpICE9PSB0aGlzLnRtLkVPTCAmJiB0aGlzLmdldE5leHRUb2tlbktpbmQoKSAhPT0gdGhpcy50bS5FT0YpO1xuICAgICAgICAgIHJldHVybiBzO1xuICAgICAgfSxcblxuICAgICAgaW5saW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNJbmxpbmVUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImZvcm1hdHRpbmdcIikgPj0gMCAmJiB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQVNURVJJU0spKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmdNdWx0aWxpbmUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJmb3JtYXR0aW5nXCIpID49IDAgJiYgdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLlVOREVSU0NPUkUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlTXVsdGlsaW5lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9vc2VDaGFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAodGhpcy5oYXNJbmxpbmVFbGVtZW50QWhlYWQoKSk7XG4gICAgICB9LFxuXG4gICAgICByZXNvdXJjZVRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgICB2YXIgdGV4dCA9IG5ldyBUZXh0KCk7XG4gICAgICAgICAgdmFyIHMgPSBcIlwiO1xuXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNIQVJfU0VRVUVOQ0U6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DT0xPTjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQ09MT04pLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRBU0g6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRBU0gpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRJR0lUUzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRElHSVRTKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5ET1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkRPVCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRVE6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVRKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FU0NBUEVEX0NIQVI6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikuaW1hZ2Uuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLklNQUdFX0xBQkVMOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5JTUFHRV9MQUJFTCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uR1Q6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5SQlJBQ0tdKSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5TUEFDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlRBQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5yZXNvdXJjZUhhc0VsZW1lbnRBaGVhZCgpKTtcbiAgICAgICAgdGV4dC52YWx1ZSA9IHM7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHRleHQpO1xuICAgICAgfSxcblxuICAgICAgcmVzb3VyY2VVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTik7XG4gICAgICAgIHRoaXMud2hpdGVTcGFjZSgpO1xuICAgICAgICB2YXIgcmVmID0gdGhpcy5yZXNvdXJjZVVybFRleHQoKTtcblxuICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5SUEFSRU4pO1xuICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgfSxcblxuICAgICAgcmVzb3VyY2VVcmxUZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcyA9IFwiXCI7XG5cbiAgICAgICAgICB3aGlsZSAodGhpcy5yZXNvdXJjZVRleHRIYXNFbGVtZW50c0FoZWFkKCkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5DSEFSX1NFUVVFTkNFOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tTTEFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1NMQVNIKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkNPTE9OOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5DT0xPTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uREFTSDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uREFTSCkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uRElHSVRTOlxuICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5ESUdJVFMpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkRPVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRE9UKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5FUTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVEpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkVTQ0FQRURfQ0hBUjpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKS5pbWFnZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uSU1BR0VfTEFCRUw6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5HVDpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uR1QpLmltYWdlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MUEFSRU46XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxQQVJFTikuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uTFQ6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxUKS5pbWFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgdGhpcy50bS5SQlJBQ0s6XG4gICAgICAgICAgICAgICAgcyArPSB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlJCUkFDSykuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgICAgICBzICs9IHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5SUEFSRU5dKSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5TUEFDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5TUEFDRSkuaW1hZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlRBQjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVEFCKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgKz0gXCIgICAgXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9LFxuXG4gICAgICBzdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzdHJvbmcgPSBuZXcgU3Ryb25nKCk7XG5cbiAgICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgICAgdGhpcy5zdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgICAgd2hpbGUgKHRoaXMudGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgICAgdGhpcy5zdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHN0cm9uZyk7XG4gICAgICB9LFxuXG4gICAgICBzdHJvbmdNdWx0aWxpbmVDb250ZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVGV4dEFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaW5rc1wiKSA+PSAwICYmIHRoaXMuaGFzTGlua0FoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpbmsoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJjb2RlXCIpID49IDAgJiYgdGhpcy5oYXNDb2RlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29kZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0VtV2l0aGluU3Ryb25nTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtV2l0aGluU3Ryb25nTXVsdGlsaW5lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3Ryb25nTXVsdGlsaW5lSGFzRWxlbWVudHNBaGVhZCgpKTtcbiAgICAgIH0sXG5cbiAgICAgIHN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0cm9uZyA9IG5ldyBTdHJvbmcoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICB0aGlzLnN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgIHRoaXMuc3Ryb25nV2l0aGluRW1NdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHN0cm9uZyk7XG4gICAgICB9LFxuXG4gICAgICBzdHJvbmdXaXRoaW5FbU11bHRpbGluZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uVU5ERVJTQ09SRTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuc3Ryb25nV2l0aGluRW1NdWx0aWxpbmVIYXNFbGVtZW50c0FoZWFkKCkpO1xuICAgICAgfSxcblxuICAgICAgc3Ryb25nV2l0aGluRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3Ryb25nID0gbmV3IFN0cm9uZygpO1xuXG4gICAgICAgIHRoaXMudHJlZS5vcGVuU2NvcGUoKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICB0aGlzLnRleHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJpbWFnZXNcIikgPj0gMCAmJiB0aGlzLmhhc0ltYWdlQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgIHRoaXMuY29kZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLlVOREVSU0NPUkU6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLnN0cm9uZ1dpdGhpbkVtSGFzRWxlbWVudHNBaGVhZCgpKTtcbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKHN0cm9uZyk7XG4gICAgfSxcblxuICAgIGVtTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVtID0gbmV3IEVtKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLmVtTXVsdGlsaW5lQ29udGVudCgpO1xuICAgICAgICB3aGlsZSAodGhpcy50ZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5saW5lQnJlYWsoKTtcbiAgICAgICAgICAgIHRoaXMuZW1NdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoZW0pO1xuICAgIH0sXG5cbiAgICBlbU11bHRpbGluZUNvbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlTXVsdGlsaW5lKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJvbmdXaXRoaW5FbU11bHRpbGluZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkFTVEVSSVNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5BU1RFUklTSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQkFDS1RJQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5MQlJBQ0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkxCUkFDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKHRoaXMuZW1NdWx0aWxpbmVDb250ZW50SGFzRWxlbWVudHNBaGVhZCgpKTtcbiAgICB9LFxuXG4gICAgZW1XaXRoaW5TdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW0gPSBuZXcgRW0oKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgIHRoaXMuZW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVCcmVhaygpO1xuICAgICAgICAgICAgdGhpcy5lbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICB0aGlzLnRyZWUuY2xvc2VTY29wZShlbSk7XG4gICAgfSxcblxuICAgIGVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiaW1hZ2VzXCIpID49IDAgJiYgdGhpcy5oYXNJbWFnZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlua3NcIikgPj0gMCAmJiB0aGlzLmhhc0xpbmtBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saW5rKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiY29kZVwiKSA+PSAwICYmIHRoaXMuaGFzQ29kZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5BU1RFUklTSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQVNURVJJU0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkJBQ0tUSUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5CQUNLVElDSykpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uTEJSQUNLOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUuYWRkU2luZ2xlVmFsdWUobmV3IFRleHQoKSwgdGhpcy5jb25zdW1lVG9rZW4odGhpcy50bS5MQlJBQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICh0aGlzLmVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudEhhc0VsZW1lbnRzQWhlYWQoKSk7XG4gICAgfSxcblxuICAgIGVtV2l0aGluU3Ryb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVtID0gbmV3IEVtKCk7XG5cbiAgICAgICAgdGhpcy50cmVlLm9wZW5TY29wZSgpO1xuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNUZXh0QWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImltYWdlc1wiKSA+PSAwICYmIHRoaXMuaGFzSW1hZ2VBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImxpbmtzXCIpID49IDAgJiYgdGhpcy5oYXNMaW5rQWhlYWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGluaygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZHVsZXMuaW5kZXhPZihcImNvZGVcIikgPj0gMCAmJiB0aGlzLmhhc0NvZGVBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2RlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMudG0uQVNURVJJU0s6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5hZGRTaW5nbGVWYWx1ZShuZXcgVGV4dCgpLCB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkFTVEVSSVNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy50bS5CQUNLVElDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSB0aGlzLnRtLkxCUkFDSzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLmFkZFNpbmdsZVZhbHVlKG5ldyBUZXh0KCksIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uTEJSQUNLKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodGhpcy5lbVdpdGhpblN0cm9uZ0hhc0VsZW1lbnRzQWhlYWQoKSk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgIHRoaXMudHJlZS5jbG9zZVNjb3BlKGVtKTtcbiAgICB9LFxuXG4gICAgY29kZU11bHRpbGluZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb2RlID0gbmV3IENvZGUoKTtcblxuICAgICAgICB0aGlzLnRyZWUub3BlblNjb3BlKCk7XG4gICAgICAgIHRoaXMuY29uc3VtZVRva2VuKHRoaXMudG0uQkFDS1RJQ0spO1xuICAgICAgICB0aGlzLmNvZGVUZXh0KCk7XG4gICAgICAgIHdoaWxlICh0aGlzLnRleHRBaGVhZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmxpbmVCcmVhaygpO1xuICAgICAgICAgICAgdGhpcy53aGl0ZVNwYWNlKCk7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uR1QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkdUKTtcbiAgICAgICAgICAgICAgICB0aGlzLndoaXRlU3BhY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29kZVRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgdGhpcy50cmVlLmNsb3NlU2NvcGUoY29kZSk7XG4gICAgfSxcblxuICAgIHdoaXRlU3BhY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aGlsZSAodGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uU1BBQ0UgfHwgdGhpcy5nZXROZXh0VG9rZW5LaW5kKCkgPT09IHRoaXMudG0uVEFCKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN1bWVUb2tlbih0aGlzLmdldE5leHRUb2tlbktpbmQoKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzQW55QmxvY2tFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5Nb3JlQmxvY2tFbGVtZW50cygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYmxvY2tBaGVhZDogZnVuY3Rpb24oYmxvY2tCZWdpbkNvbHVtbikge1xuICAgICAgICB2YXIgcXVvdGVMZXZlbCA9IDA7XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgdmFyIHQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIGkgPSAyO1xuXG4gICAgICAgICAgICBxdW90ZUxldmVsID0gMDtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBxdW90ZUxldmVsID0gMDtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIHQgPSB0aGlzLmdldFRva2VuKGkrKyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0LmtpbmQgPT09IHRoaXMudG0uR1QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0LmJlZ2luQ29sdW1uID09PSAxICYmIHRoaXMuY3VycmVudEJsb2NrTGV2ZWwgPiAwICYmIHRoaXMuY3VycmVudFF1b3RlTGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBxdW90ZUxldmVsKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlICh0LmtpbmQgPT09IHRoaXMudG0uR1QgfHwgdC5raW5kID09PSB0aGlzLnRtLlNQQUNFIHx8IHQua2luZCA9PT0gdGhpcy50bS5UQUIpO1xuICAgICAgICAgICAgICAgIGlmIChxdW90ZUxldmVsID4gdGhpcy5jdXJyZW50UXVvdGVMZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHF1b3RlTGV2ZWwgPCB0aGlzLmN1cnJlbnRRdW90ZUxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlICh0LmtpbmQgPT09IHRoaXMudG0uRU9MKTtcbiAgICAgICAgICAgIHJldHVybiB0LmtpbmQgIT09IHRoaXMudG0uRU9GICYmICh0aGlzLmN1cnJlbnRCbG9ja0xldmVsID09PSAwIHx8IHQuYmVnaW5Db2x1bW4gPj0gYmxvY2tCZWdpbkNvbHVtbiArIDIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgbXVsdGlsaW5lQWhlYWQ6IGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdG9rZW4gJiYgdGhpcy5nZXRUb2tlbigyKS5raW5kICE9PSB0b2tlbiAmJiB0aGlzLmdldFRva2VuKDIpLmtpbmQgIT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMjsgOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRoaXMuZ2V0VG9rZW4oaSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodC5raW5kID09PSB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHQua2luZCA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHRoaXMuc2tpcChpICsgMSwgW3RoaXMudG0uU1BBQ0UsIHRoaXMudG0uVEFCXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBxdW90ZUxldmVsID0gdGhpcy5uZXdRdW90ZUxldmVsKGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdW90ZUxldmVsID09PSB0aGlzLmN1cnJlbnRRdW90ZUxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gdGhpcy5za2lwKGksIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQiwgdGhpcy50bS5HVF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdG9rZW4gfHwgdGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkVPTCB8fCB0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uREFTSCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uRElHSVRTICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uRE9UKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0sgJiYgdGhpcy5nZXRUb2tlbihpICsgMSkua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VG9rZW4oaSArIDIpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0spIHx8IHRoaXMuaGVhZGluZ0FoZWFkKGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0LmtpbmQgPT09IHRoaXMudG0uRU9GKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBmZW5jZXNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy5za2lwKDIsIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQiwgdGhpcy50bS5HVF0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlbihpKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0sgJiYgdGhpcy5nZXRUb2tlbihpICsgMikua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSykge1xuICAgICAgICAgICAgICAgIGkgPSB0aGlzLnNraXAoaSArIDMsIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQl0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKGkpLmtpbmQgPT09IHRoaXMudG0uRU9MIHx8IHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdGhpcy50bS5FT0Y7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBoZWFkaW5nQWhlYWQ6IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICAgICBpZiAodGhpcy5nZXRUb2tlbihvZmZzZXQpLmtpbmQgPT09IHRoaXMudG0uRVEpIHtcbiAgICAgICAgICAgIHZhciBoZWFkaW5nID0gMTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IChvZmZzZXQgKyAxKTsgOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRUb2tlbihpKS5raW5kICE9PSB0aGlzLnRtLkVRKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKytoZWFkaW5nID4gNikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgbGlzdEl0ZW1BaGVhZDogZnVuY3Rpb24obGlzdEJlZ2luQ29sdW1uLCBvcmRlcmVkKSB7XG4gICAgICAgIGlmICh0aGlzLmdldE5leHRUb2tlbktpbmQoKSA9PT0gdGhpcy50bS5FT0wpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGVvbCA9IDEsIGkgPSAyOyA7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5nZXRUb2tlbihpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0LmtpbmQgPT09IHRoaXMudG0uRU9MICYmICsrZW9sID4gMikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0LmtpbmQgIT09IHRoaXMudG0uU1BBQ0UgJiYgdC5raW5kICE9PSB0aGlzLnRtLlRBQiAmJiB0LmtpbmQgIT09IHRoaXMudG0uR1QgJiYgdC5raW5kICE9PSB0aGlzLnRtLkVPTCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh0LmtpbmQgPT09IHRoaXMudG0uRElHSVRTICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uRE9UICYmIHQuYmVnaW5Db2x1bW4gPj0gbGlzdEJlZ2luQ29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5raW5kID09PSB0aGlzLnRtLkRBU0ggJiYgdC5iZWdpbkNvbHVtbiA+PSBsaXN0QmVnaW5Db2x1bW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgdGV4dEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0TmV4dFRva2VuS2luZCgpID09PSB0aGlzLnRtLkVPTCAmJiB0aGlzLmdldFRva2VuKDIpLmtpbmQgIT09IHRoaXMudG0uRU9MKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuc2tpcCgyLCBbdGhpcy50bS5TUEFDRSwgdGhpcy50bS5UQUJdKTtcbiAgICAgICAgICAgIHZhciBxdW90ZUxldmVsID0gdGhpcy5uZXdRdW90ZUxldmVsKGkpO1xuXG4gICAgICAgICAgICBpZiAocXVvdGVMZXZlbCA9PT0gdGhpcy5jdXJyZW50UXVvdGVMZXZlbCB8fCAhKHRoaXMubW9kdWxlcy5pbmRleE9mKFwiYmxvY2txdW90ZXNcIikgPj0gMCkpIHtcbiAgICAgICAgICAgICAgICBpID0gdGhpcy5za2lwKGksIFt0aGlzLnRtLlNQQUNFLCB0aGlzLnRtLlRBQiwgdGhpcy50bS5HVF0pO1xuICAgICAgICAgICAgICAgIHZhciB0ID0gdGhpcy5nZXRUb2tlbihpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRva2VuKGkpLmtpbmQgIT09IHRoaXMudG0uRU9MICYmICEodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJsaXN0c1wiKSA+PSAwICYmIHQua2luZCA9PT0gdGhpcy50bS5EQVNIKSAmJlxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMubW9kdWxlcy5pbmRleE9mKFwibGlzdHNcIikgPj0gMCAmJiB0LmtpbmQgPT09IHRoaXMudG0uRElHSVRTICYmIHRoaXMuZ2V0VG9rZW4oaSArIDEpLmtpbmQgPT09IHRoaXMudG0uRE9UKSAmJlxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMuZ2V0VG9rZW4oaSkua2luZCA9PT0gdGhpcy50bS5CQUNLVElDSyAmJiB0aGlzLmdldFRva2VuKGkgKyAxKS5raW5kID09PSB0aGlzLnRtLkJBQ0tUSUNLICYmIHRoaXMuZ2V0VG9rZW4oaSArIDIpLmtpbmQgPT09IHRoaXMudG0uQkFDS1RJQ0spICYmXG4gICAgICAgICAgICAgICAgICAgICEodGhpcy5tb2R1bGVzLmluZGV4T2YoXCJoZWFkaW5nc1wiKSA+PSAwICYmIHRoaXMuaGVhZGluZ0FoZWFkKGkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIG5leHRBZnRlclNwYWNlOiBmdW5jdGlvbih0b2tlbnMpIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnNraXAoMSwgW3RoaXMudG0uU1BBQ0UsIHRoaXMudG0uVEFCXSk7XG5cbiAgICAgICAgcmV0dXJuIHRva2Vucy5pbmRleE9mKHRoaXMuZ2V0VG9rZW4oaSkua2luZCkgPj0gMDtcbiAgICB9LFxuXG4gICAgbmV3UXVvdGVMZXZlbDogZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgICAgIHZhciBxdW90ZUxldmVsID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpID0gb2Zmc2V0OyA7IGkrKykge1xuICAgICAgICAgICAgdmFyIHQgPSB0aGlzLmdldFRva2VuKGkpO1xuXG4gICAgICAgICAgICBpZiAodC5raW5kID09PSB0aGlzLnRtLkdUKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVMZXZlbCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0LmtpbmQgIT09IHRoaXMudG0uU1BBQ0UgJiYgdC5raW5kICE9PSB0aGlzLnRtLlRBQikge1xuICAgICAgICAgICAgICAgIHJldHVybiBxdW90ZUxldmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2tpcDogZnVuY3Rpb24ob2Zmc2V0LCB0b2tlbnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IG9mZnNldDsgOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0ID0gdGhpcy5nZXRUb2tlbihpKTtcblxuICAgICAgICAgICAgaWYgKHRva2Vucy5pbmRleE9mKHQua2luZCkgPT09IC0xIHx8IHQua2luZCA9PT0gdGhpcy50bS5FT0YpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNPcmRlcmVkTGlzdEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpICYmICF0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRPVCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNGZW5jZWRDb2RlQmxvY2tBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkZlbmNlZENvZGVCbG9jaygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGVhZGluZ0hhc0lubGluZUVsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblN0cm9uZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbkxvb3NlQ2hhcigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNUZXh0QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5UZXh0VG9rZW5zKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbWFnZUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuSW1hZ2UoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsb2NrUXVvdGVIYXNFbXB0eUxpbmVBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkJsb2NrUXVvdGVFbXB0eUxpbmUoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc1N0cm9uZ0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuU3Ryb25nKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNFbUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuRW0oKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc0NvZGVBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkNvZGUoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsb2NrUXVvdGVIYXNBbnlCbG9ja0VsZW1lbnRzZUFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuTW9yZUJsb2NrRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc0Jsb2NrUXVvdGVFbXB0eUxpbmVzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5CbG9ja1F1b3RlRW1wdHlMaW5lcygpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbGlzdEl0ZW1IYXNJbmxpbmVFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2Nhbk1vcmVCbG9ja0VsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbmxpbmVUZXh0QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5UZXh0VG9rZW5zKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbmxpbmVFbGVtZW50QWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5JbmxpbmVFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbWFnZUhhc0FueUVsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuSW1hZ2VFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNSZXNvdXJjZVRleHRBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblJlc291cmNlRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxpbmtIYXNBbnlFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkxpbmtFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNSZXNvdXJjZVVybEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuUmVzb3VyY2VVcmwoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc291cmNlSGFzRWxlbWVudEFoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuUmVzb3VyY2VFbGVtZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNvdXJjZVRleHRIYXNFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuUmVzb3VyY2VUZXh0RWxlbWVudCgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaGFzRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ011bHRpbGluZSgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3Ryb25nTXVsdGlsaW5lSGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblN0cm9uZ011bHRpbGluZUVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHJvbmdXaXRoaW5FbU11bHRpbGluZUhhc0VsZW1lbnRzQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdXaXRoaW5FbU11bHRpbGluZUVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNJbWFnZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMjE0NzQ4MzY0NztcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkltYWdlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBoYXNMaW5rQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5MaW5rKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdHJvbmdFbVdpdGhpblN0cm9uZ0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuRW1XaXRoaW5TdHJvbmcoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0cm9uZ0hhc0VsZW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuU3Ryb25nRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0cm9uZ1dpdGhpbkVtSGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhblN0cm9uZ1dpdGhpbkVtRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhhc1N0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdXaXRoaW5FbU11bHRpbGluZSgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZW1NdWx0aWxpbmVDb250ZW50SGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtTXVsdGlsaW5lQ29udGVudEVsZW1lbnRzKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBlbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnRIYXNFbGVtZW50c0FoZWFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5sb29rQWhlYWQgPSAxO1xuICAgICAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uID0gdGhpcy50b2tlbjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiAhdGhpcy5zY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgIGVtSGFzU3Ryb25nV2l0aGluRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDIxNDc0ODM2NDc7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5TdHJvbmdXaXRoaW5FbSgpO1xuICAgICAgICB9IGNhdGNoIChscykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZW1IYXNFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGVtV2l0aGluU3Ryb25nSGFzRWxlbWVudHNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHMoKTtcbiAgICAgICAgfSBjYXRjaCAobHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNvZGVUZXh0SGFzQW55VG9rZW5BaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9va0FoZWFkID0gMTtcbiAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMudG9rZW47XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuc2NhbkNvZGVUZXh0VG9rZW5zKCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0ZXh0SGFzVG9rZW5zQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmxvb2tBaGVhZCA9IDE7XG4gICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnRva2VuO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLnNjYW5UZXh0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGxzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzY2FuTG9vc2VDaGFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuVGV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ09MT04pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5EQVNIKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRE9UKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9ICF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLkVPTCwgdGhpcy50bS5FT0ZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuVGV4dFRva2VuczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5UZXh0KCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5UZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5Db2RlVGV4dFRva2VuczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1NMQVNIKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkNIQVJfU0VRVUVOQ0UpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DT0xPTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uREFTSCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVRKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVTQ0FQRURfQ0hBUikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9ICF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLkVPTCwgdGhpcy50bS5FT0ZdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuQ29kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSB8fCB0aGlzLnNjYW5Db2RlVGV4dFRva2Vuc0FoZWFkKCkgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSyk7XG4gICAgfSxcblxuICAgIHNjYW5Db2RlTXVsdGlsaW5lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSB8fCB0aGlzLnNjYW5Db2RlVGV4dFRva2Vuc0FoZWFkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NvZGVUZXh0T25OZXh0TGluZUFoZWFkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4oQkFDS1RJQ0spO1xuICAgIH0sXG5cbiAgICBzY2FuQ29kZVRleHRUb2tlbnNBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Db2RlVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuQ29kZVRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgaGFzQ29kZVRleHRPbk5leHRMaW5lQWhlYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuV2hpdGVzcGFjZVRva2VuQmVmb3JlRW9sKCkpIHtcbiAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbkNvZGVUZXh0VG9rZW5zQWhlYWQoKTtcbiAgICB9LFxuXG4gICAgc2NhbldoaXRzcGFjZVRva2VuczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuV2hpdGVzcGFjZVRva2VuQmVmb3JlRW9sOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uRU9MKTtcbiAgICB9LFxuXG4gICAgc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Db2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5FbVdpdGhpblN0cm9uZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpIHx8IHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpO1xuICAgIH0sXG5cbiAgICBzY2FuRW1FbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW0oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSB8fCB0aGlzLnNjYW5FbUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICB9LFxuXG4gICAgc2NhbkVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgaGFzTm9FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnRBaGVhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nTXVsdGlsaW5lQ29udGVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSB8fCB0aGlzLmhhc05vRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmVDb250ZW50QWhlYWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRlc3BhY2VUb2tlbkJlZm9yZUVvbCgpIHx8IHRoaXMuaGFzTm9FbVdpdGhpblN0cm9uZ011bHRpbGluZUNvbnRlbnRBaGVhZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgfSxcblxuICAgIHNjYW5FbU11bHRpbGluZUNvbnRlbnRFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWFudGljTG9va0FoZWFkID0gdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNlbWFudGljTG9va0FoZWFkIHx8IHRoaXMuc2NhbkNvZGVNdWx0aWxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW1FbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW06IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykgfHwgdGhpcy5zY2FuU3Ryb25nV2l0aGluRW1FbGVtZW50cygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1FbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRleHRUb2tlbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuSW1hZ2UoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5MaW5rKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9IHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5CQUNLVElDSyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCB8fCB0aGlzLnNjYW5Db2RlTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkVtV2l0aGluU3Ryb25nKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uVU5ERVJTQ09SRSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spIHx8IHRoaXMuc2NhblN0cm9uZ0VsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5TdHJvbmdFbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uQVNURVJJU0spO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLVElDSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRm9yTW9yZVN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50cygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmVFbGVtZW50cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuU3Ryb25nV2l0aGluRW1NdWx0aWxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykgfHwgdGhpcy5zY2FuRm9yTW9yZVN0cm9uZ1dpdGhpbkVtTXVsdGlsaW5lRWxlbWVudHMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRlc3BhY2VUb2tlbkJlZm9yZUVvbCgpIHx8IHRoaXMuc2NhbkZvck1vcmVTdHJvbmdXaXRoaW5FbU11bHRpbGluZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSyk7XG4gICAgfSxcblxuICAgIHNjYW5TdHJvbmdNdWx0aWxpbmVFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVGV4dFRva2VucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmsoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkNvZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuRW1XaXRoaW5TdHJvbmdNdWx0aWxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tUSUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5SZXNvdXJjZVRleHRFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkFTVEVSSVNLKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5CQUNLU0xBU0gpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DSEFSX1NFUVVFTkNFKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5DT0xPTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5EQVNIKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRElHSVRTKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FU0NBUEVEX0NIQVIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkdUKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTFQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlVOREVSU0NPUkUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSAhdGhpcy5uZXh0QWZ0ZXJTcGFjZShbdGhpcy50bS5SUEFSRU5dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuSW1hZ2VFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2Nhbkxvb3NlQ2hhcigpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VUZXh0RWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuUmVzb3VyY2VUZXh0RWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VVcmw6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FuVG9rZW4odGhpcy50bS5MUEFSRU4pIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblJlc291cmNlVGV4dEVsZW1lbnRzKCkgfHxcbiAgICAgICAgICAgIHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uUlBBUkVOKTtcbiAgICB9LFxuXG4gICAgc2NhbkxpbmtFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5JbWFnZSgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5TdHJvbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5FbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuQ29kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnRzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuTG9vc2VDaGFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkJBQ0tTTEFTSCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ09MT04pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uQ0hBUl9TRVFVRU5DRSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRBU0gpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRJR0lUUykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ET1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FUSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVNDQVBFRF9DSEFSKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5MVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlJQQVJFTikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9ICF0aGlzLm5leHRBZnRlclNwYWNlKFt0aGlzLnRtLlJCUkFDS10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUmVzb3VyY2VFbGVtZW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblJlc291cmNlRWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuTGluazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkxCUkFDSykgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkgfHwgdGhpcy5zY2FuTGlua0VsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkxpbmtFbGVtZW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5SQlJBQ0spKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB4c3AgPSB0aGlzLnNjYW5Qb3NpdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuc2NhblJlc291cmNlVXJsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbkltYWdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uTEJSQUNLKSB8fCB0aGlzLnNjYW5XaGl0c3BhY2VUb2tlbnMoKSB8fCB0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLklNQUdFX0xBQkVMKSB8fCB0aGlzLnNjYW5JbWFnZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlRWxlbWVudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uUkJSQUNLKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgIGlmICh0aGlzLnNjYW5SZXNvdXJjZVVybCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5JbmxpbmVFbGVtZW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5UZXh0VG9rZW5zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbkltYWdlKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuTGluaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VtYW50aWNMb29rQWhlYWQgPSB0aGlzLm11bHRpbGluZUFoZWFkKHRoaXMudG0uQVNURVJJU0spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5BU1RFUklTSykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCA9IHRoaXMubXVsdGlsaW5lQWhlYWQodGhpcy50bS5VTkRFUlNDT1JFKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VtYW50aWNMb29rQWhlYWQgfHwgdGhpcy5zY2FuVG9rZW4odGhpcy50bS5VTkRFUlNDT1JFKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbWFudGljTG9va0FoZWFkID0gdGhpcy5tdWx0aWxpbmVBaGVhZCh0aGlzLnRtLkJBQ0tUSUNLKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tpbmdBaGVhZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCB8fCB0aGlzLnNjYW5Db2RlTXVsdGlsaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjYW5Mb29zZUNoYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuUGFyYWdyYXBoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhbklubGluZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbklubGluZUVsZW1lbnQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2NhbldoaXRzcGFjZVRva2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLlNQQUNFKSkge1xuICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5UQUIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuRmVuY2VkQ29kZUJsb2NrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uQkFDS1RJQ0spO1xuICAgIH0sXG5cbiAgICBzY2FuQmxvY2tRdW90ZUVtcHR5TGluZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FuQmxvY2tRdW90ZUVtcHR5TGluZSgpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uRU9MKTtcbiAgICB9LFxuXG4gICAgc2NhbkJsb2NrUXVvdGVFbXB0eUxpbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5FT0wpIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uR1QpIHx8IHRoaXMuc2NhbldoaXRzcGFjZVRva2VucygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5HVCkgfHwgdGhpcy5zY2FuV2hpdHNwYWNlVG9rZW5zKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIHNjYW5Gb3JIZWFkZXJzaWduczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB4c3AgPSBudWxsO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkVRKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIHhzcCA9IHRoaXMuc2NhblBvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NhblRva2VuKHRoaXMudG0uRVEpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuTW9yZUJsb2NrRWxlbWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeHNwID0gdGhpcy5zY2FuUG9zaXRpb247XG5cbiAgICAgICAgdGhpcy5sb29raW5nQWhlYWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbWFudGljTG9va0FoZWFkID0gdGhpcy5oZWFkaW5nQWhlYWQoMSk7XG4gICAgICAgIHRoaXMubG9va2luZ0FoZWFkID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5zZW1hbnRpY0xvb2tBaGVhZCB8fCB0aGlzLnNjYW5Gb3JIZWFkZXJzaWducygpKSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkdUKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjYW5Ub2tlbih0aGlzLnRtLkRBU0gpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhblBvc2l0aW9uID0geHNwO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuVG9rZW4odGhpcy50bS5ESUdJVFMpIHx8IHRoaXMuc2NhblRva2VuKHRoaXMudG0uRE9UKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2FuUG9zaXRpb24gPSB4c3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY2FuRmVuY2VkQ29kZUJsb2NrKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHhzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY2FuUGFyYWdyYXBoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzY2FuVG9rZW46IGZ1bmN0aW9uKGtpbmQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NhblBvc2l0aW9uID09PSB0aGlzLmxhc3RQb3NpdGlvbikge1xuICAgICAgICAgICAgdGhpcy5sb29rQWhlYWQtLTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zY2FuUG9zaXRpb24ubmV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFBvc2l0aW9uID0gdGhpcy5zY2FuUG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbi5uZXh0ID0gdGhpcy50bS5nZXROZXh0VG9rZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uLm5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNjYW5Qb3NpdGlvbiA9IHRoaXMuc2NhblBvc2l0aW9uLm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2NhblBvc2l0aW9uLmtpbmQgIT09IGtpbmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxvb2tBaGVhZCA9PT0gMCAmJiB0aGlzLnNjYW5Qb3NpdGlvbiA9PT0gdGhpcy5sYXN0UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHRocm93IHRoaXMubG9va0FoZWFkU3VjY2VzcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGdldE5leHRUb2tlbktpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5uZXh0VG9rZW5LaW5kICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dFRva2VuS2luZDtcbiAgICAgICAgfSBlbHNlIGlmICghKHRoaXMubmV4dFRva2VuID0gdGhpcy50b2tlbi5uZXh0KSkge1xuICAgICAgICAgICAgdGhpcy50b2tlbi5uZXh0ID0gdGhpcy50bS5nZXROZXh0VG9rZW4oKTtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5uZXh0VG9rZW5LaW5kID0gdGhpcy50b2tlbi5uZXh0LmtpbmQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAodGhpcy5uZXh0VG9rZW5LaW5kID0gdGhpcy5uZXh0VG9rZW4ua2luZCk7XG4gICAgfSxcblxuICAgIGNvbnN1bWVUb2tlbjogZnVuY3Rpb24oa2luZCkge1xuICAgICAgICB2YXIgb2xkID0gdGhpcy50b2tlbjtcblxuICAgICAgICBpZiAodGhpcy50b2tlbi5uZXh0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnRva2VuID0gdGhpcy50b2tlbi5uZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2tlbiA9IHRoaXMudG9rZW4ubmV4dCA9IHRoaXMudG0uZ2V0TmV4dFRva2VuKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5uZXh0VG9rZW5LaW5kID0gLTE7XG4gICAgICAgIGlmICh0aGlzLnRva2VuLmtpbmQgPT09IGtpbmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9rZW4gPSBvbGQ7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgIH0sXG5cbiAgICBnZXRUb2tlbjogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgdmFyIHQgPSB0aGlzLmxvb2tpbmdBaGVhZCA/IHRoaXMuc2NhblBvc2l0aW9uIDogdGhpcy50b2tlbjtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0Lm5leHQpIHtcbiAgICAgICAgICAgICAgICB0ID0gdC5uZXh0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ID0gdC5uZXh0ID0gdGhpcy50bS5nZXROZXh0VG9rZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIFRva2VuKGtpbmQsIGJlZ2luTGluZSwgYmVnaW5Db2x1bW4sIGVuZExpbmUsIGVuZENvbHVtbiwgaW1hZ2UpIHtcblx0dGhpcy5raW5kID0ga2luZDtcblx0dGhpcy5iZWdpbkxpbmUgPSBiZWdpbkxpbmU7XG5cdHRoaXMuYmVnaW5Db2x1bW4gPSBiZWdpbkNvbHVtbjtcbiAgICB0aGlzLmVuZExpbmUgPSBlbmRMaW5lO1xuXHR0aGlzLmVuZENvbHVtbiA9IGVuZENvbHVtbjtcblx0dGhpcy5pbWFnZSA9IGltYWdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRva2VuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBUb2tlbiA9IHJlcXVpcmUoXCIuL3Rva2VuXCIpO1xuXG5mdW5jdGlvbiBUb2tlbk1hbmFnZXIoc3RyZWFtKSB7XG5cdHRoaXMuY3MgPSBzdHJlYW07XG5cdHRoaXMuampyb3VuZHMgPSBbXTtcblx0dGhpcy5qanN0YXRlU2V0ID0gW107XG5cdHRoaXMuampuZXh0U3RhdGVzID0gWzIsIDMsIDVdO1xufVxuXG5Ub2tlbk1hbmFnZXIucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVG9rZW5NYW5hZ2VyLFxuXG5cdEVPRjogMCxcblx0QVNURVJJU0s6IDEsXG5cdEJBQ0tTTEFTSDogMixcblx0QkFDS1RJQ0s6IDMsXG5cdENIQVJfU0VRVUVOQ0U6IDQsXG5cdENPTE9OOiA1LFxuXHREQVNIOiA2LFxuXHRESUdJVFM6IDcsXG5cdERPVDogOCxcblx0RU9MOiA5LFxuXHRFUTogMTAsXG5cdEVTQ0FQRURfQ0hBUjogMTEsXG5cdEdUOiAxMixcblx0SU1BR0VfTEFCRUw6IDEzLFxuXHRMQlJBQ0s6IDE0LFxuXHRMUEFSRU46IDE1LFxuXHRMVDogMTYsXG5cdFJCUkFDSzogMTcsXG5cdFJQQVJFTjogMTgsXG5cdFNQQUNFOiAxOSxcblx0VEFCOiAyMCxcblx0VU5ERVJTQ09SRTogMjEsXG5cbiAgICBnZXROZXh0VG9rZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGN1clBvcyA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5iZWdpblRva2VuKCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGxUb2tlbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSAyMTQ3NDgzNjQ3O1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IDA7XG4gICAgICAgICAgICAgICAgY3VyUG9zID0gdGhpcy5tb3ZlU3RyaW5nTGl0ZXJhbERmYTAoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoZWRLaW5kICE9PSAyMTQ3NDgzNjQ3KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hdGNoZWRQb3MgKyAxIDwgY3VyUG9zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNzLmJhY2t1cChjdXJQb3MgLSB0aGlzLm1hdGNoZWRQb3MgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWxsVG9rZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGZpbGxUb2tlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgVG9rZW4odGhpcy5tYXRjaGVkS2luZCwgdGhpcy5jcy5nZXRCZWdpbkxpbmUoKSwgdGhpcy5jcy5nZXRCZWdpbkNvbHVtbigpLCB0aGlzLmNzLmdldEVuZExpbmUoKSwgdGhpcy5jcy5nZXRFbmRDb2x1bW4oKSxcbiAgICAgICAgICAgICAgICB0aGlzLmNzLmdldEltYWdlKCkpO1xuICAgIH0sXG5cbiAgICBtb3ZlU3RyaW5nTGl0ZXJhbERmYTA6IGZ1bmN0aW9uKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgIGNhc2UgOTogcmV0dXJuIHRoaXMuc3RhcnROZmFXaXRoU3RhdGVzKDAsIHRoaXMuVEFCLCA4KTtcbiAgICAgICAgY2FzZSAzMjogcmV0dXJuIHRoaXMuc3RhcnROZmFXaXRoU3RhdGVzKDAsIHRoaXMuU1BBQ0UsIDgpO1xuICAgICAgICBjYXNlIDQwOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5MUEFSRU4pO1xuICAgICAgICBjYXNlIDQxOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5SUEFSRU4pO1xuICAgICAgICBjYXNlIDQyOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5BU1RFUklTSyk7XG4gICAgICAgIGNhc2UgNDU6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkRBU0gpO1xuICAgICAgICBjYXNlIDQ2OiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5ET1QpO1xuICAgICAgICBjYXNlIDU4OiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5DT0xPTik7XG4gICAgICAgIGNhc2UgNjA6IHJldHVybiB0aGlzLnN0b3BBdFBvcygwLCB0aGlzLkxUKTtcbiAgICAgICAgY2FzZSA2MTogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuRVEpO1xuICAgICAgICBjYXNlIDYyOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5HVCk7XG4gICAgICAgIGNhc2UgNzM6IHJldHVybiB0aGlzLm1vdmVTdHJpbmdMaXRlcmFsRGZhMSgweDIwMDApO1xuICAgICAgICBjYXNlIDkxOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5MQlJBQ0spO1xuICAgICAgICBjYXNlIDkyOiByZXR1cm4gdGhpcy5zdGFydE5mYVdpdGhTdGF0ZXMoMCwgdGhpcy5CQUNLU0xBU0gsIDcpO1xuICAgICAgICBjYXNlIDkzOiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5SQlJBQ0spO1xuICAgICAgICBjYXNlIDk1OiByZXR1cm4gdGhpcy5zdG9wQXRQb3MoMCwgdGhpcy5VTkRFUlNDT1JFKTtcbiAgICAgICAgY2FzZSA5NjogcmV0dXJuIHRoaXMuc3RvcEF0UG9zKDAsIHRoaXMuQkFDS1RJQ0spO1xuICAgICAgICBjYXNlIDEwNTogcmV0dXJuIHRoaXMubW92ZVN0cmluZ0xpdGVyYWxEZmExKDB4MjAwMCk7XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiB0aGlzLm1vdmVOZmEoNiwgMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnROZmFXaXRoU3RhdGVzOiBmdW5jdGlvbihwb3MsIGtpbmQsIHN0YXRlKSB7XG4gICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSBraW5kO1xuICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSBwb3M7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLnJlYWRDaGFyKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3MgKyAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZmEoc3RhdGUsIHBvcyArIDEpO1xuICAgIH0sXG5cbiAgICBzdG9wQXRQb3M6IGZ1bmN0aW9uKHBvcywga2luZCkge1xuICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0ga2luZDtcbiAgICAgICAgdGhpcy5tYXRjaGVkUG9zID0gcG9zO1xuICAgICAgICByZXR1cm4gcG9zICsgMTtcbiAgICB9LFxuXG4gICAgbW92ZVN0cmluZ0xpdGVyYWxEZmExOiBmdW5jdGlvbihhY3RpdmUpIHtcbiAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5yZWFkQ2hhcigpO1xuICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDc3IHx8IHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSAxMDkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vdmVTdHJpbmdMaXRlcmFsRGZhMihhY3RpdmUsIDB4MjAwMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnROZmEoMCwgYWN0aXZlKTtcbiAgICB9LFxuXG4gICAgbW92ZVN0cmluZ0xpdGVyYWxEZmEyOiBmdW5jdGlvbihvbGQsIGFjdGl2ZSkge1xuICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLnJlYWRDaGFyKCk7XG4gICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gNjUgfHwgdGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDk3KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlU3RyaW5nTGl0ZXJhbERmYTMoYWN0aXZlLCAweDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0TmZhKDEsIGFjdGl2ZSk7XG5cbiAgICB9LFxuXG4gICAgbW92ZVN0cmluZ0xpdGVyYWxEZmEzOiBmdW5jdGlvbihvbGQsIGFjdGl2ZSkge1xuICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLnJlYWRDaGFyKCk7XG4gICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gNzEgfHwgdGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDEwMykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW92ZVN0cmluZ0xpdGVyYWxEZmE0KGFjdGl2ZSwgMHgyMDAwKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE5mYSgyLCBhY3RpdmUpO1xuICAgIH0sXG5cbiAgICBtb3ZlU3RyaW5nTGl0ZXJhbERmYTQ6IGZ1bmN0aW9uKG9sZCwgYWN0aXZlKSB7XG4gICAgICAgIHRoaXMuY3VyQ2hhciA9IHRoaXMuY3MucmVhZENoYXIoKTtcbiAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSA2OSB8fCB0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gMTAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlU3RyaW5nTGl0ZXJhbERmYTUoYWN0aXZlLCAweDIwMDApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXJ0TmZhKDMsIGFjdGl2ZSk7XG4gICAgfSxcblxuICAgIG1vdmVTdHJpbmdMaXRlcmFsRGZhNTogZnVuY3Rpb24ob2xkLCBhY3RpdmUpIHtcbiAgICAgICAgdGhpcy5jdXJDaGFyID0gdGhpcy5jcy5yZWFkQ2hhcigpO1xuICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDU4ICYmICgoYWN0aXZlICYgMHgyMDAwKSAhPT0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3BBdFBvcyg1LCAxMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnROZmEoNCwgYWN0aXZlKTtcbiAgICB9LFxuXG4gICAgc3RhcnROZmE6IGZ1bmN0aW9uKHBvcywgYWN0aXZlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVOZmEodGhpcy5zdG9wU3RyaW5nTGl0ZXJhbERmYShwb3MsIGFjdGl2ZSksIHBvcyArIDEpO1xuICAgIH0sXG5cbiAgICBtb3ZlTmZhOiBmdW5jdGlvbihzdGFydFN0YXRlLCBjdXJQb3MpIHtcbiAgICAgICAgdGhpcy5qam5ld1N0YXRlQ250ID0gODtcbiAgICAgICAgdGhpcy5qanN0YXRlU2V0WzBdID0gc3RhcnRTdGF0ZTtcbiAgICAgICAgdmFyIHN0YXJ0c0F0ID0gMDtcbiAgICAgICAgdmFyIGkgPSAxO1xuICAgICAgICB2YXIgbCA9IG51bGw7XG4gICAgICAgIHZhciBraW5kID0gMHg3ZmZmZmZmZjtcblxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKCsrdGhpcy5yb3VuZCA9PT0gMHg3ZmZmZmZmZikge1xuICAgICAgICAgICAgICAgIHRoaXMucm91bmQgPSAweDgwMDAwMDAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApIDwgNjQpIHtcbiAgICAgICAgICAgICAgICBsID0gMSAqIE51bWJlcihNYXRoLnBvdygyLCB0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSkpO1xuXG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuampzdGF0ZVNldFstLWldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDg4MDA5OGZlZmZmZmQ5ZmYsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPiA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaXR3aXNlNjQoMHgzZmYwMDAwMDAwMDAwMDAsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPiA3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaXR3aXNlNjQoMHgyNDAwLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID4gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYml0d2lzZTY0KDQyOTQ5Njc4MDgsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGRTdGF0ZXMoMCwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qanN0YXRlU2V0W3RoaXMuampuZXdTdGF0ZUNudCsrXSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4MjQwMCwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA+IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJpdHdpc2U2NCgweDEwMDAwMDIwMCwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZFN0YXRlcygwLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmpqc3RhdGVTZXRbdGhpcy5qam5ld1N0YXRlQ250KytdID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHg4ODAwOThmZWZmZmZkOWZmLCBsKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDNmZjAwMDAwMDAwMDAwMCwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2luZCA+IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweDEwMDAwMDIwMCwgbCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZFN0YXRlcygwLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5iaXR3aXNlNjQoMHgyNDAwLCBsKSAhPT0gMCAmJiBraW5kID4gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQgPSA5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1ckNoYXIuY2hhckNvZGVBdCgwKSA9PT0gMTAgJiYga2luZCA+IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gOTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCkgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qanN0YXRlU2V0W3RoaXMuampuZXdTdGF0ZUNudCsrXSA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4NzdmZjY3MDAwMDAwMDAwMCwgbCkgIT09IDAgJiYga2luZCA+IDExKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDExO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlIChpICE9PSBzdGFydHNBdCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApIDwgMTI4KSB7XG4gICAgICAgICAgICAgICAgbCA9IDEgKiBOdW1iZXIoTWF0aC5wb3coMiwgdGhpcy5iaXR3aXNlNjQodGhpcy5jdXJDaGFyLmNoYXJDb2RlQXQoMCksIDYzKSkpO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmpqc3RhdGVTZXRbLS1pXSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID4gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VyQ2hhci5jaGFyQ29kZUF0KDApID09PSA5Mikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuampzdGF0ZVNldFt0aGlzLmpqbmV3U3RhdGVDbnQrK10gPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NCgweGZmZmZmZmZlNDdmZmZmZmYsIGwpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja05BZGQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYml0d2lzZTY0KDB4MWI4MDAwMDAwLCBsKSAhPT0gMCAmJiBraW5kID4gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBraW5kID0gMTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKGkgIT09IHN0YXJ0c0F0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuampzdGF0ZVNldFstLWldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPiA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2luZCA9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrTkFkZCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoaSAhPT0gc3RhcnRzQXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoa2luZCAhPT0gMHg3ZmZmZmZmZikge1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZEtpbmQgPSBraW5kO1xuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2hlZFBvcyA9IGN1clBvcztcbiAgICAgICAgICAgICAgICBraW5kID0gMHg3ZmZmZmZmZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICsrY3VyUG9zO1xuXG4gICAgICAgICAgICBpZiAoKGkgPSB0aGlzLmpqbmV3U3RhdGVDbnQpID09PSAoc3RhcnRzQXQgPSA4IC0gKHRoaXMuampuZXdTdGF0ZUNudCA9IHN0YXJ0c0F0KSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VyUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1ckNoYXIgPSB0aGlzLmNzLnJlYWRDaGFyKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1clBvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgY2hlY2tOQWRkU3RhdGVzOiBmdW5jdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tOQWRkKHRoaXMuampuZXh0U3RhdGVzW3N0YXJ0XSk7XG4gICAgICAgIH0gd2hpbGUgKHN0YXJ0KysgIT09IGVuZCk7XG4gICAgfSxcblxuICAgIGNoZWNrTkFkZDogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuampyb3VuZHNbc3RhdGVdICE9PSB0aGlzLnJvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLmpqc3RhdGVTZXRbdGhpcy5qam5ld1N0YXRlQ250KytdID0gc3RhdGU7XG4gICAgICAgICAgICB0aGlzLmpqcm91bmRzW3N0YXRlXSA9IHRoaXMucm91bmQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcFN0cmluZ0xpdGVyYWxEZmE6IGZ1bmN0aW9uKHBvcywgYWN0aXZlKSB7XG4gICAgICAgIGlmIChwb3MgPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmJpdHdpc2U2NChhY3RpdmUsIDB4MjAwMCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoZWRLaW5kID0gNDtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaXR3aXNlNjQoYWN0aXZlLCAweDE4MDAwMCkgIT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5iaXR3aXNlNjQoYWN0aXZlLCAweDQpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAxICYmIHRoaXMuYml0d2lzZTY0KGFjdGl2ZSwgMHgyMDAwKSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IDQ7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSAxO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAyICYmIHRoaXMuYml0d2lzZTY0KGFjdGl2ZSwgMHgyMDAwKSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IDQ7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSAyO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSAzICYmIHRoaXMuYml0d2lzZTY0KGFjdGl2ZSwgMHgyMDAwKSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IDQ7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSAzO1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zID09PSA0ICYmIHRoaXMuYml0d2lzZTY0KGFjdGl2ZSwgMHgyMDAwKSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5tYXRjaGVkS2luZCA9IDQ7XG4gICAgICAgICAgICB0aGlzLm1hdGNoZWRQb3MgPSA0O1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG5cbiAgICBiaXR3aXNlNjQ6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgdmFyIGRpdmlzb3IgPSAxIDw8IDMwO1xuICAgICAgICB2YXIgbWFzayA9IH4oKH4wKSA8PCAzMCk7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICB2YXIgc2hpZnQgPSAwO1xuXG4gICAgICAgIHdoaWxlICgoYSAhPT0gMCkgJiYgKGIgIT09IDApKSB7XG4gICAgICAgICAgICB2YXIgcnMgPSAobWFzayAmIGEpICYgKG1hc2sgJiBiKTtcblxuICAgICAgICAgICAgYSA9IE1hdGguZmxvb3IoYSAvIGRpdmlzb3IpO1xuICAgICAgICAgICAgYiA9IE1hdGguZmxvb3IoYiAvIGRpdmlzb3IpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHNoaWZ0Kys7IGktLTspIHtcbiAgICAgICAgICAgICAgICBycyAqPSBkaXZpc29yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0ICs9IHJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRva2VuTWFuYWdlcjtcblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIFRyZWVTdGF0ZSgpIHtcblx0dGhpcy5ub2RlcyA9IFtdO1xuXHR0aGlzLm1hcmtzID0gW107XG5cdHRoaXMubm9kZXNPblN0YWNrID0gMDtcblx0dGhpcy5jdXJyZW50TWFyayA9IDA7XG59XG5cblRyZWVTdGF0ZS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBUcmVlU3RhdGUsXG5cblx0b3BlblNjb3BlOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLm1hcmtzLnB1c2godGhpcy5jdXJyZW50TWFyayk7XG5cdFx0dGhpcy5jdXJyZW50TWFyayA9IHRoaXMubm9kZXNPblN0YWNrO1xuXHR9LFxuXG5cdGNsb3NlU2NvcGU6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLm5vZGVBcml0eSgpO1xuXG5cdFx0dGhpcy5jdXJyZW50TWFyayA9IHRoaXMubWFya3MucG9wKCk7XG5cdFx0d2hpbGUgKGEtLSA+IDApIHtcbiAgICAgICAgICB2YXIgYyA9IHRoaXMucG9wTm9kZSgpO1xuXG4gICAgICAgICAgYy5wYXJlbnQgPSBuO1xuICAgICAgICAgIG4uYWRkKGMsIGEpO1xuICAgICAgICB9XG5cdFx0dGhpcy5wdXNoTm9kZShuKTtcblx0fSxcblxuXHRhZGRTaW5nbGVWYWx1ZTogZnVuY3Rpb24obiwgdCkge1xuXHRcdHRoaXMub3BlblNjb3BlKCk7XG4gICAgICAgIG4udmFsdWUgPSB0LmltYWdlO1xuICAgICAgICB0aGlzLmNsb3NlU2NvcGUobik7XG5cdH0sXG5cblx0bm9kZUFyaXR5OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5ub2Rlc09uU3RhY2sgLSB0aGlzLmN1cnJlbnRNYXJrO1xuXHR9LFxuXG4gICAgcG9wTm9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC0tdGhpcy5ub2Rlc09uU3RhY2s7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzLnBvcCgpO1xuICAgIH0sXG5cbiAgICBwdXNoTm9kZTogZnVuY3Rpb24obikge1xuICAgICAgICB0aGlzLm5vZGVzLnB1c2gobik7XG4gICAgICAgICsrdGhpcy5ub2Rlc09uU3RhY2s7XG4gICAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyZWVTdGF0ZTtcbiJdfQ==
