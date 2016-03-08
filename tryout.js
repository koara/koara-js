(function(exports) {

	function Node() {
		this.children = [];
	}
	
	Node.prototype = {
		add : function(p) {
			this.children.push(p);
		}
	};
	
	function Document() {
		Node.call(this);
	}
	
	Document.prototype = new Node();
	Document.prototype.constructor = Document;

	exports.Node = Node;
	exports.Document = Document;

})(typeof exports === 'undefined' ? this['koara'] = {} : exports);