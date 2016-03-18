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

