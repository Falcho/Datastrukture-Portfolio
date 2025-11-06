export default class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  printList() {
    let i = 0;
    let n = this.head;
    console.log("SinglyLinkedList: ");
    while (n) {
      console.log(`[${i}] data=`, n.data, "next=", n.next ? "(node)" : null);
      n = n.next;
      i++;
    }
    if (i === 0) console.log("(tom)");
  }
        // Data metoder
  add(data) {
    const node = { data, next: null };
    if (!this.head) {
      this.head = node;
      return data;
    }
    let n = this.head;
    while (n.next) n = n.next;
    n.next = node;
    return data;
  }

  get(index) {
    let i = 0,
      n = this.head;
    while (n && i < index) {
      n = n.next;
      i++;
    }
    return n ? n.data : null;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    if (!this.head) return null;
    let n = this.head;
    while (n.next) n = n.next;
    return n.data;
  }

  set(index, data) {
    let i = 0,
      n = this.head;
    while (n && i < index) {
      n = n.next;
      i++;
    }
    if (!n) return null;
    n.data = data;
    return data;
  }

  insert(index, data) {
    if (index <= 0 || !this.head) {
      this.head = { data, next: this.head };
      return data;
    }
    let i = 0,
      prev = null,
      curr = this.head;
    while (curr && i < index) {
      prev = curr;
      curr = curr.next;
      i++;
    }

    const node = { data, next: curr };
    prev.next = node;
    return data;
  }

  remove(index) {
    if (!this.head) return null;
    if (index <= 0) return this.removeFirst();
    let i = 0,
      prev = null,
      curr = this.head;
    while (curr && i < index) {
      prev = curr;
      curr = curr.next;
      i++;
    }
    if (!curr) return null;
    prev.next = curr.next;
    return curr.data;
  }

  removeFirst() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    return data;
  }

  removeLast() {
    if (!this.head) return null;
    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      return data;
    }
    let prev = null,
      curr = this.head;
    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }
    prev.next = null;
    return curr.data;
  }

  size() {
    let count = 0,
      n = this.head;
    while (n) {
      count++;
      n = n.next;
    }
    return count;
  }

  clear() {
    this.head = null;
  }


  getNode(index) {
    let i = 0,
      n = this.head;
    while (n && i < index) {
      n = n.next;
      i++;
    }
    return n || null;
  }

  getFirstNode() {
    return this.head;
  }

            // Nodes metoder
  getLastNode() {
    if (!this.head) return null;
    let n = this.head;
    while (n.next) n = n.next;
    return n;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    if (!this.head || this.head === node) return null;
    let prev = null,
      curr = this.head;
    while (curr && curr !== node) {
      prev = curr;
      curr = curr.next;
    }
    return curr === node ? prev : null;
  }

  insertBefore(node, data) {
    if (!this.head || this.head === node) {
      this.head = { data, next: this.head };
      return this.head;
    }
    let prev = this.getPreviousNode(node);
    if (!prev) return null; // node ikke fundet
    const newNode = { data, next: node };
    prev.next = newNode;
    return newNode;
  }

  insertAfter(node, data) {
    if (!node) return null;
    const newNode = { data, next: node.next };
    node.next = newNode;
    return newNode;
  }

  removeNode(node) {
    if (!this.head || !node) return null;
    if (this.head === node) {
      const data = node.data;
      this.head = node.next;
      return data;
    }
    const prev = this.getPreviousNode(node);
    if (!prev) return null;
    prev.next = node.next;
    return node.data;
  }
}
