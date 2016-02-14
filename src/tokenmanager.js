koara.TokenManager = function(stream) {
	this.EOF = 0;
	this.ASTERISK = 1;
	this.BACKSLASH = 2;
	this.BACKTICK = 3;
	this.CHAR_SEQUENCE = 4;
	this.COLON = 5;
	this.DASH = 6;
	this.DIGITS = 7;
	this.DOT = 8;
	
	this.EQ = 10;
	this.ESCAPED_CHAR = 11;
	this.GT = 12;
	this.IMAGE_LABEL = 13;
	this.LBRACK = 14;
	this.LPAREN = 15;
	this.LT = 16;
	this.RBRACK = 17;
	this.RPAREN = 18;
	this.SPACE = 19;
	this.TAB = 20;
	this.UNDERSCORE = 21;
	
	this.cs = stream;
	this.jjrounds = [];
	this.jjstateSet = [];
	this.jjnextStates = [2, 3, 5];
}

koara.TokenManager.prototype = {
	constructor: koara.TokenManager,
	
	EOL: 9,
	
	getNextToken: function() {
		try {
			curPos = 0;	
			while(true) {
				try {
					curChar = this.cs.beginToken();
				} catch(e) {
					this.matchedKind = 0;
                    this.matchedPos = -1;
                    return this.fillToken();
				}
			}
		} catch(e) {
			return null;
		}
	}
		
}



//    public Token getNextToken() {
//        try {
//            int curPos = 0;
//            while (true) {
//                try {
//                    curChar = cs.beginToken();
//                } catch (java.io.IOException e) {
//                    matchedKind = 0;
//                    matchedPos = -1;
//                    return fillToken();
//                }
//
//                matchedKind = Integer.MAX_VALUE;
//                matchedPos = 0;
//                curPos = moveStringLiteralDfa0_0();
//                if (matchedKind != Integer.MAX_VALUE) {
//                    if (matchedPos + 1 < curPos) {
//                        cs.backup(curPos - matchedPos - 1);
//                    }
//                    return fillToken();
//                }
//            }
//        } catch (IOException e) {
//            return null;
//        }
//    }
//
//    private Token fillToken() {
//        return new Token(matchedKind, cs.getBeginLine(), cs.getBeginColumn(), cs.getEndLine(), cs.getEndColumn(),
//                cs.getImage());
//    }
//
//    private int moveStringLiteralDfa0_0() throws IOException {
//        switch (curChar) {
//        case 9:
//            return startNfaWithStates(0, TAB, 8);
//        case 32:
//            return startNfaWithStates(0, SPACE, 8);
//        case 40:
//            return stopAtPos(0, LPAREN);
//        case 41:
//            return stopAtPos(0, RPAREN);
//        case 42:
//            return stopAtPos(0, ASTERISK);
//        case 45:
//            return stopAtPos(0, DASH);
//        case 46:
//            return stopAtPos(0, DOT);
//        case 58:
//            return stopAtPos(0, COLON);
//        case 60:
//            return stopAtPos(0, LT);
//        case 61:
//            return stopAtPos(0, EQ);
//        case 62:
//            return stopAtPos(0, GT);
//        case 73:
//            return moveStringLiteralDfa1_0(0x2000L);
//        case 91:
//            return stopAtPos(0, LBRACK);
//        case 92:
//            return startNfaWithStates(0, BACKSLASH, 7);
//        case 93:
//            return stopAtPos(0, RBRACK);
//        case 95:
//            return stopAtPos(0, UNDERSCORE);
//        case 96:
//            return stopAtPos(0, BACKTICK);
//        case 105:
//            return moveStringLiteralDfa1_0(0x2000L);
//        default:
//            return moveNfa(6, 0);
//        }
//    }
//
//    private int startNfaWithStates(int pos, int kind, int state) {
//        matchedKind = kind;
//        matchedPos = pos;
//        try {
//            curChar = cs.readChar();
//        } catch (IOException e) {
//            return pos + 1;
//        }
//        return moveNfa(state, pos + 1);
//    }
//
//    private int stopAtPos(int pos, int kind) {
//        matchedKind = kind;
//        matchedPos = pos;
//        return pos + 1;
//    }
//
//    private int moveStringLiteralDfa1_0(long active) throws IOException {
//        curChar = cs.readChar();
//        if (curChar == 77 || curChar == 109) {
//            return moveStringLiteralDfa2_0(active, 0x2000L);
//        }
//        return startNfa(0, active);
//    }
//
//    private int moveStringLiteralDfa2_0(long old, long active) throws IOException {
//        curChar = cs.readChar();
//        if (curChar == 65 || curChar == 97) {
//            return moveStringLiteralDfa3_0(active, 0x2000L);
//        }
//        return startNfa(1, active);
//
//    }
//
//    private int moveStringLiteralDfa3_0(long old, long active) throws IOException {
//        curChar = cs.readChar();
//        if (curChar == 71 || curChar == 103) {
//            return moveStringLiteralDfa4_0(active, 0x2000L);
//        }
//        return startNfa(2, active);
//    }
//
//    private int moveStringLiteralDfa4_0(long old, long active) throws IOException {
//        curChar = cs.readChar();
//        if (curChar == 69 || curChar == 101) {
//            return moveStringLiteralDfa5_0(active, 0x2000L);
//        }
//        return startNfa(3, active);
//    }
//
//    private int moveStringLiteralDfa5_0(long old, long active) throws IOException {
//        curChar = cs.readChar();
//        if (curChar == 58 && ((active & 0x2000L) != 0L)) {
//            return stopAtPos(5, 13);
//        }
//        return startNfa(4, active);
//    }
//
//    private int startNfa(int pos, long active) {
//        return moveNfa(stopStringLiteralDfa(pos, active), pos + 1);
//    }
//
//    private int moveNfa(int startState, int curPos) {
//    	int startsAt = 0;
//        jjnewStateCnt = 8;
//        int i = 1;
//        jjstateSet[0] = startState;
//        int kind = 0x7fffffff;
//        while (true) {
//            if (++round == 0x7fffffff) {
//                round = 0x80000001;
//            }            
//            if (curChar < 64) {
//                long l = 1L << curChar;
//                do {
//                    switch (jjstateSet[--i]) {
//                    case 6:
//                        if ((0x880098feffffd9ffL & l) != 0L) {
//                            if (kind > 4) {
//                                kind = 4;
//                            }
//                            checkNAdd(0);
//                        } else if ((0x3ff000000000000L & l) != 0L) {
//                            if (kind > 7) {
//                                kind = 7;
//                            }
//                            checkNAdd(1);
//                        } else if ((0x2400L & l) != 0L) {
//                            if (kind > 9) {
//                                kind = 9;
//                            }
//                        } else if ((0x100000200L & l) != 0L) {
//                            checkNAddStates(0, 2);
//                        }
//                        if (curChar == 13) {
//                            jjstateSet[jjnewStateCnt++] = 4;
//                        }
//                        break;
//                    case 8:
//                        if ((0x2400L & l) != 0L) {
//                            if (kind > 9) {
//                                kind = 9;
//                            }
//                        } else if ((0x100000200L & l) != 0L) {
//                            checkNAddStates(0, 2);
//                        }
//                        if (curChar == 13) {
//                            jjstateSet[jjnewStateCnt++] = 4;
//                        }
//                        break;
//                    case 0:
//                        if ((0x880098feffffd9ffL & l) != 0L) {
//                            kind = 4;
//                            checkNAdd(0);
//                        }
//                        break;
//                    case 1:
//                        if ((0x3ff000000000000L & l) != 0L) {
//                            if (kind > 7) {
//                                kind = 7;
//                            }
//                            checkNAdd(1);
//                        }
//                        break;
//                    case 2:
//                        if ((0x100000200L & l) != 0L) {
//                            checkNAddStates(0, 2);
//                        }
//                        break;
//                    case 3:
//                        if ((0x2400L & l) != 0L && kind > 9) {
//                            kind = 9;
//                        }
//                        break;
//                    case 4:
//                        if (curChar == 10 && kind > 9) {
//                            kind = 9;
//                        }
//                        break;
//                    case 5:
//                        if (curChar == 13) {
//                            jjstateSet[jjnewStateCnt++] = 4;
//                        }
//                        break;
//                    case 7:
//                        if ((0x77ff670000000000L & l) != 0L && kind > 11) {
//                            kind = 11;
//                        }
//                        break;
//                    }
//                } while (i != startsAt);
//            } else if (curChar < 128) {
//                long l = 1L << (curChar & 077);
//                do {
//                    switch (jjstateSet[--i]) {
//                    case 6:
//                        if (l != 0L) {
//                            if (kind > 4) {
//                                kind = 4;
//                            }
//                            checkNAdd(0);
//                        } else if (curChar == 92) {
//                            jjstateSet[jjnewStateCnt++] = 7;
//                        }
//                        break;
//                    case 0:
//                        if ((0xfffffffe47ffffffL & l) != 0L) {
//                            kind = 4;
//                            checkNAdd(0);
//                        }
//                        break;
//                    case 7:
//                        if ((0x1b8000000L & l) != 0L && kind > 11) {
//                            kind = 11;
//                        }
//                        break;
//                    }
//                } while (i != startsAt);
//            } else {
//                do {
//                    switch (jjstateSet[--i]) {
//                    case 6:
//                    case 0:
//                        if (kind > 4) {
//                            kind = 4;
//                        }
//                        checkNAdd(0);
//                        break;
//                    }
//                } while (i != startsAt);
//            }
//            if (kind != 0x7fffffff) {
//                matchedKind = kind;
//                matchedPos = curPos;
//                kind = 0x7fffffff;
//            }
//            ++curPos;
//            
//            
//            if ((i = jjnewStateCnt) == (startsAt = 8 - (jjnewStateCnt = startsAt))) {
//                return curPos;
//            }
//            try {
//                curChar = cs.readChar();
//            } catch (IOException e) {
//                return curPos;
//            }
//        }
//    }
//
//    private void checkNAddStates(int start, int end) {
//        do {
//            checkNAdd(jjnextStates[start]);
//        } while (start++ != end);
//    }
//
//    private void checkNAdd(int state) {
//        if (jjrounds[state] != round) {
//            jjstateSet[jjnewStateCnt++] = state;
//            jjrounds[state] = round;
//        }
//    }
//
//    private int stopStringLiteralDfa(int pos, long active) {
//        if (pos == 0) {
//            if ((active & 0x2000L) != 0L) {
//                matchedKind = 4;
//                return 0;
//            } else if ((active & 0x180000L) != 0L) {
//                return 8;
//            } else if ((active & 0x4L) != 0L) {
//                return 7;
//            }
//        } else if (pos == 1 && (active & 0x2000L) != 0L) {
//            matchedKind = 4;
//            matchedPos = 1;
//            return 0;
//        } else if (pos == 2 && (active & 0x2000L) != 0L) {
//            matchedKind = 4;
//            matchedPos = 2;
//            return 0;
//        } else if (pos == 3 && (active & 0x2000L) != 0L) {
//            matchedKind = 4;
//            matchedPos = 3;
//            return 0;
//        } else if (pos == 4 && (active & 0x2000L) != 0L) {
//            matchedKind = 4;
//            matchedPos = 4;
//            return 0;
//        }
//        return -1;
//    }
//
//}
