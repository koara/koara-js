"use strict";

function Document() {
    Node.call(this);
}

Document.prototype = new Node();
Document.prototype.constructor = Document;
Document.prototype.accept = function(renderer) {
    renderer.visitDocument(this);
};
