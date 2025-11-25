
export default class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(data) {
        const newNode = { data, next: null };
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }   
        this.size++;
        return data;
    }

    dequeue() {
        if (!this.head) return null;
        const data = this.head.data;
        this.head = this.head.next;
        if (!this.head) {
            this.tail = null;
        }
        this.size--;
        return data;
    }

    peek() {
        return this.head ? this.head.data : null;
    }

    size() {
        return this.size;
    }

    get(index) {
        if (index < 0 || index >= this.size) return null;
        let i = 0;
        let n = this.head;
        while (n && i < index) {
            n = n.next;
            i++;
        }
        return n ? n.data : null;
    }

    //Tømmer hele køen
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // debug / visualisering
    printQueue() {
        let i = 0;
        let n = this.head;
        console.log("Queue:");
        while (n) {
            console.log(`[${i}] data=`, n.data, "next=", n.next ? "(node)" : null);
            n = n.next;
            i++;
        }
        if (i === 0) console.log("(tom)");
    }
}