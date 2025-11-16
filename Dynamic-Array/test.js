import assert from "assert";
import DynamicArray from "./DynamicArray.js";
import { duplexPair } from "stream";

describe("DynamicArray", function () {
  describe("Array operations", function () {
    it("should have an add( item ) method to add an element", function () {
      const dynamicArray = new DynamicArray();
      const input = "A";
      dynamicArray.add(input);
    });
    it("should have a get( index ) method to get an element", function () {
      const dynamicArray = new DynamicArray();
      const input = "A";
      dynamicArray.add(input);
      const output = dynamicArray.get(0);
      assert.equal(output, input);
    });
    it("should be possible to add and get five elements", function () {
      const dynamicArray = new DynamicArray();
      dynamicArray.add("A");
      dynamicArray.add("B");
      dynamicArray.add("C");
      dynamicArray.add("D");
      dynamicArray.add("E");

      assert.equal(dynamicArray.get(0), "A");
      assert.equal(dynamicArray.get(1), "B");
      assert.equal(dynamicArray.get(2), "C");
      assert.equal(dynamicArray.get(3), "D");
      assert.equal(dynamicArray.get(4), "E");
    });
    it("should keep track of it's size without growing", function () {
      const dynamicArray = new DynamicArray(5);
      assert.equal(dynamicArray.size(), 0);
      dynamicArray.add("A");
      assert.equal(dynamicArray.size(), 1);
      dynamicArray.add("B");
      assert.equal(dynamicArray.size(), 2);
      dynamicArray.add("C");
      assert.equal(dynamicArray.size(), 3);
      dynamicArray.add("D");
      assert.equal(dynamicArray.size(), 4);
      dynamicArray.add("E");
      assert.equal(dynamicArray.size(), 5);
    });
    it("should also keep track of it's size with growing", function () {
      const dynamicArray = new DynamicArray(3);
      assert.equal(dynamicArray.size(), 0);
      dynamicArray.add("A");
        assert.equal(dynamicArray.size(), 1);
      dynamicArray.add("B");   
        assert.equal(dynamicArray.size(), 2);
      dynamicArray.add("C");
        assert.equal(dynamicArray.size(), 3);
      dynamicArray.add("D");
        assert.equal(dynamicArray.size(), 4);
      dynamicArray.add("E");
        assert.equal(dynamicArray.size(), 5);
    
    });
    it("should have a set( index, item ) method to replace an element", function() {
      const dynamicArray = new DynamicArray();
      dynamicArray.add("A");
      const size = dynamicArray.size();

      dynamicArray.set(0,"B");
      assert.equal(dynamicArray.get(0), "B");
      assert.equal(dynamicArray.size(), 1);
    })
  });
  describe("Capacity and growth", function() {
    it("should have a capacity() method", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      assert.equal(dynamicArray.capacity(), CAPACITY);
    });
    it("should keep the capacity until full", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      assert.equal(dynamicArray.capacity(), CAPACITY);
      dynamicArray.add('B');
      assert.equal(dynamicArray.capacity(), CAPACITY);
      dynamicArray.add('C');
      assert.equal(dynamicArray.capacity(), CAPACITY);
      dynamicArray.add('D');
      assert.equal(dynamicArray.capacity(), CAPACITY);
      dynamicArray.add('E');
      assert.equal(dynamicArray.capacity(), CAPACITY);
    } );
    it("should grow when exceeding capacity", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      dynamicArray.add('E');
      dynamicArray.add('F');
      assert.ok(dynamicArray.capacity() > CAPACITY);
    });
    it("should keep it's values when growing", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      dynamicArray.add('E');
      dynamicArray.add('F');
      assert.equal(dynamicArray.get(0), 'A');
      assert.equal(dynamicArray.get(1), 'B');
      assert.equal(dynamicArray.get(2), 'C');
      assert.equal(dynamicArray.get(3), 'D');
      assert.equal(dynamicArray.get(4), 'E');
      assert.equal(dynamicArray.get(5), 'F');
    });
    it("should have a grow() method to force it to grow", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.grow();
      assert.ok(dynamicArray.capacity() > CAPACITY);
    });
  });
  describe("Dynamic list methods", function() {
    it("should be possible to insert an element at the end", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      // insert at end
      dynamicArray.insert(4, 'E')
      // checking that new value is added
      assert.equal(dynamicArray.get(4), 'E');
      // checking that size is unaffected
      assert.equal(dynamicArray.size(), 5);
      assert.equal(dynamicArray.capacity(), 5);
    });
    it("should be possible to insert an element at the beginning", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      dynamicArray.add('E');
      // insert at beginning
      dynamicArray.insert(0, 'A');
      // checking that new value is added, and all others still work
      assert.equal(dynamicArray.get(0), 'A');
      assert.equal(dynamicArray.get(1), 'B');
      assert.equal(dynamicArray.get(2), 'C');
      assert.equal(dynamicArray.get(3), 'D');
      assert.equal(dynamicArray.get(4), 'E');
      // checking that size is unaffected
      assert.equal(dynamicArray.size(), 5);
      assert.equal(dynamicArray.capacity(), 5);
    });
    it("should be possible to insert an element in the middle", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('D');
      dynamicArray.add('E');
      // insert in middle
      dynamicArray.insert(2, 'C');
      // checking that new value is added, and all others still work
      assert.equal(dynamicArray.get(0), 'A');
      assert.equal(dynamicArray.get(1), 'B');
      assert.equal(dynamicArray.get(2), 'C');
      assert.equal(dynamicArray.get(3), 'D');
      assert.equal(dynamicArray.get(4), 'E');
      // checking that size is unaffected
      assert.equal(dynamicArray.size(), 5);
      assert.equal(dynamicArray.capacity(), 5);
    });
    it("should be possible to insert an element and cause growth", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('D');
      dynamicArray.add('E');
      dynamicArray.add('F');
      // insert a new value, forcing the array to grow
      dynamicArray.insert(2, 'C');
      // checking that new value is added, and all others still work
      assert.equal(dynamicArray.get(0), 'A');
      assert.equal(dynamicArray.get(1), 'B');
      assert.equal(dynamicArray.get(2), 'C');
      assert.equal(dynamicArray.get(3), 'D');
      assert.equal(dynamicArray.get(4), 'E');
      assert.equal(dynamicArray.get(5), 'F');
      // checking that size IS affected
      assert.equal(dynamicArray.size(), 6);
      assert.ok(dynamicArray.capacity() > 5);
    });
    it("should be possible to remove the last element", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      dynamicArray.add('E');
      // remove the last element
      dynamicArray.remove(4);
      assert.equal(dynamicArray.get(0), 'A');
      assert.equal(dynamicArray.get(1), 'B');
      assert.equal(dynamicArray.get(2), 'C');
      assert.equal(dynamicArray.get(3), 'D');
      // TODO: .get(4) should fail, but that is another test
      // checking that size IS affected
      assert.equal(dynamicArray.size(), 4);

    });
    it("should be possible to remove the first element", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      dynamicArray.add('E');
      // remove the first element
      dynamicArray.remove(0);
      // check that all values have shifted
      assert.equal(dynamicArray.get(0), 'B');
      assert.equal(dynamicArray.get(1), 'C');
      assert.equal(dynamicArray.get(2), 'D');
      assert.equal(dynamicArray.get(3), 'E');
      // and size has been changed as well
      assert.equal(dynamicArray.size(), 4);
      // do not test capacity - it might shrink, but it might not ...
    });
    it("should be possible to remove an element anywhere", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      dynamicArray.add('E');
      // remove the first element
      dynamicArray.remove(2);
      // check that all values from 2 onwards have shifted
      assert.equal(dynamicArray.get(0), 'A');
      assert.equal(dynamicArray.get(1), 'B');
      assert.equal(dynamicArray.get(2), 'D');
      assert.equal(dynamicArray.get(3), 'E');
      // and size has been changed as well
      assert.equal(dynamicArray.size(), 4);
    });
    it("should be possible to clear the entire list", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      dynamicArray.add('C');
      dynamicArray.add('D');
      dynamicArray.add('E');
      // clear the list
      dynamicArray.clear();
      // and check the size - only the size ...
      assert.equal(dynamicArray.size(), 0);
    });
  });
  describe("Exceptions", function() {
    // get
    it("get should throw a RangeError when index >= capacity", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      assert.throws( () => dynamicArray.get(5), RangeError,
       "get() doesn't throw a RangeError when index == capacity");
    });
    it("get should throw a RangeError when index >= size", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      assert.throws( () => dynamicArray.get(1), RangeError,
       "get() doesn't throw a RangeError when index == size");
    });
    // set
    it("set should throw a RangeError when index >= capacity", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      assert.throws( () => dynamicArray.set(5,'F'), RangeError,
       "set() doesn't throw a RangeError when index > capacity");
    });
    it("set should throw a RangeError when index >= size", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      assert.throws( () => dynamicArray.set(1, 'B'), RangeError,
       "set() doesn't throw a RangeError when index > size");
    });
    // insert
    it("insert should throw a RangeError when index is past capacity", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');

      // insert past the end
      assert.throws( () => dynamicArray.insert(5, 'F'), RangeError,
       "insert() doesn't throw a RangeError when index > capacity");
    });
    it("insert should throw a RangeError when index is past size", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      assert.throws( () => dynamicArray.insert(3, 'D'), RangeError,
       "insert() doesn't throw a RangeError when index > size");
    });
    it("insert should NOT throw a RangeError when index is at the exact end", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      try {
        dynamicArray.insert(2, 'C');  // this one should work!
        assert.ok(true);
      }
      catch(error) {
        assert.fail("insert throws a RangeError when index == size");
      }
    });
    // remove

    it("remove should throw a RangeError when index is past capacity", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');

      // insert past the end
      assert.throws( () => dynamicArray.remove(6), RangeError,
       "remove() doesn't throw a RangeError when index > capacity");
    });
    it("remove should throw a RangeError when index is past size", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      assert.throws( () => dynamicArray.remove(3), RangeError,
       "remove() doesn't throw a RangeError when index > size");
    });
    it("remove should throw a RangeError when index is at the end", function() {
      const CAPACITY = 5;
      const dynamicArray = new DynamicArray(CAPACITY);
      dynamicArray.add('A');
      dynamicArray.add('B');
      assert.throws( () => dynamicArray.remove(2), RangeError,
       "remove() doesn't throw a RangeError when index == size");
    });
 
  })
});