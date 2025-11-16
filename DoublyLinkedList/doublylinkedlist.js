import SinglyLinkedList from "../Linked-List/SinglyLinkedList.js";

export default class doublylinkedlist {
  constructor() {
    this.list = new SinglyLinkedList();
    this.length = 0;
  }

  // Kompatible "egenskaber" for head/tail (beregnes fra singly-listen)
  get head() {
    return this.list.getFirstNode();
  }
  get tail() {
    return this.list.getLastNode();
  }

  printList() {
    let i = 0;
    let prev = null;
    let node = this.list.getFirstNode();
    console.log("DoubledLinkedList");
    while (node) {
      console.log(
        `[${i}] data=`,
        node.data,
        " prev=",
        prev ? "(node)" : null,
        " next=",
        node.next ? "(node)" : null
      );
      prev = node;
      node = node.next;
      i++;
    }
    if (i === 0) console.log("(tom)");
  }

  // Data metoder

  addLast(data) {
    this.list.add(data);
    this.length++;
    return data;
  }

  addFirst(data) {
    this.list.head = { data, next: this.list.head };
    this.length++;
    return data;
  }

  get(index) {
    return this.list.get(index);
  }

  getFirst() {
    return this.list.getFirst();
  }

  getLast() {
    return this.list.getLast();
  }

  set(index, data) {
    return this.list.set(index, data);
  }

  insert(index, data) {
    this.list.insert(index, data);
    this.length++;
    return data;
  }

  insertAfter(index, data) {
    const node = this.list.getNode(index);
    if (!node) return this.addLast(data);
    this.list.insertAfter(node, data);
    this.length++;
    return data;
  }

  insertBefore(index, data) {
    const node = this.list.getNode(index);
    if (!node) return this.addFirst(data);
    this.list.insertBefore(node, data);
    this.length++;
    return data;
  }

  remove(index) {
    const data = this.list.remove(index);
    if (data !== null) this.length--;
    return data;
  }

  removeFirst() {
    const data = this.list.removeFirst();
    if (data !== null) this.length--;
    return data;
  }

  removeLast() {
    const data = this.list.removeLast();
    if (data !== null) this.length--;
    return data;
  }

  size() {
    return this.length;
  }

  clear() {
    this.list.clear();
    this.length = 0;
  }

  // Nodes metoder

  getNode(index) {
    return this.list.getNode(index);
  }

  getFirstNode() {
    return this.list.getFirstNode();
  }

  getLastNode() {
    return this.list.getLastNode();
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    return this.list.getPreviousNode(node);
  }

  insertBeforeNode(node, data) {
    const newNode = this.list.insertBefore(node, data);
    if (newNode) this.length++;
    return newNode;
  }

  insertAfterNode(node, data) {
    const newNode = this.list.insertAfter(node, data);
    if (newNode) this.length++;
    return newNode;
  }

  removeNode(node) {
    const data = this.list.removeNode(node);
    if (data !== null) this.length--;
    return data;
  }

  makeLast(node) {
    if (!node || node === this.getLastNode()) return node;

    // Frakobl node
    if (node === this.list.head) {
      this.list.head = node.next;
    } else {
      const prev = this.list.getPreviousNode(node);
      if (!prev) return node;
      prev.next = node.next;
    }

    // Sæt som sidste
    const tail = this.getLastNode();
    if (tail) tail.next = node;
    node.next = null;
    return node;
  }

  makeFirst(node) {
    if (!node || node === this.list.head) return node;

    const prev = this.list.getPreviousNode(node);
    if (!prev) return node;

    // Frakobl node fra nuværende placering
    prev.next = node.next;

    // Sæt som første
    node.next = this.list.head;
    this.list.head = node;
    return node;
  }

  swap(nodeA, nodeB) {
    if (!nodeA || !nodeB || nodeA === nodeB) return;
    const tmp = nodeA.data;
    nodeA.data = nodeB.data;
    nodeB.data = tmp;
  }
}
