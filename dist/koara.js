var koara = {}

if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = koara;
  }
  exports.koara = koara;
} else {
  root.koara = koara;
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

koara.CharStream.prototype.beginToken = function() {
	this.tokenBegin = -1;
	var c = this.readChar();
	this.tokenBegin = this.bufpos;
	return c;
}

koara.CharStream.prototype.readChar = function() {
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
}

koara.CharStream.prototype.fillBuff = function() {
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
	var i;

	try {
		if ((i = this.reader.read(this.buffer, this.maxNextCharInd,
				this.available - this.maxNextCharInd)) == -1) {
			throw "IOException";
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
}

koara.CharStream.prototype.backup = function(amount) {
	this.inBuf += this.amount;
	if ((this.bufpos -= this.amount) < 0) {
		this.bufpos += this.bufsize;
	}
}

koara.CharStream.prototype.updateLineColumn = function(c) {
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
}

koara.CharStream.prototype.getImage = function() {
	if (this.bufpos >= this.tokenBegin) {
		return this.buffer.slice(this.tokenBegin, this.bufpos - this.tokenBegin + 1).join('');
	} else {
		return this.buffer.slice(this.tokenBegin, this.bufsize - this.tokenBegin).join('')
				+ this.buffer.slice(0, this.bufpos + 1).join('');
	}
}

koara.CharStream.prototype.getBeginColumn = function() {
	return this.bufpos in this.bufcolumn ? this.bufcolumn[this.bufpos] : 0;
}

koara.CharStream.prototype.getBeginLine = function() {
	return this.bufpos in this.bufline ? this.bufline[this.bufpos] : 0;
}

koara.CharStream.prototype.getEndColumn = function() {
	return this.tokenBegin in this.bufcolumn ? this.bufcolumn[this.tokenBegin] : 0;
}

koara.CharStream.prototype.getEndLine = function() {
	return this.tokenBegin in this.bufline ? this.bufline[this.tokenBegin] : 0;
}
koara.Parser = function() {
}

//public class Parser {
//
//    private CharStream cs;
//    private Token token, nextToken, scanPosition, lastPosition;
//    private TokenManager tm;
//    private TreeState tree;
//    private int currentBlockLevel;
//    private int currentQuoteLevel;
//    private int lookAhead;
//    private int nextTokenKind;
//    private boolean lookingAhead;
//    private boolean semanticLookAhead;
//    private LookaheadSuccess lookAheadSuccess;
//    private List<Module> modules;
//
//    public Parser() {
//        this.lookAheadSuccess = new LookaheadSuccess();
//        this.modules = Arrays.asList(Module.PARAGRAPHS, Module.HEADINGS, Module.LISTS, Module.LINKS, Module.IMAGES,
//                Module.FORMATTING, Module.BLOCKQUOTES, Module.CODE);
//    }
//
	  koara.Parser.prototype.parse = function(text) {
		  return this.parseReader(new koara.StringReader(text));
	  }

	  koara.Parser.prototype.parseReader = function(reader) {
		  this.cs = new koara.CharStream(reader);
		  this.tm = new koara.TokenManager(this.cs);
		  
		  var document = new koara.Document();
		  return document;
	  }
	  
//    private Document parseReader(Reader reader) {
//        token = new Token();
//        tree = new TreeState();
//        nextTokenKind = -1;
//
//        Document document = new Document();
//        tree.openScope();
//        while (getNextTokenKind() == EOL) {
//            consumeToken(EOL);
//        }
//
//        whiteSpace();
//        if (hasAnyBlockElementsAhead()) {
//            blockElement();
//            while (blockAhead(0)) {
//                while (getNextTokenKind() == EOL) {
//                    consumeToken(EOL);
//                    whiteSpace();
//                }
//                blockElement();
//            }
//            while (getNextTokenKind() == EOL) {
//                consumeToken(EOL);
//            }
//            whiteSpace();
//        }
//        consumeToken(EOF);
//        tree.closeScope(document);
//        return document;
//    }
//
//    private void blockElement() {
//        currentBlockLevel++;
//        if (modules.contains(Module.HEADINGS) && headingAhead(1)) {
//            heading();
//        } else if (modules.contains(Module.BLOCKQUOTES) && getNextTokenKind() == GT) {
//            blockQuote();
//        } else if (modules.contains(Module.LISTS) && getNextTokenKind() == DASH) {
//            unorderedList();
//        } else if (modules.contains(Module.LISTS) && hasOrderedListAhead()) {
//            orderedList();
//        } else if (modules.contains(Module.CODE) && hasFencedCodeBlockAhead()) {
//            fencedCodeBlock();
//        } else {
//            paragraph();
//        }
//        currentBlockLevel--;
//    }
//
//    private void heading() {
//        Heading heading = new Heading();
//        tree.openScope();
//        int headingLevel = 0;
//
//        while (getNextTokenKind() == EQ) {
//            consumeToken(EQ);
//            headingLevel++;
//        }
//        whiteSpace();
//        while (headingHasInlineElementsAhead()) {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.FORMATTING) && hasStrongAhead()) {
//                strong();
//            } else if (modules.contains(Module.FORMATTING) && hasEmAhead()) {
//                em();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else {
//                looseChar();
//            }
//        }
//        heading.setValue(headingLevel);
//        tree.closeScope(heading);
//    }
//
//    private void blockQuote() {
//        BlockQuote blockQuote = new BlockQuote();
//        tree.openScope();
//        currentQuoteLevel++;
//        consumeToken(GT);
//        while (blockQuoteHasEmptyLineAhead()) {
//            blockQuoteEmptyLine();
//        }
//        whiteSpace();
//        if (blockQuoteHasAnyBlockElementseAhead()) {
//            blockElement();
//            while (blockAhead(0)) {
//                while (getNextTokenKind() == EOL) {
//                    consumeToken(EOL);
//                    whiteSpace();
//                    blockQuotePrefix();
//                }
//                blockElement();
//            }
//        }
//        while (hasBlockQuoteEmptyLinesAhead()) {
//            blockQuoteEmptyLine();
//        }
//        currentQuoteLevel--;
//        tree.closeScope(blockQuote);
//    }
//
//    private void blockQuotePrefix() {
//        int i = 0;
//        do {
//            consumeToken(GT);
//            whiteSpace();
//        } while (++i < currentQuoteLevel);
//    }
//
//    private void blockQuoteEmptyLine() {
//        consumeToken(EOL);
//        whiteSpace();
//        do {
//            consumeToken(GT);
//            whiteSpace();
//        } while (getNextTokenKind() == GT);
//    }
//
//    private void unorderedList() {
//        ListBlock list = new ListBlock(false);
//        tree.openScope();
//        int listBeginColumn = unorderedListItem();
//        while (listItemAhead(listBeginColumn, false)) {
//            while (getNextTokenKind() == EOL) {
//                consumeToken(EOL);
//            }
//            whiteSpace();
//            if (currentQuoteLevel > 0) {
//                blockQuotePrefix();
//            }
//            unorderedListItem();
//        }
//        tree.closeScope(list);
//    }
//
//    private int unorderedListItem() {
//        ListItem listItem = new ListItem();
//        tree.openScope();
//
//        Token t = consumeToken(DASH);
//        whiteSpace();
//        if (listItemHasInlineElements()) {
//            blockElement();
//            while (blockAhead(t.beginColumn)) {
//                while (getNextTokenKind() == EOL) {
//                    consumeToken(EOL);
//                    whiteSpace();
//                    if (currentQuoteLevel > 0) {
//                        blockQuotePrefix();
//                    }
//                }
//                blockElement();
//            }
//        }
//        tree.closeScope(listItem);
//        return t.beginColumn;
//    }
//
//    private void orderedList() {
//        ListBlock list = new ListBlock(true);
//        tree.openScope();
//        int listBeginColumn = orderedListItem();
//        while (listItemAhead(listBeginColumn, true)) {
//            while (getNextTokenKind() == EOL) {
//                consumeToken(EOL);
//            }
//            whiteSpace();
//            if (currentQuoteLevel > 0) {
//                blockQuotePrefix();
//            }
//            orderedListItem();
//        }
//        tree.closeScope(list);
//    }
//
//    private int orderedListItem() {
//        ListItem listItem = new ListItem();
//        tree.openScope();
//        Token t = consumeToken(DIGITS);
//        consumeToken(DOT);
//        whiteSpace();
//        if (listItemHasInlineElements()) {
//            blockElement();
//            while (blockAhead(t.beginColumn)) {
//                while (getNextTokenKind() == EOL) {
//                    consumeToken(EOL);
//                    whiteSpace();
//                    if (currentQuoteLevel > 0) {
//                        blockQuotePrefix();
//                    }
//                }
//                blockElement();
//            }
//        }
//        listItem.setNumber(Integer.valueOf(t.image));
//        tree.closeScope(listItem);
//        return t.beginColumn;
//    }
//
//    private void fencedCodeBlock() {
//        CodeBlock codeBlock = new CodeBlock();
//        tree.openScope();
//        StringBuilder s = new StringBuilder();
//        int beginColumn = consumeToken(BACKTICK).beginColumn;
//        do {
//            consumeToken(BACKTICK);
//        } while (getNextTokenKind() == BACKTICK);
//        whiteSpace();
//        if (getNextTokenKind() == CHAR_SEQUENCE) {
//            codeBlock.setLanguage(codeLanguage());
//        }
//        if (getNextTokenKind() != EOF && !fencesAhead()) {
//            consumeToken(EOL);
//            levelWhiteSpace(beginColumn);
//        }
//        
//        while (getNextTokenKind() != EOF && (getNextTokenKind() != EOL || !fencesAhead())) {
//            switch (getNextTokenKind()) {
//        	case CHAR_SEQUENCE:
//        		s.append(consumeToken(CHAR_SEQUENCE).image);
//        		break;
//            case ASTERISK:
//                s.append(consumeToken(ASTERISK).image);
//                break;
//            case BACKSLASH:
//                s.append(consumeToken(BACKSLASH).image);
//                break;
//            case COLON:
//                s.append(consumeToken(COLON).image);
//                break;
//            case DASH:
//                s.append(consumeToken(DASH).image);
//                break;
//            case DIGITS:
//                s.append(consumeToken(DIGITS).image);
//                break;
//            case DOT:
//                s.append(consumeToken(DOT).image);
//                break;
//            case EQ:
//                s.append(consumeToken(EQ).image);
//                break;
//            case ESCAPED_CHAR:
//                s.append(consumeToken(ESCAPED_CHAR).image);
//                break;
//            case IMAGE_LABEL:
//                s.append(consumeToken(IMAGE_LABEL).image);
//                break;
//            case LT:
//                s.append(consumeToken(LT).image);
//                break;
//            case GT:
//                s.append(consumeToken(GT).image);
//                break;
//            case LBRACK:
//                s.append(consumeToken(LBRACK).image);
//                break;
//            case RBRACK:
//                s.append(consumeToken(RBRACK).image);
//                break;
//            case LPAREN:
//                s.append(consumeToken(LPAREN).image);
//                break;
//            case RPAREN:
//                s.append(consumeToken(RPAREN).image);
//                break;
//            case UNDERSCORE:
//                s.append(consumeToken(UNDERSCORE).image);
//                break;
//            case BACKTICK:
//                s.append(consumeToken(BACKTICK).image);
//                break;
//            default:
//                if (!nextAfterSpace(EOL, EOF)) {
//                    switch (getNextTokenKind()) {
//                    case SPACE:
//                        s.append(consumeToken(SPACE).image);
//                        break;
//                    case TAB:
//                        consumeToken(TAB);
//                        s.append("    ");
//                        break;
//                    }
//                } else if (!fencesAhead()) {
//                    consumeToken(EOL);
//                    s.append("\n");
//                    levelWhiteSpace(beginColumn);
//                }
//            }
//        }
//        if (fencesAhead()) {
//            consumeToken(EOL);
//            whiteSpace();
//            while (getNextTokenKind() == BACKTICK) {
//                consumeToken(BACKTICK);
//            }
//        }
//        codeBlock.setValue(s.toString());
//        tree.closeScope(codeBlock);
//    }
//
//    private void paragraph() {
//        BlockElement paragraph;
//        if (modules.contains(Module.PARAGRAPHS)) {
//            paragraph = new Paragraph();
//        } else {
//            paragraph = new BlockElement();
//        }
//
//        tree.openScope();
//        inline();
//        while (textAhead()) {
//            lineBreak();
//            whiteSpace();
//            if (modules.contains(Module.BLOCKQUOTES)) {
//                while (getNextTokenKind() == GT) {
//                    consumeToken(GT);
//                    whiteSpace();
//                }
//            }
//            inline();
//        }
//        tree.closeScope(paragraph);
//    }
//
//    private void text() {
//        Text text = new Text();
//        tree.openScope();
//        StringBuffer s = new StringBuffer();
//        while (textHasTokensAhead()) {
//            switch (getNextTokenKind()) {
//        	case CHAR_SEQUENCE:
//        		s.append(consumeToken(CHAR_SEQUENCE).image);
//        		break;
//            case BACKSLASH:
//                s.append(consumeToken(BACKSLASH).image);
//                break;
//            case COLON:
//                s.append(consumeToken(COLON).image);
//                break;
//            case DASH:
//                s.append(consumeToken(DASH).image);
//                break;
//            case DIGITS:
//                s.append(consumeToken(DIGITS).image);
//                break;
//            case DOT:
//                s.append(consumeToken(DOT).image);
//                break;
//            case EQ:
//                s.append(consumeToken(EQ).image);
//                break;
//            case ESCAPED_CHAR:
//                s.append(consumeToken(ESCAPED_CHAR).image.substring(1));
//                break;
//            case GT:
//                s.append(consumeToken(GT).image);
//                break;
//            case IMAGE_LABEL:
//                s.append(consumeToken(IMAGE_LABEL).image);
//                break;
//            case LPAREN:
//                s.append(consumeToken(LPAREN).image);
//                break;
//            case LT:
//                s.append(consumeToken(LT).image);
//                break;
//            case RBRACK:
//                s.append(consumeToken(RBRACK).image);
//                break;
//            case RPAREN:
//                s.append(consumeToken(RPAREN).image);
//                break;
//            default:
//                if (!nextAfterSpace(EOL, EOF)) {
//                    switch (getNextTokenKind()) {
//                    case SPACE:
//                        s.append(consumeToken(SPACE).image);
//                        break;
//                    case TAB:
//                        consumeToken(TAB);
//                        s.append("    ");
//                        break;
//                    }
//                }
//            }
//        }
//        text.setValue(s.toString());
//        tree.closeScope(text);
//    }
//
//    private void image() {
//        Image image = new Image();
//        tree.openScope();
//        String ref = "";
//        consumeToken(LBRACK);
//        whiteSpace();
//        consumeToken(IMAGE_LABEL);
//        whiteSpace();
//        while (imageHasAnyElements()) {
//            if (hasTextAhead()) {
//                resourceText();
//            } else {
//                looseChar();
//            }
//        }
//        whiteSpace();
//        consumeToken(RBRACK);
//        if (hasResourceUrlAhead()) {
//            ref = resourceUrl();
//        }
//        image.setValue(ref);
//        tree.closeScope(image);
//    }
//
//    private void link() {
//        Link link = new Link();
//        tree.openScope();
//        String ref = "";
//        consumeToken(LBRACK);
//        whiteSpace();
//        while (linkHasAnyElements()) {
//            if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.FORMATTING) && hasStrongAhead()) {
//                strong();
//            } else if (modules.contains(Module.FORMATTING) && hasEmAhead()) {
//                em();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else if (hasResourceTextAhead()) {
//                resourceText();
//            } else {
//                looseChar();
//            }
//        }
//        whiteSpace();
//        consumeToken(RBRACK);
//        if (hasResourceUrlAhead()) {
//            ref = resourceUrl();
//        }
//        link.setValue(ref);
//        tree.closeScope(link);
//    }
//
//    private void strong() {
//        Strong strong = new Strong();
//        tree.openScope();
//        consumeToken(ASTERISK);
//        while (strongHasElements()) {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImage()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && multilineAhead(BACKTICK)) {
//                codeMultiline();
//            } else if (strongEmWithinStrongAhead()) {
//                emWithinStrong();
//            } else {
//                switch (getNextTokenKind()) {
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                case UNDERSCORE:
//                    tree.addSingleValue(new Text(), consumeToken(UNDERSCORE));
//                    break;
//                }
//            }
//        }
//        consumeToken(ASTERISK);
//        tree.closeScope(strong);
//    }
//
//    private void em() {
//        Em em = new Em();
//        tree.openScope();
//        consumeToken(UNDERSCORE);
//        while (emHasElements()) {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImage()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else if (emHasStrongWithinEm()) {
//                strongWithinEm();
//            } else {
//                switch (getNextTokenKind()) {
//                case ASTERISK:
//                    tree.addSingleValue(new Text(), consumeToken(ASTERISK));
//                    break;
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                }
//            }
//        }
//        consumeToken(UNDERSCORE);
//        tree.closeScope(em);
//    }
//
//    private void code() {
//        Code code = new Code();
//        tree.openScope();
//        consumeToken(BACKTICK);
//        codeText();
//        consumeToken(BACKTICK);
//        tree.closeScope(code);
//    }
//
//    private void codeText() {
//        Text text = new Text();
//        tree.openScope();
//        StringBuffer s = new StringBuffer();
//        do {
//            switch (getNextTokenKind()) {
//        	case CHAR_SEQUENCE:
//        		s.append(consumeToken(CHAR_SEQUENCE).image);
//        		break;
//            case ASTERISK:
//                s.append(consumeToken(ASTERISK).image);
//                break;
//            case BACKSLASH:
//                s.append(consumeToken(BACKSLASH).image);
//                break;
//            case COLON:
//                s.append(consumeToken(COLON).image);
//                break;
//            case DASH:
//                s.append(consumeToken(DASH).image);
//                break;
//            case DIGITS:
//                s.append(consumeToken(DIGITS).image);
//                break;
//            case DOT:
//                s.append(consumeToken(DOT).image);
//                break;
//            case EQ:
//                s.append(consumeToken(EQ).image);
//                break;
//            case ESCAPED_CHAR:
//                s.append(consumeToken(ESCAPED_CHAR).image);
//                break;
//            case IMAGE_LABEL:
//                s.append(consumeToken(IMAGE_LABEL).image);
//                break;
//            case LT:
//                s.append(consumeToken(LT).image);
//                break;
//            case LBRACK:
//                s.append(consumeToken(LBRACK).image);
//                break;
//            case RBRACK:
//                s.append(consumeToken(RBRACK).image);
//                break;
//            case LPAREN:
//                s.append(consumeToken(LPAREN).image);
//                break;
//            case GT:
//                s.append(consumeToken(GT).image);
//                break;
//            case RPAREN:
//                s.append(consumeToken(RPAREN).image);
//                break;
//            case UNDERSCORE:
//                s.append(consumeToken(UNDERSCORE).image);
//                break;
//            default:
//                if (!nextAfterSpace(EOL, EOF)) {
//                    switch (getNextTokenKind()) {
//                    case SPACE:
//                        s.append(consumeToken(SPACE).image);
//                        break;
//                    case TAB:
//                        consumeToken(TAB);
//                        s.append("    ");
//                        break;
//                    }
//                }
//            }
//        } while (codeTextHasAnyTokenAhead());
//        text.setValue(s.toString());
//        tree.closeScope(text);
//    }
//
//    private void looseChar() {
//        Text text = new Text();
//        tree.openScope();
//        switch (getNextTokenKind()) {
//        case ASTERISK:
//            text.setValue(consumeToken(ASTERISK).image);
//            break;
//        case BACKTICK:
//            text.setValue(consumeToken(BACKTICK).image);
//            break;
//        case LBRACK:
//            text.setValue(consumeToken(LBRACK).image);
//            break;
//        case UNDERSCORE:
//            text.setValue(consumeToken(UNDERSCORE).image);
//            break;
//        }
//        tree.closeScope(text);
//    }
//
//    private void lineBreak() {
//        LineBreak linebreak = new LineBreak();
//        tree.openScope();
//        while (getNextTokenKind() == SPACE || getNextTokenKind() == TAB) {
//            consumeToken(getNextTokenKind());
//        }
//        consumeToken(EOL);
//        tree.closeScope(linebreak);
//    }
//
//    private void levelWhiteSpace(int threshold) {
//        int currentPos = 1;
//        while (getNextTokenKind() == GT) {
//            consumeToken(getNextTokenKind());
//        }
//        while ((getNextTokenKind() == SPACE || getNextTokenKind() == TAB) && currentPos < (threshold - 1)) {
//            currentPos = consumeToken(getNextTokenKind()).beginColumn;
//        }
//    }
//
//    private String codeLanguage() {
//        StringBuilder s = new StringBuilder();
//        do {
//            switch (getNextTokenKind()) {
//        	case CHAR_SEQUENCE:
//        		s.append(consumeToken(CHAR_SEQUENCE).image);
//        		break;
//            case ASTERISK:
//                s.append(consumeToken(ASTERISK).image);
//                break;
//            case BACKSLASH:
//                s.append(consumeToken(BACKSLASH).image);
//                break;
//            case BACKTICK:
//                s.append(consumeToken(BACKTICK).image);
//                break;
//            case COLON:
//                s.append(consumeToken(COLON).image);
//                break;
//            case DASH:
//                s.append(consumeToken(DASH).image);
//                break;
//            case DIGITS:
//                s.append(consumeToken(DIGITS).image);
//                break;
//            case DOT:
//                s.append(consumeToken(DOT).image);
//                break;
//            case EQ:
//                s.append(consumeToken(EQ).image);
//                break;
//            case ESCAPED_CHAR:
//                s.append(consumeToken(ESCAPED_CHAR).image);
//                break;
//            case IMAGE_LABEL:
//                s.append(consumeToken(IMAGE_LABEL).image);
//                break;
//            case LT:
//                s.append(consumeToken(LT).image);
//                break;
//            case GT:
//                s.append(consumeToken(GT).image);
//                break;
//            case LBRACK:
//                s.append(consumeToken(LBRACK).image);
//                break;
//            case RBRACK:
//                s.append(consumeToken(RBRACK).image);
//                break;
//            case LPAREN:
//                s.append(consumeToken(LPAREN).image);
//                break;
//            case RPAREN:
//                s.append(consumeToken(RPAREN).image);
//                break;
//            case UNDERSCORE:
//                s.append(consumeToken(UNDERSCORE).image);
//                break;
//            case SPACE:
//                s.append(consumeToken(SPACE).image);
//                break;
//            case TAB:
//                s.append("    ");
//                break;
//            default:
//                break;
//            }
//        } while (getNextTokenKind() != EOL && getNextTokenKind() != EOF);
//        return s.toString();
//    }
//
//    private void inline() {
//        do {
//            if (hasInlineTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.FORMATTING) && multilineAhead(ASTERISK)) {
//                strongMultiline();
//            } else if (modules.contains(Module.FORMATTING) && multilineAhead(UNDERSCORE)) {
//                emMultiline();
//            } else if (modules.contains(Module.CODE) && multilineAhead(BACKTICK)) {
//                codeMultiline();
//            } else {
//                looseChar();
//            }
//        } while (hasInlineElementAhead());
//    }
//
//    private void resourceText() {
//        Text text = new Text();
//        tree.openScope();
//        StringBuilder s = new StringBuilder();
//        do {
//            switch (getNextTokenKind()) {
//        	case CHAR_SEQUENCE:
//        		s.append(consumeToken(CHAR_SEQUENCE).image);
//        		break;
//            case BACKSLASH:
//                s.append(consumeToken(BACKSLASH).image);
//                break;
//            case COLON:
//                s.append(consumeToken(COLON).image);
//                break;
//            case DASH:
//                s.append(consumeToken(DASH).image);
//                break;
//            case DIGITS:
//                s.append(consumeToken(DIGITS).image);
//                break;
//            case DOT:
//                s.append(consumeToken(DOT).image);
//                break;
//            case EQ:
//                s.append(consumeToken(EQ).image);
//                break;
//            case ESCAPED_CHAR:
//                s.append(consumeToken(ESCAPED_CHAR).image.substring(1));
//                break;
//            case IMAGE_LABEL:
//                s.append(consumeToken(IMAGE_LABEL).image);
//                break;
//            case GT:
//                s.append(consumeToken(GT).image);
//                break;
//            case LPAREN:
//                s.append(consumeToken(LPAREN).image);
//                break;
//            case LT:
//                s.append(consumeToken(LT).image);
//                break;
//            case RPAREN:
//                s.append(consumeToken(RPAREN).image);
//                break;
//            default:
//                if (!nextAfterSpace(RBRACK)) {
//                    switch (getNextTokenKind()) {
//                    case SPACE:
//                        s.append(consumeToken(SPACE).image);
//                        break;
//                    case TAB:
//                        consumeToken(TAB);
//                        s.append("    ");
//                        break;
//                    }
//                }
//            }
//        } while (resourceHasElementAhead());
//        text.setValue(s.toString());
//        tree.closeScope(text);
//    }
//
//    private String resourceUrl() {
//        consumeToken(LPAREN);
//        whiteSpace();
//        String ref = resourceUrlText();
//        whiteSpace();
//        consumeToken(RPAREN);
//        return ref;
//    }
//
//    private String resourceUrlText() {
//        StringBuilder s = new StringBuilder();
//        while (resourceTextHasElementsAhead()) {
//            switch (getNextTokenKind()) {
//        	case CHAR_SEQUENCE:
//        		s.append(consumeToken(CHAR_SEQUENCE).image);
//        		break;
//            case ASTERISK:
//                s.append(consumeToken(ASTERISK).image);
//                break;
//            case BACKSLASH:
//                s.append(consumeToken(BACKSLASH).image);
//                break;
//            case BACKTICK:
//                s.append(consumeToken(BACKTICK).image);
//                break;
//            case COLON:
//                s.append(consumeToken(COLON).image);
//                break;
//            case DASH:
//                s.append(consumeToken(DASH).image);
//                break;
//            case DIGITS:
//                s.append(consumeToken(DIGITS).image);
//                break;
//            case DOT:
//                s.append(consumeToken(DOT).image);
//                break;
//            case EQ:
//                s.append(consumeToken(EQ).image);
//                break;
//            case ESCAPED_CHAR:
//                s.append(consumeToken(ESCAPED_CHAR).image.substring(1));
//                break;
//            case IMAGE_LABEL:
//                s.append(consumeToken(IMAGE_LABEL).image);
//                break;
//            case GT:
//                s.append(consumeToken(GT).image);
//                break;
//            case LBRACK:
//                s.append(consumeToken(LBRACK).image);
//                break;
//            case LPAREN:
//                s.append(consumeToken(LPAREN).image);
//                break;
//            case LT:
//                s.append(consumeToken(LT).image);
//                break;
//            case RBRACK:
//                s.append(consumeToken(RBRACK).image);
//                break;
//            case UNDERSCORE:
//                s.append(consumeToken(UNDERSCORE).image);
//                break;
//            default:
//                if (!nextAfterSpace(RPAREN)) {
//                    switch (getNextTokenKind()) {
//                    case SPACE:
//                        s.append(consumeToken(SPACE).image);
//                        break;
//                    case TAB:
//                        consumeToken(TAB);
//                        s.append("    ");
//                        break;
//                    }
//                }
//            }
//        }
//        return s.toString();
//    }
//
//    private void strongMultiline() {
//        Strong strong = new Strong();
//        tree.openScope();
//        consumeToken(ASTERISK);
//        strongMultilineContent();
//        while (textAhead()) {
//            lineBreak();
//            strongMultilineContent();
//        }
//        consumeToken(ASTERISK);
//        tree.closeScope(strong);
//    }
//
//    private void strongMultilineContent() {
//        do {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else if (hasEmWithinStrongMultiline()) {
//                emWithinStrongMultiline();
//            } else {
//                switch (getNextTokenKind()) {
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                case UNDERSCORE:
//                    tree.addSingleValue(new Text(), consumeToken(UNDERSCORE));
//                    break;
//                }
//            }
//        } while (strongMultilineHasElementsAhead());
//    }
//
//    private void strongWithinEmMultiline() {
//        Strong strong = new Strong();
//        tree.openScope();
//        consumeToken(ASTERISK);
//        strongWithinEmMultilineContent();
//        while (textAhead()) {
//            lineBreak();
//            strongWithinEmMultilineContent();
//        }
//        consumeToken(ASTERISK);
//        tree.closeScope(strong);
//    }
//
//    private void strongWithinEmMultilineContent() {
//        do {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else {
//                switch (getNextTokenKind()) {
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                case UNDERSCORE:
//                    tree.addSingleValue(new Text(), consumeToken(UNDERSCORE));
//                    break;
//                }
//            }
//        } while (strongWithinEmMultilineHasElementsAhead());
//    }
//
//    private void strongWithinEm() {
//        Strong strong = new Strong();
//        tree.openScope();
//        consumeToken(ASTERISK);
//        do {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else {
//                switch (getNextTokenKind()) {
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                case UNDERSCORE:
//                    tree.addSingleValue(new Text(), consumeToken(UNDERSCORE));
//                    break;
//                }
//            }
//        } while (strongWithinEmHasElementsAhead());
//        consumeToken(ASTERISK);
//        tree.closeScope(strong);
//    }
//
//    private void emMultiline() {
//        Em em = new Em();
//        tree.openScope();
//        consumeToken(UNDERSCORE);
//        emMultilineContent();
//        while (textAhead()) {
//            lineBreak();
//            emMultilineContent();
//        }
//        consumeToken(UNDERSCORE);
//        tree.closeScope(em);
//    }
//
//    private void emMultilineContent() {
//        do {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && multilineAhead(BACKTICK)) {
//                codeMultiline();
//            } else if (hasStrongWithinEmMultilineAhead()) {
//                strongWithinEmMultiline();
//            } else {
//                switch (getNextTokenKind()) {
//                case ASTERISK:
//                    tree.addSingleValue(new Text(), consumeToken(ASTERISK));
//                    break;
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                }
//            }
//        } while (emMultilineContentHasElementsAhead());
//    }
//
//    private void emWithinStrongMultiline() {
//        Em em = new Em();
//        tree.openScope();
//        consumeToken(UNDERSCORE);
//        emWithinStrongMultilineContent();
//        while (textAhead()) {
//            lineBreak();
//            emWithinStrongMultilineContent();
//        }
//        consumeToken(UNDERSCORE);
//        tree.closeScope(em);
//    }
//
//    private void emWithinStrongMultilineContent() {
//        do {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else {
//                switch (getNextTokenKind()) {
//                case ASTERISK:
//                    tree.addSingleValue(new Text(), consumeToken(ASTERISK));
//                    break;
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                }
//            }
//        } while (emWithinStrongMultilineContentHasElementsAhaed());
//    }
//
//    private void emWithinStrong() {
//        Em em = new Em();
//        tree.openScope();
//        consumeToken(UNDERSCORE);
//        do {
//            if (hasTextAhead()) {
//                text();
//            } else if (modules.contains(Module.IMAGES) && hasImageAhead()) {
//                image();
//            } else if (modules.contains(Module.LINKS) && hasLinkAhead()) {
//                link();
//            } else if (modules.contains(Module.CODE) && hasCodeAhead()) {
//                code();
//            } else {
//                switch (getNextTokenKind()) {
//                case ASTERISK:
//                    tree.addSingleValue(new Text(), consumeToken(ASTERISK));
//                    break;
//                case BACKTICK:
//                    tree.addSingleValue(new Text(), consumeToken(BACKTICK));
//                    break;
//                case LBRACK:
//                    tree.addSingleValue(new Text(), consumeToken(LBRACK));
//                    break;
//                }
//            }
//        } while (emWithinStrongHasElementsAhead());
//        consumeToken(UNDERSCORE);
//        tree.closeScope(em);
//    }
//
//    private void codeMultiline() {
//        Code code = new Code();
//        tree.openScope();
//        consumeToken(BACKTICK);
//        codeText();
//        while (textAhead()) {
//            lineBreak();
//            whiteSpace();
//            while (getNextTokenKind() == GT) {
//                consumeToken(GT);
//                whiteSpace();
//            }
//            codeText();
//        }
//        consumeToken(BACKTICK);
//        tree.closeScope(code);
//    }
//
//    private void whiteSpace() {
//        while (getNextTokenKind() == SPACE || getNextTokenKind() == TAB) {
//            consumeToken(getNextTokenKind());
//        }
//    }
//
//    private boolean hasAnyBlockElementsAhead() {
//        try {
//            lookAhead = 1;
//            lastPosition = scanPosition = token;
//            return !scanMoreBlockElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean blockAhead(int blockBeginColumn) {
//        int quoteLevel;
//
//        if (getNextTokenKind() == EOL) {
//            Token t;
//            int i = 2;
//            quoteLevel = 0;
//            do {
//                quoteLevel = 0;
//                do {
//                    t = getToken(i++);
//                    if (t.kind == GT) {
//                        if (t.beginColumn == 1 && currentBlockLevel > 0 && currentQuoteLevel == 0) {
//                            return false;
//                        }
//                        quoteLevel++;
//                    }
//                } while (t.kind == GT || t.kind == SPACE || t.kind == TAB);
//                if (quoteLevel > currentQuoteLevel) {
//                    return true;
//                }
//                if (quoteLevel < currentQuoteLevel) {
//                    return false;
//                }
//            } while (t.kind == EOL);
//            return t.kind != EOF && (currentBlockLevel == 0 || t.beginColumn >= blockBeginColumn + 2);
//        }
//        return false;
//    }
//
//    private boolean multilineAhead(Integer token) {
//        if (getNextTokenKind() == token && getToken(2).kind != token && getToken(2).kind != EOL) {
//
//            for (int i = 2;; i++) {
//                Token t = getToken(i);
//                if (t.kind == token) {
//                    return true;
//                } else if (t.kind == EOL) {
//                    i = skip(i + 1, SPACE, TAB);
//                    int quoteLevel = newQuoteLevel(i);
//                    if (quoteLevel == currentQuoteLevel) {
//                        i = skip(i, SPACE, TAB, GT);
//                        if (getToken(i).kind == token || getToken(i).kind == EOL || getToken(i).kind == DASH
//                                || (getToken(i).kind == DIGITS && getToken(i + 1).kind == DOT)
//                                || (getToken(i).kind == BACKTICK && getToken(i + 1).kind == BACKTICK
//                                        && getToken(i + 2).kind == BACKTICK)
//                                || headingAhead(i)) {
//                            return false;
//                        }
//                    } else {
//                        return false;
//                    }
//                } else if (t.kind == EOF) {
//                    return false;
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean fencesAhead() {
//        if (getNextTokenKind() == EOL) {
//            int i = skip(2, SPACE, TAB, GT);
//            if (getToken(i).kind == BACKTICK && getToken(i + 1).kind == BACKTICK && getToken(i + 2).kind == BACKTICK) {
//                i = skip(i + 3, SPACE, TAB);
//                return getToken(i).kind == EOL || getToken(i).kind == EOF;
//            }
//        }
//        return false;
//    }
//
//    private boolean headingAhead(int offset) {
//        if (getToken(offset).kind == EQ) {
//            int heading = 1;
//            for (int i = (offset + 1);; i++) {
//                if (getToken(i).kind != EQ) {
//                    return true;
//                }
//                if (++heading > 6) {
//                    return false;
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean listItemAhead(int listBeginColumn, boolean ordered) {
//        if (getNextTokenKind() == EOL) {
//            for (int i = 2, eol = 1;; i++) {
//                Token t = getToken(i);
//
//                if (t.kind == EOL && ++eol > 2) {
//                    return false;
//                } else if (t.kind != SPACE && t.kind != TAB && t.kind != GT && t.kind != EOL) {
//                    if (ordered) {
//                        return (t.kind == DIGITS && getToken(i + 1).kind == DOT && t.beginColumn >= listBeginColumn);
//                    }
//                    return t.kind == DASH && t.beginColumn >= listBeginColumn;
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean textAhead() {
//        if (getNextTokenKind() == EOL && getToken(2).kind != EOL) {
//            int i = skip(2, SPACE, TAB);
//            int quoteLevel = newQuoteLevel(i);
//            if (quoteLevel == currentQuoteLevel || !modules.contains(Module.BLOCKQUOTES)) {
//                i = skip(i, SPACE, TAB, GT);
//
//                Token t = getToken(i);
//                return getToken(i).kind != EOL && !(modules.contains(Module.LISTS) && t.kind == DASH)
//                        && !(modules.contains(Module.LISTS) && t.kind == DIGITS && getToken(i + 1).kind == DOT)
//                        && !(getToken(i).kind == BACKTICK && getToken(i + 1).kind == BACKTICK
//                                && getToken(i + 2).kind == BACKTICK)
//                        && !(modules.contains(Module.HEADINGS) && headingAhead(i));
//            }
//        }
//        return false;
//    }
//
//    private boolean nextAfterSpace(Integer... tokens) {
//        int i = skip(1, SPACE, TAB);
//        return Arrays.asList(tokens).contains(getToken(i).kind);
//    }
//
//    private int newQuoteLevel(int offset) {
//        int quoteLevel = 0;
//        for (int i = offset;; i++) {
//            Token t = getToken(i);
//            if (t.kind == GT) {
//                quoteLevel++;
//            } else if (t.kind != SPACE && t.kind != TAB) {
//                return quoteLevel;
//            }
//
//        }
//    }
//
//    private int skip(int offset, Integer... tokens) {
//        for (int i = offset;; i++) {
//            Token t = getToken(i);
//            if (!Arrays.asList(tokens).contains(t.kind) || t.kind == EOF) {
//                return i;
//            }
//        }
//    }
//
//    private boolean hasOrderedListAhead() {
//        lookAhead = 2;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanToken(DIGITS) && !scanToken(DOT);
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasFencedCodeBlockAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanFencedCodeBlock();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean headingHasInlineElementsAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            Token xsp = scanPosition;
//            if (scanTextTokens()) {
//                scanPosition = xsp;
//                if (scanImage()) {
//                    scanPosition = xsp;
//                    if (scanLink()) {
//                        scanPosition = xsp;
//                        if (scanStrong()) {
//                            scanPosition = xsp;
//                            if (scanEm()) {
//                                scanPosition = xsp;
//                                if (scanCode()) {
//                                    scanPosition = xsp;
//                                    if (scanLooseChar()) {
//                                        return false;
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//            return true;
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasTextAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanTextTokens();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasImageAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanImage();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean blockQuoteHasEmptyLineAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanBlockQuoteEmptyLine();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasStrongAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanStrong();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasEmAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanEm();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasCodeAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanCode();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean blockQuoteHasAnyBlockElementseAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanMoreBlockElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasBlockQuoteEmptyLinesAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanBlockQuoteEmptyLines();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean listItemHasInlineElements() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanMoreBlockElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasInlineTextAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanTextTokens();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasInlineElementAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanInlineElement();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean imageHasAnyElements() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanImageElement();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasResourceTextAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanResourceElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean linkHasAnyElements() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanLinkElement();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasResourceUrlAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanResourceUrl();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean resourceHasElementAhead() {
//        lookAhead = 2;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanResourceElement();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean resourceTextHasElementsAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanResourceTextElement();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasEmWithinStrongMultiline() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanEmWithinStrongMultiline();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean strongMultilineHasElementsAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanStrongMultilineElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean strongWithinEmMultilineHasElementsAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanStrongWithinEmMultilineElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasImage() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanImage();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasLinkAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanLink();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean strongEmWithinStrongAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanEmWithinStrong();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean strongHasElements() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanStrongElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean strongWithinEmHasElementsAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanStrongWithinEmElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean hasStrongWithinEmMultilineAhead() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanStrongWithinEmMultiline();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean emMultilineContentHasElementsAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanEmMultilineContentElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean emWithinStrongMultilineContentHasElementsAhaed() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanEmWithinStrongMultilineContent();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean emHasStrongWithinEm() {
//        lookAhead = 2147483647;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanStrongWithinEm();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean emHasElements() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanEmElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean emWithinStrongHasElementsAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanEmWithinStrongElements();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean codeTextHasAnyTokenAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanCodeTextTokens();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean textHasTokensAhead() {
//        lookAhead = 1;
//        lastPosition = scanPosition = token;
//        try {
//            return !scanText();
//        } catch (LookaheadSuccess ls) {
//            return true;
//        }
//    }
//
//    private boolean scanLooseChar() {
//        Token xsp = scanPosition;
//        if (scanToken(ASTERISK)) {
//            scanPosition = xsp;
//            if (scanToken(BACKTICK)) {
//                scanPosition = xsp;
//                if (scanToken(LBRACK)) {
//                    scanPosition = xsp;
//                    return scanToken(UNDERSCORE);
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanText() {
//        Token xsp = scanPosition;
//        if (scanToken(BACKSLASH)) {
//            scanPosition = xsp;
//            if (scanToken(CHAR_SEQUENCE)) {
//                scanPosition = xsp;
//                if (scanToken(COLON)) {
//                    scanPosition = xsp;
//                    if (scanToken(DASH)) {
//                        scanPosition = xsp;
//                        if (scanToken(DIGITS)) {
//                            scanPosition = xsp;
//                            if (scanToken(DOT)) {
//                                scanPosition = xsp;
//                                if (scanToken(EQ)) {
//                                    scanPosition = xsp;
//                                    if (scanToken(ESCAPED_CHAR)) {
//                                        scanPosition = xsp;
//                                        if (scanToken(GT)) {
//                                            scanPosition = xsp;
//                                            if (scanToken(IMAGE_LABEL)) {
//                                                scanPosition = xsp;
//                                                if (scanToken(LPAREN)) {
//                                                    scanPosition = xsp;
//                                                    if (scanToken(LT)) {
//                                                        scanPosition = xsp;
//                                                        if (scanToken(RBRACK)) {
//                                                            scanPosition = xsp;
//                                                            if (scanToken(RPAREN)) {
//                                                                scanPosition = xsp;
//                                                                lookingAhead = true;
//                                                                semanticLookAhead = !nextAfterSpace(EOL, EOF);
//                                                                lookingAhead = false;
//                                                                return (!semanticLookAhead || scanWhitspaceToken());
//                                                            }
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanTextTokens() {
//        if (scanText()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanText()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanCodeTextTokens() {
//        Token xsp = scanPosition;
//        if (scanToken(ASTERISK)) {
//            scanPosition = xsp;
//            if (scanToken(BACKSLASH)) {
//                scanPosition = xsp;
//                if (scanToken(CHAR_SEQUENCE)) {
//                    scanPosition = xsp;
//                    if (scanToken(COLON)) {
//                        scanPosition = xsp;
//                        if (scanToken(DASH)) {
//                            scanPosition = xsp;
//                            if (scanToken(DIGITS)) {
//                                scanPosition = xsp;
//                                if (scanToken(DOT)) {
//                                    scanPosition = xsp;
//                                    if (scanToken(EQ)) {
//                                        scanPosition = xsp;
//                                        if (scanToken(ESCAPED_CHAR)) {
//                                            scanPosition = xsp;
//                                            if (scanToken(IMAGE_LABEL)) {
//                                                scanPosition = xsp;
//                                                if (scanToken(LT)) {
//                                                    scanPosition = xsp;
//                                                    if (scanToken(LBRACK)) {
//                                                        scanPosition = xsp;
//                                                        if (scanToken(RBRACK)) {
//                                                            scanPosition = xsp;
//                                                            if (scanToken(LPAREN)) {
//                                                                scanPosition = xsp;
//                                                                if (scanToken(GT)) {
//                                                                    scanPosition = xsp;
//                                                                    if (scanToken(RPAREN)) {
//                                                                        scanPosition = xsp;
//                                                                        if (scanToken(UNDERSCORE)) {
//                                                                            scanPosition = xsp;
//                                                                            lookingAhead = true;
//                                                                            semanticLookAhead = !nextAfterSpace(EOL,
//                                                                                    EOF);
//                                                                            lookingAhead = false;
//                                                                            return (!semanticLookAhead
//                                                                                    || scanWhitspaceToken());
//                                                                        }
//                                                                    }
//                                                                }
//                                                            }
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanCode() {
//        return scanToken(BACKTICK) || scanCodeTextTokensAhead() || scanToken(BACKTICK);
//    }
//
//    private boolean scanCodeMultiline() {
//        if (scanToken(BACKTICK) || scanCodeTextTokensAhead()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (hasCodeTextOnNextLineAhead()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanToken(BACKTICK);
//    }
//
//    private boolean scanCodeTextTokensAhead() {
//        if (scanCodeTextTokens()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanCodeTextTokens()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean hasCodeTextOnNextLineAhead() {
//        if (scanWhitespaceTokenBeforeEol()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanToken(GT)) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanCodeTextTokensAhead();
//    }
//
//    private boolean scanWhitspaceTokens() {
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanWhitspaceToken()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanWhitespaceTokenBeforeEol() {
//        return scanWhitspaceTokens() || scanToken(EOL);
//    }
//
//    private boolean scanEmWithinStrongElements() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    if (scanCode()) {
//                        scanPosition = xsp;
//                        if (scanToken(ASTERISK)) {
//                            scanPosition = xsp;
//                            if (scanToken(BACKTICK)) {
//                                scanPosition = xsp;
//                                return scanToken(LBRACK);
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanEmWithinStrong() {
//        if (scanToken(UNDERSCORE) || scanEmWithinStrongElements()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanEmWithinStrongElements()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanToken(UNDERSCORE);
//    }
//
//    private boolean scanEmElements() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    if (scanCode()) {
//                        scanPosition = xsp;
//                        if (scanStrongWithinEm()) {
//                            scanPosition = xsp;
//                            if (scanToken(ASTERISK)) {
//                                scanPosition = xsp;
//                                if (scanToken(BACKTICK)) {
//                                    scanPosition = xsp;
//                                    return scanToken(LBRACK);
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanEm() {
//        if (scanToken(UNDERSCORE) || scanEmElements()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanEmElements()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanToken(UNDERSCORE);
//    }
//
//    private boolean scanEmWithinStrongMultilineContent() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    if (scanCode()) {
//                        scanPosition = xsp;
//                        if (scanToken(ASTERISK)) {
//                            scanPosition = xsp;
//                            if (scanToken(BACKTICK)) {
//                                scanPosition = xsp;
//                                return scanToken(LBRACK);
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean hasNoEmWithinStrongMultilineContentAhead() {
//        if (scanEmWithinStrongMultilineContent()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanEmWithinStrongMultilineContent()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanEmWithinStrongMultiline() {
//        if (scanToken(UNDERSCORE) || hasNoEmWithinStrongMultilineContentAhead()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanWhitespaceTokenBeforeEol() || hasNoEmWithinStrongMultilineContentAhead()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanToken(UNDERSCORE);
//    }
//
//    private boolean scanEmMultilineContentElements() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    lookingAhead = true;
//                    semanticLookAhead = multilineAhead(BACKTICK);
//                    lookingAhead = false;
//                    if (!semanticLookAhead || scanCodeMultiline()) {
//                        scanPosition = xsp;
//                        if (scanStrongWithinEmMultiline()) {
//                            scanPosition = xsp;
//                            if (scanToken(ASTERISK)) {
//                                scanPosition = xsp;
//                                if (scanToken(BACKTICK)) {
//                                    scanPosition = xsp;
//                                    return scanToken(LBRACK);
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanStrongWithinEmElements() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    if (scanCode()) {
//                        scanPosition = xsp;
//                        if (scanToken(BACKTICK)) {
//                            scanPosition = xsp;
//                            if (scanToken(LBRACK)) {
//                                scanPosition = xsp;
//                                return scanToken(UNDERSCORE);
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanStrongWithinEm() {
//        if (scanToken(ASTERISK) || scanStrongWithinEmElements()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanStrongWithinEmElements()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanToken(ASTERISK);
//    }
//
//    private boolean scanStrongElements() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    lookingAhead = true;
//                    semanticLookAhead = multilineAhead(BACKTICK);
//                    lookingAhead = false;
//                    if (!semanticLookAhead || scanCodeMultiline()) {
//                        scanPosition = xsp;
//                        if (scanEmWithinStrong()) {
//                            scanPosition = xsp;
//                            if (scanToken(BACKTICK)) {
//                                scanPosition = xsp;
//                                if (scanToken(LBRACK)) {
//                                    scanPosition = xsp;
//                                    return scanToken(UNDERSCORE);
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanStrong() {
//        if (scanToken(ASTERISK) || scanStrongElements()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanStrongElements()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanToken(ASTERISK);
//    }
//
//    private boolean scanStrongWithinEmMultilineElements() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    if (scanCode()) {
//                        scanPosition = xsp;
//                        if (scanToken(BACKTICK)) {
//                            scanPosition = xsp;
//                            if (scanToken(LBRACK)) {
//                                scanPosition = xsp;
//                                return scanToken(UNDERSCORE);
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanForMoreStrongWithinEmMultilineElements() {
//        if (scanStrongWithinEmMultilineElements()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanStrongWithinEmMultilineElements()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanStrongWithinEmMultiline() {
//        if (scanToken(ASTERISK) || scanForMoreStrongWithinEmMultilineElements()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanWhitespaceTokenBeforeEol() || scanForMoreStrongWithinEmMultilineElements()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return scanToken(ASTERISK);
//    }
//
//    private boolean scanStrongMultilineElements() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    if (scanCode()) {
//                        scanPosition = xsp;
//                        if (scanEmWithinStrongMultiline()) {
//                            scanPosition = xsp;
//                            if (scanToken(BACKTICK)) {
//                                scanPosition = xsp;
//                                if (scanToken(LBRACK)) {
//                                    scanPosition = xsp;
//                                    return scanToken(UNDERSCORE);
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanResourceTextElement() {
//        Token xsp = scanPosition;
//        if (scanToken(ASTERISK)) {
//            scanPosition = xsp;
//            if (scanToken(BACKSLASH)) {
//                scanPosition = xsp;
//                if (scanToken(BACKTICK)) {
//                    scanPosition = xsp;
//                    if (scanToken(CHAR_SEQUENCE)) {
//                        scanPosition = xsp;
//                        if (scanToken(COLON)) {
//                            scanPosition = xsp;
//                            if (scanToken(DASH)) {
//                                scanPosition = xsp;
//                                if (scanToken(DIGITS)) {
//                                    scanPosition = xsp;
//                                    if (scanToken(DOT)) {
//                                        scanPosition = xsp;
//                                        if (scanToken(EQ)) {
//                                            scanPosition = xsp;
//                                            if (scanToken(ESCAPED_CHAR)) {
//                                                scanPosition = xsp;
//                                                if (scanToken(IMAGE_LABEL)) {
//                                                    scanPosition = xsp;
//                                                    if (scanToken(GT)) {
//                                                        scanPosition = xsp;
//                                                        if (scanToken(LBRACK)) {
//                                                            scanPosition = xsp;
//                                                            if (scanToken(LPAREN)) {
//                                                                scanPosition = xsp;
//                                                                if (scanToken(LT)) {
//                                                                    scanPosition = xsp;
//                                                                    if (scanToken(RBRACK)) {
//                                                                        scanPosition = xsp;
//                                                                        if (scanToken(UNDERSCORE)) {
//                                                                            scanPosition = xsp;
//                                                                            lookingAhead = true;
//                                                                            semanticLookAhead = !nextAfterSpace(RPAREN);
//                                                                            lookingAhead = false;
//                                                                            return (!semanticLookAhead
//                                                                                    || scanWhitspaceToken());
//                                                                        }
//                                                                    }
//                                                                }
//                                                            }
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanImageElement() {
//        Token xsp = scanPosition;
//        if (scanResourceElements()) {
//            scanPosition = xsp;
//            if (scanLooseChar()) {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanResourceTextElements() {
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanResourceTextElement()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanResourceUrl() {
//        return scanToken(LPAREN) || scanWhitspaceTokens() || scanResourceTextElements() || scanWhitspaceTokens()
//                || scanToken(RPAREN);
//    }
//
//    private boolean scanLinkElement() {
//        Token xsp = scanPosition;
//        if (scanImage()) {
//            scanPosition = xsp;
//            if (scanStrong()) {
//                scanPosition = xsp;
//                if (scanEm()) {
//                    scanPosition = xsp;
//                    if (scanCode()) {
//                        scanPosition = xsp;
//                        if (scanResourceElements()) {
//                            scanPosition = xsp;
//                            return scanLooseChar();
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanResourceElement() {
//        Token xsp = scanPosition;
//        if (scanToken(BACKSLASH)) {
//            scanPosition = xsp;
//            if (scanToken(COLON)) {
//                scanPosition = xsp;
//                if (scanToken(CHAR_SEQUENCE)) {
//                    scanPosition = xsp;
//                    if (scanToken(DASH)) {
//                        scanPosition = xsp;
//                        if (scanToken(DIGITS)) {
//                            scanPosition = xsp;
//                            if (scanToken(DOT)) {
//                                scanPosition = xsp;
//                                if (scanToken(EQ)) {
//                                    scanPosition = xsp;
//                                    if (scanToken(ESCAPED_CHAR)) {
//                                        scanPosition = xsp;
//                                        if (scanToken(IMAGE_LABEL)) {
//                                            scanPosition = xsp;
//                                            if (scanToken(GT)) {
//                                                scanPosition = xsp;
//                                                if (scanToken(LPAREN)) {
//                                                    scanPosition = xsp;
//                                                    if (scanToken(LT)) {
//                                                        scanPosition = xsp;
//                                                        if (scanToken(RPAREN)) {
//                                                            scanPosition = xsp;
//                                                            lookingAhead = true;
//                                                            semanticLookAhead = !nextAfterSpace(RBRACK);
//                                                            lookingAhead = false;
//                                                            return (!semanticLookAhead || scanWhitspaceToken());
//                                                        }
//                                                    }
//                                                }
//                                            }
//                                        }
//                                    }
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanResourceElements() {
//        if (scanResourceElement()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanResourceElement()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanLink() {
//        if (scanToken(LBRACK) || scanWhitspaceTokens() || scanLinkElement()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanLinkElement()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        if (scanWhitspaceTokens() || scanToken(RBRACK)) {
//            return true;
//        }
//        xsp = scanPosition;
//        if (scanResourceUrl()) {
//            scanPosition = xsp;
//        }
//        return false;
//    }
//
//    private boolean scanImage() {
//        if (scanToken(LBRACK) || scanWhitspaceTokens() || scanToken(IMAGE_LABEL) || scanImageElement()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanImageElement()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        if (scanWhitspaceTokens() || scanToken(RBRACK)) {
//            return true;
//        }
//        xsp = scanPosition;
//        if (scanResourceUrl()) {
//            scanPosition = xsp;
//        }
//        return false;
//    }
//
//    private boolean scanInlineElement() {
//        Token xsp = scanPosition;
//        if (scanTextTokens()) {
//            scanPosition = xsp;
//            if (scanImage()) {
//                scanPosition = xsp;
//                if (scanLink()) {
//                    scanPosition = xsp;
//                    lookingAhead = true;
//                    semanticLookAhead = multilineAhead(ASTERISK);
//                    lookingAhead = false;
//                    if (!semanticLookAhead || scanToken(ASTERISK)) {
//                        scanPosition = xsp;
//                        lookingAhead = true;
//                        semanticLookAhead = multilineAhead(UNDERSCORE);
//                        lookingAhead = false;
//                        if (!semanticLookAhead || scanToken(UNDERSCORE)) {
//                            scanPosition = xsp;
//                            lookingAhead = true;
//                            semanticLookAhead = multilineAhead(BACKTICK);
//                            lookingAhead = false;
//                            if (!semanticLookAhead || scanCodeMultiline()) {
//                                scanPosition = xsp;
//                                return scanLooseChar();
//                            }
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanParagraph() {
//        Token xsp;
//        if (scanInlineElement()) {
//            return true;
//        }
//        while (true) {
//            xsp = scanPosition;
//            if (scanInlineElement()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanForCodeLanguageElement() {
//        Token xsp = scanPosition;
//        if (scanToken(CHAR_SEQUENCE)) {
//            scanPosition = xsp;
//            if (scanToken(BACKTICK)) {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanForCodeLanguageElements() {
//        if (scanForCodeLanguageElement()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanForCodeLanguageElement()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanWhitspaceToken() {
//        Token xsp = scanPosition;
//        if (scanToken(SPACE)) {
//            scanPosition = xsp;
//            if (scanToken(TAB)) {
//                return true;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanFencedCodeBlock() {
//        if (scanToken(BACKTICK) || scanToken(BACKTICK) || scanToken(BACKTICK)) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanToken(BACKTICK)) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        if (scanWhitspaceTokens()) {
//            return true;
//        }
//        xsp = scanPosition;
//        if (scanForCodeLanguageElements()) {
//            scanPosition = xsp;
//        }
//        xsp = scanPosition;
//        if (scanToken(EOL) || scanWhitspaceTokens()) {
//            scanPosition = xsp;
//        }
//        return false;
//    }
//
//    private boolean scanBlockQuoteEmptyLines() {
//        return scanBlockQuoteEmptyLine() || scanToken(EOL);
//    }
//
//    private boolean scanBlockQuoteEmptyLine() {
//        if (scanToken(EOL) || scanWhitspaceTokens() || scanToken(GT) || scanWhitspaceTokens()) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanToken(GT) || scanWhitspaceTokens()) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanForHeadersigns() {
//        if (scanToken(EQ)) {
//            return true;
//        }
//        Token xsp;
//        while (true) {
//            xsp = scanPosition;
//            if (scanToken(EQ)) {
//                scanPosition = xsp;
//                break;
//            }
//        }
//        return false;
//    }
//
//    private boolean scanMoreBlockElements() {
//        Token xsp = scanPosition;
//        lookingAhead = true;
//        semanticLookAhead = headingAhead(1);
//        lookingAhead = false;
//        if (!semanticLookAhead || scanForHeadersigns()) {
//            scanPosition = xsp;
//            if (scanToken(GT)) {
//                scanPosition = xsp;
//                if (scanToken(DASH)) {
//                    scanPosition = xsp;
//                    if (scanToken(DIGITS) || scanToken(DOT)) {
//                        scanPosition = xsp;
//                        if (scanFencedCodeBlock()) {
//                            scanPosition = xsp;
//                            return scanParagraph();
//                        }
//                    }
//                }
//            }
//        }
//        return false;
//    }
//
//    private boolean scanToken(int kind) {
//        if (scanPosition == lastPosition) {
//            lookAhead--;
//            if (scanPosition.next == null) {
//                lastPosition = scanPosition = scanPosition.next = tm.getNextToken();
//            } else {
//                lastPosition = scanPosition = scanPosition.next;
//            }
//        } else {
//            scanPosition = scanPosition.next;
//        }
//        if (scanPosition.kind != kind) {
//            return true;
//        }
//        if (lookAhead == 0 && scanPosition == lastPosition) {
//            throw lookAheadSuccess;
//        }
//        return false;
//    }
//
//    private int getNextTokenKind() {
//        if (nextTokenKind != -1) {
//            return nextTokenKind;
//        } else if ((nextToken = token.next) == null) {
//            token.next = tm.getNextToken();
//            return (nextTokenKind = token.next.kind);
//        }
//        return (nextTokenKind = nextToken.kind);
//    }
//
//    private Token consumeToken(int kind) {
//        Token old = token;
//        if (token.next != null) {
//            token = token.next;
//        } else {
//            token = token.next = tm.getNextToken();
//        }
//        nextTokenKind = -1;
//        if (token.kind == kind) {
//            return token;
//        }
//        token = old;
//        return token;
//    }
//
//    private Token getToken(int index) {
//        Token t = lookingAhead ? scanPosition : token;
//        for (int i = 0; i < index; i++) {
//            if (t.next != null) {
//                t = t.next;
//            } else {
//                t = t.next = tm.getNextToken();
//            }
//        }
//        return t;
//    }
//
//    public void setModules(Module... modules) {
//        this.modules = Arrays.asList(modules);
//    }
//
//}

'use strict';

koara.StringReader = function(text) {
	this.index = 0;
	this.text = text;
}

koara.StringReader.prototype.read = function(buffer, offset, length) {
	if(this.text.substr(this.index).length > 0) {
		var charactersRead = 0;
		for(var i=0; i < length; i++) {
			var c = this.text.substr(this.index + i, 1);
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
koara.TokenManager = function() {
}
koara.Document = function() {}

koara.Document.prototype.accept = function(renderer) {
   renderer.visitDocument(this);
}
koara.Node = function() {}
//    private Node parent;
//    private Node[] children;
//    private Object value;

koara.Node.prototype.add = function(n, i) {
	if (this.children == null) {
        this.children = new koara.Node[i + 1];
    }
    this.children[i] = n;
}

koara.Node.prototype.childrenAccept = function(renderer) {
	if (this.children != null) {
        for (var i = 0; i < this.children.length; ++i) {
            this.children[i].accept(renderer);
        }
    }
}

//    public abstract void accept(Renderer renderer);

koara.Node.prototype.getChildren = function() {
	return this.children;
}

koara.Node.prototype.getParent = function() {
	return this.parent;
}

koara.Node.prototype.setParent = function(parent) {
	this.parent = parent;
}

koara.Node.prototype.getValue = function() {
	return this.value;
}

koara.Node.prototype.setValue = function(value) {
	this.value = value;
}
koara.Html5Renderer = function() {
	this.level = 0;
//	private Stack<Integer> listSequence = new Stack<Integer>();
}

koara.Html5Renderer.prototype.visitDocument = function(node) {
	this.out = '';
	node.childrenAccept(this);
}



//	
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
//	public void visit(Paragraph node) {
//		if(node.isNested() && (node.getParent() instanceof ListItem) && node.isSingleChild()) {
//			node.childrenAccept(this);
//		} else {
//			out.append(indent() + "<p>");
//			node.childrenAccept(this);
//			out.append("</p>\n");
//			if(!node.isNested()) { out.append("\n"); }
//		}
//	}
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
//	public void visit(Text node) {
//		out.append(escape(node.getValue().toString()));
//	}
//	
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
//	public String indent() {
//		int repeat = level * 2;
//	    final char[] buf = new char[repeat];
//		for (int i = repeat - 1; i >= 0; i--) {
//		 buf[i] = ' ';
//		} 
//		return new String(buf);
//	}
//	
//	public String getOutput() {
//        return out.toString().trim();
//    }
//
//}