import assert from "assert";
import SinglyLinkedList from "./SinglyLinkedList.js";

describe("SinglyLinkedList", function () {
  const data1 = "A";
  const data2 = "B";
  const data3 = "C";

  let list = new SinglyLinkedList();
  this.beforeEach(function () {
    list = new SinglyLinkedList();
  });
  describe("Basic details", function () {
    it("should have a head that points to null", function () {
      assert.equal(list.head, null);
    });
    it("should have a printList method", function () {
      assert.equal(typeof list.printList, "function");
    });
    it("should have a size() method that returns 0 when the list is empty", function () {
      assert.equal(list.size(), 0);
    });
    it("should have a size() method that returns the number of nodes", function () {
      const nodes = {
        data: "A",
        next: {
          data: "B",
          next: {
            data: "C",
            next: null,
          },
        },
      };
      list.head = nodes;

      assert.equal(list.size(), 3);
    });
    it("should have a clear() method that makes the list empty", function () {
      const nodes = {
        data: "A",
        next: {
          data: "B",
          next: {
            data: "C",
            next: null,
          },
        },
      };
      list.head = nodes;
      assert.equal(list.size(), 3);
      list.clear();
      assert.equal(list.size(), 0);
    });
  });
  describe("Adding a single data element", function () {
    const data = "A";
    it("should have an add() method", function () {
      list.add(data);
    });
    it("should add data by letting head point to it", function () {
      list.add(data);
      assert.equal(list.head.data, data);
    });
    it("should add a node with link to data", function () {
      list.add(data);
      assert.deepStrictEqual(list.head, { next: null, data: data });
    });
    it("should return that node for getFirstNode()", function () {
      list.add(data);
      assert.equal(list.getFirstNode(), list.head);
    });
    it("should return that value for getFirst()", function () {
      list.add(data);
      assert.equal(list.getFirst(), data);
      assert.equal(list.getFirstNode().data, data);
    });
    it("should also return that node for getLastNode()", function () {
      list.add(data);
      assert.equal(list.getLastNode(), list.head);
    });
    it("should also return that value for getLast()", function () {
      list.add(data);
      assert.equal(list.getLast(), data);
      assert.equal(list.getLastNode().data, data);
    });
    it("should also return that node for getNode( index 0 )", function () {
      list.add(data);
      assert.equal(list.getNode(0), list.head);
    });
    it("should also return that value for get( index 0 )", function () {
      list.add(data);
      assert.equal(list.get(0), data);
      assert.equal(list.getNode(0).data, data);
    });
    it("should report a size() of exactly one node", function () {
      list.add(data);
      assert.equal(list.size(), 1);
    });
    it("should return null for getNextNode", function () {
      list.add(data);
      assert.equal(list.getNextNode(list.head), null);
    });
    it("should return null for getPreviousNode", function () {
      list.add(data);
      assert.equal(list.getPreviousNode(list.head), null);
    });
  });
  describe("Adding multiple data elements", function () {
    it("should keep the first added data as first", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      assert.equal(list.getFirst(), data1);
      assert.notEqual(list.getFirst(), data2);
      assert.notEqual(list.getFirst(), data3);
    });
    it("should keep the last added data as last", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      assert.notEqual(list.getLast(), data1);
      assert.notEqual(list.getLast(), data2);
      assert.equal(list.getLast(), data3);
    });
    it("should get the correct values with get( index )", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should build a linked list with pointers to next", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      const node1 = list.head;
      const node2 = node1.next;
      const node3 = node2.next;
      assert.deepStrictEqual(node1, { next: node2, data: data1 });
      assert.deepStrictEqual(node2, { next: node3, data: data2 });
      assert.deepStrictEqual(node3, { next: null, data: data3 });
    });
    it("should return the correct first node for getFirstNode", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      const node1 = list.head;
      const node2 = node1.next;
      const node3 = node2.next;
      assert.equal(list.getFirstNode(), node1);
    });
    it("should return the correct last node for getLastNode", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      const node1 = list.head;
      const node2 = node1.next;
      const node3 = node2.next;
      assert.equal(list.getLastNode(), node3);
    });
    it("should return the correct node for getNode(index)", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      const node1 = list.head;
      const node2 = node1.next;
      const node3 = node2.next;
      assert.equal(list.getNode(0), node1);
      assert.equal(list.getNode(1), node2);
      assert.equal(list.getNode(2), node3);
    });

    it("should be possible to step forward with getNextNode", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      const node1 = list.head;
      const node2 = node1.next;
      const node3 = node2.next;
      assert.equal(list.getNextNode(node1), node2);
      assert.equal(list.getNextNode(node2), node3);
      assert.equal(list.getNextNode(node3), null);
    });
    it("should be possible to step backward with getPreviousNode", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      const node1 = list.head;
      const node2 = node1.next;
      const node3 = node2.next;
      assert.equal(list.getPreviousNode(node1), null);
      assert.equal(list.getPreviousNode(node2), node1);
      assert.equal(list.getPreviousNode(node3), node2);
    });
    it("should report a size() of exactly three nodes", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      assert.equal(list.size(), 3);
    });
  });
  describe("Inserting data with index", function () {
    it("should be possible to insert at index 0", function () {
      list.add(data2);
      list.add(data3);
      list.insert(0, data1);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insert at end-index", function () {
      list.add(data1);
      list.add(data2);
      list.insert(2, data3);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insert in the middle", function () {
      list.add(data1);
      list.add(data3);
      list.insert(1, data2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insert into an empty list", function () {
      list.insert(0, data1);
      assert.equal(list.get(0), data1);
    });
    it("should be possible to insert after a single element", function () {
      list.add(data1);
      list.insert(1, data2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
    });
    it("should be possible to insert before a single element", function () {
      list.add(data2);
      list.insert(0, data1);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
    });
  });
  describe("Inserting data with nodes", function () {
    it("should be possible to insertBefore the first", function () {
      list.add(data2);
      list.add(data3);
      const node = list.getFirstNode();
      list.insertBefore(node, data1);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insertAfter the last", function () {
      list.add(data1);
      list.add(data2);
      const node = list.getLastNode();
      list.insertAfter(node, data3);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insertAfter the first (into the middle)", function () {
      list.add(data1);
      list.add(data3);
      const node = list.getFirstNode();
      list.insertAfter(node, data2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to insertBefore the last (into the middle)", function () {
      list.add(data1);
      list.add(data3);
      const node = list.getLastNode();
      list.insertBefore(node, data2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
  });
  describe("Removing nodes", function () {
    it("should be possible to removeFirst when it is the only one", function () {
      list.add(data1);
      list.removeFirst();

      assert.equal(list.head, null);
      assert.equal(list.size(), 0);
    });
    it("should be possible to removeLast when it is the only one", function () {
      list.add(data1);
      list.removeLast();
      assert.equal(list.head, null);
      assert.equal(list.size(), 0);
    });
    it("should be possible to remove(0) when it is the only one", function () {
      list.add(data1);
      list.remove(0);
      assert.equal(list.size(), 0);
      assert.equal(list.head, null);
    });
    it("should be possible to removeFirst from a list", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      list.removeFirst();

      assert.equal(list.get(0), data2);
      assert.equal(list.get(1), data3);
    });
    it("should be possible to removeLast from a list", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      list.removeLast();
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
    });
    it("should be possible to remove(0)  from a list", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      list.remove(0);
      assert.equal(list.size(), 2);
      assert.equal(list.get(0), data2);
      assert.equal(list.get(1), data3);
    });
    it("should be possible to remove( 1 ) - middle - from a list", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      list.remove(1);
      assert.equal(list.size(), 2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data3);
    });
    it("should be possible to remove( lastIndex ) - from a list", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);
      list.remove(2);
      assert.equal(list.size(), 2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
    });
    it("should be possible to removeNode( ) - when it is the only node", function () {
      list.add(data1);

      list.removeNode(list.head);
      assert.equal(list.size(), 0);
      assert.equal(list.head, null);
    });
    it("should be possible to removeNode( ) - when it is the first node", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);

      list.removeNode(list.getFirstNode());
      assert.equal(list.size(), 2);
      assert.equal(list.get(0), data2);
      assert.equal(list.get(1), data3);
    });
    it("should be possible to removeNode( ) - when it is the last node", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);

      const node2 = list.head.next;
      assert.notEqual(node2.next, null);
      list.removeNode(list.getLastNode());
      assert.equal(list.size(), 2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(node2.next, null);
    });
    it("should be possible to removeNode( ) - when it is the middle node", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);

      const node1 = list.getFirstNode();
      assert.notEqual(node1.next, list.getLastNode());
      list.removeNode(list.getNode(1));
      assert.equal(list.size(), 2);
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data3);
      assert.equal(node1.next, list.getLastNode());
    });
  });
  describe("setting data", function () {
    it("should be possible to set data value of the first index", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);

      list.set(0, "X");
      assert.equal(list.get(0), "X");
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), data3);
    });
    it("should be possible to set data value of the last index", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);

      list.set(2, "X");
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), data2);
      assert.equal(list.get(2), "X");
    });
    it("should be possible to set data value of the last index", function () {
      list.add(data1);
      list.add(data2);
      list.add(data3);

      list.set(1, "X");
      assert.equal(list.get(0), data1);
      assert.equal(list.get(1), "X");
      assert.equal(list.get(2), data3);
    });
  });
});
