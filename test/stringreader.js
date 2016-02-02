'use strict';

var koara = require('../koara.js');
var buffer;

describe("CharStream tests", function() {
	
	beforeEach(function() {
	   buffer = [];
    });
	
	it("Test Read", function() {
      var reader = koara.StringReader('abcd');
      expect(reader.read(buffer, 0, 4)).toEqual(4);
      expect(buffer[0]).toEqual('a');
      expect(buffer[1]).toEqual('b');
      expect(buffer[2]).toEqual('c');
      expect(buffer[3]).toEqual('d');
      expect(buffer.length).toEqual(4);
      expect(reader.read(buffer, 0, 4)).toEqual(-1);
    });
	
	it("Test Read Part Of String", function() {
      var reader = koara.StringReader('abcd');
      expect(reader.read(buffer, 0, 2)).toEqual(2);
      expect(buffer[0]).toEqual('a');
      expect(buffer[1]).toEqual('b');
      expect(buffer.length).toEqual(2);
	});
	
});



//	public function testReadWithOffsetPartOfString() {
//		$reader = new StringReader('abcd');
//		$this->assertEquals(4, $reader->read($this->buffer, 2, 4));
//		$this->assertFalse(array_key_exists(0, $this->buffer));
//		$this->assertFalse(array_key_exists(1, $this->buffer));
//		$this->assertEquals('a', $this->buffer[2]);
//		$this->assertEquals('b', $this->buffer[3]);
//	 }
//	
//	 public function testReadWithOffsetTooLargePartOfString() {
//	 	$reader = new StringReader('abcd');
//	 	$this->assertEquals(4, $reader->read($this->buffer, 6, 4));
//	 	$this->assertFalse(array_key_exists(0, $this->buffer));
//	 	$this->assertFalse(array_key_exists(1, $this->buffer));
//	 	$this->assertFalse(array_key_exists(2, $this->buffer));
//	 	$this->assertFalse(array_key_exists(3, $this->buffer));
//	 }
//	
//	public function testReadUntilEof() {
//		$reader = new StringReader('abcd');
//		$this->assertEquals(2, $reader->read($this->buffer, 0, 2));
//		$this->assertEquals('a', $this->buffer[0]);
//		$this->assertEquals('b', $this->buffer[1]);
//	
//		$this->assertEquals(2, $reader->read($this->buffer, 0, 3));
//		$this->assertEquals('c', $this->buffer[0]);
//		$this->assertEquals('d', $this->buffer[1]);
//	
//		$this->assertEquals(-1, $reader->read($this->buffer, 0, 2));
//	}
//	
//	 public function testReadWithUnicode() {
//	 	$reader = new StringReader('ðinæ');
//	 	$this->assertEquals(4, $reader->read($this->buffer, 0, 4));
//	 	$this->assertEquals('ð', $this->buffer[0]);
//	 	$this->assertEquals('i', $this->buffer[1]);
//	 	$this->assertEquals('n', $this->buffer[2]);
//	 	$this->assertEquals('æ', $this->buffer[3]);
//	 	$this->assertEquals(4, count($this->buffer));
//	 }
//	
//	 public function testReadWithUnicodePartOfString() {
//	 	$reader = new StringReader('ðinæ');
//	 	$this->assertEquals(2, $reader->read($this->buffer, 0, 2));
//	 	$this->assertEquals('ð', $this->buffer[0]);
//	 	$this->assertEquals('i', $this->buffer[1]);
//	 	$this->assertEquals(2, count($this->buffer));
//	 }
//	
//	 public function testReadWithUnicodeAndOffsetPartOfString() {
//	 	$reader = new StringReader('ðinæ');
//	 	$this->assertEquals(4, $reader->read($this->buffer, 2, 4));
//	 	$this->assertFalse(array_key_exists(0, $this->buffer));
//	 	$this->assertFalse(array_key_exists(1, $this->buffer));
//	 	$this->assertEquals('ð', $this->buffer[2]);
//	 	$this->assertEquals('i', $this->buffer[3]);
//	 }
//	
//	 public function testReadWithUnicodeAndOffsetTooLargePartOfString() {
//	 	$reader = new StringReader('ðinæ');
//	 	$this->assertEquals(4, $reader->read($this->buffer, 6, 4));
//	 	$this->assertFalse(array_key_exists(0, $this->buffer));
//	 	$this->assertFalse(array_key_exists(1, $this->buffer));
//	 	$this->assertFalse(array_key_exists(2, $this->buffer));
//	 	$this->assertFalse(array_key_exists(3, $this->buffer));
//	 }
//	
//	 public function testReadWithUnicodeUntilEof() {
//	 	$reader = new StringReader('ðinæ');
//	 	$this->assertEquals(3, $reader->read($this->buffer, 0, 3));
//	 	$this->assertEquals('ð', $this->buffer[0]);
//	 	$this->assertEquals('i', $this->buffer[1]);
//		
//	 	$this->assertEquals(1, $reader->read($this->buffer, 0, 3));
//	 	$this->assertEquals('æ', $this->buffer[0]);
//		
//	 	$this->assertEquals(-1, $reader->read($this->buffer, 0, 2));
//	 }