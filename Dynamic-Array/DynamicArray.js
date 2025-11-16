import StaticArray from "./staticarray.js";

export default class DynamicArray {
  constructor(capacity = 5) {
    if (capacity <= 0) throw new RangeError("Capacity must be positive");
    this._capacity = capacity;
    this._size = 0;
    this._data = new StaticArray(capacity);
  }

  add(item) {
    if (this._size === this._capacity) this.grow();
    this._data.set(this._size, item);
    this._size++;
    return item;
  }

  get(index) {
    this._ensureIndex(index, { forInsert: false, forRemove: false });
    return this._data.get(index);
  }

  set(index, item) {
    this._ensureIndex(index, { forInsert: false, forRemove: false });
    this._data.set(index, item);
    return item;
  }

  size() {
    return this._size;
  }

  capacity() {
    return this._capacity;
  }

  grow() {
    const newCapacity = Math.max(1, this._capacity * 2);
    const newStorage = new StaticArray(newCapacity);
    for (let i = 0; i < this._size; i++) {
      newStorage.set(i, this._data.get(i));
    }
    this._data = newStorage;
    this._capacity = newCapacity;
  }

  insert(index, item) {
    this._ensureIndex(index, { forInsert: true, forRemove: false });

    if (this._size === this._capacity) this.grow();

    if (index === this._size) {
      this._data.set(this._size, item);
      this._size++;
      return item;
    }

    for (let i = this._size; i > index; i--) {
      this._data.set(i, this._data.get(i - 1));
    }
    this._data.set(index, item);
    this._size++;
    return item;
  }

  remove(index) {
    this._ensureIndex(index, { forInsert: false, forRemove: true });

    const removed = this._data.get(index);
    for (let i = index; i < this._size - 1; i++) {
      this._data.set(i, this._data.get(i + 1));
    }
    this._size--;
    return removed;
  }

  clear() {
    this._size = 0;
  }


  _ensureIndex(index, { forInsert = false, forRemove = false } = {}) {
    if (index < 0 || index >= this._capacity) {
      throw new RangeError("Index out of bounds (capacity)");
    }

    if (forInsert) {
      if (index > this._size) {
        throw new RangeError("Index out of bounds (size for insert)");
      }
    } else if (forRemove) {
      if (index >= this._size) {
        throw new RangeError("Index out of bounds (size for remove)");
      }
    } else {
      if (index >= this._size) {
        throw new RangeError("Index out of bounds (size)");
      }
    }
  }
}