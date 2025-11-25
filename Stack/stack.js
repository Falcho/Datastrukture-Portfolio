export default class Stack{
    constructor(){
        this.head = null;
        this._size = 0;
    }

    push(data){
        const node = {
            data,
            next: this.head,
        };

        this.head= node;
        this._size++;
        return data;
    }

    pop() {
        if(!this.head) return null;

        const data = this.head.data;
        this.head = this.head.next
        this._size--;
        return data;
    }

    peek() {
        return this.head ? this.head.data : null;
    }

    size() {
        return this._size;
    }

    get (index) {
        if (index < 0 || index >= this._size) return null;
        let i = 0;
        let n = this.head;
        while(n && i < index) {
            n = n.next;
            i++;
        }
        return n ? n.data : null;
    }

}