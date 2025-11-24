class Stack {
  constructor() {
    this.length = 0;
    this.currentIndex = -1;
    this.stack = [];
  }

  push(value) {
    if (value != undefined) {
      this.length++;
      this.currentIndex++;
      this.stack[this.currentIndex] = value;
    }
  }

  pop() {
    const removedValue = this.stack[this.currentIndex];
    this.stack[this.currentIndex] = undefined;
    if (this.length > 0) {
      this.length--;
      this.currentIndex--;
    }
    return removedValue;
  }

  peek() {
    return this.stack[this.currentIndex];
  }

  isEmpty() {
    return this.length == 0;
  }
}

class Queue {
  constructor() {
    this.tail = 0;
    this.head = 0;
    this.size = 4;
    this.queue = [];
    this.count = 0;
  }

  enqueue(value) {
    this.queue[this.tail] = value;
    this.count++;
    this.tail++;
  }

  dequeue() {
    const deletedEl = this.queue[this.head];
    this.head++;
    this.count--;
    return deletedEl;
  }

  peek() {
    return this.queue[this.head];
  }

  isEmpty() {
    return this.count === 0;
  }
}

// const main = () => {
//   const s = new Stack();
//   const q = new Queue();

//   console.log(s.isEmpty());
//   s.push("Hello");
//   s.push("World");
//   console.log(s.isEmpty());
//   console.log(s.pop());
//   console.log(s.peek());
//   console.log(s.peek());
//   console.log(s.pop());
//   console.log(s.peek());
//   console.log(s.isEmpty());
//   s.push("Hello");
//   console.log(s.peek());

//   console.log(q.isEmpty());
//   q.enqueue("Hello");
//   q.enqueue("World");
//   console.log(q.isEmpty());
//   console.log(q.dequeue());
//   console.log(q.peek());
//   console.log(q.dequeue());
//   console.log(q.peek());
//   console.log(q.isEmpty());
//   q.enqueue("Hello");
//   console.log(q.peek());
// };

// main();

export { Stack, Queue };
