export default class doublylinkedlist {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  printList() {
    let i = 0;
    let node = this.head;
    console.log("DoubledLinkedList");
    while (node) {
      console.log(
        `[${i}] data=`,
        node.data,
        " prev=",
        node.prev ? "(node)" : null,
        " next=",
        node.next ? "(node)" : null
      );
      node = node.next;
      i++;
    }
    if (i === 0) console.log("(tom)");
  }

  // Data metoder

  addLast(data) {
    const newNode = { data, next: null, prev: this.tail };

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return data;
  }

  addFirst(data) {
    const newNode = { data, next: this.head, prev: null };

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
    return data;
  }

  get(index) {
    let node = this.getNode(index);
    return node ? node.data : null;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    return this.tail ? this.tail.data : null;
  }

  set(index, data) {
    let node = this.getNode(index);
    if (node) {
      node.data = data;
      return data;
    }
    return null;
  }

  insert(index, data) {
    if (index <= 0) return this.addFirst(data);
    if (index >= this.length) return this.addLast(data);

    let current = this.getNode(index);
    const newNode = { data, next: current, prev: current.prev };

    current.prev.next = newNode;
    current.prev = newNode;

    this.length++;
    return data;
  }

  insertAfter(index, data) {
    let current = this.getNode(index);
    if (!current) return this.addLast(data);

    const newNode = { data, next: current.next, prev: current };

    if (current.next) {
      current.next.prev = newNode;
    } else {
      this.tail = newNode;
    }

    current.next = newNode;
    this.length++;
    return data;
  }

  insertBefore(index, data) {
    let current = this.getNode(index);
    if (!current) return this.addFirst(data);

    const newNode = { data, next: current, prev: current.prev };

    if (current.prev) {
      current.prev.next = newNode;
    } else {
      this.head = newNode;
    }

    current.prev = newNode;
    this.length++;
    return data;
  }

  remove(index) {
    let node = this.getNode(index);
    if (!node) return null;
    return this.removeNode(node);
  }

  removeFirst() {
    if (!this.head) return null;
    const data = this.head.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.length--;
    return data;
  }

  removeLast() {
    if (!this.tail) return null;
    const data = this.tail.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;
    return data;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Nodes metoder

  getNode(index) {
    if (index < 0 || index >= this.length) return null;

    let i = 0;
    let node = this.head;
    while (node && i < index) {
      node = node.next;
      i++;
    }
    return node;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    return this.tail;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    return node ? node.prev : null;
  }

  insertBeforeNode(node, data) {
    if (!node) return null;

    const newNode = { data, next: node, prev: node.prev };

    if (node.prev) {
      node.prev.next = newNode;
    } else {
      this.head = newNode;
    }

    node.prev = newNode;
    this.length++;
    return newNode;
  }

  insertAfterNode(node, data) {
    if (!node) return null;

    const newNode = { data, next: node.next, prev: node };

    if (node.next) {
      node.next.prev = newNode;
    } else {
      this.tail = newNode;
    }

    node.next = newNode;
    this.length++;
    return newNode;
  }

  removeNode(node) {
    if (!node) return null;
    const data = node.data;

    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    this.length--;
    return data;
  }

  makeLast(node) {
    if (!node || node === this.tail) return node;

    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    node.next = null;
    node.prev = this.tail;
    if (this.tail) this.tail.next = node;
    this.tail = node;

    return node;
  }

  makeFirst(node) {
    if (!node || node === this.head) return node;

    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    node.prev = null;
    node.next = this.head;
    if (this.head) this.head.prev = node;
    this.head = node;

    return node;
  }

  swap(nodeA, nodeB) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;

    const tempData = nodeA.data;
    nodeA.data = nodeB.data;
    nodeB.data = tempData;
  }
}
