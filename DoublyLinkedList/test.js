import assert from "assert";
import DoublyLinkedList from "./doublylinkedlist.js";

describe("DoublyLinkedList", function () {
  const data1 = "A";
  const data2 = "B";
  const data3 = "C";

  let list = new DoublyLinkedList();
  this.beforeEach(function () {
    list = new DoublyLinkedList();
  });
  describe("Basic details", function () {
    it("should have a head that points to null", function () {
      assert.equal(list.head, null);
    });
    it("should have a tail that points to null", function () {
      assert.equal(list.tail, null);
    });
    it("should have a printList method", function () {
      assert.equal(typeof list.printList, "function");
    });
    it("should have a size() method that returns 0 when the list is empty", function () {
      assert.equal(list.size(), 0);
    });
    it("should have an addLast() method", function () {
      assert.equal(typeof list.addLast, "function");
    });
    it("should have an addFirst() method", function () {
      assert.equal(typeof list.addFirst, "function");
    });
  });
  describe("Adding a single data element (at the end)", function () {
    const data = "A";
    this.beforeEach(function () {
      list.addLast(data);
    });
    it("should have a size of 1 when adding a single node", function () {
      assert.equal(list.size(), 1);
    });
    it("should add data by letting head and tail point to it", function () {
      assert.equal(list.head.data, data);
      assert.equal(list.tail.data, data);
    });
    it("should add a node with link to data, next and prev", function () {
      assert.deepStrictEqual(list.head, { next: null, prev: null, data: data });
    });
  });
  describe("Adding a single data element (at the beginning)", function () {
    const data = "A";
    this.beforeEach(function () {
      list.addFirst(data);
    });
    it("should have a size of 1 when adding a single node", function () {
      assert.equal(list.size(), 1);
    });
    it("should add data by letting head and tail point to it", function () {
      assert.equal(list.head.data, data);
      assert.equal(list.tail.data, data);
    });
    it("should add a node with link to data, next and prev", function () {
      assert.deepStrictEqual(list.head, { next: null, prev: null, data: data });
    });
  });
  // getting elements
  describe("Getting a single data element (in a list of one node)", function () {
    const data = "A";
    this.beforeEach(function () {
      list.addFirst(data);
    });
    it("should return that node for getFirstNode()", function () {
      assert.equal(list.getFirstNode(), list.head);
    });

    it("should return that value for getFirst()", function () {
      assert.equal(list.getFirst(), data);
      assert.equal(list.getFirstNode().data, data);
    });
    it("should also return that node for getLastNode()", function () {
      assert.equal(list.getLastNode(), list.head);
    });
    it("should also return that value for getLast()", function () {
      assert.equal(list.getLast(), data);
      assert.equal(list.getLastNode().data, data);
    });
    it("should also return that node for getNode( index 0 )", function () {
      assert.equal(list.getNode(0), list.head);
    });
    it("should also return that value for get( index 0 )", function () {
      assert.equal(list.get(0), data);
      assert.equal(list.getNode(0).data, data);
    });
  });
  describe("List structure with multiple data elements added last", function () {
    let node1 = null;
    let node2 = null;
    let node3 = null;
    this.beforeEach(function () {
      list.addLast(data1);
      node1 = list.getLastNode();
      list.addLast(data2);
      node2 = list.getLastNode();
      list.addLast(data3);
      node3 = list.getLastNode();
    });
    it("should have every node pointing to its own data", function () {
      assert.equal(node1.data, data1);
      assert.equal(node2.data, data2);
      assert.equal(node3.data, data3);
    });
    it("should have every node pointing to the next", function () {
      assert.equal(node1.next, node2);
      assert.equal(node2.next, node3);
      assert.equal(node3.next, null);
    });
    it("should have every node pointing to the previous", function () {
      assert.equal(node1.prev, null);
      assert.equal(node2.prev, node1);
      assert.equal(node3.prev, node2);
    });
    it("should keep the first added Node as first", function () {
      assert.equal(list.getFirstNode(), node1);
      assert.notEqual(list.getFirstNode(), node2);
      assert.notEqual(list.getFirstNode(), node3);
    });
    it("should keep the last added Node as last", function () {
      assert.notEqual(list.getLastNode(), node1);
      assert.notEqual(list.getLastNode(), node2);
      assert.equal(list.getLastNode(), node3);
    });
    it("should get the correct nodes with getNode( index )", function () {
      assert.equal(list.getNode(0), node1);
      assert.equal(list.getNode(1), node2);
      assert.equal(list.getNode(2), node3);
    });
    it("should return the correct data for getFirst()", function () {
      assert.equal(list.getFirst(), node1.data);
      assert.notEqual(list.getFirst(), node2.data);
      assert.notEqual(list.getFirst(), node3.data);
    });
    it("should return the correct data for getLast()", function () {
      assert.notEqual(list.getLast(), node1.data);
      assert.notEqual(list.getLast(), node2.data);
      assert.equal(list.getLast(), node3.data);
    });
    it("should return the correct data for get( index)", function () {
      assert.equal(list.get(0), node1.data);
      assert.equal(list.get(1), node2.data);
      assert.equal(list.get(2), node3.data);
    });
    it("should report a size() of exactly three nodes", function () {
      assert.equal(list.size(), 3);
    });
  });
  describe("List structure with multiple data elements added first", function () {
    let node1 = null;
    let node2 = null;
    let node3 = null;
    this.beforeEach(function () {
      list.addFirst(data3);
      node3 = list.getFirstNode();
      list.addFirst(data2);
      node2 = list.getFirstNode();
      list.addFirst(data1);
      node1 = list.getFirstNode();
    });
    it("should have every node pointing to its own data", function () {
      assert.equal(node1.data, data1);
      assert.equal(node2.data, data2);
      assert.equal(node3.data, data3);
    });
    it("should have every node pointing to the next", function () {
      assert.equal(node1.next, node2);
      assert.equal(node2.next, node3);
      assert.equal(node3.next, null);
    });
    it("should have every node pointing to the previous", function () {
      assert.equal(node1.prev, null);
      assert.equal(node2.prev, node1);
      assert.equal(node3.prev, node2);
    });
    it("should keep the first added Node as first", function () {
      assert.equal(list.getFirstNode(), node1);
      assert.notEqual(list.getFirstNode(), node2);
      assert.notEqual(list.getFirstNode(), node3);
    });
    it("should keep the last added Node as last", function () {
      assert.notEqual(list.getLastNode(), node1);
      assert.notEqual(list.getLastNode(), node2);
      assert.equal(list.getLastNode(), node3);
    });
    it("should get the correct nodes with getNode( index )", function () {
      assert.equal(list.getNode(0), node1);
      assert.equal(list.getNode(1), node2);
      assert.equal(list.getNode(2), node3);
    });
    it("should return the correct data for getFirst()", function () {
      assert.equal(list.getFirst(), node1.data);
      assert.notEqual(list.getFirst(), node2.data);
      assert.notEqual(list.getFirst(), node3.data);
    });
    it("should return the correct data for getLast()", function () {
      assert.notEqual(list.getLast(), node1.data);
      assert.notEqual(list.getLast(), node2.data);
      assert.equal(list.getLast(), node3.data);
    });
    it("should return the correct data for get( index)", function () {
      assert.equal(list.get(0), node1.data);
      assert.equal(list.get(1), node2.data);
      assert.equal(list.get(2), node3.data);
    });
    it("should report a size() of exactly three nodes", function () {
      assert.equal(list.size(), 3);
    });
  });

  describe("Traversing list structure", function () {
    describe("in a list with a single element", function () {
      it("should return the same node for first and last, if added first", function () {
        list.addFirst("A");
        assert.equal(list.getFirstNode(), list.getLastNode());
      });
      it("should return the same node for first and last, if added last", function () {
        list.addLast("Z");
        assert.equal(list.getFirstNode(), list.getLastNode());
      });
      it("should return null for getNextNode", function () {
        list.addFirst("A");
        const node = list.getFirstNode();
        assert.equal(list.getNextNode(node), null);
      });
      it("should return null for getPreviousNode", function () {
        list.addFirst("A");
        const node = list.getFirstNode();
        assert.equal(list.getPreviousNode(node), null);
      });
    });
    describe("in a list with a multiple elements", function () {
      let node1 = null;
      let node2 = null;
      let node3 = null;
      this.beforeEach(function () {
        list.addLast("A");
        node1 = list.getLastNode();
        list.addLast("B");
        node2 = list.getLastNode();
        list.addLast("C");
        node3 = list.getLastNode();
      });
      it("should be possible to step forward with getNextNode", function () {
        assert.equal(list.getNextNode(node1), node2);
        assert.equal(list.getNextNode(node2), node3);
        assert.equal(list.getNextNode(node3), null);
      });
      it("should be possible to step backward with getPreviousNode", function () {
        assert.equal(list.getPreviousNode(node1), null);
        assert.equal(list.getPreviousNode(node2), node1);
        assert.equal(list.getPreviousNode(node3), node2);
      });
    });
  });

  describe("Inserting in a list", function () {
    describe("Inserting nodes in an existing list", function () {
      const data = "N";
      let firstNode = null;
      let lastNode = null;
      this.beforeEach(function () {
        list.addFirst("A");
        firstNode = list.getFirstNode();
        list.addLast("Z");
        lastNode = list.getLastNode();
      });
      it("should be possible to insert a new node after the first", function () {
        list.insertAfterNode(firstNode, data);
        const newNode = list.getNode(1);

        // make sure that the newNode contains the new data
        assert.equal(newNode.data, data);

        // assert that they all point correctly forward
        assert.equal(firstNode.next, newNode);
        assert.equal(newNode.next, lastNode);
        assert.equal(lastNode.next, null);
        // and backward
        assert.equal(firstNode.prev, null);
        assert.equal(newNode.prev, firstNode);
        assert.equal(lastNode.prev, newNode);
        // and that head and tail still points correctly
        assert.equal(list.head, firstNode);
        assert.equal(list.tail, lastNode);
      });
      it("should be possible to insert a new node before the last", function () {
        list.insertBeforeNode(lastNode, data);
        const newNode = list.getNode(1);

        // make sure that the newNode contains the new data
        assert.equal(newNode.data, data);

        // assert that they all point correctly forward
        assert.equal(firstNode.next, newNode);
        assert.equal(newNode.next, lastNode);
        assert.equal(lastNode.next, null);
        // and backward
        assert.equal(firstNode.prev, null);
        assert.equal(newNode.prev, firstNode);
        assert.equal(lastNode.prev, newNode);
        // and that head and tail still points correctly
        assert.equal(list.head, firstNode);
        assert.equal(list.tail, lastNode);
      });
      it("should be possible to insert a new node before the first", function () {
        list.insertBeforeNode(firstNode, data);
        const newNode = list.getNode(0);

        // make sure that the newNode contains the new data
        assert.equal(newNode.data, data);

        // assert that they all point correctly forward
        assert.equal(newNode.next, firstNode);
        assert.equal(firstNode.next, lastNode);
        assert.equal(lastNode.next, null);
        // and backward
        assert.equal(newNode.prev, null);
        assert.equal(firstNode.prev, newNode);
        assert.equal(lastNode.prev, firstNode);
        // and that head and tail also points correctly
        assert.equal(list.head, newNode);
        assert.equal(list.tail, lastNode);
      });
      it("should be possible to insert a new node after the last", function () {
        list.insertAfterNode(lastNode, data);
        const newNode = list.getNode(2);

        // make sure that the newNode contains the new data
        assert.equal(newNode.data, data);

        // assert that they all point correctly forward
        assert.equal(firstNode.next, lastNode);
        assert.equal(lastNode.next, newNode);
        assert.equal(newNode.next, null);
        // and backward
        assert.equal(firstNode.prev, null);
        assert.equal(lastNode.prev, firstNode);
        assert.equal(newNode.prev, lastNode);
        // and that head and tail also points correctly
        assert.equal(list.head, firstNode);
        assert.equal(list.tail, newNode);
      });
    });
    describe("Inserting nodes in a list with one node", function () {
      const data = "N";
      let oldNode = null;
      this.beforeEach(function () {
        list.addFirst("A");
        oldNode = list.getFirstNode();
      });
      it("should be possible to insert before the only node", function () {
        list.insertBeforeNode(oldNode, data);
        const newNode = list.getNode(0);

        // make sure that the newNode contains the new data
        assert.equal(newNode.data, data);

        // assert that the new points forward to the old
        assert.equal(newNode.next, oldNode);
        assert.equal(oldNode.next, null);
        // and that the old points back to the new
        assert.equal(oldNode.prev, newNode);
        assert.equal(newNode.prev, null);
        // and that head and tail also points correctly
        assert.equal(list.head, newNode);
        assert.equal(list.tail, oldNode);
      });
      it("should be possible to insert after the only node", function () {
        list.insertAfterNode(oldNode, data);
        const newNode = list.getNode(1);

        // make sure that the newNode contains the new data
        assert.equal(newNode.data, data);

        // assert that the old points forward to the new
        assert.equal(oldNode.next, newNode);
        assert.equal(newNode.next, null);
        // and that the new points back to the old
        assert.equal(newNode.prev, oldNode);
        assert.equal(oldNode.prev, null);
        // and that head and tail also points correctly
        assert.equal(list.head, oldNode);
        assert.equal(list.tail, newNode);
      });
    });
  });

  describe("Inserting data with index", function () {
    it("should be possible to insert at index 0", function () {
      list.addLast(data2);
      list.addLast(data3);
      list.insert(0, data1);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insert in the middle", function () {
      list.addLast(data1);
      list.addLast(data3);
      list.insert(1, data2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insert just after last index", function () {
      list.addLast(data1);
      list.addLast(data2);
      list.insert(2, data3);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insert before a single element", function () {
      list.addLast(data2);
      list.insert(0, data1);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
    });
    it("should be possible to insert after a single element", function () {
      list.addLast(data1);
      list.insert(1, data2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
    });
  });

  describe("Removing nodes", function () {
    describe("from lists with a single element", function () {
      beforeEach(function () {
        list.addLast(data1);
      });
      it("should be possible to removeFirst when it is the only one", function () {
        list.removeFirst();
        assert.equal(list.head, null);
        assert.equal(list.tail, null);
        assert.equal(list.size(), 0);
      });
      it("should be possible to removeLast when it is the only one", function () {
        list.removeLast();
        assert.equal(list.head, null);
        assert.equal(list.tail, null);
        assert.equal(list.size(), 0);
      });
      it("should be possible to removeNode when it is the only one", function () {
        const node = list.getFirstNode();
        list.removeNode(node);
        assert.equal(list.head, null);
        assert.equal(list.tail, null);
        assert.equal(list.size(), 0);
      });
      it("should be possible to remove(0) when it is the only one", function () {
        list.remove(0);
        assert.equal(list.head, null);
        assert.equal(list.tail, null);
        assert.equal(list.size(), 0);
      });
    });
    describe("from lists with multiple elements", function () {
      let node1 = null;
      let node2 = null;
      let node3 = null;
      beforeEach(function () {
        list.addLast("A");
        node1 = list.getLastNode();
        list.addLast("B");
        node2 = list.getLastNode();
        list.addLast("C");
        node3 = list.getLastNode();
      });

      it("should be possible to removeFirst from a list", function () {
        list.removeFirst();
        // assert that remaining nodes point correctly forward
        assert.equal(node2.next, node3);
        assert.equal(node3.next, null);
        // and backward
        assert.equal(node2.prev, null);
        assert.equal(node3.prev, node2);
        // and that head and tail still points correctly
        assert.equal(list.head, node2);
        assert.equal(list.tail, node3);
        // assert that the values are still at the expected indexes
        assert.equal(list.get(0), data2);
        assert.equal(list.get(1), data3);
        assert.equal(list.size(), 2);
      });
      it("should be possible to removeLast from a list", function () {
        list.removeLast();
        // assert that remaining nodes point correctly forward
        assert.equal(node1.next, node2);
        assert.equal(node2.next, null);
        // and backward
        assert.equal(node1.prev, null);
        assert.equal(node2.prev, node1);
        // and that head and tail still points correctly
        assert.equal(list.head, node1);
        assert.equal(list.tail, node2);
        // assert that the values are still at the expected indexes
        assert.equal(list.get(0), data1);
        assert.equal(list.get(1), data2);
        assert.equal(list.size(), 2);
      });
      it("should be possible to remove( 0 ) from a list", function () {
        list.remove(0);
        // assert that remaining nodes point correctly forward
        assert.equal(node2.next, node3);
        assert.equal(node3.next, null);
        // and backward
        assert.equal(node2.prev, null);
        assert.equal(node3.prev, node2);
        // and that head and tail still points correctly
        assert.equal(list.head, node2);
        assert.equal(list.tail, node3);
        // assert that the values are still at the expected indexes
        assert.equal(list.get(0), data2);
        assert.equal(list.get(1), data3);
        assert.equal(list.size(), 2);
      });
      it("should be possible to remove( middle ) from a list", function () {
        list.remove(1);

        // assert that remaining nodes point correctly forward
        assert.equal(node1.next, node3);
        assert.equal(node3.next, null);
        // and backward
        assert.equal(node1.prev, null);
        assert.equal(node3.prev, node1);
        // and that head and tail still points correctly
        assert.equal(list.head, node1);
        assert.equal(list.tail, node3);

        assert.equal(list.size(), 2);
        assert.equal(list.get(0), data1);
        assert.equal(list.get(1), data3);
      });
      it("should be possible to remove( lastIndex ) from a list", function () {
        list.remove(2);
        // assert that remaining nodes point correctly forward
        assert.equal(node1.next, node2);
        assert.equal(node2.next, null);
        // and backward
        assert.equal(node1.prev, null);
        assert.equal(node2.prev, node1);
        // and that head and tail still points correctly
        assert.equal(list.head, node1);
        assert.equal(list.tail, node2);
        // assert that the values are still at the expected indexes
        assert.equal(list.get(0), data1);
        assert.equal(list.get(1), data2);
        assert.equal(list.size(), 2);
      });
      it("should be possible to removeNode( ) - when it is the first node", function () {
        list.removeNode(node1);
        // assert that remaining nodes point correctly forward
        assert.equal(node2.next, node3);
        assert.equal(node3.next, null);
        // and backward
        assert.equal(node2.prev, null);
        assert.equal(node3.prev, node2);
        // and that head and tail still points correctly
        assert.equal(list.head, node2);
        assert.equal(list.tail, node3);
        // assert that the values are still at the expected indexes
        assert.equal(list.get(0), data2);
        assert.equal(list.get(1), data3);
        assert.equal(list.size(), 2);
      });
      it("should be possible to removeNode( ) - when it is the last node", function () {
        list.removeNode(node3);
        // assert that remaining nodes point correctly forward
        assert.equal(node1.next, node2);
        assert.equal(node2.next, null);
        // and backward
        assert.equal(node1.prev, null);
        assert.equal(node2.prev, node1);
        // and that head and tail still points correctly
        assert.equal(list.head, node1);
        assert.equal(list.tail, node2);
        // assert that the values are still at the expected indexes
        assert.equal(list.get(0), data1);
        assert.equal(list.get(1), data2);
        assert.equal(list.size(), 2);
      });
      it("should be possible to removeNode( ) - when it is the middle node", function () {
        list.removeNode(node2);

        // assert that remaining nodes point correctly forward
        assert.equal(node1.next, node3);
        assert.equal(node3.next, null);
        // and backward
        assert.equal(node1.prev, null);
        assert.equal(node3.prev, node1);
        // and that head and tail still points correctly
        assert.equal(list.head, node1);
        assert.equal(list.tail, node3);

        assert.equal(list.size(), 2);
        assert.equal(list.get(0), data1);
        assert.equal(list.get(1), data3);
      });
    });
  });
  describe("setting data", function () {
    it("should be possible to set data value of the first index", function () {
      list.addLast(data1);
      list.addLast(data2);
      list.addLast(data3);

      list.set(0, "X");
      assert.equal(list.get(0), "X");
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to set data value of the last index", function () {
      list.addLast(data1);
      list.addLast(data2);
      list.addLast(data3);

      list.set(2, "X");
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), "X");
    });
    it("should be possible to set data value of the middle index", function () {
      list.addLast(data1);
      list.addLast(data2);
      list.addLast(data3);

      list.set(1, "X");
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), "X");
      assert.equal(list.get(2), data3);
    });
  });
});
