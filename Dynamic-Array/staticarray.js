/**
 * StaticArray is a class for creating fixed size arrays in JavaScript,
 * just like we know and love them from Java.
 * 
 * A StaticArray is initialized with the length, and it stays that length forever.
 * 
 * Accessing indexes outside the range from 0 to length-1 throws a RangeError.
 * 
 * The StaticArray has a readonly .length property, and two methods: get and set
 * in addition to the usual access by [index], as well as an iterator for use in
 * for ... of loops and the likes.
 * 
 */
export default class StaticArray {
  #_arr;
  #_length;
  constructor(length) {
    this.#_length = length;
    this.#_arr = new Array(length);

    // Define a Proxy handler to trap [n] indexes and .length
    const handler = {
      get: function(target, prop, receiver) {
        if(typeof prop !== "symbol") {
          // check if prop is .length
          if(prop === "length") {
            return target.length;
          }

          // check if prop is a [number]
          // if it is, return the value at that index
          if(typeof prop === "number" || Number.isInteger(Number(prop))) {
            return target.get(Number(prop));
          }
        }

        return Reflect.get(target,prop,receiver);
      },
      set: function(target, prop, value, receiver) {
        if(typeof prop !== "symbol") {
          // check if prop is a [number]
          // if it is, set the value at that index
          if(typeof prop === "number" || Number.isInteger(Number(prop))) {
            target.set(Number(prop),value);
            return true; // not sure if this should return true or undefined
          }
          if(prop === "length") {
            throw new TypeError(".length property is read-only");
          }
        }

        return Reflect.set(target,prop,value,receiver);
      }
    }

    // bind this in the methods to this instance, rather than the Proxy
    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
//    this.at = this.at.bind(this);
    this[Symbol.iterator] = this[Symbol.iterator].bind(this);

    return new Proxy(this,handler);
  }

  // getter for .length - as a property rather than a method.
  get length() {
    return this.#_length;
  } 

  // iterator used by for ... of loops 
  [Symbol.iterator]() {
    // always start iteration at index zero
    let index = 0;
    return {
      next: () => {
        // returns the next element, if there are more elements
        if(index < this.#_length) {
          return {value: this.#_arr[index++], done: false};
        } else {
          // otherwise, inform the caller that we are done iterating
          return {done: true};
        }
      }
    }
  }

  // a small private helper-function to throw an error if trying to access an index out of bounds
  // very Java-like!
  #_checkindex(index) {
    if(index < 0 || index >= this.#_length) {
      throw new RangeError("Index must be between 0 and length: " + this.#_length);
    }
  }

  get(index) {
    this.#_checkindex(index);
    return this.#_arr[index];
  }

  set(index,value) {
    this.#_checkindex(index);
    this.#_arr[index] = value;
  }
}