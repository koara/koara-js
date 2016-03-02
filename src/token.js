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