const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {

  getUnderlyingList() {
    let res = this.tail;

    return res;
  }

  enqueue(value) {
    let listVal = new ListNode(value);
    
    if(!this.list) {
      this.list = listVal;
      this.tail = listVal;

      return this;
    }

    function add(l, v) {
      if(l.next !== null) {
        l.next = add(l.next, v);
      } else {
        l.next = v;
      }
      
      return l;
    }

    this.list = add(this.list, listVal);

    return this;
  }

  dequeue() {
    if(this.list === null) return undefined;
    let res = this.list.value;

    this.list = this.list.next;
    this.tail = this.list;

    return res;
  }
}

module.exports = {
  Queue
};
