[![Koara](http://www.koara.io/logo.png)](http://www.koara.io)

[![Build Status](https://img.shields.io/travis/koara/koara-js.svg)](https://travis-ci.org/koara/koara-js)
[![Coverage Status](https://img.shields.io/coveralls/koara/koara-js.svg)](https://coveralls.io/github/koara/koara-js?branch=master)
[![Latest Version](https://img.shields.io/npm/v/koara.svg)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/koara/koara-js/blob/master/LICENSE)

# Koara-js
[Koara](http://www.koara.io) is a modular lightweight markup language. This project is the core koara parser written in Javascript.  
If you are interested in converting koara to a specific outputFormat, please look the [Related Projects](#related-projects) section.

## Getting started
- Download [ZIP file]()
- Npm

  ```bash
  npm install koara --save-dev
  ```
  
- Bower

  ```xml
  bower install koara
  ```

## Usage
```js
var koara = require('koara');
var parser = new koara.Parser();
var result1 = parser.parse("Hello World!"); // parse a string
```

## Configuration
You can configure the Parser:

-  **parser.setModules(modules)**  
   Default:	`["paragraphs", "headings", "lists", "links", "images", "formatting", "blockquotes", "code"]`
   
   Specify which parts of the syntax are allowed to be parsed. The rest will render as plain text.

## Related Projects

- [koara / koara-js-html](http://www.github.com/koara/koara-js-html): Koara to Html renderer written in Javascript
- [koara / koara-js-xml](http://www.github.com/koara/koara-js-html): Koara to Xml renderer written in Javascript