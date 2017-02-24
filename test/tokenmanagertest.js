var koara = require('../lib/koara');

describe("Tokenmanager", function () {

    it("Test Eof", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('')));
        var token = tm.getNextToken();
        expect(tm.EOF).toEqual(token.kind);
    });

    it("Test Asterisk", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('*')));
        var token = tm.getNextToken();
        expect(tm.ASTERISK).toEqual(token.kind);
        expect('*').toEqual(token.image);
    });

    it("Test Backslash", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('\\')));
        var token = tm.getNextToken();
        expect(tm.BACKSLASH).toEqual(token.kind);
        expect('\\').toEqual(token.image);
    });

    it("Test Backtick", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('`')));
        var token = tm.getNextToken();
        expect(tm.BACKTICK).toEqual(token.kind);
        expect('`').toEqual(token.image);
    });

    it("Test CharSequence LowerCase", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('m')));
        var token = tm.getNextToken();
        expect(tm.CHAR_SEQUENCE).toEqual(token.kind);
        expect('m').toEqual(token.image);
    });
    
    it("Test CharSequence UpperCase", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('C')));
        var token = tm.getNextToken();
        expect(tm.CHAR_SEQUENCE).toEqual(token.kind);
        expect('C').toEqual(token.image);
    });

    it("Test Colon", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader(':')));
        var token = tm.getNextToken();
        expect(tm.COLON).toEqual(token.kind);
        expect(':').toEqual(token.image);
    });

    it("Test Dash", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('-')));
        var token = tm.getNextToken();
        expect(tm.DASH).toEqual(token.kind);
        expect('-').toEqual(token.image);
    });

    it("Test Digits", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('4')));
        var token = tm.getNextToken();
        expect(tm.DIGITS).toEqual(token.kind);
        expect('4').toEqual(token.image);
    });

    it("Test Dot", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('.')));
        var token = tm.getNextToken();
        expect(tm.DOT).toEqual(token.kind);
        expect('.').toEqual(token.image);
    });

    it("Test Eol", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader("\n")));
        var token = tm.getNextToken();
        expect(tm.EOL).toEqual(token.kind);
        expect("\n").toEqual(token.image);
    });

    it("Test Eol With Spaces", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader("  \n")));
        var token = tm.getNextToken();
        expect(tm.EOL).toEqual(token.kind);
        expect("  \n").toEqual(token.image);
    });

    
    it("Test Eq", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('=')));
        var token = tm.getNextToken();
        expect(tm.EQ).toEqual(token.kind);
        expect("=").toEqual(token.image);
    });

    it("Test EscapedChar", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('\\*')));
        var token = tm.getNextToken();
        expect(tm.ESCAPED_CHAR).toEqual(token.kind);
        expect("\\*").toEqual(token.image);
    });

    it("Test Gt", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('>')));
        var token = tm.getNextToken();
        expect(tm.GT).toEqual(token.kind);
        expect('>').toEqual(token.image);
    });

    it("Test ImageLabel", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('image:')));
        var token = tm.getNextToken();
        expect(tm.IMAGE_LABEL).toEqual(token.kind);
        expect('image:').toEqual(token.image);
    });

    it("Test LBrack", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('[')));
        var token = tm.getNextToken();
        expect(tm.LBRACK).toEqual(token.kind);
        expect('[').toEqual(token.image);
    });

    it("Test LParen", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('(')));
        var token = tm.getNextToken();
        expect(tm.LPAREN).toEqual(token.kind);
        expect('(').toEqual(token.image);
    });

    it("Test Lt", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('<')));
        var token = tm.getNextToken();
        expect(tm.LT).toEqual(token.kind);
        expect('<').toEqual(token.image);
    });

    it("Test Rbrack", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader(']')));
        var token = tm.getNextToken();
        expect(tm.RBRACK).toEqual(token.kind);
        expect(']').toEqual(token.image);
    });

    it("Test Rparen", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader(')')));
        var token = tm.getNextToken();
        expect(tm.RPAREN).toEqual(token.kind);
        expect(')').toEqual(token.image);
    });

    it("Test Space", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader(' ')));
        var token = tm.getNextToken();
        expect(tm.SPACE).toEqual(token.kind);
        expect(' ').toEqual(token.image);
    });

    it("Test Tab", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader("\t")));
        var token = tm.getNextToken();
        expect(tm.TAB).toEqual(token.kind);
        expect("\t").toEqual(token.image);
    });

    it("Test Underscore", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('_')));
        var token = tm.getNextToken();
        expect(tm.UNDERSCORE).toEqual(token.kind);
        expect('_').toEqual(token.image);
    });
    
    it("Test Linebreak", function () {
        var tm = new koara.TokenManager(new koara.CharStream(new koara.StringReader('a\nb')));
        var token = tm.getNextToken();
        expect(tm.CHAR_SEQUENCE).toEqual(token.kind);
        expect('a').toEqual(token.image);
        token = tm.getNextToken();
        expect(tm.EOL).toEqual(token.kind);
        expect('\n').toEqual(token.image);
        token = tm.getNextToken();
        expect(tm.CHAR_SEQUENCE).toEqual(token.kind);
        expect('b').toEqual(token.image);
    });

});